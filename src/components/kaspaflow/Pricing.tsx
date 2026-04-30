import { Check } from "lucide-react";
import { Button } from "@/components/ui/button";
import { CAL_URL } from "@/lib/kaspaflow";

const tiers = [
  {
    name: "Launch",
    popular: true,
    setup: "£1,500",
    monthly: "£750",
    features: [
      "One flagship system",
      "Full integration with your ATS",
      "Monthly iteration",
      "Email support",
    ],
  },
  {
    name: "Scale",
    popular: false,
    setup: "£3,500",
    monthly: "£1,500",
    features: [
      "Both flagship systems + one custom build",
      "Priority support",
      "Quarterly workflow reviews",
      "Email & Slack support",
    ],
  },
];

const Pricing = () => {
  return (
    <section id="pricing" className="section-y border-t border-border" aria-labelledby="pricing-heading">
      <div className="container-tight">
        <div className="reveal max-w-2xl">
          <p className="text-xs uppercase tracking-[0.18em] text-muted-foreground">Pricing</p>
          <h2 id="pricing-heading" className="mt-4 font-serif-display text-4xl leading-tight md:text-5xl">
            Transparent pricing. No retainers that go nowhere.
          </h2>
        </div>

        <div className="mt-16 grid gap-6 md:grid-cols-2">
          {tiers.map((t) => (
            <div
              key={t.name}
              className={`reveal relative flex flex-col rounded-xl border bg-surface/40 p-8 md:p-10 ${
                t.popular ? "border-primary/60" : "border-border"
              }`}
            >
              {t.popular && (
                <span className="absolute -top-3 left-8 rounded-full border border-primary/60 bg-background px-3 py-1 text-[10px] font-medium uppercase tracking-[0.18em] text-primary">
                  Most popular
                </span>
              )}

              <h3 className="text-xl font-semibold tracking-tight">{t.name}</h3>

              <div className="mt-6 space-y-1">
                <div className="flex items-baseline gap-2">
                  <span className="text-4xl font-semibold tracking-tight">{t.setup}</span>
                  <span className="text-sm text-muted-foreground">one-time setup</span>
                </div>
                <div className="flex items-baseline gap-2">
                  <span className="text-2xl font-semibold tracking-tight text-foreground/90">
                    {t.monthly}
                  </span>
                  <span className="text-sm text-muted-foreground">/month retainer</span>
                </div>
              </div>

              <ul className="mt-8 space-y-3">
                {t.features.map((f) => (
                  <li key={f} className="flex items-start gap-3 text-sm text-foreground/90">
                    <Check className="mt-0.5 h-4 w-4 flex-none text-primary" strokeWidth={2} aria-hidden />
                    <span>{f}</span>
                  </li>
                ))}
              </ul>

              <div className="mt-10">
                <Button
                  asChild
                  variant={t.popular ? "primary" : "outline"}
                  size="lg"
                  className="w-full"
                >
                  <a href={CAL_URL} target="_blank" rel="noreferrer">Book a demo</a>
                </Button>
              </div>
            </div>
          ))}
        </div>

        <p className="reveal mt-8 text-center text-xs text-muted-foreground">
          Launch pricing available for first 3 UK agency clients. Prices rise after.
        </p>
      </div>
    </section>
  );
};

export default Pricing;
