import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";

const faqs = [
  {
    q: "Do you work with agencies under 10 consultants?",
    a: "Yes, if you're placing consistently and have a clear workflow. The smallest agency we'd onboard does around £30k/month in revenue.",
  },
  {
    q: "What ATS do you integrate with?",
    a: "Bullhorn, Vincere, JobAdder, Loxo, Recruit CRM, and custom setups. If it has an API, we integrate.",
  },
  {
    q: "Is our candidate data secure?",
    a: "Yes. Systems are deployed on UK/EU infrastructure by default. GDPR-compliant. We can deploy on your own cloud if required.",
  },
  {
    q: "How is this different from built-in ATS automation?",
    a: 'ATS automations are rules-based ("if X then Y"). Our systems use LLMs to handle unstructured work — reading CVs, writing personalised outreach, making judgement calls — which rules-based automation can\'t do.',
  },
  {
    q: "What happens if something breaks?",
    a: "Every system has error monitoring and alerts. We fix breakages under the monthly retainer, no extra cost.",
  },
  {
    q: "Can we cancel?",
    a: "Monthly retainer, 30 days notice. No long contracts.",
  },
];

const Faq = () => {
  return (
    <section id="faq" className="section-y border-t border-border" aria-labelledby="faq-heading">
      <div className="container-tight">
        <div className="grid gap-12 md:grid-cols-12">
          <div className="reveal md:col-span-4">
            <p className="text-xs uppercase tracking-[0.18em] text-muted-foreground">FAQ</p>
            <h2 id="faq-heading" className="mt-4 font-serif-display text-4xl leading-tight md:text-5xl">
              Questions, answered.
            </h2>
          </div>

          <div className="reveal md:col-span-8">
            <Accordion type="single" collapsible className="w-full">
              {faqs.map((f, i) => (
                <AccordionItem key={f.q} value={`item-${i}`} className="border-border">
                  <AccordionTrigger className="text-left text-base font-medium hover:no-underline">
                    {f.q}
                  </AccordionTrigger>
                  <AccordionContent className="text-sm leading-relaxed text-muted-foreground">
                    {f.a}
                  </AccordionContent>
                </AccordionItem>
              ))}
            </Accordion>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Faq;
