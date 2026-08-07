import type { ReactNode } from "react";
import type { Lang } from "@/hooks/use-lang";

export type UI = {
  /** Localized spelling of the name. TR uses official Turkish spelling. */
  name: { full: string; first: string; italic: string; rest: string };
  metaTitle: string;
  metaDesc: string;
  nav: { work: string; capabilities: string; impact: string; contact: string; getInTouch: string };
  hero: {
    location: string;
    srSuffix: string;
    intro: (yrs: string) => ReactNode;
    role: string;
    based: string;
    langs: string;
    scope: string;
    status: string;
    roleVal: string;
    basedVal: string;
    langsVal: string;
    scopeVal: string;
    statusVal: string;
    years: string;
  };
  sections: {
    capabilities: string;
    caseStudies: string;
    careerTimeline: string;
    education: string;
    certifications: string;
    contact: string;
    impact: string;
  };
  work: {
    intro: string;
    filterLabel: string;
    noMatches: string;
    reset: string;
    readCase: string;
    all: string;
  };
  contact: {
    headingA: string;
    headingEm: string;
    headingB: string;
    intro: string;
    cta: { linkedin: string; bookCall: string; bookCallVal: string };
    openForm: string;
    dialogTitle: string;
    dialogDesc: string;
    verifyMsg: string;
    sent: string;
    received: string;
    thanks: string;
    name: string;
    email: string;
    subject: string;
    message: string;
    namePh: string;
    emailPh: string;
    subjectPh: string;
    messagePh: string;
    submit: string;
    submitting: string;
    errorMsg: string;
    ariaForm: string;
  };
  errors: {
    nameReq: string;
    nameLong: string;
    emailInv: string;
    emailLong: string;
    subjectReq: string;
    subjectLong: string;
    messageMin: string;
    messageMax: string;
  };
  cookie: {
    text: string;
    accept: string;
    reject: string;
    aria: string;
  };
  footerLoc: string;
  caseStudy: {
    notFound: string;
    back: string;
    getInTouch: string;
    caseLabel: string;
    figPrefix: string;
    overview: string;
    challenges: string;
    approach: string;
    outcomes: string;
    client: string;
    role: string;
    period: string;
    location: string;
    nextCase: string;
    read: string;
    allWork: string;
    quoteBy: string;
  };
  categories: Record<string, string>;
};

