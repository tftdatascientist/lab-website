import { Resend } from "resend";
import { NextResponse } from "next/server";

const resend = new Resend(process.env.RESEND_API_KEY);

export async function POST(req: Request) {
  const { name, company, email, phone, message } = await req.json();

  if (!name || !email || !message) {
    return NextResponse.json({ error: "Brakuje wymaganych pól" }, { status: 400 });
  }

  const { error } = await resend.emails.send({
    from: "Formularz lok-ai <onboarding@resend.dev>",
    to: "serekrazd@gmail.com",
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
