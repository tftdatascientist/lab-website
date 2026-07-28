import { Resend } from "resend";
import { NextResponse } from "next/server";

const resend = new Resend(process.env.RESEND_API_KEY);

// Domena lok-ai.pl jest zweryfikowana w Resend (DKIM resend._domainkey + send.lok-ai.pl).
// kontakt@lok-ai.pl to przekierowanie MX Plan w OVH.
const CONTACT_TO = process.env.CONTACT_TO ?? "kontakt@lok-ai.pl";
const CONTACT_FROM =
  process.env.CONTACT_FROM ?? "Formularz lok-ai <formularz@lok-ai.pl>";

export async function POST(req: Request) {
  const { name, company, email, phone, message } = await req.json();

  if (!name || !email || !message) {
    return NextResponse.json({ error: "Brakuje wymaganych pól" }, { status: 400 });
  }

  const { error } = await resend.emails.send({
    from: CONTACT_FROM,
    to: CONTACT_TO,
    replyTo: email,
    subject: `Nowa wiadomość od ${name}${company ? ` (${company})` : ""}`,
    text: [
      `Imię: ${name}`,
      company ? `Firma: ${company}` : "",
      `Email: ${email}`,
      phone ? `Telefon: ${phone}` : "",
      "",
      `Wiadomość:`,
      message,
    ]
      .filter(Boolean)
      .join("\n"),
  });

  if (error) {
    return NextResponse.json({ error: error.message }, { status: 500 });
  }

  return NextResponse.json({ ok: true });
}
