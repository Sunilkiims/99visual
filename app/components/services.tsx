'use client';
import { useState } from "react";
import Image from "next/image";
import VideoShowcase from "@/app/components/videoshowcase";
import AnimationVideo from "@/app/components/animationvideo";
import Marketing from "@/app/components/marketing";
import PanoramicViewer from "@/app/components/panoramaviewer";

import { Swiper, SwiperSlide } from "swiper/react";
import { Navigation, Pagination, Autoplay } from "swiper/modules";

import "swiper/css";
import "swiper/css/navigation";
import "swiper/css/pagination";

/* =====================================================
   DESIGN TOKENS — injected once at the top
===================================================== */
const GLOBAL_STYLES = `
  @import url('https://fonts.googleapis.com/css2?family=Cormorant+Garamond:ital,wght@0,300;0,600;0,700;1,400&family=DM+Sans:wght@300;400;500;600&display=swap');

  :root {
    --c-bg:         #080808;
    --c-surface:    #0f0f0f;
    --c-surface2:   #141414;
    --c-border:     rgba(255,255,255,0.07);
    --c-orange:     #f97316;
    --c-orange-dim: rgba(249,115,22,0.12);
    --c-muted:      rgba(255,255,255,0.45);
    --c-muted2:     rgba(255,255,255,0.65);
    --ff-serif:     'Cormorant Garamond', serif;
    --ff-sans:      'DM Sans', sans-serif;
  }

  /* ── SERVICE SECTION ── */
  .vs-section {
    padding: 5rem 1.5rem;
    border-bottom: 1px solid var(--c-border);
    position: relative;
  }
  .vs-section:nth-child(odd)  { background: var(--c-surface); }
  .vs-section:nth-child(even) { background: var(--c-bg); }

  /* Normal: media(3fr) left | content(4fr) right */
  .vs-section__inner {
    max-width: 1200px; margin: 0 auto;
    display: grid; grid-template-columns: 3fr 4fr;
    gap: 4rem; align-items: center;
  }
  /* Reverse: content(4fr) left | media(3fr) right */
  .vs-section__inner--reverse {
    max-width: 1200px; margin: 0 auto;
    display: grid; grid-template-columns: 4fr 3fr;
    gap: 4rem; align-items: center;
  }

  @media (max-width: 768px) {
    .vs-section__inner,
    .vs-section__inner--reverse {
      grid-template-columns: 1fr; gap: 2.5rem;
    }
    .vs-section__inner > *,
    .vs-section__inner--reverse > * { order: unset !important; }
  }

  /* ── MEDIA WRAPPER ── */
  .vs-media {
    position: relative; border-radius: 16px; overflow: hidden;
    border: 1px solid var(--c-border);
  }
  .vs-media::before {
    content: ''; position: absolute; inset: 0; z-index: 1; pointer-events: none;
    background: linear-gradient(135deg, rgba(249,115,22,.08), transparent 60%);
    border-radius: 16px;
  }

  /* ── SWIPER OVERRIDES ── */
  .vs-swiper .swiper-button-next,
  .vs-swiper .swiper-button-prev {
    color: var(--c-orange) !important;
  }
  .vs-swiper .swiper-pagination-bullet-active {
    background: var(--c-orange) !important;
  }
  .vs-swiper .swiper-pagination-bullet {
    background: rgba(255,255,255,0.3) !important;
  }

  /* ── TEXT BLOCK ── */
  .vs-text { position: relative; }

  .vs-text__num {
    font-family: var(--ff-serif);
    font-size: clamp(3.5rem, 6vw, 5.5rem);
    font-weight: 700; line-height: 1;
    color: transparent; -webkit-text-stroke: 1px rgba(249,115,22,.18);
    position: absolute; top: -1.5rem; left: 0;
    pointer-events: none; user-select: none;
  }
  .vs-text__eyebrow {
    font-family: var(--ff-sans); font-size: 9px; font-weight: 500;
    letter-spacing: .22em; text-transform: uppercase;
    color: var(--c-orange); margin-bottom: .9rem; display: block;
  }
  .vs-text__h2 {
    font-family: var(--ff-serif);
    font-size: clamp(1.6rem, 3vw, 2.4rem);
    font-weight: 700; line-height: 1.15; letter-spacing: -.01em;
    color: #fff; margin: 0 0 .6rem;
  }
  .vs-text__rule {
    width: 32px; height: 1px;
    background: linear-gradient(90deg, var(--c-orange), transparent);
    margin: 0 0 1.4rem;
  }
  .vs-text__p {
    font-family: var(--ff-sans); font-size: .95rem;
    font-weight: 300; line-height: 1.85; color: var(--c-muted);
    margin-bottom: .8rem;
  }
  .vs-text__btn {
    display: inline-flex; align-items: center; gap: 8px;
    font-family: var(--ff-sans); font-size: 10px; font-weight: 600;
    letter-spacing: .14em; text-transform: uppercase; color: #080808;
    background: linear-gradient(135deg, #fb923c, #f97316);
    padding: 12px 28px; border-radius: 100px; border: none; cursor: pointer;
    box-shadow: 0 8px 24px rgba(249,115,22,.3);
    transition: transform .2s ease, box-shadow .2s ease;
    margin-top: .5rem;
  }
  .vs-text__btn:hover {
    transform: translateY(-2px) scale(1.04);
    box-shadow: 0 14px 36px rgba(249,115,22,.5);
  }

  /* ── MODAL ── */
  .vs-modal-backdrop {
    position: fixed; inset: 0; z-index: 9999;
    background: rgba(0,0,0,.75); backdrop-filter: blur(8px);
    display: flex; align-items: center; justify-content: center;
  }
  .vs-modal {
    position: relative; z-index: 10;
    background: var(--c-surface2);
    border: 1px solid var(--c-border);
    max-width: 720px; width: 100%; margin: 1rem;
    padding: 2.5rem; border-radius: 20px;
    box-shadow: 0 40px 80px rgba(0,0,0,.6);
    max-height: 90vh; overflow-y: auto;
  }
  .vs-modal__close {
    position: absolute; top: 1.2rem; right: 1.4rem;
    background: none; border: none; cursor: pointer;
    color: var(--c-muted); font-size: 1.1rem; line-height: 1;
    transition: color .2s;
  }
  .vs-modal__close:hover { color: #fff; }
  .vs-modal__title {
    font-family: var(--ff-serif);
    font-size: clamp(1.6rem, 3vw, 2.2rem);
    font-weight: 700; line-height: 1.15; color: #fff;
    margin: 0 0 .5rem;
  }
  .vs-modal__rule {
    width: 32px; height: 1px;
    background: linear-gradient(90deg, var(--c-orange), transparent);
    margin: 0 0 1.4rem;
  }
  .vs-modal__intro {
    font-family: var(--ff-sans); font-size: .95rem;
    font-weight: 300; line-height: 1.85; color: var(--c-muted);
    margin-bottom: .7rem;
  }
  .vs-modal__divider {
    width: 100%; height: 1px;
    background: var(--c-border);
    margin: 1.5rem 0;
  }
  .vs-modal__heading {
    font-family: var(--ff-serif);
    font-size: 1.25rem; font-weight: 700;
    color: #fff; margin: 1.4rem 0 .5rem;
  }
  .vs-modal__text {
    font-family: var(--ff-sans); font-size: .9rem;
    font-weight: 300; line-height: 1.8; color: var(--c-muted);
    margin-bottom: .5rem;
  }
  .vs-modal__service {
    font-family: var(--ff-sans); font-size: .88rem;
    font-weight: 400; color: var(--c-muted2);
    display: flex; align-items: flex-start; gap: .6rem;
    margin-bottom: .4rem;
  }
  .vs-modal__service::before {
    content: ''; width: 5px; height: 5px; border-radius: 50%;
    background: var(--c-orange); margin-top: .5rem; flex-shrink: 0;
  }
`;

