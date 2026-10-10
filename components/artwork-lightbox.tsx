"use client";

import Image from "next/image";
import { Modal, Button, Chip } from "@heroui/react";

import { ArtworkImage } from "@/types/artwork";
import { CloseIcon } from "@/components/icons";

interface ArtworkLightboxProps {
  image: ArtworkImage;
  title: string;
  isOpen: boolean;
  onClose: () => void;
}

export function ArtworkLightbox({
  image,
  title,
  isOpen,
  onClose,
}: ArtworkLightboxProps) {
  return (
    <Modal>
      <Modal.Backdrop
        className="bg-black/90 backdrop-blur-md z-50 fixed inset-0 flex items-center justify-center p-2 sm:p-4"
        isOpen={isOpen}
        onOpenChange={(open) => !open && onClose()}
      >
        <Modal.Container className="w-full h-full max-w-6xl max-h-[92vh] flex flex-col justify-center">
          <Modal.Dialog className="relative w-full h-full flex flex-col bg-overlay text-overlay-foreground border border-border rounded-xl overflow-hidden shadow-2xl">
            {/* Top Bar with Title and Close Trigger */}
            <div className="h-14 px-4 sm:px-6 flex items-center justify-between border-b border-border bg-surface/50 shrink-0">
              <div className="flex items-center gap-2.5">
                <span className="w-2 h-2 rounded-full bg-accent shrink-0" />
                <h3 className="text-xs sm:text-sm font-semibold truncate">
                  {title}
                </h3>
                <Chip
                  className="text-[10px] font-mono hidden sm:inline-flex"
                  size="sm"
                  variant="tertiary"
                >
                  وضوح موزه
                </Chip>
              </div>

              <Button
                aria-label="بستن نمای تمام‌صفحه"
                className="p-1.5 min-w-8 h-8 rounded-lg"
                size="sm"
                variant="tertiary"
                onPress={onClose}
              >
                <CloseIcon size={16} />
              </Button>
            </div>

            {/* High-Resolution Artwork Stage */}
            <div className="relative flex-1 w-full h-full p-2 sm:p-6 flex items-center justify-center">
              <div className="relative w-full h-full">
                <Image
                  fill
                  priority
                  alt={image.alt}
                  blurDataURL={image.blurDataURL}
                  className="object-contain"
                  placeholder={image.blurDataURL ? "blur" : "empty"}
                  quality={95}
                  sizes="100vw"
                  src={image.url}
                />
              </div>
            </div>

            {/* Bottom Bar: Instructions & Dimensions */}
            <div className="h-10 px-4 sm:px-6 flex items-center justify-between border-t border-border bg-surface/50 text-[11px] text-muted shrink-0">
              <span>{image.alt}</span>
              <div className="flex items-center gap-2">
                <span>کلید خروج:</span>
                <kbd className="px-1.5 py-0.5 border border-border bg-surface text-foreground text-[10px] rounded">
                  ESC
                </kbd>
              </div>
            </div>
          </Modal.Dialog>
        </Modal.Container>
      </Modal.Backdrop>
    </Modal>
  );
}
