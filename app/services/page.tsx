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
} from "lucide-react";

import { servicesData } from "@/data/services";
import { Reveal } from "@/components/reveal";
import { CopyButton } from "@/components/services/copy-button";
import { PosterModal } from "@/components/services/poster-modal";
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
        <header className="mb-10">
          {/* Breadcrumb / Eyebrow */}
          <ServicesBreadcrumb />

          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-accent/10 border border-accent/20 text-xs font-semibold text-accent shadow-2xs">
            <Sparkles size={13} />
            <span>پشتیبانی و تدارکات رویدادهای آیینی</span>
          </div>

          <h1 className="text-3xl sm:text-4xl font-extrabold tracking-tight text-foreground mt-4">
            خدمات ما
          </h1>

          <p className="text-sm sm:text-base leading-relaxed text-muted mt-2 max-w-2xl">
            مجموعه‌ای از مراکز معتمد و ارائه‌دهنده خدمات تخصصی برای برپایی هرچه
            شایسته‌تر مراسم‌ها، ایستگاه‌های صلواتی، برنامه‌های صحنه‌ای و جلسات
            مذهبی.
          </p>

          {/* Quick Anchor Navigation */}
          <nav
            aria-label="پرش سریع به خدمات"
            className="flex flex-wrap items-center gap-2 pt-6"
          >
            <a
              className="inline-flex items-center gap-1.5 px-3.5 py-1.5 rounded-full text-xs font-medium border border-border bg-surface hover:bg-surface-hover hover:border-accent/40 text-foreground transition-all duration-150"
              href="#equipment"
            >
              <Package className="text-accent" size={13} />
              <span>تجهیزات و ملزومات</span>
            </a>
            <a
              className="inline-flex items-center gap-1.5 px-3.5 py-1.5 rounded-full text-xs font-medium border border-border bg-surface hover:bg-surface-hover hover:border-accent/40 text-foreground transition-all duration-150"
              href="#food"
            >
              <Utensils className="text-accent" size={13} />
              <span>پذیرایی و غذای گرم</span>
            </a>
            <a
              className="inline-flex items-center gap-1.5 px-3.5 py-1.5 rounded-full text-xs font-medium border border-border bg-surface hover:bg-surface-hover hover:border-accent/40 text-foreground transition-all duration-150"
              href="#refreshments"
            >
              <GlassWater className="text-accent" size={13} />
              <span>آبمیوه طبیعی و بستنی</span>
            </a>
            <a
              className="inline-flex items-center gap-1.5 px-3.5 py-1.5 rounded-full text-xs font-medium border border-border bg-surface hover:bg-surface-hover hover:border-accent/40 text-foreground transition-all duration-150"
              href="#cultural-shops"
            >
              <Store className="text-accent" size={13} />
              <span>فروشگاه‌ها و هدایا</span>
            </a>
          </nav>

          {/* Symmetrical Divider */}
          <div className="h-px w-full bg-border mt-8" />
        </header>
      </Reveal>

      {/* Main Services Stream */}
      <div className="flex flex-col gap-12 sm:gap-16">
        {/* ========================================================= */}
        {/* SECTION 1: EQUIPMENT & EVENT LOGISTICS                    */}
        {/* ========================================================= */}
        <section
          aria-labelledby="heading-equipment"
          className="scroll-mt-20"
          id="equipment"
        >
          <Reveal>
            <div className="rounded-3xl border border-border bg-surface/30 p-6 sm:p-8 transition-all shadow-2xs">
              {/* Section Header */}
              <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 pb-6 border-b border-border/80">
                <div className="flex items-start gap-3">
                  <div className="w-10 h-10 rounded-2xl bg-accent/10 border border-accent/20 flex items-center justify-center shrink-0 text-accent mt-0.5">
                    <Package size={20} />
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
                    <p className="text-xs sm:text-sm text-muted mt-1">
                      مسئول هماهنگی:{" "}
                      <span className="font-semibold text-foreground">
                        {equipment.coordinator}
                      </span>
                    </p>
                  </div>
                </div>

                {/* Poster Lightbox Action */}
                <div className="flex items-center gap-2 self-start md:self-center">
                  <PosterModal
                    buttonLabel="مشاهده پوستر تجهیزات"
                    imageSrc={equipment.posterImage}
                    subtitle="ملزومات برپایی جشن‌های غدیر و مراسم‌ها"
                    title={equipment.title}
                  />
                </div>
              </div>

              {/* Notice Banner */}
              <div className="my-6 p-4 rounded-2xl bg-surface border border-border/70 flex flex-col sm:flex-row sm:items-center justify-between gap-4">
                <div className="flex items-start gap-3">
                  <MessageCircle
                    className="text-accent shrink-0 mt-0.5"
                    size={18}
                  />
                  <div className="text-xs sm:text-sm text-muted leading-relaxed">
                    <p>{equipment.orderNotice}</p>
                    <p className="text-foreground font-semibold mt-1">
                      شماره تماس و پیام‌رسان:{" "}
                      <span className="font-mono dir-ltr inline-block">
                        {equipment.phone}
                      </span>
                    </p>
                  </div>
                </div>

                {/* Action Buttons for Messengers & Call */}
                <div className="flex flex-wrap items-center gap-2 shrink-0">
                  <a
                    className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-xl bg-accent text-accent-foreground text-xs font-semibold hover:opacity-90 transition-opacity"
                    href={equipment.baleUrl}
                    rel="noopener noreferrer"
                    target="_blank"
                  >
                    <span>پیام در بله</span>
                    <ExternalLink size={12} />
                  </a>

                  <a
                    className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-xl border border-border bg-surface-secondary text-foreground text-xs font-semibold hover:border-accent transition-colors"
                    href={equipment.rubikaUrl}
                    rel="noopener noreferrer"
                    target="_blank"
                  >
                    <span>پیام در روبیکا</span>
                    <ExternalLink size={12} />
                  </a>

                  <a
                    className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-xl border border-border bg-surface text-foreground text-xs font-semibold hover:border-accent hover:text-accent transition-colors"
                    href={`tel:${equipment.phone}`}
                  >
                    <Phone size={13} />
                    <span>تماس</span>
                  </a>
                </div>
              </div>

              {/* 8 Categories Grid */}
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-3.5">
                {equipment.categories.map((cat, idx) => (
                  <div
                    key={idx}
                    className="rounded-2xl border border-border/80 bg-surface/70 hover:bg-surface p-4 transition-all duration-200"
                  >
                    <div className="flex items-center gap-2 mb-2.5">
                      <span className="w-1.5 h-1.5 rounded-full bg-accent" />
                      <h3 className="text-xs font-bold text-foreground">
                        {cat.title}
                      </h3>
                    </div>
                    <div className="flex flex-wrap gap-1.5">
                      {cat.samples.map((sample, sIdx) => (
                        <span
                          key={sIdx}
                          className="text-[11px] px-2 py-0.5 rounded-md bg-background/80 border border-border/60 text-muted"
                        >
                          {sample}
                        </span>
                      ))}
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
          className="scroll-mt-20"
          id="food"
        >
          <Reveal>
            <div className="rounded-3xl border border-border bg-surface/30 p-6 sm:p-8 transition-all shadow-2xs">
              {/* Section Header */}
              <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 pb-6 border-b border-border/80">
                <div className="flex items-start gap-3">
                  <div className="w-10 h-10 rounded-2xl bg-accent/10 border border-accent/20 flex items-center justify-center shrink-0 text-accent mt-0.5">
                    <Utensils size={20} />
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
                    <p className="text-xs sm:text-sm text-muted mt-1 max-w-xl">
                      {foodCatering.subtitle}
                    </p>
                  </div>
                </div>

                <div className="flex items-center gap-2 self-start md:self-center">
                  <PosterModal
                    buttonLabel="مشاهده پوستر منوی غذا"
                    imageSrc={foodCatering.posterImage}
                    subtitle="لیست قیمت غذاها و آشپزخانه‌ها"
                    title={foodCatering.title}
                  />
                </div>
              </div>

              {/* Providers Subsections */}
              <div className="flex flex-col gap-8 mt-6">
                {foodCatering.providers.map((provider) => (
                  <div
                    key={provider.id}
                    className="rounded-2xl border border-border/80 bg-surface/60 p-5 sm:p-6"
                  >
                    {/* Provider Header */}
                    <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-4 mb-4 border-b border-border/60">
                      <div>
                        <div className="flex items-center gap-2">
                          <span className="w-2 h-2 rounded-full bg-accent" />
                          <h3 className="text-base sm:text-lg font-bold text-foreground">
                            {provider.name}
                          </h3>
                        </div>
                        <p className="text-xs text-muted mt-1">
                          {provider.description}
                        </p>
                      </div>

                      <div className="flex items-center gap-2 shrink-0">
                        <a
                          className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-xl border border-border bg-surface hover:border-accent hover:text-accent text-xs font-semibold transition-colors"
                          href={`tel:${provider.phone}`}
                        >
                          <Phone size={13} />
                          <span className="font-mono dir-ltr">
                            {provider.phone}
                          </span>
                        </a>
                      </div>
                    </div>

                    {/* Menu Items Table / Grid */}
                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-2.5">
                      {provider.items.map((item, iIdx) => (
                        <div
                          key={iIdx}
                          className="flex items-center justify-between gap-2 p-2.5 px-3 rounded-xl bg-background/70 border border-border/50 text-xs hover:border-accent/30 transition-colors"
                        >
                          <div className="flex flex-col min-w-0 pr-1">
                            <span className="font-medium text-foreground truncate">
                              {item.name}
                            </span>
                            {item.note && (
                              <span className="text-[10px] text-muted truncate">
                                {item.note}
                              </span>
                            )}
                          </div>
                          <div className="flex items-baseline gap-1 shrink-0">
                            <span className="font-bold text-accent font-mono text-sm">
                              {formatPrice(item.price)}
                            </span>
                            <span className="text-[10px] text-muted">
                              تومان
                            </span>
                          </div>
                        </div>
                      ))}
                    </div>
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
          className="scroll-mt-20"
          id="refreshments"
        >
          <Reveal>
            <div className="rounded-3xl border border-border bg-surface/30 p-6 sm:p-8 transition-all shadow-2xs">
              {/* Section Header */}
              <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 pb-6 border-b border-border/80">
                <div className="flex items-start gap-3">
                  <div className="w-10 h-10 rounded-2xl bg-accent/10 border border-accent/20 flex items-center justify-center shrink-0 text-accent mt-0.5">
                    <GlassWater size={20} />
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
                    <p className="text-xs sm:text-sm text-muted mt-1">
                      {refreshments.tagline}
                    </p>
                  </div>
                </div>

                <div className="flex items-center gap-2 self-start md:self-center">
                  <PosterModal
                    buttonLabel="مشاهده پوستر آبمیوه و بستنی"
                    imageSrc={refreshments.posterImage}
                    subtitle="آبمیوه طبیعی سیب و بستنی‌های ظرفی"
                    title={refreshments.brand}
                  />
                </div>
              </div>

              {/* Status Badges & Logistics Banner */}
              <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 my-6">
                <div className="flex items-center gap-2.5 p-3 rounded-2xl bg-surface border border-border/70 text-xs">
                  <Clock className="text-warning shrink-0" size={16} />
                  <span className="font-semibold text-foreground">
                    {refreshments.leadTime}
                  </span>
                </div>

                <div className="flex items-center gap-2.5 p-3 rounded-2xl bg-surface border border-border/70 text-xs">
                  <MapPin className="text-accent shrink-0" size={16} />
                  <span className="text-muted">{refreshments.address}</span>
                </div>

                <div className="flex items-center justify-between gap-2 p-3 rounded-2xl bg-surface border border-border/70 text-xs">
                  <div className="flex items-center gap-2">
                    <Phone className="text-accent shrink-0" size={16} />
                    <span className="font-mono dir-ltr font-semibold">
                      {refreshments.phone}
                    </span>
                  </div>
                  <a
                    className="px-2.5 py-1 rounded-lg bg-accent text-accent-foreground text-[11px] font-bold hover:opacity-90"
                    href={`tel:${refreshments.phone}`}
                  >
                    تماس
                  </a>
                </div>
              </div>

              {/* Products Details */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
                {/* Juice Card */}
                <div className="rounded-2xl border border-border/80 bg-surface/60 p-5 flex flex-col justify-between">
                  <div>
                    <div className="flex items-center justify-between gap-2 mb-3">
                      <span className="inline-flex items-center text-[10px] font-bold px-2 py-0.5 rounded-md bg-accent/10 text-accent border border-accent/20">
                        آبمیوه ۱۰۰٪ طبیعی
                      </span>
                      <span className="text-xs text-muted">
                        {refreshments.juice.volume}
                      </span>
                    </div>

                    <h3 className="text-lg font-bold text-foreground">
                      {refreshments.juice.name}
                    </h3>
                    <p className="text-xs text-muted mt-2 leading-relaxed">
                      {refreshments.juice.yieldInfo}
                    </p>
                  </div>

                  <div className="pt-5 mt-4 border-t border-border/50 flex items-center justify-between">
                    <span className="text-xs text-muted">قیمت هر بطری:</span>
                    <div className="flex items-baseline gap-1">
                      <span className="text-xl font-bold font-mono text-accent">
                        {formatPrice(refreshments.juice.price)}
                      </span>
                      <span className="text-xs text-muted">تومان</span>
                    </div>
                  </div>
                </div>

                {/* Ice Cream Card */}
                <div className="rounded-2xl border border-border/80 bg-surface/60 p-5 flex flex-col justify-between">
                  <div>
                    <div className="flex items-center justify-between gap-2 mb-3">
                      <span className="inline-flex items-center text-[10px] font-bold px-2 py-0.5 rounded-md bg-accent/10 text-accent border border-accent/20">
                        بستنی ظرفی پذیرایی
                      </span>
                      <span className="text-[11px] text-muted">
                        {refreshments.iceCream.packaging}
                      </span>
                    </div>

                    <h3 className="text-lg font-bold text-foreground">
                      {refreshments.iceCream.title}
                    </h3>

                    {/* Flavors */}
                    <div className="flex flex-wrap items-center gap-1.5 mt-2.5">
                      <span className="text-xs text-muted ml-1">طعم‌ها:</span>
                      {refreshments.iceCream.flavors.map((flavor, fIdx) => (
                        <span
                          key={fIdx}
                          className="text-[11px] font-medium px-2 py-0.5 rounded-md bg-background border border-border/70 text-foreground"
                        >
                          {flavor}
                        </span>
                      ))}
                    </div>
                  </div>

                  {/* Sizes and Prices */}
                  <div className="pt-4 mt-4 border-t border-border/50 flex flex-col gap-2">
                    {refreshments.iceCream.sizes.map((sizeItem, sIdx) => (
                      <div
                        key={sIdx}
                        className="flex items-center justify-between text-xs py-1 px-2.5 rounded-lg bg-background/50 border border-border/40"
                      >
                        <span className="font-medium text-foreground">
                          {sizeItem.capacity}
                        </span>
                        <div className="flex items-baseline gap-1">
                          <span className="font-bold font-mono text-accent">
                            {formatPrice(sizeItem.price)}
                          </span>
                          <span className="text-[10px] text-muted">تومان</span>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              </div>

              {/* Note */}
              <div className="mt-4 flex items-center gap-2 text-[11px] text-muted">
                <AlertCircle className="text-muted" size={13} />
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
          className="scroll-mt-20"
          id="cultural-shops"
        >
          <Reveal>
            <div className="rounded-3xl border border-border bg-surface/30 p-6 sm:p-8 transition-all shadow-2xs">
              {/* Section Header */}
              <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 pb-6 border-b border-border/80">
                <div className="flex items-start gap-3">
                  <div className="w-10 h-10 rounded-2xl bg-accent/10 border border-accent/20 flex items-center justify-center shrink-0 text-accent mt-0.5">
                    <Store size={20} />
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
                    <p className="text-xs sm:text-sm text-muted mt-1 max-w-xl">
                      {culturalShops.subtitle}
                    </p>
                  </div>
                </div>

                <div className="flex items-center gap-2 self-start md:self-center">
                  <PosterModal
                    buttonLabel="مشاهده پوستر فروشگاه‌ها"
                    imageSrc={culturalShops.posterImage}
                    subtitle="مغیث و گنجینه ماندگار"
                    title={culturalShops.title}
                  />
                </div>
              </div>

              {/* Shops Cards */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mt-6">
                {culturalShops.shops.map((shop) => (
                  <div
                    key={shop.id}
                    className="rounded-2xl border border-border/80 bg-surface/60 p-5 sm:p-6 flex flex-col justify-between"
                  >
                    <div>
                      {/* Top Badges */}
                      <div className="flex items-center justify-between gap-2 mb-3">
                        <span className="inline-flex items-center text-[10px] font-bold px-2 py-0.5 rounded-md bg-accent/10 text-accent border border-accent/20">
                          {shop.typeLabel}
                        </span>
                        {shop.discountPercent && (
                          <span className="inline-flex items-center gap-1 text-[11px] font-bold px-2 py-0.5 rounded-md bg-warning/15 text-warning border border-warning/30">
                            <Tag size={11} />
                            <span>{shop.discountPercent}٪ تخفیف اختصاصی</span>
                          </span>
                        )}
                      </div>

                      <h3 className="text-lg font-bold text-foreground">
                        {shop.name}
                      </h3>
                      <p className="text-xs sm:text-sm text-muted mt-2 leading-relaxed">
                        {shop.tagline}
                      </p>

                      {/* Special Box for Online Shop with Discount Code */}
                      {shop.discountCode && (
                        <div className="mt-5 p-4 rounded-xl bg-background border border-border flex flex-col sm:flex-row sm:items-center justify-between gap-3">
                          <div className="flex flex-col">
                            <span className="text-[11px] text-muted">
                              کد تخفیف ۳۰ درصدی مخاطبان:
                            </span>
                            <span className="text-sm font-bold font-mono text-accent">
                              {shop.discountCode}
                            </span>
                          </div>

                          <CopyButton
                            label="کپی کد تخفیف"
                            textToCopy={shop.discountCode}
                          />
                        </div>
                      )}

                      {/* In-person Address Box */}
                      {shop.address && (
                        <div className="mt-5 p-4 rounded-xl bg-background border border-border flex items-start gap-3">
                          <MapPin
                            className="text-accent shrink-0 mt-0.5"
                            size={16}
                          />
                          <div className="flex flex-col text-xs">
                            <span className="text-muted">آدرس خرید حضوری:</span>
                            <span className="font-semibold text-foreground mt-0.5">
                              {shop.address}
                            </span>
                          </div>
                        </div>
                      )}
                    </div>

                    {/* Action Link */}
                    {shop.website && (
                      <div className="pt-5 mt-5 border-t border-border/50 flex items-center justify-between">
                        <span className="text-xs font-mono text-muted">
                          {shop.websiteDisplay}
                        </span>
                        <a
                          className="inline-flex items-center gap-1.5 px-3.5 py-1.5 rounded-xl bg-accent text-accent-foreground text-xs font-semibold hover:opacity-90 transition-opacity"
                          href={shop.website}
                          rel="noopener noreferrer"
                          target="_blank"
                        >
                          <span>ورود به فروشگاه اینترنتی</span>
                          <ExternalLink size={13} />
                        </a>
                      </div>
                    )}
                  </div>
                ))}
              </div>
            </div>
          </Reveal>
        </section>
      </div>
    </div>
  );
}
