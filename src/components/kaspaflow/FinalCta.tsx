import { Button } from "@/components/ui/button";
import { CAL_URL } from "@/lib/kaspaflow";

const FinalCta = () => {
  return (
    <section className="section-y border-t border-border" aria-labelledby="cta-heading">
      <div className="container-tight">
        <div className="reveal mx-auto max-w-3xl rounded-2xl border border-border bg-surface/40 p-10 text-center md:p-16">
          <h2 id="cta-heading" className="font-serif-display text-4xl leading-tight md:text-5xl">
            Ready to get your consultants' time back?
          </h2>
          <p className="mx-auto mt-5 max-w-xl text-base text-muted-foreground">
            20-minute demo. We'll show you a live system built for an agency like yours.
          </p>
          <div className="mt-10">
            <Button asChild size="lg" variant="primary">
              <a href={CAL_URL} target="_blank" rel="noreferrer">Book a demo</a>
            </Button>
          </div>
        </div>
      </div>
    </section>
  );
};

export default FinalCta;