export const ui: Record<Lang, UI> = {
  en: {
    name: { full: "Behrouz Bagherzadeh", first: "Behrouz", italic: "Bagher", rest: "zadeh" },
    metaTitle: "Behrouz Bagherzadeh — Digital Transformation & BI Leader",
    metaDesc:
      "Behrouz Bagherzadeh — Digital transformation and business intelligence leader in Istanbul. 15+ years building the layer between enterprise data and executive decisions.",
    nav: { work: "Work", capabilities: "Capabilities", impact: "Impact", contact: "Contact", getInTouch: "GET IN TOUCH" },
    hero: {
      location: "Portfolio · Istanbul, TR",
      srSuffix: " — Digital Transformation & BI Leader",
      years: "15+ years",
      intro: (yrs) => (
        <>Digital transformation and business intelligence leader,{" "}
          <span className="text-foreground">{yrs}</span>. I build the layer between the data and the decision — turning analytics and AI investments into something leadership can act on, not just look at.</>
      ),
      role: "ROLE",
      based: "BASED",
      langs: "LANGS",
      scope: "SCOPE",
      status: "STATUS",
      roleVal: "DX & BI Manager",
      basedVal: "Istanbul, TR",
      langsVal: "TR · FA · AZ · EN",
      scopeVal: "EMEA · Balkans · GCC",
      statusVal: "Open to a new role",
    },
    sections: {
      capabilities: "Capabilities",
      caseStudies: "Case Studies",
      careerTimeline: "Career Timeline",
      education: "Education",
      certifications: "Certifications",
      contact: "Contact",
      impact: "Impact",
    },
    work: {
      intro: "Ten projects that turned enterprise ambition into measurable outcomes.",
      filterLabel: "Filter case studies by category",
      noMatches: "No case studies match your filters.",
      reset: "Reset",
      readCase: "Read case →",
      all: "All",
    },
    contact: {
      headingA: "Let's build the ",
      headingEm: "next",
      headingB: "transformation.",
      intro: "The fastest way to reach me is LinkedIn, or you can book a 30-minute call directly. You can also send me a message — I respond within two business days.",
      cta: {
        linkedin: "LinkedIn",
        bookCall: "Book a call",
        bookCallVal: "30-minute intro call ↗",
      },
      openForm: "Send a message",
      dialogTitle: "Send a message",
      dialogDesc: "Fill in the form and I'll get back to you within two business days.",
      verifyMsg: "Please complete the verification first.",
      sent: "/ sent",
      received: "Message received",
      thanks: "Thanks for reaching out. I'll get back to you soon.",
      name: "Name",
      email: "Email",
      subject: "Subject",
      message: "Message",
      namePh: "Your name",
      emailPh: "you@company.com",
      subjectPh: "How can I help?",
      messagePh: "Tell me about your project, challenge, or role...",
      submit: "Send message",
      submitting: "Sending...",
      errorMsg: "Something went wrong. Please try again.",
      ariaForm: "Contact form",
    },
    errors: {
      nameReq: "Name is required",
      nameLong: "Name is too long",
      emailInv: "Invalid email address",
      emailLong: "Email is too long",
      subjectReq: "Subject is required",
      subjectLong: "Subject is too long",
      messageMin: "Message must be at least 10 characters",
      messageMax: "Message is too long",
    },
    cookie: {
      text: "This site uses minimal local storage for theme, language and spam protection. No tracking or advertising cookies.",
      accept: "Accept",
      reject: "Reject",
      aria: "Cookie notice",
    },
    footerLoc: "Istanbul · Türkiye",
    caseStudy: {
      notFound: "Case study not found.",
      back: "← Back to portfolio",
      getInTouch: "GET IN TOUCH",
      caseLabel: "Case",
      figPrefix: "Fig.",
      overview: "Overview",
      challenges: "Challenges",
      approach: "Approach",
      outcomes: "Outcomes",
      client: "Client",
      role: "Role",
      period: "Period",
      location: "Location",
      nextCase: "Next case",
      read: "Read →",
      allWork: "← All work",
      quoteBy: "— Behrouz Bagherzadeh, on the project",
    },
    categories: {
      "Data & BI": "Data & BI",
      "Automation & AI": "Automation & AI",
      "Digital Workplace": "Digital Workplace",
      "E-Commerce": "E-Commerce",
      "Web & Branding": "Web & Branding",
      "HR Tech": "HR Tech",
      "Product & ERP": "Product & ERP",
    },
  },
  tr: {
    name: { full: "Behruz Bagirzade", first: "Behruz", italic: "Bagir", rest: "zade" },
    metaTitle: "Behruz Bagirzade — Dijital Dönüşüm & İş Zekâsı Lideri",
    metaDesc:
      "Behruz Bagirzade — İstanbul'da dijital dönüşüm ve iş zekâsı lideri. 15+ yıldır kurumsal veri ile yönetim kararları arasındaki katmanı kuruyorum.",
    nav: { work: "Projeler", capabilities: "Yetkinlikler", impact: "Etki", contact: "İletişim", getInTouch: "İLETİŞİME GEÇ" },
    hero: {
      location: "Portfolyo · İstanbul, TR",
      srSuffix: " — Dijital Dönüşüm & İş Zekâsı Lideri",
      years: "15+ yıl",
      intro: (yrs) => (
        <><span className="text-foreground">{yrs}</span>lık dijital dönüşüm ve iş zekâsı lideri. Veri ile karar arasındaki katmanı kuruyorum — analitik ve yapay zekâ yatırımlarını yönetimin bakabildiği değil, üzerine hareket edebildiği bir şeye dönüştürüyorum.</>
      ),
      role: "ROL",
      based: "MERKEZ",
      langs: "DİLLER",
      scope: "KAPSAM",
      status: "DURUM",
      roleVal: "Dijital Dönüşüm & İZ Yöneticisi",
      basedVal: "İstanbul, TR",
      langsVal: "TR · FA · AZ · EN",
      scopeVal: "EMEA · Balkanlar · Körfez",
      statusVal: "Yeni role açık",
    },
    sections: {
      capabilities: "Yetkinlikler",
      caseStudies: "Vaka Çalışmaları",
      careerTimeline: "Kariyer Zaman Çizelgesi",
      education: "Eğitim",
      certifications: "Sertifikalar",
      contact: "İletişim",
      impact: "Etki",
    },
    work: {
      intro: "Kurumsal hedefleri ölçülebilir sonuçlara dönüştüren on proje.",
      filterLabel: "Vaka çalışmalarını kategoriye göre filtrele",
      noMatches: "Filtrelerinize uygun vaka bulunamadı.",
      reset: "Sıfırla",
      readCase: "Vakayı oku →",
      all: "Tümü",
    },
    contact: {
      headingA: "Bir sonraki ",
      headingEm: "dönüşümü",
      headingB: "birlikte kuralım.",
      intro: "Bana en hızlı ulaşım yolu LinkedIn; dilerseniz doğrudan 30 dakikalık bir görüşme de ayarlayabilirsiniz. Mesaj da bırakabilirsiniz — iki iş günü içinde dönüş yapıyorum.",
      cta: {
        linkedin: "LinkedIn",
        bookCall: "Görüşme ayarla",
        bookCallVal: "30 dakikalık tanışma görüşmesi ↗",
      },
      openForm: "Mesaj gönder",
      dialogTitle: "Mesaj gönder",
      dialogDesc: "Formu doldurun, iki iş günü içinde size dönüş yapacağım.",
      verifyMsg: "Lütfen önce doğrulamayı tamamlayın.",
      sent: "/ gönderildi",
      received: "Mesajınız alındı",
      thanks: "İletişime geçtiğiniz için teşekkürler. En kısa sürede dönüş yapacağım.",
      name: "İsim",
      email: "E-posta",
      subject: "Konu",
      message: "Mesaj",
      namePh: "Adınız",
      emailPh: "siz@sirket.com",
      subjectPh: "Nasıl yardımcı olabilirim?",
      messagePh: "Projeniz, zorluğunuz veya rol hakkında yazın...",
      submit: "Mesajı gönder",
      submitting: "Gönderiliyor...",
      errorMsg: "Bir şeyler ters gitti. Lütfen tekrar deneyin.",
      ariaForm: "İletişim formu",
    },
    errors: {
      nameReq: "İsim gerekli",
      nameLong: "İsim çok uzun",
      emailInv: "Geçersiz e-posta adresi",
      emailLong: "E-posta çok uzun",
      subjectReq: "Konu gerekli",
      subjectLong: "Konu çok uzun",
      messageMin: "Mesaj en az 10 karakter olmalı",
      messageMax: "Mesaj çok uzun",
    },
    cookie: {
      text: "Bu site tema, dil ve spam koruması için yalnızca gerekli yerel verileri kullanır. Takip veya reklam cookie'si yok.",
      accept: "Kabul et",
      reject: "Reddet",
      aria: "Cookie bildirimi",
    },
    footerLoc: "İstanbul · Türkiye",
    caseStudy: {
      notFound: "Vaka çalışması bulunamadı.",
      back: "← Portfolyoya dön",
      getInTouch: "İLETİŞİME GEÇ",
      caseLabel: "Vaka",
      figPrefix: "Şkl.",
      overview: "Genel Bakış",
      challenges: "Zorluklar",
      approach: "Yaklaşım",
      outcomes: "Sonuçlar",
      client: "Müşteri",
      role: "Rol",
      period: "Dönem",
      location: "Konum",
      nextCase: "Sonraki vaka",
      read: "Oku →",
      allWork: "← Tüm projeler",
      quoteBy: "— Behruz Bagirzade, proje hakkında",
    },
    categories: {
      "Data & BI": "Veri & İZ",
      "Automation & AI": "Otomasyon & YZ",
      "Digital Workplace": "Dijital İş Yeri",
      "E-Commerce": "E-Ticaret",
      "Web & Branding": "Web & Marka",
      "HR Tech": "İK Teknolojisi",
      "Product & ERP": "Ürün & ERP",
    },
  },
};

