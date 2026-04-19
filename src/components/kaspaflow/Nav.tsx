import { useEffect, useState } from "react";
import { Button } from "@/components/ui/button";
import { CAL_URL } from "@/lib/kaspaflow";
import icon from "@/assets/kaspaflow-icon.svg";

const links = [
  { href: "#how", label: "How It Works" },
  { href: "#pricing", label: "Pricing" },
  { href: "#faq", label: "FAQ" },
];

const Nav = () => {
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 8);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  return (
    <header
      className={`fixed inset-x-0 top-0 z-50 transition-colors duration-300 ${
        scrolled
          ? "border-b border-border bg-background/80 backdrop-blur-md"
          : "border-b border-transparent"
      }`}
    >
      <nav className="container-tight flex h-16 items-center justify-between" aria-label="Primary">
        <a
          href="#top"
          aria-label="KaspaFlow — home"
          className="flex items-center"
          style={{ gap: "10px" }}
        >
          <img
            src={icon}
            alt=""
            aria-hidden="true"
            className="h-8 w-8"
            loading="eager"
            decoding="async"
          />
          <span className="text-lg font-medium text-white">KaspaFlow</span>
        </a>

        <div className="hidden items-center gap-8 md:flex">
          {links.map((l) => (
            <a
              key={l.href}
              href={l.href}
              className="text-sm text-muted-foreground transition-colors hover:text-foreground"
            >
              {l.label}
            </a>
          ))}
          <Button asChild size="sm" variant="primary">
            <a href={CAL_URL} target="_blank" rel="noreferrer">Book a Demo</a>
          </Button>
        </div>

        <div className="md:hidden">
          <Button asChild size="sm" variant="primary">
            <a href={CAL_URL} target="_blank" rel="noreferrer">Book a Demo</a>
          </Button>
        </div>
      </nav>
    </header>
  );
};

export default Nav;
