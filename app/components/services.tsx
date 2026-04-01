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
MAIN COMPONENT
===================================================== */

export default function VisualizationClient() {
  return (
    <>
      {SERVICE_SECTIONS.map((service) => (
        <ServiceSection key={service.id} {...service} />
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
"Whether you are planning a residential development, commercial complex, or large-scale infrastructure project, our architectural visualization services help communicate design intent long before construction begins."
],
extra: [
{ type: "heading", text: "Bringing Designs to Life with Photorealistic Rendering" },

{ type: "text", text: "Architectural plans and blueprints provide essential technical details, but they often lack the emotional connection needed to communicate a vision. Our 3D architectural rendering services transform these technical drawings into realistic images that showcase materials, lighting, textures, and spatial relationships." },

{ type: "text", text: "With advanced rendering techniques and physically accurate lighting simulations, we create visuals that look remarkably close to real photographs. This allows architects and developers to confidently present projects to investors, planning authorities, and potential buyers." },

{ type: "text", text: "From modern urban developments to luxury residential projects, our visualizations help audiences visualize how a design will look, feel, and function in the real world." },

{ type: "heading", text: "Accurate 3D Models Built from Professional CAD Data" },

{ type: "text", text: "Every successful visualization begins with a precise digital model. Our team builds high-accuracy architectural 3D models using professional CAD drawings, floor plans, and construction documents as the foundation." },
{ type: "text", text: "Each element—from structural components to furniture layouts—is modeled with careful attention to proportion, scale, and architectural detail. This ensures that the final visualization accurately represents the intended design while maintaining technical integrity." },
{ type: "heading", text: "Enhancing Project Presentations and Marketing" },
{ type: "text", text: "Architectural 3D renderings play a powerful role in real estate marketing and project presentations. Developers and marketing teams use our visuals to promote upcoming developments through brochures, websites, advertisements, and digital campaigns." },
{ type: "text", text: "Our renderings highlight the architectural character of a project, showcasing materials, landscaping, lighting, and environmental context. These visuals allow potential buyers and investors to see the future of a project before construction begins, helping build confidence and excitement around the development." },
{ type: "heading", text: "Services we provide:" },
{ type: "text", text: "➠ Architectural 3D modeling from CAD drawings and plans" },
{ type: "text", text: "➠ Photorealistic architectural rendering" },
{ type: "text", text: "➠ Exterior and interior architectural visualization" },
{ type: "text", text: "➠ Real estate marketing renderings" },
{ type: "text", text: "➠ Urban and landscape visualization" },
{ type: "text", text: "➠ Architectural concept visualization" },
]
},

{
id: "interior",
title: "3D Interior Rendering",
imagePrefix: "interior",
reverse: true,
intro: [
"We specialize in creating high-quality 3D interior rendering that transforms interior design concepts into realistic and visually engaging spaces. Our interior visualization services help designers, architects, developers, and property owners present their ideas with clarity, precision, and emotional impact.",
"Whether it is a luxury residential interior, modern office environment, retail showroom, or hospitality space, our interior renderings allow stakeholders to experience the design long before the physical space is built."
],
extra: [
{ type: "heading", text: "Transforming Interior Concepts into Realistic Visual Experiences" },
{ type: "text", text: "Interior designs often begin as sketches, mood boards, or technical drawings, which can be difficult for clients to fully visualize. Our 3D interior rendering services bridge that gap by converting design concepts into lifelike visual representations." },
{ type: "text", text: "Through detailed modeling, realistic textures, and advanced lighting techniques, we recreate interior environments that showcase furniture placement, material finishes, lighting ambience, and spatial flow. These visualizations help clients clearly understand how a space will look, feel, and function." },
{ type: "text", text: "By presenting designs in a visually immersive way, interior designers and architects can communicate their ideas more effectively and ensure alignment with client expectations." },
{ type: "heading", text: "Photorealistic Interior Visualizations with Accurate Details" },
{ type: "text", text: "Our team focuses on producing photorealistic interior renderings that accurately reflect the designer’s vision. Every detail—from wall finishes and flooring materials to furniture, décor, and lighting—is carefully crafted to create an authentic and visually compelling environment." },
{ type: "text", text: "Using advanced rendering technologies and realistic lighting simulations, we create visuals that replicate natural and artificial lighting conditions, allowing viewers to experience the atmosphere of the space." },
{ type: "text", text: "These high-quality renderings help clients evaluate design options, explore different material choices, and make confident decisions before construction or renovation begins." },
{ type: "heading", text: "Services we provide:" },
{ type: "text", text: "➠ Photorealistic 3D interior rendering" },
{ type: "text", text: "➠ Residential interior visualization" },
{ type: "text", text: "➠ Commercial and office interior rendering" },
{ type: "text", text: "➠ Hospitality and retail interior visualization" },
{ type: "text", text: "➠ Furniture, lighting, and material visualization" },
{ type: "text", text: "➠ Interior concept design visualization" },
]
},

{
id: "floorplan",
title: "2D & 3D Floor Plan Visualization",
imagePrefix: "floorplan",
intro: [
"We specialize in creating high-quality 2D and 3D floor plan visualizations that transform architectural layouts into clear, engaging, and easy-to-understand visual representations. Our floor plan visualization services help architects, real estate developers, interior designers, and property marketers present spatial layouts with clarity and precision.",
"Whether it is a residential apartment, luxury villa, commercial building, office space, or large-scale development, our floor plan visualizations allow clients and buyers to understand the design, structure, and flow of a property before construction begins."
],
extra: [
{ type: "heading", text: "Transforming Architectural Layouts into Clear Visual Plans" },
{ type: "text", text: "Architectural floor plans are often presented as technical drawings that can be difficult for non-technical audiences to interpret. Our 2D and 3D floor plan visualization services bridge this gap by transforming complex layouts into clear and visually engaging representations." },
{ type: "text", text: "Through accurate scaling, structured layout design, and well-organized spatial elements, we create floor plans that clearly display room layouts, circulation paths, furniture placement, and functional areas." },
{ type: "heading", text: "Detailed and Realistic 3D Floor Plan Visualizations" },
{ type: "text", text: "Our 3D floor plan rendering services provide a more immersive way to experience the layout of a space. By converting traditional floor plans into three-dimensional visualizations, we bring depth, perspective, and realism to architectural layouts." },
{ type: "text", text: "Using detailed modelling, realistic textures, and carefully designed lighting, we create floor plans that showcase interior arrangements, furniture placement, materials, and spatial proportions." },
{ type: "text", text: "These visualizations are widely used in real estate marketing, architectural presentations, property listings, and development proposals, helping potential buyers and stakeholders clearly visualize the property layout and design intent." },
{ type: "heading", text: "Services we provide:" },
{ type: "text", text: "➠ Professional 2D architectural floor plan visualization" },
{ type: "text", text: "➠ Realistic 3D floor plan rendering" },
{ type: "text", text: "➠ Furniture layout and interior space visualization" },
{ type: "text", text: "➠ Real estate marketing floor plans" },
{ type: "text", text: "➠ Residential and commercial floor plan visualization" },
{ type: "text", text: "➠ Colored and textured presentation floor plans" },
{ type: "text", text: "➠ Interactive and presentation-ready layout visuals" },
]
},

{
id: "productmodelling",
title: "Product Modelling & Rendering",
imagePrefix: "productmodelling",
reverse: true,
intro: [
"We specialize in creating high-quality 3D product modelling and rendering that transforms product concepts into visually striking and realistic presentations. Our product visualization services help businesses, designers, manufacturers, and marketing teams showcase their products with precision, clarity, and strong visual impact.",
"Whether it is a consumer product, industrial equipment, furniture design, electronics, or packaging concept, our 3D product renderings allow brands to present their products in the most compelling way even before manufacturing begins."
],
extra: [
{ type: "heading", text: "Transforming Product Ideas into Realistic Visual Representations" },
{ type: "text", text: "Many products start as sketches, technical drawings, or CAD models that may be difficult for customers or stakeholders to fully understand. Our 3D product modelling and rendering services bridge that gap by converting these concepts into lifelike visual experiences." },
{ type: "text", text: "Through precise 3D modelling, accurate materials, and realistic lighting setups, we create visuals that highlight every important detail — from product shape and structure to textures, finishes, and reflections." },
{ type: "heading", text: "Photorealistic Product Visualizations for Marketing & Presentation" },
{ type: "text", text: "Our team focuses on delivering photorealistic product renderings that enhance product presentation and brand identity. Each model is carefully crafted with attention to geometry, surface textures, and lighting to produce visuals that look almost identical to real photographs." },
{ type: "text", text: "By using advanced rendering techniques, we simulate realistic lighting, shadows, and reflections to create high-impact images suitable for e-commerce, advertising, product catalogs, packaging, and digital marketing campaigns." },
{ type: "text", text: "These visualizations enable companies to launch marketing campaigns earlier, test design variations, and present products professionally without the need for physical prototypes or costly photoshoots." },
{ type: "heading", text: "Services we provide:" },
{ type: "text", text: "➠ Photorealistic 3D product modelling and rendering" },
{ type: "text", text: "➠ Consumer product visualization" },
{ type: "text", text: "➠ Industrial product and mechanical rendering" },
{ type: "text", text: "➠ Product design concept visualization" },
{ type: "text", text: "➠ Product packaging visualization" },
{ type: "text", text: "➠ E-commerce and marketing product renderings" },
]
},

{
id: "flyover",
title: "Walkthrough & Flyover",
intro: [
"We specialize in creating high-quality 3D flyover and walkthrough visualizations that transform architectural and development concepts into immersive visual experiences. Our visualization services help architects, real estate developers, planners, and marketing teams present projects in a dynamic and engaging way.",
"Whether it is a residential township, commercial complex, real estate development, infrastructure project, or urban master plan, our 3D flyover and walkthrough animations allow viewers to explore the design long before the project is built."
],
extra: [
{ type: "heading", text: "Bringing Architectural Projects to Life Through Motion Graphics" },
{ type: "text", text: "Architectural drawings and still renderings provide valuable information, but they often lack the immersive experience needed to fully communicate a project's vision. Our 3D flyover and walkthrough services bridge this gap by turning architectural designs into animated visual narratives." },
{ type: "text", text: "Through carefully designed camera movements, realistic environments, and cinematic transitions, we create animations that guide viewers through the project, showcasing building exteriors, surrounding landscapes, infrastructure layouts, and key architectural elements." },
{ type: "heading", text: "Cinematic Visualization with Realistic Environments" },
{ type: "text", text: "Our team focuses on producing high-quality 3D walkthrough and flyover animations that combine realistic modelling, natural lighting, and detailed environments to create compelling visual experiences." },
{ type: "text", text: "Using advanced rendering techniques, we simulate daylight conditions, landscaping elements, vehicles, people, and environmental details to bring projects to life with a cinematic feel." },
{ type: "text", text: "These animations are widely used in real estate marketing, investor presentations, project approvals, and promotional campaigns, helping audiences clearly visualize the scale, design, and atmosphere of the development." },
{ type: "heading", text: "Services we provide:" },
{ type: "text", text: "➠ Architectural 3D walkthrough animations" },
{ type: "text", text: "➠ Real estate flyover visualization" },
{ type: "text", text: "➠ Township and master plan flyover animations" },
{ type: "text", text: "➠ Residential and commercial project walkthroughs" },
{ type: "text", text: "➠ Infrastructure and urban development visualization" },
{ type: "text", text: "➠ Cinematic promotional animations for real estate projects" },
]
},

{
id: "interactive",
title: "Interactive Visualization Tour",

reverse: true,
intro: [
"We specialize in creating immersive interactive visualization tours that allow users to explore spaces, products, and environments in a dynamic and engaging way. Our interactive visualization services enable architects, developers, real estate professionals, and businesses to present their projects with a highly engaging digital experience.",
"Unlike traditional images or videos, an interactive visualization tour allows viewers to navigate through spaces, change perspectives, and interact with different elements of the design. This gives clients and stakeholders a deeper understanding of the project long before it is built."
],
extra: [
{ type: "heading", text: "Transforming Visual Presentations into Interactive Experiences" },
{ type: "text", text: "Traditional visualizations such as images or animations show a project from predefined angles, but interactive visualization tours give viewers full control over how they explore the environment." },
{ type: "text", text: "Our interactive visualization technology allows users to move through spaces, zoom into details, and explore different areas of a design in real time. This interactive approach provides a more engaging and informative experience for clients, investors, and potential buyers." },
{ type: "text", text: "By enabling real-time interaction, these tours help users better understand spatial layouts, design elements, materials, and overall project atmosphere." },
{ type: "heading", text: "Real-Time Exploration with Immersive Digital Environments" },
{ type: "text", text: "Our team creates highly detailed and responsive interactive environments that replicate real-world spaces with impressive realism. Through advanced rendering and interactive technologies, we build digital experiences where users can explore projects freely and intuitively." },
{ type: "heading", text: "Services we provide:" },
{ type: "text", text: "➠ Interactive 3D architectural tours" },
{ type: "text", text: "➠ Real estate virtual property tours" },
{ type: "text", text: "➠ Interior interactive walkthrough experiences" },
{ type: "text", text: "➠ Virtual showroom and product exploration" },
{ type: "text", text: "➠ Interactive design presentations" },
{ type: "text", text: "➠ Real-time visualization environments" },
]
},

{
id: "animation",
title: "Animation & Motion Visualization",

intro: [
"We specialize in creating high-quality animation and motion visualization that transforms static concepts into dynamic and engaging visual experiences. Our animation services help architects, designers, developers, and businesses present their ideas through compelling motion graphics and cinematic storytelling.",
"Whether it is an architectural project, product presentation, real estate development, marketing campaign, or conceptual design, our motion visualizations bring ideas to life and help audiences understand projects in a clear and engaging way."
],
extra: [
{ type: "heading", text: "Turning Static Designs into Dynamic Visual Stories" },
{ type: "text", text: "Our animation and motion visualization services transform still designs into dynamic visual narratives that guide viewers through the project. Through carefully planned camera movements, smooth transitions, and cinematic storytelling, we create animations that clearly showcase design features, spatial relationships, and product functionality." },
{ type: "heading", text: "Cinematic Motion Graphics with Realistic Visual Detail" },
{ type: "text", text: "Our team focuses on producing high-quality motion visualizations that combine detailed 3D modelling, realistic lighting, and fluid animation techniques. Every scene is carefully designed to deliver smooth motion, engaging visuals, and a professional cinematic feel." },
{ type: "text", text: "Using advanced animation tools and rendering technologies, we create visuals that highlight design elements, product features, environmental context, and architectural details with clarity and precision." },
{ type: "text", text: "These animations are widely used in real estate marketing, product launches, advertising campaigns, architectural presentations, and digital media, helping businesses present their ideas in a visually compelling and professional way." },
{ type: "heading", text: "Services we provide:" },
{ type: "text", text: "➠ 3D architectural animation" },
{ type: "text", text: "➠ Product animation and motion visualization" },
{ type: "text", text: "➠ Real estate promotional animations" },
{ type: "text", text: "➠ Motion graphics for marketing and presentations" },
{ type: "text", text: "➠ Cinematic visual storytelling" },
{ type: "text", text: "➠ High-quality presentation and promotional animations" },
]
},

{
id: "marketing",
title: "Visualization Services for Marketing",

reverse: true,
intro: [
"We specialize in delivering high-impact visualization services for marketing that help businesses present their products, properties, and concepts through compelling visual content. Our marketing visualizations enable brands, real estate developers, architects, and companies to communicate their ideas more effectively and capture audience attention.",
"In today’s competitive market, powerful visuals play a crucial role in attracting customers and conveying value. Our visualization services transform design concepts and products into visually engaging marketing assets that enhance brand presentation and drive customer interest."
],
extra: [
{ type: "heading", text: "Transforming Ideas into Powerful Marketing Visuals" },
{ type: "text", text: "Marketing campaigns often require visuals that clearly communicate the features, benefits, and experience of a product or property. Our visualization services for marketing help convert design concepts and technical data into attractive visual content that resonates with audiences." },
{ type: "text", text: "Through photorealistic renderings, animations, and digital visual storytelling, we create marketing visuals that highlight key elements such as design details, product functionality, spatial layouts, and brand identity." },
{ type: "text", text: "These visual assets help businesses present their ideas more effectively across websites, advertising campaigns, brochures, presentations, and social media platforms." },
{ type: "heading", text: "High-Quality Visual Content for Modern Marketing" },
{ type: "text", text: "Our team focuses on creating high-quality visualizations designed specifically for marketing and promotional use. By combining advanced rendering techniques, realistic lighting, and creative composition, we produce visuals that capture attention and communicate messages clearly." },
{ type: "text", text: "These visualizations can be used across various marketing channels including real estate listings, online product stores, promotional videos, digital advertisements, and investor presentations." },
{ type: "text", text: "By using professional marketing visuals, businesses can promote their products or projects more effectively, build stronger brand credibility, and create a memorable impression for potential customers." },
{ type: "heading", text: "Services we provide:" },
{ type: "text", text: "➠ Real estate marketing visuals and promotional renders" },
{ type: "text", text: "➠ Product marketing visualization" },
{ type: "text", text: "➠ Advertising and promotional visual content" },
{ type: "text", text: "➠ Social media and digital campaign visuals" },
{ type: "text", text: "➠ Visual content for brochures, websites, and presentations" },

]
},

{
id: "gameart",
title: "Game Art Visualization",
imagePrefix: "gameart",
intro: [
"We specialize in creating high-quality game art visualization that brings digital worlds, characters, and environments to life with stunning visual detail. Our game visualization services help game developers, studios, and creative teams transform ideas and concepts into immersive visual experiences.",
"From environment design and character visualization to asset creation and cinematic scenes, our game art solutions help developers present their creative vision with clarity and artistic precision."

],
extra: [
{ type: "heading", text: "Transforming Game Concepts into Immersive Visual Worlds" },
{ type: "text", text: "Game development often begins with concept sketches, design references, or storyboards that outline the creative direction of a project. Our game art visualization services transform these ideas into detailed visual assets that define the game’s environment, mood, and artistic style." },
{ type: "text", text: "Whether it is for mobile games, PC games, console titles, or virtual experiences, our visualizations help communicate the look, atmosphere, and style of a game before full development begins." },
{ type: "text", text: "Through advanced 3D modelling, texturing, lighting, and digital artistry, we create visuals that showcase game environments, characters, props, and interactive elements with impressive clarity." },
{ type: "heading", text: "High-Quality Visual Assets for Game Development" },
{ type: "text", text: "Our team focuses on producing high-quality game art visuals that combine creativity with technical precision. By using modern 3D tools and rendering techniques, we create assets that align with the artistic direction and performance requirements of modern games." },
{ type: "text", text: "From stylized game environments to realistic cinematic scenes, our visualizations help developers design immersive worlds that engage players and enhance the overall gaming experience." },

{ type: "heading", text: "Services We Provide" },
{ type: "text", text: "➠ Game environment visualization" },
{ type: "text", text: "➠ Character and asset visualization" },
{ type: "text", text: "➠ 3D game prop and object modelling" },
{ type: "text", text: "➠ Concept art visualization for games" },
{ type: "text", text: "➠ Cinematic game scene rendering" },
{ type: "text", text: "➠ Game promotional artwork and visuals" },
{ type: "text", text: "➠ Visual assets for game development presentations" },
]
}

];
/* =====================================================
SERVICE SECTION
===================================================== */

function ServiceSection({ id, title, imagePrefix, intro, extra, reverse = false }: any) {

  const [open, setOpen] = useState(false);

  return (
    <>
      <section id={id} className="py-16 px-6 bg-white">
        <div className={`max-w-7xl mx-auto flex flex-col md:flex-row items-center gap-16 ${reverse ? "md:flex-row-reverse" : ""}`}>

          {/* MEDIA */}
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

          {/* TEXT */}
          <ServiceText title={title} intro={intro} openModal={() => setOpen(true)} />

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
IMAGE SLIDER (FIXED Z-INDEX)
===================================================== */

function ImageSlider({ imagePrefix, title }: any) {
  return (
    <div className="w-full md:w-[40%]">

      <Swiper
        modules={[Navigation, Pagination, Autoplay]}
        spaceBetween={20}
        slidesPerView={1}
        navigation
        pagination={{ clickable: true }}
        autoplay={{ delay: 3000 }}
        loop
        className="z-0" // 🔥 IMPORTANT FIX
      >
        {[1, 2, 3, 4].map((num) => (
          <SwiperSlide key={num}>
            <div className="aspect-[16/10] relative">
              <Image
                src={`/images/${imagePrefix}${num}.jpg`}
                alt={`${title} visualization ${num}`}
                fill
                className="object-cover rounded-xl"
              />
            </div>
          </SwiperSlide>
        ))}
      </Swiper>

    </div>
  );
}

/* =====================================================
SERVICE TEXT
===================================================== */

function ServiceText({ title, intro, openModal }: any) {
  return (
    <div className="w-full md:w-[60%] space-y-6">

      <h2 className="text-3xl font-bold">{title}</h2>

      {intro.map((text: string, i: number) => (
        <p key={i}>{text}</p>
      ))}

      <button
        onClick={openModal}
        className="px-6 py-3 bg-black text-white rounded hover:bg-gray-800 transition"
      >
        Read More
      </button>

    </div>
  );
}

/* =====================================================
MODAL (FULL FIX)
===================================================== */

function Modal({ title, intro, extra, closeModal }: any) {
  return (
    <div className="fixed inset-0 z-[9999] flex items-center justify-center">

      {/* BACKDROP */}
      <div
        className="absolute inset-0 bg-black/60 backdrop-blur-sm"
        onClick={closeModal}
      />

      {/* CONTENT */}
      <div
        className="relative z-10 bg-white max-w-3xl w-full mx-4 p-8 rounded-2xl shadow-2xl max-h-[90vh] overflow-y-auto"
        onClick={(e) => e.stopPropagation()}
      >

        {/* CLOSE */}
        <button
          onClick={closeModal}
          className="absolute top-4 right-4 text-xl hover:text-black"
        >
          ✕
        </button>

        <h2 className="text-2xl font-bold mb-4">{title}</h2>

        {intro.map((text: string, i: number) => (
          <p key={i} className="mb-2">{text}</p>
        ))}

        <div className="mt-4 space-y-3">
          {extra.map((item: any, i: number) =>
            item.type === "heading" ? (
              <h3 key={i} className="font-semibold text-lg">{item.text}</h3>
            ) : (
              <p key={i}>{item.text}</p>
            )
          )}
        </div>

      </div>
    </div>
  );
}