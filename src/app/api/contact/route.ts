import { NextRequest, NextResponse } from 'next/server';
import nodemailer from 'nodemailer';

export const runtime = 'nodejs';

export async function POST(request: NextRequest) {
  try {
    const { name, email, message } = await request.json();

    // Validate required fields
    if (!name || !email || !message) {
      return NextResponse.json(
        { error: 'All fields are required' },
        { status: 400 }
      );
    }

    // Validate env vars
    const user = process.env.EMAIL_USER;
    const pass = process.env.EMAIL_PASS;
    if (!user || !pass) {
      console.error('Missing EMAIL_USER or EMAIL_PASS env vars');
      return NextResponse.json(
        { error: 'Server email is not configured' },
        { status: 500 }
      );
    }

    // Create transporter with explicit Zoho SMTP settings (adjust host/port per region if needed)
    const host = process.env.ZOHO_SMTP_HOST || 'smtp.zoho.in'; // use smtp.zoho.com, smtp.zoho.eu, etc. as appropriate
    const port = Number(process.env.ZOHO_SMTP_PORT || 465);
    const secure = port === 465; // true for 465, false for 587

    const transporter = nodemailer.createTransport({
      host,
      port,
      secure,
      auth: {
        user,
        pass,
      },
    });

    // Verify SMTP connection/auth
    try {
      await transporter.verify();
    } catch (verifyError) {
      console.error('SMTP verify failed:', verifyError);
      return NextResponse.json(
        { error: 'Email service authentication failed' },
        { status: 500 }
      );
    }

    // Email to you (notification of new contact)
    const mailToYou = {
      from: user, // must be the authenticated mailbox for Zoho
      to: user, // Your email to receive messages
      replyTo: email, // so you can reply directly to the sender
      subject: `New Contact Form Message from ${name}`,
      html: `
        <h2>New Contact Form Submission</h2>
        <p><strong>Name:</strong> ${name}</p>
        <p><strong>Email:</strong> ${email}</p>
        <p><strong>Message:</strong></p>
        <p>${message.replace(/\n/g, '<br>')}</p>
        <hr>
        <p><em>This message was sent from your portfolio contact form.</em></p>
      `,
    } as const;

    // Auto-reply email to the sender
    const autoReply = {
      from: user, // must be the authenticated mailbox
      to: email,
      subject: 'Thank you for reaching out!',
      html: `
        <h2>Thank you for your message, ${name}!</h2>
        <p>I have received your message and will get back to you as soon as possible.</p>
        <p>Here's a copy of what you sent:</p>
        <blockquote style="border-left: 4px solid #2ec4b6; padding-left: 16px; margin: 16px 0; color: #666;">
          ${message.replace(/\n/g, '<br>')}
        </blockquote>
        <p>Best regards,<br>Jayant Jeet Tomar</p>
        <hr>
        <p style="font-size: 12px; color: #888;">This is an automated reply from jayant's portfolio website.</p>
      `,
    } as const;

    // Send both emails
    await transporter.sendMail(mailToYou);
    await transporter.sendMail(autoReply);

    return NextResponse.json(
      { message: 'Email sent successfully' },
      { status: 200 }
    );
  } catch (error: unknown) {
    if (error && typeof error === 'object') {
      const err = error as { message?: string; response?: unknown };
      console.error('Error sending email:', err.message || error, err.response || '');
    } else {
      console.error('Error sending email:', error);
    }
    return NextResponse.json(
      { error: 'Failed to send email' },
      { status: 500 }
    );
  }
}
