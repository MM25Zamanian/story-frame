import * as React from "react";

import { IconSvgProps } from "@/types";

// Standardized 1.5px stroke minimalist icons for museum/exhibition interface

export const ExhibitionLogo: React.FC<IconSvgProps> = ({
  size = 28,
  width,
  height,
  className,
  ...props
}) => (
  <svg
    className={className}
    fill="none"
    height={size || height}
    stroke="currentColor"
    strokeWidth="1.5"
    viewBox="0 0 28 28"
    width={size || width}
    {...props}
  >
    <rect height="22" stroke="currentColor" width="22" x="3" y="3" />
    <line
      stroke="currentColor"
      strokeDasharray="2 2"
      x1="3"
      x2="25"
      y1="14"
      y2="14"
    />
    <circle cx="14" cy="14" fill="currentColor" r="3" stroke="none" />
  </svg>
);

export const SunIcon: React.FC<IconSvgProps> = ({
  size = 18,
  width,
  height,
  className,
  ...props
}) => (
  <svg
    className={className}
    fill="none"
    height={size || height}
    stroke="currentColor"
    strokeLinecap="round"
    strokeLinejoin="round"
    strokeWidth="1.5"
    viewBox="0 0 24 24"
    width={size || width}
    {...props}
  >
    <circle cx="12" cy="12" r="4" />
    <line x1="12" x2="12" y1="2" y2="4" />
    <line x1="12" x2="12" y1="20" y2="22" />
    <line x1="4.22" x2="5.64" y1="4.22" y2="5.64" />
    <line x1="18.36" x2="19.78" y1="18.36" y2="19.78" />
    <line x1="2" x2="4" y1="12" y2="12" />
    <line x1="20" x2="22" y1="12" y2="12" />
    <line x1="4.22" x2="5.64" y1="19.78" y2="18.36" />
    <line x1="18.36" x2="19.78" y1="5.64" y2="4.22" />
  </svg>
);

export const MoonIcon: React.FC<IconSvgProps> = ({
  size = 18,
  width,
  height,
  className,
  ...props
}) => (
  <svg
    className={className}
    fill="none"
    height={size || height}
    stroke="currentColor"
    strokeLinecap="round"
    strokeLinejoin="round"
    strokeWidth="1.5"
    viewBox="0 0 24 24"
    width={size || width}
    {...props}
  >
    <path d="M21 12.79A9 9 0 1 1 11.21 3 7 7 0 0 0 21 12.79z" />
  </svg>
);

export const ExpandIcon: React.FC<IconSvgProps> = ({
  size = 18,
  width,
  height,
  className,
  ...props
}) => (
  <svg
    className={className}
    fill="none"
    height={size || height}
    stroke="currentColor"
    strokeLinecap="round"
    strokeLinejoin="round"
    strokeWidth="1.5"
    viewBox="0 0 24 24"
    width={size || width}
    {...props}
  >
    <polyline points="15 3 21 3 21 9" />
    <polyline points="9 21 3 21 3 15" />
    <line x1="21" x2="14" y1="3" y2="10" />
    <line x1="3" x2="10" y1="21" y2="14" />
  </svg>
);

export const CloseIcon: React.FC<IconSvgProps> = ({
  size = 18,
  width,
  height,
  className,
  ...props
}) => (
  <svg
    className={className}
    fill="none"
    height={size || height}
    stroke="currentColor"
    strokeLinecap="round"
    strokeLinejoin="round"
    strokeWidth="1.5"
    viewBox="0 0 24 24"
    width={size || width}
    {...props}
  >
    <line x1="18" x2="6" y1="6" y2="18" />
    <line x1="6" x2="18" y1="6" y2="18" />
  </svg>
);

export const PlayIcon: React.FC<IconSvgProps> = ({
  size = 18,
  width,
  height,
  className,
  ...props
}) => (
  <svg
    className={className}
    fill="currentColor"
    height={size || height}
    viewBox="0 0 24 24"
    width={size || width}
    {...props}
  >
    <polygon points="6 3 20 12 6 21 6 3" />
  </svg>
);

export const PauseIcon: React.FC<IconSvgProps> = ({
  size = 18,
  width,
  height,
  className,
  ...props
}) => (
  <svg
    className={className}
    fill="currentColor"
    height={size || height}
    viewBox="0 0 24 24"
    width={size || width}
    {...props}
  >
    <rect height="16" width="4" x="6" y="4" />
    <rect height="16" width="4" x="14" y="4" />
  </svg>
);

