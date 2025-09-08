'use client';

import React, { useEffect, useMemo, useRef, useState } from 'react';
import Navbar from '../../components/navbar';

// Tiny helpers
const pad2 = (n: number) => n.toString().padStart(2, '0');
const formatDateTime = (d: Date) =>
  `${d.getFullYear()}-${pad2(d.getMonth() + 1)}-${pad2(d.getDate())} ${pad2(d.getHours())}:${pad2(d.getMinutes())}:${pad2(d.getSeconds())}`;

// Cron text helpers (inspired by CronExpressionDescriptor logic)
const SPECIAL_CHARS = /[/,\-*]/;
const DAY_NAMES = ['Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday'];
const MONTH_NAMES = [
  'January', 'February', 'March', 'April', 'May', 'June',
  'July', 'August', 'September', 'October', 'November', 'December'
];

function isNumericLike(v: string) {
  return /^\d+$/.test(v);
}

function describeExpression(exp: string, unit: string, unitPlural = unit + 's'): string {
  if (exp === '*') return `every ${unit}`;
  
  if (exp.includes(',')) {
    const items = exp.split(',');
    if (items.length === 2) return `at ${unit} ${items.join(' and ')}`;
    return `at ${unitPlural} ${items.slice(0, -1).join(', ')}, and ${items[items.length - 1]}`;
  }
  
  if (exp.includes('/')) {
    const [base, step] = exp.split('/');
    const stepNum = Number(step);
    if (base === '*') return `every ${stepNum} ${unitPlural}`;
    if (base.includes('-')) {
      const [start, end] = base.split('-').map(Number);
      return `every ${stepNum} ${unitPlural} from ${start} through ${end}`;
    }
    if (isNumericLike(base)) {
      return `every ${stepNum} ${unitPlural} starting at ${base}`;
    }
    return `every ${stepNum} ${unitPlural}`;
  }
  
  if (exp.includes('-')) {
    const [start, end] = exp.split('-').map(Number);
    return `from ${unit} ${start} through ${end}`;
  }
  
  if (isNumericLike(exp)) {
    return `at ${unit} ${exp}`;
  }
  
  return exp;
}

function describeTimeOfDay(minuteExp: string, hourExp: string) {
  // Specific time HH:MM
  if (!SPECIAL_CHARS.test(minuteExp) && !SPECIAL_CHARS.test(hourExp) && isNumericLike(minuteExp) && isNumericLike(hourExp)) {
    const hh = pad2(Number(hourExp));
    const mm = pad2(Number(minuteExp));
    return `At ${hh}:${mm}`;
  }

  const parts: string[] = [];
  
  if (minuteExp !== '*' || hourExp !== '*') {
    if (minuteExp === '*') {
      parts.push(describeExpression(hourExp, 'hour'));
    } else if (hourExp === '*') {
      parts.push(describeExpression(minuteExp, 'minute'));
    } else {
      parts.push(`${describeExpression(minuteExp, 'minute')}, ${describeExpression(hourExp, 'hour')}`);
    }
  } else {
    parts.push('every minute');
  }

  return parts.join(', ');
}

function describeDayOfWeek(dayWeekExp: string) {
  if (dayWeekExp === '*') return ', every day';
  if (isNumericLike(dayWeekExp)) {
    const i = Math.max(0, Math.min(6, Number(dayWeekExp)));
    return `, on ${DAY_NAMES[i]}`;
  }
  if (dayWeekExp.includes(',')) {
    const items = dayWeekExp.split(',');
    const dayNames = items.map(d => DAY_NAMES[Math.max(0, Math.min(6, Number(d)))]);
    return `, on ${dayNames.join(', ')}`;
  }
  if (dayWeekExp.includes('-')) {
    const [start, end] = dayWeekExp.split('-').map(Number);
    return `, from ${DAY_NAMES[Math.max(0, Math.min(6, start))]} through ${DAY_NAMES[Math.max(0, Math.min(6, end))]}`;
  }
  if (dayWeekExp.includes('/')) {
    const [base, step] = dayWeekExp.split('/');
    if (base === '*') return `, every ${step} days`;
    return `, ${describeExpression(dayWeekExp, 'day')}`;
  }
  return '';
}

