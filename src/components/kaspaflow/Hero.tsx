import { Button } from "@/components/ui/button";
import { CAL_URL } from "@/lib/kaspaflow";

const Hero = () => {
  return (
    <section id="top" className="relative pt-36 md:pt-44">
      <div className="container-tight">
        <div className="mx-auto max-w-3xl text-center">
          <p className="reveal mb-6 inline-flex items-center gap-2 rounded-full border border-border bg-surface/60 px-3 py-1 text-xs text-muted-foreground">
            <span className="h-1.5 w-1.5 rounded-full bg-primary" aria-hidden />
            UK recruitment AI consultancy
          </p>
          <h1 className="reveal font-serif-display text-balance text-5xl leading-[1.05] tracking-tight md:text-7xl">
            AI systems that give recruitment consultants{" "}
            <span className="text-primary">15+ hours</span> back every week
          </h1>
          <p className="reveal mx-auto mt-7 max-w-2xl text-balance text-base text-muted-foreground md:text-lg">
            KaspaFlow builds custom automation for UK recruitment agencies — candidate sourcing,
            CV screening, and personalised outreach that runs while your team sleeps.
          </p>

          <div className="reveal mt-10 flex flex-col items-center justify-center gap-4 sm:flex-row">
            <Button asChild size="lg" variant="primary">
              <a href={CAL_URL} target="_blank" rel="noreferrer">Book a 20-min demo</a>
            </Button>
            <a
              href="#how"
              className="text-sm text-muted-foreground transition-colors hover:text-foreground"
            >
              See how it works ↓
            </a>
          </div>

          <p className="reveal mt-10 text-xs text-muted-foreground">
            Built for UK recruitment firms using Bullhorn, Vincere, JobAdder, and custom ATS setups
          </p>
        </div>
      </div>

      <div className="container-tight mt-24">
        <div className="hairline" />
      </div>
    </section>
  );
};

export default Hero;
