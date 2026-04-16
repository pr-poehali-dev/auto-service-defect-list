import { useState } from "react";
import Icon from "@/components/ui/icon";

const SEVERITY_OPTIONS = [
  { value: "low", label: "Незначительное", cls: "severity-low" },
  { value: "medium", label: "Среднее", cls: "severity-medium" },
  { value: "high", label: "Критическое", cls: "severity-high" },
];

interface Defect {
  id: number;
  zone: string;
  description: string;
  severity: "low" | "medium" | "high";
  recommendation: string;
}

const INITIAL_DEFECTS: Defect[] = [
  {
    id: 1,
    zone: "Передний бампер",
    description: "Трещина бампера в зоне левого противотуманного фонаря, царапины ЛКП 15×3 см",
    severity: "medium",
    recommendation: "Покраска, восстановление геометрии",
  },
  {
    id: 2,
    zone: "Левое переднее крыло",
    description: "Вмятина Ø 8 см без нарушения ЛКП, следы контакта с посторонним предметом",
    severity: "low",
    recommendation: "PDR-рихтовка без покраски",
  },
  {
    id: 3,
    zone: "Двигатель / масляная система",
    description: "Подтёк масла в районе прокладки поддона картера, уровень масла ниже нормы",
    severity: "high",
    recommendation: "Замена прокладки поддона, промывка двигателя",
  },
];

const today = new Date();
const dateStr = today.toLocaleDateString("ru-RU", { day: "2-digit", month: "2-digit", year: "numeric" });
const docNumber = `АС-${String(today.getFullYear()).slice(2)}${String(today.getMonth() + 1).padStart(2, "0")}-${String(Math.floor(Math.random() * 9000) + 1000)}`;

const monoStyle = { fontFamily: "'IBM Plex Mono', monospace" } as const;
const oswaldStyle = { fontFamily: "'Oswald', sans-serif" } as const;

