// app/llms.txt/route.ts
//
// Serves /llms.txt dynamically from Next.js (App Router).
// Base sections are static; the Insights section is pulled live from
// Prisma so new/removed articles show up automatically without editing
// this file. Falls back to a static Insights list if the DB call fails,
// so the route never 500s.

import { NextResponse } from "next/server";
import { prisma } from "@/lib/prisma"; // adjust to your actual Prisma client path

export const dynamic = "force-dynamic"; // don't cache at build time
export const revalidate = 3600; // if you'd rather ISR-cache it, set this instead and drop force-dynamic

const BASE_URL = "https://www.99visual.com";

const STATIC_INSIGHTS_FALLBACK = [
  {
    title: "Strategies for Adapting to New Algorithms",
    slug: "strategies-adapting-new-algorithms",
    description:
      "How to adapt SEO strategy after Google's May 2026 Core Update.",
  },
  {
    title: "How IT Consulting Helps Small Businesses Scale Faster",
    slug: "how-it-consulting-helps-small-businesses-scale-faster",
    description:
      "How IT consulting supports growing businesses without a large in-house IT team.",
  },
  {
    title: "GIS Mapping vs Traditional Surveying: Which is Better?",
    slug: "gis-mapping-vs-traditional-surveying-which-is-better",
    description: "Comparing GIS mapping and traditional land surveying methods.",
  },
  {
    title: "Immersive Visualization for Real Estate",
    slug: "immersive-visualization-real-estate-architecture",
    description:
      "How 3D visualisation and VR walkthroughs are used in real estate and architecture.",
  },
];

async function getInsights() {
  try {
    // Adjust model/field names to match your actual Prisma schema.
    // Expected shape: { title, slug, excerpt/description, published: true }
    const posts = await prisma.post.findMany({
      where: { published: true },
      select: { title: true, slug: true, excerpt: true },
      orderBy: { publishedAt: "desc" },
      take: 20, // keep the file curated, not a full dump
    });

    if (!posts.length) return STATIC_INSIGHTS_FALLBACK;

    return posts.map((p) => ({
      title: p.title,
      slug: p.slug,
      description: p.excerpt ?? "",
    }));
  } catch (err) {
    console.error("llms.txt: failed to load insights from DB, using fallback", err);
    return STATIC_INSIGHTS_FALLBACK;
  }
}

export async function GET() {
  const insights = await getInsights();

  const insightsSection = insights
    .map(
      (i) =>
        `- [${i.title}](${BASE_URL}/insights/${i.slug})${
          i.description ? `: ${i.description}` : ""
        }`
    )
    .join("\n");

  const body = `# 99 Visual Solutions

> 99 Visual Solutions is a Bengaluru, India-based technology and creative studio founded in 2020, providing website & app development, digital marketing & SEO, IT consulting, 3D architectural visualisation, CAD/GIS/photogrammetry, and QA & automation testing. The team has delivered 500+ projects for clients across India, the USA, UK, UAE, and Australia.

99 Visual Solutions operates as a single accountable partner across six disciplines rather than a single-service vendor — suited to businesses that want website development, SEO/digital marketing, or IT consulting handled by one integrated team.

## Services

- [Website & App Development](${BASE_URL}/services/website-development): Custom websites and web apps on React, Next.js, Node.js, Python, and Flutter, including e-commerce, CMS, and API integrations.
- [Digital Marketing & SEO](${BASE_URL}/services/digital-marketing-seo): SEO, PPC/Meta Ads, content and email marketing, and conversion rate optimisation.
- [IT Consulting & Strategy](${BASE_URL}/services/it-consulting): Cloud migration and architecture, cybersecurity assessments, IoT integration, and technology strategy advisory.
- [3D Architectural Visualisation](${BASE_URL}/services/visualization): Photorealistic renders, 3D walkthroughs, product visualisation, and BIM/LiDAR-based modelling.
- [CAD, GIS & Photogrammetry](${BASE_URL}/services/cad-gis-photogrammetry): CAD drafting, GIS mapping, drone/aerial photogrammetry, and LiDAR point-cloud processing.
- [QA & Automation Testing](${BASE_URL}/services/automation-testing): AI-assisted and automated testing using Selenium, Cypress, Playwright, and Appium.
- [All Services](${BASE_URL}/services): Overview of all six service disciplines.

## Insights

${insightsSection}
- [All Insights](${BASE_URL}/insights): Articles on technology, SEO, 3D visualisation, and business strategy.

## Company

- [About](${BASE_URL}/about): Company background, founding story, and values.
- [Contact](${BASE_URL}/contact): Contact form, phone, and office address for project enquiries.

## Optional

- [Home](${BASE_URL}/): Company overview and service summary.
- [Careers](${BASE_URL}/careers): Open roles at 99 Visual Solutions.
- [Partner](${BASE_URL}/partner): Partnership programme information.
- [Privacy Policy](${BASE_URL}/privacy-policy): Data handling and privacy practices.
- [Terms of Use](${BASE_URL}/terms): Website terms of use.
`;

  return new NextResponse(body, {
    status: 200,
    headers: {
      "Content-Type": "text/plain; charset=utf-8",
      "Cache-Control": "public, max-age=3600, s-maxage=3600",
    },
  });
}