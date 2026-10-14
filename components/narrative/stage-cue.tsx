import React from "react";

/**
 * ActionCue: For physical movements or stage actions by the narrator or actors.
 * Visually distinct (dashed border, warning/theatrical style) to prevent mistakenly reading aloud.
 */
export function ActionCue({
  children,
  performer = "راوی",
}: {
  children: React.ReactNode;
  performer?: string;
}) {
  return (
    <aside
      aria-label="دستور صحنه و عمل راوی"
      className="my-4 rounded-xl border border-dashed border-warning/50 bg-warning/10 p-3.5 text-xs sm:text-[13px] text-foreground/90 transition-all select-none print:border-solid"
    >
      <div className="flex items-center gap-1.5 font-semibold text-warning mb-1.5 text-[11px]">
        <span className="inline-block">🎭</span>
        <span>دستور صحنه / کنش فیزیکی ({performer}):</span>
        <span className="text-[10px] text-muted font-normal">
          (صرفاً اجرا شود، با صدای بلند خوانده نشود)
        </span>
      </div>
      <div className="leading-relaxed font-medium ps-5 border-r-2 border-warning/60 text-foreground">
        {children}
      </div>
    </aside>
  );
}

/**
 * ToneCue: Hints for emotional state, tone of voice, or speaking tempo.
 */
export function ToneCue({
  children,
  tone,
}: {
  children?: React.ReactNode;
  tone?: string;
}) {
  return (
    <div className="my-2.5 inline-flex items-center gap-1.5 rounded-full border border-accent/30 bg-accent/10 px-3 py-1 text-xs font-semibold text-accent">
      <span className="w-1.5 h-1.5 rounded-full bg-accent animate-pulse" />
      <span>حس و لحن بیان:</span>
      <span className="font-bold text-foreground">{tone || children}</span>
    </div>
  );
}

/**
 * DramaticPause: Signals pauses, silence, or giving time to audience.
 */
export function DramaticPause({
  duration,
  seconds,
  note,
}: {
  duration?: string;
  seconds?: number;
  note?: string;
}) {
  const label = duration || (seconds ? `${seconds} ثانیه` : "مکث کوتاه");

  return (
    <div
      aria-label={`مکث دراماتیک: ${label}`}
      className="my-3 flex items-center gap-2 text-xs text-muted/90 bg-surface/50 border border-border/80 px-3 py-1.5 rounded-lg w-fit"
    >
      <span className="flex items-center gap-0.5 text-accent font-mono text-[10px]">
        <span>•</span>
        <span>•</span>
        <span>•</span>
      </span>
      <span className="font-semibold text-foreground/80">
        مکث صحنه: {label}
      </span>
      {note && <span className="text-[11px] text-muted">({note})</span>}
    </div>
  );
}

/**
 * AudienceInteraction: Interactive questions or moments involving the audience.
 */
export function AudienceInteraction({
  children,
  question,
  waitTime,
}: {
  children?: React.ReactNode;
  question?: string;
  waitTime?: string;
}) {
  return (
    <div className="my-5 rounded-2xl border-2 border-accent/40 bg-accent/5 p-4 sm:p-5 shadow-xs">
      <div className="flex items-center justify-between gap-2 border-b border-accent/20 pb-2 mb-3">
        <div className="flex items-center gap-1.5 text-xs font-bold text-accent">
          <span>👥</span>
          <span>سؤال و تعامل زنده با حضار</span>
        </div>
        {waitTime && (
          <span className="text-[11px] font-medium text-muted bg-surface px-2 py-0.5 rounded-md border border-border">
            زمان پاسخ‌دهی: {waitTime}
          </span>
        )}
      </div>

      <div className="text-[15px] sm:text-base font-semibold leading-relaxed text-foreground ps-1">
        {question || children}
      </div>
    </div>
  );
}

/**
 * Speech: Explicit speaker dialogue line with avatar/title.
 */
export function Speech({
  speaker = "مجری",
  tone,
  children,
}: {
  speaker?: string;
  tone?: string;
  children: React.ReactNode;
}) {
  return (
    <div className="my-4 space-y-1.5">
      <div className="flex items-center gap-2">
        <span className="text-xs font-bold text-accent bg-surface px-2 py-0.5 rounded-md border border-border">
          {speaker}
        </span>
        {tone && (
          <span className="text-[11px] text-muted italic">[لحن: {tone}]</span>
        )}
      </div>
      <div className="text-[15px] sm:text-base leading-[2.1] text-foreground/90 ps-2 border-r-2 border-accent/40">
        {children}
      </div>
    </div>
  );
}
