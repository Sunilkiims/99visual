"use client";

import { useState } from "react";

const industries = [
  {
    index: "01",
    title: "Real Estate & Architecture",
    tags: ["3D Visualisation", "CAD Drafting", "BIM", "Rendering"],
    desc: "Photorealistic renders and precision CAD detailing that transform concept drawings into investor-ready presentations.",
    icon: (
      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={1.4} strokeLinecap="round" strokeLinejoin="round" aria-hidden="true" style={{ width: 22, height: 22 }}>
        <path d="M3 9l9-7 9 7v11a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2z" />
        <polyline points="9 22 9 12 15 12 15 22" />
      </svg>
    ),
  },
  {
    index: "02",
    title: "IT & Technology",
    tags: ["SaaS Platforms", "APIs", "Cloud", "DevOps"],
    desc: "Full-lifecycle engineering for complex digital products — from SaaS architecture to cloud-native deployments.",
    icon: (
      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={1.4} strokeLinecap="round" strokeLinejoin="round" aria-hidden="true" style={{ width: 22, height: 22 }}>
        <rect x="2" y="3" width="20" height="14" rx="2" />
        <path d="M8 21h8M12 17v4" />
        <path d="M7 8l3 3-3 3" />
        <line x1="13" y1="11" x2="17" y2="11" />
      </svg>
    ),
  },
  {
    index: "03",
    title: "Government & Public Sector",
    tags: ["GIS Mapping", "LiDAR", "Secure Infrastructure", "Compliance"],
    desc: "Survey-grade GIS mapping, resilient IT infrastructure, and ISO-compliant data practices for public-sector mandates.",
    icon: (
      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={1.4} strokeLinecap="round" strokeLinejoin="round" aria-hidden="true" style={{ width: 22, height: 22 }}>
        <circle cx="12" cy="12" r="3" />
        <path d="M12 1v4M12 19v4M4.22 4.22l2.83 2.83M16.95 16.95l2.83 2.83M1 12h4M19 12h4M4.22 19.78l2.83-2.83M16.95 7.05l2.83-2.83" />
      </svg>
    ),
  },
  {
    index: "04",
    title: "Startups & Entrepreneurs",
    tags: ["MVP Development", "UX Design", "Growth", "Automation"],
    desc: "Zero-to-one product builds and rapid MVPs paired with growth marketing to compound momentum from day one.",
    icon: (
      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={1.4} strokeLinecap="round" strokeLinejoin="round" aria-hidden="true" style={{ width: 22, height: 22 }}>
        <polyline points="22 7 13.5 15.5 8.5 10.5 2 17" />
        <polyline points="16 7 22 7 22 13" />
      </svg>
    ),
  },
  {
    index: "05",
    title: "E-commerce & Retail",
    tags: ["CRO", "SEO", "Headless Commerce", "Analytics"],
    desc: "Performance-obsessed storefronts and data-driven SEO that translate traffic into revenue at every funnel stage.",
    icon: (
      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={1.4} strokeLinecap="round" strokeLinejoin="round" aria-hidden="true" style={{ width: 22, height: 22 }}>
        <path d="M6 2L3 6v14a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2V6l-3-4z" />
        <line x1="3" y1="6" x2="21" y2="6" />
        <path d="M16 10a4 4 0 0 1-8 0" />
      </svg>
    ),
  },
];