export default function Index() {
  const [defects, setDefects] = useState<Defect[]>(INITIAL_DEFECTS);
  const [nextId, setNextId] = useState(4);

  const addDefect = () => {
    setDefects([...defects, { id: nextId, zone: "", description: "", severity: "low", recommendation: "" }]);
    setNextId(nextId + 1);
  };

  const removeDefect = (id: number) => setDefects(defects.filter((d) => d.id !== id));

  const updateDefect = (id: number, field: keyof Defect, value: string) =>
    setDefects(defects.map((d) => (d.id === id ? { ...d, [field]: value } : d)));

  const criticalCount = defects.filter((d) => d.severity === "high").length;

  return (
    <div className="min-h-screen" style={{ backgroundColor: "var(--eng-bg)" }}>
      <div className="max-w-5xl mx-auto px-4 py-8">
        <div
          className="eng-grid-bg corner-mark relative animate-fade-in"
          style={{ border: "1.5px solid var(--eng-ink)", boxShadow: "4px 4px 0 rgba(26,26,46,0.12)" }}
        >

          {/* ── TOP BAR */}
          <div
            className="px-6 py-3 flex items-center justify-between"
            style={{ backgroundColor: "var(--eng-ink)", borderBottom: "3px solid var(--eng-ink)" }}
          >
            <div className="flex items-center gap-3">
              <span style={{ ...oswaldStyle, color: "#fff", fontSize: 11, letterSpacing: "0.2em", backgroundColor: "var(--eng-accent)", padding: "2px 10px" }}>
                ДОКУМЕНТ
              </span>
              <span style={{ ...monoStyle, color: "rgba(255,255,255,0.45)", fontSize: 11, letterSpacing: "0.15em" }}>
                № {docNumber}
              </span>
            </div>
            <div className="flex items-center gap-4">
              <span style={{ ...monoStyle, color: "rgba(255,255,255,0.45)", fontSize: 11 }}>{dateStr}</span>
              <button
                onClick={() => window.print()}
                className="no-print flex items-center gap-1.5 px-3 py-1"
                style={{ border: "1px solid rgba(255,255,255,0.2)", color: "rgba(255,255,255,0.65)", fontSize: 11, ...monoStyle, cursor: "pointer", backgroundColor: "transparent" }}
              >
                <Icon name="Printer" size={12} />
                ПЕЧАТЬ
              </button>
            </div>
          </div>

          {/* ── LOGO + CONTACTS */}
          <div className="px-8 pt-8 pb-6 animate-fade-in animate-delay-100" style={{ borderBottom: "1.5px solid var(--eng-line)" }}>
            <div className="flex items-start justify-between gap-8">

              <div className="flex items-center gap-5">
                {/* BMW Logo SVG */}
                <svg viewBox="0 0 100 100" width="72" height="72" xmlns="http://www.w3.org/2000/svg" style={{ flexShrink: 0 }}>
                  <circle cx="50" cy="50" r="48" fill="var(--eng-ink)" stroke="var(--eng-ink)" strokeWidth="2"/>
                  <circle cx="50" cy="50" r="42" fill="none" stroke="#fff" strokeWidth="2"/>
                  <path d="M50 8 A42 42 0 0 1 92 50 L50 50 Z" fill="#1a5f8a"/>
                  <path d="M50 50 L92 50 A42 42 0 0 1 50 92 Z" fill="#fff"/>
                  <path d="M50 92 A42 42 0 0 1 8 50 L50 50 Z" fill="#1a5f8a"/>
                  <path d="M50 50 L8 50 A42 42 0 0 1 50 8 Z" fill="#fff"/>
                  <circle cx="50" cy="50" r="14" fill="var(--eng-ink)" stroke="#fff" strokeWidth="1.5"/>
                  <text x="50" y="54" textAnchor="middle" style={{ fontFamily: "'Oswald', sans-serif", fontSize: 9, fill: "#fff", fontWeight: 700, letterSpacing: "0.05em" }}>BMW</text>
                </svg>
                <div>
                  <div style={{ ...oswaldStyle, fontSize: 26, fontWeight: 700, letterSpacing: "0.06em", lineHeight: 1.1, color: "var(--eng-ink)" }}>
                    МТЕХ-СЕРВИС
                  </div>

                </div>
              </div>

              <div className="flex flex-col gap-2 text-right">
                <div className="flex items-center justify-end gap-2">
                  <span style={{ ...monoStyle, fontSize: 18, fontWeight: 600, letterSpacing: "0.05em", color: "var(--eng-ink)" }}>
                    +7 (908) 142-94-39
                  </span>
                  <Icon name="Phone" size={14} style={{ color: "var(--eng-accent)" }} />
                </div>
                <div className="flex items-center justify-end gap-2">
                  <span style={{ ...monoStyle, fontSize: 12, color: "rgba(26,26,46,0.6)" }}>ул. Антонова-Овсеенко, 28д</span>
                  <Icon name="MapPin" size={12} style={{ color: "var(--eng-accent)" }} />
                </div>
                <div className="flex items-center justify-end gap-2">
                  <span style={{ ...monoStyle, fontSize: 12, color: "rgba(26,26,46,0.6)" }}>Пн–Сб 08:00–20:00</span>
                  <Icon name="Clock" size={12} style={{ color: "var(--eng-accent)" }} />
                </div>
              </div>
            </div>
          </div>

          {/* ── TITLE */}
          <div className="px-8 py-4 flex items-center justify-between animate-fade-in animate-delay-200" style={{ borderBottom: "1.5px solid var(--eng-line)" }}>
            <div>
              <div style={{ ...oswaldStyle, fontSize: 20, fontWeight: 600, letterSpacing: "0.12em", color: "var(--eng-ink)" }}>
                ВЕДОМОСТЬ ОСМОТРА АВТОМОБИЛЯ
              </div>
              <div style={{ height: 2, backgroundColor: "var(--eng-accent)", width: "60%", marginTop: 4 }} />
            </div>
            {criticalCount > 0 && (
              <div className="eng-stamp no-print px-4 py-2" style={{ fontSize: 13 }}>
                ! {criticalCount} КРИТИЧ.
              </div>
            )}
          </div>

          {/* ── VEHICLE INFO */}
          <div className="px-8 py-5 animate-fade-in animate-delay-200" style={{ borderBottom: "1.5px solid var(--eng-line)" }}>
            <div style={{ ...oswaldStyle, fontSize: 11, letterSpacing: "0.2em", color: "var(--eng-accent2)", marginBottom: 12 }}>
              РАЗДЕЛ I · СВЕДЕНИЯ ОБ АВТОМОБИЛЕ И ВЛАДЕЛЬЦЕ
            </div>
            <div className="grid grid-cols-2 gap-x-8">
              {[
                ["Владелец", "Иванов Иван Иванович"],
                ["Марка / Модель", "Toyota Camry 3.5 V6"],
                ["Гос. номер", "А 777 АА 77"],
                ["VIN", "JT2BF22K1W0115819"],
                ["Год выпуска", "2019"],
                ["Пробег (км)", "87 450"],
                ["Мастер-приёмщик", "Петров А. С."],
                ["Дата приёмки", dateStr],
              ].map(([label, value], i) => (
                <div key={i} className="flex items-baseline gap-3 py-2" style={{ borderBottom: "1px dashed var(--eng-line)" }}>
                  <span style={{ ...monoStyle, fontSize: 10, color: "rgba(26,26,46,0.4)", letterSpacing: "0.08em", minWidth: 140, flexShrink: 0 }}>
                    {label}
                  </span>
                  <span style={{ ...monoStyle, fontSize: 13, fontWeight: 500, color: "var(--eng-ink)" }}>{value}</span>
                </div>
              ))}
            </div>
          </div>

          {/* ── DEFECTS */}
          <div className="px-8 py-6 animate-fade-in animate-delay-300">
            <div className="flex items-center justify-between mb-5">
              <div>
                <div style={{ ...oswaldStyle, fontSize: 11, letterSpacing: "0.2em", color: "var(--eng-accent2)", marginBottom: 4 }}>
                  РАЗДЕЛ II
                </div>
                <div style={{ ...oswaldStyle, fontSize: 16, fontWeight: 600, letterSpacing: "0.1em", color: "var(--eng-ink)" }}>
                  ВЫЯВЛЕННЫЕ ПРОБЛЕМЫ И ПОВРЕЖДЕНИЯ
                </div>
              </div>
              <button
                onClick={addDefect}
                className="no-print flex items-center gap-2 px-4 py-2"
                style={{ ...monoStyle, border: "1.5px solid var(--eng-ink)", fontSize: 11, letterSpacing: "0.1em", backgroundColor: "var(--eng-ink)", color: "#fff", cursor: "pointer" }}
                onMouseEnter={(e) => { (e.currentTarget as HTMLButtonElement).style.backgroundColor = "var(--eng-accent)"; (e.currentTarget as HTMLButtonElement).style.borderColor = "var(--eng-accent)"; }}
                onMouseLeave={(e) => { (e.currentTarget as HTMLButtonElement).style.backgroundColor = "var(--eng-ink)"; (e.currentTarget as HTMLButtonElement).style.borderColor = "var(--eng-ink)"; }}
              >
                <Icon name="Plus" size={12} />
                ДОБАВИТЬ ПОЗИЦИЮ
              </button>
            </div>

            {/* Table header */}
            <div
              className="grid mb-1"
              style={{ gridTemplateColumns: "32px 155px 1fr 148px 195px 36px", gap: "0 12px", borderBottom: "2px solid var(--eng-ink)", paddingBottom: 6 }}
            >
              {["№", "ЗОНА / УЗЕЛ", "ОПИСАНИЕ ДЕФЕКТА", "СТЕПЕНЬ", "РЕКОМЕНДАЦИИ", ""].map((h, i) => (
                <span key={i} style={{ ...oswaldStyle, fontSize: 9, letterSpacing: "0.18em", color: "rgba(26,26,46,0.4)" }}>{h}</span>
              ))}
            </div>

            {/* Rows */}
            {defects.map((defect, idx) => {
              const sev = SEVERITY_OPTIONS.find((s) => s.value === defect.severity)!;
              return (
                <div
                  key={defect.id}
                  className="grid items-start py-3"
                  style={{ gridTemplateColumns: "32px 155px 1fr 148px 195px 36px", gap: "0 12px", borderBottom: "1px dashed var(--eng-line)" }}
                >
                  <span style={{ ...monoStyle, fontSize: 12, color: "rgba(26,26,46,0.3)", paddingTop: 7 }}>
                    {String(idx + 1).padStart(2, "0")}
                  </span>

                  <input
                    value={defect.zone}
                    onChange={(e) => updateDefect(defect.id, "zone", e.target.value)}
                    placeholder="Узел / зона"
                    style={{ ...monoStyle, fontSize: 12, fontWeight: 600, color: "var(--eng-ink)", border: "none", borderBottom: "1px solid var(--eng-line)", backgroundColor: "transparent", outline: "none", padding: "6px 0", width: "100%" }}
                  />

                  <textarea
                    value={defect.description}
                    onChange={(e) => updateDefect(defect.id, "description", e.target.value)}
                    placeholder="Описание повреждения..."
                    rows={2}
                    style={{ ...monoStyle, fontSize: 11, color: "var(--eng-ink)", border: "none", borderBottom: "1px solid var(--eng-line)", backgroundColor: "transparent", outline: "none", padding: "6px 0", resize: "none", width: "100%", lineHeight: 1.5 }}
                  />

                  <div className="pt-1">
                    <select
                      value={defect.severity}
                      onChange={(e) => updateDefect(defect.id, "severity", e.target.value)}
                      className={sev.cls}
                      style={{ ...monoStyle, fontSize: 10, cursor: "pointer", outline: "none", appearance: "none", textAlign: "center", padding: "4px 8px", width: "100%" }}
                    >
                      {SEVERITY_OPTIONS.map((s) => (
                        <option key={s.value} value={s.value}>{s.label}</option>
                      ))}
                    </select>
                  </div>

                  <textarea
                    value={defect.recommendation}
                    onChange={(e) => updateDefect(defect.id, "recommendation", e.target.value)}
                    placeholder="Рекомендуемые работы..."
                    rows={2}
                    style={{ ...monoStyle, fontSize: 11, color: "var(--eng-ink)", border: "none", borderBottom: "1px solid var(--eng-line)", backgroundColor: "transparent", outline: "none", padding: "6px 0", resize: "none", width: "100%", lineHeight: 1.5 }}
                  />

                  <button
                    onClick={() => removeDefect(defect.id)}
                    className="no-print flex items-start justify-center pt-2"
                    style={{ background: "none", border: "none", cursor: "pointer", color: "rgba(26,26,46,0.28)" }}
                    onMouseEnter={(e) => { (e.currentTarget as HTMLButtonElement).style.color = "var(--eng-accent)"; }}
                    onMouseLeave={(e) => { (e.currentTarget as HTMLButtonElement).style.color = "rgba(26,26,46,0.28)"; }}
                  >
                    <Icon name="X" size={13} />
                  </button>
                </div>
              );
            })}

            {defects.length === 0 && (
              <div className="py-12 text-center" style={{ ...monoStyle, fontSize: 12, color: "rgba(26,26,46,0.3)", letterSpacing: "0.1em", borderBottom: "1px dashed var(--eng-line)" }}>
                — ДЕФЕКТЫ НЕ ЗАФИКСИРОВАНЫ —
              </div>
            )}
          </div>

          {/* ── SUMMARY */}
          <div className="px-8 py-4 flex items-center gap-6 animate-fade-in animate-delay-400" style={{ borderTop: "1.5px solid var(--eng-line)" }}>
            <span style={{ ...monoStyle, fontSize: 10, color: "rgba(26,26,46,0.4)", letterSpacing: "0.1em" }}>
              ИТОГО ПОЗИЦИЙ: {defects.length}
            </span>
            <div style={{ flex: 1, borderTop: "1px dashed var(--eng-line)" }} />
            {SEVERITY_OPTIONS.map((s) => {
              const count = defects.filter((d) => d.severity === s.value).length;
              return (
                <div key={s.value} className="flex items-center gap-2">
                  <span className={s.cls} style={{ ...monoStyle, fontSize: 9, letterSpacing: "0.08em", padding: "2px 8px" }}>{s.label}</span>
                  <span style={{ ...oswaldStyle, fontSize: 16, fontWeight: 600, color: "var(--eng-ink)" }}>{count}</span>
                </div>
              );
            })}
          </div>

          {/* ── SIGNATURES */}
          <div className="px-8 py-6 animate-fade-in animate-delay-400" style={{ borderTop: "3px solid var(--eng-ink)", backgroundColor: "rgba(26,26,46,0.03)" }}>
            <div className="grid grid-cols-3 gap-8">
              {[
                { label: "Мастер-приёмщик", sub: "подпись / ФИО" },
                { label: "Механик", sub: "подпись / ФИО" },
                { label: "Клиент", sub: "подпись / ФИО / согласие" },
              ].map(({ label, sub }) => (
                <div key={label}>
                  <div style={{ ...oswaldStyle, fontSize: 10, letterSpacing: "0.15em", color: "rgba(26,26,46,0.4)", marginBottom: 16 }}>{label}</div>
                  <div style={{ borderBottom: "1px solid var(--eng-ink)", height: 32, marginBottom: 6 }} />
                  <div style={{ ...monoStyle, fontSize: 9, color: "rgba(26,26,46,0.28)", letterSpacing: "0.08em" }}>{sub}</div>
                </div>
              ))}
            </div>
          </div>

          {/* ── FOOTER */}
          <div className="px-8 py-3 flex items-center justify-between" style={{ borderTop: "1.5px solid var(--eng-line)", backgroundColor: "var(--eng-ink)" }}>
            <span style={{ ...monoStyle, fontSize: 9, color: "rgba(255,255,255,0.28)", letterSpacing: "0.12em" }}>
              ФОРМА АС-1 · РЕД. 2024 · ДОКУМЕНТ НЕ ЯВЛЯЕТСЯ ПУБЛИЧНОЙ ОФЕРТОЙ
            </span>
            <span style={{ ...monoStyle, fontSize: 9, color: "rgba(255,255,255,0.28)", letterSpacing: "0.12em" }}>
              {docNumber} · {dateStr}
            </span>
          </div>

        </div>
      </div>
    </div>
  );
}