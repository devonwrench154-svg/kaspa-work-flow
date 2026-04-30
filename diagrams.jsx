// Diagrams — built around the actual product architecture
// Phase 1 core → Kaspaflow hub → Phase 2 expand

const HeroDiagram = () => {
  const [tick, setTick] = React.useState(0);
  React.useEffect(() => {
    const id = setInterval(() => setTick(t => (t + 1) % 6), 1800);
    return () => clearInterval(id);
  }, []);

  // 6 modules: 0-2 phase 1, 3-5 phase 2
  const phase1 = [
    { x: 60,  label: 'CV Screener',     sub: 'Reads, ranks, explains' },
    { x: 320, label: 'Lead Qualifier',  sub: 'Scores inbound demand' },
    { x: 580, label: 'Onboarding Bot',  sub: 'Automates client intake' },
  ];
  const phase2 = [
    { x: 60,  label: 'Proposal Generator', sub: 'Drafts in your house style' },
    { x: 320, label: 'Client Reporting',   sub: 'Generates weekly briefs' },
    { x: 580, label: 'Email Automation',   sub: 'Outreach & follow-ups' },
  ];
  const HUB_X = 320, HUB_Y = 240;

  const isActive = (i) => tick === i;

  return (
    <div style={{ width: '100%' }}>
      <svg viewBox="0 0 800 480" style={{ width: '100%', height: 'auto', overflow: 'visible' }}>
        <defs>
          <pattern id="dots" width="14" height="14" patternUnits="userSpaceOnUse">
            <circle cx="1" cy="1" r="0.7" fill="var(--ink-4)" opacity="0.3" />
          </pattern>
          <marker id="arrow" viewBox="0 0 10 10" refX="9" refY="5" markerWidth="5" markerHeight="5" orient="auto">
            <path d="M0,0 L10,5 L0,10 z" fill="var(--ink-3)" />
          </marker>
          <marker id="arrowAccent" viewBox="0 0 10 10" refX="9" refY="5" markerWidth="5" markerHeight="5" orient="auto">
            <path d="M0,0 L10,5 L0,10 z" fill="var(--accent)" />
          </marker>
        </defs>

        <rect x="0" y="0" width="800" height="480" fill="url(#dots)" />

        {/* Phase 1 lane label */}
        <line x1="40" y1="28" x2="760" y2="28" stroke="var(--hair)" />
        <text x="40" y="22" fontSize="10" fill="var(--ink-3)" letterSpacing="2" fontFamily="var(--sans)">PHASE 01 — CORE</text>
        <text x="760" y="22" fontSize="10" fill="var(--ink-3)" letterSpacing="2" fontFamily="var(--sans)" textAnchor="end">DEPLOYED IN WEEKS 1–4</text>

        {/* Phase 1 modules */}
        {phase1.map((m, i) => {
          const active = isActive(i);
          return (
            <g key={i} transform={`translate(${m.x}, 50)`}>
              <rect width="160" height="68" rx="4" fill="#fff" stroke={active ? "var(--accent)" : "var(--hair)"} strokeWidth={active ? 1.4 : 1} />
              <text x="14" y="22" fontSize="9.5" fill="var(--ink-3)" letterSpacing="1.5" fontFamily="var(--sans)">{`MODULE 0${i+1}`}</text>
              <text x="14" y="42" fontSize="14" fill="var(--ink)" fontFamily="var(--serif)" fontWeight="500">{m.label}</text>
              <text x="14" y="58" fontSize="11" fill="var(--ink-3)" fontFamily="var(--sans)">{m.sub}</text>
              <circle cx="148" cy="14" r="2.5" fill={active ? "var(--accent)" : "var(--ink-4)"}>
                {active && <animate attributeName="r" values="2.5;5;2.5" dur="0.8s" />}
              </circle>
            </g>
          );
        })}

        {/* connectors phase 1 → hub */}
        {phase1.map((m, i) => {
          const active = isActive(i);
          return (
            <path key={i}
              d={`M${m.x + 80} 118 C ${m.x + 80} 180, ${HUB_X + 80} 180, ${HUB_X + 80} ${HUB_Y - 4}`}
              fill="none"
              stroke={active ? "var(--accent)" : "var(--hair)"}
              strokeWidth={active ? 1.4 : 1}
              markerEnd={active ? "url(#arrowAccent)" : "url(#arrow)"}
            />
          );
        })}

        {/* HUB */}
        <g transform={`translate(${HUB_X}, ${HUB_Y})`}>
          <rect width="160" height="80" rx="6" fill="var(--accent)" />
          <text x="80" y="22" textAnchor="middle" fontSize="9.5" fill="rgba(255,255,255,0.6)" letterSpacing="2" fontFamily="var(--sans)">THE HUB</text>
          <text x="80" y="46" textAnchor="middle" fontSize="18" fill="#fff" fontFamily="var(--serif)" fontStyle="italic" fontWeight="300">Kaspaflow</text>
          <text x="80" y="64" textAnchor="middle" fontSize="10.5" fill="rgba(255,255,255,0.7)" fontFamily="var(--sans)">shared data · single dashboard</text>
          {/* pulse ring */}
          <rect x="-4" y="-4" width="168" height="88" rx="8" fill="none" stroke="rgba(255,255,255,0.45)" strokeWidth="1" opacity="0.4">
            <animate attributeName="opacity" values="0.4;0;0.4" dur="2.4s" repeatCount="indefinite" />
            <animate attributeName="stroke-width" values="1;2;1" dur="2.4s" repeatCount="indefinite" />
          </rect>
        </g>

        {/* Phase 2 lane label */}
        <line x1="40" y1="358" x2="760" y2="358" stroke="var(--hair)" />
        <text x="40" y="352" fontSize="10" fill="var(--ink-3)" letterSpacing="2" fontFamily="var(--sans)">PHASE 02 — EXPAND</text>
        <text x="760" y="352" fontSize="10" fill="var(--ink-3)" letterSpacing="2" fontFamily="var(--sans)" textAnchor="end">DEPLOYED IN WEEKS 5–12</text>

        {/* connectors hub → phase 2 */}
        {phase2.map((m, i) => {
          const idx = i + 3;
          const active = isActive(idx);
          return (
            <path key={i}
              d={`M${HUB_X + 80} ${HUB_Y + 84} C ${HUB_X + 80} 368, ${m.x + 80} 370, ${m.x + 80} 380`}
              fill="none"
              stroke={active ? "var(--accent)" : "var(--hair)"}
              strokeWidth={active ? 1.4 : 1}
              markerEnd={active ? "url(#arrowAccent)" : "url(#arrow)"}
            />
          );
        })}

        {/* Phase 2 modules */}
        {phase2.map((m, i) => {
          const idx = i + 3;
          const active = isActive(idx);
          return (
            <g key={i} transform={`translate(${m.x}, 380)`}>
              <rect width="160" height="68" rx="4" fill="#fff" stroke={active ? "var(--accent)" : "var(--hair)"} strokeWidth={active ? 1.4 : 1} />
              <text x="14" y="22" fontSize="9.5" fill="var(--ink-3)" letterSpacing="1.5" fontFamily="var(--sans)">{`MODULE 0${idx+1}`}</text>
              <text x="14" y="42" fontSize="14" fill="var(--ink)" fontFamily="var(--serif)" fontWeight="500">{m.label}</text>
              <text x="14" y="58" fontSize="11" fill="var(--ink-3)" fontFamily="var(--sans)">{m.sub}</text>
              <circle cx="148" cy="14" r="2.5" fill={active ? "var(--accent)" : "var(--ink-4)"}>
                {active && <animate attributeName="r" values="2.5;5;2.5" dur="0.8s" />}
              </circle>
            </g>
          );
        })}

        {/* fig caption */}
        <text x="40" y="472" fontSize="10.5" fill="var(--ink-3)" letterSpacing="1.5" fontFamily="var(--sans)">FIG. 01 — THE KASPAFLOW ARCHITECTURE: SIX MODULES, ONE OPERATING SYSTEM</text>
      </svg>
    </div>
  );
};

