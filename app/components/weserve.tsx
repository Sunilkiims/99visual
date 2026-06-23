"use client";

import { useEffect, useRef, useState } from "react";

const industries = [
  {
    index: "01",
    colorKey: "c1",
    title: "Real Estate & Architecture",
    tags: ["3D Visualisation", "CAD Drafting", "BIM", "Rendering"],
    desc: "Photorealistic renders, immersive walkthroughs, and precision CAD detailing that transform concept drawings into investor-ready presentations — before a single brick is laid.",
    stat: { value: "500+", label: "Projects Delivered" },
    fill: 82,
  },
  {
    index: "02",
    colorKey: "c2",
    title: "IT & Technology",
    tags: ["SaaS Platforms", "APIs", "Cloud", "DevOps"],
    desc: "Full-lifecycle engineering for complex digital products — from SaaS architecture and microservices to cloud-native deployments on AWS, GCP, and Azure.",
    stat: { value: "99.9%", label: "Uptime SLA" },
    fill: 95,
  },
  {
    index: "03",
    colorKey: "c3",
    title: "Government & Public Sector",
    tags: ["GIS Mapping", "LiDAR", "Secure Infrastructure", "Compliance"],
    desc: "Survey-grade GIS and LiDAR mapping, resilient IT infrastructure, and ISO-compliant data practices built to meet the rigorous standards of public-sector mandates.",
    stat: { value: "ISO", label: "Compliant Delivery" },
    fill: 70,
  },
  {
    index: "04",
    colorKey: "c4",
    title: "Startups & Entrepreneurs",
    tags: ["MVP Development", "UX Design", "Growth", "Automation"],
    desc: "Zero-to-one product builds and rapid MVPs engineered for speed-to-market — paired with growth marketing and process automation to compound momentum from day one.",
    stat: { value: "4 wks", label: "Avg. MVP Launch" },
    fill: 88,
  },
  {
    index: "05",
    colorKey: "c5",
    title: "E-commerce & Retail",
    tags: ["Conversion CRO", "SEO", "Headless Commerce", "Analytics"],
    desc: "Headless commerce architectures, performance-obsessed storefronts, and data-driven SEO programmes that translate traffic into revenue at every stage of the funnel.",
    stat: { value: "3×", label: "Avg. Conversion Lift" },
    fill: 78,
  },
];

const colorTokens = {
  c1: {
    card: "#fff8f0",
    border: "rgba(180,83,9,.12)",
    borderHover: "rgba(180,83,9,.35)",
    iconBg: "rgba(180,83,9,.1)",
    iconBgHover: "rgba(180,83,9,.18)",
    iconColor: "#b45309",
    iconBorder: "rgba(180,83,9,.18)",
    iconBorderHover: "rgba(180,83,9,.45)",
    stat: "#b45309",
    tagText: "#92400e",
    tagBg: "rgba(180,83,9,.08)",
    tagBorder: "rgba(180,83,9,.15)",
    bar: "#b45309",
    sweep: "rgba(180,83,9,.04)",
    accent: "#b45309",
  },
  c2: {
    card: "#f5f4ff",
    border: "rgba(99,102,241,.12)",
    borderHover: "rgba(99,102,241,.35)",
    iconBg: "rgba(99,102,241,.1)",
    iconBgHover: "rgba(99,102,241,.18)",
    iconColor: "#4f46e5",
    iconBorder: "rgba(99,102,241,.18)",
    iconBorderHover: "rgba(99,102,241,.45)",
    stat: "#4f46e5",
    tagText: "#3730a3",
    tagBg: "rgba(99,102,241,.08)",
    tagBorder: "rgba(99,102,241,.15)",
    bar: "#4f46e5",
    sweep: "rgba(99,102,241,.04)",
    accent: "#4f46e5",
  },
  c3: {
    card: "#f0faf5",
    border: "rgba(16,150,89,.12)",
    borderHover: "rgba(16,150,89,.35)",
    iconBg: "rgba(16,150,89,.1)",
    iconBgHover: "rgba(16,150,89,.18)",
    iconColor: "#059669",
    iconBorder: "rgba(16,150,89,.18)",
    iconBorderHover: "rgba(16,150,89,.45)",
    stat: "#059669",
    tagText: "#065f46",
    tagBg: "rgba(16,150,89,.08)",
    tagBorder: "rgba(16,150,89,.15)",
    bar: "#059669",
    sweep: "rgba(16,150,89,.04)",
    accent: "#059669",
  },
  c4: {
    card: "#fdf4ff",
    border: "rgba(168,85,247,.12)",
    borderHover: "rgba(168,85,247,.35)",
    iconBg: "rgba(168,85,247,.1)",
    iconBgHover: "rgba(168,85,247,.18)",
    iconColor: "#9333ea",
    iconBorder: "rgba(168,85,247,.18)",
    iconBorderHover: "rgba(168,85,247,.45)",
    stat: "#9333ea",
    tagText: "#6b21a8",
    tagBg: "rgba(168,85,247,.08)",
    tagBorder: "rgba(168,85,247,.15)",
    bar: "#9333ea",
    sweep: "rgba(168,85,247,.04)",
    accent: "#9333ea",
  },
  c5: {
    card: "#f0f8ff",
    border: "rgba(14,165,233,.12)",
    borderHover: "rgba(14,165,233,.35)",
    iconBg: "rgba(14,165,233,.1)",
    iconBgHover: "rgba(14,165,233,.18)",
    iconColor: "#0284c7",
    iconBorder: "rgba(14,165,233,.18)",
    iconBorderHover: "rgba(14,165,233,.45)",
    stat: "#0284c7",
    tagText: "#075985",
    tagBg: "rgba(14,165,233,.08)",
    tagBorder: "rgba(14,165,233,.15)",
    bar: "#0284c7",
    sweep: "rgba(14,165,233,.04)",
    accent: "#0284c7",
  },
};

