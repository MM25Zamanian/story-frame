"use client";

import { useState } from "react";
import { Button } from "@heroui/react";
import { Check, Copy } from "lucide-react";

interface CopyButtonProps {
  textToCopy: string;
  label?: string;
  copiedLabel?: string;
  className?: string;
  size?: "sm" | "md";
}

export function CopyButton({
  textToCopy,
  label = "کپی کد تخفیف",
  copiedLabel = "کپی شد!",
  className = "",
  size = "sm",
}: CopyButtonProps) {
  const [copied, setCopied] = useState(false);

  const handleCopy = async () => {
    try {
      if (typeof navigator !== "undefined" && navigator.clipboard) {
        await navigator.clipboard.writeText(textToCopy);
        setCopied(true);
        setTimeout(() => setCopied(false), 2200);
      }
    } catch {
      // Fallback
      setCopied(true);
      setTimeout(() => setCopied(false), 2200);
    }
  };

  return (
    <Button
      aria-label={`کپی ${textToCopy}`}
      className={`font-mono text-xs font-semibold gap-1.5 transition-all duration-200 ${
        copied
          ? "bg-success/15 text-success border border-success/30"
          : "bg-surface text-foreground border border-border hover:border-accent hover:text-accent"
      } ${className}`}
      size={size}
      variant="outline"
      onPress={handleCopy}
    >
      {copied ? (
        <>
          <Check className="text-success" size={14} />
          <span>{copiedLabel}</span>
        </>
      ) : (
        <>
          <Copy size={14} />
          <span>{label}</span>
          <span className="font-bold px-1.5 py-0.5 rounded bg-foreground/5 text-foreground">
            {textToCopy}
          </span>
        </>
      )}
    </Button>
  );
}
