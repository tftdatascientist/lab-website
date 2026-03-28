"use client";

import { useState, type FormEvent } from "react";

type Status = "idle" | "sending" | "success" | "error";

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
      const webhookUrl = process.env.NEXT_PUBLIC_N8N_WEBHOOK_URL;
      if (!webhookUrl) throw new Error("Webhook URL not configured");

      const res = await fetch(webhookUrl, {
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
      <div className="rounded-2xl border border-cyan/20 bg-cyan/[0.06] p-8 text-center">
        <p className="font-heading text-lg font-semibold text-text-primary mb-2">
          Dziękujemy!
        </p>
        <p className="text-sm text-text-secondary">
          Odezwiemy się w ciągu 24h.
        </p>
      </div>
    );
  }

  return (
    <form onSubmit={handleSubmit} className="space-y-5">
      <div className="grid sm:grid-cols-2 gap-5">
        <div>
          <label htmlFor="name" className="block text-sm text-text-secondary mb-1.5">
            Imię *
          </label>
          <input
            id="name"
            name="name"
            type="text"
            required
            className="w-full rounded-xl border border-white/[0.08] bg-bg-card px-4 py-3 text-sm text-text-primary placeholder:text-text-muted/60 outline-none focus:border-cyan/40 focus:shadow-[0_0_12px_rgba(0,212,255,0.1)] transition-all"
            placeholder="Jan"
          />
        </div>
        <div>
          <label htmlFor="company" className="block text-sm text-text-secondary mb-1.5">
            Firma
          </label>
          <input
            id="company"
            name="company"
            type="text"
            className="w-full rounded-xl border border-white/[0.08] bg-bg-card px-4 py-3 text-sm text-text-primary placeholder:text-text-muted/60 outline-none focus:border-cyan/40 focus:shadow-[0_0_12px_rgba(0,212,255,0.1)] transition-all"
            placeholder="Nazwa firmy"
          />
        </div>
      </div>

      <div className="grid sm:grid-cols-2 gap-5">
        <div>
          <label htmlFor="email" className="block text-sm text-text-secondary mb-1.5">
            Email *
          </label>
          <input
            id="email"
            name="email"
            type="email"
            required
            className="w-full rounded-xl border border-white/[0.08] bg-bg-card px-4 py-3 text-sm text-text-primary placeholder:text-text-muted/60 outline-none focus:border-cyan/40 focus:shadow-[0_0_12px_rgba(0,212,255,0.1)] transition-all"
            placeholder="jan@firma.pl"
          />
        </div>
        <div>
          <label htmlFor="phone" className="block text-sm text-text-secondary mb-1.5">
            Telefon
          </label>
          <input
            id="phone"
            name="phone"
            type="tel"
            className="w-full rounded-xl border border-white/[0.08] bg-bg-card px-4 py-3 text-sm text-text-primary placeholder:text-text-muted/60 outline-none focus:border-cyan/40 focus:shadow-[0_0_12px_rgba(0,212,255,0.1)] transition-all"
            placeholder="+48 000 000 000"
          />
        </div>
      </div>

      <div>
        <label htmlFor="message" className="block text-sm text-text-secondary mb-1.5">
          Opisz swoją potrzebę *
        </label>
        <textarea
          id="message"
          name="message"
          required
          rows={5}
          className="w-full rounded-xl border border-white/[0.08] bg-bg-card px-4 py-3 text-sm text-text-primary placeholder:text-text-muted/60 outline-none focus:border-cyan/40 focus:shadow-[0_0_12px_rgba(0,212,255,0.1)] transition-all resize-y"
          placeholder="Np. chcę zautomatyzować obsługę zapytań klientów..."
        />
      </div>

      {status === "error" && (
        <p className="text-sm text-red-400">
          Wystąpił błąd. Spróbuj ponownie lub napisz na kontakt@lab-ai.pl.
        </p>
      )}

      <button
        type="submit"
        disabled={status === "sending"}
        className="inline-flex items-center px-6 py-3 text-sm font-medium text-white bg-gradient-to-r from-cyan to-blue-500 rounded-full hover:shadow-[0_0_24px_rgba(0,212,255,0.35)] transition-shadow disabled:opacity-50 disabled:cursor-not-allowed"
      >
        {status === "sending" ? "Wysyłanie..." : "Wyślij wiadomość →"}
      </button>
    </form>
  );
}
