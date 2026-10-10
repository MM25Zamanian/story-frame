"use client";

import { useState, useRef, useEffect } from "react";
import { Button, Chip } from "@heroui/react";

import { ArtworkVideo } from "@/types/artwork";
import {
  PlayIcon,
  PauseIcon,
  VolumeHighIcon,
  VolumeMuteIcon,
  ExpandIcon,
} from "@/components/icons";

interface ArtworkVideoPlayerProps {
  video: ArtworkVideo;
  artworkTitle: string;
}

export function ArtworkVideoPlayer({
  video,
  artworkTitle,
}: ArtworkVideoPlayerProps) {
  const videoRef = useRef<HTMLVideoElement>(null);
  const containerRef = useRef<HTMLDivElement>(null);
  const [isPlaying, setIsPlaying] = useState(false);
  const [hasStarted, setHasStarted] = useState(false);
  const [isMuted, setIsMuted] = useState(false);
  const [currentTime, setCurrentTime] = useState(0);
  const [duration, setDuration] = useState(0);
  const [showControls, setShowControls] = useState(true);
  const controlsTimeoutRef = useRef<NodeJS.Timeout | null>(null);

  const formatTime = (secs: number) => {
    if (isNaN(secs)) return "00:00";
    const minutes = Math.floor(secs / 60);
    const seconds = Math.floor(secs % 60);

    return `${String(minutes).padStart(2, "0")}:${String(seconds).padStart(2, "0")}`;
  };

  const togglePlay = () => {
    if (!videoRef.current) return;
    if (videoRef.current.paused) {
      videoRef.current.play();
      setIsPlaying(true);
      setHasStarted(true);
    } else {
      videoRef.current.pause();
      setIsPlaying(false);
    }
  };

  const toggleMute = () => {
    if (!videoRef.current) return;
    videoRef.current.muted = !isMuted;
    setIsMuted(!isMuted);
  };

  const toggleFullscreen = () => {
    if (!containerRef.current) return;
    if (!document.fullscreenElement) {
      containerRef.current.requestFullscreen().catch(() => {});
    } else {
      document.exitFullscreen().catch(() => {});
    }
  };

  const handleSeek = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (!videoRef.current) return;
    const targetTime = Number(e.target.value);

    videoRef.current.currentTime = targetTime;
    setCurrentTime(targetTime);
  };

  const handleTimeUpdate = () => {
    if (!videoRef.current) return;
    setCurrentTime(videoRef.current.currentTime);
  };

  const handleLoadedMetadata = () => {
    if (!videoRef.current) return;
    setDuration(videoRef.current.duration);
  };

  const handleUserActivity = () => {
    setShowControls(true);
    if (controlsTimeoutRef.current) clearTimeout(controlsTimeoutRef.current);
    if (isPlaying) {
      controlsTimeoutRef.current = setTimeout(() => {
        setShowControls(false);
      }, 3000);
    }
  };

  useEffect(() => {
    return () => {
      if (controlsTimeoutRef.current) clearTimeout(controlsTimeoutRef.current);
    };
  }, []);

  return (
    <section aria-labelledby="artwork-video-heading" className="w-full">
      {/* Video Section Header with HeroUI Chip */}
      <div className="flex items-center justify-between mb-4 pb-3 border-b border-border">
        <div className="flex items-center gap-2 sm:gap-3">
          <span className="w-2 h-2 rounded-none bg-foreground" />
          <h2
            className="text-base sm:text-xl font-medium text-foreground"
            id="artwork-video-heading"
          >
            ویدیوی مرتبط با اثر
          </h2>
          <span className="text-border hidden sm:inline">|</span>
          <p className="text-xs text-muted font-mono hidden sm:inline truncate max-w-xs">
            {video.title || `مستند تصویری «${artworkTitle}»`}
          </p>
        </div>

        {video.duration && (
          <Chip
            className="text-[11px] font-mono rounded-none border border-border bg-surface tabular-nums"
            size="sm"
            variant="tertiary"
          >
            مدت: {video.duration}
          </Chip>
        )}
      </div>

      {/* Video Viewport Container */}
      <div
        ref={containerRef}
        className="relative w-full aspect-video bg-black overflow-hidden border border-border select-none group rounded-none shadow-sm"
        onMouseMove={handleUserActivity}
        onTouchStart={handleUserActivity}
      >
        <video
          ref={videoRef}
          playsInline
          className="w-full h-full object-contain cursor-pointer"
          poster={video.poster}
          preload="metadata"
          src={video.url}
          onClick={togglePlay}
          onEnded={() => {
            setIsPlaying(false);
            setShowControls(true);
          }}
          onLoadedMetadata={handleLoadedMetadata}
          onPause={() => setIsPlaying(false)}
          onPlay={() => {
            setIsPlaying(true);
            setHasStarted(true);
          }}
          onTimeUpdate={handleTimeUpdate}
        >
          <track kind="captions" label="Persian" srcLang="fa" />
          مرورگر شما از پخش مستقیم ویدیو پشتیبانی نمی‌کند.
        </video>

        {/* Initial Cinematic Play Overlay with HeroUI Button */}
        {!hasStarted && (
          <div
            aria-label="پخش ویدیوی مستند اثر"
            className="absolute inset-0 z-10 flex flex-col items-center justify-center bg-black/45 backdrop-blur-[2px] cursor-pointer transition-all duration-300 hover:bg-black/35"
            role="button"
            tabIndex={0}
            onClick={togglePlay}
            onKeyDown={(e) => {
              if (e.key === "Enter" || e.key === " ") {
                e.preventDefault();
                togglePlay();
              }
            }}
          >
            <Button
              className="w-16 h-16 sm:w-20 sm:h-20 rounded-none border border-white/60 bg-black/85 backdrop-blur-md text-white flex items-center justify-center p-0 transition-transform hover:scale-105 active:scale-95"
              size="lg"
              variant="tertiary"
            >
              <PlayIcon className="translate-x-0.5" size={24} />
            </Button>

            <Chip
              className="mt-4 bg-black/70 backdrop-blur-md border border-white/15 text-[11px] font-mono tracking-widest text-neutral-200 uppercase rounded-none"
              size="sm"
              variant="tertiary"
            >
              پخش اثر سینماتیک
            </Chip>
          </div>
        )}

        {/* Mobile & Desktop Video Controls Bar */}
        {hasStarted && (
          <div
            className={`absolute bottom-0 inset-x-0 z-20 bg-gradient-to-t from-black/95 via-black/60 to-transparent p-3 sm:p-5 transition-opacity duration-300 ${
              showControls ? "opacity-100" : "opacity-0 pointer-events-none"
            }`}
          >
            {/* Scrubber timeline */}
            <div className="relative w-full mb-2 sm:mb-3">
              <input
                aria-label="نوار زمان ویدیو"
                className="w-full h-1 bg-white/20 rounded-none appearance-none cursor-pointer accent-white transition-all focus:outline-none"
                max={duration || 100}
                min={0}
                type="range"
                value={currentTime}
                onChange={handleSeek}
              />
            </div>

            {/* Controls row with HeroUI Buttons */}
            <div className="flex items-center justify-between text-white font-mono text-xs">
              <div className="flex items-center gap-2 sm:gap-4">
                <Button
                  aria-label={isPlaying ? "توقف ویدیو" : "پخش ویدیو"}
                  className="p-1 min-w-8 h-8 rounded-none text-white hover:bg-white/10 bg-transparent border-none"
                  size="sm"
                  variant="tertiary"
                  onPress={togglePlay}
                >
                  {isPlaying ? <PauseIcon size={16} /> : <PlayIcon size={16} />}
                </Button>

                <Button
                  aria-label={isMuted ? "وصل صدا" : "قطع صدا"}
                  className="p-1 min-w-8 h-8 rounded-none text-white hover:bg-white/10 bg-transparent border-none"
                  size="sm"
                  variant="tertiary"
                  onPress={toggleMute}
                >
                  {isMuted ? (
                    <VolumeMuteIcon size={16} />
                  ) : (
                    <VolumeHighIcon size={16} />
                  )}
                </Button>

                <span className="text-[11px] text-white/80 tabular-nums">
                  {formatTime(currentTime)} / {formatTime(duration)}
                </span>
              </div>

              <div className="flex items-center gap-2 sm:gap-3">
                <Chip
                  className="text-[10px] font-mono text-white/60 bg-white/10 border-none rounded-none hidden sm:inline-flex"
                  size="sm"
                  variant="tertiary"
                >
                  1080P HD
                </Chip>

                <Button
                  aria-label="تمام‌صفحه"
                  className="p-1 min-w-8 h-8 rounded-none text-white hover:bg-white/10 bg-transparent border-none"
                  size="sm"
                  variant="tertiary"
                  onPress={toggleFullscreen}
                >
                  <ExpandIcon size={16} />
                </Button>
              </div>
            </div>
          </div>
        )}
      </div>

      {/* Video Colophon */}
      <div className="mt-2.5 flex items-center justify-between text-[11px] text-muted font-mono">
        <span>پخش جریانی استودیویی بدون افت کیفیت</span>
        <span>صدا و تصویر با کیفیت بالا</span>
      </div>
    </section>
  );
}