function IndustryCard({ item }: { item: (typeof industries)[0] }) {
  const [hovered, setHovered] = useState(false);

  return (
    <article
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
      style={{
        position: "relative",
        background: "#fff",
        border: `1px solid ${hovered ? "rgba(249,115,22,0.3)" : "rgba(0,0,0,0.07)"}`,
        borderRadius: 16,
        padding: "1.5rem 1.6rem",
        transition: "border-color 0.25s ease, box-shadow 0.25s ease, transform 0.25s ease",
        boxShadow: hovered ? "0 8px 32px rgba(249,115,22,0.08)" : "none",
        transform: hovered ? "translateY(-3px)" : "translateY(0)",
        display: "flex",
        alignItems: "flex-start",
        gap: "1.1rem",
      }}
    >
      <span aria-hidden="true" style={{
        position: "absolute", top: 12, right: 16,
        fontSize: "2.2rem", fontWeight: 800, lineHeight: 1,
        color: hovered ? "rgba(249,115,22,0.07)" : "rgba(0,0,0,0.04)",
        userSelect: "none", transition: "color 0.3s ease",
      }}>
        {item.index}
      </span>

      <div style={{
        display: "inline-flex", alignItems: "center", justifyContent: "center",
        width: 42, height: 42, borderRadius: 10, flexShrink: 0,
        background: hovered ? "rgba(249,115,22,0.1)" : "rgba(249,115,22,0.07)",
        border: `1px solid ${hovered ? "rgba(249,115,22,0.28)" : "rgba(249,115,22,0.15)"}`,
        color: "#f97316",
        transition: "background 0.25s ease, border-color 0.25s ease",
      }}>
        {item.icon}
      </div>

      <div style={{ flex: 1, minWidth: 0 }}>
        <h3 style={{
          fontSize: "0.97rem", fontWeight: 700, color: "#0f172a",
          margin: "0 0 0.3rem", letterSpacing: "-0.01em",
          lineHeight: 1.25, paddingRight: "2rem",
        }}>
          {item.title}
        </h3>
        <p style={{
          fontSize: "0.82rem", fontWeight: 400, lineHeight: 1.75,
          color: "#64748b", margin: "0 0 0.9rem",
        }}>
          {item.desc}
        </p>
        <div style={{ display: "flex", flexWrap: "wrap", gap: 5 }}>
          {item.tags.map((tag) => (
            <span key={tag} style={{
              fontSize: "0.65rem", fontWeight: 600, letterSpacing: "0.07em",
              textTransform: "uppercase",
              color: hovered ? "#f97316" : "#64748b",
              border: `1px solid ${hovered ? "rgba(249,115,22,0.3)" : "rgba(0,0,0,0.09)"}`,
              background: hovered ? "rgba(249,115,22,0.06)" : "transparent",
              padding: "2px 8px", borderRadius: 100,
              transition: "color 0.25s ease, border-color 0.25s ease, background 0.25s ease",
            }}>
              {tag}
            </span>
          ))}
        </div>
      </div>
    </article>
  );
}

export default function IndustriesSection() {
  return (
    <section
      aria-labelledby="industries-heading"
      style={{
        position: "relative",
        background: "#f8fafc",
        overflow: "hidden",
        padding: "0 24px",
        fontFamily: "'DM Sans', sans-serif",
      }}
    >
      <style>{`
        @media (prefers-reduced-motion: reduce) {
          * { transition-duration: 0.01ms !important; }
        }
      `}</style>

      <div aria-hidden="true" style={{
        position: "absolute", inset: 0, pointerEvents: "none",
        background:
          "radial-gradient(ellipse 60% 50% at 90% 0%, rgba(249,115,22,0.04) 0%, transparent 70%)," +
          "radial-gradient(ellipse 50% 40% at 10% 100%, rgba(249,115,22,0.03) 0%, transparent 70%)",
      }} />

      <div style={{ position: "relative", zIndex: 10, maxWidth: 1200, margin: "0 auto" }}>

        <header style={{ textAlign: "center", marginBottom: "3.5rem" }}>
          <h2 id="industries-heading" style={{
            fontSize: "clamp(28px, 4vw, 42px)",
            fontWeight: 800, lineHeight: 1.15,
            letterSpacing: "-.02em", color: "#0f172a",
            margin: "0 0 8px",
          }}>
            Industries We{" "}
            <span style={{
              background: "linear-gradient(135deg, #f97316, #fb923c)",
              WebkitBackgroundClip: "text",
              WebkitTextFillColor: "transparent",
              backgroundClip: "text",
            }}>
              Serve
            </span>
          </h2>

          <div style={{
            width: 48, height: 3, borderRadius: 2,
            background: "linear-gradient(to right, #f97316, #fbbf24)",
            margin: "16px auto 20px",
          }} />

          <p style={{
            fontSize: ".97rem", fontWeight: 400, lineHeight: 1.8,
            color: "#475569", maxWidth: 520, margin: "0 auto",
          }}>
            Tailored expertise across diverse verticals — helping organisations innovate, scale, and lead.
          </p>
        </header>

        <div role="list" aria-label="Industries served by 99 Visual Solutions" style={{
          display: "grid",
          gridTemplateColumns: "repeat(auto-fill, minmax(min(100%, 360px), 1fr))",
          gap: "16px",
        }}>
          {industries.map((item) => (
            <div key={item.index} role="listitem">
              <IndustryCard item={item} />
            </div>
          ))}
        </div>

        <footer style={{
          marginTop: "3rem",
          marginBottom: 0,
          textAlign: "center",
          padding: "1.4rem 2rem",
          background: "#fff",
          border: "1px solid rgba(0,0,0,0.07)",
          borderRadius: 16,
        }}>
          <p style={{
            fontSize: ".82rem", fontWeight: 400,
            color: "#94a3b8", margin: 0, letterSpacing: ".03em",
          }}>
            Serving clients across India · USA · UK · UAE · Australia
          </p>
        </footer>

      </div>
    </section>
  );
}