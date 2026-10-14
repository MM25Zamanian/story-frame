import { Vazirmatn, Noto_Naskh_Arabic } from "next/font/google";

export const fontSans = Vazirmatn({
  subsets: ["arabic", "latin"],
  variable: "--font-vazirmatn",
  display: "swap",
});

export const fontArabic = Noto_Naskh_Arabic({
  subsets: ["arabic"],
  weight: ["400", "500", "600", "700"],
  variable: "--font-arabic-font",
  display: "swap",
});

export const fontMono = fontSans;

