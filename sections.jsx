// Sections — restructured around Phase 1 / Hub / Phase 2

const jump = (id) => {
  const headerOffset = 70;
  const targetEl = id === 'top' ? null : document.getElementById(id);
  const targetY = targetEl ? targetEl.getBoundingClientRect().top + window.scrollY - headerOffset : 0;
  const reduced = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
  if (reduced) { window.scrollTo(0, targetY); return; }
  const startY = window.scrollY;
  const distance = targetY - startY;
  if (Math.abs(distance) < 2) return;
  const duration = Math.min(1200, 500 + Math.abs(distance) * 0.4);
  const start = performance.now();
  const ease = (t) => t < 0.5 ? 4 * t * t * t : 1 - Math.pow(-2 * t + 2, 3) / 2;
  const step = (now) => {
    const t = Math.min(1, (now - start) / duration);
    window.scrollTo(0, startY + distance * ease(t));
    if (t < 1) requestAnimationFrame(step);
  };
  requestAnimationFrame(step);
};
window.jump = jump;

// ─── Google Sheets endpoint ────────────────────────────────────────────────
// 1. Open google-apps-script.js in this folder, copy the code into a new
//    Google Apps Script project (script.google.com), deploy as a Web App
//    (Execute as: Me · Who has access: Anyone), then paste the URL below.
const SHEETS_ENDPOINT = '';
// ──────────────────────────────────────────────────────────────────────────

const BrandMark = () => (
  <svg className="brand-mark" viewBox="0 0 32 32">
    <circle cx="16" cy="16" r="15" fill="none" stroke="var(--ink)" strokeWidth="1" />
    <circle cx="16" cy="16" r="3" fill="var(--accent)" />
    <line x1="16" y1="1" x2="16" y2="13" stroke="var(--ink)" strokeWidth="1" />
    <line x1="16" y1="19" x2="16" y2="31" stroke="var(--ink)" strokeWidth="1" />
    <line x1="1" y1="16" x2="13" y2="16" stroke="var(--ink)" strokeWidth="1" />
    <line x1="19" y1="16" x2="31" y2="16" stroke="var(--ink)" strokeWidth="1" />
  </svg>
);

const Arrow = ({ size = 14 }) => (
  <svg className="arrow" width={size} height={size} viewBox="0 0 16 16" fill="none">
    <path d="M3 8h10M9 4l4 4-4 4" stroke="currentColor" strokeWidth="1.4" strokeLinecap="round" strokeLinejoin="round" />
  </svg>
);

const Nav = ({ onJump }) => (
  <nav className="nav" data-screen-label="00 Nav">
    <div className="wrap nav-inner">
      <a className="brand" onClick={() => onJump('top')}>
        <BrandMark />
        <span><b>Kaspa</b><i>flow</i></span>
      </a>
      <div className="nav-links">
        <a onClick={() => onJump('architecture')}>Architecture</a>
        <a onClick={() => onJump('modules')}>Modules</a>
        <a onClick={() => onJump('cases')}>Methodology</a>
        <a onClick={() => onJump('pricing')}>Engagements</a>
        <a onClick={() => onJump('contact')}>Contact</a>
      </div>
      <a className="nav-cta" onClick={() => onJump('contact')}>
        Book a call <Arrow />
      </a>
    </div>
  </nav>
);

const Hero = () => (
  <section className="hero" data-screen-label="01 Hero">
    <div className="wrap">
<div className="hero-grid">
        <div>
          <h1>
            A connected <em>operating system</em> for recruitment firms.
          </h1>
        </div>
        <div>
          <p className="lede">
            Kaspaflow installs six purpose-built modules — connected through a single hub — that handle the administrative weight of a modern recruitment desk. Your consultants are returned to the work that earns fees.
          </p>
          <div className="hero-actions">
            <a className="btn btn-primary" onClick={() => jump('contact')}>
              Arrange a consultation <Arrow />
            </a>
            <a className="btn btn-ghost" onClick={() => jump('architecture')}>
              View the architecture
            </a>
          </div>
        </div>
      </div>
    </div>
  </section>
);

