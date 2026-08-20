# Menüdeki çevrilmemiş metinleri düzeltme

Kontrol sonucu: menü etiketleri (Work/Projeler, Yetkinlikler, Etki, İletişim) ve açılır menü özetleri i18n'de hem EN hem TR olarak mevcut. Çevrilmeyen tek yer **case study başlıkları**: masaüstü açılır menüde ve mobil menüde başlıklar `caseStudies` dizisindeki İngilizce `title` alanından geliyor, oysa ana sayfa ve case study sayfası `tCase(lang, slug)` ile yerelleştirilmiş başlığı kullanıyor.

## Yapılacak

1. `src/routes/index.tsx` (satır ~172, Work açılır menüsü)
   - `label: c.title` yerine `label: tCase(lang, c.slug)?.title ?? c.title`
   - Öğe özeti de yerelleştirilmiş tagline'ı kullanacak (varsa).

2. `src/routes/work.$slug.tsx` (satır ~112)
   - Aynı değişiklik; `tCase` zaten bu dosyada import edilmiş.

3. `src/components/luma/luma-shell.tsx` (satır ~44)
   - `useLang` + `tCase` ile aynı yerelleştirme.

4. `src/components/mobile-nav.tsx` (satır ~87)
   - Mobil menüdeki ilk 3 case study başlığı `tCase(lang, c.slug)?.title ?? c.title` olacak.

5. Doğrulama
   - 390px ve masaüstü genişlikte TR dilinde menü açılıp başlıkların Türkçe geldiği kontrol edilecek; EN'de değişiklik olmadığı doğrulanacak.

## Kapsam dışı
- Menü tasarımı, düzeni veya davranışında değişiklik yok.
- Yeni çeviri metni yazılmayacak; mevcut `caseStudyI18n` içerikleri kullanılacak.
