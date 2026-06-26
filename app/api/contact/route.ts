import { NextResponse } from 'next/server';
import { Resend } from 'resend';
import { contactSchema } from 'lib/contactSchema';

export async function POST(req: Request) {
  let body: unknown;

  try {
    body = await req.json();
  } catch {
    return NextResponse.json(
      { ok: false, error: 'Invalid request body.' },
      { status: 400 },
    );
  }

  // Honeypot: a filled hidden field means a bot. Pretend success, send nothing.
  if (
    body &&
    typeof body === 'object' &&
    'botcheck' in body &&
    body.botcheck
  ) {
    return NextResponse.json({ ok: true });
  }

  // Server-side validation — never trust the client. Same schema as the form.
  const parsed = contactSchema.safeParse(body);
  if (!parsed.success) {
    return NextResponse.json(
      { ok: false, error: 'Please fill in all fields with a valid email.' },
      { status: 422 },
    );
  }

  const { subject, email, message } = parsed.data;

  const apiKey = process.env.RESEND_API_KEY;
  const to = process.env.CONTACT_MAIL;
  const from = process.env.CONTACT_FROM;

  if (!apiKey || !to || !from) {
    console.error(
      'Contact form is missing RESEND_API_KEY/CONTACT_MAIL/CONTACT_FROM.',
    );
    return NextResponse.json(
      { ok: false, error: 'The contact form is not configured.' },
      { status: 500 },
    );
  }

  try {
    const resend = new Resend(apiKey);
    const { error } = await resend.emails.send({
      from,
      to,
      replyTo: email,
      subject: `[Contact] ${subject}`,
      text: `From: ${email}\n\n${message}`,
    });

    if (error) {
      console.error('Resend error:', error);
      return NextResponse.json(
        { ok: false, error: 'Failed to send your message. Please try again.' },
        { status: 502 },
      );
    }

    return NextResponse.json({ ok: true });
  } catch (err) {
    console.error('Contact form error:', err);
    return NextResponse.json(
      { ok: false, error: 'Failed to send your message. Please try again.' },
      { status: 500 },
    );
  }
}
