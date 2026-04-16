import { useState } from "react";
import Icon from "@/components/ui/icon";


interface Defect {
  id: number;
  zone: string;
  description: string;
  severity: "low" | "medium" | "high";
  recommendation: string;
}

const INITIAL_REC: Defect[] = [
  { id: 1, zone: "Тормозные колодки", description: "Износ передних тормозных колодок до 3 мм. Рекомендована замена при следующем ТО.", severity: "low", recommendation: "" },
  { id: 2, zone: "Воздушный фильтр", description: "Загрязнение фильтрующего элемента. Рекомендована замена через 5 000 км.", severity: "low", recommendation: "" },
];

const INITIAL_CRIT: Defect[] = [
  { id: 1, zone: "Двигатель / масляная система", description: "Подтёк масла в районе прокладки поддона картера, уровень масла ниже минимума. Эксплуатация запрещена.", severity: "high", recommendation: "" },
];

const today = new Date();
const dateStr = today.toLocaleDateString("ru-RU", { day: "2-digit", month: "2-digit", year: "numeric" });
const docNumber = `АС-${String(today.getFullYear()).slice(2)}${String(today.getMonth() + 1).padStart(2, "0")}-${String(Math.floor(Math.random() * 9000) + 1000)}`;

const monoStyle = { fontFamily: "'IBM Plex Mono', monospace" } as const;
const oswaldStyle = { fontFamily: "'Oswald', sans-serif" } as const;