const ModuleDiagram = ({ kind }) => {
  // Compact, distinctive diagram per module
  const w = 140, h = 70;
  if (kind === 'cv') {
    return (
      <svg viewBox="0 0 140 70" style={{ width: w, height: h }}>
        {[8, 22, 36].map((x, i) => (
          <g key={i}>
            <rect x={x} y="14" width="12" height="42" rx="1" fill="#fff" stroke="var(--hair)" />
            <line x1={x + 3} y1="22" x2={x + 9} y2="22" stroke="var(--ink-4)" strokeWidth="0.8" />
            <line x1={x + 3} y1="28" x2={x + 9} y2="28" stroke="var(--ink-4)" strokeWidth="0.8" />
            <line x1={x + 3} y1="34" x2={x + 8} y2="34" stroke="var(--ink-4)" strokeWidth="0.8" />
          </g>
        ))}
        <path d="M62 35 L82 35" stroke="var(--ink-3)" strokeWidth="1" markerEnd="url(#arrow)" />
        <rect x="86" y="20" width="46" height="30" rx="2" fill="var(--accent)" />
        <text x="109" y="32" textAnchor="middle" fontSize="8" fill="rgba(255,255,255,0.6)" fontFamily="var(--sans)" letterSpacing="1">SCORE</text>
        <text x="109" y="44" textAnchor="middle" fontSize="13" fill="#fff" fontFamily="var(--serif)" fontStyle="italic">87</text>
      </svg>
    );
  }
  if (kind === 'lead') {
    return (
      <svg viewBox="0 0 140 70" style={{ width: w, height: h }}>
        {[
          { y: 14, t: 'A' }, { y: 32, t: 'B' }, { y: 50, t: 'C' }
        ].map((r, i) => (
          <g key={i}>
            <rect x="6" y={r.y} width="40" height="14" rx="2" fill="#fff" stroke="var(--hair)" />
            <text x="14" y={r.y + 10} fontSize="9" fill="var(--ink-3)" fontFamily="var(--sans)">Lead {r.t}</text>
            <line x1="48" y1={r.y + 7} x2="76" y2={35} stroke="var(--hair)" strokeWidth="0.8" />
          </g>
        ))}
        <rect x="76" y="22" width="58" height="26" rx="2" fill="none" stroke="var(--accent)" />
        <text x="105" y="32" textAnchor="middle" fontSize="8" fill="var(--accent)" letterSpacing="1.5" fontFamily="var(--sans)">QUALIFIED</text>
        <text x="105" y="44" textAnchor="middle" fontSize="11" fill="var(--ink)" fontFamily="var(--serif)" fontStyle="italic">A · 92%</text>
      </svg>
    );
  }
  if (kind === 'onboard') {
    return (
      <svg viewBox="0 0 140 70" style={{ width: w, height: h }}>
        {[8, 38, 68, 98].map((x, i) => (
          <g key={i}>
            <circle cx={x + 8} cy="35" r="5" fill={i === 0 ? "var(--accent)" : "#fff"} stroke={i === 0 ? "var(--accent)" : "var(--hair)"} />
            {i < 3 && <line x1={x + 13} y1="35" x2={x + 33} y2="35" stroke="var(--hair)" strokeDasharray="2 2" />}
          </g>
        ))}
        <text x="16" y="22" textAnchor="middle" fontSize="8" fill="var(--ink-3)" fontFamily="var(--sans)">Brief</text>
        <text x="46" y="22" textAnchor="middle" fontSize="8" fill="var(--ink-3)" fontFamily="var(--sans)">Docs</text>
        <text x="76" y="22" textAnchor="middle" fontSize="8" fill="var(--ink-3)" fontFamily="var(--sans)">SLA</text>
        <text x="106" y="22" textAnchor="middle" fontSize="8" fill="var(--ink-3)" fontFamily="var(--sans)">Live</text>
      </svg>
    );
  }
  if (kind === 'proposal') {
    return (
      <svg viewBox="0 0 140 70" style={{ width: w, height: h }}>
        <rect x="6" y="8" width="60" height="54" rx="2" fill="none" stroke="var(--hair)" />
        {[16, 22, 28, 34, 40, 46, 52].map((y, i) => (
          <line key={i} x1="12" y1={y} x2={i % 2 ? 56 : 48} y2={y} stroke="var(--ink-4)" strokeWidth="0.8" opacity="0.6" />
        ))}
        <path d="M68 35 L82 35" stroke="var(--ink-3)" strokeWidth="1" markerEnd="url(#arrow)" />
        <rect x="86" y="8" width="48" height="54" rx="2" fill="#fff" stroke="var(--accent)" />
        <text x="110" y="20" textAnchor="middle" fontSize="7" fill="var(--accent)" letterSpacing="1.5" fontFamily="var(--sans)">DRAFT</text>
        {[28, 34, 40, 46, 52].map((y, i) => (
          <line key={i} x1="92" y1={y} x2="128" y2={y} stroke="var(--ink-2)" strokeWidth="0.8" />
        ))}
      </svg>
    );
  }
  if (kind === 'reporting') {
    return (
      <svg viewBox="0 0 140 70" style={{ width: w, height: h }}>
        <rect x="6" y="8" width="128" height="54" rx="2" fill="#fff" stroke="var(--hair)" />
        <line x1="6" y1="20" x2="134" y2="20" stroke="var(--hair-2)" />
        <text x="12" y="17" fontSize="7" fill="var(--ink-3)" letterSpacing="1.2" fontFamily="var(--sans)">WEEK 17 · CLIENT BRIEF</text>
        <polyline points="14,52 30,46 46,48 62,38 78,40 94,32 110,34 128,26" fill="none" stroke="var(--accent)" strokeWidth="1.4" />
        {[14,30,46,62,78,94,110,128].map((x, i) => {
          const ys = [52,46,48,38,40,32,34,26];
          return <circle key={i} cx={x} cy={ys[i]} r="1.5" fill="var(--accent)" />;
        })}
      </svg>
    );
  }
  if (kind === 'email') {
    return (
      <svg viewBox="0 0 140 70" style={{ width: w, height: h }}>
        <circle cx="14" cy="35" r="3" fill="var(--accent)" />
        {[
          { x: 32, y: 20 }, { x: 56, y: 35 }, { x: 80, y: 50 }, { x: 104, y: 35 },
        ].map((p, i) => (
          <g key={i}>
            <line x1={i === 0 ? 17 : [32,56,80,104][i-1] + 16} y1={i === 0 ? 35 : [20,35,50,35][i-1] + 7} x2={p.x} y2={p.y + 7} stroke="var(--hair)" />
            <rect x={p.x} y={p.y} width="16" height="14" rx="1" fill="#fff" stroke="var(--hair)" />
            <line x1={p.x + 3} y1={p.y + 5} x2={p.x + 13} y2={p.y + 5} stroke="var(--ink-4)" strokeWidth="0.7" />
            <line x1={p.x + 3} y1={p.y + 9} x2={p.x + 10} y2={p.y + 9} stroke="var(--ink-4)" strokeWidth="0.7" />
          </g>
        ))}
        <line x1="120" y1="42" x2="134" y2="42" stroke="var(--accent)" strokeDasharray="2 2" />
      </svg>
    );
  }
  return null;
};

