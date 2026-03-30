import { Cable, Bot, Zap, MessageCircleQuestion } from "lucide-react";

const stats = [
  {
    icon: Cable,
    value: "400+",
    label: "INTEGRACJI API",
    iconColor: "text-primary",
    hoverColor: "group-hover:text-primary",
  },
  {
    icon: Bot,
    value: "24/7",
    label: "CHATBOT AI",
    iconColor: "text-secondary",
    hoverColor: "group-hover:text-secondary",
  },
  {
    icon: Zap,
    value: "<48h",
    label: "WDROŻENIE",
    iconColor: "text-primary",
    hoverColor: "group-hover:text-primary",
  },
  {
    icon: MessageCircleQuestion,
    value: "0 zł",
    label: "KONSULTACJA",
    iconColor: "text-secondary",
    hoverColor: "group-hover:text-secondary",
  },
];

export default function StatsGrid() {
  return (
    <section className="py-24 px-6 md:px-10 max-w-7xl mx-auto">
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-px bg-outline-variant/10 rounded-2xl overflow-hidden ghost-border">
        {stats.map((stat) => (
          <div
            key={stat.label}
            className="bg-surface-low p-8 md:p-10 flex flex-col justify-between group hover:bg-surface-container transition-colors"
          >
            <stat.icon className={`w-6 h-6 ${stat.iconColor} mb-8`} />
            <div>
              <div
                className={`text-4xl font-mono font-bold text-on-surface mb-2 tracking-tighter ${stat.hoverColor} transition-colors`}
              >
                {stat.value}
              </div>
              <div className="text-[10px] font-mono uppercase tracking-[0.2em] text-on-surface-variant">
                {stat.label}
              </div>
            </div>
          </div>
        ))}
      </div>
    </section>
  );
}