export default function Index() {
  const [recDefects, setRecDefects] = useState<Defect[]>(INITIAL_REC);
  const [critDefects, setCritDefects] = useState<Defect[]>(INITIAL_CRIT);
  const [nextRecId, setNextRecId] = useState(3);
  const [nextCritId, setNextCritId] = useState(2);

  const addDefect = (section: "rec" | "crit") => {
    if (section === "rec") {
      setRecDefects([...recDefects, { id: nextRecId, zone: "", description: "", severity: "low", recommendation: "" }]);
      setNextRecId(nextRecId + 1);
    } else {
      setCritDefects([...critDefects, { id: nextCritId, zone: "", description: "", severity: "high", recommendation: "" }]);
      setNextCritId(nextCritId + 1);
    }
  };

  const removeDefect = (section: "rec" | "crit", id: number) => {
    if (section === "rec") setRecDefects(recDefects.filter((d) => d.id !== id));
    else setCritDefects(critDefects.filter((d) => d.id !== id));
  };

  const updateDefect = (section: "rec" | "crit", id: number, field: keyof Defect, value: string) => {
    if (section === "rec") setRecDefects(recDefects.map((d) => (d.id === id ? { ...d, [field]: value } : d)));
    else setCritDefects(critDefects.map((d) => (d.id === id ? { ...d, [field]: value } : d)));
  };

  const criticalCount = critDefects.length;

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
          <div className="px-8 py-5 animate-fade-in animate-delay-200" style={{ borderBottom: "3px solid var(--eng-ink)", borderTop: "1.5px solid var(--eng-line)" }}>
            <div style={{ ...oswaldStyle, fontSize: 22, fontWeight: 700, letterSpacing: "0.14em", color: "var(--eng-ink)", textAlign: "center" }}>
              ДЕФЕКТОВОЧНАЯ ВЕДОМОСТЬ
            </div>
            <div style={{ display: "flex", justifyContent: "center", marginTop: 6 }}>
              <div style={{ height: 2, backgroundColor: "var(--eng-accent)", width: 180 }} />
            </div>
          </div>

          {/* ── VEHICLE INFO */}
          <div className="px-8 py-5 animate-fade-in animate-delay-200" style={{ borderBottom: "1.5px solid var(--eng-line)" }}>
            <div style={{ ...oswaldStyle, fontSize: 11, letterSpacing: "0.2em", color: "var(--eng-accent2)", marginBottom: 12 }}>
              СВЕДЕНИЯ ОБ АВТОМОБИЛЕ И ВЛАДЕЛЬЦЕ
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

          {/* ══ РАЗДЕЛ I — РЕКОМЕНДАЦИИ */}
          <div className="px-8 py-6 animate-fade-in animate-delay-300" style={{ borderBottom: "1.5px solid var(--eng-line)" }}>
            <div className="flex items-center justify-between mb-5">
              <div className="flex items-center gap-4">
                <div style={{ width: 4, height: 40, backgroundColor: "var(--eng-accent2)" }} />
                <div>
                  <div style={{ ...oswaldStyle, fontSize: 10, letterSpacing: "0.22em", color: "var(--eng-accent2)", marginBottom: 3 }}>
                    РАЗДЕЛ I
                  </div>
                  <div style={{ ...oswaldStyle, fontSize: 17, fontWeight: 700, letterSpacing: "0.1em", color: "var(--eng-ink)" }}>
                    РЕКОМЕНДАЦИИ
                  </div>
                </div>
              </div>
              <button
                onClick={() => addDefect("rec")}
                className="no-print flex items-center gap-2 px-4 py-2"
                style={{ ...monoStyle, border: "1.5px solid var(--eng-accent2)", fontSize: 11, letterSpacing: "0.1em", backgroundColor: "var(--eng-accent2)", color: "#fff", cursor: "pointer" }}
                onMouseEnter={(e) => { (e.currentTarget as HTMLButtonElement).style.opacity = "0.8"; }}
                onMouseLeave={(e) => { (e.currentTarget as HTMLButtonElement).style.opacity = "1"; }}
              >
                <Icon name="Plus" size={12} />
                ДОБАВИТЬ
              </button>
            </div>

            <div className="grid mb-1" style={{ gridTemplateColumns: "32px 170px 1fr 36px", gap: "0 12px", borderBottom: "2px solid var(--eng-accent2)", paddingBottom: 6 }}>
              {["№", "ЗОНА / УЗЕЛ", "ОПИСАНИЕ И РЕКОМЕНДАЦИЯ", ""].map((h, i) => (
                <span key={i} style={{ ...oswaldStyle, fontSize: 9, letterSpacing: "0.18em", color: "rgba(26,26,46,0.4)" }}>{h}</span>
              ))}
            </div>

            {recDefects.map((defect, idx) => (
              <div key={defect.id} className="grid items-start py-3" style={{ gridTemplateColumns: "32px 170px 1fr 36px", gap: "0 12px", borderBottom: "1px dashed var(--eng-line)" }}>
                <span style={{ ...monoStyle, fontSize: 12, color: "rgba(26,26,46,0.3)", paddingTop: 7 }}>
                  {String(idx + 1).padStart(2, "0")}
                </span>
                <input
                  value={defect.zone}
                  onChange={(e) => updateDefect("rec", defect.id, "zone", e.target.value)}
                  placeholder="Узел / зона"
                  style={{ ...monoStyle, fontSize: 12, fontWeight: 600, color: "var(--eng-ink)", border: "none", borderBottom: "1px solid var(--eng-line)", backgroundColor: "transparent", outline: "none", padding: "6px 0", width: "100%" }}
                />
                <textarea
                  value={defect.description}
                  onChange={(e) => updateDefect("rec", defect.id, "description", e.target.value)}
                  placeholder="Описание и рекомендуемые работы..."
                  rows={2}
                  style={{ ...monoStyle, fontSize: 11, color: "var(--eng-ink)", border: "none", borderBottom: "1px solid var(--eng-line)", backgroundColor: "transparent", outline: "none", padding: "6px 0", resize: "none", width: "100%", lineHeight: 1.5 }}
                />
                <button
                  onClick={() => removeDefect("rec", defect.id)}
                  className="no-print flex items-start justify-center pt-2"
                  style={{ background: "none", border: "none", cursor: "pointer", color: "rgba(26,26,46,0.28)" }}
                  onMouseEnter={(e) => { (e.currentTarget as HTMLButtonElement).style.color = "var(--eng-accent)"; }}
                  onMouseLeave={(e) => { (e.currentTarget as HTMLButtonElement).style.color = "rgba(26,26,46,0.28)"; }}
                >
                  <Icon name="X" size={13} />
                </button>
              </div>
            ))}

            {recDefects.length === 0 && (
              <div className="py-8 text-center" style={{ ...monoStyle, fontSize: 12, color: "rgba(26,26,46,0.3)", letterSpacing: "0.1em", borderBottom: "1px dashed var(--eng-line)" }}>
                — РЕКОМЕНДАЦИИ НЕ ДОБАВЛЕНЫ —
              </div>
            )}
          </div>

          {/* ══ РАЗДЕЛ II — КРИТИЧЕСКИЕ НЕИСПРАВНОСТИ */}
          <div className="px-8 py-6 animate-fade-in animate-delay-400">
            <div className="flex items-center justify-between mb-5">
              <div className="flex items-center gap-4">
                <div style={{ width: 4, height: 40, backgroundColor: "var(--eng-accent)" }} />
                <div>
                  <div style={{ ...oswaldStyle, fontSize: 10, letterSpacing: "0.22em", color: "var(--eng-accent)", marginBottom: 3 }}>
                    РАЗДЕЛ II
                  </div>
                  <div style={{ ...oswaldStyle, fontSize: 17, fontWeight: 700, letterSpacing: "0.1em", color: "var(--eng-ink)" }}>
                    КРИТИЧЕСКИЕ НЕИСПРАВНОСТИ
                  </div>
                </div>
              </div>
              <button
                onClick={() => addDefect("crit")}
                className="no-print flex items-center gap-2 px-4 py-2"
                style={{ ...monoStyle, border: "1.5px solid var(--eng-accent)", fontSize: 11, letterSpacing: "0.1em", backgroundColor: "var(--eng-accent)", color: "#fff", cursor: "pointer" }}
                onMouseEnter={(e) => { (e.currentTarget as HTMLButtonElement).style.opacity = "0.8"; }}
                onMouseLeave={(e) => { (e.currentTarget as HTMLButtonElement).style.opacity = "1"; }}
              >
                <Icon name="Plus" size={12} />
                ДОБАВИТЬ
              </button>
            </div>

            <div className="grid mb-1" style={{ gridTemplateColumns: "32px 170px 1fr 36px", gap: "0 12px", borderBottom: "2px solid var(--eng-accent)", paddingBottom: 6 }}>
              {["№", "ЗОНА / УЗЕЛ", "ОПИСАНИЕ НЕИСПРАВНОСТИ", ""].map((h, i) => (
                <span key={i} style={{ ...oswaldStyle, fontSize: 9, letterSpacing: "0.18em", color: "rgba(26,26,46,0.4)" }}>{h}</span>
              ))}
            </div>

            {critDefects.map((defect, idx) => (
              <div key={defect.id} className="grid items-start py-3" style={{ gridTemplateColumns: "32px 170px 1fr 36px", gap: "0 12px", borderBottom: "1px dashed var(--eng-line)", backgroundColor: idx % 2 === 0 ? "rgba(200,56,26,0.03)" : "transparent" }}>
                <span style={{ ...monoStyle, fontSize: 12, color: "var(--eng-accent)", paddingTop: 7, fontWeight: 600 }}>
                  {String(idx + 1).padStart(2, "0")}
                </span>
                <input
                  value={defect.zone}
                  onChange={(e) => updateDefect("crit", defect.id, "zone", e.target.value)}
                  placeholder="Узел / зона"
                  style={{ ...monoStyle, fontSize: 12, fontWeight: 600, color: "var(--eng-ink)", border: "none", borderBottom: "1px solid rgba(200,56,26,0.3)", backgroundColor: "transparent", outline: "none", padding: "6px 0", width: "100%" }}
                />
                <textarea
                  value={defect.description}
                  onChange={(e) => updateDefect("crit", defect.id, "description", e.target.value)}
                  placeholder="Описание критической неисправности..."
                  rows={2}
                  style={{ ...monoStyle, fontSize: 11, color: "var(--eng-ink)", border: "none", borderBottom: "1px solid rgba(200,56,26,0.3)", backgroundColor: "transparent", outline: "none", padding: "6px 0", resize: "none", width: "100%", lineHeight: 1.5 }}
                />
                <button
                  onClick={() => removeDefect("crit", defect.id)}
                  className="no-print flex items-start justify-center pt-2"
                  style={{ background: "none", border: "none", cursor: "pointer", color: "rgba(26,26,46,0.28)" }}
                  onMouseEnter={(e) => { (e.currentTarget as HTMLButtonElement).style.color = "var(--eng-accent)"; }}
                  onMouseLeave={(e) => { (e.currentTarget as HTMLButtonElement).style.color = "rgba(26,26,46,0.28)"; }}
                >
                  <Icon name="X" size={13} />
                </button>
              </div>
            ))}

            {critDefects.length === 0 && (
              <div className="py-8 text-center" style={{ ...monoStyle, fontSize: 12, color: "rgba(200,56,26,0.4)", letterSpacing: "0.1em", borderBottom: "1px dashed rgba(200,56,26,0.2)" }}>
                — КРИТИЧЕСКИХ НЕИСПРАВНОСТЕЙ НЕ ВЫЯВЛЕНО —
              </div>
            )}
          </div>

          {/* ── SUMMARY */}
          <div className="px-8 py-4 flex items-center gap-6 animate-fade-in animate-delay-400" style={{ borderTop: "1.5px solid var(--eng-line)" }}>
            <span style={{ ...monoStyle, fontSize: 10, color: "rgba(26,26,46,0.4)", letterSpacing: "0.1em" }}>
              РЕКОМЕНДАЦИИ: {recDefects.length}
            </span>
            <div style={{ flex: 1, borderTop: "1px dashed var(--eng-line)" }} />
            <div className="flex items-center gap-2">
              <span style={{ ...monoStyle, fontSize: 10, color: "rgba(26,26,46,0.4)", letterSpacing: "0.1em" }}>
                КРИТИЧЕСКИЕ:
              </span>
              <span style={{ ...oswaldStyle, fontSize: 18, fontWeight: 700, color: critDefects.length > 0 ? "var(--eng-accent)" : "rgba(26,26,46,0.3)" }}>
                {critDefects.length}
              </span>
            </div>
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