const HubDiagram = () => {
  const [hovered, setHovered] = React.useState(null);

  const modules = [
    { x: 32,  y: 30,  label: 'CV Screener' },
    { x: 192, y: 10,  label: 'Lead Qualifier' },
    { x: 352, y: 30,  label: 'Onboarding Bot' },
    { x: 32,  y: 240, label: 'Proposal Gen.' },
    { x: 192, y: 270, label: 'Client Reports' },
    { x: 352, y: 240, label: 'Email Auto.' },
  ];

  return (
    <svg viewBox="0 0 480 320" style={{ width: '100%', height: 'auto' }}>
      <defs>
        <radialGradient id="hubGrad" cx="50%" cy="50%" r="50%">
          <stop offset="0%" stopColor="rgba(168,184,207,0.45)" />
          <stop offset="100%" stopColor="rgba(168,184,207,0)" />
        </radialGradient>
      </defs>

      {modules.map((m, i) => {
        const hot = hovered === i;
        return (
          <g key={i}
            onMouseEnter={() => setHovered(i)}
            onMouseLeave={() => setHovered(null)}
            style={{ cursor: 'pointer' }}
          >
            <line
              x1={m.x + 48} y1={m.y + 18} x2="240" y2="160"
              stroke={hot ? 'var(--accent)' : 'rgba(168,184,207,0.3)'}
              strokeWidth={hot ? 1.5 : 1}
              strokeDasharray="3 3"
            >
              <animate attributeName="stroke-dashoffset" values="0;-12" dur={`${2 + i * 0.25}s`} repeatCount="indefinite" />
            </line>
            <rect
              x={m.x} y={m.y} width="96" height="36" rx="3"
              style={{
                fill: hot ? 'var(--accent)' : 'rgba(255,255,255,0.05)',
                stroke: hot ? 'var(--accent)' : 'rgba(255,255,255,0.18)',
                transition: 'fill 0.2s ease, stroke 0.2s ease',
              }}
            />
            <text
              x={m.x + 48} y={m.y + 22}
              textAnchor="middle" fontSize="11"
              fill="#fff"
              fontFamily="var(--sans)"
            >{m.label}</text>
          </g>
        );
      })}

      <circle cx="240" cy="160" r="80" fill="url(#hubGrad)" />
      <circle cx="240" cy="160" r="48" fill="rgba(255,255,255,0.04)" stroke="rgba(255,255,255,0.25)" />
      <text x="240" y="156" textAnchor="middle" fontSize="10" fill="rgba(255,255,255,0.55)" letterSpacing="2" fontFamily="var(--sans)">THE HUB</text>
      <text x="240" y="176" textAnchor="middle" fontSize="15" fill="#fff" fontFamily="var(--serif)" fontStyle="italic">Kaspaflow</text>
    </svg>
  );
};

