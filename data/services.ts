export interface FoodItem {
  name: string;
  price: number; // in Tomans
  note?: string;
}

export interface FoodProvider {
  id: string;
  name: string;
  title: string;
  phone: string;
  description: string;
  items: FoodItem[];
}

export interface EquipmentCategory {
  title: string;
  samples: string[];
}

export interface ServiceData {
  equipment: {
    title: string;
    coordinator: string;
    phone: string;
    orderNotice: string;
    baleUrl: string;
    rubikaUrl: string;
    categories: EquipmentCategory[];
    posterImage: string;
  };
  foodCatering: {
    title: string;
    subtitle: string;
    providers: FoodProvider[];
    posterImage: string;
  };
  refreshments: {
    title: string;
    brand: string;
    tagline: string;
    phone: string;
    address: string;
    leadTime: string;
    validityNote: string;
    juice: {
      name: string;
      volume: string;
      price: number;
      yieldInfo: string;
    };
    iceCream: {
      title: string;
      flavors: string[];
      packaging: string;
      sizes: {
        capacity: string;
        price: number;
      }[];
    };
    posterImage: string;
  };
  culturalShops: {
    title: string;
    subtitle: string;
    shops: {
      id: string;
      name: string;
      type: "online" | "in-person";
      typeLabel: string;
      tagline: string;
      website?: string;
      websiteDisplay?: string;
      discountCode?: string;
      discountPercent?: number;
      address?: string;
    }[];
    posterImage: string;
  };
}

