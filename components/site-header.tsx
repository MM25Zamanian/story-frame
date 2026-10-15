"use client";

import { useRouter, usePathname } from "next/navigation";
import { Button } from "@heroui/react";

import { ArrowRightIcon, HomeIcon } from "@/components/icons";
import { ThemeSwitch } from "@/components/theme-switch";

export function SiteHeader() {
  const router = useRouter();
  const pathname = usePathname();
  const isHome = pathname === "/";

  const handleBack = () => {
    if (typeof window !== "undefined" && window.history.length > 1) {
      router.back();
    } else {
      router.push("/");
    }
  };

  return (
    <header className="sticky top-0 z-40 w-full isolate pt-2">
      <div className="shell relative z-20 h-14 flex items-center justify-between">
        {/* Back Button */}
        <Button
          isIconOnly
          aria-label="بازگشت"
          className="rounded-full shadow-2xs bg-background/50 backdrop-blur-2xl"
          isDisabled={isHome}
          size="md"
          variant="outline"
          onPress={handleBack}
        >
          <ArrowRightIcon size={18} />
        </Button>

        {/* End Actions: Theme Switch + Home Button */}
        <div className="flex items-center gap-2">
          <ThemeSwitch />
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
        </div>
      </div>
    </header>
  );
}