/* =====================================================
   MAIN COMPONENT
===================================================== */
export default function VisualizationClient() {
  return (
    <>
      <style dangerouslySetInnerHTML={{ __html: GLOBAL_STYLES }} />
      {SERVICE_SECTIONS.map((service, idx) => (
        <ServiceSection key={service.id} index={idx} {...service} />
      ))}
    </>
  );
}

/* =====================================================
   SERVICE DATA
===================================================== */
const SERVICE_SECTIONS = [
  {
    id: "architecture",
    title: "Architectural 3D Modeling & Rendering",
    imagePrefix: "architecture",
    intro: [
      "We specialize in creating high-quality architectural 3D modeling and rendering that turns design concepts into immersive visual experiences.",
      "Whether you are planning a residential development, commercial complex, or large-scale infrastructure project, our architectural visualization services help communicate design intent long before construction begins.",
    ],
    extra: [
      { type: "heading", text: "Bringing Designs to Life with Photorealistic Rendering" },
      { type: "text", text: "Architectural plans and blueprints provide essential technical details, but they often lack the emotional connection needed to communicate a vision. Our 3D architectural rendering services transform these technical drawings into realistic images that showcase materials, lighting, textures, and spatial relationships." },
      { type: "text", text: "With advanced rendering techniques and physically accurate lighting simulations, we create visuals that look remarkably close to real photographs. This allows architects and developers to confidently present projects to investors, planning authorities, and potential buyers." },
      { type: "text", text: "From modern urban developments to luxury residential projects, our visualizations help audiences visualize how a design will look, feel, and function in the real world." },
      { type: "heading", text: "Accurate 3D Models Built from Professional CAD Data" },
      { type: "text", text: "Every successful visualization begins with a precise digital model. Our team builds high-accuracy architectural 3D models using professional CAD drawings, floor plans, and construction documents as the foundation." },
      { type: "text", text: "Each element—from structural components to furniture layouts—is modeled with careful attention to proportion, scale, and architectural detail." },
      { type: "heading", text: "Enhancing Project Presentations and Marketing" },
      { type: "text", text: "Architectural 3D renderings play a powerful role in real estate marketing and project presentations. Developers and marketing teams use our visuals to promote upcoming developments through brochures, websites, advertisements, and digital campaigns." },
      { type: "heading", text: "Services we provide:" },
      { type: "service", text: "Architectural 3D modeling from CAD drawings and plans" },
      { type: "service", text: "Photorealistic architectural rendering" },
      { type: "service", text: "Exterior and interior architectural visualization" },
      { type: "service", text: "Real estate marketing renderings" },
      { type: "service", text: "Urban and landscape visualization" },
      { type: "service", text: "Architectural concept visualization" },
    ],
  },
  {
    id: "interior",
    title: "3D Interior Rendering",
    imagePrefix: "interior",
    reverse: true,
    intro: [
      "We specialize in creating high-quality 3D interior rendering that transforms interior design concepts into realistic and visually engaging spaces.",
      "Whether it is a luxury residential interior, modern office environment, retail showroom, or hospitality space, our interior renderings allow stakeholders to experience the design long before the physical space is built.",
    ],
    extra: [
      { type: "heading", text: "Transforming Interior Concepts into Realistic Visual Experiences" },
      { type: "text", text: "Interior designs often begin as sketches, mood boards, or technical drawings, which can be difficult for clients to fully visualize. Our 3D interior rendering services bridge that gap by converting design concepts into lifelike visual representations." },
      { type: "text", text: "Through detailed modeling, realistic textures, and advanced lighting techniques, we recreate interior environments that showcase furniture placement, material finishes, lighting ambience, and spatial flow." },
      { type: "heading", text: "Photorealistic Interior Visualizations with Accurate Details" },
      { type: "text", text: "Our team focuses on producing photorealistic interior renderings that accurately reflect the designer's vision. Every detail—from wall finishes and flooring materials to furniture, décor, and lighting—is carefully crafted to create an authentic and visually compelling environment." },
      { type: "heading", text: "Services we provide:" },
      { type: "service", text: "Photorealistic 3D interior rendering" },
      { type: "service", text: "Residential interior visualization" },
      { type: "service", text: "Commercial and office interior rendering" },
      { type: "service", text: "Hospitality and retail interior visualization" },
      { type: "service", text: "Furniture, lighting, and material visualization" },
      { type: "service", text: "Interior concept design visualization" },
    ],
  },
  {
    id: "floorplan",
    title: "2D & 3D Floor Plan Visualization",
    imagePrefix: "floorplan",
    intro: [
      "We specialize in creating high-quality 2D and 3D floor plan visualizations that transform architectural layouts into clear, engaging, and easy-to-understand visual representations.",
      "Whether it is a residential apartment, luxury villa, commercial building, or large-scale development, our floor plan visualizations allow clients and buyers to understand the design and flow of a property before construction begins.",
    ],
    extra: [
      { type: "heading", text: "Transforming Architectural Layouts into Clear Visual Plans" },
      { type: "text", text: "Architectural floor plans are often presented as technical drawings that can be difficult for non-technical audiences to interpret. Our 2D and 3D floor plan visualization services bridge this gap by transforming complex layouts into clear and visually engaging representations." },
      { type: "heading", text: "Detailed and Realistic 3D Floor Plan Visualizations" },
      { type: "text", text: "Our 3D floor plan rendering services provide a more immersive way to experience the layout of a space. Using detailed modelling, realistic textures, and carefully designed lighting, we create floor plans that showcase interior arrangements, furniture placement, materials, and spatial proportions." },
      { type: "heading", text: "Services we provide:" },
      { type: "service", text: "Professional 2D architectural floor plan visualization" },
      { type: "service", text: "Realistic 3D floor plan rendering" },
      { type: "service", text: "Furniture layout and interior space visualization" },
      { type: "service", text: "Real estate marketing floor plans" },
      { type: "service", text: "Residential and commercial floor plan visualization" },
      { type: "service", text: "Colored and textured presentation floor plans" },
      { type: "service", text: "Interactive and presentation-ready layout visuals" },
    ],
  },
  {
    id: "productmodelling",
    title: "Product Modelling & Rendering",
    imagePrefix: "productmodelling",
    reverse: true,
    intro: [
      "We specialize in creating high-quality 3D product modelling and rendering that transforms product concepts into visually striking and realistic presentations.",
      "Whether it is a consumer product, industrial equipment, furniture design, electronics, or packaging concept, our 3D product renderings allow brands to present their products in the most compelling way.",
    ],
    extra: [
      { type: "heading", text: "Transforming Product Ideas into Realistic Visual Representations" },
      { type: "text", text: "Our 3D product modelling and rendering services bridge the gap between technical drawings and lifelike visual experiences. Through precise 3D modelling, accurate materials, and realistic lighting setups, we create visuals that highlight every important detail." },
      { type: "heading", text: "Photorealistic Product Visualizations for Marketing & Presentation" },
      { type: "text", text: "Using advanced rendering techniques, we simulate realistic lighting, shadows, and reflections to create high-impact images suitable for e-commerce, advertising, product catalogs, packaging, and digital marketing campaigns." },
      { type: "heading", text: "Services we provide:" },
      { type: "service", text: "Photorealistic 3D product modelling and rendering" },
      { type: "service", text: "Consumer product visualization" },
      { type: "service", text: "Industrial product and mechanical rendering" },
      { type: "service", text: "Product design concept visualization" },
      { type: "service", text: "Product packaging visualization" },
      { type: "service", text: "E-commerce and marketing product renderings" },
    ],
  },
  {
    id: "flyover",
    title: "Walkthrough & Flyover",
    intro: [
      "We specialize in creating high-quality 3D flyover and walkthrough visualizations that transform architectural and development concepts into immersive visual experiences.",
      "Whether it is a residential township, commercial complex, infrastructure project, or urban master plan, our 3D flyover and walkthrough animations allow viewers to explore the design long before the project is built.",
    ],
    extra: [
      { type: "heading", text: "Bringing Architectural Projects to Life Through Motion" },
      { type: "text", text: "Through carefully designed camera movements, realistic environments, and cinematic transitions, we create animations that guide viewers through the project, showcasing building exteriors, surrounding landscapes, infrastructure layouts, and key architectural elements." },
      { type: "heading", text: "Cinematic Visualization with Realistic Environments" },
      { type: "text", text: "Using advanced rendering techniques, we simulate daylight conditions, landscaping elements, vehicles, people, and environmental details to bring projects to life with a cinematic feel." },
      { type: "heading", text: "Services we provide:" },
      { type: "service", text: "Architectural 3D walkthrough animations" },
      { type: "service", text: "Real estate flyover visualization" },
      { type: "service", text: "Township and master plan flyover animations" },
      { type: "service", text: "Residential and commercial project walkthroughs" },
      { type: "service", text: "Infrastructure and urban development visualization" },
      { type: "service", text: "Cinematic promotional animations for real estate projects" },
    ],
  },
  {
    id: "interactive",
    title: "Interactive Visualization Tour",
    reverse: true,
    intro: [
      "We specialize in creating immersive interactive visualization tours that allow users to explore spaces, products, and environments in a dynamic and engaging way.",
      "Unlike traditional images or videos, an interactive visualization tour allows viewers to navigate through spaces, change perspectives, and interact with different elements of the design.",
    ],
    extra: [
      { type: "heading", text: "Transforming Visual Presentations into Interactive Experiences" },
      { type: "text", text: "Our interactive visualization technology allows users to move through spaces, zoom into details, and explore different areas of a design in real time—providing a more engaging and informative experience for clients, investors, and potential buyers." },
      { type: "heading", text: "Real-Time Exploration with Immersive Digital Environments" },
      { type: "text", text: "Our team creates highly detailed and responsive interactive environments that replicate real-world spaces with impressive realism." },
      { type: "heading", text: "Services we provide:" },
      { type: "service", text: "Interactive 3D architectural tours" },
      { type: "service", text: "Real estate virtual property tours" },
      { type: "service", text: "Interior interactive walkthrough experiences" },
      { type: "service", text: "Virtual showroom and product exploration" },
      { type: "service", text: "Interactive design presentations" },
      { type: "service", text: "Real-time visualization environments" },
    ],
  },
  {
    id: "animation",
    title: "Animation & Motion Visualization",
    intro: [
      "We specialize in creating high-quality animation and motion visualization that transforms static concepts into dynamic and engaging visual experiences.",
      "Whether it is an architectural project, product presentation, real estate development, or marketing campaign, our motion visualizations bring ideas to life with cinematic storytelling.",
    ],
    extra: [
      { type: "heading", text: "Turning Static Designs into Dynamic Visual Stories" },
      { type: "text", text: "Through carefully planned camera movements, smooth transitions, and cinematic storytelling, we create animations that clearly showcase design features, spatial relationships, and product functionality." },
      { type: "heading", text: "Cinematic Motion Graphics with Realistic Visual Detail" },
      { type: "text", text: "Using advanced animation tools and rendering technologies, we create visuals that highlight design elements, product features, environmental context, and architectural details with clarity and precision." },
      { type: "heading", text: "Services we provide:" },
      { type: "service", text: "3D architectural animation" },
      { type: "service", text: "Product animation and motion visualization" },
      { type: "service", text: "Real estate promotional animations" },
      { type: "service", text: "Motion graphics for marketing and presentations" },
      { type: "service", text: "Cinematic visual storytelling" },
      { type: "service", text: "High-quality presentation and promotional animations" },
    ],
  },
  {
    id: "marketing",
    title: "Visualization Services for Marketing",
    reverse: true,
    intro: [
      "We specialize in delivering high-impact visualization services for marketing that help businesses present their products, properties, and concepts through compelling visual content.",
      "In today's competitive market, powerful visuals play a crucial role in attracting customers. Our services transform design concepts into visually engaging marketing assets that enhance brand presentation and drive customer interest.",
    ],
    extra: [
      { type: "heading", text: "Transforming Ideas into Powerful Marketing Visuals" },
      { type: "text", text: "Through photorealistic renderings, animations, and digital visual storytelling, we create marketing visuals that highlight key elements such as design details, product functionality, spatial layouts, and brand identity." },
      { type: "heading", text: "High-Quality Visual Content for Modern Marketing" },
      { type: "text", text: "By combining advanced rendering techniques, realistic lighting, and creative composition, we produce visuals that capture attention and communicate messages clearly across websites, advertising campaigns, brochures, and social media." },
      { type: "heading", text: "Services we provide:" },
      { type: "service", text: "Real estate marketing visuals and promotional renders" },
      { type: "service", text: "Product marketing visualization" },
      { type: "service", text: "Advertising and promotional visual content" },
      { type: "service", text: "Social media and digital campaign visuals" },
      { type: "service", text: "Visual content for brochures, websites, and presentations" },
    ],
  },
  {
    id: "gameart",
    title: "Game Art Visualization",
    imagePrefix: "gameart",
    intro: [
      "We specialize in creating high-quality game art visualization that brings digital worlds, characters, and environments to life with stunning visual detail.",
      "From environment design and character visualization to asset creation and cinematic scenes, our game art solutions help developers present their creative vision with clarity and artistic precision.",
    ],
    extra: [
      { type: "heading", text: "Transforming Game Concepts into Immersive Visual Worlds" },
      { type: "text", text: "Our game art visualization services transform concept sketches and design references into detailed visual assets that define the game's environment, mood, and artistic style." },
      { type: "text", text: "Through advanced 3D modelling, texturing, lighting, and digital artistry, we create visuals that showcase game environments, characters, props, and interactive elements with impressive clarity." },
      { type: "heading", text: "High-Quality Visual Assets for Game Development" },
      { type: "text", text: "From stylized game environments to realistic cinematic scenes, our visualizations help developers design immersive worlds that engage players and enhance the overall gaming experience." },
      { type: "heading", text: "Services we provide:" },
      { type: "service", text: "Game environment visualization" },
      { type: "service", text: "Character and asset visualization" },
      { type: "service", text: "3D game prop and object modelling" },
      { type: "service", text: "Concept art visualization for games" },
      { type: "service", text: "Cinematic game scene rendering" },
      { type: "service", text: "Game promotional artwork and visuals" },
      { type: "service", text: "Visual assets for game development presentations" },
    ],
  },
];