export type MetricT = { value: string; label: string };
export const metricsI18n: Record<Lang, MetricT[]> = {
  en: [
    { value: "80%", label: "Reduction in manual reporting effort" },
    { value: "67%", label: "Lift in operational productivity" },
    { value: "18→6", label: "Months to transformation impact" },
    { value: "7", label: "International entities led" },
  ],
  tr: [
    { value: "80%", label: "Manuel raporlama efor azaltımı" },
    { value: "67%", label: "Operasyonel verimlilik artışı" },
    { value: "18→6", label: "Dönüşüm etkisine kadar ay sayısı" },
    { value: "7", label: "Yönetilen uluslararası kuruluş" },
  ],
};

export type CapabilityT = { title: string; items: string[] };
export const capabilitiesI18n: Record<Lang, CapabilityT[]> = {
  en: [
    { title: "Transformation & Strategy", items: ["Digital Transformation Strategy", "AI Strategy & Adoption", "Change Management", "Business Process Reengineering", "Operating Model Design", "Executive Stakeholder Management", "Multi-Entity Governance"] },
    { title: "Data & Analytics", items: ["Power BI", "Data Strategy & Governance", "KPI Framework Design", "Executive Reporting", "Data Analytics"] },
    { title: "Automation & Systems", items: ["Microsoft Power Platform", "Power Automate", "ERP / CRM Integration", "SAP SuccessFactors", "E-Commerce & B2B Platforms", "IT Infrastructure"] },
    { title: "Leadership", items: ["Team Building", "Cross-Functional Leadership", "Multi-Entity Delivery", "Project Management", "Requirements Analysis"] },
  ],
  tr: [
    { title: "Dönüşüm & Strateji", items: ["Dijital Dönüşüm Stratejisi", "YZ Stratejisi & Benimsenmesi", "Değişim Yönetimi", "İş Süreçleri Yeniden Tasarımı", "Operasyon Modeli Tasarımı", "Üst Düzey Paydaş Yönetimi", "Çoklu Birim Yönetişimi"] },
    { title: "Veri & Analitik", items: ["Power BI", "Veri Stratejisi & Yönetişim", "KPI Çerçevesi Tasarımı", "Yönetici Raporlama", "Veri Analitiği"] },
    { title: "Otomasyon & Sistemler", items: ["Microsoft Power Platform", "Power Automate", "ERP / CRM Entegrasyonu", "SAP SuccessFactors", "E-Ticaret & B2B Platformlar", "BT Altyapısı"] },
    { title: "Liderlik", items: ["Ekip Kurma", "Fonksiyonlar Arası Liderlik", "Çoklu Kuruluş Teslimatı", "Proje Yönetimi", "Gereksinim Analizi"] },
  ],
};

