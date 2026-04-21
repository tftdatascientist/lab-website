"use client";

import { useEffect, useState } from "react";

const MESSAGES = [
  { role: "user", text: "Chciałbym umówić wizytę na przegląd." },
  { role: "bot", text: "Oczywiście! Mam wolne terminy w środę 14:00 i piątek 10:30. Który Panu pasuje?" },
  { role: "user", text: "Piątek 10:30." },
  { role: "bot", text: "Zarezerwowane. Potwierdzenie SMS wysłane na Pana numer. ✓" },
];

export default function ChatDemo() {
  const [visible, setVisible] = useState(0);
  const [typing, setTyping] = useState(false);

  useEffect(() => {
    if (visible >= MESSAGES.length) return;
    const next = MESSAGES[visible];
    if (next.role === "bot" && visible > 0) {
      setTyping(true);
      const t = setTimeout(() => {
        setTyping(false);
        setVisible((v) => v + 1);
      }, 1400);
      return () => clearTimeout(t);
    }
    const t = setTimeout(() => setVisible((v) => v + 1), visible === 0 ? 400 : 1000);
    return () => clearTimeout(t);
  }, [visible]);

  return (
    <div
      className="rounded-[18px] overflow-hidden"
      style={{
        background: "#17181b",
        outline: "1px solid rgba(255,255,255,0.08)",
        boxShadow: "0 30px 80px -20px rgba(0,0,0,0.6)",
      }}
    >
      {/* Header */}
      <div
        className="flex items-center justify-between px-4 py-3 border-b"
        style={{ borderColor: "rgba(255,255,255,0.08)", background: "rgba(255,255,255,0.02)" }}
      >
        <div className="flex items-center gap-2">
          <span
            className="w-2 h-2 rounded-full"
            style={{ background: "#d9b88a", animation: "lokai-pulse 2s ease-in-out infinite" }}
          />
          <span className="font-mono text-[11px] uppercase tracking-[0.08em] text-text-dim">
            Asystent · online
          </span>
        </div>
        <span className="font-mono text-[11px] text-text-mute">~12ms</span>
      </div>

      {/* Messages */}
      <div className="flex flex-col gap-3 p-4 min-h-[220px]">
        {MESSAGES.slice(0, visible).map((msg, i) => (
          <div
            key={i}
            className={`flex ${msg.role === "user" ? "justify-end" : "justify-start"}`}
            style={{ animation: "lokai-fadeup 0.3s ease forwards" }}
          >
            <div
              className="max-w-[80%] rounded-2xl px-4 py-2.5 text-sm leading-relaxed"
              style={
                msg.role === "user"
                  ? {
                      background: "linear-gradient(135deg, #f5b845 0%, #ef7955 100%)",
                      color: "#1a0f00",
                      fontWeight: 600,
                      borderBottomRightRadius: 4,
                    }
                  : {
                      background: "#1f2125",
                      color: "#ede7dc",
                      borderBottomLeftRadius: 4,
                    }
              }
            >
              {msg.text}
            </div>
          </div>
        ))}

        {typing && (
          <div className="flex justify-start" style={{ animation: "lokai-fadeup 0.3s ease forwards" }}>
            <div
              className="flex items-center gap-1 px-4 py-3 rounded-2xl"
              style={{ background: "#1f2125", borderBottomLeftRadius: 4 }}
            >
              {[0, 1, 2].map((dot) => (
                <span
                  key={dot}
                  className="w-1.5 h-1.5 rounded-full"
                  style={{
                    background: "#a8a29e",
                    animation: `lokai-pulse 1.2s ease-in-out ${dot * 0.2}s infinite`,
                  }}
                />
              ))}
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
