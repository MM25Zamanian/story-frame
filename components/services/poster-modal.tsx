"use client";

import { useState } from "react";
import Image from "next/image";
import { Modal, Button } from "@heroui/react";
import { Eye, X, Download, ExternalLink, ZoomIn } from "lucide-react";

interface PosterModalProps {
  imageSrc: string;
  title: string;
  subtitle?: string;
  buttonLabel?: string;
  showThumbnail?: boolean;
}

export function PosterModal({
  imageSrc,
  title,
  subtitle = "پوستر و منبع اصلی خدمت",
  buttonLabel = "مشاهده پوستر",
  showThumbnail = true,
}: PosterModalProps) {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <>
      <div className="flex items-center gap-2">
        {showThumbnail && (
          <button
            aria-label={`مشاهده و بزرگنمایی تصویر پوستر ${title}`}
            className="group relative w-12 h-12 rounded-xl overflow-hidden border border-border bg-surface shrink-0 cursor-pointer shadow-2xs hover:border-accent/60 transition-all active:scale-95 focus-visible:outline-hidden focus-visible:ring-2 focus-visible:ring-accent focus-visible:ring-offset-2"
            type="button"
            onClick={() => setIsOpen(true)}
          >
            <Image
              unoptimized
              alt={`پیش‌نمایش ${title}`}
              className="w-full h-full object-cover transition-transform duration-300 group-hover:scale-110"
              height={48}
              src={imageSrc}
              width={48}
            />
            <div className="absolute inset-0 bg-black/25 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center text-white">
              <ZoomIn size={16} />
            </div>
          </button>
        )}

        <button
          aria-label={`${buttonLabel} - ${title}`}
          className="min-h-[44px] px-3.5 py-2 rounded-xl text-xs font-semibold inline-flex items-center gap-2 border border-border bg-surface/80 hover:bg-surface hover:border-accent/50 text-foreground transition-all duration-150 active:scale-95 cursor-pointer shadow-2xs focus-visible:outline-hidden focus-visible:ring-2 focus-visible:ring-accent focus-visible:ring-offset-2"
          type="button"
          onClick={() => setIsOpen(true)}
        >
          <Eye className="text-muted" size={15} />
          <span>{buttonLabel}</span>
        </button>
      </div>

      {isOpen && (
        <Modal>
          <Modal.Backdrop
            className="bg-black/85 backdrop-blur-md z-50 fixed inset-0 flex items-center justify-center p-3 sm:p-6"
            isOpen={isOpen}
            onOpenChange={(open) => !open && setIsOpen(false)}
          >
            <Modal.Container className="w-full h-full max-w-4xl max-h-[92vh] flex flex-col justify-center">
              <Modal.Dialog className="relative w-full h-full flex flex-col bg-background text-foreground border border-border rounded-2xl overflow-hidden shadow-2xl">
                {/* Modal Header */}
                <div className="h-16 px-4 sm:px-6 flex items-center justify-between border-b border-border bg-surface shrink-0">
                  <div className="flex items-center gap-3 min-w-0">
                    <span className="w-2.5 h-2.5 rounded-full bg-accent shrink-0" />
                    <div className="flex flex-col min-w-0">
                      <h3 className="text-xs sm:text-sm font-bold truncate">
                        {title}
                      </h3>
                      <span className="text-[11px] text-muted truncate">
                        {subtitle}
                      </span>
                    </div>
                  </div>

                  <div className="flex items-center gap-2">
                    <a
                      aria-label="مشاهده تصویر اصلی در تب جدید"
                      className="min-h-[44px] min-w-[44px] flex items-center justify-center rounded-xl border border-border bg-surface text-foreground hover:text-accent hover:border-accent transition-colors"
                      href={imageSrc}
                      rel="noopener noreferrer"
                      target="_blank"
                    >
                      <ExternalLink size={16} />
                    </a>
                    <Button
                      isIconOnly
                      aria-label="بستن پنجره"
                      className="min-h-[44px] min-w-[44px] rounded-xl"
                      size="md"
                      variant="tertiary"
                      onPress={() => setIsOpen(false)}
                    >
                      <X size={18} />
                    </Button>
                  </div>
                </div>

                {/* Image Stage */}
                <div className="relative flex-1 w-full h-full p-3 sm:p-6 flex items-center justify-center bg-black/5 dark:bg-black/40 overflow-auto">
                  <div className="relative max-h-full w-auto flex items-center justify-center">
                    <Image
                      unoptimized
                      alt={title}
                      className="max-h-[72vh] w-auto h-auto object-contain rounded-xl shadow-md"
                      height={1200}
                      src={imageSrc}
                      width={900}
                    />
                  </div>
                </div>

                {/* Modal Footer */}
                <div className="h-14 px-4 sm:px-6 flex items-center justify-between border-t border-border bg-surface text-xs text-muted">
                  <span>منبع: هماهنگی و مستندات میدانی رویداد</span>
                  <a
                    download
                    aria-label="دانلود فایل تصویر با کیفیت اصلی"
                    className="min-h-[44px] inline-flex items-center gap-1.5 text-accent font-semibold hover:underline px-2"
                    href={imageSrc}
                  >
                    <Download size={15} />
                    <span>دانلود فایل تصویر</span>
                  </a>
                </div>
              </Modal.Dialog>
            </Modal.Container>
          </Modal.Backdrop>
        </Modal>
      )}
    </>
  );
}
