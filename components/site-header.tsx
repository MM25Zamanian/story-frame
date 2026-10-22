"use client";

import { useEffect, useState } from "react";
import { useRouter, usePathname } from "next/navigation";
import { Button } from "@heroui/react";

import { ArrowRightIcon, HomeIcon } from "@/components/icons";
import { ThemeSwitch } from "@/components/theme-switch";

export function SiteHeader() {
  const router = useRouter();
  const pathname = usePathname();
  const [lastProgram, setLastProgram] = useState<string | null>(null);

  const segments = pathname.split("/").filter(Boolean);
  const isHome = pathname === "/";
  const isServices = pathname.startsWith("/services");
  const isCategories = pathname.startsWith("/categories");
  const isArtworks = pathname.startsWith("/artworks");

  const isProgramRoute =
    !isHome &&
    !isServices &&
    !isCategories &&
    !isArtworks &&
    segments.length >= 1;
  const programSlug = isProgramRoute ? segments[0] : null;
  const isProgramDetail = isProgramRoute && segments.length >= 2;
  const isProgramRoot = isProgramRoute && segments.length === 1;

  useEffect(() => {
    if (typeof window === "undefined") return;

    if (isHome) {
      sessionStorage.removeItem("storyframe_last_program");
      setLastProgram(null);
    } else if (isProgramRoute && programSlug) {
      sessionStorage.setItem("storyframe_last_program", programSlug);
      setLastProgram(programSlug);
    } else {
      const saved = sessionStorage.getItem("storyframe_last_program");

      setLastProgram(saved);
    }
  }, [pathname, isHome, isProgramRoute, programSlug]);

  const handleBack = () => {
    if (isProgramDetail && programSlug) {
      router.push(`/${programSlug}/`);

      return;
    }

    if (isProgramRoot) {
      return;
    }

    if (isServices && lastProgram) {
      router.push(`/${lastProgram}/`);

      return;
    }

    if (typeof window !== "undefined" && window.history.length > 1) {
      router.back();
    } else {
      router.push("/");
    }
  };

  const isBackDisabled = isHome || isProgramRoot;
  const hideHomeButton = isProgramRoute || (isServices && Boolean(lastProgram));

  return (
    <header className="sticky top-0 z-40 w-full isolate pt-2">
      <div className="shell relative z-20 h-14 flex items-center justify-between">
        {/* Back Button */}
        <Button
          isIconOnly
          aria-label="بازگشت"
          className="rounded-full shadow-2xs bg-background/50 backdrop-blur-2xl"
          isDisabled={isBackDisabled}
          size="md"
          variant="outline"
          onPress={handleBack}
        >
          <ArrowRightIcon size={18} />
        </Button>

        {/* End Actions: Theme Switch + Home Button */}
        <div className="flex items-center gap-2">
          <ThemeSwitch />
          {!hideHomeButton && (
            <Button
              isIconOnly
              aria-label="صفحه اصلی"
              className="rounded-full shadow-2xs bg-background/50 backdrop-blur-2xl"
              size="md"
              variant="outline"
              onPress={() => router.push("/")}
            >
              <HomeIcon size={18} />
            </Button>
          )}
        </div>
      </div>
    </header>
  );
}
