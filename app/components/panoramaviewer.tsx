"use client";

import { useEffect, useRef } from "react";

export default function PanoramaViewer() {

const containerRef = useRef<HTMLDivElement | null>(null);

useEffect(() => {

if (!(window as any).pannellum || !containerRef.current) return;

const viewer = (window as any).pannellum.viewer(containerRef.current, {
type: "equirectangular",
panorama: "/panoramas/luxury-apartment.jpg",
autoLoad: true,
hfov: 110,
pitch: 10,
yaw: 180,
showZoomCtrl: true,
showFullscreenCtrl: true
});

setTimeout(() => viewer.resize(), 300);

}, []);

return (

<div className="w-full md:w-[40%]">

<div
ref={containerRef}
style={{
width: "100%",
height: "320px"
}}
className="rounded-2xl overflow-hidden shadow-xl"
/>

</div>

);

}