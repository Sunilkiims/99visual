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
// ── Lead source tracking ────────────────────────────────────────────────
// Pure data-collection utility — no UI impact. See lib/leadTracking.ts
import { getTrackingData, type TrackingData } from '@/lib/leadTracking';

type FormData = {
    name: string;
    email: string;
    message: string;
};

// Optional props so blog/insights pages can pass an explicit, guaranteed-
// accurate title + slug. If omitted, leadTracking.ts will attempt to
// auto-detect them from the URL and document.title.
type ContactFormProps = {
    blogTitle?: string;
    blogSlug?: string;
};

export default function ContactForm({ blogTitle, blogSlug }: ContactFormProps = {}) {
    const [form, setForm] = useState<FormData>({
        name: '',
        email: '',
        message: '',
    });

    const [status, setStatus] = useState<string | null>(null);
    const [loading, setLoading] = useState(false);

    // ── Captcha state (server-verified) ────────────────────────────────────
    const [captchaQuestion, setCaptchaQuestion] = useState('');
    const [captchaToken, setCaptchaToken] = useState('');
    const [userCaptcha, setUserCaptcha] = useState('');
    const [captchaLoading, setCaptchaLoading] = useState(false);
    const [honeypot, setHoneypot] = useState('');

    // ── Lead source tracking state ──────────────────────────────────────────
    // Captured once on mount (client-side only) and reused on every submit.
    // We capture it up-front rather than only at submit time so that the
    // "landing page" sessionStorage write happens as early as possible in
    // the visit, matching true first-touch attribution for this session.
    const [tracking, setTracking] = useState<TrackingData | null>(null);

    useEffect(() => {
        loadCaptcha();
        // Populate tracking data on mount. Safe no-op on the server since
        // getTrackingData() guards every window/document/navigator access.
        setTracking(getTrackingData(blogTitle, blogSlug));
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, []);

    const loadCaptcha = () => {
        setCaptchaLoading(true);
        fetch('/api/captcha')
            .then((res) => res.json())
            .then((data) => {
                setCaptchaQuestion(data.question);
                setCaptchaToken(data.token);
            })
            .catch(() => {
                setCaptchaQuestion('');
                setCaptchaToken('');
            })
            .finally(() => setCaptchaLoading(false));
    };

    const handleChange = (e: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
        setForm({ ...form, [e.target.name]: e.target.value });
    };

    const handleSubmit = async (e: FormEvent) => {
        e.preventDefault();
        setLoading(true);
        setStatus(null);

        if (honeypot) {
            setStatus('❌ Bot detected');
            setLoading(false);
            return;
        }

        try {
            // Re-capture at submit time so `currentPage`, `submittedAt`, etc.
            // are accurate to the exact moment of submission, while
            // `landingPage`/`referrer` stay pinned to the original values
            // already stored in localStorage.
            const submissionTracking = getTrackingData(blogTitle, blogSlug);

            const res = await fetch('/api/contact', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({
                    ...form,
                    captcha: userCaptcha,
                    captchaToken,
                    honeypot,
                    // ── Lead source tracking fields appended to the payload ──
                    tracking: submissionTracking,
                }),
            });

            const result = await res.json();

            if (res.ok) {
                setStatus('✅ Thanks for contacting us! We will get back to you soon.');
                setForm({ name: '', email: '', message: '' });
                setUserCaptcha('');
                loadCaptcha();
            } else {
                // If captcha was wrong/expired, refresh it so the user can retry
                if (res.status === 400 && /captcha/i.test(result.message || '')) {
                    loadCaptcha();
                    setUserCaptcha('');
                }
                setStatus(`❌ ${result.message || 'Something went wrong.'}`);
            }
        } catch {
            setStatus('❌ Network error. Please try again later.');
        }

        setLoading(false);
    };

    const inputClasses =
        'w-full bg-white border border-gray-200 px-4 py-3 rounded-xl text-sm text-gray-900 placeholder-gray-400 shadow-sm outline-none transition-all duration-200 focus:border-blue-400 focus:ring-4 focus:ring-blue-500/10';

    return (
        <div className="px-4 sm:px-6 lg:px-8 py-14 sm:py-18 lg:py-24">
            <div className="max-w-6xl mx-auto">
                {/* Section intro */}
                <div className="text-center mb-10 sm:mb-14 max-w-2xl mx-auto">
                    <span className="inline-flex items-center px-3 py-1 rounded-full text-[11px] sm:text-xs font-medium tracking-wide bg-blue-50 text-blue-600 border border-blue-100 mb-4">
                        Contact Us
                    </span>
                    <h1 className="text-2xl sm:text-3xl md:text-4xl font-semibold text-gray-900 mb-3 leading-[1.15] tracking-tight">
                        Let&apos;s build something great together
                    </h1>
                    <p className="text-gray-500 text-sm sm:text-base leading-relaxed">
                        We&apos;d love to hear about your project. Send us a message and we&apos;ll get back to you within 24 hours.
                    </p>
                </div>

                {/* Contact + Info Section */}
                <div className="grid lg:grid-cols-5 gap-6 sm:gap-8 items-start">
                    {/* Form card */}
                    <motion.form
                        onSubmit={handleSubmit}
                        className="lg:col-span-3 bg-white border border-gray-100 rounded-2xl sm:rounded-3xl shadow-sm hover:shadow-md transition-shadow duration-300 p-5 sm:p-8 space-y-4"
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.5 }}
                    >
                        <div>
                            <h2 className="text-lg sm:text-xl font-semibold text-gray-900">Send a message</h2>
                            <p className="text-gray-500 text-sm mt-1">Fill in the form below and we&apos;ll respond shortly.</p>
                        </div>

                        <div className="space-y-4 pt-1">
                            <div>
                                <label htmlFor="name" className="block text-xs font-medium text-gray-600 mb-1.5">
                                    Your name
                                </label>
                                <input
                                    id="name"
                                    type="text"
                                    name="name"
                                    value={form.name}
                                    onChange={handleChange}
                                    placeholder="Jane Doe"
                                    maxLength={100}
                                    autoComplete="name"
                                    className={inputClasses}
                                    required
                                />
                            </div>

                            <div>
                                <label htmlFor="email" className="block text-xs font-medium text-gray-600 mb-1.5">
                                    Your email
                                </label>
                                <input
                                    id="email"
                                    type="email"
                                    name="email"
                                    value={form.email}
                                    onChange={handleChange}
                                    placeholder="jane@company.com"
                                    maxLength={200}
                                    autoComplete="email"
                                    className={inputClasses}
                                    required
                                />
                            </div>

                            <div>
                                <label htmlFor="message" className="block text-xs font-medium text-gray-600 mb-1.5">
                                    Your message
                                </label>
                                <textarea
                                    id="message"
                                    name="message"
                                    value={form.message}
                                    onChange={handleChange}
                                    placeholder="Tell us a little about your project..."
                                    rows={5}
                                    maxLength={5000}
                                    className={`${inputClasses} resize-none`}
                                    required
                                />
                            </div>

                            <div>
                                <label htmlFor="captcha" className="block text-xs font-medium text-gray-600 mb-1.5">
                                    Quick check: solve{' '}
                                    <span className="font-semibold text-gray-800">
                                        {captchaLoading ? 'Loading…' : captchaQuestion || 'Unavailable'}
                                    </span>
                                </label>
                                <input
                                    id="captcha"
                                    type="text"
                                    inputMode="numeric"
                                    value={userCaptcha}
                                    onChange={(e) => setUserCaptcha(e.target.value)}
                                    placeholder="Enter answer"
                                    disabled={captchaLoading}
                                    className={`${inputClasses} disabled:opacity-50 disabled:cursor-not-allowed`}
                                    required
                                />
                            </div>

                            {/* Honeypot — hidden from real users, bots tend to fill every input */}
                            <input
                                type="text"
                                name="website"
                                value={honeypot}
                                onChange={(e) => setHoneypot(e.target.value)}
                                className="hidden"
                                aria-hidden="true"
                                tabIndex={-1}
                                autoComplete="off"
                            />

                            <motion.button
                                type="submit"
                                disabled={loading || captchaLoading}
                                whileTap={{ scale: 0.98 }}
                                whileHover={{ scale: loading || captchaLoading ? 1 : 1.01 }}
                                className={`w-full text-center bg-blue-600 text-white px-6 py-3.5 rounded-xl text-sm sm:text-base font-semibold shadow-sm shadow-blue-600/20 transition-all duration-200 hover:bg-blue-700 focus:outline-none focus:ring-4 focus:ring-blue-500/20 ${
                                    loading || captchaLoading ? 'opacity-60 cursor-not-allowed' : ''
                                }`}
                            >
                                {loading ? 'Sending…' : '🚀 Send Message'}
                            </motion.button>

                            {status && (
                                <p
                                    role="status"
                                    className={`text-sm text-center pt-1 ${
                                        status.startsWith('✅') ? 'text-green-600' : 'text-red-600'
                                    }`}
                                >
                                    {status}
                                </p>
                            )}
                        </div>
                    </motion.form>

                    {/* Right Side — contact info */}
                    <motion.div
                        className="lg:col-span-2 space-y-5 sm:space-y-6"
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.5, delay: 0.1 }}
                    >
                        <div className="bg-white border border-gray-100 rounded-2xl sm:rounded-3xl shadow-sm p-5 sm:p-7">
                            <h2 className="text-lg sm:text-xl font-semibold text-gray-900 mb-4 sm:mb-5">
                                Why reach out to us?
                            </h2>
                            <div className="space-y-4 text-sm text-gray-600">
                                <div className="flex items-start gap-3.5">
                                    <span className="flex-shrink-0 w-9 h-9 rounded-xl bg-blue-50 flex items-center justify-center">
                                        <FaHandshake className="text-blue-500" size={16} />
                                    </span>
                                    <p className="pt-1.5 leading-relaxed">
                                        <strong className="text-gray-900">Trusted by clients</strong> across industries — from startups to enterprise.
                                    </p>
                                </div>
                                <div className="flex items-start gap-3.5">
                                    <span className="flex-shrink-0 w-9 h-9 rounded-xl bg-blue-50 flex items-center justify-center">
                                        <FaPhoneFlip className="text-blue-500" size={14} />
                                    </span>
                                    <p className="pt-1.5 leading-relaxed">
                                        <strong className="text-gray-900">Phone:</strong>{' '}
                                        <a href="tel:+919205737431" className="hover:text-blue-600 transition-colors">
                                            +91-9205737431
                                        </a>
                                    </p>
                                </div>
                                <div className="flex items-start gap-3.5">
                                    <span className="flex-shrink-0 w-9 h-9 rounded-xl bg-blue-50 flex items-center justify-center">
                                        <FaEnvelope className="text-blue-500" size={14} />
                                    </span>
                                    <p className="pt-1.5 leading-relaxed break-all">
                                        <strong className="text-gray-900">Email:</strong>{' '}
                                        <a href="mailto:info@99visual.com" className="hover:text-blue-600 transition-colors">
                                            info@99visual.com
                                        </a>
                                    </p>
                                </div>
                                <div className="flex items-start gap-3.5">
                                    <span className="flex-shrink-0 w-9 h-9 rounded-xl bg-blue-50 flex items-center justify-center">
                                        <FaLocationDot className="text-blue-500" size={14} />
                                    </span>
                                    <p className="pt-1.5 leading-relaxed">
                                        <strong className="text-gray-900">Address:</strong>
                                        <br />
                                        Site No - 13, Idgah Rd, Varthur,
                                        <br />
                                        Bangalore - 560087, India
                                    </p>
                                </div>
                            </div>

                            <a
                                href="https://calendly.com/sunilkiims"
                                target="_blank"
                                rel="noopener noreferrer"
                                className="inline-flex items-center justify-center w-full mt-6 bg-gray-900 text-white px-6 py-3 rounded-xl text-sm font-medium transition-all duration-200 hover:bg-gray-800 focus:outline-none focus:ring-4 focus:ring-gray-900/10"
                            >
                                📞 Schedule a Free Call
                            </a>
                        </div>

                        <div className="bg-white border border-gray-100 rounded-2xl sm:rounded-3xl shadow-sm p-5 sm:p-7 flex items-center justify-between gap-4 flex-wrap">
                            <div className="flex gap-2.5">
                                <a
                                    href="https://www.facebook.com/profile.php?id=100093639888151"
                                    target="_blank"
                                    rel="noopener noreferrer"
                                    aria-label="Follow us on Facebook"
                                    className="w-10 h-10 rounded-xl bg-gray-50 flex items-center justify-center text-gray-500 transition-colors duration-200 hover:bg-blue-50 hover:text-blue-600"
                                >
                                    <FaFacebookF size={16} />
                                </a>
                                <a
                                    href="https://www.linkedin.com/company/99-visual-solutions/"
                                    target="_blank"
                                    rel="noopener noreferrer"
                                    aria-label="Follow us on LinkedIn"
                                    className="w-10 h-10 rounded-xl bg-gray-50 flex items-center justify-center text-gray-500 transition-colors duration-200 hover:bg-blue-50 hover:text-blue-600"
                                >
                                    <FaLinkedinIn size={16} />
                                </a>
                                <a
                                    href="https://www.instagram.com/99visualsolutions/"
                                    target="_blank"
                                    rel="noopener noreferrer"
                                    aria-label="Follow us on Instagram"
                                    className="w-10 h-10 rounded-xl bg-gray-50 flex items-center justify-center text-gray-500 transition-colors duration-200 hover:bg-blue-50 hover:text-blue-600"
                                >
                                    <FaInstagram size={16} />
                                </a>
                                <a
                                    href="https://x.com/99VisualSoluti1"
                                    target="_blank"
                                    rel="noopener noreferrer"
                                    aria-label="Follow us on X"
                                    className="w-10 h-10 rounded-xl bg-gray-50 flex items-center justify-center text-gray-500 transition-colors duration-200 hover:bg-blue-50 hover:text-blue-600"
                                >
                                    <FaXTwitter size={16} />
                                </a>
                            </div>
                            <p className="text-xs text-gray-400 italic">We typically respond within 24 hours.</p>
                        </div>
                    </motion.div>
                </div>
            </div>
        </div>
    );
}
