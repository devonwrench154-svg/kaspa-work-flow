const Footer = () => {
  const year = new Date().getFullYear();
  return (
    <footer className="border-t border-border py-12">
      <div className="container-tight flex flex-col items-start justify-between gap-6 md:flex-row md:items-center">
        <div className="flex items-center gap-3">
          <span className="inline-block h-2.5 w-2.5 rounded-full bg-primary" aria-hidden />
          <p className="text-sm text-muted-foreground">
            <span className="font-semibold text-foreground">KaspaFlow Ltd.</span>{" "}
            Built in the UK.
          </p>
        </div>

        <nav className="flex items-center gap-8 text-sm text-muted-foreground" aria-label="Footer">
          <a href="/privacy" className="transition-colors hover:text-foreground">Privacy Policy</a>
          <a href="/terms" className="transition-colors hover:text-foreground">Terms of Service</a>
          <a href="mailto:hello@kaspaflow.com" className="transition-colors hover:text-foreground">
            Contact
          </a>
        </nav>

        <p className="text-xs text-muted-foreground">© {year} KaspaFlow. All rights reserved.</p>
      </div>
    </footer>
  );
};

export default Footer;
