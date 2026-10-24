"use client";

import { useState } from "react";
import { Check, Copy } from "lucide-react";

interface CopyButtonProps {
  textToCopy: string;
  label?: string;
  copiedLabel?: string;
  className?: string;
}

export function CopyButton({
  textToCopy,
  label = "کپی کد تخفیف",
  copiedLabel = "کد کپی شد!",
  className = "",
}: CopyButtonProps) {
  const [copied, setCopied] = useState(false);

  const handleCopy = async () => {
    try {
      if (typeof navigator !== "undefined" && navigator.clipboard) {
        await navigator.clipboard.writeText(textToCopy);
        setCopied(true);
        setTimeout(() => setCopied(false), 2400);
      }
    } catch {
      setCopied(true);
      setTimeout(() => setCopied(false), 2400);
    }
  };

  return (
    <button
      aria-label={`کپی کردن کد تخفیف ${textToCopy} در حافظه موقت`}
      aria-live="polite"
      className={`group relative min-h-[44px] px-4 py-2.5 rounded-xl font-mono text-xs font-semibold inline-flex items-center justify-center gap-2 transition-all duration-150 active:scale-[0.97] cursor-pointer focus-visible:outline-hidden focus-visible:ring-2 focus-visible:ring-accent focus-visible:ring-offset-2 ${
        copied
          ? "bg-success/20 text-success border border-success/40 shadow-xs"
          : "bg-surface hover:bg-surface-hover text-foreground border border-border hover:border-accent/60 shadow-2xs"
      } ${className}`}
      type="button"
      onClick={handleCopy}
    >
      {copied ? (
        <>
          <Check className="text-success shrink-0" size={16} />
          <span className="font-sans font-bold">{copiedLabel}</span>
        </>
      ) : (
        <>
          <Copy
            className="text-muted group-hover:text-accent transition-colors shrink-0"
            size={15}
          />
          <span className="font-sans text-muted group-hover:text-foreground transition-colors">
            {label}
          </span>
          <span className="font-bold px-2 py-0.5 rounded-md bg-foreground/10 text-foreground text-xs tracking-wider">
            {textToCopy}
          </span>
        </>
      )}
    </button>
  );
}
