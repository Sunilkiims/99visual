"use client";

import { useRef, useState } from "react";

// ─── Data ─────────────────────────────────────────────────────────────────────
const industries = [
  {
    index: "01",
    title: "Real Estate & Architecture",
    tags: ["3D Visualisation", "CAD Drafting", "BIM", "Rendering"],
    desc: "Photorealistic renders, immersive walkthroughs, and precision CAD detailing that transform concept drawings into investor-ready presentations — before a single brick is laid.",
    stat: { value: "500+", label: "Projects Delivered" },
  },
  {
    index: "02",
    title: "IT & Technology",
    tags: ["SaaS Platforms", "APIs", "Cloud", "DevOps"],
    desc: "Full-lifecycle engineering for complex digital products — from SaaS architecture and microservices to cloud-native deployments on AWS, GCP, and Azure.",
    stat: { value: "99.9%", label: "Uptime SLA" },
  },
  {
    index: "03",
    title: "Government & Public Sector",
    tags: ["GIS Mapping", "LiDAR", "Secure Infrastructure", "Compliance"],
    desc: "Survey-grade GIS and LiDAR mapping, resilient IT infrastructure, and ISO-compliant data practices built to meet the rigorous standards of public-sector mandates.",
    stat: { value: "ISO", label: "Compliant Delivery" },
  },
  {
    index: "04",
    title: "Startups & Entrepreneurs",
    tags: ["MVP Development", "UX Design", "Growth", "Automation"],
    desc: "Zero-to-one product builds and rapid MVPs engineered for speed-to-market — paired with growth marketing and process automation to compound momentum from day one.",
    stat: { value: "4 wks", label: "Avg. MVP Launch" },
  },
  {
    index: "05",
    title: "E-commerce & Retail",
    tags: ["Conversion CRO", "SEO", "Headless Commerce", "Analytics"],
    desc: "Headless commerce architectures, performance-obsessed storefronts, and data-driven SEO programmes that translate traffic into revenue at every stage of the funnel.",
    stat: { value: "3×", label: "Avg. Conversion Lift" },
  },
];