const Architecture = () => (
  <section className="section" id="architecture" data-screen-label="02 Architecture">
    <div className="wrap">
      <div className="section-head">
        <div className="left">
          <div className="eyebrow"><span className="dot"></span>The Architecture</div>
          <h2>Six modules. <em>One</em> hub. A deliberate sequence.</h2>
        </div>
        <div className="right">
          We do not deploy everything at once. Phase one establishes the three operational modules every firm requires — screening, qualification and intake. The Kaspaflow hub binds them through a shared data layer. Phase two extends the system into client-facing work: proposals, reporting and outreach.
        </div>
      </div>

      <div className="hero-diagram-wrap" style={{ marginTop: 0, paddingTop: 0, borderTop: 'none', background: 'transparent' }}>
        <HeroDiagram />
      </div>
    </div>
  </section>
);

const Trust = () => {
  const pillars = [
    { n: '01', t: 'UK-built, UK-hosted', d: 'Designed in London for UK recruitment practice. All data resident on UK infrastructure, aligned to ISO 27001 controls.' },
    { n: '02', t: 'Six modules, one hub', d: 'Screening, qualification, intake, proposals, reporting and outreach — operating on a shared data layer rather than as disconnected tools.' },
    { n: '03', t: 'Licence-and-host model', d: 'You licence the modules; we host and operate them at no additional cost. The build is yours — migrate to your own infrastructure whenever it suits.' },
    { n: '04', t: 'Honest counsel', d: 'Where automation is not the appropriate response, we will say so plainly. We decline more engagements than we accept.' },
  ];
  return (
    <section className="trust">
      <div className="wrap trust-inner">
        <div className="trust-label">A considered approach to recruitment automation. Built for partners and operators who measure outcomes in months, not minutes.</div>
        <div className="trust-stats">
          {pillars.map(p => (
            <div className="trust-stat" key={p.n}>
              <div className="num"><em>{p.n}</em></div>
              <div className="lbl" style={{ fontFamily: 'var(--serif)', fontSize: 14, color: 'var(--ink)', marginBottom: 4 }}>{p.t}</div>
              <div className="lbl">{p.d}</div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

const ModulesSection = () => {
  const phase1 = [
    {
      n: '01', kind: 'cv', title: 'CV Screener', status: 'In production',
      desc: 'A trained reader that evaluates candidate documents against the brief, ranks the stack, and articulates its reasoning in language a senior consultant would recognise. Our flagship module — already deployed across multiple desks.',
      tag: 'Module 01', save: 'Reads, ranks, explains',
    },
    {
      n: '02', kind: 'lead', title: 'Lead Qualifier', status: 'Phase one',
      desc: 'Inbound enquiries are scored against firm-defined criteria — sector fit, mandate value, prior relationship — before a consultant ever reads them. The desk works the qualified, not the noise.',
      tag: 'Module 02', save: 'Score inbound leads',
    },
    {
      n: '03', kind: 'onboard', title: 'Onboarding Bot', status: 'Phase one',
      desc: 'Automates the procedural choreography of new client engagement: brief capture, document collection, SLA confirmation and handover. What previously consumed a week becomes a day.',
      tag: 'Module 03', save: 'Automate client intake',
    },
  ];

  const phase2 = [
    {
      n: '04', kind: 'proposal', title: 'Proposal Generator', status: 'Phase two',
      desc: 'Drafts proposals in your firm\'s established voice, drawing on prior submissions, fee structures and case histories. A consultant reviews, refines and sends — never starts from a blank page.',
      tag: 'Module 04', save: 'Auto-draft proposals',
    },
    {
      n: '05', kind: 'reporting', title: 'Client Reporting', status: 'Phase two',
      desc: 'Weekly client-facing reports written from live pipeline data, in the prose your firm prefers. Replaces the spreadsheet-and-paste ritual that consumes Friday afternoons.',
      tag: 'Module 05', save: 'Auto-generate reports',
    },
    {
      n: '06', kind: 'email', title: 'Email Automation', status: 'Phase two',
      desc: 'Outreach and follow-up cadences that read as though a consultant wrote them — because the consultant defines the patterns. Branching logic, reply detection, intelligent hand-off.',
      tag: 'Module 06', save: 'Outreach + follow-ups',
    },
  ];

  const Row = ({ s }) => (
    <div className="service-row">
      <div className="num">{s.n}</div>
      <div>
        <h3>{s.title}</h3>
        <div style={{ fontSize: 12, color: 'var(--ink-3)', marginTop: 6, letterSpacing: '0.08em' }}>{s.status}</div>
      </div>
      <div className="desc">{s.desc}</div>
      <div className="meta">
        <ModuleDiagram kind={s.kind} />
        <span className="tag">{s.tag}</span>
        <span className="save">{s.save}</span>
      </div>
    </div>
  );

  return (
    <section className="section" id="modules" data-screen-label="03 Modules">
      <div className="wrap">
        <div className="section-head">
          <div className="left">
            <div className="eyebrow"><span className="dot"></span>The Modules</div>
            <h2>Six instruments, deployed in <em>sequence</em>.</h2>
          </div>
          <div className="right">
            Each module solves a discrete, measurable problem. Together — through the hub — they become an operating system. Phase one is foundational; phase two compounds the return.
          </div>
        </div>

        <div className="phase-label">
          <span className="eyebrow"><span className="dot"></span>Phase 01 — Core</span>
          <span className="phase-meta">Weeks 1–4 · Three operational modules</span>
        </div>
        <div className="services-list">
          {phase1.map((s, i) => <Row key={i} s={s} />)}
        </div>

        <div className="phase-label" style={{ marginTop: 64 }}>
          <span className="eyebrow"><span className="dot"></span>Phase 02 — Expand</span>
          <span className="phase-meta">Weeks 5–12 · Three client-facing modules</span>
        </div>
        <div className="services-list">
          {phase2.map((s, i) => <Row key={i} s={s} />)}
        </div>
      </div>
    </section>
  );
};

const HubBand = () => (
  <section className="integration" data-screen-label="04 Hub">
    <div className="wrap">
      <div className="eyebrow"><span className="dot"></span>The Kaspaflow Hub</div>
      <div className="integration-grid">
        <div>
          <h2>The hub is what makes <em>six</em> modules behave as one.</h2>
          <p className="lede" style={{ marginTop: 24 }}>
            A shared data layer and a single dashboard. The screener informs the qualifier; the qualifier informs onboarding; onboarding feeds proposals and reporting. Every module enriches every other — without rip-and-replace, integrating with the systems your firm already operates.
          </p>
          <div className="integration-points">
            <div><span className="num">01</span><span>Shared candidate, client and pipeline records</span></div>
            <div><span className="num">02</span><span>Single, written-from-data dashboard</span></div>
            <div><span className="num">03</span><span>Connects to Bullhorn, Vincere, JobAdder, Salesforce</span></div>
          </div>
        </div>
        <HubDiagram />
      </div>
    </div>
  </section>
);

const faqCategories = [
  {
    label: 'The Platform',
    id: 'faq-cat-platform',
    items: [
      {
        q: 'Our CRM is already embedded across the firm. Will this require a rip-and-replace?',
        a: 'No. The Kaspaflow hub sits alongside your existing infrastructure, not in place of it. Bullhorn, Vincere, JobAdder and Salesforce connect as standard on the Firm tier. Atelier covers proprietary or bespoke systems. The intent is augmentation — your consultants continue working in the tools they know.',
      },
      {
        q: 'We have handled sensitive mandates for thirty years. Where does our candidate and client data actually sit?',
        a: 'On Kaspaflow infrastructure, hosted entirely within the United Kingdom, aligned to ISO 27001 controls. We do not route data through third-party processors. Should you wish to migrate the build to your own servers at any point — including on the day you cancel — the configuration, prompts and documentation transfer with you.',
      },
    ],
  },
  {
    label: 'Implementation',
    id: 'faq-cat-implementation',
    items: [
      {
        q: 'What is the realistic timeline from first conversation to live deployment?',
        a: 'Four weeks to phase one operating on your desk. Week zero is a working day on-site — we map the desk, time the handoffs, and build the ROI model before any configuration begins. Weeks one through four: build, parallel run, handover. Phase two, if appropriate, follows over weeks five to twelve. We do not compress the timeline to close an engagement.',
      },
      {
        q: 'The partners here are sceptical of automation. How do we manage the internal case?',
        a: 'Begin with a single module and a single desk. The CV Screener is typically the clearest demonstration: the return is measurable within the first fortnight, the consultant who uses it becomes its advocate, and the internal conversation changes accordingly. We can support that case with the data from your own pipeline — we do not rely on case studies from other firms.',
      },
      {
        q: 'Our operations lead is stretched. How much internal resource does this actually require?',
        a: 'Less than you may expect. We ask for one named contact — typically your operations lead or a senior consultant — for a standing one-hour weekly session during the build. Day-to-day configuration, refinement and support is handled by a dedicated Kaspaflow specialist. We size our engagement around your capacity, not our own delivery preferences.',
      },
    ],
  },
  {
    label: 'Engagements',
    id: 'faq-cat-engagements',
    items: [
      {
        q: 'What is the exit position if this does not perform as expected?',
        a: 'Foundation is 30-day rolling — you can stop at any point. Firm and Atelier carry annual terms with a documented exit clause. In every case, what was built is yours: the configuration, the prompt architecture, the process documentation. There is no dependency on Kaspaflow to continue operating what we have built together.',
      },
    ],
  },
];

const FaqAccordion = () => {
  const [openIdx, setOpenIdx] = React.useState(null);

  const sections = React.useMemo(() => {
    let i = 0;
    return faqCategories.map(cat => ({
      ...cat,
      items: cat.items.map(item => ({ ...item, idx: i++ })),
    }));
  }, []);

  const toggle = (idx) => setOpenIdx(prev => prev === idx ? null : idx);

  return (
    <div className="faq-list">
      {sections.map(cat => (
        <div key={cat.id} id={cat.id} className="faq-cat-section">
          <div className="faq-cat-label" aria-hidden="true">{cat.label}</div>
          {cat.items.map(({ idx, q, a }) => {
            const isOpen = openIdx === idx;
            const panelId = `faq-panel-${idx}`;
            const headId = `faq-head-${idx}`;
            return (
              <div key={idx} className={'faq-item' + (isOpen ? ' open' : '')}>
                <button
                  id={headId}
                  className="faq-trigger"
                  type="button"
                  aria-expanded={isOpen}
                  aria-controls={panelId}
                  onClick={() => toggle(idx)}
                >
                  <span className="faq-num">{String(idx + 1).padStart(2, '0')}</span>
                  <span className="faq-q">{q}</span>
                  <span className="faq-toggle" aria-hidden="true">+</span>
                </button>
                <div
                  id={panelId}
                  className={'faq-panel' + (isOpen ? ' open' : '')}
                  role="region"
                  aria-labelledby={headId}
                >
                  <div className="faq-a">{a}</div>
                </div>
              </div>
            );
          })}
        </div>
      ))}
    </div>
  );
};

const Methodology = () => {
  const steps = [
    {
      n: '01',
      week: 'Week 0',
      title: 'Process audit',
      desc: 'A working day spent on your desk — observing, timing and documenting the manual handoffs that consume consultant hours. We surface friction; we do not assume it.',
      deliv: 'Process map · friction inventory · ROI model',
    },
    {
      n: '02',
      week: 'Weeks 1–4',
      title: 'Phase one build',
      desc: 'CV Screener, Lead Qualifier and Onboarding Bot configured to your firm\'s sector, voice and existing systems. Built in your environment, reviewed against your data.',
      deliv: 'Three operational modules · hub configuration',
    },
    {
      n: '03',
      week: 'Weeks 5–12',
      title: 'Phase two extension',
      desc: 'Once the core is settled, we extend into client-facing work: Proposal Generator, Client Reporting, Email Automation. Each module is added only after the prior is in confident daily use.',
      deliv: 'Three client-facing modules · unified dashboard',
    },
    {
      n: '04',
      week: 'Ongoing',
      title: 'Refinement and handover',
      desc: 'A weekly cadence of refinement — your firm tells us what is working, we adjust. Documented SOPs, recorded handover and the option to take the system fully in-house at any point.',
      deliv: 'Documentation · training · in-house handover',
    },
  ];


  return (
    <>
    <section className="section" id="cases" data-screen-label="05 Methodology" style={{ paddingBottom: 0 }}>
      <div className="wrap">
        <div className="section-head">
          <div className="left">
            <div className="eyebrow"><span className="dot"></span>How We Work</div>
            <h2>A measured engagement. <em>Documented</em> at every stage.</h2>
          </div>
          <div className="right">
            Automation is not a software purchase. It is a change to how a desk operates. We treat it accordingly — with a sequence that earns trust before it asks for scale.
          </div>
        </div>

        <div className="methodology">
          {steps.map((s, i) => (
            <div className="method-step" key={i}>
              <div className="method-num">{s.n}</div>
              <div className="method-week">{s.week}</div>
              <div className="method-title"><h3>{s.title}</h3></div>
              <div className="method-desc">{s.desc}</div>
              <div className="method-deliv">
                <span className="eyebrow" style={{ fontSize: 10 }}>Deliverable</span>
                <span>{s.deliv}</span>
              </div>
            </div>
          ))}
        </div>

      </div>
    </section>
    <div className="faq-band">
      <div className="wrap">
        <div className="faq">
          <div className="faq-head">
            <div className="eyebrow"><span className="dot"></span>Frequently Asked</div>
            <p className="lede" style={{ marginTop: 12 }}>The questions a managing partner asks before committing the firm's time.</p>
            <nav className="faq-cat-nav" aria-label="Jump to category">
              {faqCategories.map(cat => (
                <a
                  key={cat.id}
                  href={'#' + cat.id}
                  onClick={(e) => {
                    e.preventDefault();
                    const el = document.getElementById(cat.id);
                    if (el) el.scrollIntoView({ behavior: 'smooth', block: 'nearest' });
                  }}
                >
                  {cat.label}
                </a>
              ))}
            </nav>
          </div>
          <FaqAccordion />
        </div>
      </div>
    </div>
    </>
  );
};

const Pricing = () => {
  const plans = [
    {
      name: <>Foundation</>,
      strap: 'For boutique desks beginning their automation work',
      desc: 'A single licensed module, configured to your firm and operated on Kaspaflow infrastructure. A contained problem, a defined return, no capital expenditure.',
      price: '£1,200',
      per: '/ month',
      annot: 'per module · 30-day rolling',
      feats: [
        'One licensed module of your choosing',
        'Up to 5 users',
        '500 candidate screens per month',
        'Two existing-system integrations',
        'Hosted on Kaspaflow infrastructure (UK)',
        'Continuous refinement and support',
        'Migrate to in-house servers at any point',
      ],
      cta: 'Begin with Foundation',
    },
    {
      name: <>Firm</>,
      strap: 'For established agencies, 6–25 consultants',
      desc: 'The principal engagement — all six modules, hub-connected, configured to your firm and run on our infrastructure. Designed for desks ready to operate as a system.',
      price: '£2,400',
      per: '/ month',
      annot: 'billed annually · 20% saving',
      feats: [
        'All six modules included',
        'Up to 25 users',
        '2,500 candidate screens per month',
        'Bullhorn, Vincere, JobAdder, Salesforce',
        'Custom proposal templates and client report branding',
        'White-glove onboarding · dedicated specialist',
        'Priority support · 4h response · dedicated Slack',
        'Quarterly business reviews',
      ],
      cta: 'Book a demo',
      featured: true,
      badge: 'Most engaged',
    },
    {
      name: <>Atelier</>,
      strap: 'For firms requiring bespoke architecture',
      desc: 'Proprietary scoring, custom data models and internal tooling beyond the standard six modules. Built around your firm\'s specific operating model.',
      price: 'Bespoke',
      per: '',
      annot: 'scoped per engagement',
      feats: [
        'Custom system architecture',
        'Unlimited users and screens',
        'Dedicated build team',
        'Proprietary models and scoring logic',
        'On-site discovery and workshops',
        'Self-host or Kaspaflow-host (your choice)',
        'White-glove handover and training',
      ],
      cta: 'Request a proposal',
    },
  ];

  return (
    <section className="section" id="pricing" data-screen-label="06 Engagements">
      <div className="wrap">
        <div className="section-head">
          <div className="left">
            <div className="eyebrow"><span className="dot"></span>Engagements</div>
            <h2>Three considered ways to <em>begin</em>.</h2>
          </div>
          <div className="right">
            You licence the modules; we host and operate them on UK-based infrastructure at no additional cost. The build is yours — migrate to in-house servers whenever it suits.
          </div>
        </div>

        <div className="pricing-grid">
          {plans.map((p, i) => (
            <div className={"plan" + (p.featured ? ' featured' : '')} key={i}>
              {p.badge && <div className="plan-badge">{p.badge}</div>}
              <div>
                <div className="plan-name">{p.name}</div>
                <div className="plan-strap">{p.strap}</div>
                <div className="plan-desc" style={{ marginTop: 12 }}>{p.desc}</div>
              </div>
              <div className="plan-price">
                <span className="amount">{p.price}</span>
                <span className="per">{p.per}</span>
              </div>
              <div className="plan-annot">{p.annot}</div>
              <ul className="plan-feat-list">
                {p.feats.map((f, j) => {
                  const num = String(j + 1).padStart(2, '0');
                  return <li key={j}><span className="feat-num">{num}</span><span>{f}</span></li>;
                })}
              </ul>
              <a className={"btn " + (p.featured ? 'btn-primary' : 'btn-ghost')} onClick={() => jump('contact')}>
                {p.cta} <Arrow />
              </a>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

const Contact = () => {
  const [form, setForm] = React.useState({
    name: '', firm: '', position: '', email: '', deskSize: '', modules: 'Kaspaflow Hub', notes: '',
  });
  const [formStatus, setFormStatus] = React.useState('idle'); // idle | submitting | success | error

  const [booking, setBooking] = React.useState({ name: '', email: '' });
  const [bookingStatus, setBookingStatus] = React.useState('idle');

  const { slots, tzLabel } = React.useMemo(() => {
    const TIMES = [
      { h: 9,  m: 30, str: '09:30' },
      { h: 11, m: 0,  str: '11:00' },
      { h: 14, m: 0,  str: '14:00' },
      { h: 15, m: 30, str: '15:30' },
    ];
    const now = new Date();
    const ukOf = (d) => {
      const f = new Intl.DateTimeFormat('en-GB', {
        timeZone: 'Europe/London',
        year: 'numeric', month: 'numeric', day: 'numeric',
        hour: 'numeric', minute: 'numeric', hour12: false,
      }).formatToParts(d);
      const g = t => +(f.find(p => p.type === t)?.value ?? 0);
      return { year: g('year'), month: g('month'), day: g('day'), hour: g('hour') % 24, minute: g('minute') };
    };
    const ukNow = ukOf(now);
    const tzName = new Intl.DateTimeFormat('en-GB', {
      timeZone: 'Europe/London', timeZoneName: 'short',
    }).formatToParts(now).find(p => p.type === 'timeZoneName')?.value ?? 'BST';
    const result = [];
    const MS_DAY = 864e5;
    for (let d = 0; result.length < 6 && d < 28; d++) {
      const candidate = new Date(now.getTime() + d * MS_DAY);
      const wday = new Intl.DateTimeFormat('en-GB', { timeZone: 'Europe/London', weekday: 'short' }).format(candidate);
      if (wday === 'Sat' || wday === 'Sun') continue;
      const ukC = ukOf(candidate);
      const isToday = ukC.year === ukNow.year && ukC.month === ukNow.month && ukC.day === ukNow.day;
      const dateParts = new Intl.DateTimeFormat('en-GB', {
        timeZone: 'Europe/London', weekday: 'short', day: 'numeric', month: 'short',
      }).formatToParts(candidate);
      const dayName = dateParts.find(p => p.type === 'weekday').value;
      const dayNum  = dateParts.find(p => p.type === 'day').value;
      const monName = dateParts.find(p => p.type === 'month').value;
      const label   = `${dayName} ${dayNum} ${monName}`;
      for (const t of TIMES) {
        if (result.length >= 6) break;
        if (isToday && t.h * 60 + t.m <= ukNow.hour * 60 + ukNow.minute + 60) continue;
        result.push({ id: `${d}-${t.h}-${t.m}`, day: label, time: t.str });
      }
    }
    return { slots: result, tzLabel: tzName };
  }, []);

  const [slot, setSlot] = React.useState(() => slots[0]?.id ?? '');

  const post = (payload) => {
    if (!SHEETS_ENDPOINT) return Promise.reject(new Error('SHEETS_ENDPOINT not configured — see sections.jsx'));
    return fetch(SHEETS_ENDPOINT, {
      method: 'POST',
      headers: { 'Content-Type': 'text/plain;charset=utf-8' },
      body: JSON.stringify({ ...payload, submittedAt: new Date().toISOString() }),
    });
  };

  const setField = (k, v) => setForm(f => ({ ...f, [k]: v }));

  const submitEnquiry = async (e) => {
    e.preventDefault();
    setFormStatus('submitting');
    try {
      await post({ type: 'enquiry', ...form });
      setFormStatus('success');
    } catch {
      setFormStatus('error');
    }
  };

  const submitBooking = async () => {
    const sel = slots.find(s => s.id === slot);
    setBookingStatus('submitting');
    try {
      await post({ type: 'booking', name: booking.name, email: booking.email, slotDay: sel?.day, slotTime: sel?.time });
      setBookingStatus('success');
    } catch {
      setBookingStatus('error');
    }
  };

  const bookingReady = booking.name.trim() && booking.email.trim() && slot;

  return (
    <section className="section" id="contact" data-screen-label="07 Contact">
      <div className="wrap">
        <div className="section-head">
          <div className="left">
            <div className="eyebrow"><span className="dot"></span>Arrange a Consultation</div>
            <h2>A considered conversation. <em>No</em> pitch deck.</h2>
          </div>
          <div className="right">
            Thirty minutes with a partner. We will ask how your desk operates today, where the friction sits, and whether automation is the appropriate response. Where it is not, we will say so plainly.
          </div>
        </div>

        <div className="contact-grid">
          {formStatus === 'success' ? (
            <div className="form-success">
              <div className="form-success-title">Enquiry received.</div>
              <p>A reply within one working day. We do not maintain a newsletter, nor any follow-up sequence.</p>
            </div>
          ) : (
            <form className="contact-form" onSubmit={submitEnquiry}>
              <div className="field">
                <label htmlFor="cf-name">Name</label>
                <input id="cf-name" placeholder="Full name" value={form.name} onChange={e => setField('name', e.target.value)} required />
              </div>
              <div className="field">
                <label htmlFor="cf-firm">Firm</label>
                <input id="cf-firm" placeholder="Firm name" value={form.firm} onChange={e => setField('firm', e.target.value)} />
              </div>
              <div className="field">
                <label htmlFor="cf-position">Position</label>
                <input id="cf-position" placeholder="Managing Partner, Director, Head of Operations" value={form.position} onChange={e => setField('position', e.target.value)} />
              </div>
              <div className="field">
                <label htmlFor="cf-email">Work email</label>
                <input id="cf-email" type="email" placeholder="name@firm.co.uk" value={form.email} onChange={e => setField('email', e.target.value)} required />
              </div>
              <div className="field">
                <label>Desk size</label>
                <div className="field-options">
                  {['1–5', '6–15', '16–40', '40+'].map(o => (
                    <span key={o} className={'chip' + (form.deskSize === o ? ' active' : '')} onClick={() => setField('deskSize', o)}>{o}</span>
                  ))}
                </div>
              </div>
              <div className="field">
                <label>Modules of<br />interest</label>
                <div className="field-options">
                  {['Kaspaflow Hub', 'Custom'].map(o => (
                    <span key={o} className={'chip' + (form.modules === o ? ' active' : '')} onClick={() => setField('modules', o)}>{o}</span>
                  ))}
                </div>
              </div>
              <div className="field">
                <label htmlFor="cf-notes">A line on<br />your operation</label>
                <textarea id="cf-notes" placeholder="A twelve-person legal contract desk on Bullhorn, losing approximately a day each week to CV administration…" value={form.notes} onChange={e => setField('notes', e.target.value)} />
              </div>
              <div className="form-submit">
                <span className="form-note">
                  {formStatus === 'error'
                    ? 'Something went wrong — please try again or email Dev@kaspaflow.co.uk directly.'
                    : 'A reply within one working day. We do not maintain a newsletter, nor any follow-up sequence — we observe the discipline we recommend.'}
                </span>
                <button className="btn btn-primary" type="submit" disabled={formStatus === 'submitting'}>
                  {formStatus === 'submitting' ? 'Sending…' : <><span>Submit enquiry</span> <Arrow /></>}
                </button>
              </div>
            </form>
          )}

          <aside className="booking">
            {bookingStatus === 'success' ? (
              <div className="booking-success">
                <div className="booking-success-title">Slot reserved.</div>
                <p>A calendar invitation will follow shortly. We look forward to the conversation.</p>
              </div>
            ) : (
              <>
                <div className="eyebrow" style={{ marginBottom: 16 }}><span className="dot"></span>Or reserve directly</div>
                <h4>Thirty minutes with a partner</h4>
                <p className="booking-desc">Select a time. A calendar invitation follows, accompanied by a single-page brief — so the conversation does not waste yours.</p>
                <div className="booking-times">
                  {slots.map(s => (
                    <div key={s.id} className={'slot' + (slot === s.id ? ' active' : '')} onClick={() => setSlot(s.id)}>
                      <span className="day">{s.day}</span>
                      {s.time}
                    </div>
                  ))}
                </div>
                <div className="booking-fields">
                  <div className="booking-field">
                    <label htmlFor="bk-name">Your name</label>
                    <input id="bk-name" placeholder="Full name" value={booking.name} onChange={e => setBooking(b => ({ ...b, name: e.target.value }))} />
                  </div>
                  <div className="booking-field">
                    <label htmlFor="bk-email">Work email</label>
                    <input id="bk-email" type="email" placeholder="name@firm.co.uk" value={booking.email} onChange={e => setBooking(b => ({ ...b, email: e.target.value }))} />
                  </div>
                </div>
                {bookingStatus === 'error' && (
                  <p className="form-error">Something went wrong — please email Dev@kaspaflow.co.uk directly.</p>
                )}
                <button
                  className="btn btn-primary"
                  style={{ width: '100%', justifyContent: 'center', marginTop: 16 }}
                  type="button"
                  onClick={submitBooking}
                  disabled={bookingStatus === 'submitting' || !bookingReady}
                >
                  {bookingStatus === 'submitting' ? 'Confirming…' : <><span>Confirm slot</span> <Arrow /></>}
                </button>
                <div style={{ marginTop: 16, fontSize: 12.5, color: 'var(--ink-3)' }}>
                  All times {tzLabel}. London-based. Conducted on whichever video platform your firm already operates with.
                </div>
              </>
            )}
          </aside>
        </div>
      </div>
    </section>
  );
};

const Footer = () => (
  <footer className="footer">
    <div className="wrap">
      <div className="footer-grid">
        <div>
          <a className="brand" onClick={() => jump('top')} style={{ cursor: 'pointer' }}><BrandMark /><span><b>Kaspa</b><i>flow</i></span></a>
          <p className="footer-tag">A connected operating system for recruitment firms. Built in London, in service of the consultants who would rather be on the telephone.</p>
        </div>
        <div>
          <h5>Firm</h5>
          <ul>
            <li><a onClick={() => jump('architecture')} style={{ cursor: 'pointer' }}>Architecture</a></li>
            <li><a onClick={() => jump('cases')} style={{ cursor: 'pointer' }}>Outcomes</a></li>
            <li><a onClick={() => jump('pricing')} style={{ cursor: 'pointer' }}>Engagements</a></li>
            <li><a onClick={() => jump('modules')} style={{ cursor: 'pointer' }}>Modules</a></li>
          </ul>
        </div>
        <div>
          <h5>Contact</h5>
          <ul>
            <li><a href="mailto:Dev@kaspaflow.co.uk">Dev@kaspaflow.co.uk</a></li>
          </ul>
        </div>
      </div>
      <div className="footer-bottom">
        <span>© 2026 Kaspaflow Ltd. Registered in England &amp; Wales · 14829112.</span>
        <span>Privacy · Terms · Information Security</span>
      </div>
    </div>
  </footer>
);

window.Nav = Nav;
window.Hero = Hero;
window.Architecture = Architecture;
window.Trust = Trust;
window.ModulesSection = ModulesSection;
window.HubBand = HubBand;
window.Cases = Methodology;
window.Pricing = Pricing;
window.Contact = Contact;
window.Footer = Footer;
