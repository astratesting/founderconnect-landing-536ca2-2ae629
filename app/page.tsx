"use client";

import { useEffect, useRef, useState } from "react";

/* ─── Icons (inline SVG — no extra deps) ─── */
function IconBrain() {
  return (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={1.5} strokeLinecap="round" strokeLinejoin="round" className="w-6 h-6">
      <path d="M9.5 2A2.5 2.5 0 0 1 12 4.5v15a2.5 2.5 0 0 1-4.96-.44 2.5 2.5 0 0 1-2.96-3.08 3 3 0 0 1-.34-5.58 2.5 2.5 0 0 1 1.32-4.24 2.5 2.5 0 0 1 4.44-1.66Z" />
      <path d="M14.5 2A2.5 2.5 0 0 0 12 4.5v15a2.5 2.5 0 0 0 4.96-.44 2.5 2.5 0 0 0 2.96-3.08 3 3 0 0 0 .34-5.58 2.5 2.5 0 0 0-1.32-4.24 2.5 2.5 0 0 0-4.44-1.66Z" />
    </svg>
  );
}

function IconShield() {
  return (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={1.5} strokeLinecap="round" strokeLinejoin="round" className="w-6 h-6">
      <path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z" />
      <path d="m9 12 2 2 4-4" />
    </svg>
  );
}

function IconMessage() {
  return (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={1.5} strokeLinecap="round" strokeLinejoin="round" className="w-6 h-6">
      <path d="M21 15a2 2 0 0 1-2 2H7l-4 4V5a2 2 0 0 1 2-2h14a2 2 0 0 1 2 2z" />
      <path d="M8 10h8M8 14h5" />
    </svg>
  );
}

function IconArrowRight() {
  return (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={2} strokeLinecap="round" strokeLinejoin="round" className="w-4 h-4">
      <path d="M5 12h14M12 5l7 7-7 7" />
    </svg>
  );
}

function IconCheck() {
  return (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={2.5} strokeLinecap="round" strokeLinejoin="round" className="w-4 h-4">
      <path d="M20 6 9 17l-5-5" />
    </svg>
  );
}

function IconStar() {
  return (
    <svg viewBox="0 0 24 24" fill="currentColor" className="w-4 h-4">
      <polygon points="12 2 15.09 8.26 22 9.27 17 14.14 18.18 21.02 12 17.77 5.82 21.02 7 14.14 2 9.27 8.91 8.26 12 2" />
    </svg>
  );
}

/* ─── Scroll-reveal hook ─── */
function useReveal() {
  const ref = useRef<HTMLDivElement>(null);
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setVisible(true);
          observer.disconnect();
        }
      },
      { threshold: 0.15 }
    );
    observer.observe(el);
    return () => observer.disconnect();
  }, []);

  return { ref, visible };
}

/* ─── Nav ─── */
function Nav() {
  const [scrolled, setScrolled] = useState(false);
  const [mobileOpen, setMobileOpen] = useState(false);

  useEffect(() => {
    const handler = () => setScrolled(window.scrollY > 20);
    window.addEventListener("scroll", handler);
    return () => window.removeEventListener("scroll", handler);
  }, []);

  return (
    <nav
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
        scrolled ? "nav-glass border-b border-gray-100 shadow-sm" : "bg-transparent"
      }`}
    >
      <div className="max-w-7xl mx-auto px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">
          {/* Logo */}
          <a href="#" className="flex items-center gap-2.5 group">
            <div className="w-8 h-8 rounded-lg bg-brand-600 flex items-center justify-center shadow-md group-hover:bg-brand-700 transition-colors">
              <svg viewBox="0 0 24 24" fill="white" className="w-4 h-4">
                <path d="M17 21v-2a4 4 0 0 0-4-4H5a4 4 0 0 0-4 4v2" />
                <circle cx="9" cy="7" r="4" />
                <path d="M23 21v-2a4 4 0 0 0-3-3.87M16 3.13a4 4 0 0 1 0 7.75" />
              </svg>
            </div>
            <span className="font-display font-700 text-lg text-ink tracking-tight">
              Founder<span className="text-brand-600">Connect</span>
            </span>
          </a>

          {/* Desktop links */}
          <div className="hidden md:flex items-center gap-8">
            {["Features", "How It Works", "Pricing"].map((link) => (
              <a
                key={link}
                href={`#${link.toLowerCase().replace(/\s+/g, "-")}`}
                className="text-sm font-medium text-muted hover:text-ink transition-colors duration-200"
              >
                {link}
              </a>
            ))}
          </div>

          {/* CTA */}
          <div className="hidden md:flex items-center gap-3">
            <a href="#" className="text-sm font-medium text-muted hover:text-ink transition-colors">
              Log In
            </a>
            <a
              href="#signup"
              className="btn-primary inline-flex items-center gap-2 px-4 py-2 rounded-lg text-sm font-semibold text-white shadow-md"
            >
              <span>Sign Up Free</span>
            </a>
          </div>

          {/* Mobile menu btn */}
          <button
            className="md:hidden p-2 rounded-md text-muted hover:text-ink"
            onClick={() => setMobileOpen(!mobileOpen)}
            aria-label="Toggle menu"
          >
            <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={2} className="w-5 h-5">
              {mobileOpen ? (
                <path strokeLinecap="round" d="M6 18L18 6M6 6l12 12" />
              ) : (
                <path strokeLinecap="round" d="M4 6h16M4 12h16M4 18h16" />
              )}
            </svg>
          </button>
        </div>

        {/* Mobile menu */}
        {mobileOpen && (
          <div className="md:hidden pb-4 border-t border-gray-100 mt-2 pt-4 space-y-3">
            {["Features", "How It Works", "Pricing"].map((link) => (
              <a
                key={link}
                href={`#${link.toLowerCase().replace(/\s+/g, "-")}`}
                className="block text-sm font-medium text-muted hover:text-ink transition-colors"
                onClick={() => setMobileOpen(false)}
              >
                {link}
              </a>
            ))}
            <a
              href="#signup"
              className="btn-primary inline-flex items-center gap-2 px-4 py-2 rounded-lg text-sm font-semibold text-white mt-2"
            >
              <span>Sign Up Free</span>
            </a>
          </div>
        )}
      </div>
    </nav>
  );
}

