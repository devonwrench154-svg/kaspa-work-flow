import { FileSearch, MessageSquare, PenLine } from "lucide-react";

const items = [
  {
    icon: FileSearch,
    title: "Screening 200+ CVs per role",
    body: "Your best consultants spend 3 hours per role on work an AI can do in 90 seconds.",
  },
  {
    icon: MessageSquare,
    title: "Chasing candidates manually",
    body: "Availability confirmations, interview reminders, feedback loops — all eating billable time.",
  },
  {
    icon: PenLine,
    title: "Writing outreach one-by-one",
    body: "Personalised messages to passive candidates are where placements come from, and nobody has time to write them.",
  },
];

const Problem = () => {
  return (
    <section className="section-y" aria-labelledby="problem-heading">
      <div className="container-tight">
        <div className="reveal mx-auto max-w-2xl text-center">
          <p className="text-xs uppercase tracking-[0.18em] text-muted-foreground">The problem</p>
          <h2 id="problem-heading" className="mt-4 font-serif-display text-4xl leading-tight md:text-5xl">
            The work your consultants shouldn't be doing
          </h2>
        </div>

        <div className="mt-16 grid gap-px overflow-hidden rounded-xl border border-border bg-border md:grid-cols-3">
          {items.map(({ icon: Icon, title, body }) => (
            <div key={title} className="reveal bg-background p-8 md:p-10">
              <Icon className="h-5 w-5 text-primary" strokeWidth={1.5} aria-hidden />
              <h3 className="mt-6 text-base font-semibold tracking-tight">{title}</h3>
              <p className="mt-3 text-sm leading-relaxed text-muted-foreground">{body}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Problem;