/* =====================================================
   SERVICE SECTION
===================================================== */
function ServiceSection({ id, title, imagePrefix, intro, extra, reverse = false, index }: any) {
  const [open, setOpen] = useState(false);
  const num = String(index + 1).padStart(2, "0");

  return (
    <>
      <section id={id} className="vs-section">
        <div className={reverse ? "vs-section__inner--reverse" : "vs-section__inner"}>

          {/* MEDIA — 3fr column */}
          <div
            className="vs-media"
            style={{ order: reverse ? 2 : 1 }}
          >
            {id === "flyover" ? (
              <VideoShowcase />
            ) : id === "interactive" ? (
              <PanoramicViewer />
            ) : id === "animation" ? (
              <AnimationVideo />
            ) : id === "marketing" ? (
              <Marketing />
            ) : (
              <ImageSlider imagePrefix={imagePrefix} title={title} />
            )}
          </div>

          {/* TEXT — 4fr column */}
          <ServiceText
            title={title}
            intro={intro}
            num={num}
            index={index}
            openModal={() => setOpen(true)}
            order={reverse ? 1 : 2}
          />
        </div>
      </section>

      {open && (
        <Modal
          title={title}
          intro={intro}
          extra={extra}
          closeModal={() => setOpen(false)}
        />
      )}
    </>
  );
}