/* ─── Hero ─── */
function Hero() {
  return (
    <section className="relative min-h-screen flex items-center overflow-hidden hero-grid pt-16">
      {/* Background blobs */}
      <div className="absolute -top-32 -right-32 w-[600px] h-[600px] blob bg-brand-100 opacity-50" />
      <div className="absolute -bottom-48 -left-24 w-[400px] h-[400px] blob bg-brand-50 opacity-70" />

      {/* Geometric accent lines */}
      <div className="absolute top-1/4 right-16 w-px h-48 bg-gradient-to-b from-transparent via-brand-300 to-transparent opacity-40" />
      <div className="absolute top-1/3 right-24 w-px h-32 bg-gradient-to-b from-transparent via-brand-200 to-transparent opacity-30" />

      <div className="relative max-w-7xl mx-auto px-6 lg:px-8 py-24 grid lg:grid-cols-2 gap-16 items-center">
        {/* Left: Copy */}
        <div>
          {/* Badge */}
          <div
            className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-brand-50 border border-brand-100 text-brand-700 text-xs font-semibold tracking-wide uppercase mb-8 opacity-0-init animate-fade-in"
            style={{ animationDelay: "0ms", animationFillMode: "forwards" }}
          >
            <span className="w-1.5 h-1.5 rounded-full bg-brand-600 animate-pulse" />
            AI-Powered Matching Platform
          </div>

          <h1
            className="font-display text-5xl lg:text-6xl xl:text-7xl font-700 text-ink leading-[1.08] tracking-tight mb-6 opacity-0-init animate-fade-up"
            style={{ animationDelay: "120ms", animationFillMode: "forwards" }}
          >
            Streamline Your{" "}
            <span className="relative">
              <span className="stat-shimmer">Co-Founder</span>
              <svg
                className="absolute -bottom-2 left-0 w-full"
                viewBox="0 0 300 12"
                fill="none"
                preserveAspectRatio="none"
              >
                <path
                  d="M2 8 Q75 2 150 6 Q225 10 298 4"
                  stroke="#2563eb"
                  strokeWidth="2.5"
                  strokeLinecap="round"
                  opacity="0.4"
                />
              </svg>
            </span>
            {" "}Search with AI-Powered Precision
          </h1>

          <p
            className="text-lg text-muted leading-relaxed max-w-xl mb-10 opacity-0-init animate-fade-up"
            style={{ animationDelay: "240ms", animationFillMode: "forwards" }}
          >
            FounderConnect uses advanced AI matching to connect you with verified, compatible co-founders —
            so you can build faster and smarter. Stop wasting months on cold outreach and misaligned partnerships.
          </p>

          {/* CTAs */}
          <div
            className="flex flex-wrap gap-4 mb-12 opacity-0-init animate-fade-up"
            style={{ animationDelay: "360ms", animationFillMode: "forwards" }}
          >
            <a
              href="#signup"
              className="btn-primary inline-flex items-center gap-2.5 px-6 py-3.5 rounded-xl text-base font-semibold text-white shadow-lg"
            >
              <span>Get Started Free</span>
              <IconArrowRight />
            </a>
            <a
              href="#how-it-works"
              className="btn-ghost inline-flex items-center gap-2.5 px-6 py-3.5 rounded-xl text-base font-semibold text-ink border border-gray-200"
            >
              <span>See How It Works</span>
            </a>
          </div>

          {/* Trust signals */}
          <div
            className="flex flex-wrap items-center gap-6 opacity-0-init animate-fade-up"
            style={{ animationDelay: "480ms", animationFillMode: "forwards" }}
          >
            {[
              "No credit card required",
              "Setup in 5 minutes",
              "10,000+ founders matched",
            ].map((item) => (
              <div key={item} className="flex items-center gap-2 text-sm text-muted">
                <span className="w-5 h-5 rounded-full bg-brand-50 border border-brand-200 flex items-center justify-center text-brand-600">
                  <IconCheck />
                </span>
                {item}
              </div>
            ))}
          </div>
        </div>

        {/* Right: Visual card */}
        <div
          className="hidden lg:block relative opacity-0-init animate-fade-in"
          style={{ animationDelay: "300ms", animationFillMode: "forwards" }}
        >
          <div className="relative animate-float">
            {/* Main card */}
            <div className="bg-white rounded-2xl shadow-2xl border border-gray-100 p-6 relative z-10">
              <div className="flex items-center justify-between mb-5">
                <span className="text-sm font-semibold text-ink">Your Matches Today</span>
                <span className="text-xs font-medium text-brand-600 bg-brand-50 px-2 py-1 rounded-full">
                  3 new
                </span>
              </div>

              {/* Match cards */}
              {[
                { name: "Sarah K.", role: "CTO · Full-Stack", match: 97, skills: ["React", "ML", "AWS"] },
                { name: "Marcus L.", role: "CMO · Growth", match: 94, skills: ["GTM", "Paid Ads", "Brand"] },
                { name: "Priya M.", role: "CPO · Product", match: 91, skills: ["B2B SaaS", "Agile", "UX"] },
              ].map((person, i) => (
                <div
                  key={person.name}
                  className={`flex items-center gap-4 p-3 rounded-xl hover:bg-gray-50 transition-colors cursor-pointer ${
                    i !== 2 ? "mb-2" : ""
                  }`}
                >
                  <div className="w-10 h-10 rounded-full bg-gradient-to-br from-brand-400 to-brand-700 flex items-center justify-center text-white text-sm font-bold flex-shrink-0">
                    {person.name[0]}
                  </div>
                  <div className="flex-1 min-w-0">
                    <div className="flex items-center justify-between">
                      <span className="text-sm font-semibold text-ink">{person.name}</span>
                      <span className="text-xs font-bold text-brand-600">{person.match}%</span>
                    </div>
                    <span className="text-xs text-muted">{person.role}</span>
                    <div className="flex gap-1 mt-1">
                      {person.skills.map((s) => (
                        <span key={s} className="text-[10px] font-medium px-1.5 py-0.5 bg-brand-50 text-brand-700 rounded">
                          {s}
                        </span>
                      ))}
                    </div>
                  </div>
                </div>
              ))}

              {/* Bottom */}
              <div className="mt-4 pt-4 border-t border-gray-100 flex items-center justify-between">
                <div className="flex -space-x-2">
                  {["#2563eb", "#1d4ed8", "#1e40af", "#3b82f6"].map((color, i) => (
                    <div
                      key={i}
                      className="w-7 h-7 rounded-full border-2 border-white flex items-center justify-center text-white text-[10px] font-bold"
                      style={{ background: color }}
                    >
                      {String.fromCharCode(65 + i)}
                    </div>
                  ))}
                </div>
                <span className="text-xs text-muted">+2,840 founders waiting</span>
              </div>
            </div>

            {/* Floating stat pill */}
            <div className="absolute -top-4 -right-4 bg-white rounded-xl shadow-lg border border-gray-100 px-4 py-2.5 flex items-center gap-2.5 z-20">
              <div className="w-8 h-8 rounded-lg bg-green-50 flex items-center justify-center">
                <svg viewBox="0 0 24 24" fill="none" stroke="#16a34a" strokeWidth={2} className="w-4 h-4">
                  <polyline points="22 7 13.5 15.5 8.5 10.5 2 17" />
                  <polyline points="16 7 22 7 22 13" />
                </svg>
              </div>
              <div>
                <div className="text-xs font-bold text-ink">97% Match Rate</div>
                <div className="text-[10px] text-muted">vs. 23% industry avg</div>
              </div>
            </div>

            {/* Floating message pill */}
            <div className="absolute -bottom-4 -left-4 bg-white rounded-xl shadow-lg border border-gray-100 px-4 py-2.5 flex items-center gap-2.5 z-20">
              <div className="w-8 h-8 rounded-lg bg-brand-50 flex items-center justify-center text-brand-600">
                <IconMessage />
              </div>
              <div>
                <div className="text-xs font-bold text-ink">New message</div>
                <div className="text-[10px] text-muted">Sarah sent you a note</div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

/* ─── Features ─── */
function Features() {
  const { ref, visible } = useReveal();

  const features = [
    {
      icon: <IconBrain />,
      title: "Effortless Matching",
      tag: "Core AI",
      description:
        "Our proprietary compatibility engine analyzes 40+ dimensions — skills, stage, vision, work style, and domain expertise — to surface co-founder candidates with genuine alignment. No more scrolling through cold profiles.",
      bullets: ["40+ compatibility signals", "Real-time match scoring", "Learns from your feedback"],
    },
    {
      icon: <IconShield />,
      title: "Verified Profiles",
      tag: "Trust & Safety",
      description:
        "Every founder on FounderConnect passes a rigorous three-step vetting process: identity verification, LinkedIn credential check, and community reference review. You connect only with serious builders.",
      bullets: ["Identity + credential checks", "LinkedIn verification", "Community reference layer"],
    },
    {
      icon: <IconMessage />,
      title: "Seamless Communication",
      tag: "Built-In Tools",
      description:
        "Purpose-built messaging keeps your co-founder conversations organized, searchable, and secure — right inside the platform. Schedule intro calls, share docs, and track conversation history without leaving.",
      bullets: ["Encrypted in-app messaging", "Integrated calendar scheduling", "Document sharing & history"],
    },
  ];

  return (
    <section id="features" className="py-28 bg-white">
      <div className="max-w-7xl mx-auto px-6 lg:px-8">
        <div
          ref={ref}
          className={`text-center mb-16 transition-all duration-700 ${
            visible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-8"
          }`}
        >
          <span className="inline-block text-xs font-bold uppercase tracking-widest text-brand-600 mb-4">
            Platform Features
          </span>
          <h2 className="font-display text-4xl lg:text-5xl font-700 text-ink mb-5 tracking-tight">
            Everything you need to find{" "}
            <span className="stat-shimmer">the right partner</span>
          </h2>
          <p className="text-lg text-muted max-w-2xl mx-auto">
            FounderConnect is built from the ground up for serious entrepreneurs who know that the right
            co-founder is the single highest-leverage decision they&apos;ll make.
          </p>
        </div>

        <div className="grid md:grid-cols-3 gap-8">
          {features.map((f, i) => (
            <FeatureCard key={f.title} feature={f} index={i} />
          ))}
        </div>
      </div>
    </section>
  );
}

function FeatureCard({
  feature,
  index,
}: {
  feature: {
    icon: React.ReactNode;
    title: string;
    tag: string;
    description: string;
    bullets: string[];
  };
  index: number;
}) {
  const { ref, visible } = useReveal();

  return (
    <div
      ref={ref}
      className={`card-lift bg-white border border-gray-100 rounded-2xl p-8 transition-all duration-700 ${
        visible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-8"
      }`}
      style={{ transitionDelay: `${index * 120}ms` }}
    >
      <div className="flex items-start justify-between mb-6">
        <div className="w-12 h-12 rounded-xl bg-brand-50 border border-brand-100 flex items-center justify-center text-brand-600 icon-glow">
          {feature.icon}
        </div>
        <span className="text-[10px] font-bold uppercase tracking-widest text-brand-600 bg-brand-50 px-2 py-1 rounded-full border border-brand-100">
          {feature.tag}
        </span>
      </div>

      <h3 className="font-display text-xl font-700 text-ink mb-3">{feature.title}</h3>
      <p className="text-sm text-muted leading-relaxed mb-6">{feature.description}</p>

      <ul className="space-y-2.5">
        {feature.bullets.map((b) => (
          <li key={b} className="flex items-center gap-2.5 text-sm text-ink font-medium">
            <span className="w-5 h-5 rounded-full bg-brand-600 flex items-center justify-center text-white flex-shrink-0">
              <IconCheck />
            </span>
            {b}
          </li>
        ))}
      </ul>
    </div>
  );
}

/* ─── How It Works ─── */
function HowItWorks() {
  const { ref, visible } = useReveal();

  const steps = [
    {
      num: "01",
      title: "Create Your Profile",
      description:
        "Build a rich founder profile in under 10 minutes. Share your startup idea, domain expertise, equity expectations, and what you need in a co-founder. Our onboarding is designed to extract the signals that matter.",
      detail: "Takes less than 10 minutes",
    },
    {
      num: "02",
      title: "Get Matched by AI",
      description:
        "Our matching engine scores every founder in the network against your profile — surfacing your top candidates ranked by multi-dimensional compatibility. Matches update daily as new founders join.",
      detail: "New matches every 24 hours",
    },
    {
      num: "03",
      title: "Start Building",
      description:
        "Browse your curated matches, send a personalized intro message, and schedule an intro call — all inside FounderConnect. When you&apos;re ready to move forward, your co-founder is one click away.",
      detail: "First intro call in days, not months",
    },
  ];

  return (
    <section id="how-it-works" className="py-28 bg-surface">
      <div className="max-w-7xl mx-auto px-6 lg:px-8">
        <div
          ref={ref}
          className={`text-center mb-20 transition-all duration-700 ${
            visible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-8"
          }`}
        >
          <span className="inline-block text-xs font-bold uppercase tracking-widest text-brand-600 mb-4">
            How It Works
          </span>
          <h2 className="font-display text-4xl lg:text-5xl font-700 text-ink mb-5 tracking-tight">
            From sign-up to co-founder{" "}
            <span className="stat-shimmer">in three steps</span>
          </h2>
          <p className="text-lg text-muted max-w-2xl mx-auto">
            We designed FounderConnect to eliminate friction at every stage — so your energy goes into finding
            the right person, not navigating a cumbersome platform.
          </p>
        </div>

        {/* Steps */}
        <div className="relative grid md:grid-cols-3 gap-10">
          {/* Connector */}
          <div className="hidden md:block absolute top-10 left-[calc(16.67%+20px)] right-[calc(16.67%+20px)] h-px">
            <div className="w-full h-full bg-gradient-to-r from-brand-200 via-brand-400 to-brand-200" />
          </div>

          {steps.map((step, i) => (
            <StepCard key={step.num} step={step} index={i} />
          ))}
        </div>
      </div>
    </section>
  );
}

function StepCard({
  step,
  index,
}: {
  step: { num: string; title: string; description: string; detail: string };
  index: number;
}) {
  const { ref, visible } = useReveal();

  return (
    <div
      ref={ref}
      className={`relative text-center transition-all duration-700 ${
        visible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-8"
      }`}
      style={{ transitionDelay: `${index * 150}ms` }}
    >
      {/* Step number circle */}
      <div className="relative inline-flex mb-8">
        <div className="w-16 h-16 rounded-full bg-brand-600 flex items-center justify-center text-white font-display font-700 text-lg shadow-lg shadow-brand-200 relative z-10">
          {step.num}
        </div>
        <div className="absolute inset-0 rounded-full bg-brand-200 animate-pulse-slow scale-110" />
      </div>

      <h3 className="font-display text-xl font-700 text-ink mb-3">{step.title}</h3>
      <p className="text-sm text-muted leading-relaxed mb-4 px-2">{step.description}</p>
      <span className="inline-block text-xs font-semibold text-brand-600 bg-brand-50 border border-brand-100 px-3 py-1.5 rounded-full">
        {step.detail}
      </span>
    </div>
  );
}

/* ─── Stats / Social Proof ─── */
function Stats() {
  const { ref, visible } = useReveal();

  const stats = [
    { value: "$5.28B", label: "Total addressable market", sub: "Global co-founder matching space" },
    { value: "18.2%", label: "CAGR through 2030", sub: "Fastest-growing segment in talent tech" },
    { value: "10,000+", label: "Founders matched", sub: "And growing every day" },
    { value: "97%", label: "Satisfaction rate", sub: "Among founders who launched together" },
  ];

  const testimonials = [
    {
      quote: "FounderConnect surfaced my CTO in 11 days. We've since raised a $1.2M pre-seed. The match quality is genuinely unlike anything else I tried.",
      name: "Alex R.",
      role: "CEO, Stacklane",
      rating: 5,
    },
    {
      quote: "The vetting process gave me real confidence. I wasn't scrolling through random profiles — every match felt intentional and serious.",
      name: "Mei L.",
      role: "Founder, Clarity AI",
      rating: 5,
    },
    {
      quote: "Three months after joining FounderConnect, I found my co-founder. Six months after that, we were in Y Combinator.",
      name: "James O.",
      role: "Co-founder, Trellis",
      rating: 5,
    },
  ];

  return (
    <section className="py-28 bg-white overflow-hidden">
      <div className="max-w-7xl mx-auto px-6 lg:px-8">
        {/* Stats grid */}
        <div
          ref={ref}
          className={`grid grid-cols-2 lg:grid-cols-4 gap-6 mb-24 transition-all duration-700 ${
            visible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-8"
          }`}
        >
          {stats.map((stat, i) => (
            <div
              key={stat.value}
              className="bg-surface rounded-2xl p-6 border border-gray-100 text-center card-lift"
              style={{ transitionDelay: `${i * 80}ms` }}
            >
              <div className="font-display text-3xl lg:text-4xl font-800 stat-shimmer mb-1">
                {stat.value}
              </div>
              <div className="text-sm font-semibold text-ink mb-1">{stat.label}</div>
              <div className="text-xs text-muted">{stat.sub}</div>
            </div>
          ))}
        </div>

        {/* Testimonials */}
        <div className="text-center mb-12">
          <span className="inline-block text-xs font-bold uppercase tracking-widest text-brand-600 mb-4">
            Trusted By Entrepreneurs Worldwide
          </span>
          <h2 className="font-display text-3xl lg:text-4xl font-700 text-ink tracking-tight">
            Founders who found their match
          </h2>
        </div>

        <div className="grid md:grid-cols-3 gap-6">
          {testimonials.map((t, i) => (
            <TestimonialCard key={t.name} testimonial={t} index={i} />
          ))}
        </div>
      </div>
    </section>
  );
}

function TestimonialCard({
  testimonial,
  index,
}: {
  testimonial: { quote: string; name: string; role: string; rating: number };
  index: number;
}) {
  const { ref, visible } = useReveal();

  return (
    <div
      ref={ref}
      className={`bg-surface rounded-2xl p-6 border border-gray-100 card-lift accent-border-l transition-all duration-700 ${
        visible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-8"
      }`}
      style={{ transitionDelay: `${index * 120}ms` }}
    >
      {/* Stars */}
      <div className="flex gap-0.5 mb-4 text-yellow-400">
        {Array.from({ length: testimonial.rating }).map((_, i) => (
          <IconStar key={i} />
        ))}
      </div>

      <blockquote className="text-sm text-ink leading-relaxed mb-5 font-medium">
        &ldquo;{testimonial.quote}&rdquo;
      </blockquote>

      <div className="flex items-center gap-3">
        <div className="w-9 h-9 rounded-full bg-gradient-to-br from-brand-400 to-brand-800 flex items-center justify-center text-white text-sm font-bold">
          {testimonial.name[0]}
        </div>
        <div>
          <div className="text-sm font-semibold text-ink">{testimonial.name}</div>
          <div className="text-xs text-muted">{testimonial.role}</div>
        </div>
      </div>
    </div>
  );
}

/* ─── Pricing teaser ─── */
function Pricing() {
  const { ref, visible } = useReveal();

  const plans = [
    {
      name: "Explorer",
      price: "Free",
      period: "forever",
      description: "Get started and see your first matches at zero cost.",
      features: [
        "Up to 5 match profiles/month",
        "Basic compatibility score",
        "In-app messaging (5 threads)",
        "Standard profile listing",
      ],
      cta: "Start Free",
      highlight: false,
    },
    {
      name: "Builder",
      price: "$29",
      period: "per month",
      description: "For founders actively searching and ready to move fast.",
      features: [
        "Unlimited match profiles",
        "Full AI compatibility breakdown",
        "Unlimited messaging threads",
        "Priority profile placement",
        "Calendar scheduling integration",
        "Match refresh every 24 hours",
      ],
      cta: "Get Started",
      highlight: true,
    },
    {
      name: "Studio",
      price: "$79",
      period: "per month",
      description: "For accelerators and studios sourcing multiple founders.",
      features: [
        "Everything in Builder",
        "Up to 5 team seats",
        "Batch match exports",
        "Dedicated account manager",
        "Custom vetting criteria",
        "Analytics dashboard",
      ],
      cta: "Contact Sales",
      highlight: false,
    },
  ];

  return (
    <section id="pricing" className="py-28 bg-surface">
      <div className="max-w-7xl mx-auto px-6 lg:px-8">
        <div
          ref={ref}
          className={`text-center mb-16 transition-all duration-700 ${
            visible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-8"
          }`}
        >
          <span className="inline-block text-xs font-bold uppercase tracking-widest text-brand-600 mb-4">
            Pricing
          </span>
          <h2 className="font-display text-4xl lg:text-5xl font-700 text-ink mb-5 tracking-tight">
            Simple, transparent pricing
          </h2>
          <p className="text-lg text-muted max-w-xl mx-auto">
            Start free. Upgrade when you&apos;re ready to move faster.
          </p>
        </div>

        <div className="grid md:grid-cols-3 gap-6 items-start">
          {plans.map((plan, i) => (
            <PricingCard key={plan.name} plan={plan} index={i} />
          ))}
        </div>
      </div>
    </section>
  );
}

function PricingCard({
  plan,
  index,
}: {
  plan: {
    name: string;
    price: string;
    period: string;
    description: string;
    features: string[];
    cta: string;
    highlight: boolean;
  };
  index: number;
}) {
  const { ref, visible } = useReveal();

  return (
    <div
      ref={ref}
      className={`rounded-2xl p-8 transition-all duration-700 card-lift ${
        plan.highlight
          ? "bg-brand-600 text-white shadow-2xl shadow-brand-200 scale-105"
          : "bg-white border border-gray-100"
      } ${visible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-8"}`}
      style={{ transitionDelay: `${index * 120}ms` }}
    >
      {plan.highlight && (
        <div className="text-[10px] font-bold uppercase tracking-widest text-brand-200 mb-3">
          Most Popular
        </div>
      )}

      <h3
        className={`font-display text-xl font-700 mb-1 ${
          plan.highlight ? "text-white" : "text-ink"
        }`}
      >
        {plan.name}
      </h3>
      <p className={`text-sm mb-6 ${plan.highlight ? "text-brand-200" : "text-muted"}`}>
        {plan.description}
      </p>

      <div className="flex items-baseline gap-1 mb-8">
        <span
          className={`font-display text-4xl font-800 ${
            plan.highlight ? "text-white" : "stat-shimmer"
          }`}
        >
          {plan.price}
        </span>
        <span className={`text-sm ${plan.highlight ? "text-brand-200" : "text-muted"}`}>
          /{plan.period}
        </span>
      </div>

      <ul className="space-y-3 mb-8">
        {plan.features.map((f) => (
          <li key={f} className="flex items-start gap-2.5 text-sm">
            <span
              className={`w-5 h-5 rounded-full flex-shrink-0 flex items-center justify-center mt-0.5 ${
                plan.highlight
                  ? "bg-white/20 text-white"
                  : "bg-brand-600 text-white"
              }`}
            >
              <IconCheck />
            </span>
            <span className={plan.highlight ? "text-brand-100" : "text-ink"}>
              {f}
            </span>
          </li>
        ))}
      </ul>

      <a
        href="#signup"
        className={`w-full flex items-center justify-center gap-2 py-3 rounded-xl font-semibold text-sm transition-all duration-200 ${
          plan.highlight
            ? "bg-white text-brand-700 hover:bg-brand-50"
            : "btn-primary text-white"
        }`}
      >
        <span>{plan.cta}</span>
        <IconArrowRight />
      </a>
    </div>
  );
}

/* ─── Final CTA ─── */
function FinalCTA() {
  const { ref, visible } = useReveal();

  return (
    <section id="signup" className="py-28 bg-white">
      <div className="max-w-4xl mx-auto px-6 lg:px-8 text-center">
        <div
          ref={ref}
          className={`transition-all duration-700 ${
            visible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-8"
          }`}
        >
          {/* Background decoration */}
          <div className="relative inline-block mb-8">
            <div className="absolute inset-0 blob bg-brand-100 opacity-60 scale-150" />
            <div className="relative w-16 h-16 mx-auto rounded-2xl bg-brand-600 flex items-center justify-center shadow-xl shadow-brand-200">
              <svg viewBox="0 0 24 24" fill="white" className="w-8 h-8">
                <path d="M17 21v-2a4 4 0 0 0-4-4H5a4 4 0 0 0-4 4v2" />
                <circle cx="9" cy="7" r="4" />
                <path d="M23 21v-2a4 4 0 0 0-3-3.87M16 3.13a4 4 0 0 1 0 7.75" />
              </svg>
            </div>
          </div>

          <h2 className="font-display text-4xl lg:text-5xl font-700 text-ink mb-5 tracking-tight">
            Ready to Find Your{" "}
            <span className="stat-shimmer">Perfect Co-Founder?</span>
          </h2>
          <p className="text-xl text-muted mb-10 max-w-2xl mx-auto leading-relaxed">
            Join thousands of entrepreneurs who stopped searching and started building.
            Your next great partnership is already on FounderConnect.
          </p>

          <div className="flex flex-col sm:flex-row gap-4 justify-center mb-8">
            <a
              href="#"
              className="btn-primary inline-flex items-center justify-center gap-2.5 px-8 py-4 rounded-xl text-base font-semibold text-white shadow-xl"
            >
              <span>Get Started Free — No Credit Card</span>
              <IconArrowRight />
            </a>
          </div>

          <p className="text-sm text-muted">
            Setup takes under 10 minutes. Cancel anytime.
          </p>
        </div>
      </div>
    </section>
  );
}

/* ─── Footer ─── */
function Footer() {
  const links = {
    Product: ["Features", "How It Works", "Pricing", "Changelog"],
    Company: ["About", "Blog", "Careers", "Press"],
    Resources: ["Help Center", "Community", "API Docs", "Status"],
    Legal: ["Privacy Policy", "Terms of Service", "Cookie Policy"],
  };

  return (
    <footer className="bg-ink text-white">
      <div className="max-w-7xl mx-auto px-6 lg:px-8 py-16">
        <div className="grid lg:grid-cols-5 gap-10 mb-12">
          {/* Brand */}
          <div className="lg:col-span-1">
            <a href="#" className="flex items-center gap-2.5 mb-4 group">
              <div className="w-8 h-8 rounded-lg bg-brand-600 flex items-center justify-center">
                <svg viewBox="0 0 24 24" fill="white" className="w-4 h-4">
                  <path d="M17 21v-2a4 4 0 0 0-4-4H5a4 4 0 0 0-4 4v2" />
                  <circle cx="9" cy="7" r="4" />
                  <path d="M23 21v-2a4 4 0 0 0-3-3.87M16 3.13a4 4 0 0 1 0 7.75" />
                </svg>
              </div>
              <span className="font-display font-700 text-lg">
                Founder<span className="text-brand-400">Connect</span>
              </span>
            </a>
            <p className="text-sm text-gray-400 leading-relaxed">
              AI-powered co-founder matching for the world&apos;s most ambitious entrepreneurs.
            </p>
          </div>

          {/* Links */}
          {Object.entries(links).map(([category, items]) => (
            <div key={category}>
              <h4 className="text-xs font-bold uppercase tracking-widest text-gray-500 mb-4">
                {category}
              </h4>
              <ul className="space-y-2.5">
                {items.map((item) => (
                  <li key={item}>
                    <a
                      href="#"
                      className="text-sm text-gray-400 hover:text-white transition-colors duration-200"
                    >
                      {item}
                    </a>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>

        <div className="border-t border-gray-800 pt-8 flex flex-col sm:flex-row items-center justify-between gap-4">
          <p className="text-sm text-gray-500">
            &copy; {new Date().getFullYear()} FounderConnect, Inc. All rights reserved.
          </p>
          <div className="flex items-center gap-4">
            {/* Social icons */}
            {["twitter", "linkedin", "github"].map((social) => (
              <a
                key={social}
                href="#"
                className="w-8 h-8 rounded-lg bg-gray-800 hover:bg-gray-700 flex items-center justify-center text-gray-400 hover:text-white transition-all duration-200"
                aria-label={social}
              >
                <svg viewBox="0 0 24 24" fill="currentColor" className="w-3.5 h-3.5">
                  {social === "twitter" && (
                    <path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z" />
                  )}
                  {social === "linkedin" && (
                    <path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433a2.062 2.062 0 0 1-2.063-2.065 2.064 2.064 0 1 1 2.063 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z" />
                  )}
                  {social === "github" && (
                    <path d="M12 .297c-6.63 0-12 5.373-12 12 0 5.303 3.438 9.8 8.205 11.385.6.113.82-.258.82-.577 0-.285-.01-1.04-.015-2.04-3.338.724-4.042-1.61-4.042-1.61C4.422 18.07 3.633 17.7 3.633 17.7c-1.087-.744.084-.729.084-.729 1.205.084 1.838 1.236 1.838 1.236 1.07 1.835 2.809 1.305 3.495.998.108-.776.417-1.305.76-1.605-2.665-.3-5.466-1.332-5.466-5.93 0-1.31.465-2.38 1.235-3.22-.135-.303-.54-1.523.105-3.176 0 0 1.005-.322 3.3 1.23.96-.267 1.98-.399 3-.405 1.02.006 2.04.138 3 .405 2.28-1.552 3.285-1.23 3.285-1.23.645 1.653.24 2.873.12 3.176.765.84 1.23 1.91 1.23 3.22 0 4.61-2.805 5.625-5.475 5.92.42.36.81 1.096.81 2.22 0 1.606-.015 2.896-.015 3.286 0 .315.21.69.825.57C20.565 22.092 24 17.592 24 12.297c0-6.627-5.373-12-12-12" />
                  )}
                </svg>
              </a>
            ))}
          </div>
        </div>
      </div>
    </footer>
  );
}

/* ─── Page ─── */
export default function Page() {
  return (
    <main>
      <Nav />
      <Hero />
      <Features />
      <HowItWorks />
      <Stats />
      <Pricing />
      <FinalCTA />
      <Footer />
    </main>
  );
}
