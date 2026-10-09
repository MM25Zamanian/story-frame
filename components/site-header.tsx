import Link from "next/link";

import { ThemeSwitch } from "@/components/theme-switch";
import { ExhibitionLogo } from "@/components/icons";
export function SiteHeader() {
  return (
    <header className="site-header">
      <div className="shell header-inner">
        <Link className="brand" href="/">
          <ExhibitionLogo size={30} />
          <span>
            استوری فریم<small>مرور تابلوهای مصور</small>
          </span>
        </Link>
        <div className="header-actions">
          <Link href="/#tableaus">تابلوها</Link>
          <ThemeSwitch />
        </div>
      </div>
    </header>
  );
}
