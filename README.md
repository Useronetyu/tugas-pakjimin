# ☕ Cappuccino Cloud: Production-Ready E-Commerce

**Cappuccino Cloud** adalah platform e-commerce khusus industri kopi yang dirancang untuk memberikan pengalaman berbelanja digital yang premium, cepat, dan reliabel. Aplikasi ini tidak hanya sekadar katalog produk, melainkan sebuah solusi *end-to-end* yang menggabungkan estetika modern dengan keandalan infrastruktur *cloud*. Dibangun menggunakan ekosistem **React** dan **Tailwind CSS** untuk antarmuka yang reaktif, serta ditenagai oleh **Supabase** sebagai *backend-as-a-service* guna memastikan integritas data, autentikasi yang aman, dan performa tinggi pada setiap transaksi.

---

## 🏗️ Arsitektur Sistem & Alur Logika

Aplikasi ini mengadopsi arsitektur **Dual-Interface Logic** yang memisahkan jalur pengalaman pelanggan (*Customer-Facing*) dan kendali administratif (*Back-office*) secara fundamental. Pemisahan ini dilakukan pada level *routing* dan logika otorisasi untuk menjamin bahwa data sensitif administratif tidak terpapar pada pengguna umum, sementara performa sisi publik tetap ringan dan cepat.



* **Logic Pemisahan Akses:** Sistem menggunakan mekanisme *Conditional Authentication*. Pengguna umum diarahkan ke portal belanja publik menggunakan Supabase Auth. Namun, akses administratif menggunakan logika kustom yang memverifikasi kredensial statis (`admin12` / `admin1234567890`) secara langsung. Jika cocok, sistem akan melakukan *immediate redirect* ke dashboard admin tanpa beban proses autentikasi standar yang panjang.
* **Keamanan Rute (Route Guard):** Rute `/admin` telah diproteksi dengan *middleware* khusus. Sistem akan terus-menerus memverifikasi status sesi admin; jika pengguna tanpa otorisasi mencoba mengakses URL administratif secara manual, sistem akan secara otomatis memutus akses dan mengembalikan mereka ke halaman login demi menjaga keamanan data perusahaan.

---

## 🛍️ Pengalaman Pengguna (Customer Experience)

Antarmuka pelanggan dirancang dengan filosofi **Mobile-First** dan **Conversion-Oriented**. Kami memastikan bahwa setiap elemen visual, mulai dari pemilihan warna hingga transisi antar halaman, berkontribusi pada kemudahan navigasi dan peningkatan keinginan pelanggan untuk melakukan pembelian.

* **Visual & Navigasi:** Menggunakan palet warna "Coffee" (Dark Brown `#4B3832` & Cream `#F5F5DC`), aplikasi ini memberikan kesan hangat dan profesional. Navbar tetap (*sticky*) dilengkapi dengan **Floating Cart Icon** yang memiliki *badge* jumlah item real-time, memberikan umpan balik visual instan setiap kali pelanggan menambahkan produk ke keranjang.
* **Etalase & Katalog Dinamis:** Halaman utama menyajikan *Hero Section* dengan *sliding banner* interaktif untuk mempromosikan penawaran spesial seperti "Buy 1 Get 1". Katalog produk diatur dalam grid yang responsif, di mana data ditarik secara dinamis dari tabel `products` di Supabase, memastikan informasi harga dan ketersediaan selalu akurat.
* **Sistem Keranjang Non-Intrusif:** Alih-alih mengalihkan pengguna ke halaman baru, sistem menggunakan **Cart Drawer** (laci samping). Hal ini memungkinkan pelanggan untuk terus melihat produk lain sambil tetap memiliki kontrol penuh untuk menambah, mengurangi, atau menghapus item pesanan mereka sebelum masuk ke tahap final.

---

## 📲 Logika Checkout & Integrasi WhatsApp

Ini merupakan fitur paling krusial yang menjamin integritas data transaksi. Kami menerapkan metode **Sequential Transaction Action** yang memastikan bahwa setiap pesanan tercatat di sistem internal sebelum diteruskan ke saluran komunikasi eksternal.

1.  **Validasi & Form Modal:** Saat pelanggan menekan tombol "Checkout", sebuah modal muncul untuk menangkap data krusial: Nama, Alamat Lengkap, dan Metode Pembayaran (Transfer/COD). Sistem melakukan validasi di sisi klien untuk memastikan data yang dikirimkan lengkap dan valid.
2.  **Penyimpanan Cloud (Action A):** Aplikasi pertama-tama melakukan operasi `INSERT` ke tabel `orders` di Supabase. Data yang disimpan mencakup detail pelanggan, total harga, dan snapshot item dalam format JSON. Langkah ini sangat penting sebagai *backup* data jika terjadi kegagalan pada aplikasi pihak ketiga atau gangguan jaringan.
3.  **Redireksi WhatsApp Otomatis (Action B):** Hanya setelah database mengonfirmasi bahwa data berhasil disimpan, aplikasi akan menyusun pesan teks yang terformat rapi dan mengarahkan pelanggan ke WhatsApp Admin (`6288225691061`). Pesan ini berisi rincian lengkap pesanan yang memudahkan admin untuk memverifikasi dan memproses pesanan secara manual tanpa ada risiko data hilang.