// SVG icons — no external dependency
const icons = {
  building: (
    <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
      <rect x="3" y="3" width="18" height="18" rx="2" />
      <path d="M9 22V12h6v10" />
      <path d="M3 9h18" />
      <path d="M3 15h18" />
      <path d="M9 3v6" />
      <path d="M15 3v6" />
    </svg>
  ),
  cpu: (
    <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
      <rect x="7" y="7" width="10" height="10" rx="1" />
      <path d="M9 4v3M15 4v3M9 17v3M15 17v3M4 9h3M4 15h3M17 9h3M17 15h3" />
    </svg>
  ),
  map: (
    <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
      <polygon points="3 6 9 3 15 6 21 3 21 18 15 21 9 18 3 21" />
      <line x1="9" y1="3" x2="9" y2="18" />
      <line x1="15" y1="6" x2="15" y2="21" />
    </svg>
  ),
  rocket: (
    <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
      <path d="M4.5 16.5c-1.5 1.26-2 5-2 5s3.74-.5 5-2c.71-.84.7-2.13-.09-2.91a2.18 2.18 0 0 0-2.91-.09z" />
      <path d="m12 15-3-3a22 22 0 0 1 2-3.95A12.88 12.88 0 0 1 22 2c0 2.72-.78 7.5-6 11a22.35 22.35 0 0 1-4 2z" />
      <path d="M9 12H4s.55-3.03 2-4c1.62-1.08 5 0 5 0" />
      <path d="M12 15v5s3.03-.55 4-2c1.08-1.62 0-5 0-5" />
    </svg>
  ),
  bag: (
    <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
      <path d="M6 2 3 6v14a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2V6l-3-4z" />
      <line x1="3" y1="6" x2="21" y2="6" />
      <path d="M16 10a4 4 0 0 1-8 0" />
    </svg>
  ),
};

const iconMap = {
  c1: icons.building,
  c2: icons.cpu,
  c3: icons.map,
  c4: icons.rocket,
  c5: icons.bag,
};

