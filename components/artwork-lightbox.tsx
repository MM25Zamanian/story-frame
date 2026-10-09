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
        className="bg-[#050505]/95 backdrop-blur-md z-50 fixed inset-0 flex items-center justify-center p-2 sm:p-4"
        isOpen={isOpen}
        onOpenChange={(open) => !open && onClose()}
      >
        <Modal.Container className="w-full h-full max-w-6xl max-h-[92vh] flex flex-col justify-center">
          <Modal.Dialog className="relative w-full h-full flex flex-col bg-[#0F0F0F] border border-white/10 rounded-none overflow-hidden shadow-2xl">
            {/* Top Bar with Title and Close Trigger */}
            <div className="h-14 px-4 sm:px-6 flex items-center justify-between border-b border-white/10 bg-black/60 shrink-0">
              <div className="flex items-center gap-2.5">
                <span className="w-2 h-2 rounded-none bg-white shrink-0" />
                <h3 className="text-xs sm:text-sm font-mono text-white/90 truncate uppercase tracking-widest">
                  {title}
                </h3>
                <Chip
                  className="text-[10px] font-mono text-white/60 bg-white/10 border-none rounded-none hidden sm:inline-flex"
                  size="sm"
                  variant="tertiary"
                >
                  وضوح موزه
                </Chip>
              </div>

              <Button
                aria-label="بستن نمای تمام‌صفحه"
                className="p-1.5 min-w-8 h-8 rounded-none border border-white/20 text-white hover:border-white bg-transparent"
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
                  className="object-contain"
                  quality={95}
                  sizes="100vw"
                  src={image.url}
                />
              </div>
            </div>

            {/* Bottom Bar: Instructions & Dimensions */}
            <div className="h-10 px-4 sm:px-6 flex items-center justify-between border-t border-white/10 bg-black/60 text-[11px] font-mono text-white/50 shrink-0">
              <span>{image.alt}</span>
              <div className="flex items-center gap-2">
                <span>کلید خروج:</span>
                <kbd className="px-1.5 py-0.5 border border-white/20 bg-white/10 text-white text-[10px]">
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
