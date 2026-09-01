// app/components/JobApplyButton.tsx
// ─────────────────────────────────────────────────────────────────────────────
// Drop-in replacement for a plain "Apply" <Link>. Renders as whatever element
// you style it as (pass className + children) and owns the modal state so you
// don't need to lift state up into a client wrapper on the page.
// ─────────────────────────────────────────────────────────────────────────────
"use client";

import { useState } from "react";
import JobApplicationModal from "./JobApplicationModal";

export interface JobApplyButtonProps {
  jobTitle: string;
  jobOptions?: string[];
  className?: string;
  ariaLabel?: string;
  children: React.ReactNode;
}

export default function JobApplyButton({
  jobTitle,
  jobOptions,
  className,
  ariaLabel,
  children,
}: JobApplyButtonProps) {
  const [open, setOpen] = useState(false);

  return (
    <>
      <button
        type="button"
        className={className}
        aria-label={ariaLabel}
        onClick={() => setOpen(true)}
      >
        {children}
      </button>
      <JobApplicationModal
        isOpen={open}
        onClose={() => setOpen(false)}
        jobTitle={jobTitle}
        jobOptions={jobOptions}
      />
    </>
  );
}
