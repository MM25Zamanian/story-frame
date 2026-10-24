import { Metadata } from "next";
import {
  Phone,
  MessageCircle,
  ExternalLink,
  MapPin,
  Clock,
  Sparkles,
  Package,
  Utensils,
  GlassWater,
  Store,
  AlertCircle,
  Tag,
  CheckCircle2,
} from "lucide-react";

import { servicesData } from "@/data/services";
import { Reveal } from "@/components/reveal";
import { CopyButton } from "@/components/services/copy-button";
import { PosterModal } from "@/components/services/poster-modal";
import { ServicesNav } from "@/components/services/services-nav";
import { ServicesBreadcrumb } from "@/components/services/services-breadcrumb";

export const metadata: Metadata = {
  title: "خدمات ما",
  description:
    "فهرست خدمات، تجهیزات مراسم، غذای گرم، پذیرایی و فروشگاه‌های مذهبی ویژه مخاطبان قاب روایت",
};

function formatPrice(price: number): string {
  return price.toLocaleString("fa-IR");
}

export default function ServicesPage() {
  const { equipment, foodCatering, refreshments, culturalShops } = servicesData;

  return (
    <div className="shell py-8 pb-24">
      {/* Editorial Page Header */}
      <Reveal entrance>
        <header className="mb-8">
          {/* Breadcrumb */}
          <ServicesBreadcrumb />

          <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-accent/10 border border-accent/25 text-xs font-semibold text-accent shadow-2xs">
            <Sparkles size={14} />
            <span>پشتیبانی و تدارکات مجالس و رویدادهای آیینی</span>
          </div>

          <h1 className="text-3xl sm:text-4xl lg:text-5xl font-extrabold tracking-tight text-foreground mt-4">
            خدمات ما
          </h1>

          <p className="text-sm sm:text-base leading-relaxed text-muted mt-3 max-w-2xl">
            مجموعه‌ای از مراکز معتمد و ارائه‌دهنده خدمات تخصصی برای برپایی هرچه
            شایسته‌تر مراسم‌ها، ایستگاه‌های صلواتی، برنامه‌های صحنه‌ای و جلسات
            مذهبی.
          </p>

          <div className="h-px w-full bg-border mt-8" />
        </header>
      </Reveal>

      {/* Sticky Quick-Access Navigation Bar */}
      <ServicesNav />

      {/* Main Content Stream */}
      <div className="flex flex-col gap-12 sm:gap-16">
        {/* ========================================================= */}
        {/* SECTION 1: EQUIPMENT & EVENT LOGISTICS                    */}
        {/* ========================================================= */}
        <section
          aria-labelledby="heading-equipment"
          className="scroll-mt-28"
          id="equipment"
        >
          <Reveal>
            <div className="rounded-3xl border border-border bg-surface/30 p-6 sm:p-8 transition-all shadow-2xs">
              {/* Section Header */}
              <div className="flex flex-col md:flex-row md:items-center justify-between gap-5 pb-6 border-b border-border/80">
                <div className="flex items-start gap-3.5">
                  <div className="w-12 h-12 rounded-2xl bg-accent/10 border border-accent/20 flex items-center justify-center shrink-0 text-accent mt-0.5">
                    <Package size={22} />
                  </div>
                  <div>
                    <span className="text-[11px] font-bold text-accent tracking-wide uppercase">
                      تجهیز و لجستیک
                    </span>
                    <h2
                      className="text-xl sm:text-2xl font-bold text-foreground mt-0.5"
                      id="heading-equipment"
                    >
                      {equipment.title}
                    </h2>
                    <p className="text-xs sm:text-sm text-muted mt-1.5">
                      مسئول هماهنگی:{" "}
                      <span className="font-semibold text-foreground">
                        {equipment.coordinator}
                      </span>
                    </p>
                  </div>
                </div>

                {/* Poster Thumbnail & Modal */}
                <div className="self-start md:self-center shrink-0">
                  <PosterModal
                    buttonLabel="مشاهده پوستر تجهیزات"
                    imageSrc={equipment.posterImage}
                    subtitle="ملزومات برپایی جشن‌های غدیر و مراسم‌ها"
                    title={equipment.title}
                  />
                </div>
              </div>

              {/* Order Notice & Direct Messenger Actions */}
              <div className="my-6 p-5 rounded-2xl bg-surface border border-border/80 flex flex-col lg:flex-row lg:items-center justify-between gap-5">
                <div className="flex items-start gap-3.5">
                  <MessageCircle
                    className="text-accent shrink-0 mt-1"
                    size={20}
                  />
                  <div className="text-xs sm:text-sm text-muted leading-relaxed">
                    <p className="font-medium">{equipment.orderNotice}</p>
                    <p className="text-foreground font-semibold mt-1.5 flex items-center gap-2">
                      <span>شماره پیام‌رسان و تماس:</span>
                      <span className="font-mono dir-ltr font-bold text-accent inline-block text-sm">
                        {equipment.phone}
                      </span>
                    </p>
                  </div>
                </div>

                {/* Accessible Action Buttons (Touch Target >= 44px) */}
                <div className="flex flex-wrap items-center gap-2.5 shrink-0">
                  <a
                    aria-label={`ارسال پیام به ${equipment.coordinator} در پیام‌رسان بله (باز شدن در تب جدید)`}
                    className="min-h-[44px] px-4 py-2.5 rounded-xl bg-accent text-accent-foreground text-xs font-bold inline-flex items-center gap-2 hover:opacity-90 active:scale-95 transition-all shadow-2xs focus-visible:outline-hidden focus-visible:ring-2 focus-visible:ring-accent"
                    href={equipment.baleUrl}
                    rel="noopener noreferrer"
                    target="_blank"
                  >
                    <span>پیام در بله</span>
                    <ExternalLink size={14} />
                  </a>

                  <a
                    aria-label={`ارسال پیام به ${equipment.coordinator} در پیام‌رسان روبیکا (باز شدن در تب جدید)`}
                    className="min-h-[44px] px-4 py-2.5 rounded-xl border border-border bg-surface-secondary text-foreground text-xs font-bold inline-flex items-center gap-2 hover:border-accent active:scale-95 transition-all shadow-2xs focus-visible:outline-hidden focus-visible:ring-2 focus-visible:ring-accent"
                    href={equipment.rubikaUrl}
                    rel="noopener noreferrer"
                    target="_blank"
                  >
                    <span>پیام در روبیکا</span>
                    <ExternalLink size={14} />
                  </a>

                  <a
                    aria-label={`تماس تلفنی مستقیم با ${equipment.coordinator} به شماره ${equipment.phone}`}
                    className="min-h-[44px] px-4 py-2.5 rounded-xl border border-border bg-surface text-foreground text-xs font-bold inline-flex items-center gap-2 hover:border-accent hover:text-accent active:scale-95 transition-all shadow-2xs focus-visible:outline-hidden focus-visible:ring-2 focus-visible:ring-accent"
                    href={`tel:${equipment.phone}`}
                  >
                    <Phone size={15} />
                    <span>تماس تلفنی</span>
                  </a>
                </div>
              </div>

              {/* 8 Categories Grid */}
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
                {equipment.categories.map((cat, idx) => (
                  <div
                    key={idx}
                    className="rounded-2xl border border-border/80 bg-surface/70 hover:bg-surface p-4 sm:p-5 transition-all duration-200 flex flex-col justify-between"
                  >
                    <div>
                      <div className="flex items-center gap-2 mb-3">
                        <span className="w-2 h-2 rounded-full bg-accent" />
                        <h3 className="text-xs sm:text-sm font-bold text-foreground">
                          {cat.title}
                        </h3>
                      </div>
                      <div className="flex flex-wrap gap-1.5">
                        {cat.samples.map((sample, sIdx) => (
                          <span
                            key={sIdx}
                            className="text-xs px-2.5 py-1 rounded-lg bg-background border border-border/70 text-foreground/80 font-medium"
                          >
                            {sample}
                          </span>
                        ))}
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </Reveal>
        </section>

        {/* ========================================================= */}
        {/* SECTION 2: FOOD CATERING & MEALS                          */}
        {/* ========================================================= */}
        <section
          aria-labelledby="heading-food"
          className="scroll-mt-28"
          id="food"
        >
          <Reveal>
            <div className="rounded-3xl border border-border bg-surface/30 p-6 sm:p-8 transition-all shadow-2xs">
              {/* Section Header */}
              <div className="flex flex-col md:flex-row md:items-center justify-between gap-5 pb-6 border-b border-border/80">
                <div className="flex items-start gap-3.5">
                  <div className="w-12 h-12 rounded-2xl bg-accent/10 border border-accent/20 flex items-center justify-center shrink-0 text-accent mt-0.5">
                    <Utensils size={22} />
                  </div>
                  <div>
                    <span className="text-[11px] font-bold text-accent tracking-wide uppercase">
                      پذیرایی و اطعام
                    </span>
                    <h2
                      className="text-xl sm:text-2xl font-bold text-foreground mt-0.5"
                      id="heading-food"
                    >
                      {foodCatering.title}
                    </h2>
                    <p className="text-xs sm:text-sm text-muted mt-1.5 max-w-xl">
                      {foodCatering.subtitle}
                    </p>
                  </div>
                </div>

                <div className="self-start md:self-center shrink-0">
                  <PosterModal
                    buttonLabel="مشاهده پوستر منوی غذا"
                    imageSrc={foodCatering.posterImage}
                    subtitle="لیست قیمت غذاها و آشپزخانه‌ها"
                    title={foodCatering.title}
                  />
                </div>
              </div>

              {/* Providers Streams */}
              <div className="flex flex-col gap-10 mt-8">
                {foodCatering.providers.map((provider) => (
                  <div
                    key={provider.id}
                    className="rounded-2xl border border-border/80 bg-surface/50 p-5 sm:p-7"
                  >
                    {/* Provider Header */}
                    <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-5 mb-6 border-b border-border/60">
                      <div>
                        <div className="flex items-center gap-2.5">
                          <span className="w-2.5 h-2.5 rounded-full bg-accent" />
                          <h3 className="text-lg sm:text-xl font-bold text-foreground">
                            {provider.name}
                          </h3>
                        </div>
                        <p className="text-xs sm:text-sm text-muted mt-1.5">
                          {provider.description}
                        </p>
                      </div>

                      <div className="shrink-0">
                        <a
                          aria-label={`تماس تلفنی با ${provider.name} به شماره ${provider.phone}`}
                          className="min-h-[44px] px-4 py-2.5 rounded-xl border border-border bg-surface hover:border-accent hover:text-accent text-xs font-bold inline-flex items-center gap-2 transition-all active:scale-95 shadow-2xs focus-visible:outline-hidden focus-visible:ring-2 focus-visible:ring-accent"
                          href={`tel:${provider.phone}`}
                        >
                          <Phone size={15} />
                          <span>سفارش تلفنی:</span>
                          <span className="font-mono dir-ltr text-sm font-extrabold text-accent">
                            {provider.phone}
                          </span>
                        </a>
                      </div>
                    </div>

                    {/* Grouped Items (For Mosque Kitchen) */}
                    {provider.groups && (
                      <div className="flex flex-col gap-8">
                        {provider.groups.map((group, gIdx) => (
                          <div key={gIdx} className="flex flex-col gap-3">
                            {/* Group Subtitle */}
                            <div className="flex items-center gap-2">
                              <span className="w-1.5 h-1.5 rounded-full bg-accent" />
                              <h4 className="text-xs sm:text-sm font-extrabold text-foreground tracking-tight">
                                {group.groupName}
                              </h4>
                              <span className="text-[11px] font-mono text-muted">
                                ({group.items.length.toLocaleString("fa-IR")}{" "}
                                قلم)
                              </span>
                            </div>

                            {/* Group Menu Grid: 2 columns, ZERO Truncate */}
                            <div className="grid grid-cols-1 lg:grid-cols-2 gap-3">
                              {group.items.map((item, iIdx) => (
                                <div
                                  key={iIdx}
                                  className="flex items-start justify-between gap-3 p-3.5 sm:p-4 rounded-xl bg-background/80 border border-border/60 hover:border-accent/40 transition-colors shadow-2xs"
                                >
                                  {/* Item Name & Note with natural line breaks */}
                                  <div className="flex-1 min-w-0 flex flex-col pr-0.5">
                                    <span className="font-semibold text-sm text-foreground break-words leading-snug">
                                      {item.name}
                                    </span>
                                    {item.note && (
                                      <span className="text-xs text-muted mt-1 break-words leading-relaxed">
                                        {item.note}
                                      </span>
                                    )}
                                  </div>

                                  {/* Fixed Price Column */}
                                  <div className="shrink-0 flex items-baseline gap-1 pt-0.5 min-w-[85px] justify-end">
                                    <span className="font-bold text-accent font-mono tabular-nums text-sm sm:text-base">
                                      {formatPrice(item.price)}
                                    </span>
                                    <span className="text-[11px] text-muted">
                                      تومان
                                    </span>
                                  </div>
                                </div>
                              ))}
                            </div>
                          </div>
                        ))}
                      </div>
                    )}

                    {/* Standard Items (For Kebab and Burger) */}
                    {provider.items && (
                      <div className="grid grid-cols-1 lg:grid-cols-2 gap-3">
                        {provider.items.map((item, iIdx) => (
                          <div
                            key={iIdx}
                            className="flex items-start justify-between gap-3 p-3.5 sm:p-4 rounded-xl bg-background/80 border border-border/60 hover:border-accent/40 transition-colors shadow-2xs"
                          >
                            <div className="flex-1 min-w-0 flex flex-col pr-0.5">
                              <span className="font-semibold text-sm text-foreground break-words leading-snug">
                                {item.name}
                              </span>
                              {item.note && (
                                <span className="text-xs text-muted mt-1 break-words leading-relaxed">
                                  {item.note}
                                </span>
                              )}
                            </div>
                            <div className="shrink-0 flex items-baseline gap-1 pt-0.5 min-w-[85px] justify-end">
                              <span className="font-bold text-accent font-mono tabular-nums text-sm sm:text-base">
                                {formatPrice(item.price)}
                              </span>
                              <span className="text-[11px] text-muted">
                                تومان
                              </span>
                            </div>
                          </div>
                        ))}
                      </div>
                    )}
                  </div>
                ))}
              </div>
            </div>
          </Reveal>
        </section>

        {/* ========================================================= */}
        {/* SECTION 3: REFRESHMENTS & ICE CREAM                       */}
        {/* ========================================================= */}
        <section
          aria-labelledby="heading-refreshments"
          className="scroll-mt-28"
          id="refreshments"
        >
          <Reveal>
            <div className="rounded-3xl border border-border bg-surface/30 p-6 sm:p-8 transition-all shadow-2xs">
              {/* Section Header */}
              <div className="flex flex-col md:flex-row md:items-center justify-between gap-5 pb-6 border-b border-border/80">
                <div className="flex items-start gap-3.5">
                  <div className="w-12 h-12 rounded-2xl bg-accent/10 border border-accent/20 flex items-center justify-center shrink-0 text-accent mt-0.5">
                    <GlassWater size={22} />
                  </div>
                  <div>
                    <span className="text-[11px] font-bold text-accent tracking-wide uppercase">
                      پذیرایی طبیعی و خنک
                    </span>
                    <h2
                      className="text-xl sm:text-2xl font-bold text-foreground mt-0.5"
                      id="heading-refreshments"
                    >
                      {refreshments.brand}
                    </h2>
                    <p className="text-xs sm:text-sm text-muted mt-1.5">
                      {refreshments.tagline}
                    </p>
                  </div>
                </div>

                <div className="self-start md:self-center shrink-0">
                  <PosterModal
                    buttonLabel="مشاهده پوستر آبمیوه و بستنی"
                    imageSrc={refreshments.posterImage}
                    subtitle="آبمیوه طبیعی سیب و بستنی‌های ظرفی"
                    title={refreshments.brand}
                  />
                </div>
              </div>

              {/* Status Badges & Logistics Banner */}
              <div className="grid grid-cols-1 sm:grid-cols-3 gap-3.5 my-6">
                <div className="flex items-center gap-3 p-3.5 rounded-2xl bg-surface border border-border/80 text-xs sm:text-sm">
                  <Clock className="text-warning shrink-0" size={18} />
                  <span className="font-semibold text-foreground">
                    {refreshments.leadTime}
                  </span>
                </div>

                <div className="flex items-center gap-3 p-3.5 rounded-2xl bg-surface border border-border/80 text-xs sm:text-sm">
                  <MapPin className="text-accent shrink-0" size={18} />
                  <span className="text-muted">{refreshments.address}</span>
                </div>

                <div className="flex items-center justify-between gap-2 p-3 rounded-2xl bg-surface border border-border/80 text-xs sm:text-sm">
                  <div className="flex items-center gap-2 pr-1">
                    <Phone className="text-accent shrink-0" size={16} />
                    <span className="font-mono dir-ltr font-bold text-sm">
                      {refreshments.phone}
                    </span>
                  </div>
                  <a
                    aria-label={`تماس تلفنی با ${refreshments.brand} به شماره ${refreshments.phone}`}
                    className="min-h-[44px] px-3.5 py-2 rounded-xl bg-accent text-accent-foreground text-xs font-bold inline-flex items-center hover:opacity-90 active:scale-95 transition-all shadow-2xs focus-visible:outline-hidden focus-visible:ring-2 focus-visible:ring-accent"
                    href={`tel:${refreshments.phone}`}
                  >
                    تماس مستقیم
                  </a>
                </div>
              </div>

              {/* Products Details */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                {/* Juice Card */}
                <div className="rounded-2xl border border-border/80 bg-surface/60 p-5 sm:p-6 flex flex-col justify-between">
                  <div>
                    <div className="flex items-center justify-between gap-2 mb-3.5">
                      <span className="inline-flex items-center text-xs font-bold px-2.5 py-1 rounded-md bg-accent/10 text-accent border border-accent/20">
                        آبمیوه ۱۰۰٪ طبیعی
                      </span>
                      <span className="text-xs text-muted font-medium">
                        {refreshments.juice.volume}
                      </span>
                    </div>

                    <h3 className="text-lg sm:text-xl font-bold text-foreground">
                      {refreshments.juice.name}
                    </h3>
                    <p className="text-xs sm:text-sm text-muted mt-2 leading-relaxed">
                      {refreshments.juice.yieldInfo}
                    </p>
                  </div>

                  <div className="pt-5 mt-6 border-t border-border/50 flex items-center justify-between">
                    <span className="text-xs sm:text-sm text-muted font-medium">
                      قیمت هر بطری:
                    </span>
                    <div className="flex items-baseline gap-1">
                      <span className="text-xl sm:text-2xl font-bold font-mono text-accent tabular-nums">
                        {formatPrice(refreshments.juice.price)}
                      </span>
                      <span className="text-xs text-muted">تومان</span>
                    </div>
                  </div>
                </div>

                {/* Ice Cream Card */}
                <div className="rounded-2xl border border-border/80 bg-surface/60 p-5 sm:p-6 flex flex-col justify-between">
                  <div>
                    <div className="flex items-center justify-between gap-2 mb-3.5">
                      <span className="inline-flex items-center text-xs font-bold px-2.5 py-1 rounded-md bg-accent/10 text-accent border border-accent/20">
                        بستنی ظرفی پذیرایی
                      </span>
                      <span className="text-xs text-muted font-medium">
                        {refreshments.iceCream.packaging}
                      </span>
                    </div>

                    <h3 className="text-lg sm:text-xl font-bold text-foreground">
                      {refreshments.iceCream.title}
                    </h3>

                    {/* Flavors */}
                    <div className="flex flex-wrap items-center gap-1.5 mt-3">
                      <span className="text-xs text-muted ml-1">طعم‌ها:</span>
                      {refreshments.iceCream.flavors.map((flavor, fIdx) => (
                        <span
                          key={fIdx}
                          className="text-xs font-semibold px-2.5 py-1 rounded-md bg-background border border-border text-foreground"
                        >
                          {flavor}
                        </span>
                      ))}
                    </div>
                  </div>

                  {/* Sizes and Prices */}
                  <div className="pt-4 mt-5 border-t border-border/50 flex flex-col gap-2.5">
                    {refreshments.iceCream.sizes.map((sizeItem, sIdx) => (
                      <div
                        key={sIdx}
                        className="flex items-center justify-between text-xs sm:text-sm py-2 px-3 rounded-xl bg-background/60 border border-border/40"
                      >
                        <span className="font-semibold text-foreground">
                          {sizeItem.capacity}
                        </span>
                        <div className="flex items-baseline gap-1">
                          <span className="font-bold font-mono text-accent tabular-nums text-sm sm:text-base">
                            {formatPrice(sizeItem.price)}
                          </span>
                          <span className="text-[11px] text-muted">تومان</span>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              </div>

              {/* Note */}
              <div className="mt-5 flex items-center gap-2 text-xs text-muted">
                <AlertCircle className="text-warning shrink-0" size={15} />
                <span>{refreshments.validityNote}</span>
              </div>
            </div>
          </Reveal>
        </section>

        {/* ========================================================= */}
        {/* SECTION 4: CULTURAL SHOPS & GIFTS                         */}
        {/* ========================================================= */}
        <section
          aria-labelledby="heading-shops"
          className="scroll-mt-28"
          id="cultural-shops"
        >
          <Reveal>
            <div className="rounded-3xl border border-border bg-surface/30 p-6 sm:p-8 transition-all shadow-2xs">
              {/* Section Header */}
              <div className="flex flex-col md:flex-row md:items-center justify-between gap-5 pb-6 border-b border-border/80">
                <div className="flex items-start gap-3.5">
                  <div className="w-12 h-12 rounded-2xl bg-accent/10 border border-accent/20 flex items-center justify-center shrink-0 text-accent mt-0.5">
                    <Store size={22} />
                  </div>
                  <div>
                    <span className="text-[11px] font-bold text-accent tracking-wide uppercase">
                      اقلام فرهنگی و هدایا
                    </span>
                    <h2
                      className="text-xl sm:text-2xl font-bold text-foreground mt-0.5"
                      id="heading-shops"
                    >
                      {culturalShops.title}
                    </h2>
                    <p className="text-xs sm:text-sm text-muted mt-1.5 max-w-xl">
                      {culturalShops.subtitle}
                    </p>
                  </div>
                </div>

                <div className="self-start md:self-center shrink-0">
                  <PosterModal
                    buttonLabel="مشاهده پوستر فروشگاه‌ها"
                    imageSrc={culturalShops.posterImage}
                    subtitle="مغیث و گنجینه ماندگار"
                    title={culturalShops.title}
                  />
                </div>
              </div>

              {/* Shops Cards */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mt-8">
                {/* 1. Moghis Online Store (Voucher / Ticket Aesthetic) */}
                <div className="relative rounded-3xl border-2 border-dashed border-accent/40 bg-gradient-to-br from-accent/5 via-surface/80 to-surface p-6 sm:p-7 flex flex-col justify-between shadow-xs">
                  <div>
                    {/* Top Badges */}
                    <div className="flex flex-wrap items-center justify-between gap-2 mb-4">
                      <span className="inline-flex items-center text-xs font-bold px-2.5 py-1 rounded-md bg-accent/15 text-accent border border-accent/25">
                        فروشگاه اینترنتی و ارسال سراسری
                      </span>
                      <span className="inline-flex items-center gap-1.5 text-xs font-extrabold px-3 py-1 rounded-full bg-warning/20 text-warning border border-warning/30 shadow-2xs">
                        <Tag size={13} />
                        <span>۳۰٪ تخفیف اختصاصی همراهان قاب روایت</span>
                      </span>
                    </div>

                    <h3 className="text-xl font-extrabold text-foreground tracking-tight">
                      فروشگاه اینترنتی مغیث
                    </h3>
                    <p className="text-xs sm:text-sm text-muted mt-2 leading-relaxed">
                      مرکز تخصصی تهیه انواع لوازم باکیفیت مناسب مراسم‌ها و
                      مناسبت‌های مذهبی (هدیه پایانی، استیکر، کتیبه و یادبود).
                    </p>

                    {/* Voucher Ticket Cutout Box */}
                    <div className="mt-6 p-4 sm:p-5 rounded-2xl bg-background border border-border shadow-xs flex flex-col sm:flex-row sm:items-center justify-between gap-4">
                      <div className="flex flex-col">
                        <span className="text-xs text-muted font-medium">
                          کد تخفیف اختصاصی ۳۰ درصدی:
                        </span>
                        <span className="text-base font-extrabold font-mono text-accent mt-0.5 tracking-wider">
                          Taha30
                        </span>
                      </div>

                      <CopyButton label="کپی کد تخفیف" textToCopy="Taha30" />
                    </div>
                  </div>

                  {/* Action Link to Store */}
                  <div className="pt-6 mt-6 border-t border-border/60 flex items-center justify-between gap-3">
                    <span className="text-xs font-mono text-muted">
                      moqisshoping.ir
                    </span>
                    <a
                      aria-label="ورود به فروشگاه اینترنتی مغیث جهت خرید با تخفیف (باز شدن در تب جدید)"
                      className="min-h-[44px] px-4 py-2.5 rounded-xl bg-accent text-accent-foreground text-xs font-bold inline-flex items-center gap-2 hover:opacity-90 active:scale-95 transition-all shadow-2xs focus-visible:outline-hidden focus-visible:ring-2 focus-visible:ring-accent"
                      href="https://moqisshoping.ir"
                      rel="noopener noreferrer"
                      target="_blank"
                    >
                      <span>ورود به فروشگاه اینترنتی</span>
                      <ExternalLink size={14} />
                    </a>
                  </div>
                </div>

                {/* 2. Ganjineh Mandegar (In-Person Store) */}
                <div className="rounded-3xl border border-border/90 bg-surface/60 p-6 sm:p-7 flex flex-col justify-between shadow-xs">
                  <div>
                    <div className="flex items-center justify-between gap-2 mb-4">
                      <span className="inline-flex items-center text-xs font-bold px-2.5 py-1 rounded-md bg-accent/10 text-accent border border-accent/20">
                        خرید حضوری در مشهد
                      </span>
                    </div>

                    <h3 className="text-xl font-extrabold text-foreground tracking-tight">
                      فروشگاه گنجینه ماندگار
                    </h3>
                    <p className="text-xs sm:text-sm text-muted mt-2 leading-relaxed">
                      مرکز عرضه مستقیم لوازم مراسم‌ها شامل هدیه پایانی، استیکر،
                      کتیبه و یادبود فرهنگی برای هیئات و تشکل‌ها.
                    </p>

                    {/* In-Person Address Box */}
                    <div className="mt-6 p-4 sm:p-5 rounded-2xl bg-background border border-border shadow-xs flex items-start gap-3.5">
                      <MapPin
                        className="text-accent shrink-0 mt-0.5"
                        size={20}
                      />
                      <div className="flex flex-col text-xs sm:text-sm">
                        <span className="text-muted font-medium">
                          آدرس خرید حضوری:
                        </span>
                        <span className="font-bold text-foreground mt-1 text-sm sm:text-base leading-snug">
                          مشهد، بین آیت‌الله عبادی ۱۹ و ۲۱
                        </span>
                      </div>
                    </div>
                  </div>

                  {/* In-person Note */}
                  <div className="pt-6 mt-6 border-t border-border/60 flex items-center gap-2 text-xs text-muted">
                    <CheckCircle2 className="text-accent shrink-0" size={16} />
                    <span>مراجعه حضوری همه روزه جهت انتخاب نمونه‌ها</span>
                  </div>
                </div>
              </div>
            </div>
          </Reveal>
        </section>
      </div>
    </div>
  );
}
