"use client";

import { useState, type FormEvent } from "react";

type Status = "idle" | "sending" | "success" | "error";

const inputStyle = {
  width: "100%",
  background: "#17181b",
  border: "none",
  outline: "1px solid rgba(255,255,255,0.08)",
  borderRadius: 10,
  padding: "12px 14px",
  color: "#ede7dc",
  fontSize: 14,
  fontFamily: "inherit",
} as const;

const labelStyle = {
  display: "block",
  fontSize: 11,
  color: "#a8a29e",
  marginBottom: 8,
  fontFamily: "var(--font-ibm-plex-mono), monospace",
  letterSpacing: "0.1em",
  textTransform: "uppercase" as const,
};

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
      message: (form.elements.namedItem("message") as HTMLTextAreaElement)
        .value,
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
      <div
        className="rounded-[10px] p-8 text-center flex flex-col items-center justify-center h-full"
        style={{
          background: "rgba(245,184,69,0.06)",
          outline: "1px solid rgba(245,184,69,0.2)",
        }}
      >
        <p
          className="font-heading font-bold text-text mb-2"
          style={{ fontSize: 20 }}
        >
          Dziękujemy!
        </p>
        <p className="text-[14px] text-text-dim">
          Odezwiemy się w&nbsp;ciągu 24&nbsp;godzin.
        </p>
      </div>
    );
  }

  return (
    <form onSubmit={handleSubmit} className="flex flex-col gap-4">
      <div className="grid sm:grid-cols-2 gap-4">
        <div>
          <label htmlFor="name" style={labelStyle}>
            Imię i firma
          </label>
          <input
            id="name"
            name="name"
            type="text"
            required
            placeholder="Anna Kowalska, Kowalscy sp. z o.o."
            style={inputStyle}
          />
        </div>
        <div>
          <label htmlFor="company" style={labelStyle}>
            Firma
          </label>
          <input
            id="company"
            name="company"
            type="text"
            placeholder="Nazwa firmy"
            style={inputStyle}
          />
        </div>
      </div>

      <div className="grid sm:grid-cols-2 gap-4">
        <div>
          <label htmlFor="email" style={labelStyle}>
            Email
          </label>
          <input
            id="email"
            name="email"
            type="email"
            required
            placeholder="anna@firma.pl"
            style={inputStyle}
          />
        </div>
        <div>
          <label htmlFor="phone" style={labelStyle}>
            Telefon
          </label>
          <input
            id="phone"
            name="phone"
            type="tel"
            placeholder="+48 000 000 000"
            style={inputStyle}
          />
        </div>
      </div>

      <div>
        <label htmlFor="message" style={labelStyle}>
          Co chcesz zautomatyzować?
        </label>
        <textarea
          id="message"
          name="message"
          required
          rows={4}
          placeholder="Np. umawianie wizyt, obsługa reklamacji, wystawianie faktur…"
          style={{ ...inputStyle, resize: "vertical" }}
        />
      </div>

      {status === "error" && (
        <p className="text-[13px]" style={{ color: "#ef7955" }}>
          Wystąpił błąd. Spróbuj ponownie lub napisz na kontakt@lok-ai.pl.
        </p>
      )}

      <button
        type="submit"
        disabled={status === "sending"}
        className="btn-primary inline-flex items-center justify-center rounded-xl text-[15px] disabled:opacity-50"
        style={{ marginTop: 8, padding: "14px 22px" }}
      >
        {status === "sending" ? "Wysyłanie…" : "Umów konsultację →"}
      </button>

      <p className="text-[11px] text-text-mute">
        Odpowiadamy w&nbsp;ciągu 24&nbsp;godzin. Bez&nbsp;zobowiązań,
        bez&nbsp;sprzedawania.
      </p>
    </form>
  );
}
