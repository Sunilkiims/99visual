"use client";

import { useState, useRef, useEffect } from "react";

/* ── Animated Robot SVG Icon ── */
function RobotIcon({ size = 36 }: { size?: number }) {
  return (
    <svg
      className="cb-robot"
      width={size}
      height={size}
      viewBox="0 0 36 36"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
    >
      <line x1="18" y1="2" x2="18" y2="7" stroke="#f97316" strokeWidth="1.5" strokeLinecap="round" />
      <circle className="cb-robot__antenna-dot" cx="18" cy="1.5" r="1.8" fill="#f97316" />
      <rect x="8" y="7" width="20" height="14" rx="4" fill="#1a1a1a" stroke="rgba(249,115,22,0.5)" strokeWidth="1" />
      <rect className="cb-robot__eye cb-robot__eye--l" x="11.5" y="11" width="4" height="4" rx="1.5" fill="#f97316" />
      <rect className="cb-robot__eye cb-robot__eye--r" x="20.5" y="11" width="4" height="4" rx="1.5" fill="#f97316" />
      <rect className="cb-robot__mouth-bar" x="12" y="17.5" width="1.5" height="2" rx=".5" fill="#f97316" />
      <rect className="cb-robot__mouth-bar" x="14.5" y="16.5" width="1.5" height="3" rx=".5" fill="#f97316" />
      <rect className="cb-robot__mouth-bar" x="17" y="15.5" width="1.5" height="4" rx=".5" fill="#f97316" />
      <rect className="cb-robot__mouth-bar" x="19.5" y="16.5" width="1.5" height="3" rx=".5" fill="#f97316" />
      <rect className="cb-robot__mouth-bar" x="22" y="17.5" width="1.5" height="2" rx=".5" fill="#f97316" />
      <rect x="16" y="21" width="4" height="3" rx="1" fill="#1a1a1a" stroke="rgba(249,115,22,0.3)" strokeWidth=".8" />
      <rect x="7" y="24" width="22" height="10" rx="3.5" fill="#1a1a1a" stroke="rgba(249,115,22,0.5)" strokeWidth="1" />
      <circle cx="18" cy="29" r="2.5" fill="none" stroke="rgba(249,115,22,0.4)" strokeWidth=".8" />
      <circle cx="18" cy="29" r="1" fill="#f97316" opacity=".7" />
      <rect x="2" y="25" width="5" height="8" rx="2.5" fill="#1a1a1a" stroke="rgba(249,115,22,0.4)" strokeWidth=".8" />
      <rect x="29" y="25" width="5" height="8" rx="2.5" fill="#1a1a1a" stroke="rgba(249,115,22,0.4)" strokeWidth=".8" />
    </svg>
  );
}

/* ── Small Robot Avatar (for messages) ── */
function RobotAvatar() {
  return (
    <div className="cb-avatar" aria-hidden>
      <svg viewBox="0 0 28 28" fill="none" xmlns="http://www.w3.org/2000/svg" width="28" height="28">
        <rect width="28" height="28" rx="14" fill="#141414" />
        <line x1="14" y1="3" x2="14" y2="6" stroke="#f97316" strokeWidth="1.2" strokeLinecap="round" />
        <circle cx="14" cy="2.5" r="1.2" fill="#f97316" />
        <rect x="7" y="6" width="14" height="10" rx="2.5" fill="#1a1a1a" stroke="rgba(249,115,22,0.5)" strokeWidth=".8" />
        <rect x="9.5" y="9" width="3" height="3" rx="1" fill="#f97316" />
        <rect x="15.5" y="9" width="3" height="3" rx="1" fill="#f97316" />
        <rect x="6" y="17" width="16" height="9" rx="2.5" fill="#1a1a1a" stroke="rgba(249,115,22,0.4)" strokeWidth=".8" />
        <circle cx="14" cy="21.5" r="1.8" fill="none" stroke="rgba(249,115,22,0.4)" strokeWidth=".6" />
        <circle cx="14" cy="21.5" r=".7" fill="#f97316" opacity=".8" />
      </svg>
    </div>
  );
}