function describeMonth(monthExp: string) {
  if (monthExp === '*') return '';
  if (isNumericLike(monthExp)) {
    const i = Math.max(1, Math.min(12, Number(monthExp)));
    return `, in ${MONTH_NAMES[i - 1]}`;
  }
  if (monthExp.includes(',')) {
    const items = monthExp.split(',');
    const monthNames = items.map(m => MONTH_NAMES[Math.max(1, Math.min(12, Number(m))) - 1]);
    return `, in ${monthNames.join(', ')}`;
  }
  if (monthExp.includes('-')) {
    const [start, end] = monthExp.split('-').map(Number);
    return `, from ${MONTH_NAMES[Math.max(1, Math.min(12, start)) - 1]} through ${MONTH_NAMES[Math.max(1, Math.min(12, end)) - 1]}`;
  }
  if (monthExp.includes('/')) {
    return `, ${describeExpression(monthExp, 'month')}`;
  }
  return '';
}

function describeDayOfMonth(dayMonthExp: string) {
  if (dayMonthExp === '*') return ', every day';
  if (isNumericLike(dayMonthExp)) return `, on day ${dayMonthExp} of the month`;
  return `, ${describeExpression(dayMonthExp, 'day')} of the month`;
}

function toSentenceCase(s: string) {
  if (!s) return s;
  return s.charAt(0).toUpperCase() + s.slice(1);
}

function buildCronText(minute: string | number, hour: string | number, dayMonth: string | number, month: string | number, dayWeek: string | number) {
  const m = String(minute);
  const h = String(hour);
  const dm = String(dayMonth);
  const mo = String(month);
  const dw = String(dayWeek);

  const timeSegment = describeTimeOfDay(m, h);

  // Follow: if day-of-month is '*', prefer day-of-week segment; else day-of-month
  const domOrDow = dm === '*' ? describeDayOfWeek(dw) : describeDayOfMonth(dm);
  const monthDesc = describeMonth(mo);

  // Avoid redundant ", every day" if both dm === '*' and dw === '*'
  const parts = [timeSegment, domOrDow, monthDesc].filter(Boolean).join('');
  const normalized = parts.replace('every minute, every hour', 'every minute');
  return toSentenceCase(normalized).replace(/\.$/, '') + '.';
}

// Random helpers for cron segments (include '*', lists ',', ranges '-', steps '/')
function randInt(min: number, max: number) { // inclusive
  return Math.floor(Math.random() * (max - min + 1)) + min;
}

function pick<T>(arr: T[]): T { return arr[randInt(0, arr.length - 1)]; }

function genValue(rangeMin: number, rangeMax: number) {
  return String(randInt(rangeMin, rangeMax));
}

function genRange(rangeMin: number, rangeMax: number) {
  const a = randInt(rangeMin, rangeMax);
  const b = randInt(rangeMin, rangeMax);
  const [lo, hi] = a <= b ? [a, b] : [b, a];
  if (lo === hi) return String(lo);
  return `${lo}-${hi}`;
}

function genList(rangeMin: number, rangeMax: number) {
  const count = randInt(2, 4);
  const set = new Set<number>();
  while (set.size < count) set.add(randInt(rangeMin, rangeMax));
  return Array.from(set).sort((x, y) => x - y).join(',');
}

function genStep(rangeMin: number, rangeMax: number) {
  const base = Math.random() < 0.5 ? '*' : String(randInt(rangeMin, rangeMax));
  const step = Math.max(1, randInt(1, Math.min(15, rangeMax - rangeMin)));
  return `${base}/${step}`;
}

function genSegment(rangeMin: number, rangeMax: number, allowStar = true) {
  const forms = ['value', 'range', 'list', 'step'];
  if (allowStar) forms.push('star');
  switch (pick(forms)) {
    case 'star': return '*';
    case 'value': return genValue(rangeMin, rangeMax);
    case 'range': return genRange(rangeMin, rangeMax);
    case 'list': return genList(rangeMin, rangeMax);
    case 'step': return genStep(rangeMin, rangeMax);
    default: return '*';
  }
}

// Helper functions for cron expression parsing
function parseList(expr: string): string[] { 
  return expr.split(','); 
}

function inRange(val: number, rangeExpr: string): boolean {
  const [a, b] = rangeExpr.split('-').map(Number);
  if (Number.isNaN(a) || Number.isNaN(b)) return false;
  return val >= Math.min(a, b) && val <= Math.max(a, b);
}

function matchStep(val: number, baseExpr: string, step: number): boolean {
  if (baseExpr === '*' || baseExpr === '') return val % step === 0;
  if (baseExpr.includes('-')) {
    const [a, b] = baseExpr.split('-').map(Number);
    if (Number.isNaN(a) || Number.isNaN(b)) return false;
    if (val < Math.min(a, b) || val > Math.max(a, b)) return false;
    return (val - Math.min(a, b)) % step === 0;
  }
  const n = Number(baseExpr);
  if (Number.isNaN(n)) return false;
  if (val < n) return false;
  return (val - n) % step === 0;
}

