import { NextResponse } from 'next/server';
import { Resend } from 'resend';

const RESEND_API_KEY = process.env.RESEND_API_KEY || '';
const FROM_EMAIL = process.env.RESEND_FROM || 'onboarding@resend.dev';
const TO_EMAIL = process.env.CONTACT_RECEIVER_EMAIL || 'nyxxlumapak@gmail.com';

if (!RESEND_API_KEY) {
  console.warn('Resend API key is not set (process.env.RESEND_API_KEY). Contact emails will fail.');
}

export async function POST(req: Request) {
  try {
    const body = await req.json();
    const { name, email, subject, message } = body ?? {};

    if (!name || !email || !subject || !message) {
      return NextResponse.json({ error: 'Missing required fields' }, { status: 400 });
    }

    if (!RESEND_API_KEY) {
      return NextResponse.json({ error: 'Email service not configured' }, { status: 500 });
    }

    if (!isValidEmail(FROM_EMAIL)) {
      return NextResponse.json(
        { error: 'RESEND_FROM must be a valid email address, such as onboarding@resend.dev' },
        { status: 500 }
      );
    }

    if (!isValidEmail(TO_EMAIL)) {
      return NextResponse.json(
        { error: 'CONTACT_RECEIVER_EMAIL must be a valid email address' },
        { status: 500 }
      );
    }

    const resend = new Resend(RESEND_API_KEY);

    const html = `
      <h2>New contact form submission</h2>
      <p><strong>Name:</strong> ${escapeHtml(name)}</p>
      <p><strong>Email:</strong> ${escapeHtml(email)}</p>
      <p><strong>Subject:</strong> ${escapeHtml(subject)}</p>
      <p><strong>Message:</strong></p>
      <div>${escapeHtml(message).replace(/\n/g, '<br/>')}</div>
    `;

    await resend.emails.send({
      from: FROM_EMAIL,
      to: TO_EMAIL,
      subject: `Contact form: ${subject}`,
      html,
    });

    return NextResponse.json({ ok: true });
  } catch (err: unknown) {
    console.error('Error sending contact email:', err);
    const message = err instanceof Error ? err.message : String(err);
    return NextResponse.json({ error: message }, { status: 500 });
  }
}

function escapeHtml(str: string) {
  return String(str)
    .replace(/&/g, '&amp;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;')
    .replace(/"/g, '&quot;')
    .replace(/'/g, '&#39;');
}

function isValidEmail(value: string) {
  return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(value);
}