/* ── Types ── */
type NavLink = {
  label: string;
  url: string;
  category: string;
  icon?: string;
  description?: string;
};

type Message = {
  role: string;
  text: string;
  navLinks?: NavLink[];
};

/* ── Render bot text with inline hyperlinks ── */
function BotText({ text }: { text: string }) {
  const combined = /\[([^\]]+)\]\((https?:\/\/[^\)]+)\)|(https?:\/\/[^\s<>"]+)/g;
  let last = 0;
  let i = 0;
  let match: RegExpExecArray | null;
  const nodes: React.ReactNode[] = [];

  while ((match = combined.exec(text)) !== null) {
    if (match.index > last) {
      nodes.push(<span key={`t${i++}`}>{text.slice(last, match.index)}</span>);
    }
    const label = match[1] || match[3];
    const url   = match[2] || match[3];
    nodes.push(
      <a
        key={`a${i++}`}
        href={url}
        target="_blank"
        rel="noopener noreferrer"
        className="cb-inline-link"
      >
        {label}
      </a>
    );
    last = match.index + match[0].length;
  }

  if (last < text.length) {
    nodes.push(<span key={`t${i++}`}>{text.slice(last)}</span>);
  }

  return <>{nodes}</>;
}

/* ── Nav link chips ── */
function NavChips({ links }: { links: NavLink[] }) {
  if (!links || links.length === 0) return null;
  return (
    <div className="cb-nav-chips">
      {links.map((link) => (
        <a
          key={link.url}
          href={link.url}
          target="_blank"
          rel="noopener noreferrer"
          className="cb-nav-chip"
          title={link.description}
        >
          {link.icon && <span className="cb-nav-chip__icon">{link.icon}</span>}
          <span className="cb-nav-chip__label">{link.label}</span>
          <svg className="cb-nav-chip__arrow" width="10" height="10" viewBox="0 0 10 10" fill="none">
            <path d="M2 8L8 2M8 2H3.5M8 2V6.5" stroke="currentColor" strokeWidth="1.4" strokeLinecap="round" strokeLinejoin="round"/>
          </svg>
        </a>
      ))}
    </div>
  );
}

/* ── Contact Bar ── */
function ContactBar() {
  return (
    <div className="cb-contact-bar">
      <a href="tel:+919205737431" className="cb-contact-item" aria-label="Call us">
        <span className="cb-contact-item__icon">
          {/* Phone icon */}
          <svg width="12" height="12" viewBox="0 0 12 12" fill="none" xmlns="http://www.w3.org/2000/svg">
            <path d="M10.5 8.5c0 .18-.04.36-.13.53a1.97 1.97 0 0 1-.35.48c-.22.24-.46.36-.72.36-.19 0-.39-.05-.6-.14a5.84 5.84 0 0 1-.6-.32 9.97 9.97 0 0 1-.58-.44 9.82 9.82 0 0 1-.55-.55 9.82 9.82 0 0 1-.55-.55 9.97 9.97 0 0 1-.44-.58 5.84 5.84 0 0 1-.32-.6c-.09-.21-.14-.41-.14-.6 0-.18.04-.37.12-.54.08-.17.2-.33.36-.47.19-.17.4-.25.62-.25.09 0 .18.02.26.06.09.04.17.1.23.19l.8 1.13c.06.09.1.17.13.25.03.07.05.14.05.2 0 .08-.02.16-.06.24-.04.08-.09.16-.16.24l-.22.22c-.03.03-.04.07-.04.11 0 .02 0 .04.01.06.01.02.02.04.03.06.07.12.18.27.33.45.16.18.32.35.5.52.18.17.35.33.53.47.18.14.33.24.45.31.02.01.04.02.07.03.03.01.05.01.08.01.05 0 .08-.01.12-.04l.22-.22c.08-.08.16-.14.24-.17.08-.04.16-.05.25-.05.07 0 .13.01.2.04.07.03.15.07.23.13l1.14.81c.09.06.15.14.19.23.04.09.06.18.06.27z" fill="currentColor"/>
          </svg>
        </span>
        <span className="cb-contact-item__text">+91-9205737431</span>
      </a>
      <span className="cb-contact-divider" aria-hidden>·</span>
      <a href="mailto:contact@99visual.com" className="cb-contact-item" aria-label="Email us">
        <span className="cb-contact-item__icon">
          {/* Email icon */}
          <svg width="12" height="12" viewBox="0 0 12 12" fill="none" xmlns="http://www.w3.org/2000/svg">
            <rect x="1" y="2.5" width="10" height="7" rx="1.2" stroke="currentColor" strokeWidth="1"/>
            <path d="M1 4l5 3.2L11 4" stroke="currentColor" strokeWidth="1" strokeLinecap="round"/>
          </svg>
        </span>
        <span className="cb-contact-item__text">contact@99visual.com</span>
      </a>
    </div>
  );
}

export default function Chatbot() {
  const [open, setOpen] = useState(false);
  const [message, setMessage] = useState("");
  const [messages, setMessages] = useState<Message[]>([]);
  const [history, setHistory] = useState<{ role: "user" | "assistant"; content: string }[]>([]);
  const [loading, setLoading] = useState(false);
  const [showHello, setShowHello] = useState(false);
  const [detectedLanguage, setDetectedLanguage] = useState("en");
  const chatRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!open) {
      const show = setTimeout(() => setShowHello(true), 2000);
      const hide = setTimeout(() => setShowHello(false), 7500);
      return () => { clearTimeout(show); clearTimeout(hide); };
    } else {
      setShowHello(false);
    }
  }, [open]);

  const sendMessage = async () => {
    if (!message.trim()) return;
    const userText = message;
    setMessages((prev) => [...prev, { role: "user", text: userText }]);
    setMessage("");
    setLoading(true);
    try {
      const res = await fetch("/api/chat", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          message: userText,
          history,
          detectedLanguage,
        }),
      });
      const data = await res.json();
      setMessages((prev) => [
        ...prev,
        { role: "bot", text: data.reply, navLinks: data.navLinks ?? [] },
      ]);
      setHistory((prev) => [
        ...prev,
        { role: "user",      content: userText   },
        { role: "assistant", content: data.reply },
      ]);
      if (data.detectedLanguage) setDetectedLanguage(data.detectedLanguage);
    } catch {
      setMessages((prev) => [...prev, { role: "bot", text: "Something went wrong. Please try again." }]);
    } finally {
      setLoading(false);
    }
  };

  const handleKeyPress = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === "Enter") sendMessage();
  };

  const clearChat = () => {
    setMessages([]);
    setHistory([]);
    setDetectedLanguage("en");
  };

  useEffect(() => {
    chatRef.current?.scrollTo({ top: chatRef.current.scrollHeight, behavior: "smooth" });
  }, [messages, loading]);

  return (
    <>
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=DM+Sans:wght@300;400;500;600&display=swap');

        .cb-fab {
          position: fixed;
          bottom: 28px;
          left: 28px;
          z-index: 9999;
          display: flex;
          flex-direction: column;
          align-items: flex-start;
          gap: 10px;
        }

        .cb-trigger {
          position: relative;
          width: 62px;
          height: 62px;
          border-radius: 50%;
          background: #0f0f0f;
          border: 1.5px solid rgba(249,115,22,0.5);
          display: flex;
          align-items: center;
          justify-content: center;
          cursor: pointer;
          box-shadow: 0 0 0 0 rgba(249,115,22,0.4), 0 4px 24px rgba(0,0,0,0.5);
          animation: cbPulseRing 2.4s cubic-bezier(.4,0,.6,1) infinite;
          transition: transform .2s ease, border-color .2s ease;
          outline: none;
          overflow: visible;
        }
        .cb-trigger:hover {
          transform: scale(1.1);
          border-color: rgba(249,115,22,0.9);
          box-shadow: 0 0 24px rgba(249,115,22,0.45), 0 4px 32px rgba(0,0,0,0.5);
          animation: none;
        }
        .cb-trigger::before,
        .cb-trigger::after {
          content: '';
          position: absolute;
          inset: 0;
          border-radius: 50%;
          background: rgba(249,115,22,0.18);
          animation: cbRingExpand 2.4s cubic-bezier(.4,0,.6,1) infinite;
          pointer-events: none;
        }
        .cb-trigger::after {
          animation-delay: .9s;
          background: rgba(249,115,22,0.1);
        }
        @keyframes cbPulseRing {
          0%   { box-shadow: 0 0 0 0   rgba(249,115,22,0.4), 0 4px 24px rgba(0,0,0,.5); }
          50%  { box-shadow: 0 0 0 14px rgba(249,115,22,0),  0 4px 24px rgba(0,0,0,.5); }
          100% { box-shadow: 0 0 0 0   rgba(249,115,22,0),   0 4px 24px rgba(0,0,0,.5); }
        }
        @keyframes cbRingExpand {
          0%   { transform: scale(1);   opacity: .5; }
          100% { transform: scale(2.4); opacity: 0; }
        }

        .cb-trigger__dot {
          position: absolute;
          top: 2px; right: 2px;
          width: 13px; height: 13px;
          background: #f97316;
          border-radius: 50%;
          border: 2px solid #080808;
          z-index: 2;
          animation: cbDotPulse 2s ease-in-out infinite;
        }
        @keyframes cbDotPulse {
          0%, 100% { transform: scale(1); opacity: 1; }
          50%       { transform: scale(1.25); opacity: .75; }
        }

        .cb-robot { overflow: visible; }
        .cb-robot__antenna-dot {
          animation: cbAntennaBlink 1.8s ease-in-out infinite;
        }
        @keyframes cbAntennaBlink {
          0%, 75%, 100% { fill: #f97316; filter: drop-shadow(0 0 3px #f97316); }
          85%            { fill: #fff;    filter: drop-shadow(0 0 6px #fff); }
        }
        .cb-robot__eye {
          animation: cbEyeBlink 3.5s ease-in-out infinite;
          transform-box: fill-box;
          transform-origin: center;
        }
        .cb-robot__eye--r { animation-delay: .15s; }
        @keyframes cbEyeBlink {
          0%, 90%, 100% { transform: scaleY(1); }
          95%            { transform: scaleY(0.08); }
        }
        .cb-robot__mouth-bar {
          animation: cbMouthWave .55s ease-in-out infinite alternate;
          transform-box: fill-box;
          transform-origin: bottom;
        }
        .cb-robot__mouth-bar:nth-child(1) { animation-delay: 0s; }
        .cb-robot__mouth-bar:nth-child(2) { animation-delay: .08s; }
        .cb-robot__mouth-bar:nth-child(3) { animation-delay: .16s; }
        .cb-robot__mouth-bar:nth-child(4) { animation-delay: .08s; }
        .cb-robot__mouth-bar:nth-child(5) { animation-delay: 0s; }
        @keyframes cbMouthWave {
          from { transform: scaleY(0.25); opacity: .45; }
          to   { transform: scaleY(1);    opacity: 1; }
        }

        /* ── HELLO BUBBLE ── */
        .cb-hello {
          position: absolute;
          bottom: 70px;
          left: 0;
          background: #141414;
          border: 1px solid rgba(249,115,22,0.35);
          border-radius: 10px 10px 10px 2px;
          padding: 8px 13px 6px;
          font-family: 'DM Sans', sans-serif;
          font-size: .8rem;
          font-weight: 500;
          color: rgba(255,255,255,0.85);
          white-space: nowrap;
          box-shadow: 0 4px 20px rgba(0,0,0,0.5), 0 0 12px rgba(249,115,22,0.1);
          pointer-events: none;
          animation: cbHelloIn .3s cubic-bezier(.22,1,.36,1) both;
        }
        @keyframes cbHelloIn {
          from { opacity: 0; transform: translateY(8px) scale(.95); }
          to   { opacity: 1; transform: translateY(0) scale(1); }
        }
        .cb-hello__inner {
          display: flex;
          align-items: center;
          gap: 6px;
          line-height: 1;
        }
        .cb-hello__typed {
          display: inline-block;
          overflow: hidden;
          white-space: nowrap;
          border-right: 2px solid #f97316;
          width: 0;
          color: #f97316;
          animation:
            cbTypeIn 1s steps(8, end) .1s forwards,
            cbCursorBlink .65s step-end .1s 4,
            cbCursorFade 0s linear 2.8s forwards;
        }
        @keyframes cbTypeIn {
          from { width: 0; }
          to   { width: max-content; }
        }
        @keyframes cbCursorBlink {
          0%, 100% { border-color: #f97316; }
          50%       { border-color: transparent; }
        }
        @keyframes cbCursorFade {
          to { border-color: transparent; }
        }
        .cb-hello__sub {
          font-size: .72rem;
          color: rgba(255,255,255,0.4);
          margin-top: 3px;
          line-height: 1;
        }

        /* ── CHAT WINDOW ── */
        .cb-window {
          position: fixed;
          bottom: 102px;
          left: 28px;
          z-index: 9998;
          width: 340px;
          height: 500px;
          background: #0f0f0f;
          border: 1px solid rgba(249,115,22,0.25);
          border-radius: 18px;
          display: flex;
          flex-direction: column;
          overflow: hidden;
          font-family: 'DM Sans', sans-serif;
          box-shadow:
            0 0 0 1px rgba(249,115,22,0.08),
            0 24px 60px rgba(0,0,0,0.7),
            0 0 40px rgba(249,115,22,0.08);
          animation: cbSlideUp .35s cubic-bezier(.22,1,.36,1) both;
        }
        @keyframes cbSlideUp {
          from { opacity: 0; transform: translateY(16px) scale(.97); }
          to   { opacity: 1; transform: translateY(0) scale(1); }
        }

        .cb-header {
          display: flex;
          justify-content: space-between;
          align-items: center;
          padding: 13px 16px;
          border-bottom: 1px solid rgba(249,115,22,0.15);
          background: #141414;
          flex-shrink: 0;
        }
        .cb-header__left { display: flex; align-items: center; gap: 10px; }
        .cb-header__robot-wrap {
          width: 36px; height: 36px;
          border-radius: 50%;
          border: 1.5px solid rgba(249,115,22,0.5);
          box-shadow: 0 0 10px rgba(249,115,22,0.25);
          background: #0f0f0f;
          display: flex; align-items: center; justify-content: center;
          flex-shrink: 0;
          overflow: hidden;
        }
        .cb-header__title {
          font-size: .82rem; font-weight: 600;
          color: #fff; letter-spacing: .02em;
        }
        .cb-header__status {
          display: flex; align-items: center; gap: 5px;
          font-size: .72rem; color: rgba(255,255,255,0.4); margin-top: 1px;
        }
        .cb-header__status-dot {
          width: 6px; height: 6px; border-radius: 50%;
          background: #22c55e; flex-shrink: 0;
          animation: cbDotPulse 2s ease-in-out infinite;
        }
        .cb-header__actions { display: flex; align-items: center; gap: 8px; }
        .cb-header__btn {
          background: transparent; border: 1px solid rgba(255,255,255,0.08);
          cursor: pointer; font-family: 'DM Sans', sans-serif;
          font-size: .7rem; font-weight: 500;
          color: rgba(255,255,255,0.35); padding: 4px 8px; border-radius: 6px;
          transition: color .2s, border-color .2s;
          letter-spacing: .04em; text-transform: uppercase;
        }
        .cb-header__btn:hover { color: #f97316; border-color: rgba(249,115,22,0.3); }
        .cb-header__close {
          background: transparent; border: none; cursor: pointer;
          color: rgba(255,255,255,0.35); padding: 4px;
          transition: color .2s; display: flex; align-items: center;
        }
        .cb-header__close:hover { color: #fff; }

        /* ── CONTACT BAR ── */
        .cb-contact-bar {
          display: flex;
          align-items: center;
          justify-content: center;
          gap: 6px;
          padding: 7px 16px;
          background: rgba(249,115,22,0.06);
          border-bottom: 1px solid rgba(249,115,22,0.12);
          flex-shrink: 0;
        }
        .cb-contact-item {
          display: inline-flex;
          align-items: center;
          gap: 5px;
          font-family: 'DM Sans', sans-serif;
          font-size: .7rem;
          font-weight: 500;
          color: rgba(255,255,255,0.5);
          text-decoration: none;
          padding: 3px 7px;
          border-radius: 6px;
          border: 1px solid transparent;
          transition: color .2s, background .2s, border-color .2s;
          white-space: nowrap;
        }
        .cb-contact-item:hover {
          color: #f97316;
          background: rgba(249,115,22,0.1);
          border-color: rgba(249,115,22,0.25);
        }
        .cb-contact-item__icon {
          display: flex;
          align-items: center;
          color: #f97316;
          opacity: 0.7;
          flex-shrink: 0;
          transition: opacity .2s;
        }
        .cb-contact-item:hover .cb-contact-item__icon { opacity: 1; }
        .cb-contact-divider {
          color: rgba(255,255,255,0.15);
          font-size: .75rem;
          user-select: none;
        }

        .cb-messages {
          flex: 1; overflow-y: auto;
          padding: 14px 12px;
          display: flex; flex-direction: column; gap: 10px;
          scrollbar-width: thin;
          scrollbar-color: rgba(249,115,22,0.2) transparent;
        }
        .cb-messages::-webkit-scrollbar { width: 4px; }
        .cb-messages::-webkit-scrollbar-track { background: transparent; }
        .cb-messages::-webkit-scrollbar-thumb { background: rgba(249,115,22,0.2); border-radius: 4px; }

        .cb-empty {
          flex: 1; display: flex; flex-direction: column;
          align-items: center; justify-content: center;
          gap: 12px; text-align: center; padding: 1rem;
        }
        .cb-empty__robot { animation: cbFloatRobot 3s ease-in-out infinite; }
        @keyframes cbFloatRobot {
          0%, 100% { transform: translateY(0); }
          50%       { transform: translateY(-6px); }
        }
        .cb-empty__text {
          font-size: .82rem; color: rgba(255,255,255,0.25);
          line-height: 1.6;
        }

        .cb-msg-row--bot {
          display: flex; align-items: flex-start; gap: 8px;
          animation: cbMsgIn .25s ease both;
        }
        .cb-msg-row--user {
          display: flex; justify-content: flex-end;
          animation: cbMsgIn .25s ease both;
        }
        @keyframes cbMsgIn {
          from { opacity: 0; transform: translateY(6px); }
          to   { opacity: 1; transform: translateY(0); }
        }

        .cb-avatar {
          width: 28px; height: 28px; border-radius: 50%;
          border: 1px solid rgba(249,115,22,0.4);
          box-shadow: 0 0 8px rgba(249,115,22,0.2);
          flex-shrink: 0; margin-top: 2px;
          overflow: hidden; display: flex;
          align-items: center; justify-content: center;
          background: #141414;
        }

        .cb-bubble--bot {
          background: #1a1a1a; border: 1px solid rgba(249,115,22,0.15);
          color: rgba(255,255,255,0.8); padding: 9px 13px;
          border-radius: 4px 14px 14px 14px;
          font-size: .83rem; line-height: 1.6; max-width: 78%;
          box-shadow: 0 2px 12px rgba(0,0,0,0.3);
        }
        .cb-bubble--user {
          background: linear-gradient(135deg, #fb923c, #f97316);
          color: #080808; padding: 9px 13px;
          border-radius: 14px 4px 14px 14px;
          font-size: .83rem; line-height: 1.6; max-width: 78%;
          font-weight: 500; box-shadow: 0 4px 16px rgba(249,115,22,0.3);
        }

        /* ── Inline link inside bot bubble ── */
        .cb-inline-link {
          color: #f97316;
          text-decoration: underline;
          text-underline-offset: 2px;
          text-decoration-color: rgba(249,115,22,0.4);
          font-weight: 500;
          transition: color .15s, text-decoration-color .15s;
          word-break: break-all;
        }
        .cb-inline-link:hover {
          color: #fb923c;
          text-decoration-color: #fb923c;
        }

        /* ── Nav chips row ── */
        .cb-nav-chips {
          display: flex;
          flex-wrap: wrap;
          gap: 6px;
          margin-top: 6px;
          max-width: calc(78% + 36px);
          margin-left: 36px;
          animation: cbMsgIn .3s ease both;
          animation-delay: .1s;
        }
        .cb-nav-chip {
          display: inline-flex;
          align-items: center;
          gap: 4px;
          padding: 4px 9px;
          background: #141414;
          border: 1px solid rgba(249,115,22,0.25);
          border-radius: 20px;
          font-family: 'DM Sans', sans-serif;
          font-size: .72rem;
          font-weight: 500;
          color: rgba(255,255,255,0.65);
          text-decoration: none;
          transition: background .15s, border-color .15s, color .15s;
          white-space: nowrap;
        }
        .cb-nav-chip:hover {
          background: rgba(249,115,22,0.12);
          border-color: rgba(249,115,22,0.6);
          color: #f97316;
        }
        .cb-nav-chip__icon { font-size: .78rem; line-height: 1; }
        .cb-nav-chip__label { line-height: 1; }
        .cb-nav-chip__arrow {
          opacity: 0.45;
          flex-shrink: 0;
          transition: opacity .15s;
        }
        .cb-nav-chip:hover .cb-nav-chip__arrow { opacity: 1; }

        .cb-typing { display: flex; align-items: flex-start; gap: 8px; animation: cbMsgIn .25s ease both; }
        .cb-typing__dots {
          background: #1a1a1a; border: 1px solid rgba(249,115,22,0.15);
          padding: 10px 14px; border-radius: 4px 14px 14px 14px;
          display: flex; gap: 5px; align-items: center;
        }
        .cb-typing__dot {
          width: 6px; height: 6px; border-radius: 50%;
          background: rgba(249,115,22,0.6);
          animation: cbTypeDot 1.2s ease-in-out infinite;
        }
        .cb-typing__dot:nth-child(2) { animation-delay: .2s; }
        .cb-typing__dot:nth-child(3) { animation-delay: .4s; }
        @keyframes cbTypeDot {
          0%, 60%, 100% { transform: translateY(0); opacity: .5; }
          30%            { transform: translateY(-5px); opacity: 1; }
        }

        .cb-input-wrap {
          padding: 12px; border-top: 1px solid rgba(249,115,22,0.12);
          background: #141414; display: flex; gap: 8px; flex-shrink: 0;
        }
        .cb-input {
          flex: 1; padding: 9px 14px; background: #0f0f0f;
          border: 1px solid rgba(255,255,255,0.08); border-radius: 10px;
          color: #fff; font-family: 'DM Sans', sans-serif;
          font-size: .83rem; outline: none;
          transition: border-color .2s, box-shadow .2s;
        }
        .cb-input::placeholder { color: rgba(255,255,255,0.25); }
        .cb-input:focus { border-color: rgba(249,115,22,0.4); box-shadow: 0 0 0 3px rgba(249,115,22,0.08); }
        .cb-send {
          width: 38px; height: 38px; border-radius: 10px;
          background: linear-gradient(135deg, #fb923c, #f97316);
          border: none; cursor: pointer;
          display: flex; align-items: center; justify-content: center;
          flex-shrink: 0; box-shadow: 0 4px 14px rgba(249,115,22,0.35);
          transition: transform .15s ease, box-shadow .15s ease;
        }
        .cb-send:hover { transform: scale(1.08); box-shadow: 0 6px 20px rgba(249,115,22,0.5); }
        .cb-send:active { transform: scale(.95); }
        .cb-send svg { color: #080808; }

        @media (max-width: 480px) {
          .cb-window { width: calc(100vw - 32px); left: 16px; bottom: 90px; }
          .cb-fab { bottom: 20px; left: 16px; }
          .cb-contact-item__text { font-size: .65rem; }
        }
      `}</style>

      <div className="cb-fab">

        {open && (
          <div className="cb-window">

            <div className="cb-header">
              <div className="cb-header__left">
                <div className="cb-header__robot-wrap">
                  <RobotIcon size={26} />
                </div>
                <div>
                  <div className="cb-header__title">99 Visual Help Desk</div>
                  <div className="cb-header__status">
                    <span className="cb-header__status-dot" />
                    Online · Ready to help
                  </div>
                </div>
              </div>
              <div className="cb-header__actions">
                <button onClick={clearChat} className="cb-header__btn">Clear</button>
                <button onClick={() => setOpen(false)} className="cb-header__close" aria-label="Close">
                  <svg width="14" height="14" viewBox="0 0 14 14" fill="none">
                    <path d="M1 1l12 12M13 1L1 13" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" />
                  </svg>
                </button>
              </div>
            </div>

            {/* ── Contact Bar ── */}
            <ContactBar />

            <div ref={chatRef} className="cb-messages">

              {messages.length === 0 && !loading && (
                <div className="cb-empty">
                  <div className="cb-empty__robot">
                    <RobotIcon size={52} />
                  </div>
                  <p className="cb-empty__text">
                    Namaste 🙏 I&apos;m Vera, your assistant from 99 Visual.<br />
                    Ask me anything about our services.
                  </p>
                </div>
              )}

              {messages.map((msg, index) => (
                <div key={index}>
                  {msg.role === "bot" && (
                    <>
                      <div className="cb-msg-row--bot">
                        <RobotAvatar />
                        <div className="cb-bubble--bot">
                          <BotText text={msg.text} />
                        </div>
                      </div>
                      {msg.navLinks && msg.navLinks.length > 0 && (
                        <NavChips links={msg.navLinks} />
                      )}
                    </>
                  )}
                  {msg.role === "user" && (
                    <div className="cb-msg-row--user">
                      <div className="cb-bubble--user">{msg.text}</div>
                    </div>
                  )}
                </div>
              ))}

              {loading && (
                <div className="cb-typing">
                  <RobotAvatar />
                  <div className="cb-typing__dots">
                    <span className="cb-typing__dot" />
                    <span className="cb-typing__dot" />
                    <span className="cb-typing__dot" />
                  </div>
                </div>
              )}
            </div>

            <div className="cb-input-wrap">
              <input
                value={message}
                onChange={(e) => setMessage(e.target.value)}
                onKeyDown={handleKeyPress}
                placeholder="Ask the AI..."
                className="cb-input"
              />
              <button onClick={sendMessage} className="cb-send" aria-label="Send">
                <svg width="15" height="15" viewBox="0 0 15 15" fill="none">
                  <path d="M13 7.5H2M8.5 3l4.5 4.5L8.5 12" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round" />
                </svg>
              </button>
            </div>

          </div>
        )}

        {showHello && !open && (
          <div className="cb-hello">
            <div className="cb-hello__inner">
              <span className="cb-hello__typed">Hello 👋</span>
            </div>
            <div className="cb-hello__sub">How can I assist you today?</div>
          </div>
        )}

        <button
          onClick={() => setOpen(!open)}
          className="cb-trigger"
          aria-label="Open AI chat"
        >
          <RobotIcon size={38} />
          {!open && <span className="cb-trigger__dot" aria-hidden />}
        </button>

      </div>
    </>
  );
}