function valueMatches(val: number, expr: string): boolean {
  if (expr === '*') return true;
  if (expr.includes(',')) return parseList(expr).some((e) => valueMatches(val, e));
  if (expr.includes('/')) {
    const [base, stepStr] = expr.split('/');
    const step = Number(stepStr);
    if (!step || step < 1) return false;
    return matchStep(val, base, step);
  }
  if (expr.includes('-')) return inRange(val, expr);
  const n = Number(expr);
  return !Number.isNaN(n) && val === n;
}

function nextOccurrence(
  minute: string | number,
  hour: string | number,
  dayMonth: string | number,
  month: string | number,
  dayWeek: string | number
) {
  const now = new Date();
  const minuteExpr = String(minute);
  const hourExpr = String(hour);
  const dayMonthExpr = String(dayMonth);
  const monthExpr = String(month);
  const dayWeekExpr = String(dayWeek);

  // Start from the next minute boundary
  const candidate = new Date(now);
  candidate.setSeconds(0, 0);
  candidate.setMinutes(candidate.getMinutes() + 1);

  // Search for next occurrence within reasonable bounds
  for (let attempts = 0; attempts < 4 * 365 * 24 * 60; attempts++) { // Up to 4 years
    const currentMonth = candidate.getMonth() + 1;
    const currentDate = candidate.getDate();
    const currentHour = candidate.getHours();
    const currentMinute = candidate.getMinutes();
    const currentDayOfWeek = candidate.getDay();

    // Check if current time matches all constraints
    const monthMatches = valueMatches(currentMonth, monthExpr);
    const dateMatches = dayMonthExpr === '*' || valueMatches(currentDate, dayMonthExpr);
    const dayOfWeekMatches = dayWeekExpr === '*' || valueMatches(currentDayOfWeek, dayWeekExpr);
    const hourMatches = valueMatches(currentHour, hourExpr);
    const minuteMatches = valueMatches(currentMinute, minuteExpr);

    // For day matching, if both day-of-month and day-of-week are specified, 
    // either can match (OR logic), but if only one is specified, it must match
    let dayMatches = false;
    if (dayMonthExpr === '*') {
      dayMatches = dayOfWeekMatches;
    } else if (dayWeekExpr === '*') {
      dayMatches = dateMatches;
    } else {
      dayMatches = dateMatches || dayOfWeekMatches;
    }

    if (monthMatches && dayMatches && hourMatches && minuteMatches && candidate > now) {
      return candidate;
    }

    // Advance to next candidate minute
    candidate.setMinutes(candidate.getMinutes() + 1);
  }

  // Fallback if no match found (shouldn't happen with reasonable expressions)
  const fallback = new Date(now);
  fallback.setDate(fallback.getDate() + 1);
  fallback.setHours(0, 0, 0, 0);
  return fallback;
}

