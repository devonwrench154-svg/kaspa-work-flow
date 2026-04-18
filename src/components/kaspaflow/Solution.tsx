import { Play } from "lucide-react";

const cards = [
  {
    eyebrow: "System 01",
    title: "Smart CV Screener",
    sub: "Screen 50 CVs in 90 seconds.",
    body: "Drop a job description and a pile of CVs. Our system parses each CV, scores candidates against your criteria, and delivers a ranked shortlist to your inbox — pushed directly into your ATS.",
  },
  {
    eyebrow: "System 02",
    title: "Passive Candidate Outreach Engine",
    sub: "Personalised outreach to 30 candidates in 10 minutes.",
    body: "Give us a role brief. We surface matching passive candidates and draft personalised outreach for each — referencing their current role, background, and why the opportunity fits. Your consultants review and send.",
  },
];

const Solution = () => {
  return (
    <section className="section-y border-t border-border" aria-labelledby="solution-heading">
      <div className="container-tight">
        <div className="reveal max-w-2xl">
          <p className="text-xs uppercase tracking-[0.18em] text-muted-foreground">What we build</p>
          <h2 id="solution-heading" className="mt-4 font-serif-display text-4xl leading-tight md:text-5xl">
            Two flagship systems. Built around your workflow.
          </h2>
        </div>

        <div className="mt-16 grid gap-6 md:grid-cols-2">
          {cards.map((c) => (
            <article
              key={c.title}
              className="reveal group flex flex-col rounded-xl border border-border bg-surface/40 p-8 md:p-10"
            >
              <p className="text-xs uppercase tracking-[0.18em] text-muted-foreground">{c.eyebrow}</p>
              <h3 className="mt-3 text-2xl font-semibold tracking-tight md:text-3xl">{c.title}</h3>
              <p className="mt-2 text-primary">{c.sub}</p>
              <p className="mt-5 text-sm leading-relaxed text-muted-foreground">{c.body}</p>

              {/* Loom video placeholder */}
              <div className="mt-8 aspect-video overflow-hidden rounded-lg border border-border bg-background">
                <div className="flex h-full w-full items-center justify-center">
                  <div className="flex flex-col items-center gap-3 text-muted-foreground">
                    <span className="flex h-12 w-12 items-center justify-center rounded-full border border-border-strong">
                      <Play className="h-4 w-4 fill-current" aria-hidden />
                    </span>
                    <span className="text-xs uppercase tracking-[0.18em]">Loom walkthrough</span>
                  </div>
                </div>
              </div>
            </article>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Solution;