export const ArrowRightIcon: React.FC<IconSvgProps> = ({
  size = 18,
  width,
  height,
  className,
  ...props
}) => (
  <svg
    className={className}
    fill="none"
    height={size || height}
    stroke="currentColor"
    strokeLinecap="round"
    strokeLinejoin="round"
    strokeWidth="1.5"
    viewBox="0 0 24 24"
    width={size || width}
    {...props}
  >
    <line x1="5" x2="19" y1="12" y2="12" />
    <polyline points="12 5 19 12 12 19" />
  </svg>
);

export const HomeIcon: React.FC<IconSvgProps> = ({
  size = 18,
  width,
  height,
  className,
  ...props
}) => (
  <svg
    className={className}
    fill="none"
    height={size || height}
    stroke="currentColor"
    strokeLinecap="round"
    strokeLinejoin="round"
    strokeWidth="1.5"
    viewBox="0 0 24 24"
    width={size || width}
    {...props}
  >
    <path d="M3 9.5L12 3l9 6.5V20a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V9.5z" />
    <polyline points="9 22 9 12 15 12 15 22" />
  </svg>
);

export const ArrowLeftIcon: React.FC<IconSvgProps> = ({
  size = 18,
  width,
  height,
  className,
  ...props
}) => (
  <svg
    className={className}
    fill="none"
    height={size || height}
    stroke="currentColor"
    strokeLinecap="round"
    strokeLinejoin="round"
    strokeWidth="1.5"
    viewBox="0 0 24 24"
    width={size || width}
    {...props}
  >
    <line x1="19" x2="5" y1="12" y2="12" />
    <polyline points="12 19 5 12 12 5" />
  </svg>
);

export const VolumeHighIcon: React.FC<IconSvgProps> = ({
  size = 18,
  width,
  height,
  className,
  ...props
}) => (
  <svg
    className={className}
    fill="none"
    height={size || height}
    stroke="currentColor"
    strokeLinecap="round"
    strokeLinejoin="round"
    strokeWidth="1.5"
    viewBox="0 0 24 24"
    width={size || width}
    {...props}
  >
    <polygon points="11 5 6 9 2 9 2 15 6 15 11 19 11 5" />
    <path d="M19.07 4.93a10 10 0 0 1 0 14.14M15.54 8.46a5 5 0 0 1 0 7.07" />
  </svg>
);

export const VolumeMuteIcon: React.FC<IconSvgProps> = ({
  size = 18,
  width,
  height,
  className,
  ...props
}) => (
  <svg
    className={className}
    fill="none"
    height={size || height}
    stroke="currentColor"
    strokeLinecap="round"
    strokeLinejoin="round"
    strokeWidth="1.5"
    viewBox="0 0 24 24"
    width={size || width}
    {...props}
  >
    <polygon points="11 5 6 9 2 9 2 15 6 15 11 19 11 5" />
    <line x1="23" x2="17" y1="9" y2="15" />
    <line x1="17" x2="23" y1="9" y2="15" />
  </svg>
);

export const CopyIcon: React.FC<IconSvgProps> = ({
  size = 16,
  width,
  height,
  className,
  ...props
}) => (
  <svg
    className={className}
    fill="none"
    height={size || height}
    stroke="currentColor"
    strokeLinecap="round"
    strokeLinejoin="round"
    strokeWidth="1.5"
    viewBox="0 0 24 24"
    width={size || width}
    {...props}
  >
    <rect height="13" rx="2" ry="2" width="13" x="9" y="9" />
    <path d="M5 15H4a2 2 0 0 1-2-2V4a2 2 0 0 1 2-2h9a2 2 0 0 1 2 2v1" />
  </svg>
);

export const CheckIcon: React.FC<IconSvgProps> = ({
  size = 16,
  width,
  height,
  className,
  ...props
}) => (
  <svg
    className={className}
    fill="none"
    height={size || height}
    stroke="currentColor"
    strokeLinecap="round"
    strokeLinejoin="round"
    strokeWidth="1.5"
    viewBox="0 0 24 24"
    width={size || width}
    {...props}
  >
    <polyline points="20 6 9 17 4 12" />
  </svg>
);