function IndustryCard({ item }) {
  const [hovered, setHovered] = useState(false);
  const [tilt, setTilt] = useState({ x: 0, y: 0 });
  const [barWidth, setBarWidth] = useState(0);
  const cardRef = useRef(null);
  const t = colorTokens[item.colorKey];

  useEffect(() => {
    const el = cardRef.current;
    if (!el) return;
    const obs = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setTimeout(() => setBarWidth(item.fill), 200);
          obs.disconnect();
        }
      },
      { threshold: 0.3 }
    );
    obs.observe(el);
    return () => obs.disconnect();
  }, [item.fill]);

  const handleMouseMove = (e) => {
    const r = cardRef.current.getBoundingClientRect();
    setTilt({
      x: (e.clientX - r.left) / r.width - 0.5,
      y: (e.clientY - r.top) / r.height - 0.5,
    });
  };

  const transform = hovered
    ? `translateY(-8px) scale(1.02) rotateY(${tilt.x * 6}deg) rotateX(${-tilt.y * 6}deg)`
    : "translateY(0) scale(1) rotateY(0deg) rotateX(0deg)";

  return (
    <div
      ref={cardRef}
      onMouseMove={handleMouseMove}
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => { setHovered(false); setTilt({ x: 0, y: 0 }); }}
      style={{
        position: "relative",
        borderRadius: 16,
        padding: "1.5rem 1.3rem 1.2rem",
        cursor: "default",
        overflow: "hidden",
        background: t.card,
        border: `1px solid ${hovered ? t.borderHover : t.border}`,
        boxShadow: hovered
          ? "0 12px 40px rgba(0,0,0,.13)"
          : "0 1px 3px rgba(0,0,0,.05), 0 4px 12px rgba(0,0,0,.04)",
        transform,
        transition: hovered
          ? "transform .08s ease, box-shadow .4s ease, border-color .3s ease"
          : "transform .4s cubic-bezier(.23,1,.32,1), box-shadow .4s ease, border-color .3s ease",
        transformStyle: "preserve-3d",
      }}
    >
      {/* Sweep fill */}
      <div
        aria-hidden="true"
        style={{
          position: "absolute",
          inset: 0,
          background: t.sweep,
          transform: hovered ? "scaleX(1)" : "scaleX(0)",
          transformOrigin: "left center",
          transition: "transform .45s cubic-bezier(.76,0,.24,1)",
          pointerEvents: "none",
          borderRadius: 16,
        }}
      />

      {/* Left accent bar */}
      <div
        aria-hidden="true"
        style={{
          position: "absolute",
          left: 0, top: 0, bottom: 0,
          width: 3,
          background: t.accent,
          borderRadius: "16px 0 0 16px",
          transform: hovered ? "scaleY(1)" : "scaleY(0)",
          transformOrigin: "bottom",
          transition: "transform .4s cubic-bezier(.76,0,.24,1)",
        }}
      />

      {/* Ghost index */}
      <div
        aria-hidden="true"
        style={{
          position: "absolute",
          bottom: -8, right: 10,
          fontFamily: "Georgia, 'Times New Roman', serif",
          fontSize: "5rem",
          fontWeight: 700,
          lineHeight: 1,
          userSelect: "none",
          pointerEvents: "none",
          opacity: hovered ? 0.07 : 0.03,
          color: t.accent,
          transition: "opacity .35s ease",
        }}
      >
        {item.index}
      </div>

      {/* Content */}
      <div style={{ position: "relative", zIndex: 2 }}>

        {/* Top row */}
        <div style={{ display: "flex", justifyContent: "space-between", alignItems: "flex-start", marginBottom: "1.1rem" }}>
          <div
            style={{
              width: 42, height: 42, borderRadius: 12,
              display: "flex", alignItems: "center", justifyContent: "center",
              background: hovered ? t.iconBgHover : t.iconBg,
              color: t.iconColor,
              border: `1px solid ${hovered ? t.iconBorderHover : t.iconBorder}`,
              transition: "background .35s, border-color .35s",
            }}
          >
            {iconMap[item.colorKey]}
          </div>

          <div style={{ textAlign: "right" }}>
            <div style={{ fontFamily: "Georgia, 'Times New Roman', serif", fontSize: "1.4rem", fontWeight: 700, lineHeight: 1, color: t.stat }}>
              {item.stat.value}
            </div>
            <div style={{ fontSize: ".58rem", fontWeight: 500, letterSpacing: ".09em", textTransform: "uppercase", color: "#9ca3af", marginTop: 3 }}>
              {item.stat.label}
            </div>
          </div>
        </div>

        {/* Title */}
        <h3 style={{ fontFamily: "Georgia, 'Times New Roman', serif", fontSize: "1.05rem", fontWeight: 700, color: "#1a1a2e", lineHeight: 1.25, margin: "0 0 .45rem", letterSpacing: "-.01em" }}>
          {item.title}
        </h3>

        {/* Desc */}
        <p style={{ fontSize: ".72rem", fontWeight: 300, lineHeight: 1.78, color: "#6b7280", margin: "0 0 .85rem" }}>
          {item.desc}
        </p>

        {/* Tags */}
        <div style={{ display: "flex", flexWrap: "wrap", gap: 4, marginBottom: ".9rem" }}>
          {item.tags.map((tag) => (
            <span
              key={tag}
              style={{
                fontSize: ".57rem", fontWeight: 500, letterSpacing: ".07em",
                textTransform: "uppercase", padding: "3px 8px", borderRadius: 100,
                color: t.tagText, background: t.tagBg, border: `1px solid ${t.tagBorder}`,
              }}
            >
              {tag}
            </span>
          ))}
        </div>

        {/* Progress bar */}
        <div style={{ height: 3, background: "rgba(0,0,0,.06)", borderRadius: 3, overflow: "hidden" }}>
          <div
            style={{
              height: "100%", borderRadius: 3, background: t.bar,
              width: `${barWidth}%`,
              transition: "width .8s cubic-bezier(.23,1,.32,1) .15s",
            }}
          />
        </div>
      </div>
    </div>
  );
}

