const steps = [
  { n: "01", title: "Discovery call", body: "20 minutes. We learn your workflow." },
  { n: "02", title: "Scope & map", body: "We spec the exact system, stack, and integration points." },
  { n: "03", title: "Build & deploy", body: "10–14 days from signed proposal to live system." },
  { n: "04", title: "Monitor & iterate", body: "Monthly retainer includes uptime monitoring and one new workflow per month." },
];

const HowItWorks = () => {
  return (
    <section id="how" className="section-y border-t border-border" aria-labelledby="how-heading">
      <div className="container-tight">
        <div className="reveal max-w-2xl">
          <p className="text-xs uppercase tracking-[0.18em] text-muted-foreground">Process</p>
          <h2 id="how-heading" className="mt-4 font-serif-display text-4xl leading-tight md:text-5xl">
            How it works
          </h2>
        </div>

        <ol className="mt-16 grid gap-px overflow-hidden rounded-xl border border-border bg-border md:grid-cols-4">
          {steps.map((s) => (
            <li key={s.n} className="reveal bg-background p-8">
              <span className="text-xs font-medium tracking-[0.2em] text-primary">{s.n}</span>
              <h3 className="mt-5 text-base font-semibold tracking-tight">{s.title}</h3>
              <p className="mt-2 text-sm leading-relaxed text-muted-foreground">{s.body}</p>
            </li>
          ))}
        </ol>
      </div>
    </section>
  );
};

export default HowItWorks;
