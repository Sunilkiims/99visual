'use client';

import { useState, ChangeEvent, FormEvent, useEffect } from 'react';
import {
    FaPhoneFlip,
    FaEnvelope,
    FaLocationDot,
    FaHandshake,
    FaFacebookF,
    FaLinkedinIn,
    FaInstagram,
    FaXTwitter,
} from 'react-icons/fa6';
import { motion } from 'framer-motion';

type FormData = {
    name: string;
    email: string;
    message: string;
};

const testimonials = [
    {
        quote: '99Visual transformed our website into a powerful business tool!',
        author: 'Priya S., Tech Startup Founder',
    },
    {
        quote: 'Excellent support and modern design. Highly recommended.',
        author: 'Ramesh K., Marketing Manager',
    },
    {
        quote: 'Professional, quick, and creative team!',
        author: 'Neha M., Retail Business Owner',
    },
];

export default function ContactForm() {
    const [form, setForm] = useState<FormData>({
        name: '',
        email: '',
        message: '',
    });

    const [status, setStatus] = useState<string | null>(null);
    const [loading, setLoading] = useState(false);
    const [testimonialIndex, setTestimonialIndex] = useState(0);

    // ✅ CAPTCHA + Honeypot (ADDED)
    const [captchaQuestion, setCaptchaQuestion] = useState('');
    const [captchaAnswer, setCaptchaAnswer] = useState('');
    const [userCaptcha, setUserCaptcha] = useState('');
    const [honeypot, setHoneypot] = useState('');

    // ✅ Generate CAPTCHA
    useEffect(() => {
        generateCaptcha();
    }, []);

    const generateCaptcha = () => {
        const num1 = Math.floor(Math.random() * 10);
        const num2 = Math.floor(Math.random() * 10);
        setCaptchaQuestion(`${num1} + ${num2}`);
        setCaptchaAnswer(String(num1 + num2));
    };

    const handleChange = (e: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
        setForm({ ...form, [e.target.name]: e.target.value });
    };

    const handleSubmit = async (e: FormEvent) => {
        e.preventDefault();
        setLoading(true);
        setStatus(null);

        // ❌ Honeypot check
        if (honeypot) {
            setStatus('❌ Bot detected');
            setLoading(false);
            return;
        }

        // ❌ CAPTCHA check
        if (userCaptcha !== captchaAnswer) {
            setStatus('❌ Captcha incorrect');
            generateCaptcha();
            setUserCaptcha('');
            setLoading(false);
            return;
        }

        try {
            const res = await fetch('/api/contact', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({
                    ...form,
                    captcha: userCaptcha,
                    expected: captchaAnswer,
                    honeypot,
                }),
            });

            const result = await res.json();

            if (res.ok) {
                setStatus('✅ Thanks for contacting us! We will get back to you soon.');
                setForm({ name: '', email: '', message: '' });
                setUserCaptcha('');
                generateCaptcha();
            } else {
                setStatus(`❌ ${result.message || 'Something went wrong.'}`);
            }
        } catch {
            setStatus('❌ Network error. Please try again later.');
        }

        setLoading(false);
    };

    useState(() => {
        const interval = setInterval(() => {
            setTestimonialIndex((prev) => (prev + 1) % testimonials.length);
        }, 5000);
        return () => clearInterval(interval);
    });

    return (
        <div className="px-6 sm:px-10 lg:px-24 pt-20 space-y-16">
            {/* Contact + Info Section */}
            <div className="grid md:grid-cols-2 gap-10">
                <motion.form
                    onSubmit={handleSubmit}
                    className="space-y-4"
                    initial={{ opacity: 0, x: -30 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ duration: 0.6 }}
                >
                    <h2 className="text-2xl font-bold text-white-600 mt-0">Let's Connect</h2>
                    <p className="text-gray-600">We'd love to hear from you. Send us a message!</p>

                    <input
                        type="text"
                        name="name"
                        value={form.name}
                        onChange={handleChange}
                        placeholder="Your Name"
                        className="w-full border border-gray-300 p-3 rounded-lg shadow-sm"
                        required
                    />

                    <input
                        type="email"
                        name="email"
                        value={form.email}
                        onChange={handleChange}
                        placeholder="Your Email"
                        className="w-full border border-gray-300 p-3 rounded-lg shadow-sm"
                        required
                    />

                    <textarea
                        name="message"
                        value={form.message}
                        onChange={handleChange}
                        placeholder="Your Message"
                        rows={5}
                        className="w-full border border-gray-300 p-3 rounded-lg shadow-sm"
                        required
                    />

                    {/* ✅ CAPTCHA (ADDED UI - same style) */}
                    <div>
                        <label className="block text-sm mb-1 text-gray-600">
                            Solve: <span className="font-semibold">{captchaQuestion}</span>
                        </label>
                        <input
                            type="text"
                            value={userCaptcha}
                            onChange={(e) => setUserCaptcha(e.target.value)}
                            placeholder="Enter answer"
                            className="w-full border border-gray-300 p-3 rounded-lg shadow-sm"
                            required
                        />
                    </div>

                    {/* ✅ Honeypot (hidden) */}
                    <input
                        type="text"
                        value={honeypot}
                        onChange={(e) => setHoneypot(e.target.value)}
                        className="hidden"
                    />

                    {/* Animated Send Button */}
                    <motion.button
                        type="submit"
                        disabled={loading}
                        whileTap={{ scale: 0.97 }}
                        whileHover={{ scale: 1.03 }}
                        className={`w-full text-center bg-orange-600 text-white px-6 py-3 rounded-lg font-semibold transition duration-200 hover:bg-orange-700 ${loading ? 'opacity-60 cursor-not-allowed' : ''
                            }`}
                    >
                        {loading ? 'Sending...' : '🚀 Send Message'}
                    </motion.button>

                    {status && (
                        <p className={`text-sm mt-2 ${status.startsWith('✅') ? 'text-green-600' : 'text-red-600'}`}>
                            {status}
                        </p>
                    )}
                </motion.form>

                {/* Right Side (unchanged) */}
                <motion.div
                    className="space-y-6"
                    initial={{ opacity: 0, x: 30 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ duration: 0.6 }}
                >
                    <h2 className="text-2xl font-bold text-white-600 mt-0">Why Reach Out to Us?</h2>
                    <div className="space-y-3 text-gray-700">
                        <div className="flex items-start gap-4">
                            <FaHandshake className="text-orange-500 mt-1" size={20} />
                            <p><strong>Trusted by clients</strong> across industries – from startups to enterprise.</p>
                        </div>
                        <div className="flex items-start gap-4">
                            <FaPhoneFlip className="text-orange-500 mt-1" size={18} />
                            <p><strong>Phone:</strong> +91-9205737431</p>
                        </div>
                        <div className="flex items-start gap-4">
                            <FaEnvelope className="text-orange-500 mt-1" size={18} />
                            <p><strong>Email:</strong> contact@99visual.com</p>
                        </div>
                        <div className="flex items-start gap-4">
                            <FaLocationDot className="text-orange-500 mt-1" size={18} />
                            <p>
                                <strong>Address:</strong><br />
                                Site No - 13, Idgah Rd, Varthur,<br />
                                Bangalore - 560087, India
                            </p>
                        </div>
                    </div>

                    <a
                        href="https://calendly.com/sunilkiims"
                        target="_blank"
                        rel="noopener noreferrer"
                        className="inline-block mt-4 bg-orange-600 text-white px-6 py-2 rounded-lg font-medium hover:bg-orange-700 transition"
                    >
                        📞 Schedule a Free Call
                    </a>

                    <div className="flex gap-4 mt-4">
                        <a href="https://www.facebook.com/profile.php?id=100093639888151" target="_blank" rel="noopener noreferrer" className="text-orange-600 hover:text-orange-800">
                            <FaFacebookF size={20} />
                        </a>
                        <a href="https://www.linkedin.com/company/99-visual-solutions/" target="_blank" rel="noopener noreferrer" className="text-orange-700 hover:text-orange-900">
                            <FaLinkedinIn size={20} />
                        </a>
                        <a href="https://www.linkedin.com/company/99-visual-solutions/" target="_blank" rel="noopener noreferrer" className="text-pink-600 hover:text-pink-800">
                            <FaInstagram size={20} />
                        </a>
                        <a href="https://x.com/99VisualSoluti1" target="_blank" rel="noopener noreferrer" className="text-sky-500 hover:text-sky-700">
                            <FaXTwitter size={20} />
                        </a>
                    </div>

                    <p className="text-sm text-gray-500 italic">We typically respond within 24 hours.</p>
                </motion.div>
            </div>

            {/* Testimonials (unchanged) */}
            <motion.div
                className="bg-gray-50 rounded-lg shadow-md p-6 md:p-10 text-center"
                initial={{ opacity: 0 }}
                whileInView={{ opacity: 1 }}
                viewport={{ once: true }}
                transition={{ duration: 0.8 }}
            >
                <p className="text-lg font-medium text-gray-800 italic">
                    “{testimonials[testimonialIndex].quote}”
                </p>
                <p className="mt-3 text-sm text-orange-600 font-semibold">
                    — {testimonials[testimonialIndex].author}
                </p>
            </motion.div>
        </div>
    );
}