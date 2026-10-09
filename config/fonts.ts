import { Vazirmatn } from "next/font/google";
export const fontSans = Vazirmatn({
  subsets: ["arabic", "latin"],
  variable: "--font-vazirmatn",
  display: "swap",
});
export const fontMono = fontSans;