---

## 🛠️ Panel Admin (Private View)

Dashboard Admin dirancang untuk efisiensi operasional maksimal bagi pengelola toko. Menggunakan tata letak **Professional Sidebar**, admin dapat mengelola seluruh ekosistem toko tanpa harus memahami bahasa pemrograman atau basis data secara langsung.

* **Manajemen Inventaris (CRUD):** Admin diberikan kendali penuh untuk melakukan *Create, Read, Update,* dan *Delete* pada menu kopi. Fitur ini memungkinkan admin memperbarui harga, mengubah deskripsi produk, atau mengganti gambar produk secara *real-time* yang akan langsung tercermin di halaman pelanggan.
* **Order History & Monitoring:** Tab *Order History* berfungsi sebagai pusat kendali untuk memantau semua transaksi yang masuk. Meskipun pesanan diteruskan ke WhatsApp, semua riwayat tetap tersimpan rapi dalam tabel yang menampilkan Tanggal, Nama Pelanggan, Daftar Item, dan Total Harga. Ini sangat krusial untuk keperluan audit penjualan harian dan analisis tren produk terlaris.

---

## 🚀 Panduan Teknis Instalasi

Ikuti langkah-langkah di bawah ini untuk menyiapkan lingkungan pengembangan lokal Anda dengan benar:

### 1. Persiapan Lingkungan
Clone repositori ini dari GitHub dan instal semua dependensi yang diperlukan menggunakan pengelola paket npm:
```bash
git clone [https://github.com/username/cappuccino-cloud.git](https://github.com/username/cappuccino-cloud.git)
cd cappuccino-cloud
npm install


## 🚀 Panduan Teknis Instalasi

Bagian ini menjelaskan langkah-langkah kritis untuk mengonfigurasi infrastruktur backend dan menjalankan aplikasi di lingkungan lokal Anda.

### 1. Konfigurasi Skema Database (Supabase)
Untuk memastikan aplikasi berjalan dengan benar, Anda harus menyiapkan struktur tabel pada proyek Supabase Anda. Masuk ke **SQL Editor** di dashboard Supabase dan jalankan skrip SQL berikut secara berurutan untuk membuat tabel `products` dan `orders`:

```sql
-- Tabel Produk: Menyimpan data menu kopi dan kategori
CREATE TABLE products (
  id uuid DEFAULT uuid_generate_v4() PRIMARY KEY,
  name text NOT NULL,
  price numeric NOT NULL,
  description text,
  image_url text,
  category text,
  created_at timestamp with time zone DEFAULT now()
);

-- Tabel Pesanan: Menyimpan riwayat transaksi dan data pelanggan
CREATE TABLE orders (
  id uuid DEFAULT uuid_generate_v4() PRIMARY KEY,
  created_at timestamp with time zone DEFAULT now(),
  customer_name text NOT NULL,
  customer_address text NOT NULL,
  total_price numeric NOT NULL,
  items_json jsonb NOT NULL, -- Menyimpan snapshot item yang dibeli
  status text DEFAULT 'pending'
);

```

2. Pengaturan Variabel Lingkungan
Aplikasi menggunakan Vite sebagai build tool, sehingga variabel lingkungan harus diawali dengan prefix VITE_. Buatlah sebuah file bernama .env pada direktori root proyek Anda dan masukkan kunci API yang diperoleh dari pengaturan proyek Supabase Anda (Settings > API):

# Koneksi Supabase
VITE_SUPABASE_URL=[https://id-proyek-anda.supabase.co](https://id-proyek-anda.supabase.co)
VITE_SUPABASE_ANON_KEY=your-public-anon-key-here

# Konfigurasi Admin (Opsional jika ingin diubah)
VITE_ADMIN_USERNAME=admin12
VITE_ADMIN_PASSWORD=admin1234567890

3. Menjalankan Aplikasi
Setelah database dan variabel lingkungan siap, Anda dapat memulai server pengembangan. Pastikan Anda telah menginstal semua dependensi menggunakan npm install sebelumnya.

Jalankan perintah berikut di terminal Anda:

# Menjalankan server pengembangan lokal
```bash
npm run dev

```

Aplikasi biasanya akan tersedia di alamat http://localhost:5173. Anda sekarang dapat mengakses antarmuka pelanggan di rute utama / atau masuk ke dashboard administratif melalui halaman login.

© 2026 Cappuccino Cloud Project
Sistem ini dikembangkan untuk memberikan standar baru dalam manajemen retail kopi digital. Seluruh hak cipta dilindungi.

```bash
Apakah Anda ingin saya membuatkan **Data Dummy SQL** (contoh data produk) agar aplikasi Anda langsung terlihat penuh dengan menu kopi saat pertama kali dijalankan?

```