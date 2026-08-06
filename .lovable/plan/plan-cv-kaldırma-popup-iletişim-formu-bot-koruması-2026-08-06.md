# Plan: CV kaldırma + popup iletişim formu + bot koruması

## 1. CV'yi sistemden tamamen çıkar
- `src/routes/index.tsx`: `CV_URL` sabiti ve "Download CV (PDF)" bağlantısı kaldırılır.
- `src/lib/i18n.tsx`: EN/TR `contact.cta.cv` metinleri ve tip alanı silinir.
- `public/cv/` klasörü (README dahil) silinir.
- Kalan referans olmadığı grep ile doğrulanır.

## 2. Formu popup (modal) yap
- İletişim bölümünde form yerine tek bir birincil buton: "Mesaj gönder" / "Send a message".
- Buton, shadcn `Dialog` içinde açılan formu tetikler (mevcut alanlar: Ad, E-posta, Konu, Mesaj — aynı stil, monokrom tasarım).
- Erişilebilirlik: odak modal içinde kalır, ESC ile kapanır, başlık `DialogTitle` ile bağlanır, gönderim sonrası başarı mesajı.
- Başarılı gönderimde modal kapanır ve toast (sonner) ile onay verilir.

## 3. Mesajları e-posta olarak ilet (Resend)
- Resend connector bağlanır (`standard_connectors--connect`), gateway üzerinden e-posta gönderilir.
- `src/lib/contact.functions.ts` sunucu fonksiyonu: doğrulama sonrası Resend'e POST; `reply_to` gönderenin e-postası olur.
- Gönderici alan adı: Resend'de doğrulanmış bir alan adı gerekir (ör. `contact@behruzbagirzade.com`). Doğrulanana kadar test için Resend'in kendi test göndericisi kullanılır ve sadece hesap sahibine ulaşır.
- Alıcı adres (sizin gelen kutunuz) bir gizli değişkende (`CONTACT_TO_EMAIL`) tutulur; sitede görünmez.

## 4. Bot koruması: Cloudflare Turnstile
- Cloudflare panelinden alınacak iki değer: Site Key (herkese açık, kodda) ve Secret Key (gizli değişken `TURNSTILE_SECRET_KEY`).
- Modal içindeki formda Turnstile widget'ı (görünmez/yönetilen mod) render edilir; token form ile birlikte gönderilir.
- Sunucu tarafında token `siteverify` ile doğrulanır; başarısızsa istek reddedilir ve e-posta gönderilmez.
- Ek katman olarak honeypot alanı + minimum doldurma süresi kontrolü eklenir (ücretsiz, kullanıcıyı etkilemez).

## Teknik notlar
- Sunucu fonksiyonu ince tutulur; e-posta/doğrulama yardımcıları ayrı `*.server.ts` dosyasına taşınır.
- Zod doğrulaması hem istemci hem sunucuda çalışmaya devam eder.
- Sırlar: `CONTACT_TO_EMAIL`, `TURNSTILE_SECRET_KEY` (+ Resend bağlantısı anahtarı connector ile gelir).

## Sizden gerekenler
1. Cloudflare Turnstile Site Key + Secret Key.
2. Mesajların gideceği e-posta adresi.
3. Resend hesabı bağlantısı (bağlan kartı ile) ve tercihen doğrulanmış alan adı.