/* =====================================================
   IMAGE SLIDER
===================================================== */
function ImageSlider({ imagePrefix, title }: any) {
  return (
    <Swiper
      modules={[Navigation, Pagination, Autoplay]}
      spaceBetween={0}
      slidesPerView={1}
      navigation
      pagination={{ clickable: true }}
      autoplay={{ delay: 3000 }}
      loop
      className="vs-swiper"
      style={{ borderRadius: "16px" }}
    >
      {[1, 2, 3, 4].map((num) => (
        <SwiperSlide key={num}>
          <div className="aspect-[16/10] relative">
            <Image
              src={`/images/${imagePrefix}${num}.jpg`}
              alt={`${title} visualization ${num}`}
              fill
              className="object-cover"
              style={{ borderRadius: "16px" }}
            />
          </div>
        </SwiperSlide>
      ))}
    </Swiper>
  );
}

/* =====================================================
   SERVICE TEXT
===================================================== */
function ServiceText({ title, intro, num, index, openModal, order }: any) {
  return (
    <div className="vs-text" style={{ order }}>
      <span className="vs-text__num">{num}</span>
      <span className="vs-text__eyebrow">Service {num}</span>
      <h2 className="vs-text__h2">{title}</h2>
      <div className="vs-text__rule" />
      {intro.map((text: string, i: number) => (
        <p key={i} className="vs-text__p">{text}</p>
      ))}
      <button onClick={openModal} className="vs-text__btn">
        Read More
        <svg width="12" height="12" viewBox="0 0 12 12" fill="none">
          <path d="M2 6h8M6 2l4 4-4 4" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
        </svg>
      </button>
    </div>
  );
}

/* =====================================================
   MODAL
===================================================== */
function Modal({ title, intro, extra, closeModal }: any) {
  return (
    <div className="vs-modal-backdrop" onClick={closeModal}>
      <div className="vs-modal" onClick={(e) => e.stopPropagation()}>

        <button className="vs-modal__close" onClick={closeModal} aria-label="Close">✕</button>

        <h2 className="vs-modal__title">{title}</h2>
        <div className="vs-modal__rule" />

        {intro.map((text: string, i: number) => (
          <p key={i} className="vs-modal__intro">{text}</p>
        ))}

        <div className="vs-modal__divider" />

        <div>
          {extra.map((item: any, i: number) => {
            if (item.type === "heading") {
              return <h3 key={i} className="vs-modal__heading">{item.text}</h3>;
            }
            if (item.type === "service") {
              return <div key={i} className="vs-modal__service">{item.text}</div>;
            }
            return <p key={i} className="vs-modal__text">{item.text}</p>;
          })}
        </div>

      </div>
    </div>
  );
}