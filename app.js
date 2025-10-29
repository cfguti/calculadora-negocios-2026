import React, { useMemo, useState } from "https://esm.sh/react@18";
import { createRoot } from "https://esm.sh/react-dom@18/client";

const ideas = [
  { id: "ai-automation", name: "Agencia de Automatización/IA para PYMES", capexMin: 2000, capexMax: 5000, hoursMin: 15, hoursMax: 30, timeToProfitMonths: 1.5, monthlyNetProfitRange: [2000, 8000], skills: ["tech","sales","ops"], online: true, offline: false, regulationFriction: 0.1, volatility: 0.4, notes: "Implantación de chatbots, RPA sin código, reporting automático y flujos n8n/Make para negocios locales." },
  { id: "newsletter-affiliate", name: "Newsletter de Nicho + Afiliación/Patrocinios", capexMin: 500, capexMax: 2000, hoursMin: 10, hoursMax: 20, timeToProfitMonths: 5, monthlyNetProfitRange: [500, 5000], skills: ["content","marketing","design"], online: true, offline: false, regulationFriction: 0.05, volatility: 0.6, notes: "Boletín especializado (turismo, salud, tools B2B, etc.). Monetización con afiliación y patrocinios." },
  { id: "cleaning", name: "Limpieza Residencial con Equipo", capexMin: 1200, capexMax: 3500, hoursMin: 20, hoursMax: 40, timeToProfitMonths: 1, monthlyNetProfitRange: [2000, 6000], skills: ["ops","sales"], online: false, offline: true, regulationFriction: 0.2, volatility: 0.3, notes: "Servicio recurrente por suscripción en barrios concretos; upsells (cristales, fin de obra)." },
  { id: "mobile-detailing", name: "Lavado y Detailing Móvil", capexMin: 2500, capexMax: 6000, hoursMin: 20, hoursMax: 40, timeToProfitMonths: 1, monthlyNetProfitRange: [3000, 10000], skills: ["ops","sales"], online: false, offline: true, regulationFriction: 0.3, volatility: 0.4, notes: "Servicio a domicilio para flotas/parkings de oficinas; planes mensuales." },
  { id: "after-school", name: "Clubs Extraescolares (STEM/Arte/Robótica)", capexMin: 2000, capexMax: 5000, hoursMin: 15, hoursMax: 30, timeToProfitMonths: 2, monthlyNetProfitRange: [1500, 6000], skills: ["education","ops","marketing"], online: false, offline: true, regulationFriction: 0.45, volatility: 0.35, notes: "Acuerdos con colegios/ayuntamientos; ratio alumnos/monitor optimiza márgenes." },
  { id: "coffee-cart", name: "Carrito de Café Especialidad", capexMin: 8000, capexMax: 20000, hoursMin: 25, hoursMax: 45, timeToProfitMonths: 3, monthlyNetProfitRange: [5000, 15000], skills: ["ops","sales","food"], online: false, offline: true, regulationFriction: 0.6, volatility: 0.4, notes: "Eventos, ferias y ubicaciones de alto tráfico; requiere licencias y sanidad." },
  { id: "vending", name: "Máquinas Vending (Snacks/Bebidas/Saludable)", capexMin: 5000, capexMax: 25000, hoursMin: 5, hoursMax: 15, timeToProfitMonths: 2, monthlyNetProfitRange: [500, 3000], skills: ["ops","sales"], online: false, offline: true, regulationFriction: 0.25, volatility: 0.35, notes: "Negocio semi-pasivo; clave: acuerdos de ubicación (gimnasios, fábricas, oficinas)." },
  { id: "home-org", name: "Organización del Hogar / Mudanzas Express", capexMin: 500, capexMax: 2000, hoursMin: 10, hoursMax: 30, timeToProfitMonths: 1, monthlyNetProfitRange: [2000, 6000], skills: ["ops","design","sales"], online: true, offline: true, regulationFriction: 0.15, volatility: 0.3, notes: "Paquetes premium por estancia; colaboración con inmobiliarias y home-staging." },
  { id: "pets", name: "Servicios para Mascotas (Paseo/Cuidado en Casa)", capexMin: 300, capexMax: 1000, hoursMin: 10, hoursMax: 30, timeToProfitMonths: 0.5, monthlyNetProfitRange: [1000, 5000], skills: ["ops","sales"], online: true, offline: true, regulationFriction: 0.1, volatility: 0.25, notes: "Suscripciones semanales; gestión con app de rutas y reseñas locales." },
  { id: "etsy-pod", name: "Marca Micro (Etsy / Print‑on‑Demand)", capexMin: 300, capexMax: 1500, hoursMin: 8, hoursMax: 20, timeToProfitMonths: 2.5, monthlyNetProfitRange: [500, 4000], skills: ["content","design","marketing"], online: true, offline: false, regulationFriction: 0.05, volatility: 0.5, notes: "Tiendas temáticas, bundles estacionales, SEO en marketplaces." },
  { id: "micro-saas", name: "Micro‑SaaS / Producto Digital B2B", capexMin: 1000, capexMax: 10000, hoursMin: 15, hoursMax: 35, timeToProfitMonths: 6, monthlyNetProfitRange: [1000, 15000], skills: ["tech","marketing","product"], online: true, offline: false, regulationFriction: 0.15, volatility: 0.55, notes: "Resolver un dolor concreto (reporting, facturación simple, plantillas con IA)." },
  { id: "refurb", name: "Compra/Refurb/Flip de Electrónica", capexMin: 3000, capexMax: 10000, hoursMin: 10, hoursMax: 25, timeToProfitMonths: 1.5, monthlyNetProfitRange: [1000, 8000], skills: ["ops","sales","tech"], online: true, offline: true, regulationFriction: 0.35, volatility: 0.45, notes: "Garantías y reseñas dan ventaja; abastecimiento B2B subastas/retailers." },
  { id: "cohosting", name: "Co‑hosting / Gestión de Alquiler Turístico", capexMin: 1000, capexMax: 3000, hoursMin: 10, hoursMax: 25, timeToProfitMonths: 1, monthlyNetProfitRange: [1000, 7000], skills: ["ops","sales","marketing"], online: true, offline: true, regulationFriction: 0.6, volatility: 0.5, notes: "Comisión 15–25% por reserva; automatización de check‑in/limpieza." },
  { id: "local-seo", name: "Agencia Local SEO/Ads de Alto ROI", capexMin: 1000, capexMax: 3000, hoursMin: 15, hoursMax: 30, timeToProfitMonths: 1, monthlyNetProfitRange: [2000, 10000], skills: ["marketing","sales","ops"], online: true, offline: true, regulationFriction: 0.05, volatility: 0.35, notes: "Retainers + fee por performance; especialización en 1–2 verticales." },
];