export type ExperienceT = { period: string; role: string; company: string; location: string; bullets: string[] };
export const experienceI18n: Record<Lang, ExperienceT[]> = {
  en: [
    { period: "2022 — 2026", role: "Digital Transformation & BI Manager", company: "Yiğitoğlu", location: "Istanbul", bullets: [
      "Led enterprise-wide transformation across 7 international entities, aligning strategy, data, and technology.",
      "Built and led a 5-person transformation & BI team, owning delivery and capability development.",
      "Architected an executive Power BI suite across Finance, HR, Sales, and Supply Chain — cutting manual reporting by 80%.",
      "Directed AI-enabled automation on Microsoft Power Platform, lifting operational productivity by 67%.",
      "Delivered SAP SuccessFactors HR digitalization for 450+ employees across 9 locations.",
      "Launched a company-wide Digital Workplace PWA consolidating ERP, HR, CRM, BI, and IT Service Desk.",
      "Standardized operational processes across 7 international entities, reducing execution variance and strengthening cross-functional governance.",
      "Redesigned processes across Sales, Finance and Operations, reducing handoff delays between departments.",
      "Partnered directly with executive leadership to align the transformation roadmap with multi-year strategic objectives.",
    ]},
    { period: "2021 — 2022", role: "Digital Transformation Analyst", company: "Yiğitoğlu", location: "Istanbul", bullets: [
      "Compressed average transformation delivery from 18 months to 6.",
      "Mapped end-to-end processes across departments to surface automation and digitalization opportunities.",
      "Implemented AI-powered solutions that improved operational efficiency and customer experience.",
      "Evaluated digital initiatives against performance metrics and business KPIs to guide leadership decision-making.",
    ]},
    { period: "2019 — 2021", role: "International E-Commerce Manager & Digital Transformation Analyst", company: "Kiğılı", location: "Istanbul", bullets: [
      "Led a 10+ person e-commerce and digital operations team across international markets.",
      "Integrated e-commerce operations with ERP, streamlining order fulfillment.",
      "Automated inventory & order workflows with Power Automate — cutting manual processing time by 40%.",
      "Supported CRM transformation that lifted customer engagement and marketing effectiveness.",
    ]},
    { period: "2019", role: "E-Commerce Manager", company: "Edgers", location: "Istanbul", bullets: [
      "Built and launched the company's first B2B e-commerce platform end-to-end.",
      "Managed international B2B operations across Iran, the Balkans, Egypt, the US, and multiple African markets.",
      "Owned the end-to-end digital order journey — platform architecture, product catalogue, customer onboarding and fulfilment coordination.",
      "Adapted the platform and commercial approach to the payment, logistics and compliance requirements of each export market.",
    ]},
    { period: "2018", role: "Senior Business Developer", company: "Orka Holding — Damat / Tween / D'S", location: "Istanbul", bullets: [
      "Surfaced new opportunities through market and competitive analysis across multiple retail brands.",
    ]},
    { period: "2016 — 2017", role: "Business Development Specialist", company: "Finesse", location: "Istanbul", bullets: [
      "Developed strategic partnerships and managed client relationships to support expansion.",
    ]},
    { period: "2013 — 2016", role: "IT Engineer → Senior IT Engineer", company: "Mercedes-Benz AG", location: "Tabriz", bullets: [
      "Led enterprise IT infrastructure operations, ensuring high availability and stability.",
      "Implemented security and process improvements, reducing incident resolution time.",
      "Supported business-critical IT environments in close collaboration with engineering teams.",
    ]},
    { period: "2011 — 2013", role: "IT System Engineer", company: "EghtesadNovin Bank", location: "Tabriz", bullets: [
      "Designed and maintained enterprise IT infrastructure supporting banking operations and business continuity.",
      "Improved system stability and reliability through proactive maintenance and infrastructure modernization.",
      "Delivered technical support for mission-critical banking applications.",
    ]},
  ],
  tr: [
    { period: "2022 — 2026", role: "Dijital Dönüşüm & İZ Yöneticisi", company: "Yiğitoğlu", location: "İstanbul", bullets: [
      "7 uluslararası kuruluşta strateji, veri ve teknolojiyi hizalayan kurum çapında dönüşümü yönettim.",
      "5 kişilik dönüşüm & iş zekâsı ekibini kurup yönettim; teslimat ve yetkinlik gelişimini üstlendim.",
      "Finans, İK, Satış ve Tedarik Zinciri için yönetici Power BI paketi tasarladım — manuel raporlamayı %80 azalttım.",
      "Microsoft Power Platform üzerinde YZ destekli otomasyonu yönettim; operasyonel verimliliği %67 artırdım.",
      "9 lokasyondaki 450+ çalışan için SAP SuccessFactors İK dijitalleşmesini hayata geçirdim.",
      "ERP, İK, CRM, İZ ve BT Servis Masası'nı tek çatı altında toplayan Dijital İş Yeri PWA'sını devreye aldım.",
      "7 uluslararası birim genelinde operasyonel süreçleri standartlaştırarak uygulama farklılıklarını azalttım ve fonksiyonlar arası yönetişimi güçlendirdim.",
      "Satış, Finans ve Operasyon süreçlerini yeniden tasarlayarak departmanlar arası devir gecikmelerini azalttım.",
      "Dönüşüm yol haritasını üst yönetimin çok yıllı stratejik hedefleriyle doğrudan hizaladım.",
    ]},
    { period: "2021 — 2022", role: "Dijital Dönüşüm Analisti", company: "Yiğitoğlu", location: "İstanbul", bullets: [
      "Ortalama dönüşüm teslim süresini 18 aydan 6 aya indirdim.",
      "Otomasyon ve dijitalleşme fırsatlarını görünür kılmak için uçtan uca süreç haritaları çıkardım.",
      "Operasyonel verimliliği ve müşteri deneyimini iyileştiren yapay zekâ destekli çözümler uyguladım.",
      "Dijital girişimleri performans metrikleri ve iş KPI'ları üzerinden değerlendirerek yönetim kararlarına girdi sağladım.",
    ]},
    { period: "2019 — 2021", role: "Uluslararası E-Ticaret Müdürü ve Dijital Dönüşüm Analisti", company: "Kiğılı", location: "İstanbul", bullets: [
      "Uluslararası pazarlarda 10+ kişilik e-ticaret ve dijital operasyon ekibini yönettim.",
      "E-ticaret operasyonlarını ERP ile entegre ederek sipariş karşılamayı kolaylaştırdım.",
      "Power Automate ile envanter & sipariş süreçlerini otomatikleştirdim — manuel süreyi %40 azalttım.",
      "Müşteri etkileşimini ve pazarlama etkinliğini artıran CRM dönüşümünü destekledim.",
    ]},
    { period: "2019", role: "E-Ticaret Yöneticisi", company: "Edgers", location: "İstanbul", bullets: [
      "Şirketin ilk B2B e-ticaret platformunu uçtan uca kurdum ve devreye aldım.",
      "İran, Balkanlar, Mısır, ABD ve birçok Afrika pazarında uluslararası B2B operasyonlarını yönettim.",
      "Platform mimarisinden ürün kataloğuna, müşteri kazanımından sipariş karşılamaya kadar uçtan uca dijital sipariş yolculuğunu yönettim.",
      "Platformu ve ticari yaklaşımı her ihracat pazarının ödeme, lojistik ve mevzuat gereksinimlerine uyarladım.",
    ]},
    { period: "2018", role: "Kıdemli İş Geliştirme Uzmanı", company: "Orka Holding — Damat / Tween / D'S", location: "İstanbul", bullets: [
      "Birden fazla perakende markası için pazar ve rekabet analizi yoluyla yeni fırsatlar ortaya çıkardım.",
    ]},
    { period: "2016 — 2017", role: "İş Geliştirme Uzmanı", company: "Finesse", location: "İstanbul", bullets: [
      "Büyümeyi desteklemek için stratejik ortaklıklar geliştirdim ve müşteri ilişkilerini yönettim.",
    ]},
    { period: "2013 — 2016", role: "BT Mühendisi → Kıdemli BT Mühendisi", company: "Mercedes-Benz AG", location: "Tebriz", bullets: [
      "Yüksek erişilebilirlik ve kararlılığı sağlayarak kurumsal BT altyapı operasyonlarını yönettim.",
      "Güvenlik ve süreç iyileştirmeleri uyguladım; olay çözüm süresini azalttım.",
      "İş açısından kritik BT ortamlarını mühendislik ekipleriyle yakın iş birliği içinde destekledim.",
    ]},
    { period: "2011 — 2013", role: "BT Sistem Mühendisi", company: "EghtesadNovin Bankası", location: "Tebriz", bullets: [
      "Bankacılık operasyonlarını ve iş sürekliliğini destekleyen kurumsal BT altyapısını tasarladım ve sürdürdüm.",
      "Proaktif bakım ve altyapı modernizasyonuyla sistem kararlılığını ve güvenilirliğini artırdım.",
      "Kritik bankacılık uygulamaları için teknik destek sağladım.",
    ]},
  ],
};