// ─── Row component ─────────────────────────────────────────────────────────────
function IndustryRow({
  item,
  idx,
}: {
  item: (typeof industries)[0];
  idx: number;
}) {
  const [hovered, setHovered] = useState(false);

  return (
    <div
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
      style={{
        position: "relative",
        borderBottom: "1px solid rgba(255,255,255,0.07)",
        overflow: "hidden",
        cursor: "default",
      }}
    >
      {/* Sweep fill */}
      <div
        aria-hidden="true"
        style={{
          position: "absolute",
          inset: 0,
          background: "rgba(249,115,22,0.055)",
          transform: hovered ? "scaleX(1)" : "scaleX(0)",
          transformOrigin: "left center",
          transition: "transform 0.45s cubic-bezier(0.76,0,0.24,1)",
          pointerEvents: "none",
          zIndex: 0,
        }}
      />

      {/* Left accent bar */}
      <div
        aria-hidden="true"
        style={{
          position: "absolute",
          left: 0,
          top: 0,
          bottom: 0,
          width: 2,
          background: "#f97316",
          transform: hovered ? "scaleY(1)" : "scaleY(0)",
          transformOrigin: "bottom",
          transition: "transform 0.4s cubic-bezier(0.76,0,0.24,1)",
          zIndex: 1,
        }}
      />

      <div
        style={{
          position: "relative",
          zIndex: 2,
          display: "grid",
          gridTemplateColumns: "80px 1fr auto",
          gap: "0 2.5rem",
          alignItems: "center",
          padding: "2.4rem 2.5rem 2.4rem 2.8rem",
        }}
        className="vs-row-inner"
      >
        {/* Index number */}
        <span
          aria-hidden="true"
          style={{
            fontFamily: "'Cormorant Garamond', serif",
            fontSize: "clamp(2.4rem, 4vw, 3.5rem)",
            fontWeight: 700,
            lineHeight: 1,
            color: hovered ? "#f97316" : "rgba(255,255,255,0.1)",
            transition: "color 0.35s ease",
            userSelect: "none",
          }}
        >
          {item.index}
        </span>

        {/* Main content */}
        <div>
          <h3
            style={{
              fontFamily: "'Cormorant Garamond', serif",
              fontSize: "clamp(1.3rem, 2.5vw, 1.8rem)",
              fontWeight: 700,
              color: "#fff",
              margin: "0 0 0.55rem",
              letterSpacing: "-0.02em",
              lineHeight: 1.15,
            }}
          >
            {item.title}
          </h3>

          <p
            style={{
              fontSize: "0.875rem",
              fontWeight: 300,
              lineHeight: 1.78,
              color: "rgba(255,255,255,0.42)",
              margin: "0 0 1rem",
              maxWidth: 560,
            }}
          >
            {item.desc}
          </p>

          <div style={{ display: "flex", flexWrap: "wrap", gap: "6px" }}>
            {item.tags.map((tag) => (
              <span
                key={tag}
                style={{
                  fontSize: "0.7rem",
                  fontWeight: 500,
                  letterSpacing: "0.1em",
                  textTransform: "uppercase",
                  color: hovered ? "#f97316" : "rgba(255,255,255,0.35)",
                  border: `1px solid ${hovered ? "rgba(249,115,22,0.4)" : "rgba(255,255,255,0.1)"}`,
                  background: hovered ? "rgba(249,115,22,0.08)" : "transparent",
                  padding: "4px 10px",
                  borderRadius: 100,
                  transition: "color 0.3s ease, border-color 0.3s ease, background 0.3s ease",
                }}
              >
                {tag}
              </span>
            ))}
          </div>
        </div>

        {/* Stat */}
        <div
          style={{
            textAlign: "right",
            minWidth: 100,
            flexShrink: 0,
          }}
          className="vs-stat"
        >
          <div
            style={{
              fontFamily: "'Cormorant Garamond', serif",
              fontSize: "clamp(1.6rem, 3vw, 2.4rem)",
              fontWeight: 700,
              color: hovered ? "#f97316" : "rgba(255,255,255,0.55)",
              lineHeight: 1,
              transition: "color 0.35s ease",
            }}
          >
            {item.stat.value}
          </div>
          <div
            style={{
              fontSize: "0.7rem",
              fontWeight: 500,
              letterSpacing: "0.1em",
              textTransform: "uppercase",
              color: "rgba(255,255,255,0.28)",
              marginTop: 4,
            }}
          >
            {item.stat.label}
          </div>
        </div>
      </div>
    </div>
  );
}

