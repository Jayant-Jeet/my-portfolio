/*
 * Offer Checkout - Offer Summary Generator
 * Part of Half-Blood Coder Portfolio
 * Copyright (c) 2025 Jayant Jeet Tomar
 * All Rights Reserved - Patent Pending
 * 
 * This proprietary tool is protected under patent law.
 * Commercial use, reproduction, or derivative works are strictly prohibited.
 * 
 * For licensing inquiries: https://www.halfbloodcoder.com/contact
 */

'use client';

import React from 'react';
import { toPng } from 'html-to-image';
import Image from 'next/image';
import { GlareCard } from '../../components/ui/glare-card';
import Navbar from '../../components/navbar';

export default function OfferCheckoutPage() {
  const CURRENCY = '₹';
  const [baseSalary, setBaseSalary] = React.useState<number>(20);
  const [sending, setSending] = React.useState(false);
  const [promoApplied, setPromoApplied] = React.useState(false);
  const rightRef = React.useRef<HTMLDivElement>(null);
  const format = (n: number) => `${CURRENCY}${n.toLocaleString('en-IN', { maximumFractionDigits: 0 })} LPA`;
  const orderId = React.useMemo(() => `ORDRJJ${Math.floor(Date.now() / 10000000)}`, []);
  const OFFER_ACCEPTANCE_FEE = 2;
  const EXCLUSIVITY_FEE = 8;
  const DELIVERY_FREE_THRESHOLD = 23;
  const DELIVERY_FEE_BASE = 4; // default delivery fee for offers below threshold
  const DELIVERY_FEE = baseSalary >= DELIVERY_FREE_THRESHOLD ? 0 : DELIVERY_FEE_BASE;
  const NEEDED_FOR_FREE_DELIVERY = Math.max(0, DELIVERY_FREE_THRESHOLD - baseSalary);
  const TOTAL = baseSalary + OFFER_ACCEPTANCE_FEE + EXCLUSIVITY_FEE + DELIVERY_FEE;
  const DISCOUNT_APPLIED = promoApplied ? 1 : 0; // 1 LPA flat discount per request
  const GRAND_TOTAL = Math.max(0, TOTAL - DISCOUNT_APPLIED);
  const clamp = (v: number, min = 20, max = 50) => Math.min(max, Math.max(min, v));

  const handleDownloadAndEmail = async () => {
    if (sending || !rightRef.current) return;
    try {
      setSending(true);
      const dataUrl = await toPng(rightRef.current, {
        cacheBust: true,
        pixelRatio: 2,
        backgroundColor: '#ffffff',
        // Prevent reading cross-origin CSSStyleSheet rules which can throw SecurityError
        skipFonts: true
      });

      // Trigger a client-side download
      const link = document.createElement('a');
      link.href = dataUrl;
      link.download = `offer-${orderId}.png`;
      document.body.appendChild(link);
      link.click();
      link.remove();

      // Send the image to server to email
      const idempotencyKey = `${orderId}-${Date.now()}-${Math.random().toString(36).slice(2, 8)}`;
      await fetch('/api/send-offer', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ orderId, image: dataUrl, idempotencyKey })
      });
    } catch (err) {
      console.error('Failed to generate or send offer image', err);
    } finally {
      setSending(false);
    }
  };

  return (
    <div>
      <Navbar />

      <main
        className="contact-main"
        style={{
          padding: '2rem',
          paddingTop: '100px',
          minHeight: '100vh',
          display: 'flex',
          flexDirection: 'column',
          justifyContent: 'center',
          alignItems: 'center',
        }}
      >
  <div className="contact-container">
          {/* Left Column - Hero Image */}
          <div
            className="contact-left-column"
            style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', gap: '0.75rem' }}
          >
            <h1
              style={{
                fontSize: '2rem',
                marginBottom: '0.5rem',
                fontWeight: 'bold',
                color: 'var(--foreground)',
                textAlign: 'center',
              }}
            >
              Offer <span className="gradient-text">Checkout</span>
            </h1>

            <div className="hero-image">
              <GlareCard>
                <Image
                  src="/profile.png"
                  alt="Jayant Jeet Tomar"
                  width={280}
                  height={280}
                  style={{ borderRadius: '8px', objectFit: 'cover', display: 'block' }}
                />
              </GlareCard>
            </div>
          </div>

          {/* Right Column - Offer Summary (order-style) */}
  <div
            className="contact-right-column card"
            style={{
              padding: '1rem',
              maxWidth: 520,
              width: '100%',
              margin: '0 auto',
              backgroundColor: '#ffffff',
              color: '#111111',
              border: '1px solid #e5e7eb',
        borderRadius: 12,
        boxShadow: '0 1px 2px rgba(0,0,0,0.06), 0 10px 15px rgba(0,0,0,0.08)'
            }}
    ref={rightRef}
          >
            {/* Delivered/Generated status */}
            <div style={{ display: 'flex', alignItems: 'center', gap: '0.75rem', marginBottom: '0.5rem' }}>
              <div
                aria-hidden
                style={{
                  width: 28,
                  height: 28,
                  borderRadius: '50%',
                  backgroundColor: 'rgba(16,185,129,0.12)', // emerald-500 tint
                  border: '1px solid rgba(16,185,129,0.35)',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  color: '#10b981',
                  fontWeight: 700
                }}
              >
                ✓
              </div>
              <div style={{ fontSize: '1.25rem', fontWeight: 700, color: '#111111' }}>Order #{orderId}</div>
            </div>

            <div style={{ height: 1, background: '#e5e7eb', margin: '0.5rem 0 0.5rem' }} />

            {/* Items in order */}
            <div style={{ marginBottom: '0.75rem', color: '#6b7280' }}>1 item in order</div>

            <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', gap: '0.75rem', marginBottom: '0.75rem' }}>
              <div style={{ display: 'flex', alignItems: 'center', gap: '0.75rem' }}>
                <div style={{ width: 48, height: 48, borderRadius: 8, overflow: 'hidden', background: 'rgba(253,255,252,0.06)', border: '1px solid rgba(46,196,182,0.25)' }}>
                  <Image src="/file.svg" alt="Base Salary" width={48} height={48} style={{ objectFit: 'cover', width: '100%', height: '100%' }} />
                </div>
                <div>
                  <div style={{ color: '#111111', fontWeight: 600 }}>Base Salary</div>
                  <div style={{ fontSize: '0.85rem', color: '#6b7280' }}>Fixed • 1 unit</div>
                </div>
              </div>
              <div style={{ display: 'flex', justifyContent: 'flex-end', alignItems: 'center', gap: '0.5rem' }}>
                <div
                  style={{
                    display: 'flex',
                    alignItems: 'center',
                    border: '1px solid #e5e7eb',
                    borderRadius: 8,
                    overflow: 'hidden',
                    background: '#ffffff'
                  }}
                >
                  <button
                    type="button"
                    aria-label="Decrease base salary"
                    onClick={() => setBaseSalary(clamp(baseSalary - 1))}
                    style={{
                      width: 36,
                      height: 36,
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: 'center',
                      borderRight: '1px solid #e5e7eb',
                      background: '#ffffff',
                      color: '#111111'
                    }}
                  >
                    −
                  </button>
                  <input
                    type="number"
                    min={20}
                    max={50}
                    step={1}
                    value={baseSalary}
                    readOnly
                    inputMode="none"
                    aria-readonly
                    aria-label="Base Salary (LPA)"
                    style={{
                      width: 90,
                      height: 36,
                      border: 'none',
                      outline: 'none',
                      textAlign: 'center',
                      background: '#ffffff',
                      color: '#111111',
                      fontWeight: 600
                    }}
                  />
                  <button
                    type="button"
                    aria-label="Increase base salary"
                    onClick={() => setBaseSalary(clamp(baseSalary + 1))}
                    style={{
                      width: 36,
                      height: 36,
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: 'center',
                      borderLeft: '1px solid #e5e7eb',
                      background: '#ffffff',
                      color: '#111111'
                    }}
                  >
                    +
                  </button>
                </div>
                <span style={{ fontSize: '0.9rem', color: '#6b7280' }}>LPA</span>
              </div>
            </div>

            <div style={{ height: 1, background: '#e5e7eb', margin: '0.5rem 0 1rem' }} />

            {/* Offer Summary */}
            <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', marginBottom: '0.5rem' }}>
              <span style={{ fontSize: '1rem' }}>🧾</span>
              <h3 style={{ margin: 0, fontSize: '1.1rem', color: '#111111' }}>Offer Summary</h3>
            </div>

            <div style={{ display: 'grid', rowGap: '0.5rem' }}>
              <div style={{ display: 'flex', justifyContent: 'space-between', color: '#111111' }}>
                <span>Base Salary</span>
                <span>{format(baseSalary)}</span>
              </div>
              <div style={{ display: 'flex', justifyContent: 'space-between', color: '#6b7280', borderBottom: '1px dashed #e5e7eb', paddingBottom: '0.35rem' }}>
                <span>Offer Acceptance Fee</span>
                <span>{format(OFFER_ACCEPTANCE_FEE)}</span>
              </div>
              <div style={{ display: 'flex', justifyContent: 'space-between', color: '#6b7280', borderBottom: '1px dashed #e5e7eb', paddingBottom: '0.35rem' }}>
                <span>Exclusivity Fee</span>
                <span>{format(EXCLUSIVITY_FEE)}</span>
              </div>
              <div style={{ display: 'flex', justifyContent: 'space-between', color: '#6b7280', borderBottom: '1px dashed #e5e7eb', paddingBottom: '0.35rem' }}>
                <span>Delivery Fee</span>
                <span>{DELIVERY_FEE === 0 ? 'FREE 🎉' : format(DELIVERY_FEE)}</span>
              </div>
              {promoApplied && (
                <div style={{ display: 'flex', justifyContent: 'space-between', color: '#6b7280', borderBottom: '1px dashed #e5e7eb', paddingBottom: '0.35rem' }}>
                  <span>Discount (HIREME)</span>
                  <span style={{ color: '#059669', fontWeight: 600 }}>- {format(DISCOUNT_APPLIED)}</span>
                </div>
              )}
            </div>

            {/* Footnote for free delivery threshold */}
            {DELIVERY_FEE > 0 && NEEDED_FOR_FREE_DELIVERY > 0 && (
              <div style={{ marginTop: '0.35rem', color: '#6b7280', fontSize: '0.85rem' }}>
                Add base salary worth {NEEDED_FOR_FREE_DELIVERY.toLocaleString('en-IN', { maximumFractionDigits: 0 })} LPA to get free delivery 🎉
              </div>
            )}

            <div style={{ height: 1, background: '#e5e7eb', margin: '0.75rem 0' }} />

            {/* Promo code area */}
            <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'flex-start', gap: '0.5rem', marginBottom: '0.5rem', flexWrap: 'wrap' }}>
              <div style={{ color: '#6b7280', fontSize: '0.9rem' }}>
                Use code <strong style={{ color: '#111111' }}>HIREME</strong> for 20% off (up to 1 LPA, T&Cs apply).
              </div>
              <button
                type="button"
                onClick={() => setPromoApplied(true)}
                disabled={promoApplied}
                style={{
                  padding: '0.35rem 0.6rem',
                  borderRadius: 6,
                  border: '1px solid #7c3aed',
                  background: promoApplied ? '#ede9fe' : '#ffffff',
                  color: '#7c3aed',
                  fontWeight: 600,
                  fontSize: '0.8rem',
                  lineHeight: 1,
                  cursor: promoApplied ? 'default' : 'pointer'
                }}
                aria-pressed={promoApplied}
                aria-label="Apply HIREME offer"
              >
                {promoApplied ? 'Applied' : 'Apply'}
              </button>
            </div>

            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'baseline' }}>
              <div style={{ color: '#111111', fontWeight: 700 }}>Total</div>
              <div style={{ color: '#111111', fontWeight: 800, fontSize: '1.25rem' }}>{format(GRAND_TOTAL)}</div>
            </div>

            <div style={{ marginTop: '1rem', display: 'flex', justifyContent: 'center' }}>
              <button
                type="button"
                className="btn-secondary"
                style={{
                  padding: '0.9rem 1.25rem',
                  borderRadius: 12,
                  border: '1px solid #7c3aed',
                  background: '#7c3aed', // violet-600
                  color: '#ffffff',
                  boxShadow: '0 8px 16px rgba(124,58,237,0.25)',
                  fontWeight: 600,
                  opacity: sending ? 0.7 : 1,
                  cursor: sending ? 'not-allowed' : 'pointer'
                }}
                onClick={handleDownloadAndEmail}
                disabled={sending}
                aria-busy={sending}
              >
                {sending ? 'Generating…' : 'Download & Generate Offer'}
              </button>
            </div>
          </div>
        </div>
      </main>
    </div>
  );
}
