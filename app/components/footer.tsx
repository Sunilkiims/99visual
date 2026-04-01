'use client';

import React, { FormEvent, useState } from 'react';
import Link from "next/link";
import {
    FaFacebookF,
    FaTwitter,
    FaInstagram,
    FaLinkedinIn,
} from 'react-icons/fa';

const Footer: React.FC = () => {
    const [email, setEmail] = useState('');
    const [submitted, setSubmitted] = useState(false);
    const [error, setError] = useState('');

    const handleSubmit = async (e: FormEvent) => {
        e.preventDefault();
        setSubmitted(false);
        setError('');

        try {
            const res = await fetch('/api/subscribe', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({ email }),
            });

            const result = await res.json();

            if (res.ok) {
                setSubmitted(true);
                setTimeout(() => setSubmitted(false), 3000);
                setEmail('');
            } else {
                setError(result.message || 'Something went wrong.');
            }
        } catch (err) {
            setError('Network error. Try again later.');
        }
    };

    return (
        <footer className="bg-gradient-to-tr from-gray-900 to-gray-800 text-white py-14 px-4">
            <div className="max-w-7xl mx-auto">
                <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-10">

                    {/* Logo & Description */}
                    <div>
                        <h2 className="text-3xl font-bold mb-4 text-white">99 Visual Solution</h2>
                        <p className="text-gray-400 leading-relaxed">
                            Empowering digital journeys through next-gen technology & creative web experiences.
                        </p>

                        <div className="flex space-x-4 mt-6">
                            <a href="https://facebook.com" target="_blank" rel="noopener noreferrer" className="p-2 rounded-full bg-gray-700 hover:bg-blue-600 transition-colors" aria-label="Facebook">
                                <FaFacebookF />
                            </a>
                            <a href="https://twitter.com" target="_blank" rel="noopener noreferrer" className="p-2 rounded-full bg-gray-700 hover:bg-sky-500 transition-colors" aria-label="Twitter">
                                <FaTwitter />
                            </a>
                            <a href="https://instagram.com" target="_blank" rel="noopener noreferrer" className="p-2 rounded-full bg-gray-700 hover:bg-pink-500 transition-colors" aria-label="Instagram">
                                <FaInstagram />
                            </a>
                            <a href="https://linkedin.com" target="_blank" rel="noopener noreferrer" className="p-2 rounded-full bg-gray-700 hover:bg-blue-700 transition-colors" aria-label="LinkedIn">
                                <FaLinkedinIn />
                            </a>
                        </div>
                    </div>

                    {/* Company Links */}
                    <div>
                        <h3 className="text-xl font-semibold mb-4">Company</h3>
                        <ul className="space-y-3 text-gray-400">
                            <li><Link href="/about" className="hover:text-white transition-colors">About</Link></li>
                            <li><Link href="/careers" className="hover:text-white transition-colors">Careers</Link></li>
                            <li><Link href="/partner" className="hover:text-white transition-colors">Partner</Link></li>
                            
                        </ul>
                    </div>

                    {/* Support Links */}
                    <div>
                        <h3 className="text-xl font-semibold mb-4">Support</h3>
                        <ul className="space-y-3 text-gray-400">
                            <li><Link href="/contact" className="hover:text-white transition-colors">Contact</Link></li>
                            <li><Link href="/help-center" className="hover:text-white transition-colors">Help Center</Link></li>
                            <li><Link href="/privacy-policy" className="hover:text-white transition-colors">Privacy Policy</Link></li>
                            
                        </ul>
                    </div>

                    {/* Newsletter */}
                    <div>
                        <h3 className="text-xl font-semibold mb-4">Newsletter</h3>
                        <p className="text-gray-400 mb-4">
                            Stay updated with our latest insights & innovations.
                        </p>

                        <form onSubmit={handleSubmit} className="flex flex-col sm:flex-row">
                            <input
                                type="email"
                                value={email}
                                onChange={(e) => setEmail(e.target.value)}
                                required
                                placeholder="Your email"
                                className="px-4 py-2 rounded-md text-black focus:outline-none w-full sm:mb-0 sm:mr-2 mb-2"
                            />
                            <button
                                type="submit"
                                className="bg-gradient-to-r from-blue-600 to-purple-600 hover:from-purple-600 hover:to-blue-600 px-4 py-2 rounded-md text-white transition-all"
                            >
                                Subscribe
                            </button>
                        </form>

                        {submitted && (
                            <p className="text-green-400 mt-2 animate-pulse">Thanks for subscribing!</p>
                        )}
                        {error && (
                            <p className="text-red-400 mt-2 animate-pulse">{error}</p>
                        )}
                    </div>
                </div>

                <div className="mt-12 border-t border-gray-700 pt-6 text-center text-gray-400 text-sm">
                    &copy; {new Date().getFullYear()} 99 Visual Solution. All rights reserved.
                </div>
            </div>
        </footer>
    );
};

export default Footer;