export type EducationT = { period: string; title: string; school: string; loc: string };
export const educationI18n: Record<Lang, EducationT[]> = {
  en: [
    { period: "2023 — 2024", title: "Digital Transformation Leadership", school: "Boston University · MicroMasters", loc: "Boston, USA (Online)" },
    { period: "2010 — 2014", title: "Computer & Information Systems Security", school: "University of Applied Science and Technology · BASc", loc: "Tabriz, Iran" },
  ],
  tr: [
    { period: "2023 — 2024", title: "Dijital Dönüşüm Liderliği", school: "Boston University · MicroMasters", loc: "Boston, ABD (Online)" },
    { period: "2010 — 2014", title: "Bilgisayar & Bilgi Sistemleri Güvenliği", school: "University of Applied Science and Technology · BASc", loc: "Tebriz, İran" },
  ],
};

export type CertificationT = { title: string; issuer: string; status: string };
export const certificationsI18n: Record<Lang, CertificationT[]> = {
  en: [
    { title: "Microsoft PL-300 — Power BI Data Analyst", issuer: "Microsoft", status: "Exam scheduled September 2026" },
    { title: "Career Essentials in Generative AI", issuer: "Microsoft / LinkedIn Learning", status: "2024" },
    { title: "Agile Foundations", issuer: "IIBA / LinkedIn Learning", status: "2026" },
    { title: "Telling Stories with Data", issuer: "LinkedIn Learning", status: "2021" },
  ],
  tr: [
    { title: "Microsoft PL-300 — Power BI Veri Analisti", issuer: "Microsoft", status: "Sınav tarihi Eylül 2026" },
    { title: "Career Essentials in Generative AI", issuer: "Microsoft / LinkedIn Learning", status: "2024" },
    { title: "Agile Foundations (Çevik Temeller)", issuer: "IIBA / LinkedIn Learning", status: "2026" },
    { title: "Veriyle Hikâye Anlatımı", issuer: "LinkedIn Learning", status: "2021" },
  ],
};

export type CaseStudyContent = {
  title: string;
  tagline: string;
  overview: string;
  challenges: string[];
  approach: string[];
  outcomes: { value: string; label: string }[];
  reflection: string;
};