export const servicesData: ServiceData = {
  equipment: {
    title: "ملزومات و تجهیزات برپایی مراسم و جشن‌ها",
    coordinator: "آقای مخلصی",
    phone: "09397486223",
    orderNotice:
      "جهت سفارش وسایل و ملزومات جشن خود می‌توانید به شماره زیر فقط در پیام‌رسان‌های بله و روبیکا پیام دهید. برخی موارد در لیست قید نشده‌اند؛ در صورت نیاز به هر وسیله‌ای با شماره اعلام شده ارتباط بگیرید.",
    baleUrl: "https://ble.ir/09397486223",
    rubikaUrl: "https://rubika.ir/joinc/09397486223",
    posterImage: "/images/services/equipment-guide.jpg",
    categories: [
      {
        title: "سازه فلزی و جداکننده",
        samples: ["اسپیس فریم", "برزنت", "بست اسپیس", "پایه‌های نگه‌دارنده"],
      },
      {
        title: "سرمایش و گرمایش",
        samples: ["بخاری گازی", "کولر آبی", "هیتر صنعتی", "پنکه‌های پایه‌دار"],
      },
      {
        title: "صوت، نور، تصویر",
        samples: [
          "انواع باند و اکو",
          "بیسیم",
          "پاور میکسر",
          "پایه میکروفون",
          "پایه پرده ویدئو پروژکتور",
          "دیتا پروژکتور",
        ],
      },
      {
        title: "وسایل پذیرایی",
        samples: [
          "استکان و نعلبکی",
          "ترمس و فلاسک برقی",
          "جاکفشی",
          "سینی و قندان",
        ],
      },
      {
        title: "میز، صندلی، تریبون",
        samples: [
          "پالت و استیج",
          "تریبون سخنرانی",
          "رومیزی ساتن و مخمل",
          "صندلی تاشو و مبله",
        ],
      },
      {
        title: "فرش، موکت، پشتی",
        samples: ["پشتی سنتی", "فرش محرابی و تشریفات", "فرش کناره", "موکت"],
      },
      {
        title: "کتیبه و پارچه",
        samples: [
          "پرچم اهتزاز و دستی",
          "کتیبه‌های مخمل و قلمکار",
          "ریسه و ریسه‌بندی",
        ],
      },
      {
        title: "لوازم دکوری و تشریفاتی",
        samples: [
          "اسپند دودکن سنتی و برقی",
          "پایه شمعدان و لاله‌دان",
          "چوب‌پر خادمی",
          "سطل‌های زباله تفکیک",
        ],
      },
    ],
  },

  foodCatering: {
    title: "پذیرایی و منوی غذای گرم",
    subtitle:
      "تامین غذای مراسم‌ها، ایستگاه‌های صلواتی و مجالس از تامین‌کنندگان معتبر و مطمئن با بالاترین کیفیت پخت",
    posterImage: "/images/services/food-menu.jpg",
    providers: [
      {
        id: "emam-hassan",
        name: "آشپزخانه مسجد امام حسن عسکری (ع)",
        title: "منوی جامع چلوها، خورشت‌ها و سنتی",
        phone: "09904260334",
        description:
          "طبخ انواع غذاهای مجلسی با گوشت گرم و مواد اولیه درجه یک به همراه شله و حلیم مشهدی",
        items: [
          { name: "شوید پلو با گوشت گوسفند مخلوط", price: 330000 },
          { name: "چلو مرغ سرخ شده (ران ۴۰۰ تا ۴۲۰ گرم)", price: 318000 },
          { name: "چلو مرغ سرخ شده (ران ۳۵۰ تا ۳۸۰ گرم)", price: 298000 },
          { name: "چلو جوجه کباب ۲۲۰ گرمی", price: 298000 },
          { name: "چلو کباب کوبیده ۲ سیخ (هر سیخ ۹۰ گرم)", price: 298000 },
          { name: "چلو جوجه کباب ۱۶۰ گرمی", price: 248000 },
          { name: "ته‌چین مرغ و بادمجان", price: 225000 },
          { name: "چلو کباب کوبیده ۱ سیخ (۱۱۰ گرمی)", price: 218000 },
          { name: "ته‌چین مرغ مجلسی", price: 215000 },
          { name: "چلو مرغ (ران و سینه ۲۰۰ تا ۲۵۰ گرم)", price: 208000 },
          { name: "قیمه و قورمه‌سبزی و کرفس با گوشت گوساله", price: 198000 },
          { name: "شله مشهدی (هر نفر)", price: 198000 },
          { name: "چلو جوجه کباب ۱۳۰ گرمی", price: 188000 },
          { name: "حلیم هر نفر", price: 188000 },
          { name: "قیمه و قورمه‌سبزی و کرفس با گوشت مرغ", price: 178000 },
          { name: "پاستا آلفردو", price: 178000 },
          { name: "استامبولی با گوشت", price: 178000 },
          { name: "شوید پلو با مرغ مخلوط", price: 178000 },
          {
            name: "هویج پلو",
            price: 172000,
            note: "هویج طعم‌دار شده با ۱۰۰ گرم مرغ قیمه‌ای",
          },
          { name: "عدس پلو با گوشت چرخ‌کرده", price: 158000 },
          { name: "ماکارونی با گوشت چرخ‌کرده", price: 148000 },
          { name: "جوجه تک هر سیخ", price: 148000 },
          { name: "کوبیده تک هر سیخ", price: 88000 },
        ],
      },
      {
        id: "kebab-bama",
        name: "کباب باما",
        title: "سیخ‌های کباب و چلو مجلسی",
        phone: "09922893776",
        description:
          "سفارش مستقیم کباب‌های سیخی جهت ایستگاه‌ها و پذیرایی‌های عمومی",
        items: [
          { name: "کباب گوشت سیخ ۸۰ گرمی", price: 85000 },
          { name: "برنج پاکستانی پرسی", price: 80000 },
          { name: "کباب مرغ ۸۰ گرم سیخی", price: 55000 },
        ],
      },
      {
        id: "hasanzadeh",
        name: "اغذیه و ساندویچ آقای حسن‌زاده",
        title: "ساندویچ و فست‌فود مراسم",
        phone: "09156414743",
        description:
          "پذیرایی سبک و ساندویچی مناسب جوانان، نوجوانان و عوامل اجرایی",
        items: [
          { name: "ساندویچ مرغ", price: 170000 },
          { name: "ساندویچ همبرگر", price: 160000 },
          { name: "سلام خوراک", price: 135000 },
          { name: "ساندویچ فلافل", price: 110000 },
          { name: "ساندویچ ژامبون", price: 110000 },
        ],
      },
    ],
  },

  refreshments: {
    title: "نوشیدنی طبیعی و بستنی ظرفی مراسم",
    brand: "آبمیوه و بستنی بن‌سالم",
    tagline: "طعم طبیعی ... لذت واقعی",
    phone: "09016553594",
    address: "مشهد، نبش طبرسی شمالی ۷",
    leadTime: "سفارش حداقل ۴۸ ساعت قبل",
    validityNote:
      "اعتبار قیمت‌ها تا ۷ آبان (حداکثر امکان افزایش قیمت بعد از این تاریخ)",
    posterImage: "/images/services/natural-juice.jpg",
    juice: {
      name: "آبمیوه طبیعی سیب",
      volume: "بطری ۱ لیتری",
      price: 170000,
      yieldInfo: "هر لیتر حدوداً ۸ عدد لیوان آبخوری متوسط بازدهی دارد",
    },
    iceCream: {
      title: "بستنی ظرفی پذیرایی",
      flavors: ["وانیلی", "انبه", "موز", "توت‌فرنگی"],
      packaging: "همراه با قاشق اختصاصی و بسته‌بندی کاملاً بهداشتی",
      sizes: [
        { capacity: "ظرف ۶۰ سی‌سی", price: 22000 },
        { capacity: "ظرف ۱۵۰ سی‌سی", price: 38000 },
        { capacity: "ظرف ۲۵۰ سی‌سی", price: 62000 },
      ],
    },
  },

  culturalShops: {
    title: "فروشگاه‌های ملزومات، هدایا و یادبودهای مذهبی",
    subtitle:
      "معرفی مراکز تخصصی تهیه هدایای پایانی، استیکر، کتیبه و یادبود مراسم‌ها با تخفیف ویژه مخاطبان قاب روایت",
    posterImage: "/images/services/cultural-shops.jpg",
    shops: [
      {
        id: "moqis",
        name: "فروشگاه اینترنتی مغیث",
        type: "online",
        typeLabel: "خرید اینترنتی و ارسال سراسری",
        tagline:
          "تهیه انواع لوازم و محصولات باکیفیت مناسب مراسم‌ها و مناسبت‌های مذهبی",
        website: "https://moqisshoping.ir",
        websiteDisplay: "moqisshoping.ir",
        discountCode: "Taha30",
        discountPercent: 30,
      },
      {
        id: "ganjineh",
        name: "فروشگاه گنجینه ماندگار",
        type: "in-person",
        typeLabel: "خرید حضوری در مشهد",
        tagline:
          "مرکز تخصصی لوازم مراسم‌ها شامل هدیه پایانی، استیکر، کتیبه و یادبود فرهنگی",
        address: "مشهد، بین آیت‌الله عبادی ۱۹ و ۲۱",
      },
    ],
  },
};
