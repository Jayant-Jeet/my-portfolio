/*
 * Half-Blood Coder Portfolio
 * Copyright (c) 2025 Jayant Jeet Tomar
 * All Rights Reserved
 * 
 * This source code is proprietary and confidential.
 * Unauthorized copying, modification, distribution, or use
 * of this software, via any medium, is strictly prohibited.
 * 
 * For licensing inquiries: https://www.halfbloodcoder.com/contact
 */

import nodemailer from 'nodemailer';
import { NextRequest, NextResponse } from 'next/server';

// Simple in-memory idempotency guard to avoid duplicate emails within a short window
const recentKeys = new Map<string, number>();
const WINDOW_MS = 20_000; // 20 seconds
function seenRecently(key: string): boolean {
  const now = Date.now();
  const last = recentKeys.get(key);
  if (last && now - last < WINDOW_MS) return true;
  // prune occasionally
  recentKeys.set(key, now);
  if (recentKeys.size > 500) {
    for (const [k, t] of recentKeys) {
      if (now - t > WINDOW_MS) recentKeys.delete(k);
    }
  }
  return false;
}

// Expect JSON: { orderId: string, image: dataUrl }
export async function POST(req: NextRequest) {
  try {
    const { orderId, image, idempotencyKey } = await req.json();
    if (!orderId || !image || typeof image !== 'string') {
      return NextResponse.json({ ok: false, error: 'Invalid payload' }, { status: 400 });
    }

    const key = String(idempotencyKey || orderId);
    if (seenRecently(key)) {
      return NextResponse.json({ ok: true, duplicate: true });
    }

    // Parse data URL
  const regex = /^data:(image\/(png|jpeg));base64,(.+)$/;
  const match = regex.exec(image);
    if (!match) {
      return NextResponse.json({ ok: false, error: 'Invalid image data' }, { status: 400 });
    }
    const mime = match[1];
    const ext = mime.includes('png') ? 'png' : 'jpg';
    const base64 = match[3];

    // Configure transporter from environment variables
    const host = process.env.ZOHO_SMTP_HOST;
    const port = Number(process.env.ZOHO_SMTP_PORT || 587);
    const user = process.env.EMAIL_USER;
    const pass = process.env.EMAIL_PASS;
    const to = process.env.OFFER_EMAIL_TO || process.env.ZOHO_SMTP_USER; // default to user
    const from = process.env.OFFER_EMAIL_FROM || `Offers <${user}>`;

    if (!host || !user || !pass || !to) {
      return NextResponse.json({ ok: false, error: 'SMTP not configured' }, { status: 500 });
    }

    const transporter = nodemailer.createTransport({
      host,
      port,
      secure: port === 465,
      auth: { user, pass }
    });

    const info = await transporter.sendMail({
      from,
      to,
      subject: `Offer ${orderId}`,
      text: `Attached is the generated offer image for ${orderId}.`,
      attachments: [
        {
          filename: `offer-${orderId}.${ext}`,
          content: Buffer.from(base64, 'base64'),
          contentType: mime
        }
      ]
    });

    return NextResponse.json({ ok: true, messageId: info.messageId });
  } catch (err) {
    console.error(err);
    return NextResponse.json({ ok: false, error: 'Unexpected error' }, { status: 500 });
  }
}