const CaseDiagram = ({ kind }) => {
  if (kind === 'a') {
    return (
      <svg viewBox="0 0 220 60" style={{ width: '100%', height: 60 }}>
        <line x1="10" y1="50" x2="210" y2="50" stroke="var(--hair)" />
        <polyline points="20,42 50,32 80,36 110,22 140,18 170,12 200,8" fill="none" stroke="var(--accent)" strokeWidth="1.4" />
        {[[20,42],[50,32],[80,36],[110,22],[140,18],[170,12],[200,8]].map(([x,y], i) => (
          <circle key={i} cx={x} cy={y} r="2" fill="var(--accent)" />
        ))}
        <text x="20" y="58" fontSize="8" fill="var(--ink-3)" letterSpacing="1" fontFamily="var(--sans)">WK 1</text>
        <text x="200" y="58" fontSize="8" fill="var(--ink-3)" letterSpacing="1" fontFamily="var(--sans)" textAnchor="end">WK 12</text>
      </svg>
    );
  }
  return (
    <svg viewBox="0 0 220 60" style={{ width: '100%', height: 60 }}>
      <rect x="10" y="14" width="200" height="32" rx="2" fill="none" stroke="var(--hair)" />
      <rect x="10" y="14" width="68" height="32" rx="2" fill="rgba(31,58,95,0.10)" />
      <rect x="10" y="14" width="172" height="32" rx="2" fill="rgba(31,58,95,0.20)" />
      <line x1="78" y1="10" x2="78" y2="50" stroke="var(--ink-3)" strokeDasharray="2 2" />
      <text x="20" y="34" fontSize="9" fill="var(--ink-3)" letterSpacing="1.2" fontFamily="var(--sans)">BEFORE</text>
      <text x="195" y="34" fontSize="10" fill="var(--accent)" fontFamily="var(--serif)" fontStyle="italic" textAnchor="end">After Kaspaflow</text>
    </svg>
  );
};

window.HeroDiagram = HeroDiagram;
window.ModuleDiagram = ModuleDiagram;
window.HubDiagram = HubDiagram;
window.CaseDiagram = CaseDiagram;