export const caseStudyI18n: Record<Lang, Record<string, CaseStudyContent>> = {
  en: {
    "executive-bi-suite": {
      title: "Executive Power BI Suite",
      tagline: "Real-time KPI visibility for a 7-entity international group.",
      overview: "Executive leadership across seven international entities was making decisions from static, hand-assembled slide decks stitched together from Finance, HR, Sales, and Supply Chain. Reporting was slow, brittle, and never quite trusted. The mandate was to give the executive team a single, real-time source of truth.",
      challenges: [
        "Seven entities, seven data cultures — different ERPs, different definitions of the same KPI.",
        "Manual monthly reporting consumed a full week of analyst time across the group.",
        "No shared governance model for metrics; every function defended its own numbers.",
        "Executives needed depth without complexity — one dashboard, four functions, no training.",
      ],
      approach: [
        "Ran a cross-entity KPI alignment programme with function heads to lock definitions before touching a chart.",
        "Designed a governed semantic layer so every dashboard tile traced back to a single source of truth.",
        "Shipped a Power BI suite spanning Finance, HR, Sales, and Supply Chain — layered from a one-page executive view down to operational detail.",
        "Instrumented data refresh SLAs and a governance forum to keep the model honest as the business changed.",
      ],
      outcomes: [
        { value: "80%", label: "Manual reporting effort removed" },
        { value: "7", label: "Entities on a single model" },
        { value: "4", label: "Functions unified" },
      ],
      reflection: "The wins weren't the charts — they were the definitions. Once leadership agreed on what a KPI meant, the dashboards stopped being political and started driving decisions.",
    },
    "ai-automation-platform": {
      title: "AI-Enabled Automation Programme",
      tagline: "Compounding productivity gains across back-office operations.",
      overview: "Back-office functions were drowning in repetitive, low-judgement work — approvals, reconciliations, document extraction. Rather than run a one-off automation project, we built a programme: a portfolio of AI-enabled flows on Microsoft Power Platform with a shared operating model behind them.",
      challenges: [
        "Automation opportunities were scattered across every function; no shared prioritisation lens.",
        "Business owners wanted magic, not maintenance — few were prepared for a citizen-developer model.",
        "AI features carried real risk (extraction errors, model drift) that had to be governed, not ignored.",
        "Every quick win had to compound, not create shadow IT.",
      ],
      approach: [
        "Built an intake and scoring model to rank opportunities by hours saved, risk, and reusability.",
        "Established a Power Platform Centre of Excellence: naming, environments, ALM, and reviews.",
        "Rolled out AI Builder-powered flows for document extraction, approvals, and exception routing.",
        "Coached function leads into co-owning their automations, with the team as reviewers, not bottlenecks.",
      ],
      outcomes: [
        { value: "67%", label: "Lift in operational productivity" },
        { value: "40%", label: "Cut in manual processing time on integrated flows" },
        { value: "1", label: "Governed platform, no shadow IT" },
      ],
      reflection: "AI didn't replace anyone. It quietly removed the parts of the job nobody wanted, and gave the team back the hours where judgement actually matters.",
    },
    "digital-workplace-pwa": {
      title: "Digital Workplace PWA",
      tagline: "One AI-assisted environment for ERP, HR, CRM, BI, and IT.",
      overview: "Employees juggled six or seven disconnected systems just to get through a normal day. We designed a company-wide Digital Workplace — a progressive web app that consolidates ERP, HR, CRM, BI, and IT Service Desk into a single, AI-assisted surface for 450+ employees across nine locations.",
      challenges: [
        "Nine locations, fragmented device fleets, and inconsistent connectivity — native apps were a non-starter.",
        "Every underlying system had its own identity, permissions model, and design language.",
        "The workforce spans field, retail, and office roles with very different daily journeys.",
        "Change fatigue was real; adoption had to feel like relief, not another rollout.",
      ],
      approach: [
        "Chose a PWA to hit every device with one codebase, offline-tolerant and installable.",
        "Unified identity and role-based navigation so each employee saw only the workflows that matter to them.",
        "Embedded AI assistance for search, requests, and self-service — the same intent, no matter which system answers.",
        "Delivered SAP SuccessFactors HR digitalization for the same 450+ employees inside the same shell.",
      ],
      outcomes: [
        { value: "450+", label: "Employees on one surface" },
        { value: "9", label: "Locations unified" },
        { value: "5", label: "Systems consolidated in-app" },
      ],
      reflection: "The right measure wasn't logins — it was how quickly a new hire could get productive without knowing which system did what.",
    },
    "b2b-ecommerce-launch": {
      title: "B2B E-Commerce Platform Launch",
      tagline: "A direct digital sales channel across five continents.",
      overview: "Edgers had strong international demand but no direct digital sales channel — orders moved through email, spreadsheets, and phone calls. I built and launched the company's first proprietary B2B e-commerce platform, and ran international operations across Iran, the Balkans, Egypt, the United States, and multiple African markets.",
      challenges: [
        "Very different buyer behaviours, currencies, and compliance rules across five regions.",
        "Existing sales team saw digital as a threat to their relationships.",
        "No existing digital pricing, catalogue, or logistics data — everything had to be modelled from scratch.",
        "Aggressive timeline: a working direct channel had to ship inside the same fiscal year.",
      ],
      approach: [
        "Built the platform end-to-end: catalogue, quoting, order flow, and back-office integration.",
        "Repositioned digital as a tool for existing sellers — they became the first power users, not the last.",
        "Modelled a region-aware pricing and terms engine to respect local commercial reality.",
        "Instrumented every order to feed learning back into sales and supply chain.",
      ],
      outcomes: [
        { value: "1st", label: "Direct digital channel in company history" },
        { value: "5", label: "Continents served from day one" },
        { value: "0→∞", label: "Baseline digital revenue → new stream" },
      ],
      reflection: "The platform was the easy part. The real work was giving a traditional sales team a reason to want it.",
    },
    "rubin-kimya-rebranding": {
      title: "Rubin Kimya — Rebranding & Web Development",
      tagline: "A complete corporate identity and digital presence built from scratch.",
      overview: "Rubin Kimya needed a modern face for an industrial legacy. Working under Yiğitoğlu, I led the full digital transformation of the brand: a refreshed logo and visual identity system, accessible UI/UX, and a custom-built, high-performance website that matches the company's technical standards.",
      challenges: [
        "The brand had no unified digital identity — logo, website, and visual language were fragmented or outdated.",
        "Industrial buyers expect precision and credibility; the design had to feel modern without losing authority.",
        "The website needed to be performant and accessible across devices, not a template-heavy brochure.",
        "Stakeholders needed confidence that a B2B industrial site could also be visually distinctive.",
      ],
      approach: [
        "Designed a new logo and visual identity system that balanced industrial heritage with contemporary clarity.",
        "Created accessible, intuitive interfaces focused on product credibility and easy navigation.",
        "Built a responsive, custom-coded website with performance and maintainability in mind.",
        "Aligned the digital experience with the company's commercial goals and technical expectations.",
      ],
      outcomes: [
        { value: "1", label: "Unified brand identity system" },
        { value: "100%", label: "Custom-coded website" },
        { value: "End-to-end", label: "Design-to-deployment delivery" },
      ],
      reflection: "Industrial brands often hide behind old aesthetics. The real win was proving that credibility and modern design can share the same page.",
    },
    "valory-vista-digital-branding": {
      title: "Valory Vista — Digital Branding",
      tagline: "Architecture, lifestyle, and a digital presence built to convert.",
      overview: "Valory Vista needed a digital presence that matched the quality of its architecture and lifestyle positioning. I crafted a distinctive visual identity, built a cohesive online experience across website and social channels, and designed data-driven campaigns to attract qualified buyers.",
      challenges: [
        "The project needed a visual identity that reflected premium architecture and lifestyle appeal, not generic real estate styling.",
        "Multiple touchpoints — website, social, ads — had to tell the same story without silos.",
        "Campaigns needed to generate leads, not just impressions.",
        "Timeline was short; the brand had to go to market quickly and coherently.",
      ],
      approach: [
        "Developed a visual identity system rooted in the project's architecture and lifestyle promise.",
        "Built a cohesive digital presence across website, social media, and digital advertising.",
        "Used data-driven content and targeted campaigns to engage buyers at each stage of the journey.",
        "Tracked conversion signals to iterate messaging and media placement quickly.",
      ],
      outcomes: [
        { value: "Cohesive", label: "Cross-channel brand presence" },
        { value: "Targeted", label: "Data-driven campaigns" },
        { value: "Qualified", label: "Lead generation focus" },
      ],
      reflection: "In real estate, the product is already premium. The work is making sure the digital experience feels just as considered before the first visit.",
    },
    "insight360": {
      title: "Insight360 — Performance Evaluation System",
      tagline: "360-degree feedback designed to improve accountability and growth.",
      overview: "Performance reviews were one-directional and infrequent. We built Insight360, a comprehensive 360-degree performance evaluation system that enables cross-departmental feedback, manager reviews, upward evaluations, and peer-to-peer assessments in one structured process.",
      challenges: [
        "Performance feedback was limited to top-down reviews, missing peer and upward perspectives.",
        "Different departments used different criteria, making comparisons and decisions inconsistent.",
        "The process was manual and time-consuming, creating resistance rather than engagement.",
        "Feedback had to be actionable, not just a scorecard, to drive real development.",
      ],
      approach: [
        "Designed a structured evaluation workflow covering manager, peer, upward, and cross-departmental feedback.",
        "Standardized competency criteria so reviews could be compared fairly across teams.",
        "Built a digital interface that made giving and receiving feedback easier and more transparent.",
        "Positioned insights as development inputs, not just evaluation outputs.",
      ],
      outcomes: [
        { value: "360°", label: "Multi-source feedback model" },
        { value: "Org-wide", label: "Cross-departmental coverage" },
        { value: "Actionable", label: "Development-focused insights" },
      ],
      reflection: "Feedback systems fail when people feel judged. The design had to make the process feel like a mirror, not a verdict.",
    },
    "yigitoglu-digital-evolution": {
      title: "Yiğitoğlu Digital Evolution",
      tagline: "A user-centric, globally visible web platform for an industry leader.",
      overview: "Yiğitoğlu's digital presence no longer reflected the scale of its industrial leadership. I led the transformation into a user-centric, accessible, and globally visible web platform that positions the company as a leader in the chemical industry's digital transformation.",
      challenges: [
        "The existing web presence was dated and did not reflect the company's strategic position.",
        "Global visibility required a platform that worked across languages, devices, and accessibility standards.",
        "Internal stakeholders needed a site that served both credibility and commercial conversion.",
        "The project had to modernize without losing the trust built over decades.",
      ],
      approach: [
        "Ran a user-centric design process to restructure information architecture and navigation.",
        "Built a high-performance, accessible, and responsive web platform with global standards.",
        "Aligned the digital experience with Yiğitoğlu's brand authority and multi-market reach.",
        "Instrumented analytics to continuously improve content and conversion paths.",
      ],
      outcomes: [
        { value: "Global", label: "Accessible, multi-market platform" },
        { value: "Modern", label: "Industry-leading digital presence" },
        { value: "User-centric", label: "Design and information architecture" },
      ],
      reflection: "A corporate website is often treated as a signpost. The real value is turning it into a proof point for the transformation you claim to lead.",
    },
    "digital-product-management-app": {
      title: "Digital Product Management App",
      tagline: "Centralized product data integrated with ERP and BI.",
      overview: "Product information was scattered across systems, making it hard for Sales, Marketing, and Supply Chain to rely on a single source. I built a digital product management application that centralizes product data and integrates it directly with ERP and business intelligence systems.",
      challenges: [
        "Product data lived in multiple systems, creating version conflicts and delays.",
        "Sales and Marketing teams struggled to access accurate, up-to-date technical and commercial details.",
        "The product data model had to align with ERP structures without duplicating master records.",
        "Adoption depended on the app being faster than the spreadsheets it replaced.",
      ],
      approach: [
        "Centralized product information into a single application with clear ownership and update workflows.",
        "Integrated the app with ERP to keep master data consistent and authoritative.",
        "Connected product data to BI so commercial and operational teams could analyze it in context.",
        "Designed the interface around speed and clarity so teams would choose it over informal tools.",
      ],
      outcomes: [
        { value: "1", label: "Single source of product truth" },
        { value: "ERP", label: "Integrated master data" },
        { value: "BI-ready", label: "Contextual analytics access" },
      ],
      reflection: "The hardest part of product data is not building the database; it is getting every function to agree on who owns each field.",
    },
    "supply-chain-bi-dashboard": {
      title: "BI Dashboard for Supply Chain Optimization",
      tagline: "Real-time procurement visibility by integrating ERP and CRM data.",
      overview: "Purchasing and supply chain decisions were slowed by disconnected ERP and CRM data. I designed a BI dashboard that integrated both sources to give procurement and operations a real-time view of purchasing performance, supplier behaviour, and inventory signals.",
      challenges: [
        "ERP and CRM data were siloed, making end-to-end supply chain visibility impossible.",
        "Procurement teams relied on static reports that were outdated by the time they were reviewed.",
        "Key metrics like supplier performance and inventory health were calculated differently across functions.",
        "The dashboard had to serve both operational buyers and strategic planning.",
      ],
      approach: [
        "Mapped the full procurement data flow from ERP orders and CRM supplier interactions to inventory signals.",
        "Built a unified data model that aligned purchasing, operations, and finance on the same definitions.",
        "Delivered a Power BI dashboard with real-time refresh and role-based views.",
        "Focused the interface on decisions: what to buy, from whom, and when.",
      ],
      outcomes: [
        { value: "Real-time", label: "Procurement visibility" },
        { value: "ERP+CRM", label: "Unified data model" },
        { value: "Faster", label: "Purchasing decisions" },
      ],
      reflection: "Supply chain dashboards are only useful when they answer the next question before the buyer has to ask it.",
    },
  },
  tr: {
    "executive-bi-suite": {
      title: "Yönetici Power BI Paketi",
      tagline: "7 kuruluşlu uluslararası bir grup için gerçek zamanlı KPI görünürlüğü.",
      overview: "Yedi uluslararası kuruluşun üst yönetimi; Finans, İK, Satış ve Tedarik Zinciri'nden elle birleştirilen statik sunumlarla karar veriyordu. Raporlama yavaş, kırılgan ve pek de güvenilir değildi. Görev, üst yönetime tek ve gerçek zamanlı bir doğruluk kaynağı sunmaktı.",
      challenges: [
        "Yedi kuruluş, yedi veri kültürü — farklı ERP'ler, aynı KPI için farklı tanımlar.",
        "Aylık manuel raporlama grup çapında bir haftalık analist zamanını tüketiyordu.",
        "Metrikler için ortak bir yönetişim modeli yoktu; her fonksiyon kendi sayısını savunuyordu.",
        "Yöneticilerin karmaşa olmadan derinliğe ihtiyacı vardı — tek panel, dört fonksiyon, sıfır eğitim.",
      ],
      approach: [
        "Grafiklere dokunmadan tanımları kilitlemek için fonksiyon liderleriyle kuruluşlar arası bir KPI hizalama programı yürüttüm.",
        "Her panel bileşenini tek bir doğruluk kaynağına bağlayan yönetişimli bir semantik katman tasarladım.",
        "Finans, İK, Satış ve Tedarik Zinciri'ni kapsayan; tek sayfalık yönetici görünümünden operasyonel detaya inen bir Power BI paketi teslim ettim.",
        "İş değiştikçe modeli dürüst tutmak için veri yenileme SLA'ları ve bir yönetişim forumu kurguladım.",
      ],
      outcomes: [
        { value: "80%", label: "Kaldırılan manuel raporlama eforu" },
        { value: "7", label: "Tek model üzerinde kuruluş" },
        { value: "4", label: "Birleştirilen fonksiyon" },
      ],
      reflection: "Kazanım grafikler değildi — tanımlardı. Yönetim bir KPI'nın ne anlama geldiğinde anlaştığında paneller siyasi olmaktan çıkıp kararı yönlendirmeye başladı.",
    },
    "ai-automation-platform": {
      title: "YZ Destekli Otomasyon Programı",
      tagline: "Back-office operasyonlarında birikimli verimlilik kazanımları.",
      overview: "Back-office fonksiyonları; onaylar, mutabakatlar, belge çıkarımı gibi tekrarlı, düşük yargılı işlerde boğuluyordu. Tek seferlik bir otomasyon projesi yerine bir program kurduk: Microsoft Power Platform üzerinde YZ destekli akışlardan oluşan, arkasında ortak bir operasyon modeli bulunan bir portföy.",
      challenges: [
        "Otomasyon fırsatları her fonksiyona dağılmıştı; ortak bir önceliklendirme merceği yoktu.",
        "İş sahipleri sihir istiyordu, bakım değil — çok azı citizen-developer modeline hazırdı.",
        "YZ özellikleri gerçek riskler taşıyordu (çıkarım hataları, model kayması); göz ardı edilemez, yönetilmeliydi.",
        "Her hızlı kazanımın birikmesi gerekiyordu, gölge BT üretmemesi lazımdı.",
      ],
      approach: [
        "Fırsatları kazanılan saat, risk ve yeniden kullanılabilirlik ile sıralayan bir alım ve skorlama modeli kurdum.",
        "İsimlendirme, ortamlar, ALM ve incelemeler dahil bir Power Platform Mükemmeliyet Merkezi oluşturdum.",
        "Belge çıkarımı, onay ve istisna yönlendirmesi için AI Builder destekli akışları devreye aldım.",
        "Fonksiyon liderlerini otomasyonlarının ortak sahibi olmaya yönlendirdim; ekip darboğaz değil, denetçi oldu.",
      ],
      outcomes: [
        { value: "67%", label: "Operasyonel verimlilik artışı" },
        { value: "40%", label: "Entegre akışlarda manuel süre azalması" },
        { value: "1", label: "Yönetişimli platform, gölge BT yok" },
      ],
      reflection: "YZ kimseyi değiştirmedi. Kimsenin istemediği parçaları sessizce kaldırdı ve ekibin yargısının gerçekten önemli olduğu saatleri geri verdi.",
    },
    "digital-workplace-pwa": {
      title: "Dijital İş Yeri PWA",
      tagline: "ERP, İK, CRM, İZ ve BT için tek YZ destekli ortam.",
      overview: "Çalışanlar normal bir günü geçirmek için altı ya da yedi kopuk sistemi jonglörlüyordu. Dokuz lokasyondaki 450+ çalışan için ERP, İK, CRM, İZ ve BT Servis Masası'nı tek YZ destekli yüzeyde birleştiren, şirket çapında bir Dijital İş Yeri progresif web uygulaması tasarladık.",
      challenges: [
        "Dokuz lokasyon, parçalı cihaz filoları ve tutarsız bağlantı — yerel uygulamalar seçenek dışıydı.",
        "Her alt sistemin kendi kimliği, yetki modeli ve tasarım dili vardı.",
        "Çalışanlar; saha, perakende ve ofis rollerini kapsıyor; günlük yolculukları çok farklıydı.",
        "Değişim yorgunluğu gerçekti; benimsenme yeni bir yaygınlaştırma değil, rahatlama hissettirmeliydi.",
      ],
      approach: [
        "Tek kod tabanıyla her cihaza ulaşan, çevrimdışı toleranslı ve kurulabilir bir PWA seçtim.",
        "Her çalışanın yalnızca kendisi için önemli iş akışlarını görmesi için kimlik ve rol tabanlı gezinmeyi birleştirdim.",
        "Arama, talep ve self-servis için YZ desteği yerleştirdim — hangi sistem yanıtlarsa yanıtlasın aynı niyet.",
        "Aynı kabuk içinde 450+ çalışan için SAP SuccessFactors İK dijitalleşmesini teslim ettim.",
      ],
      outcomes: [
        { value: "450+", label: "Tek yüzeyde çalışan" },
        { value: "9", label: "Birleştirilen lokasyon" },
        { value: "5", label: "Uygulama içinde birleştirilen sistem" },
      ],
      reflection: "Doğru ölçüt oturum açma değildi — yeni bir çalışanın hangi sistemin ne yaptığını bilmeden ne kadar hızlı üretken olduğuydu.",
    },
    "b2b-ecommerce-launch": {
      title: "B2B E-Ticaret Platformu Lansmanı",
      tagline: "Beş kıtaya yayılan doğrudan bir dijital satış kanalı.",
      overview: "Edgers'ın güçlü uluslararası talebi vardı ama doğrudan dijital satış kanalı yoktu — siparişler e-posta, tablolar ve telefonla akıyordu. Şirketin ilk sahipli B2B e-ticaret platformunu kurup devreye aldım ve İran, Balkanlar, Mısır, ABD ve birçok Afrika pazarındaki uluslararası operasyonları yönettim.",
      challenges: [
        "Beş bölge boyunca çok farklı alıcı davranışları, para birimleri ve uyum kuralları.",
        "Mevcut satış ekibi dijitali ilişkilerine bir tehdit olarak görüyordu.",
        "Mevcut dijital fiyatlandırma, katalog veya lojistik verisi yoktu — her şey sıfırdan modellenmeliydi.",
        "Agresif takvim: çalışan bir doğrudan kanalın aynı mali yıl içinde yayında olması gerekiyordu.",
      ],
      approach: [
        "Platformu uçtan uca kurdum: katalog, teklif, sipariş akışı ve back-office entegrasyonu.",
        "Dijitali mevcut satışçılar için bir araç olarak konumlandırdım — son değil, ilk power kullanıcılar oldular.",
        "Yerel ticari gerçekliğe saygı duyan bölge farkındalıklı bir fiyatlandırma ve şart motoru modelledim.",
        "Öğrenmeyi satış ve tedarik zincirine geri besleyecek şekilde her siparişi enstrümante ettim.",
      ],
      outcomes: [
        { value: "1.", label: "Şirket tarihindeki ilk doğrudan dijital kanal" },
        { value: "5", label: "İlk günden hizmet verilen kıta" },
        { value: "0→∞", label: "Baz dijital gelir → yeni akış" },
      ],
      reflection: "Kolay olan platformdu. Asıl iş, geleneksel bir satış ekibine onu istemesi için bir sebep vermekti.",
    },
  },
};

export function tCase(lang: Lang, slug: string): CaseStudyContent | undefined {
  return caseStudyI18n[lang][slug];
}