// ─── Section ──────────────────────────────────────────────────────────────────
export default function IndustriesSection() {
  return (
    <section
      aria-labelledby="industries-heading"
      style={{
        position: "relative",
        background: "#0a0a0a",
        borderTop: "1px solid rgba(255,255,255,0.06)",
        borderBottom: "1px solid rgba(255,255,255,0.06)",
        overflow: "hidden",
        padding: "6rem 0 5rem",
        fontFamily: "'DM Sans', sans-serif",
      }}
    >
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Cormorant+Garamond:ital,wght@0,400;0,700;1,400&family=DM+Sans:wght@300;400;500;600&display=swap');

        @media (max-width: 640px) {
          .vs-row-inner {
            grid-template-columns: 52px 1fr !important;
            gap: 0 1.2rem !important;
            padding: 1.8rem 1.2rem 1.8rem 1.4rem !important;
          }
          .vs-stat { display: none !important; }
        }

        @media (prefers-reduced-motion: reduce) {
          * { transition-duration: 0.01ms !important; }
        }
      `}</style>

      {/* ── Background grid ──────────────────────────────────────────────── */}
      <div
        aria-hidden="true"
        style={{
          position: "absolute", inset: 0, pointerEvents: "none",
          backgroundImage:
            "linear-gradient(rgba(255,255,255,.012) 1px, transparent 1px)," +
            "linear-gradient(90deg, rgba(255,255,255,.012) 1px, transparent 1px)",
          backgroundSize: "72px 72px",
        }}
      />

      {/* ── Ambient glows ─────────────────────────────────────────────────── */}
      <div aria-hidden="true" style={{ position: "absolute", borderRadius: "50%", width: 700, height: 700, background: "radial-gradient(circle, #f97316, transparent 65%)", top: -320, right: -250, opacity: 0.035, filter: "blur(130px)", pointerEvents: "none" }} />
      <div aria-hidden="true" style={{ position: "absolute", borderRadius: "50%", width: 500, height: 500, background: "radial-gradient(circle, #6366f1, transparent 65%)", bottom: -200, left: -150, opacity: 0.035, filter: "blur(130px)", pointerEvents: "none" }} />

      {/* ── Inner wrapper ─────────────────────────────────────────────────── */}
      <div style={{ position: "relative", zIndex: 10, maxWidth: 1200, margin: "0 auto", padding: "0 1.5rem" }}>

        {/* ── Header ────────────────────────────────────────────────────── */}
        <div style={{ display: "grid", gridTemplateColumns: "1fr auto", alignItems: "flex-end", gap: "2rem", marginBottom: "3.5rem" }}>
          <div>
            <p
              aria-hidden="true"
              style={{
                display: "inline-flex", alignItems: "center", gap: 8,
                fontSize: 10, fontWeight: 500,
                letterSpacing: ".22em", textTransform: "uppercase",
                color: "#f97316",
                border: "1px solid rgba(249,115,22,.28)",
                background: "rgba(249,115,22,.07)",
                padding: "6px 16px", borderRadius: 100,
                marginBottom: "1.2rem",
                backdropFilter: "blur(8px)",
              }}
            >
              <span style={{ width: 5, height: 5, borderRadius: "50%", background: "#f97316", display: "inline-block" }} />
              Sectors We Serve
            </p>

            <h2
              id="industries-heading"
              style={{
                fontFamily: "'Cormorant Garamond', serif",
                fontSize: "clamp(2rem, 4.5vw, 3.2rem)",
                fontWeight: 700, lineHeight: 1.05,
                letterSpacing: "-.03em",
                color: "#fff",
                margin: 0,
              }}
            >
              Industries We{" "}
              <em style={{ fontStyle: "italic", color: "#f97316" }}>Serve</em>
            </h2>
          </div>

          <p
            style={{
              fontSize: ".88rem", fontWeight: 300, lineHeight: 1.8,
              color: "rgba(255,255,255,0.38)",
              maxWidth: 300, margin: 0,
              textAlign: "right",
            }}
            className="vs-header-sub"
          >
            Tailored expertise across diverse verticals — helping organisations innovate, scale, and lead.
          </p>
        </div>

        {/* ── Row list ──────────────────────────────────────────────────── */}
        <div
          role="list"
          aria-label="Industries served by 99 Visual Solutions"
          style={{
            border: "1px solid rgba(255,255,255,0.07)",
            borderBottom: "none",
          }}
        >
          {industries.map((item, idx) => (
            <div key={item.index} role="listitem">
              <IndustryRow item={item} idx={idx} />
            </div>
          ))}
        </div>

        {/* ── Bottom border line ────────────────────────────────────────── */}
        <div style={{ height: 1, background: "rgba(255,255,255,0.07)" }} />

        {/* ── Footer note ───────────────────────────────────────────────── */}
        <div
          style={{
            display: "flex", justifyContent: "space-between", alignItems: "center",
            padding: "1.4rem 0 0",
            flexWrap: "wrap", gap: "1rem",
          }}
        >
          <p style={{ fontSize: ".8rem", fontWeight: 300, color: "rgba(255,255,255,0.25)", letterSpacing: ".04em", margin: 0 }}>
            Serving clients across India · USA · UK · UAE · Australia
          </p>
          <div style={{ display: "flex", gap: "1.5rem" }}>
            {["500+ Projects", "5+ Years", "Global Reach"].map((badge) => (
              <span
                key={badge}
                style={{
                  fontSize: ".72rem", fontWeight: 500,
                  letterSpacing: ".1em", textTransform: "uppercase",
                  color: "rgba(255,255,255,0.3)",
                }}
              >
                {badge}
              </span>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
