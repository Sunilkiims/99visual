// app/components/JobApplicationModal.tsx
"use client";

import { useEffect, useRef, useState } from "react";
import { getTrackingData } from "@/lib/leadTracking"; // ASSUMPTION: same helper ContactForm.tsx uses — confirm path

export interface JobApplicationModalProps {
  isOpen: boolean;
  onClose: () => void;
  jobTitle: string;
  jobOptions?: string[];
}

const MAX_RESUME_BYTES = 5 * 1024 * 1024; // 5MB
const ACCEPTED_TYPES = [
  "application/pdf",
  "application/msword",
  "application/vnd.openxmlformats-officedocument.wordprocessingml.document",
];
const ACCEPTED_EXT = ".pdf,.doc,.docx";

type Status = "idle" | "submitting" | "success" | "error";

export default function JobApplicationModal({
  isOpen,
  onClose,
  jobTitle,
  jobOptions,
}: JobApplicationModalProps) {
  const [selectedJob, setSelectedJob] = useState(jobTitle);
  const [name, setName]   = useState("");
  const [email, setEmail] = useState("");
  const [phone, setPhone] = useState("");
  const [message, setMessage] = useState("");
  const [resume, setResume]   = useState<File | null>(null);
  const [status, setStatus]   = useState<Status>("idle");
  const [errorMsg, setErrorMsg] = useState("");

  // ── NEW: captcha state ────────────────────────────────────────────────
  // ASSUMPTION: GET /api/captcha returns { question: string, token: string }.
  // Swap the endpoint/shape here if the real one differs.
  const [captchaQuestion, setCaptchaQuestion] = useState("");
  const [captchaToken, setCaptchaToken] = useState("");
  const [captchaAnswer, setCaptchaAnswer] = useState("");
  const [captchaLoading, setCaptchaLoading] = useState(false);

  // ── NEW: honeypot (hidden field, real users never fill this in) ───────
  const [honeypot, setHoneypot] = useState("");

  const dialogRef = useRef<HTMLDivElement>(null);
  const fileInputRef = useRef<HTMLInputElement>(null);

  async function loadCaptcha() {
    setCaptchaLoading(true);
    try {
      const res = await fetch("/api/captcha");
      const data = await res.json();
      setCaptchaQuestion(data.question || "");
      setCaptchaToken(data.token || "");
      setCaptchaAnswer("");
    } catch {
      setCaptchaQuestion("");
      setCaptchaToken("");
    } finally {
      setCaptchaLoading(false);
    }
  }

  // Keep the dropdown in sync with whichever "Apply" button was clicked,
  // and fetch a fresh captcha challenge each time the modal opens.
  useEffect(() => {
    if (isOpen) {
      setSelectedJob(jobTitle);
      setStatus("idle");
      setErrorMsg("");
      loadCaptcha();
    }
  }, [isOpen, jobTitle]);

  // Close on Escape, lock body scroll while open.
  useEffect(() => {
    if (!isOpen) return;
    const onKey = (e: KeyboardEvent) => e.key === "Escape" && onClose();
    document.addEventListener("keydown", onKey);
    const prevOverflow = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    return () => {
      document.removeEventListener("keydown", onKey);
      document.body.style.overflow = prevOverflow;
    };
  }, [isOpen, onClose]);

  if (!isOpen) return null;

  const options = jobOptions && jobOptions.length > 0 ? jobOptions : [jobTitle];

  function handleFileChange(e: React.ChangeEvent<HTMLInputElement>) {
    const file = e.target.files?.[0] ?? null;
    if (!file) {
      setResume(null);
      return;
    }
    if (file.size > MAX_RESUME_BYTES) {
      setErrorMsg("Resume file is too large. Max size is 5MB.");
      setResume(null);
      e.target.value = "";
      return;
    }
    if (!ACCEPTED_TYPES.includes(file.type)) {
      setErrorMsg("Please upload a PDF or Word document (.pdf, .doc, .docx).");
      setResume(null);
      e.target.value = "";
      return;
    }
    setErrorMsg("");
    setResume(file);
  }

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    if (!resume) {
      setErrorMsg("Please attach your resume.");
      return;
    }
    if (!captchaAnswer) {
      setErrorMsg("Please answer the verification question.");
      return;
    }
    setStatus("submitting");
    setErrorMsg("");

    try {
      const formData = new FormData();
      formData.append("jobTitle", selectedJob);
      formData.append("name", name);
      formData.append("email", email);
      formData.append("phone", phone);
      formData.append("message", message);
      formData.append("resume", resume);

      // ── NEW: anti-spam fields ──────────────────────────────────────────
      formData.append("captcha", captchaAnswer);
      formData.append("captchaToken", captchaToken);
      formData.append("honeypot", honeypot);

      // ── NEW: lead-tracking payload, JSON-stringified for FormData ──────
      formData.append("tracking", JSON.stringify(getTrackingData()));

      const res = await fetch("/api/apply", { method: "POST", body: formData });
      const data = await res.json().catch(() => ({}));

      if (!res.ok) {
        throw new Error(data?.error || "Something went wrong. Please try again.");
      }

      setStatus("success");
      setName(""); setEmail(""); setPhone(""); setMessage(""); setResume(null);
      if (fileInputRef.current) fileInputRef.current.value = "";
    } catch (err) {
      setStatus("error");
      setErrorMsg(err instanceof Error ? err.message : "Something went wrong. Please try again.");
      // Refresh the challenge on failure — a token is single-use-ish (10 min
      // window) and re-showing a stale question after an error is confusing.
      loadCaptcha();
    }
  }

  return (
    <div
      className="jam-overlay"
      role="presentation"
      onMouseDown={(e) => {
        if (e.target === e.currentTarget) onClose();
      }}
    >
      <style>{`
        .jam-overlay{position:fixed;inset:0;z-index:200;display:flex;align-items:center;justify-content:center;padding:1.25rem;background:rgba(4,4,6,.72);backdrop-filter:blur(6px);animation:jamFadeIn .2s ease both;}
        @keyframes jamFadeIn{from{opacity:0}to{opacity:1}}
        .jam-dialog{position:relative;width:100%;max-width:520px;max-height:90vh;overflow-y:auto;background:#0f0f10;border:1px solid rgba(255,255,255,.08);border-radius:20px;padding:2.25rem;animation:jamSlideUp .28s cubic-bezier(.22,1,.36,1) both;}
        @keyframes jamSlideUp{from{opacity:0;transform:translateY(18px) scale(.98)}to{opacity:1;transform:translateY(0) scale(1)}}
        .jam-close{position:absolute;top:1.1rem;right:1.1rem;width:34px;height:34px;border-radius:50%;border:1px solid rgba(255,255,255,.12);background:rgba(255,255,255,.04);color:rgba(255,255,255,.7);display:flex;align-items:center;justify-content:center;cursor:pointer;transition:background .2s ease,color .2s ease;}
        .jam-close:hover{background:rgba(255,255,255,.1);color:#fff;}
        .jam-eyebrow{font-family:'IBM Plex Mono',monospace;font-size:11px;font-weight:500;letter-spacing:.1em;text-transform:uppercase;color:#f97316;margin-bottom:.6rem;display:block;}
        .jam-title{font-family:'Cormorant Garamond',serif;font-size:1.7rem;font-weight:700;color:#fff;margin:0 0 .3rem;line-height:1.2;}
        .jam-sub{font-family:'DM Sans',sans-serif;font-size:.85rem;font-weight:300;color:rgba(255,255,255,.5);margin:0 0 1.75rem;}
        .jam-field{margin-bottom:1.1rem;}
        .jam-label{display:block;font-family:'DM Sans',sans-serif;font-size:.72rem;font-weight:500;letter-spacing:.06em;text-transform:uppercase;color:rgba(255,255,255,.55);margin-bottom:.45rem;}
        .jam-input,.jam-select,.jam-textarea{width:100%;box-sizing:border-box;background:rgba(255,255,255,.04);border:1px solid rgba(255,255,255,.12);border-radius:10px;padding:.75rem .9rem;font-family:'DM Sans',sans-serif;font-size:.9rem;color:#fff;outline:none;transition:border-color .2s ease,background .2s ease;}
        .jam-input::placeholder,.jam-textarea::placeholder{color:rgba(255,255,255,.32);}
        .jam-input:focus,.jam-select:focus,.jam-textarea:focus{border-color:#f97316;background:rgba(255,255,255,.06);}
        .jam-select{appearance:none;-webkit-appearance:none;background-image:url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='12' height='8'%3E%3Cpath d='M1 1l5 5 5-5' stroke='%23fff' stroke-opacity='.5' stroke-width='1.5' fill='none' stroke-linecap='round'/%3E%3C/svg%3E");background-repeat:no-repeat;background-position:right .9rem center;padding-right:2rem;}
        .jam-select option{background:#0f0f10;color:#fff;}
        .jam-textarea{resize:vertical;min-height:88px;font-family:'DM Sans',sans-serif;}
        .jam-row2{display:grid;grid-template-columns:1fr 1fr;gap:1rem;}
        @media(max-width:480px){.jam-row2{grid-template-columns:1fr;}}
        .jam-file{display:flex;align-items:center;gap:.75rem;background:rgba(255,255,255,.04);border:1px dashed rgba(255,255,255,.18);border-radius:10px;padding:.7rem .9rem;cursor:pointer;transition:border-color .2s ease,background .2s ease;}
        .jam-file:hover{border-color:#f97316;background:rgba(249,115,22,.05);}
        .jam-file input{display:none;}
        .jam-file__label{font-family:'DM Sans',sans-serif;font-size:.85rem;color:rgba(255,255,255,.6);}
        .jam-file__name{color:#fff;font-weight:500;}
        .jam-hint{font-family:'DM Sans',sans-serif;font-size:.72rem;color:rgba(255,255,255,.35);margin-top:.4rem;}
        .jam-error{font-family:'DM Sans',sans-serif;font-size:.8rem;color:#fb7185;background:rgba(251,113,133,.08);border:1px solid rgba(251,113,133,.25);border-radius:8px;padding:.6rem .8rem;margin-bottom:1rem;}
        .jam-captcha{display:flex;align-items:center;gap:.6rem;}
        .jam-captcha-q{font-family:'DM Sans',sans-serif;font-size:.85rem;color:rgba(255,255,255,.7);white-space:nowrap;}
        .jam-captcha-refresh{background:none;border:none;color:#f97316;font-size:.75rem;cursor:pointer;text-decoration:underline;padding:0;}
        .jam-honeypot{position:absolute;left:-9999px;width:1px;height:1px;overflow:hidden;}
        .jam-submit{width:100%;font-family:'DM Sans',sans-serif;font-size:.88rem;font-weight:600;color:#080808;background:linear-gradient(135deg,#fbbf24,#f97316);border:none;border-radius:10px;padding:.85rem 1rem;cursor:pointer;transition:transform .2s ease,box-shadow .2s ease;margin-top:.4rem;}
        .jam-submit:hover:not(:disabled){transform:translateY(-1px);box-shadow:0 10px 28px rgba(249,115,22,.35);}
        .jam-submit:disabled{opacity:.6;cursor:not-allowed;}
        .jam-success{text-align:center;padding:1.5rem 0;}
        .jam-success h3{font-family:'Cormorant Garamond',serif;font-size:1.5rem;color:#fff;margin:0 0 .5rem;}
        .jam-success p{font-family:'DM Sans',sans-serif;font-size:.88rem;color:rgba(255,255,255,.55);margin:0 0 1.5rem;}
        .jam-success button{font-family:'DM Sans',sans-serif;font-size:.85rem;font-weight:600;color:#fff;background:rgba(255,255,255,.08);border:1px solid rgba(255,255,255,.18);border-radius:10px;padding:.7rem 1.5rem;cursor:pointer;}
      `}</style>

      <div
        className="jam-dialog"
        ref={dialogRef}
        role="dialog"
        aria-modal="true"
        aria-labelledby="jam-heading"
      >
        <button className="jam-close" onClick={onClose} aria-label="Close application form">
          <svg width="16" height="16" viewBox="0 0 16 16" fill="none">
            <path d="M3 3l10 10M13 3L3 13" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" />
          </svg>
        </button>

        {status === "success" ? (
          <div className="jam-success">
            <h3>Application received</h3>
            <p>Thanks for applying — our hiring team will review your details and get back to you soon.</p>
            <button onClick={onClose}>Close</button>
          </div>
        ) : (
          <>
            <span className="jam-eyebrow">Apply now</span>
            <h2 className="jam-title" id="jam-heading">{selectedJob}</h2>
            <p className="jam-sub">Fill in your details and attach your resume — we&apos;ll be in touch.</p>

            {errorMsg && <div className="jam-error">{errorMsg}</div>}

            <form onSubmit={handleSubmit}>
              {/* Honeypot — real users never see or fill this in */}
              <div className="jam-honeypot" aria-hidden="true">
                <label htmlFor="jam-hp">Leave this field empty</label>
                <input
                  id="jam-hp"
                  type="text"
                  tabIndex={-1}
                  autoComplete="off"
                  value={honeypot}
                  onChange={(e) => setHoneypot(e.target.value)}
                />
              </div>

              <div className="jam-field">
                <label className="jam-label" htmlFor="jam-job">Position</label>
                <select
                  id="jam-job"
                  className="jam-select"
                  value={selectedJob}
                  onChange={(e) => setSelectedJob(e.target.value)}
                  required
                >
                  {options.map((opt) => (
                    <option key={opt} value={opt}>{opt}</option>
                  ))}
                </select>
              </div>

              <div className="jam-row2">
                <div className="jam-field">
                  <label className="jam-label" htmlFor="jam-name">Full name</label>
                  <input
                    id="jam-name" className="jam-input" type="text" placeholder="Jane Doe"
                    value={name} onChange={(e) => setName(e.target.value)} required
                  />
                </div>
                <div className="jam-field">
                  <label className="jam-label" htmlFor="jam-phone">Phone</label>
                  <input
                    id="jam-phone" className="jam-input" type="tel" placeholder="+91 98765 43210"
                    value={phone} onChange={(e) => setPhone(e.target.value)}
                  />
                </div>
              </div>

              <div className="jam-field">
                <label className="jam-label" htmlFor="jam-email">Email</label>
                <input
                  id="jam-email" className="jam-input" type="email" placeholder="jane@example.com"
                  value={email} onChange={(e) => setEmail(e.target.value)} required
                />
              </div>

              <div className="jam-field">
                <label className="jam-label" htmlFor="jam-resume">Resume</label>
                <label className="jam-file" htmlFor="jam-resume">
                  <svg width="18" height="18" viewBox="0 0 18 18" fill="none" aria-hidden="true">
                    <path d="M9 12V3m0 0L5.5 6.5M9 3l3.5 3.5M3.5 12v1.5A1.5 1.5 0 005 15h8a1.5 1.5 0 001.5-1.5V12" stroke="#f97316" strokeWidth="1.4" strokeLinecap="round" strokeLinejoin="round"/>
                  </svg>
                  <span className="jam-file__label">
                    {resume ? <span className="jam-file__name">{resume.name}</span> : "Click to upload your resume"}
                  </span>
                  <input
                    id="jam-resume" ref={fileInputRef} type="file"
                    accept={ACCEPTED_EXT} onChange={handleFileChange}
                  />
                </label>
                <p className="jam-hint">PDF or Word, up to 5MB.</p>
              </div>

              <div className="jam-field">
                <label className="jam-label" htmlFor="jam-message">Message (optional)</label>
                <textarea
                  id="jam-message" className="jam-textarea" placeholder="Anything you'd like us to know..."
                  value={message} onChange={(e) => setMessage(e.target.value)}
                />
              </div>

              <div className="jam-field">
                <label className="jam-label" htmlFor="jam-captcha">Quick check</label>
                <div className="jam-captcha">
                  <span className="jam-captcha-q">
                    {captchaLoading ? "Loading…" : captchaQuestion || "Verification unavailable"}
                  </span>
                  <input
                    id="jam-captcha" className="jam-input" type="text" placeholder="Answer"
                    value={captchaAnswer} onChange={(e) => setCaptchaAnswer(e.target.value)}
                    style={{ maxWidth: 100 }} required
                  />
                  <button type="button" className="jam-captcha-refresh" onClick={loadCaptcha}>
                    refresh
                  </button>
                </div>
              </div>

              <button className="jam-submit" type="submit" disabled={status === "submitting" || captchaLoading}>
                {status === "submitting" ? "Submitting..." : "Submit Application"}
              </button>
            </form>
          </>
        )}
      </div>
    </div>
  );
}