export default function IndustriesSection() {
  return (
    <section
      aria-labelledby="industries-heading"
      style={{
        position: "relative",
        background: "#f7f6f2",
        borderTop: "1px solid rgba(0,0,0,.06)",
        borderBottom: "1px solid rgba(0,0,0,.06)",
        overflow: "hidden",
        padding: "6rem 0 5rem",
        fontFamily: "system-ui, -apple-system, sans-serif",
      }}
    >
      <style>{`
        @media (max-width: 640px) {
          .vs-industries-grid { grid-template-columns: 1fr !important; }
          .vs-header-sub { display: none !important; }
        }
        @media (prefers-reduced-motion: reduce) {
          * { transition-duration: 0.01ms !important; }
        }
      `}</style>

      {/* Dot grid */}
      <div
        aria-hidden="true"
        style={{
          position: "absolute", inset: 0, pointerEvents: "none",
          backgroundImage: "radial-gradient(circle, rgba(0,0,0,.055) 1px, transparent 1px)",
          backgroundSize: "28px 28px",
        }}
      />

      <div style={{ position: "relative", zIndex: 10, maxWidth: 1200, margin: "0 auto", padding: "0 1.5rem" }}>

        {/* Header */}
        <div style={{ display: "grid", gridTemplateColumns: "1fr auto", alignItems: "flex-end", gap: "2rem", marginBottom: "3rem" }}>
          <div>
            <p
              aria-hidden="true"
              style={{
                display: "inline-flex", alignItems: "center", gap: 8,
                fontSize: 10, fontWeight: 500, letterSpacing: ".22em", textTransform: "uppercase",
                color: "#b45309", border: "1px solid rgba(180,83,9,.25)", background: "rgba(180,83,9,.07)",
                padding: "6px 16px", borderRadius: 100, marginBottom: "1.2rem",
              }}
            >
              <span style={{ width: 5, height: 5, borderRadius: "50%", background: "#b45309", display: "inline-block" }} />
              Sectors We Serve
            </p>

            <h2
              id="industries-heading"
              style={{
                fontFamily: "Georgia, 'Times New Roman', serif",
                fontSize: "clamp(2rem, 4.5vw, 3.2rem)",
                fontWeight: 700, lineHeight: 1.05, letterSpacing: "-.03em",
                color: "#1a1a2e", margin: 0,
              }}
            >
              Industries We{" "}
              <em style={{ fontStyle: "italic", color: "#b45309" }}>Serve</em>
            </h2>
          </div>

          <p
            className="vs-header-sub"
            style={{ fontSize: ".88rem", fontWeight: 300, lineHeight: 1.8, color: "#6b7280", maxWidth: 300, margin: 0, textAlign: "right" }}
          >
            Tailored expertise across diverse verticals — helping organisations innovate, scale, and lead.
          </p>
        </div>

        {/* Grid */}
        <div
          className="vs-industries-grid"
          style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(200px, 1fr))", gap: 14 }}
        >
          {industries.map((item) => (
            <IndustryCard key={item.index} item={item} />
          ))}
        </div>

        {/* Footer */}
        <div style={{ height: 1, background: "rgba(0,0,0,.08)", margin: "2.5rem 0 1.4rem" }} />
        <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", flexWrap: "wrap", gap: "1rem" }}>
          <p style={{ fontSize: ".8rem", fontWeight: 300, color: "#9ca3af", letterSpacing: ".04em", margin: 0 }}>
            Serving clients across India · USA · UK · UAE · Australia
          </p>
          <div style={{ display: "flex", gap: "1.5rem" }}>
            {["500+ Projects", "5+ Years", "Global Reach"].map((badge) => (
              <span key={badge} style={{ fontSize: ".72rem", fontWeight: 500, letterSpacing: ".1em", textTransform: "uppercase", color: "#9ca3af" }}>
                {badge}
              </span>
            ))}
          </div>
        </div>

      </div>
    </section>
  );
}
