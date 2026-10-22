"use client";

import { useState } from "react";
import Image from "next/image";
import { Modal, Button } from "@heroui/react";
import { Eye, X, Download, ExternalLink } from "lucide-react";

interface PosterModalProps {
  imageSrc: string;
  title: string;
  subtitle?: string;
  buttonLabel?: string;
}

export function PosterModal({
  imageSrc,
  title,
  subtitle = "پوستر و منبع اصلی خدمت",
  buttonLabel = "مشاهده پوستر اصلی",
}: PosterModalProps) {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <>
      <Button
        aria-label={buttonLabel}
        className="rounded-full text-xs font-medium gap-1.5 border border-border bg-surface/60 hover:bg-surface hover:border-accent/40 text-foreground transition-all duration-200"
        size="sm"
        variant="outline"
        onPress={() => setIsOpen(true)}
      >
        <Eye className="text-muted" size={14} />
        <span>{buttonLabel}</span>
      </Button>

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
                <div className="h-14 px-4 sm:px-6 flex items-center justify-between border-b border-border bg-surface shrink-0">
                  <div className="flex items-center gap-2.5 min-w-0">
                    <span className="w-2 h-2 rounded-full bg-accent shrink-0" />
                    <div className="flex flex-col min-w-0">
                      <h3 className="text-xs sm:text-sm font-bold truncate">
                        {title}
                      </h3>
                      <span className="text-[10px] text-muted truncate">
                        {subtitle}
                      </span>
                    </div>
                  </div>

                  <div className="flex items-center gap-2">
                    <a
                      aria-label="مشاهده تصویر در تب جدید"
                      className="p-1.5 rounded-lg border border-border bg-surface text-foreground hover:text-accent hover:border-accent transition-colors"
                      href={imageSrc}
                      rel="noopener noreferrer"
                      target="_blank"
                    >
                      <ExternalLink size={15} />
                    </a>
                    <Button
                      isIconOnly
                      aria-label="بستن پنجره"
                      className="rounded-lg"
                      size="sm"
                      variant="tertiary"
                      onPress={() => setIsOpen(false)}
                    >
                      <X size={16} />
                    </Button>
                  </div>
                </div>

                {/* Image Stage */}
                <div className="relative flex-1 w-full h-full p-2 sm:p-4 flex items-center justify-center bg-black/5 dark:bg-black/40 overflow-auto">
                  <div className="relative max-h-full w-auto flex items-center justify-center">
                    <Image
                      unoptimized
                      alt={title}
                      className="max-h-[75vh] w-auto h-auto object-contain rounded-lg shadow-sm"
                      height={1200}
                      src={imageSrc}
                      width={900}
                    />
                  </div>
                </div>

                {/* Modal Footer */}
                <div className="h-12 px-4 sm:px-6 flex items-center justify-between border-t border-border bg-surface text-xs text-muted">
                  <span>منبع: هماهنگی و مستندات میدانی رویداد</span>
                  <a
                    download
                    className="inline-flex items-center gap-1 text-accent font-medium hover:underline"
                    href={imageSrc}
                  >
                    <Download size={13} />
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
