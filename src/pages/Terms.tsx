import { useEffect } from "react";

const Terms = () => {
  useEffect(() => {
    document.title = "Terms of Service — KaspaFlow";
  }, []);

  return (
    <main className="min-h-screen bg-background text-foreground">
      <article className="mx-auto max-w-[800px] py-16 px-6 space-y-6 leading-relaxed">
        <header className="space-y-2">
          <h1 className="text-4xl font-bold tracking-tight">Terms of Service</h1>
          <p className="text-sm opacity-80">
            <strong>Last updated: 21 April 2026</strong>
          </p>
        </header>

        <p>
          These Terms of Service ("Terms") govern your use of the website
          kaspaflow.co.uk and the services provided by KaspaFlow ("we", "us",
          "our"). By using our services, you agree to these Terms.
        </p>

        <section className="space-y-3">
          <h2 className="text-2xl font-semibold mt-8">1. Services</h2>
          <p>
            KaspaFlow provides AI-powered automation services for UK
            recruitment agencies, including but not limited to CV screening,
            candidate sourcing, and personalised outreach workflows
            ("Services"). The specific scope, deliverables, and timelines for
            each client engagement are defined in a separate Statement of Work
            or service agreement.
          </p>
        </section>

        <section className="space-y-3">
          <h2 className="text-2xl font-semibold mt-8">2. Fees and Payment</h2>
          <p>
            Fees for Services are set out in the applicable Statement of Work
            or quote. Unless otherwise agreed, setup fees are payable in
            advance, and monthly retainer fees are invoiced at the start of
            each calendar month. All fees are exclusive of VAT where
            applicable. Late payments may incur interest at 4% above the Bank
            of England base rate.
          </p>
        </section>

        <section className="space-y-3">
          <h2 className="text-2xl font-semibold mt-8">3. Client Responsibilities</h2>
          <p>You agree to:</p>
          <ul className="list-disc pl-6 space-y-2">
            <li>
              Provide accurate information and necessary access to third-party
              tools, accounts, and data required to deliver the Services.
            </li>
            <li>
              Ensure you have the legal right to share any data (including
              candidate or client data) with us.
            </li>
            <li>
              Comply with all applicable laws, including UK GDPR and
              employment law, when using the outputs of our Services.
            </li>
            <li>
              Review and approve AI-generated content (such as outreach
              messages) before sending, where a human-in-the-loop review step
              is part of the workflow.
            </li>
          </ul>
        </section>

        <section className="space-y-3">
          <h2 className="text-2xl font-semibold mt-8">4. Intellectual Property</h2>
          <p>
            You retain ownership of all data you provide to us. We retain
            ownership of our underlying automation frameworks, templates, and
            tooling. Upon full payment, you receive a perpetual, non-exclusive
            licence to use the workflows and deliverables we build for you
            within your own business.
          </p>
        </section>

        <section className="space-y-3">
          <h2 className="text-2xl font-semibold mt-8">5. Confidentiality</h2>
          <p>
            Both parties agree to keep confidential any non-public information
            shared during the engagement, and to use it only for the purpose
            of delivering or receiving the Services. This obligation survives
            termination of these Terms.
          </p>
        </section>

        <section className="space-y-3">
          <h2 className="text-2xl font-semibold mt-8">6. Data Protection</h2>
          <p>
            We process personal data in accordance with our Privacy Policy
            and, where applicable, a Data Processing Agreement signed between
            us. You are responsible for ensuring you have a lawful basis to
            provide personal data to us.
          </p>
        </section>

        <section className="space-y-3">
          <h2 className="text-2xl font-semibold mt-8">
            7. Service Limitations and AI Outputs
          </h2>
          <p>
            AI-generated outputs (including CV scores, candidate rankings, and
            drafted messages) are intended to support, not replace, human
            judgement. You are responsible for reviewing all outputs before
            acting on them. We do not guarantee that AI outputs are free from
            errors, bias, or omissions. We make no warranty that the Services
            will produce any specific business outcome, including hires,
            placements, or revenue.
          </p>
        </section>

        <section className="space-y-3">
          <h2 className="text-2xl font-semibold mt-8">8. Limitation of Liability</h2>
          <p>
            To the fullest extent permitted by law, our total liability to you
            for any claim arising out of or relating to these Terms or the
            Services is limited to the fees paid by you to us in the three
            months preceding the event giving rise to the claim. We are not
            liable for any indirect, consequential, or loss-of-profits
            damages. Nothing in these Terms limits liability for death,
            personal injury caused by negligence, or fraud.
          </p>
        </section>

        <section className="space-y-3">
          <h2 className="text-2xl font-semibold mt-8">9. Termination</h2>
          <p>
            Either party may terminate a monthly retainer with 30 days'
            written notice. We may suspend or terminate Services immediately
            if you fail to pay invoices when due, breach these Terms
            materially, or use the Services in a manner that is unlawful or
            harmful to third parties. Setup fees are non-refundable once work
            has commenced.
          </p>
        </section>

        <section className="space-y-3">
          <h2 className="text-2xl font-semibold mt-8">10. Governing Law</h2>
          <p>
            These Terms are governed by the laws of England and Wales. Any
            disputes will be subject to the exclusive jurisdiction of the
            courts of England and Wales.
          </p>
        </section>

        <section className="space-y-3">
          <h2 className="text-2xl font-semibold mt-8">11. Changes to These Terms</h2>
          <p>
            We may update these Terms from time to time. The "Last updated"
            date at the top reflects the most recent version. Continued use of
            our Services after changes are posted constitutes acceptance of
            the revised Terms.
          </p>
        </section>

        <section className="space-y-3">
          <h2 className="text-2xl font-semibold mt-8">12. Contact</h2>
          <p>
            Questions about these Terms? Contact us at{" "}
            <a
              href="mailto:devkaspaflow@gmail.com"
              className="underline hover:opacity-80"
            >
              devkaspaflow@gmail.com
            </a>
            .
          </p>
        </section>
      </article>
    </main>
  );
};

export default Terms;
