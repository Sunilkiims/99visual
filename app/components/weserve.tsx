"use client";

import { useState } from "react";
import Link from "next/link";

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
    title: "Healthcare & Medical",
    tags: ["HIPAA-Ready", "Telehealth", "Patient Portals", "EHR Integration"],
    desc: "Secure, compliant platforms — from telehealth portals to EHR-integrated systems — built to protect patient trust at every touchpoint, without slowing clinicians down.",
    featured: true,
    icon: (
      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={1.4} strokeLinecap="round" strokeLinejoin="round" aria-hidden="true" style={{ width: 22, height: 22 }}>
        <path d="M20.84 4.61a5.5 5.5 0 0 0-7.78 0L12 5.67l-1.06-1.06a5.5 5.5 0 1 0-7.78 7.78l1.06 1.06L12 21.23l7.78-7.78 1.06-1.06a5.5 5.5 0 0 0 0-7.78z" />
        <path d="M8 12h2l1-2 2 4 1-2h2" />
      </svg>
    ),
  },
  {
    index: "03",
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
    index: "04",
    title: "Manufacturing & Industrial",
    tags: ["Digital Twins", "IoT Dashboards", "Process Automation", "ERP Integration"],
    desc: "Real-time monitoring dashboards and automation workflows that cut downtime and sharpen visibility across the plant floor.",
    icon: (
      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={1.4} strokeLinecap="round" strokeLinejoin="round" aria-hidden="true" style={{ width: 22, height: 22 }}>
        <path d="M2 20V9l6 4V9l6 4V9l6 4v7z" />
        <path d="M2 20h20" />
      </svg>
    ),
  },
  {
    index: "05",
    title: "Beauty, Salon & Wellness",
    tags: ["Booking Platforms", "Brand Identity", "Social Content", "Loyalty Apps"],
    desc: "Seamless booking experiences and scroll-stopping brand visuals that turn first-time visitors into recurring clients.",
    icon: (
      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={1.4} strokeLinecap="round" strokeLinejoin="round" aria-hidden="true" style={{ width: 22, height: 22 }}>
        <path d="M12 3l1.4 4.2L18 8l-4.2 1.4L12 14l-1.4-4.6L6 8l4.6-.8z" />
        <path d="M5 17l.7 2.1L8 20l-2.3.9L5 23l-.7-2.1L2 20l2.3-.9z" />
        <path d="M19 17l.7 2.1L22 20l-2.3.9L19 23l-.7-2.1L16 20l2.3-.9z" />
      </svg>
    ),
  },
  {
    index: "06",
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
    index: "07",
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
    index: "08",
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
      className={item.featured ? "bento-featured" : undefined}
      style={{
        position: "relative",
        background: item.featured
          ? "linear-gradient(135deg, #fff7ed 0%, #ffffff 55%)"
          : "#fff",
        border: `1px solid ${hovered ? "rgba(249,115,22,0.3)" : "rgba(0,0,0,0.07)"}`,
        borderRadius: 16,
        padding: "1.5rem 1.6rem",
        transition: "border-color 0.25s ease, box-shadow 0.25s ease, transform 0.25s ease",
        boxShadow: hovered ? "0 8px 32px rgba(249,115,22,0.08)" : "none",
        transform: hovered ? "translateY(-3px)" : "translateY(0)",
        display: "flex",
        alignItems: "flex-start",
        gap: "1.1rem",
        height: "100%",
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

      {item.featured && (
        <span aria-hidden="true" style={{
          position: "absolute", top: 12, left: 16,
          fontSize: "0.62rem", fontWeight: 700, letterSpacing: "0.1em",
          textTransform: "uppercase", color: "#f97316",
          background: "rgba(249,115,22,0.1)",
          border: "1px solid rgba(249,115,22,0.25)",
          borderRadius: 100, padding: "3px 9px",
        }}>
          Featured
        </span>
      )}

      <div style={{
        display: "inline-flex", alignItems: "center", justifyContent: "center",
        width: 42, height: 42, borderRadius: 10, flexShrink: 0,
        marginTop: item.featured ? "1.6rem" : 0,
        background: hovered ? "rgba(249,115,22,0.1)" : "rgba(249,115,22,0.07)",
        border: `1px solid ${hovered ? "rgba(249,115,22,0.28)" : "rgba(249,115,22,0.15)"}`,
        color: "#f97316",
        transition: "background 0.25s ease, border-color 0.25s ease",
      }}>
        {item.icon}
      </div>

      <div style={{ flex: 1, minWidth: 0, marginTop: item.featured ? "1.6rem" : 0 }}>
        <h3 style={{
          fontSize: item.featured ? "1.05rem" : "0.97rem", fontWeight: 700, color: "#0f172a",
          margin: "0 0 0.3rem", letterSpacing: "-0.01em",
          lineHeight: 1.25, paddingRight: "2rem",
        }}>
          {item.title}
        </h3>
        <p style={{
          fontSize: "0.82rem", fontWeight: 400, lineHeight: 1.75,
          color: "#64748b", margin: "0 0 0.9rem",
          maxWidth: item.featured ? "560px" : "none",
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

function IndustriesBanner() {
  return (
    <div
      className="industries-banner"
      style={{
        position: "relative",
        overflow: "hidden",
        borderRadius: 16,
        background: "#0f172a",
        border: "1px solid rgba(255,255,255,0.08)",
        padding: "2rem 1.75rem",
        display: "flex",
        flexDirection: "column",
        justifyContent: "space-between",
        minHeight: 420,
      }}
    >
      {/* ambient orbs — consistent with contact page treatment */}
      <div aria-hidden="true" style={{
        position: "absolute", top: -60, right: -60, width: 200, height: 200,
        borderRadius: "50%", background: "radial-gradient(circle, rgba(249,115,22,0.35) 0%, transparent 70%)",
        filter: "blur(10px)", pointerEvents: "none",
      }} />
      <div aria-hidden="true" style={{
        position: "absolute", bottom: -80, left: -40, width: 220, height: 220,
        borderRadius: "50%", background: "radial-gradient(circle, rgba(56,189,248,0.18) 0%, transparent 70%)",
        filter: "blur(10px)", pointerEvents: "none",
      }} />

      <div style={{ position: "relative", zIndex: 2 }}>
        <span style={{
          fontSize: "0.68rem", fontWeight: 700, letterSpacing: "0.16em",
          textTransform: "uppercase", color: "#fb923c",
        }}>
          Work With Us
        </span>

        <h3 style={{
          fontSize: "1.65rem", fontWeight: 800, color: "#fff",
          margin: "0.7rem 0 0.9rem", lineHeight: 1.25, letterSpacing: "-0.01em",
        }}>
          Your industry. Our expertise.
        </h3>

        <p style={{
          fontSize: "0.87rem", fontWeight: 400, lineHeight: 1.75,
          color: "rgba(255,255,255,0.65)", margin: 0,
        }}>
          From compliance-heavy healthcare builds to fast-moving retail launches,
          we tailor every engagement to the rules of your market — not the other way around.
        </p>
      </div>

      <div style={{ position: "relative", zIndex: 2, marginTop: "2rem" }}>
        <div style={{
          display: "flex", gap: "1.4rem", marginBottom: "1.6rem",
          paddingBottom: "1.4rem", borderBottom: "1px solid rgba(255,255,255,0.1)",
        }}>
          <div>
            <div style={{ fontSize: "1.3rem", fontWeight: 800, color: "#fff" }}>8+</div>
            <div style={{ fontSize: "0.7rem", color: "rgba(255,255,255,0.5)", marginTop: 2 }}>
              Industries Served
            </div>
          </div>
          <div>
            <div style={{ fontSize: "1.3rem", fontWeight: 800, color: "#fff" }}>5</div>
            <div style={{ fontSize: "0.7rem", color: "rgba(255,255,255,0.5)", marginTop: 2 }}>
              Countries Served
            </div>
          </div>
        </div>

        <Link
          href="/contact"
          style={{
            display: "flex", alignItems: "center", justifyContent: "center", gap: 8,
            width: "100%", padding: "0.85rem 1.2rem", borderRadius: 100,
            background: "linear-gradient(135deg, #f97316, #fb923c)",
            color: "#fff", fontSize: "0.8rem", fontWeight: 700,
            letterSpacing: "0.02em", textDecoration: "none",
            boxShadow: "0 8px 24px rgba(249,115,22,0.35)",
          }}
        >
          Book a Free Consultation
          <svg viewBox="0 0 16 16" fill="none" stroke="currentColor" strokeWidth={1.8} strokeLinecap="round" strokeLinejoin="round" style={{ width: 14, height: 14 }} aria-hidden="true">
            <path d="M3 8h10M9 4l4 4-4 4" />
          </svg>
        </Link>

        <p style={{
          fontSize: "0.68rem", color: "rgba(255,255,255,0.35)",
          textAlign: "center", marginTop: "0.9rem", letterSpacing: "0.02em",
        }}>
          India · USA · UK · UAE · Australia
        </p>
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
        .industries-layout {
          display: flex;
          flex-direction: column;
          gap: 1.25rem;
        }
        .industries-grid-wrap {
          display: grid;
          grid-template-columns: repeat(auto-fill, minmax(min(100%, 320px), 1fr));
          gap: 16px;
          align-items: stretch;
        }
        .bento-featured {
          grid-column: span 1;
        }
        @media (min-width: 1024px) {
          .industries-layout {
            flex-direction: row;
            align-items: stretch;
          }
          .industries-grid-wrap {
            flex: 1;
            grid-template-columns: repeat(2, 1fr);
          }
          .bento-featured {
            grid-column: span 2;
          }
          .industries-banner {
            width: 300px;
            flex-shrink: 0;
            position: sticky;
            top: 96px;
            align-self: flex-start;
          }
        }
      `}</style>

      <div aria-hidden="true" style={{
        position: "absolute", inset: 0, pointerEvents: "none",
        background:
          "radial-gradient(ellipse 60% 50% at 90% 0%, rgba(249,115,22,0.04) 0%, transparent 70%)," +
          "radial-gradient(ellipse 50% 40% at 10% 100%, rgba(249,115,22,0.03) 0%, transparent 70%)",
      }} />

      <div style={{ position: "relative", zIndex: 10, maxWidth: 1280, margin: "0 auto", padding: "4rem 0" }}>

        <header style={{ textAlign: "center", marginBottom: "3rem" }}>
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

        <div className="industries-layout" role="list" aria-label="Industries served by 99 Visual Solutions">
          <div className="industries-grid-wrap">
            {industries.map((item) => (
              <div key={item.index} role="listitem" className={item.featured ? "bento-featured" : undefined}>
                <IndustryCard item={item} />
              </div>
            ))}
          </div>

          <IndustriesBanner />
        </div>

      </div>
    </section>
  );
}
