'use client';

// Newsletter signup with email one-time-code verification.
// Logic moved unchanged from the previous footer: POST /api/subscribe/request-otp
// then /api/subscribe/verify-otp; only the markup and styling are new.
import { FormEvent, useState, useEffect, useRef, KeyboardEvent, ClipboardEvent } from 'react';

const OTP_LENGTH = 6;
const RESEND_SECONDS = 30;

type NlStep = 'email' | 'otp' | 'done';

// ── Component ─────────────────────────────────────────────────────────────────

export default function NewsletterForm() {
  // Newsletter / OTP flow state
  const [step,      setStep]      = useState<NlStep>('email');
  const [email,     setEmail]     = useState('');
  const [otp,       setOtp]       = useState<string[]>(Array(OTP_LENGTH).fill(''));
  const [loading,   setLoading]   = useState(false);
  const [error,     setError]     = useState('');
  const [resendIn,  setResendIn]  = useState(0);
  const otpRefs = useRef<Array<HTMLInputElement | null>>([]);


  // Countdown for "resend code"
  useEffect(() => {
    if (resendIn <= 0) return;
    const t = setTimeout(() => setResendIn((s) => s - 1), 1000);
    return () => clearTimeout(t);
  }, [resendIn]);

  // Auto-reset back to the email step a few seconds after success
  useEffect(() => {
    if (step !== 'done') return;
    const t = setTimeout(() => {
      setStep('email');
      setEmail('');
      setOtp(Array(OTP_LENGTH).fill(''));
    }, 4000);
    return () => clearTimeout(t);
  }, [step]);

  // ── Step 1: request a code for this email ──────────────────────────────────
  const handleRequestOtp = async (e: FormEvent) => {
    e.preventDefault();
    setError('');
    setLoading(true);
    try {
      const res    = await fetch('/api/subscribe/request-otp', {
        method:  'POST',
        headers: { 'Content-Type': 'application/json' },
        body:    JSON.stringify({ email }),
      });
      const result = await res.json();

      if (res.ok) {
        setStep('otp');
        setOtp(Array(OTP_LENGTH).fill(''));
        setResendIn(RESEND_SECONDS);
        setTimeout(() => otpRefs.current[0]?.focus(), 50);
      } else {
        setError(result.message || 'Could not send a verification code. Please try again.');
      }
    } catch {
      setError('Network error — please try again later.');
    } finally {
      setLoading(false);
    }
  };

  // ── Step 2: verify the code ─────────────────────────────────────────────────
  const handleVerifyOtp = async (e: FormEvent) => {
    e.preventDefault();
    const code = otp.join('');
    if (code.length !== OTP_LENGTH) {
      setError(`Enter the ${OTP_LENGTH}-digit code.`);
      return;
    }
    setError('');
    setLoading(true);
    try {
      const res    = await fetch('/api/subscribe/verify-otp', {
        method:  'POST',
        headers: { 'Content-Type': 'application/json' },
        body:    JSON.stringify({ email, otp: code }),
      });
      const result = await res.json();

      if (res.ok) {
        setStep('done');
      } else {
        setError(result.message || 'That code is incorrect or has expired.');
      }
    } catch {
      setError('Network error — please try again later.');
    } finally {
      setLoading(false);
    }
  };

  const handleResend = async () => {
    if (resendIn > 0 || loading) return;
    setError('');
    setLoading(true);
    try {
      const res    = await fetch('/api/subscribe/request-otp', {
        method:  'POST',
        headers: { 'Content-Type': 'application/json' },
        body:    JSON.stringify({ email }),
      });
      const result = await res.json();
      if (res.ok) {
        setResendIn(RESEND_SECONDS);
        setOtp(Array(OTP_LENGTH).fill(''));
        otpRefs.current[0]?.focus();
      } else {
        setError(result.message || 'Could not resend the code.');
      }
    } catch {
      setError('Network error — please try again later.');
    } finally {
      setLoading(false);
    }
  };

  const handleChangeEmail = () => {
    setStep('email');
    setOtp(Array(OTP_LENGTH).fill(''));
    setError('');
  };

  // ── OTP box handlers ─────────────────────────────────────────────────────
  const handleOtpChange = (index: number, value: string) => {
    const digit = value.replace(/\D/g, '').slice(-1);
    setOtp((prev) => {
      const next = [...prev];
      next[index] = digit;
      return next;
    });
    if (digit && index < OTP_LENGTH - 1) {
      otpRefs.current[index + 1]?.focus();
    }
  };

  const handleOtpKeyDown = (index: number, e: KeyboardEvent<HTMLInputElement>) => {
    if (e.key === 'Backspace' && !otp[index] && index > 0) {
      otpRefs.current[index - 1]?.focus();
    }
  };

  const handleOtpPaste = (e: ClipboardEvent<HTMLInputElement>) => {
    const pasted = e.clipboardData.getData('text').replace(/\D/g, '').slice(0, OTP_LENGTH);
    if (!pasted) return;
    e.preventDefault();
    const next = Array(OTP_LENGTH).fill('');
    pasted.split('').forEach((d, i) => { next[i] = d; });
    setOtp(next);
    const lastIndex = Math.min(pasted.length, OTP_LENGTH) - 1;
    otpRefs.current[lastIndex]?.focus();
  };
  return (
    <div className="vz-nl">
      {step === 'email' && (
        <>
          <form onSubmit={handleRequestOtp} aria-label="Newsletter subscription form" noValidate className="vz-nl__row">
            <label htmlFor="vz-nl-email" className="vz-sr">Email address for newsletter</label>
            <input
              id="vz-nl-email"
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
              placeholder="you@company.com"
              className="vz-input"
              autoComplete="email"
              disabled={loading}
            />
            <button type="submit" className="vz-btn vz-btn--primary vz-btn--sm" disabled={loading}>
              {loading ? 'Sending…' : 'Subscribe'}
            </button>
          </form>
          {error && <p className="vz-nl__status is-error" role="alert">{error}</p>}
          <p className="vz-small vz-nl__note">We&apos;ll email you a 6-digit code to confirm it&apos;s really you.</p>
        </>
      )}

      {step === 'otp' && (
        <>
          <p className="vz-body vz-nl__note">
            Code sent to <strong>{email}</strong>. Enter it below to confirm your subscription.
          </p>
          <form onSubmit={handleVerifyOtp} aria-label="One-time code verification form" noValidate>
            <div className="vz-otp" role="group" aria-label="6 digit verification code">
              {otp.map((digit, i) => (
                <input
                  key={i}
                  ref={(el) => { otpRefs.current[i] = el; }}
                  type="text"
                  inputMode="numeric"
                  pattern="[0-9]*"
                  maxLength={1}
                  value={digit}
                  onChange={(e) => handleOtpChange(i, e.target.value)}
                  onKeyDown={(e) => handleOtpKeyDown(i, e)}
                  onPaste={handleOtpPaste}
                  className="vz-otp__box"
                  aria-label={`Digit ${i + 1} of ${OTP_LENGTH}`}
                  disabled={loading}
                />
              ))}
            </div>
            <div className="vz-nl__actions">
              <button type="submit" className="vz-btn vz-btn--primary vz-btn--sm" disabled={loading}>
                {loading ? 'Verifying…' : 'Confirm subscription'}
              </button>
              <button type="button" className="vz-textbtn" onClick={handleResend} disabled={resendIn > 0 || loading}>
                {resendIn > 0 ? `Resend code (${resendIn}s)` : 'Resend code'}
              </button>
              <button type="button" className="vz-textbtn" onClick={handleChangeEmail}>Change email</button>
            </div>
            {error && <p className="vz-nl__status is-error" role="alert">{error}</p>}
          </form>
        </>
      )}

      {step === 'done' && (
        <p className="vz-nl__status is-ok" role="status" aria-live="polite">
          Email verified — you&apos;re on the list. Welcome aboard!
        </p>
      )}
    </div>
  );
}
