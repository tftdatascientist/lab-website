"use client";

import { useState, type FormEvent } from "react";

type Status = "idle" | "sending" | "success" | "error";

/** Formularz kontaktowy na papierze (style `.form-grid` w globals.css). Wysyła do /api/contact. */
export default function ContactForm() {
  const [status, setStatus] = useState<Status>("idle");

  async function handleSubmit(e: FormEvent<HTMLFormElement>) {
    e.preventDefault();
    setStatus("sending");

    const form = e.currentTarget;
    const data = {
      name: (form.elements.namedItem("name") as HTMLInputElement).value,
      company: (form.elements.namedItem("company") as HTMLInputElement).value,
      email: (form.elements.namedItem("email") as HTMLInputElement).value,
      phone: (form.elements.namedItem("phone") as HTMLInputElement).value,
      message: (form.elements.namedItem("message") as HTMLTextAreaElement).value,
    };

    try {
      const res = await fetch("/api/contact", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(data),
      });
      if (!res.ok) throw new Error("Request failed");
      setStatus("success");
      form.reset();
    } catch {
      setStatus("error");
    }
  }

  if (status === "success") {
    return (
      <div className="ruled" role="status">
        <p className="label">Wysłano</p>
        <p style={{ fontWeight: 600 }}>Dziękujemy.</p>
        <p style={{ color: "var(--ink-2)" }}>Odezwiemy się w ciągu 24 godzin.</p>
      </div>
    );
  }

  return (
    <form onSubmit={handleSubmit} className="form-grid">
      <div className="two">
        <div>
          <label htmlFor="name">Imię i nazwisko</label>
          <input id="name" name="name" type="text" required placeholder="Anna Kowalska" autoComplete="name" />
        </div>
        <div>
          <label htmlFor="company">Firma</label>
          <input id="company" name="company" type="text" placeholder="Nazwa firmy" autoComplete="organization" />
        </div>
      </div>

      <div className="two">
        <div>
          <label htmlFor="email">E-mail</label>
          <input id="email" name="email" type="email" required placeholder="anna@firma.pl" autoComplete="email" />
        </div>
        <div>
          <label htmlFor="phone">Telefon</label>
          <input id="phone" name="phone" type="tel" placeholder="+48 000 000 000" autoComplete="tel" />
        </div>
      </div>

      <div>
        <label htmlFor="message">Co chcesz zautomatyzować?</label>
        <textarea
          id="message"
          name="message"
          required
          rows={5}
          placeholder="Np. umawianie wizyt, obsługa reklamacji, wystawianie faktur…"
        />
      </div>

      {status === "error" && (
        <p className="mono" role="alert" style={{ color: "var(--accent)" }}>
          Nie wysłano. Spróbuj ponownie albo napisz na kontakt@lok-ai.pl.
        </p>
      )}

      <button type="submit" disabled={status === "sending"} className="cta">
        <span>{status === "sending" ? "Wysyłanie…" : "Umów rozmowę"}</span>
        <span aria-hidden="true">&gt;</span>
      </button>

      <p className="mono" style={{ color: "var(--ink-3)" }}>
        Odpowiadamy w ciągu 24 godzin · bez zobowiązań
      </p>
    </form>
  );
}
