"use client";

import { useState, useRef, useEffect } from "react";

/* ── Animated Robot SVG Icon ── */
function RobotIcon({ size = 28 }: { size?: number }) {
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

/* ── Voice types (browser Speech APIs aren't in default TS DOM lib) ── */
interface SpeechRecognitionResultLike {
  isFinal: boolean;
  0: { transcript: string };
}
interface SpeechRecognitionEventLike extends Event {
  resultIndex: number;
  results: ArrayLike<SpeechRecognitionResultLike>;
}
interface SpeechRecognitionErrorEventLike extends Event {
  error: string;
}
interface SpeechRecognitionLike extends EventTarget {
  continuous: boolean;
  interimResults: boolean;
  lang: string;
  start: () => void;
  stop: () => void;
  abort: () => void;
  onresult: ((e: SpeechRecognitionEventLike) => void) | null;
  onerror: ((e: SpeechRecognitionErrorEventLike) => void) | null;
  onend: (() => void) | null;
  onstart: (() => void) | null;
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

  /* ── Voice assistant state ── */
  const [listening, setListening] = useState(false);
  const [speaking, setSpeaking] = useState(false);
  const [voiceReplyEnabled, setVoiceReplyEnabled] = useState(true);
  const [micError, setMicError] = useState<string | null>(null);
  const [sttSupported, setSttSupported] = useState(true);
  const [ttsSupported, setTtsSupported] = useState(true);
  const recognitionRef = useRef<SpeechRecognitionLike | null>(null);
  const manualStopRef = useRef(false);
  const finalTranscriptRef = useRef("");

  // Detect browser support once on mount (client-only — SSR has no window).
  useEffect(() => {
    const SR =
      (window as unknown as { SpeechRecognition?: new () => SpeechRecognitionLike }).SpeechRecognition ||
      (window as unknown as { webkitSpeechRecognition?: new () => SpeechRecognitionLike }).webkitSpeechRecognition;
    setSttSupported(!!SR);
    setTtsSupported(typeof window !== "undefined" && "speechSynthesis" in window);

    // Stop any in-flight mic/speech when the widget unmounts (e.g. route change).
    return () => {
      recognitionRef.current?.abort();
      if ("speechSynthesis" in window) window.speechSynthesis.cancel();
    };
  }, []);

  useEffect(() => {
    if (!open) {
      const show = setTimeout(() => setShowHello(true), 2000);
      const hide = setTimeout(() => setShowHello(false), 7500);
      return () => { clearTimeout(show); clearTimeout(hide); };
    } else {
      setShowHello(false);
    }
  }, [open]);

  // Accepts an optional override so voice input (which lands in `message`
  // via state, async) can be sent immediately without waiting on a
  // re-render — same request/response handling as the existing text flow.
  const sendMessage = async (overrideText?: string, spokenReply = false) => {
    const userText = (overrideText ?? message).trim();
    if (!userText) return;
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
      if (spokenReply && voiceReplyEnabled && data.reply) speak(data.reply);
    } catch {
      const fallback = "Something went wrong. Please try again.";
      setMessages((prev) => [...prev, { role: "bot", text: fallback }]);
      if (spokenReply && voiceReplyEnabled) speak(fallback);
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
    stopSpeaking();
  };

  /* ── Text-to-Speech (browser-native) ── */
  const speak = (text: string) => {
    if (!ttsSupported) return;
    try {
      window.speechSynthesis.cancel(); // don't overlap with any prior utterance
      // Strip markdown links / bare URLs so TTS doesn't read out raw syntax.
      const clean = text
        .replace(/\[([^\]]+)\]\((https?:\/\/[^\)]+)\)/g, "$1")
        .replace(/https?:\/\/[^\s<>"]+/g, "")
        .trim();
      if (!clean) return;
      const utterance = new SpeechSynthesisUtterance(clean);
      utterance.rate = 1;
      utterance.pitch = 1;
      utterance.onstart = () => setSpeaking(true);
      utterance.onend = () => setSpeaking(false);
      utterance.onerror = () => setSpeaking(false);
      window.speechSynthesis.speak(utterance);
    } catch {
      setSpeaking(false);
    }
  };

  const stopSpeaking = () => {
    if (ttsSupported) window.speechSynthesis.cancel();
    setSpeaking(false);
  };

  /* ── Speech-to-Text (browser-native) ── */
  const startListening = () => {
    if (!sttSupported) {
      setMicError("Voice input isn't supported in this browser. Try Chrome or Edge, or type your message instead.");
      return;
    }
    setMicError(null);
    stopSpeaking(); // don't listen while the assistant is talking

    const SR =
      (window as unknown as { SpeechRecognition?: new () => SpeechRecognitionLike }).SpeechRecognition ||
      (window as unknown as { webkitSpeechRecognition?: new () => SpeechRecognitionLike }).webkitSpeechRecognition;
    if (!SR) {
      setMicError("Voice input isn't supported in this browser.");
      return;
    }

    const recognition = new SR();
    recognition.continuous = false;
    recognition.interimResults = true;
    recognition.lang = detectedLanguage && detectedLanguage !== "en" ? detectedLanguage : "en-US";

    manualStopRef.current = false;
    finalTranscriptRef.current = "";

    recognition.onstart = () => setListening(true);

    recognition.onresult = (e: SpeechRecognitionEventLike) => {
      let interim = "";
      for (let i = e.resultIndex; i < e.results.length; i++) {
        const result = e.results[i];
        if (result.isFinal) {
          finalTranscriptRef.current += result[0].transcript;
        } else {
          interim += result[0].transcript;
        }
      }
      setMessage((finalTranscriptRef.current + interim).trim());
    };

    recognition.onerror = (e: SpeechRecognitionErrorEventLike) => {
      if (e.error === "not-allowed" || e.error === "service-not-allowed") {
        setMicError("Microphone access was denied. Please allow microphone permission in your browser settings and try again.");
      } else if (e.error === "no-speech") {
        setMicError("Didn't catch that — please try again.");
      } else if (e.error !== "aborted") {
        setMicError("Voice input hit a snag. Please try again or type your message.");
      }
      manualStopRef.current = true; // suppress auto-send on the onend that follows
      setListening(false);
    };

    recognition.onend = () => {
      setListening(false);
      const finalText = finalTranscriptRef.current.trim();
      // Natural end (user stopped talking) → auto-submit, per the voice
      // flow. Manual "Stop" click → keep the text in the input, don't send.
      if (!manualStopRef.current && finalText) {
        sendMessage(finalText, true);
      }
    };

    recognitionRef.current = recognition;
    try {
      recognition.start();
    } catch {
      setMicError("Couldn't start the microphone. Please try again.");
    }
  };

  const stopListening = () => {
    manualStopRef.current = true;
    recognitionRef.current?.stop();
    setListening(false);
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

        /* FIXED: matched to WhatsApp button's 58px / mobile 52px size —
           was 62px with no mobile breakpoint, making it visibly larger
           than the WhatsApp button, especially on small screens. */
        .cb-trigger {
          position: relative;
          width: 58px;
          height: 58px;
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
        /* FIXED: width/height were hardcoded (340px / 500px), so on short
           or narrow viewports (small phones, landscape mode, split-screen
           browser windows) the window could overflow past the top or
           bottom of the screen and get clipped. Now both dimensions are
           capped against the actual viewport size using min()/calc, so
           the window always fits — it just shrinks gracefully instead. */
        .cb-window {
          position: fixed;
          bottom: 102px;
          left: 28px;
          z-index: 9998;
          width: min(340px, calc(100vw - 40px));
          height: min(500px, calc(100vh - 140px));
          max-height: 78vh;
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
        .cb-send:disabled { opacity: .4; cursor: not-allowed; transform: none; box-shadow: none; }
        .cb-send svg { color: #080808; }

        /* ── Voice: mic button ── */
        .cb-mic {
          width: 38px; height: 38px; border-radius: 10px;
          background: #0f0f0f; border: 1px solid rgba(255,255,255,0.1);
          color: rgba(255,255,255,0.6); cursor: pointer;
          display: flex; align-items: center; justify-content: center;
          flex-shrink: 0; transition: transform .15s ease, border-color .2s, color .2s, background .2s;
        }
        .cb-mic:hover { border-color: rgba(249,115,22,0.4); color: #f97316; }
        .cb-mic:active { transform: scale(.93); }
        .cb-mic--listening {
          background: #ef4444; border-color: #ef4444; color: #fff;
          animation: cbMicPulse 1.4s ease-in-out infinite;
        }
        @keyframes cbMicPulse {
          0%, 100% { box-shadow: 0 0 0 0 rgba(239,68,68,0.45); }
          50%       { box-shadow: 0 0 0 8px rgba(239,68,68,0); }
        }

        /* ── Voice: status bar (listening / speaking / error) ── */
        .cb-voice-bar {
          display: flex; align-items: center; gap: 8px;
          padding: 7px 14px;
          background: rgba(249,115,22,0.08);
          border-top: 1px solid rgba(249,115,22,0.15);
          font-family: 'DM Sans', sans-serif;
          font-size: .72rem;
          color: rgba(255,255,255,0.7);
          flex-shrink: 0;
        }
        .cb-voice-bar--error {
          background: rgba(239,68,68,0.08);
          border-top-color: rgba(239,68,68,0.25);
          color: rgba(255,255,255,0.75);
        }
        .cb-voice-bar__text { flex: 1; }
        .cb-voice-bar__action {
          background: transparent; border: 1px solid rgba(255,255,255,0.15);
          color: rgba(255,255,255,0.7); font-family: 'DM Sans', sans-serif;
          font-size: .68rem; font-weight: 500; padding: 3px 9px; border-radius: 6px;
          cursor: pointer; transition: color .2s, border-color .2s; flex-shrink: 0;
        }
        .cb-voice-bar__action:hover { color: #f97316; border-color: rgba(249,115,22,0.4); }

        .cb-voice-wave {
          display: flex; align-items: center; gap: 2px; height: 14px; flex-shrink: 0;
        }
        .cb-voice-wave span {
          width: 2.5px; background: #ef4444; border-radius: 2px;
          animation: cbWave .9s ease-in-out infinite;
        }
        .cb-voice-wave span:nth-child(1) { height: 5px; animation-delay: 0s; }
        .cb-voice-wave span:nth-child(2) { height: 10px; animation-delay: .1s; }
        .cb-voice-wave span:nth-child(3) { height: 14px; animation-delay: .2s; }
        .cb-voice-wave span:nth-child(4) { height: 9px; animation-delay: .3s; }
        .cb-voice-wave span:nth-child(5) { height: 5px; animation-delay: .4s; }
        @keyframes cbWave {
          0%, 100% { transform: scaleY(.4); }
          50%       { transform: scaleY(1); }
        }

        .cb-voice-speaking-dot {
          width: 8px; height: 8px; border-radius: 50%; background: #f97316;
          flex-shrink: 0; animation: cbDotPulse 1s ease-in-out infinite;
        }

        .cb-header__btn--icon {
          padding: 4px 7px; font-size: .82rem; line-height: 1;
        }

        /* FIXED: added a mobile breakpoint for the trigger button matching
           the WhatsApp button's 52px mobile size — previously .cb-trigger
           had no mobile-specific size at all, so on small screens it stayed
           at desktop size while the WhatsApp button shrank, making the
           mismatch even more obvious. */
        /* FIXED: added a mobile breakpoint for the trigger button matching
           the WhatsApp button's 52px mobile size — previously .cb-trigger
           had no mobile-specific size at all, so on small screens it stayed
           at desktop size while the WhatsApp button shrank, making the
           mismatch even more obvious. Window sizing also now scales with
           the viewport instead of a second hardcoded height. */
        @media (max-width: 480px) {
          .cb-window {
            width: calc(100vw - 32px);
            height: min(500px, calc(100vh - 130px));
            left: 16px;
            bottom: 90px;
          }
          .cb-fab { bottom: 20px; left: 16px; }
          .cb-trigger { width: 52px; height: 52px; }
        }

        /* Short / landscape viewports (phones rotated, small laptops with
           browser chrome eating vertical space) — shrink further so the
           window still fits fully on screen instead of being clipped
           top or bottom. */
        @media (max-height: 600px) {
          .cb-window {
            height: calc(100vh - 90px);
            bottom: 80px;
          }
          .cb-fab { bottom: 16px; }
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
                {ttsSupported && (
                  <button
                    onClick={() => {
                      if (speaking) stopSpeaking();
                      setVoiceReplyEnabled((v) => !v);
                    }}
                    className="cb-header__btn cb-header__btn--icon"
                    aria-label={voiceReplyEnabled ? "Turn off spoken replies" : "Turn on spoken replies"}
                    title={voiceReplyEnabled ? "Spoken replies: on" : "Spoken replies: off"}
                  >
                    {voiceReplyEnabled ? "🔊" : "🔇"}
                  </button>
                )}
                <button onClick={clearChat} className="cb-header__btn">Clear</button>
                <button onClick={() => setOpen(false)} className="cb-header__close" aria-label="Close">
                  <svg width="14" height="14" viewBox="0 0 14 14" fill="none">
                    <path d="M1 1l12 12M13 1L1 13" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" />
                  </svg>
                </button>
              </div>
            </div>

            <div ref={chatRef} className="cb-messages">

              {messages.length === 0 && !loading && (
                <div className="cb-empty">
                  <div className="cb-empty__robot">
                    <RobotIcon size={52} />
                  </div>
                  <p className="cb-empty__text">
                    Namaste 🙏 I&apos;m Nova, your assistant from 99 Visual.<br />
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

            {/* ── Voice status bar: only shown while listening/speaking/erroring ── */}
            {(listening || speaking || micError) && (
              <div className={`cb-voice-bar ${micError ? "cb-voice-bar--error" : ""}`}>
                {listening && (
                  <>
                    <span className="cb-voice-wave" aria-hidden>
                      <span /><span /><span /><span /><span />
                    </span>
                    <span className="cb-voice-bar__text">Listening…</span>
                    <button onClick={stopListening} className="cb-voice-bar__action">Stop</button>
                  </>
                )}
                {!listening && speaking && (
                  <>
                    <span className="cb-voice-speaking-dot" aria-hidden />
                    <span className="cb-voice-bar__text">Speaking…</span>
                    <button onClick={stopSpeaking} className="cb-voice-bar__action">Stop speaking</button>
                  </>
                )}
                {!listening && !speaking && micError && (
                  <>
                    <span className="cb-voice-bar__text">⚠️ {micError}</span>
                    <button onClick={() => setMicError(null)} className="cb-voice-bar__action">Dismiss</button>
                  </>
                )}
              </div>
            )}

            <div className="cb-input-wrap">
              <input
                value={message}
                onChange={(e) => setMessage(e.target.value)}
                onKeyDown={handleKeyPress}
                placeholder={listening ? "Listening…" : "Ask the AI..."}
                className="cb-input"
                disabled={listening}
              />
              {sttSupported && (
                <button
                  onClick={listening ? stopListening : startListening}
                  className={`cb-mic ${listening ? "cb-mic--listening" : ""}`}
                  aria-label={listening ? "Stop recording" : "Start voice input"}
                  title={listening ? "Stop recording" : "Speak your message"}
                  type="button"
                >
                  {listening ? (
                    <svg width="13" height="13" viewBox="0 0 13 13" fill="none">
                      <rect x="1" y="1" width="11" height="11" rx="2" fill="currentColor" />
                    </svg>
                  ) : (
                    <svg width="15" height="15" viewBox="0 0 15 15" fill="none">
                      <rect x="5" y="1" width="5" height="8" rx="2.5" fill="currentColor" />
                      <path d="M2.5 7v.5a5 5 0 0 0 10 0V7" stroke="currentColor" strokeWidth="1.4" strokeLinecap="round" />
                      <line x1="7.5" y1="12.5" x2="7.5" y2="14.2" stroke="currentColor" strokeWidth="1.4" strokeLinecap="round" />
                    </svg>
                  )}
                </button>
              )}
              <button onClick={() => sendMessage()} className="cb-send" aria-label="Send" disabled={listening}>
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
          <RobotIcon size={28} />
          {!open && <span className="cb-trigger__dot" aria-hidden />}
        </button>

      </div>
    </>
  );
}