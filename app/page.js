// app/page.js
import React from 'react';
import Header from './components/header';
import Footer from './components/footer';
import HomeScreenSlider from './components/homeslider';
import Clientcarousel from './components/clientcarousel';
import ImageGallery from './components/imagegallery';
import FloatingButtons from './components/floatingbuttons';
import PowerebySection from './components/powerdbysection';
export default function HomePage() {
  return (
    <>
    <Header />
    <HomeScreenSlider/>    
    <PowerebySection/>
    <Clientcarousel/>
    <ImageGallery/>
    <main className="min-h-screen flex flex-col items-center justify-center bg-gray-100 text-gray-900">
      <h1 className="text-4xl font-bold mb-4">Welcome to Our Website</h1>
      <p className="text-lg">Explore our services and get in touch!</p>
    </main>
    <Footer/>
    <FloatingButtons/>
    </>
    
  );
}