export default function CronJutsuPage() {
  const [minute, setMinute] = useState<string | number>(5);
  const [hour, setHour] = useState<string | number>(4);
  const [dayMonth, setDayMonth] = useState<string | number>("*");
  const [month, setMonth] = useState<string | number>("*");
  const [dayWeek, setDayWeek] = useState<string | number>("*");
  const [copied, setCopied] = useState(false);
  // Always-editable inputs
  const [textEditor, setTextEditor] = useState('');
  const [statusText, setStatusText] = useState<'idle' | 'correct' | 'incorrect'>('idle');
  const [statusCron, setStatusCron] = useState<'idle' | 'correct' | 'incorrect'>('idle');
  const [cronEditor, setCronEditor] = useState('');
  const [editingCron, setEditingCron] = useState(false);
  const [editingText, setEditingText] = useState(false);
  const cronEditorRef = useRef<HTMLTextAreaElement>(null);
  const [practiceMode, setPracticeMode] = useState(false);
  const [practiceTarget, setPracticeTarget] = useState<string | null>(null);
  const [practiceTextMode, setPracticeTextMode] = useState(false);
  const [practiceTextTarget, setPracticeTextTarget] = useState<string | null>(null);
  const textEditorRef = useRef<HTMLTextAreaElement>(null);

  const cron = useMemo(
    () => `${minute} ${hour} ${dayMonth} ${month} ${dayWeek}`,
    [minute, hour, dayMonth, month, dayWeek]
  );
  const cronText = useMemo(() => buildCronText(minute, hour, dayMonth, month, dayWeek), [minute, hour, dayMonth, month, dayWeek]);
  // Defer Date-based UI to client to avoid SSR hydration mismatches (timezone/seconds)
  const [nextRunText, setNextRunText] = useState<string>("—");
  useEffect(() => {
    const n = nextOccurrence(minute, hour, dayMonth, month, dayWeek);
    setNextRunText(formatDateTime(n));
  }, [minute, hour, dayMonth, month, dayWeek]);

  // UI colors for validation states
  let textBorderColor = '#ccc';
  if (statusText === 'correct') textBorderColor = 'green';
  else if (statusText === 'incorrect') textBorderColor = '#b33';

  let cronBorderColor = '#ccc';
  if (statusCron === 'correct') cronBorderColor = 'green';
  else if (statusCron === 'incorrect') cronBorderColor = '#b33';

  // Randomize defaults on initial load
  useEffect(() => {
    randomize();
  }, []);

  const copyCron = async () => {
    try {
      await navigator.clipboard.writeText(cron);
      // Simple affordance: briefly show "Copied"
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    } catch {
      // no-op
    }
  };

  const randomize = () => {
    // Use expressive cron forms including '*', lists ',', ranges '-', and steps '/'
    const m = genSegment(0, 59, true);
    const h = genSegment(0, 23, true);
    // day-of-month 1-28 (safe for Feb)
    const dm = genSegment(1, 28, true);
    const mo = genSegment(1, 12, true);
    const dw = genSegment(0, 6, true);
    setMinute(m);
    setHour(h);
    setDayMonth(dm);
    setMonth(mo);
    setDayWeek(dw);
  setTextEditor(buildCronText(m, h, dm, mo, dw));
    setCronEditor(`${m} ${h} ${dm} ${mo} ${dw}`);
    setCopied(false);
    setStatusText('idle');
    setStatusCron('idle');
  };

  // Focus cron expression editor for practice
  const practiceCronExpression = () => {
    // Lock current cron as the target and clear the input for guessing
  // Ensure text practice mode is off
  setPracticeTextMode(false);
  setPracticeTextTarget(null);
    setPracticeTarget(cron);
    setPracticeMode(true);
    setStatusCron('idle');
    setCronEditor('');
    setEditingCron(true);
    if (cronEditorRef.current) {
      cronEditorRef.current.focus();
    }
  };

  // Practice generating cron description (text) from the current cron expression
  const practiceCronEvaluation = () => {
    // Ensure expression practice mode is off
    if (practiceMode) {
      setPracticeMode(false);
      setPracticeTarget(null);
      setStatusCron('idle');
      setEditingCron(false);
      setCronEditor(cron);
    }
    setPracticeTextTarget(cronText);
    setPracticeTextMode(true);
    setStatusText('idle');
    setTextEditor('');
    setEditingText(true);
    if (textEditorRef.current) {
      textEditorRef.current.focus();
    }
  };

  // Cancel current practice mode (expression or text)
  const cancelPractice = () => {
    if (practiceMode) {
      setPracticeMode(false);
      setPracticeTarget(null);
      setStatusCron('idle');
      setEditingCron(false);
      setCronEditor(cron);
    }
    if (practiceTextMode) {
      setPracticeTextMode(false);
      setPracticeTextTarget(null);
      setStatusText('idle');
      setEditingText(false);
      setTextEditor(cronText);
    }
  };

  // Normalizers for matching
  const normalizeCronText = (s: string) => s.trim().replace(/\.$/, '').replace(/\s+/g, ' ').toLowerCase();

  // Keep text editor in sync with computed cron text unless user is editing
  useEffect(() => {
    if (!editingText && !practiceMode && !practiceTextMode) {
      setTextEditor(cronText);
    }
  }, [cronText, editingText, practiceMode, practiceTextMode]);

  const onTextEditorChange = (val: string) => {
    const norm = val.replace(/\n/g, ' ').replace(/\s+/g, ' ').trimStart();
    setTextEditor(norm);
    if (!norm.trim()) { setStatusText('idle'); return; }
    if (practiceTextMode) {
      const target = normalizeCronText((practiceTextTarget ?? ''));
      const ok = normalizeCronText(norm) === target;
      setStatusText(ok ? 'correct' : 'incorrect');
      return;
    }
    const ok = normalizeCronText(norm) === normalizeCronText(cronText);
    setStatusText(ok ? 'correct' : 'incorrect');
  };

  // Keep cron editor in sync with computed cron unless user is editing
  useEffect(() => {
    if (!editingCron && !practiceMode) {
      setCronEditor(cron);
    }
  }, [cron, editingCron, practiceMode]);

  const onCronEditorChange = (val: string) => {
    const norm = val.replace(/\n/g, ' ').replace(/\s+/g, ' ').trimStart();
    setCronEditor(norm);
    if (!norm.trim()) { setStatusCron('idle'); return; }
    if (practiceMode) {
      const target = (practiceTarget ?? '').trim();
      const ok = norm.trim() === target;
      setStatusCron(ok ? 'correct' : 'incorrect');
      // Do not mutate actual cron state during practice
      return;
    }
    if (practiceTextMode) {
      // During text practice, cron expression should not be edited/applied
      return;
    }
    const ok = applyCronExpression(norm);
    setStatusCron(ok ? 'correct' : 'incorrect');
  };

  // Cron expression syntax validator by field
  const isValidTokenForField = (expr: string, field: 'minute' | 'hour' | 'dayMonth' | 'month' | 'dayWeek'): boolean => {
    const allowed = /^[0-9*,\-/]+$/;
    if (!expr || !allowed.test(expr)) return false;
    const ranges = {
      minute: [0, 59],
      hour: [0, 23],
      dayMonth: [1, 31],
      month: [1, 12],
      dayWeek: [0, 6],
    } as const;
    const [minV, maxV] = ranges[field];

    const inBounds = (n: number) => Number.isInteger(n) && n >= minV && n <= maxV;
    const validateBase = (base: string) => {
      if (base === '*' || base === '') return true;
      if (base.includes('-')) {
        const [aStr, bStr] = base.split('-');
        const a = Number(aStr), b = Number(bStr);
        return inBounds(a) && inBounds(b);
      }
      const n = Number(base);
      return inBounds(n);
    };

    // support lists
    return expr.split(',').every((item) => {
      if (item === '*') return true;
      if (item.includes('/')) {
        const [base, stepStr] = item.split('/');
        const step = Number(stepStr);
        if (!step || step < 1 || !Number.isFinite(step)) return false;
        return validateBase(base);
      }
      return validateBase(item);
    });
  };

  const applyCronExpression = (expr: string) => {
    const parts = expr.trim().split(/\s+/);
    if (parts.length !== 5) return false;
    const [m, h, dm, mo, dw] = parts;
    if (!isValidTokenForField(m, 'minute')) return false;
    if (!isValidTokenForField(h, 'hour')) return false;
    if (!isValidTokenForField(dm, 'dayMonth')) return false;
    if (!isValidTokenForField(mo, 'month')) return false;
    if (!isValidTokenForField(dw, 'dayWeek')) return false;
    setMinute(m);
    setHour(h);
    setDayMonth(dm);
    setMonth(mo);
    setDayWeek(dw);
    return true;
  };

  // Instant validation handled by onTextEditorChange
  // cron input handled by textarea onChange

  // No separate Show for text; editing is inline
  // no separate showCron; inline editor edits directly

  return (
    <div>
      <Navbar />
  <main className="cronjutsu-main" suppressHydrationWarning>
        <div className="cronjutsu-container">
          <header className="cronjutsu-header">
            <h1 className="cron-title">Cron-jutsu</h1>
  <section className="cron-box" aria-label="Cron text display" style={{ padding: '1.75rem', border: '1px solid', borderColor: textBorderColor, opacity: practiceMode ? 0.85 : 1 }}>
              <textarea
                className="cron-text cron-text-emph"
                value={textEditor}
                aria-label="Cron description editor"
                rows={4}
                spellCheck={false}
                onFocus={() => setEditingText(true)}
                onBlur={() => setEditingText(false)}
                onKeyDown={(e) => {
                  if (e.key === 'Enter') {
                    e.preventDefault();
                    if (practiceTextMode) {
                      const target = (practiceTextTarget ?? cronText);
                      setTextEditor(target);
                      setStatusText('correct');
                      setPracticeTextMode(false);
                      setPracticeTextTarget(null);
                      setEditingText(false);
                    }
                  }
                }}
                onChange={(e) => onTextEditorChange(e.target.value)}
                style={{
                  width: '100%',
                  textAlign: 'center',
                  padding: '0.75rem',
                  outline: 'none',
                  resize: 'none',
                  overflow: 'hidden',
                  background: 'transparent',
      lineHeight: 1,
      border: 'none'
                }}
                readOnly={practiceMode}
              />
            </section>
            <p className="cron-next">next at <span className="cron-next-when">{nextRunText}</span></p>
          </header>

  <section className="cron-box" aria-label="Cron expression display" style={{ border: '1px solid', borderColor: cronBorderColor }}>
            <textarea
              className="cron-display"
              value={cronEditor}
              aria-label="Cron expression editor"
              rows={1}
              spellCheck={false}
              onFocus={() => setEditingCron(true)}
              onBlur={() => setEditingCron(false)}
              onKeyDown={(e) => {
                if (e.key === 'Enter') {
                  e.preventDefault();
                  if (practiceMode) {
                    // Autofill correct answer and exit practice
                    const target = (practiceTarget ?? cron).trim();
                    setCronEditor(target);
                    setStatusCron('correct');
                    setPracticeMode(false);
                    setPracticeTarget(null);
                    applyCronExpression(target);
                    setEditingCron(false);
                  }
                }
              }}
              onChange={(e) => onCronEditorChange(e.target.value)}
      ref={cronEditorRef}
              style={{
                textAlign: 'center',
                padding: '0.5rem',
                minHeight: '2.25rem',
                outline: 'none',
                resize: 'none',
        overflow: 'hidden',
        border: 'none'
              }}
              readOnly={practiceTextMode}
            />
          </section>

          <div className="legend-row" style={{ marginBottom: '1.25rem' }}>
            <span className="legend-label">minute</span>
            <span className="legend-label">hour</span>
            <span className="legend-label">day (month)</span>
            <span className="legend-label">month</span>
            <span className="legend-label">day (week)</span>
          </div>

          <div
            className="cron-actions"
            style={{ marginTop: '0.75rem', marginBottom: '2.5rem', display: 'flex', justifyContent: 'center', gap: 8, flexWrap: 'wrap' }}
          >
            <button
              className="cron-btn"
              onClick={randomize}
              aria-label="Randomize time"
              disabled={practiceMode || practiceTextMode}
              title={(practiceMode || practiceTextMode) ? 'Disabled in practice mode' : 'Randomize the schedule'}
            >
              Random
            </button>
            <button
              className="cron-btn"
              onClick={practiceCronExpression}
              aria-label="Practice Cron Expression"
              disabled={practiceTextMode}
              title={practiceTextMode ? 'Disabled while practicing cron evaluation' : 'Practice typing the cron expression for this schedule'}
            >
              Practice Cron Expression
            </button>
            <button
              className="cron-btn"
              onClick={practiceCronEvaluation}
              aria-label="Practice Cron Evaluation"
              disabled={practiceMode}
              title={practiceMode ? 'Disabled while practicing cron expression' : 'Practice writing the human-readable cron description'}
            >
              Practice Cron Evaluation
            </button>
            {(practiceMode || practiceTextMode) && (() => {
              const tip = practiceMode
                ? 'Exit cron expression practice and restore the current cron expression'
                : 'Exit cron evaluation practice and restore the current description';
              return (
                <button
                  className="cron-btn"
                  onClick={cancelPractice}
                  aria-label="Cancel Practice"
                  title={tip}
                >
                  Cancel Practice
                </button>
              );
            })()}
            <button
              className="cron-btn primary"
              onClick={copyCron}
              aria-label="Copy cron expression"
              disabled={practiceMode || practiceTextMode}
              title={(practiceMode || practiceTextMode) ? 'Disabled in practice mode' : 'Copy the cron expression to clipboard'}
            >
              {copied ? 'Copied ☑️' : 'Copy'}
            </button>
          </div>

          <section
            className="legend"
            aria-label="Field legend and tips"
          >
            <div className="legend-grid">
              <div>
                <h4 className="legend-heading">Syntax</h4>
              <ul className="legend-table">
                <li><code>*</code><span>any value</span></li>
                <li><code>,</code><span>value list separator</span></li>
                <li><code>-</code><span>range of values</span></li>
                <li><code>/</code><span>step values</span></li>
              </ul>
              </div>
              <div>
                <h4 className="legend-heading">Tips</h4>
                <ul className="legend-tips">
                <li>Press Enter to reveal the correct answer in practice mode.</li>
                <li>In practice mode, the section border shows the result— 🟩 green for correct, 🟥 red for incorrect.</li>
                <li>Outside practice mode, clicking/tapping outside of the box will default to correct value.</li>
                </ul>
              </div>
            </div>
          </section>

          
        </div>
      </main>
    </div>
  );
}
