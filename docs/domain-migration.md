# Migrasi ke mohfahrezi.dev

Domain utama: https://mohfahrezi.dev/

## Deploy di Vercel

1. Tambahkan `mohfahrezi.dev` dan `www.mohfahrezi.dev` ke project Vercel yang menjalankan repository ini. Pertahankan `dev.fahrezi.tech` pada project yang sama.
2. Ikuti nilai DNS yang ditampilkan Vercel untuk setiap domain, lalu tunggu status domain dan sertifikat HTTPS valid. Jangan mengganti record email/MX saat memindahkan website.
3. Deploy perubahan repository ini. `vercel.json` mengalihkan domain lama dan versi www secara permanen (308), dengan path dan query tetap diteruskan.
4. Periksa homepage baru berstatus 200; domain lama dan www harus mengarah ke domain baru tanpa loop. Coba juga URL PDF CV lama dan query string. URL yang tidak ada harus berstatus 404, bukan 200.
5. Periksa `/robots.txt`, `/sitemap.xml`, canonical, metadata sosial, dan JSON-LD pada domain baru. Sitemap hanya memuat homepage karena section berawalan `#` bukan halaman terpisah.

Aturan redirect ini berlaku jika domain terhubung ke deployment Vercel yang memakai konfigurasi ini. Jika hosting berubah, buat aturan setara di hosting yang menangani domain lama.

## Google Search Console

1. Verifikasi properti domain `mohfahrezi.dev` menggunakan DNS. Token verifikasi HTML lama tetap dipertahankan, tetapi tidak membuktikan kepemilikan domain baru.
2. Submit `https://mohfahrezi.dev/sitemap.xml` dan gunakan URL Inspection untuk meminta indexing homepage.
3. Setelah redirect aktif, gunakan Change of Address pada properti domain lama yang sesuai. Pertahankan redirect setidaknya satu tahun.
4. Perbarui tautan portfolio pada GitHub, LinkedIn, CV, dan profil publik lainnya.

Alamat kontak website dan metadata: `hello@mohfahrezi.dev`. Pastikan mailbox atau forwarding alamat tersebut aktif pada penyedia email. Jika menggunakan formulir EmailJS, periksa alamat penerima di template EmailJS; alamat itu dikelola terpisah dari `profile.email` pada website.

Referensi: https://developers.google.com/search/docs/crawling-indexing/site-move-with-url-changes
