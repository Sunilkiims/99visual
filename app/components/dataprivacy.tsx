'use client';

import { ShieldCheck, Eye, LockKeyhole, Server, AlertTriangle, FileCheck2 } from 'lucide-react';

const points = [
  {
    icon: <ShieldCheck className="text-green-600" size={28} />,
    title: 'Enterprise-Grade Protection',
    text: 'We implement advanced encryption, secure cloud infrastructure, and strict access control to keep your data safe at every level.',
  },
  {
    icon: <FileCheck2 className="text-blue-600" size={28} />,
    title: 'Global Compliance',
    text: 'Your privacy is our priority. We follow globally recognized data protection practices that give you full control and visibility into how your information is managed — securely and ethically.',
  },
  {
    icon: <Eye className="text-orange-500" size={28} />,
    title: 'Transparency & Trust',
    text: 'We’re honest about how data is collected, used, and stored—because your trust means everything to us.',
  },
  {
    icon: <LockKeyhole className="text-purple-600" size={28} />,
    title: 'Access Control & Employee Training',
    text: 'All 99Visual employees are trained on privacy best practices. Access is strictly role-based and monitored.',
  },
  {
    icon: <Server className="text-sky-600" size={28} />,
    title: 'Secure Infrastructure',
    text: 'We operate on a security-first cloud infrastructure featuring continuous vulnerability scanning, auto-patching, and robust firewall protection, delivering enterprise-grade safety for your data.',
  },
  {
    icon: <AlertTriangle className="text-red-600" size={28} />,
    title: 'Real-Time Monitoring',
    text: '24/7 threat detection tools identify suspicious activity before it becomes a risk—ensuring proactive protection.',
  },
];

export default function DataPrivacy() {
  return (
    <section className="bg-white py-20 px-6 sm:px-12 lg:px-32">
      <div className="text-center mb-12">
        <h2 className="text-4xl font-bold text-gray-900">🔐 Data Privacy & Security Measures</h2>
        <p className="mt-4 text-lg text-gray-600 max-w-2xl mx-auto">
          At 99 Visual, your data isn’t just protected—it’s prioritized. Discover how we keep your information private and secure.
        </p>
      </div>

      <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
        {points.map((item, i) => (
          <div
            key={i}
            className="bg-gray-50 rounded-xl shadow-md hover:shadow-xl transition p-6 space-y-4 border border-gray-100"
          >
            <div className="flex items-center gap-3">
              {item.icon}
              <h3 className="text-xl font-semibold text-gray-800">{item.title}</h3>
            </div>
            <p className="text-gray-600 text-sm leading-relaxed">{item.text}</p>
          </div>
        ))}
      </div>

      <div className="text-center mt-16">
        <p className="text-sm text-gray-500 italic">Your privacy is our promise. Want more details?</p>
        <a
          href="mailto:contact@99visual.com"
          className="inline-block mt-4 bg-orange-600 hover:bg-orange-700 text-white px-6 py-3 rounded-lg text-sm font-medium transition"
        >
          📩 Contact Our Security Team
        </a>
      </div>
    </section>
  );
}
