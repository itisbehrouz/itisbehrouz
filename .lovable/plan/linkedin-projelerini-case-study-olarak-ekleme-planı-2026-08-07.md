# LinkedIn Projelerini Case Study Olarak Ekleme Planı

## Mevcut Durum
Sitede şu an 4 case study var:
1. Executive Power BI Suite (Data & BI)
2. AI-Enabled Automation Programme (Automation & AI)
3. Digital Workplace PWA (Digital Workplace)
4. B2B E-Commerce Platform Launch (E-Commerce)

LinkedIn exportunda 17 proje var. Bunlardan bazıları yukarıdaki case study’lerle aynı hikayeyi anlatıyor (PWA, SAP SuccessFactors, B2B E-Commerce, Power BI), bazıları ise tek cümlelik açıklama içeriyor veya kariyer zaman çizelgesinde daha uygun duruyor.

## Öneri: 6 Yeni Case Study Ekle, Gerisini Görmezden Gel veya Zaman Çizelgesine Bırak

Eklenmesi mantıklı olan yeni projeler:

| # | Proje | Kategori | Gerekçe |
|---|---|---|---|
| 05 | Rubin Kimya – Rebranding & End-to-End Web Development | Web & Branding | Kendi marka ve web projesi; farklı bir yetkinlik alanı gösteriyor. |
| 06 | Valory Vista – Digital Branding | Web & Branding | Dijital pazarlama ve marka kimliği hikayesi; Güneşli versiyonundan daha dolu. |
| 07 | Insight360 – 360 Performance Evaluation | HR Tech | İK/performans değerlendirme sistemi; yetenek yönetimi odağı. |
| 08 | Yiğitoğlu Digital Evolution | Web & Digital Transformation | Kurumsal web evrimi; kimlik, erişilebilirlik, sektör liderliği vurgusu. |
| 09 | Digital Product Management App | Product & ERP | Ürün bilgisi yönetimi ve ERP/BI entegrasyonu. |
| 10 | BI Dashboard for Supply Chain Optimization | Data & BI | Tedarik zinciri odaklı BI; mevcut Executive BI Suite’ten farklı bir kesit. |

Eklenmemesi önerilenler:
- **Digital Workplace PWA (2026)** → Mevcut #3 ile aynı hikaye; tekrar olur.
- **SAP SuccessFactors HR Digitalization** → Mevcut #3 içinde zaten anlatılıyor.
- **Power BI & Data Analytics Solutions / Financial Risk / Payment Terms** → Mevcut #1 Executive BI Suite veya kariyer zaman çizelgesine daha uygun; ayrı case study olacak kadar detay yok.
- **B2B E-Commerce Platform (Kiğılı)** → Mevcut #4 ile örtüşüyor; Kiğılı detayları kariyer zaman çizelgesinde zaten var.
- **Valory Güneşli** → Açıklama sadece slogan; içerik yetersiz.
- **IoT / Core Banking / SAP ECC / Server Infrastructure (2011–2014)** → Eski ve teknik; kariyer zaman çizelgesinde zaten kapsanıyor.

## Yapılacak İşler

### 1. İçerik ve Veri Modeli
- `src/lib/case-studies.ts` içine 6 yeni case study ekle.
- Index numaralarını 05–10 olarak ata; mevcut sırayı bozma.
- Yeni kategoriler ekle: `Web & Branding`, `HR Tech`, `Product & ERP`. Ayrıca mevcut `Data & BI` kategorisi zaten var.
- Her proje için: overview, 4 challenges, 4 approach maddesi, 3 outcomes, 1 reflection, stack, client, role, period, location.

### 2. Türkçe ve İngilizce İçerik
- `src/lib/i18n.tsx` içindeki `caseStudyI18n` objesine her slug için EN ve TR versiyonlarını ekle.
- `categories` objesine yeni kategorilerin çevirilerini ekle.

### 3. SVG Kapak Görselleri
- `src/components/case-cover.tsx` içine 6 yeni hand-written SVG cover componenti ekle.
- Her cover, projenin konusunu soyut şekillerle anlatmalı (örn. Rubin Kimya için kimlik/web yapıları, Insight360 için 360° geri bildirim döngüsü).
- Switch ifadesine yeni slug’ları ekle.

### 4. Ana Sayfa ve Filtreleme
- `src/routes/index.tsx` içindeki case study intro metnini güncelle: “Four projects...” → “Ten projects...” veya dile özgü karşılığı.
- Kategori filtreleri yeni kategorileri otomatik gösterecek; `CASE_CATEGORIES` güncellenecek.
- `caseStudies` dizisi uzadığı için ızgaranın düzeni korunacak; mevcut 3 sütunlu grid ve animasyonlar aynen kalacak.

### 5. SEO / Sitemap / Metadata
- `src/routes/sitemap[.]xml.ts` içindeki URL listesini yeni slug’larla genişlet.
- `public/llms.txt` içindeki case study listesini güncelle.
- Yeni case study sayfaları `work.$slug.tsx` sayesinde otomatik üretilecek; metadata dinamik.

### 6. Kalite Kontrol
- `bun run build` ile typecheck ve route tree doğrulaması.
- Yeni slug’lar için `/work/<slug>` sayfalarını tarayıcıda açarak içerik ve cover görsellerini kontrol et.

## Not
Eğer istersen, Valory Güneşli veya 2011–2014 arası teknik projelerden bazılarını da ekleyebiliriz; ancak bunlar için ek açıklama/görsel gerekebilir. Şimdilik yukarıdaki 6 proje ile portföy hem genişler hem de mevcut 4 vaka ile çakışmaz.