const SKILL_LABELS = {
  tech: "Tecnología",
  sales: "Ventas",
  ops: "Operaciones",
  marketing: "Marketing",
  content: "Contenido",
  design: "Diseño",
  food: "Hostelería/Alimentación",
  education: "Educación",
  product: "Producto",
};

function clamp01(x){ return Math.max(0, Math.min(1, x)); }
function norm(value, min, max){ if (max === min) return 1; return clamp01((value - min) / (max - min)); }

function BusinessCalculator(){
  const [budget, setBudget] = useState(5000);
  const [hours, setHours] = useState(20);
  const [risk, setRisk] = useState("mid");
  const [deadline, setDeadline] = useState(3);
  const [mode, setMode] = useState("any");
  const [skills, setSkills] = useState(["marketing","sales","ops"]);
  const riskTarget = { low: 0.2, mid: 0.5, high: 0.8 }[risk];

  const results = useMemo(() => {
    return ideas.map((idea) => {
      let budgetScore = 0;
      if (budget >= idea.capexMin && budget <= idea.capexMax) budgetScore = 1;
      else if (budget < idea.capexMin) budgetScore = clamp01(budget / idea.capexMin) * 0.7;
      else if (budget > idea.capexMax) budgetScore = 0.9;

      const required = (idea.hoursMin + idea.hoursMax) / 2;
      const hoursScore = clamp01(1 - Math.abs(hours - required) / Math.max(10, required));
      const timeScore = clamp01(deadline / idea.timeToProfitMonths);
      const riskFit = 1 - Math.abs(idea.volatility - riskTarget);
      const regFit = 1 - idea.regulationFriction;
      const riskScore = clamp01(0.6 * riskFit + 0.4 * regFit);
      const matchCount = idea.skills.filter((s) => skills.includes(s)).length;
      const skillScore = matchCount / idea.skills.length;

      let modeScore = 1;
      if (mode !== "any") {
        if (mode === "online") modeScore = idea.online ? 1 : 0.1;
        if (mode === "offline") modeScore = idea.offline ? 1 : 0.1;
        if (mode === "mixed") modeScore = idea.online && idea.offline ? 1 : 0.6;
      }

      const avgProfit = (idea.monthlyNetProfitRange[0] + idea.monthlyNetProfitRange[1]) / 2;
      const roi = avgProfit / Math.max(idea.capexMin, 1);
      const roiScore = clamp01(norm(roi, 0.2, 4));

      const score = 0.18*budgetScore + 0.15*hoursScore + 0.18*timeScore + 0.16*riskScore + 0.18*skillScore + 0.07*modeScore + 0.08*roiScore;

      return {
        idea, score,
        breakdown: { Presupuesto: budgetScore, Horas: hoursScore, Rapidez: timeScore, Riesgo: riskScore, Habilidades: skillScore, Modo: modeScore, ROI: roiScore }
      };
    }).sort((a,b)=> b.score - a.score);
  }, [budget, hours, deadline, risk, riskTarget, mode, skills]);

  const top3 = results.slice(0,3);
  const toggleSkill = (s) => setSkills((prev)=> prev.includes(s) ? prev.filter((x)=> x!==s) : [...prev, s]);

  return (
    React.createElement("div", { className:"container", },
      React.createElement("header", null,
        React.createElement("h1", {style:{fontSize:"28px", fontWeight:800}}, "Calculadora de Negocios Rentables 2026"),
        React.createElement("p", {className:"muted"}, "Ajusta tu presupuesto, tiempo y perfil. *Estimaciones orientativas.*")
      ),
      React.createElement("section", { className:"grid grid-2" },
        React.createElement("div", { className:"card" },
          React.createElement("h2", null, "Tu situación"),
          React.createElement("label", null, `Presupuesto inicial: €${budget.toLocaleString()}`),
          React.createElement("input", {type:"range", min:200, max:30000, step:100, value:budget, onChange:(e)=> setBudget(parseInt(e.target.value))}),
          React.createElement("label", null, `Horas/semana disponibles: ${hours}h`),
          React.createElement("input", {type:"range", min:5, max:50, step:1, value:hours, onChange:(e)=> setHours(parseInt(e.target.value))}),
          React.createElement("div", { className:"grid grid-2" },
            React.createElement("div", null,
              React.createElement("label", null, `Urgencia (meses hasta beneficios): ${deadline}m`),
              React.createElement("input", {type:"range", min:1, max:12, step:1, value:deadline, onChange:(e)=> setDeadline(parseInt(e.target.value))})
            ),
            React.createElement("div", null,
              React.createElement("label", null, "Tolerancia al riesgo"),
              React.createElement("select", {value:risk, onChange:(e)=> setRisk(e.target.value)},
                React.createElement("option", {value:"low"}, "Baja"),
                React.createElement("option", {value:"mid"}, "Media"),
                React.createElement("option", {value:"high"}, "Alta"),
              )
            )
          ),
          React.createElement("div", null,
            React.createElement("label", null, "Preferencia de modo"),
            React.createElement("select", {value:mode, onChange:(e)=> setMode(e.target.value)},
              React.createElement("option", {value:"any"}, "Indiferente"),
              React.createElement("option", {value:"online"}, "Solo online"),
              React.createElement("option", {value:"offline"}, "Solo offline"),
              React.createElement("option", {value:"mixed"}, "Mixto"),
            )
          ),
        ),
        React.createElement("div", { className:"card" },
          React.createElement("h2", null, "Tus habilidades (marca tus fuertes)"),
          React.createElement("div", { style:{display:"grid", gridTemplateColumns:"repeat(3, minmax(0,1fr))", gap:"12px"} },
            Object.entries(SKILL_LABELS).map(([key,label]) =>
              React.createElement("label", { key, className:`pill ${skills.includes(key) ? "active" : ""}`, onClick:()=> toggleSkill(key) },
                React.createElement("input", { type:"checkbox", style:{display:"none"}, checked:skills.includes(key), readOnly:true }),
                React.createElement("span", {style:{fontSize:"13px"}}, label)
              )
            )
          ),
          React.createElement("p", {className:"muted", style:{fontSize:"12px"}}, "Consejo: marca 3–5 fortalezas para un resultado más fino.")
        )
      ),
      React.createElement("section", null,
        React.createElement("h2", null, "Top 3 ideas para ti"),
        React.createElement("div", { className:"grid grid-3" },
          top3.map(({idea, score, breakdown}, idx) =>
            React.createElement("div", { key:idea.id, className:"card" },
              React.createElement("div", { style:{display:"flex", justifyContent:"space-between"} },
                React.createElement("span", { className:"muted", style:{fontSize:"12px"} }, `#${idx+1}`),
                React.createElement("span", { className:"mono", style:{fontSize:"12px"} }, `Score ${(score*100).toFixed(0)}/100`),
              ),
              React.createElement("h3", { style:{fontSize:"18px", fontWeight:800, lineHeight:1.2} }, idea.name),
              React.createElement("p", { className:"muted", style:{fontSize:"14px"} }, idea.notes),
              React.createElement("div", { className:"grid grid-2" },
                React.createElement("div", { className:"card", style:{padding:"8px"} },
                  React.createElement("div", { className:"muted", style:{fontSize:"12px"} }, "CAPEX"),
                  React.createElement("div", null, `€${idea.capexMin.toLocaleString()}–€${idea.capexMax.toLocaleString()}`)
                ),
                React.createElement("div", { className:"card", style:{padding:"8px"} },
                  React.createElement("div", { className:"muted", style:{fontSize:"12px"} }, "Beneficio/mes"),
                  React.createElement("div", null, `€${idea.monthlyNetProfitRange[0].toLocaleString()}–€${idea.monthlyNetProfitRange[1].toLocaleString()}`)
                ),
                React.createElement("div", { className:"card", style:{padding:"8px"} },
                  React.createElement("div", { className:"muted", style:{fontSize:"12px"} }, "Horas/semana"),
                  React.createElement("div", null, `${idea.hoursMin}–${idea.hoursMax}h`)
                ),
                React.createElement("div", { className:"card", style:{padding:"8px"} },
                  React.createElement("div", { className:"muted", style:{fontSize:"12px"} }, "Meses a beneficio"),
                  React.createElement("div", null, `${idea.timeToProfitMonths}`)
                ),
              ),
              React.createElement("div", null,
                Object.entries(breakdown).map(([k,v]) =>
                  React.createElement("div", { key:k, style:{display:"flex", alignItems:"center", gap:"8px", marginTop:"6px"} },
                    React.createElement("span", { style:{width:"90px", fontSize:"12px"} }, k),
                    React.createElement("div", { className:"bar", style:{flex:1} },
                      React.createElement("div", { style:{ width: `${Math.round(v*100)}%` } })
                    ),
                    React.createElement("span", { className:"mono", style:{width:"36px", textAlign:"right", fontSize:"12px"} }, `${Math.round(v*100)}`)
                  )
                )
              ),
              React.createElement("div", { className:"muted", style:{fontSize:"12px", paddingTop:"6px"} }, `Skills clave: ${idea.skills.map((s)=> SKILL_LABELS[s] || s).join(", ")}`)
            )
          )
        )
      ),
      React.createElement("section", null,
        React.createElement("details", { className:"card" },
          React.createElement("summary", { style:{fontWeight:700} }, "Ver todas las ideas y cómo puntúan"),
          React.createElement("div", { style:{marginTop:"12px"} },
            results.map(({idea, score}) =>
              React.createElement("div", { key:idea.id, className:"card", style:{marginBottom:"8px"} },
                React.createElement("div", { style:{display:"flex", justifyContent:"space-between", alignItems:"center"} },
                  React.createElement("h4", { style:{margin:0} }, idea.name),
                  React.createElement("span", { className:"mono" }, `${(score*100).toFixed(0)}/100`)
                ),
                React.createElement("div", { className:"muted", style:{fontSize:"12px"} },
                  `CAPEX €${idea.capexMin.toLocaleString()}–€${idea.capexMax.toLocaleString()} · Horas ${idea.hoursMin}–${idea.hoursMax} · Beneficio/mes €${idea.monthlyNetProfitRange[0]}–€${idea.monthlyNetProfitRange[1]} · ${idea.online && idea.offline ? "Mixto" : idea.online ? "Online" : "Offline"}`
                )
              )
            )
          )
        )
      ),
      React.createElement("footer", { className:"muted", style:{fontSize:"12px"} },
        "Metodología: la puntuación combina ajuste de presupuesto, horas, urgencia, riesgo/regulación, skills, modo y ROI estimado."
      )
    )
  );
}

const root = createRoot(document.getElementById("business-calculator-root"));
root.render(React.createElement(BusinessCalculator));
