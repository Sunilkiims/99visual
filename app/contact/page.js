'use client';

import { useEffect, useState } from 'react';
import Header from '../components/header';
import { Mail, MapPin, Phone } from 'lucide-react';

const ContactBanner = () => {
  const swirlBackground = {
    backgroundImage: `
      radial-gradient(circle at 30% 30%, rgba(207, 11, 11, 0.1) 0%, transparent 40%),
      radial-gradient(circle at 70% 70%, rgb(148, 148, 148) 0%, transparent 40%),
      repeating-radial-gradient(circle, rgb(1, 44, 1), transparent 10px)
    `,
    animation: 'swirlAnim 20s linear infinite',
    backgroundSize: '200% 200%',
    filter: 'blur(1px)',
    opacity: 0.4,
  };

  const [particles, setParticles] = useState([]);

  useEffect(() => {
    const generatedParticles = Array.from({ length: 50 }).map(() => ({
      top: `${Math.random() * 100}%`,
      left: `${Math.random() * 100}%`,
      size: `${Math.random() * 4 + 1}px`,
      delay: `${Math.random() * 5}s`,
    }));
    setParticles(generatedParticles);
  }, []);

  return (
    <section className="relative h-64 md:h-40 flex items-center justify-center bg-black overflow-hidden">
      <style>
        {`
          @keyframes swirlAnim {
            0% { background-position: 0% 0%; }
            100% { background-position: 100% 100%; }
          }
          @keyframes zoomIn {
            0% { transform: scale(0.8); opacity: 0; }
            100% { transform: scale(1); opacity: 1; }
          }
          .zoom-in {
            animation: zoomIn 1.2s ease-out forwards;
          }
        `}
      </style>

      {/* Animated swirl background */}
      <div className="absolute inset-0 z-0" style={swirlBackground} />

      {/* Glowing Particles */}
      <div className="absolute inset-0 z-0">
        {particles.map((particle, i) => (
          <span
            key={i}
            style={{
              top: particle.top,
              left: particle.left,
              width: particle.size,
              height: particle.size,
              animationDelay: particle.delay,
            }}
            className="absolute bg-white rounded-full blur-sm opacity-40 animate-ping"
          />
        ))}
      </div>

      {/* Text with zoom-in animation */}
      <h1 className="absolute top-4/5 left-1/2 transform -translate-x-1/2 -translate-y-1/2 text-white text-3xl md:text-4xl font-semibold tracking-wider z-10 zoom-in">
        CONTACT
      </h1>
    </section>
  );
};

const ContactSection = () => {
  const [captcha, setCaptcha] = useState('');
  const [captchaInput, setCaptchaInput] = useState('');

  const generateCaptcha = () => {
    const characters = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
    let result = '';
    for (let i = 0; i < 6; i++) {
      result += characters.charAt(Math.floor(Math.random() * characters.length));
    }
    setCaptcha(result);
  };

  useEffect(() => {
    generateCaptcha();
  }, []);

  const handleSubmit = (e) => {
    e.preventDefault();
    if (captchaInput !== captcha) {
      alert('Captcha does not match!');
      generateCaptcha();
      return;
    }
    alert('Form submitted successfully.');
    // Continue with form submission logic
  };

  return (
    <section className="bg-gray-100 py-16 px-6 md:px-16">
      <div className="max-w-7xl mx-auto grid md:grid-cols-2 gap-12 items-start">
        {/* Contact Info */}
        <div>
          <h2 className="text-4xl font-bold mb-6 text-gray-800">Contact Us</h2>
          <p className="mb-6 text-gray-600">We'd love to hear from you. Reach out with questions, proposals, or feedback.</p>
          <ul className="space-y-5 text-gray-700">
            <li className="flex items-center gap-3">
              <MapPin className="text-red-500" />
              123 Innovation Street, Bangalore, India
            </li>
            <li className="flex items-center gap-3">
              <Phone className="text-green-500" />
              +91 98765 43210
            </li>
            <li className="flex items-center gap-3">
              <Mail className="text-blue-500" />
              contact@99visual.com
            </li>
          </ul>
        </div>

        {/* Contact Form */}
        <form onSubmit={handleSubmit} className="bg-white p-8 shadow-xl rounded-2xl space-y-6 w-full">
          <div>
            <label className="block mb-2 text-gray-700">Name</label>
            <input type="text" className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring focus:ring-blue-300" placeholder="Your Name" required />
          </div>
          <div>
            <label className="block mb-2 text-gray-700">Email</label>
            <input type="email" className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring focus:ring-blue-300" placeholder="you@example.com" required />
          </div>
          <div>
            <label className="block mb-2 text-gray-700">Subject</label>
            <input type="text" className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring focus:ring-blue-300" placeholder="Message Subject" />
          </div>
          <div>
            <label className="block mb-2 text-gray-700">Message</label>
            <textarea className="w-full px-4 py-2 border border-gray-300 rounded-md resize-none focus:outline-none focus:ring focus:ring-blue-300" placeholder="Your message..." rows={4} required />
          </div>
          <div>
            <label className="block mb-2 text-gray-700">Captcha</label>
            <div className="flex items-center gap-4">
              <div className="h-12 w-32 bg-gray-200 border border-gray-300 rounded-md flex items-center justify-center font-bold text-lg select-none">
                {captcha}
              </div>
              <input
                type="text"
                className="flex-1 px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring focus:ring-blue-300"
                placeholder="Enter Captcha Code"
                value={captchaInput}
                onChange={(e) => setCaptchaInput(e.target.value)}
                required
              />
            </div>
          </div>
          <button type="submit" className="w-full bg-blue-600 hover:bg-blue-700 text-white font-medium py-2 rounded-md transition duration-300">
            Send Message
          </button>
        </form>
      </div>
    </section>
  );
};

export default function ContactPage() {
  return (
    <>
      <Header />
      <ContactBanner />
      <ContactSection />
    </>
  );
}
