# Mobil menü (hamburger) ekleme

Şu anda başlıktaki gezinme `hidden md:flex` ile gizli, yani mobilde hiç menü yok — sadece logo, dil, tema, LinkedIn ikonları görünüyor. Mobil için tam ekran bir menü paneli ekleyelim.

## Ne yapılacak

1. Yeni bileşen: `src/components/mobile-nav.tsx`
   - Sağ üstte `md:hidden` bir hamburger butonu (mevcut ikon butonlarıyla aynı çerçeve/monokrom stil, `lucide-react` Menu / X ikonları).
   - Tıklanınca başlığın altından açılan tam genişlikte panel: `bg-background/95 backdrop-blur`, üstte ince kenarlık.
   - İçerik (tek sütun, mono büyük harf başlıklar + kısa özet satırı, masaüstü dropdown metinlerinin aynısı):
     - Work: "Tüm case study'ler" + ilk 3 case study
     - Capabilities
     - Projects / Apps: Luma
     - Impact
     - Contact
     - "GET IN TOUCH" butonu (iletişim modalını açar)
   - Davranış: bağlantıya tıklayınca kapanır, Escape kapatır, açıkken sayfa kaydırması kilitlenir, odak paneldeki ilk öğeye gider.
   - Erişilebilirlik: `aria-expanded`, `aria-controls`, `aria-label`, mevcut odak halkası stili.

2. `src/routes/index.tsx`
   - Başlığın sağ tarafına `MobileNav` eklenir; masaüstü `<nav>` ve dropdown'lar aynı kalır.
   - Bölüm bağlantıları hash (`#work`, `#capabilities` …) olarak kalır.

3. `src/routes/work.$slug.tsx` ve `src/components/luma/luma-shell.tsx`
   - Aynı `MobileNav` eklenir; bu sayfalarda bağlantılar `/#work` gibi mutlak hash olur.

4. `src/lib/i18n.tsx`
   - Sadece gereken küçük metinler (menüyü aç/kapat etiketi) EN + TR olarak eklenir; geri kalan metinler mevcut `nav` ve `navDropdowns` anahtarlarından gelir.

5. Doğrulama
   - 390px genişlikte önizlemede `/`, `/work/<slug>` ve `/luma` sayfalarında menü açılışı, bağlantı geçişi ve kapanış kontrol edilir; EN/TR kontrolü yapılır.

## Kapsam dışı
- Masaüstü başlık tasarımında değişiklik yok.
- Yeni animasyon kütüphanesi yok; mevcut Tailwind geçişleri kullanılır.
- Renk sistemi ve tipografide değişiklik yok.
