<div align="center">
  <img src="public/hero.png" alt="Soedirent Banner" width="100%" />
</div>

<br/>

<div align="center">
  <h1 align="center" style="border: none;">📦 Soedirent</h1>
  <p align="center">
    <strong>Platform Jual Beli & Sewa Perlengkapan Mahasiswa</strong>
    <br/>
    Marketplace kampus untuk mahasiswa — jual, beli, dan sewa alat kuliah, elektronik, perlengkapan praktikum, dan kebutuhan akademik lainnya.
  </p>
  <p>
    <img src="https://img.shields.io/badge/Laravel-12-red?logo=laravel" alt="Laravel 12" />
    <img src="https://img.shields.io/badge/React-19-61DAFB?logo=react" alt="React 19" />
    <img src="https://img.shields.io/badge/TypeScript-5.7-3178C6?logo=typescript" alt="TypeScript" />
    <img src="https://img.shields.io/badge/Inertia.js-2-9553E9?logo=inertia" alt="Inertia.js v2" />
    <img src="https://img.shields.io/badge/Tailwind%20CSS-4-06B6D4?logo=tailwindcss" alt="Tailwind CSS v4" />
    <img src="https://img.shields.io/badge/SQLite-003B57?logo=sqlite" alt="SQLite" />
  </p>
</div>

---

## 📋 Daftar Isi

- [Tentang Platform](#-tentang-platform)
- [Panduan Pengguna](#-panduan-pengguna)
  - [Registrasi & Login](#1-registrasi--login)
  - [Mencari & Menjelajahi Barang](#2-mencari--menjelajahi-barang)
  - [Detail Barang](#3-detail-barang)
  - [Membeli Barang](#4-membeli-barang)
  - [Menyewa Barang](#5-menyewa-barang)
  - [Menjual Barang](#6-menjual-barang)
  - [Mengelola Barang (My Items)](#7-mengelola-barang-my-items)
  - [Riwayat Transaksi](#8-riwayat-transaksi)
  - [Riwayat Sewa](#9-riwayat-sewa)
  - [Dashboard](#10-dashboard)
  - [Pengaturan Profil](#11-pengaturan-profil)
- [Status & Alur State Machine](#-status--alur-state-machine)
- [Aturan Bisnis](#-aturan-bisnis)
- [Tech Stack](#-tech-stack)
- [Entity & Database](#-entity--database)
- [API Routes](#-api-routes)
- [Instalasi](#-instalasi)
- [Perintah Penting](#-perintah-penting)
- [Testing](#-testing)
- [Tampilan & Tema](#-tampilan--tema)
- [Lisensi](#-lisensi)

---

## 🎯 Tentang Platform

Soedirent adalah marketplace berbasis kampus yang dirancang khusus untuk mahasiswa. Platform ini memungkinkan mahasiswa untuk:

- **Menjual** perlengkapan kuliah bekas pakai (second) maupun baru
- **Membeli** kebutuhan akademik dari sesama mahasiswa
- **Menyewa** alat-alat praktikum atau perlengkapan yang hanya diperlukan sementara

Barang yang diperjualbelikan beragam — mulai dari laptop, buku algoritma, komponen PC, palu geologi, theodolite, perlengkapan teknik sipil, hingga Arduino kit.

Platform ini mendukung 7 kategori jurusan: Teknik Informatika, Teknik Geologi, Teknik Sipil, Teknik Industri, Teknik Elektro, Teknik Mesin, dan Teknik Komputer.

---

## 📖 Panduan Pengguna

### 1. Registrasi & Login

#### Registrasi
**Akses:** Klik "Join Us" atau buka `/register`

| Field | Tipe | Label | Validasi |
|-------|------|-------|----------|
| Nama Lengkap | text | Nama Lengkap | Required, max 255 char |
| Email | email | Email (@kampus.ac.id) | Required, unique, lowercase |
| Password | password (toggle) | Password | Required, confirmed, minimal 8 char |
| Konfirmasi Password | password (toggle) | Ulangi Password | Harus sama dengan Password |

**Alur:**
1. Isi semua field (password bisa ditampilkan/di-sembunyikan dengan ikon mata)
2. Klik **"Create Account"** (tombol berubah jadi "Creating Account..." saat diproses)
3. Jika berhasil → auto login → redirect ke `/dashboard`
4. Jika gagal → error ditampilkan per field (teks merah di bawah input)

#### Login
**Akses:** Klik "Sign In" atau buka `/login`

| Field | Tipe | Label |
|-------|------|-------|
| Email | email | Email |
| Password | password (toggle) | Password |
| Remember Me | checkbox | Remember me |

- Link **"Lupa password?"** → `/forgot-password`
- Link **"Daftar di sini"** → `/register`

---

### 2. Mencari & Menjelajahi Barang

**Akses:** `/browse` (publik, tidak perlu login)

**Filter yang tersedia:**

| Filter | Tipe | Opsi |
|--------|------|------|
| Pencarian | text | Cari berdasarkan nama atau deskripsi produk |
| Kategori | select dropdown | Semua Kategori / Teknik Informatika / Teknik Geologi / dll. |
| Kondisi | select dropdown | Semua Kondisi / Excellent / Like New / Good / Fair |
| Harga Min / Max | (via backend query param) | Bisa filter rentang harga |

**Sortir (dropdown atas kanan):**
- **Terbaru** (`newest`) — default
- **Harga Terendah** (`price_low`)
- **Harga Tertinggi** (`price_high`)

**Tampilan:**
- Grid produk (4 kolom) dengan kartu berisi gambar, nama, kategori, harga (diskon 10% otomatis ditampilkan dengan harga asli dicoret)
- Pagination (12 item per halaman)
- Informasi "Showing X-Y of Z results"
- Jika tidak ada hasil: "Produk Tidak Ditemukan — Coba sesuaikan filter Anda atau cari kata kunci lain."

---

### 3. Detail Barang

**Akses:** Klik kartu produk di halaman browse, atau buka `/items/{slug}` (publik)

**Tampilan halaman:**
- **Galeri Gambar:** Gambar utama besar + thumbnail grid (jika lebih dari 1 gambar). Klik thumbnail untuk ganti gambar utama.
- **Info Barang:** Kategori (warna primer), nama barang (4xl/5xl), rating (4 bintang + "(12 Reviews)" — statis/placeholder), harga
- **Deskripsi:** Teks deskripsi barang
- **Tombol Aksi (tergantung tipe ketersediaan):**
  - `sale` atau `both` → **"Buy Now"** (lansgung ke checkout beli)
  - `rent` atau `both` → Input jumlah hari (1–30) + **"Rent Now"** (dengan tampilan "Total Sewa: Rp XXX")
- **Spesifikasi:** Kondisi (capitalized), Brand (atau 'N/A'), Tanggal posting, Lokasi (atau 'N/A')
- **Info Penjual:** Avatar (inisial), nama, "Member since {tahun}"
- **Produk Terkait:** "You Might Also Like" — grid up to 4 produk dari kategori yang sama

**Harga (logika tampilan):**
- Jika `availability_type === 'rent'` DAN (`price` null atau 0): tampilkan `rental_price_per_day` dengan label "/ hari"
- Selain itu: tampilkan `price` dengan diskon 10% (harga asli dicoret)

---

### 4. Membeli Barang

**Prasyarat:** Login. Tidak bisa membeli barang milik sendiri.

#### Langkah-langkah:

**Step 1: Klik "Buy Now"**
- Dari halaman detail barang, klik tombol **"Buy Now"**
- Redirect ke halaman checkout (`/checkout?item_id=...&type=purchase`)

**Step 2: Konfirmasi Pesanan (Checkout)**
Halaman: `/checkout`

| Bagian | Field | Keterangan |
|--------|-------|------------|
| Metode Pengiriman | Radio: Pickup / Delivery | Pickup (gratis, bertemu penjual) / Delivery (isi alamat) |
| Alamat Delivery | textarea (muncul jika Delivery) | Required jika delivery |
| Metode Pembayaran | (static display) | Bank Transfer / E-Wallet — detail pembayaran akan diberikan penjual |
| Catatan Tambahan | textarea (opsional) | Pesan khusus untuk penjual |

**Ringkasan Pesanan (sidebar kanan):**
- Foto barang, nama, kondisi
- **Subtotal:** harga barang
- **Total** (bold)

**Submit:** Klik **"Place Order (Rp X.XXX)"** → tombol berubah jadi "Processing..."

**Step 3: Upload Bukti Pembayaran**
- Redirect ke halaman sukses `/checkout/success/{transaction}`
- Halaman sukses menampilkan: **"Order Placed!"**, nomor order (TXN-XXXXXXXX), total, penjual
- 3 langkah selanjutnya: "Check Your Details" → "Make Payment" → "Arrange Delivery"
- Tombol: "Continue Shopping" (`/browse`) / "Go to Dashboard" (`/dashboard`)
- **Aksi yang perlu dilakukan pembeli:** Buka detail transaksi (`/transactions/{id}`) → upload bukti bayar (file gambar, max 2MB)

**Step 4: Konfirmasi Penjual**
- Setelah upload bukti, status berubah jadi `paid`
- Penjual melihat bukti, lalu mengubah status ke `completed`
- Jika penjual menolak (cancel): status jadi `cancelled`, barang kembali tersedia

**Ringkasan alur pembelian:**
```
Checkout → pending_payment → (upload bukti) → paid → (seller konfirmasi) → completed
                                                                      → cancelled
```

---

### 5. Menyewa Barang

**Prasyarat:** Login. Tidak bisa menyewa barang milik sendiri.

#### Langkah-langkah:

**Step 1: Atur Durasi Sewa**
- Dari halaman detail barang, atur jumlah hari sewa (min 1, max 30)
- Total sewa otomatis terhitung: `(rental_price_per_day × days) + deposit`
- Klik **"Rent Now"**

**Step 2: Konfirmasi Pemesanan Sewa (Checkout)**
Halaman: `/checkout?item_id=...&type=rental&days=N`

| Bagian | Keterangan |
|--------|------------|
| Metode Pengiriman | Pickup / Delivery (sama seperti pembelian) |
| Metode Pembayaran | Bank Transfer / E-Wallet |
| Catatan Tambahan | Opsional |

**Ringkasan Sewa (sidebar):**
- "Rental Cost (N days)" — biaya sewa
- "Security Deposit" — deposit
- **Total** (bold) — biaya sewa + deposit

**Step 3: Pembayaran & Konfirmasi**
- Redirect ke halaman sukses: **"Booking Confirmed!"** dengan nomor rental (RNT-XXXXXXXX)
- Pembayaran dilakukan di luar platform (koordinasi dengan pemilik)
- Setelah pemilik konfirmasi → status `confirmed`

**Step 4: Pengembalian**
- Pemilik barang klik **"Mark as Returned"** (langsung dari status `confirmed`)
- Isi kondisi barang setelah sewa, damage fee (jika ada), catatan pengembalian
- Status berubah jadi `returned`, barang kembali tersedia

**Ringkasan alur sewa:**
```
Booking → pending_payment → confirmed → returned
                                     → cancelled (batal)

⚠️ Catatan: Status `ongoing` ada di database tapi belum ada flow
controller yang mengubah ke status ini. Owner langsung bisa
mark sebagai returned dari status confirmed.
```

---

### 6. Menjual Barang

**Akses:** `/items/create` (perlu login)

#### Form Tambah Barang

**Bagian 1: Informasi Dasar**

| Field | Tipe | Required | Keterangan |
|-------|------|----------|------------|
| Nama Item | text | Ya | Max 255 karakter |
| Kategori | select | Ya | Pilih dari 7 kategori jurusan |
| Kondisi | select | Ya | Excellent / Good / Fair |

**Bagian 2: Ketersediaan & Harga**

| Field | Tipe | Required | Muncul Jika |
|-------|------|----------|-------------|
| Tipe Ketersediaan | select | Ya | — |
| Lokasi | text | Tidak | — |
| Harga Jual (Rp) | number | Ya (jika sale/both) | `sale` atau `both` |
| Harga Sewa/hari (Rp) | number | Ya (jika rent/both) | `rent` atau `both` |
| Deposit (Rp) | number | Tidak | `rent` atau `both` |

**Tipe Ketersediaan:**
- **For Sale Only** — barang hanya dijual
- **For Rent Only** — barang hanya disewakan
- **For Sale and Rent** — barang bisa dibeli AND disewa

**Bagian 3: Detail**

| Field | Tipe | Required | Keterangan |
|-------|------|----------|------------|
| Deskripsi | textarea | Ya | 5 baris |
| Gambar | file (multiple) | Tidak | Format: jpeg, png, jpg, webp. Max 2MB/file |

**Preview Gambar:** Grid thumbnail dengan tombol Hapus (X) per gambar

**Submit:** Klik **"Publish Item"** → Redirect ke halaman detail barang dengan flash "Item berhasil ditambahkan!"

---

### 7. Mengelola Barang (My Items)

**Akses:** `/my-items` (perlu login)

**Tampilan:** Tabel dengan kolom:
| Kolom | Keterangan |
|-------|------------|
| Checkbox | Pilih untuk bulk delete |
| Nama Item | Nama barang |
| Status | Badge: Available (hijau) / Rented (kuning) / Sold (merah) / Maintenance (abu-abu) |
| Harga | Format Rupiah |
| Kategori | Nama kategori atau 'N/A' |
| Aksi | Ikon View (lihat detail) + Edit (edit barang) |

**Aksi yang tersedia:**
- **Add New Item** → `/items/create`
- **Edit** (pencil icon) → `/items/{id}/edit` (hanya pemilik)
- **View** (eye icon) → `/items/{slug}`
- **Bulk Delete** — centang barang, klik "Delete (N)" → konfirmasi

**Edit Barang:** Formulir lengkap dengan field tambahan: Brand, Model, Tahun Beli, Stok, Catatan, Deposit. Validasi kondisi di edit juga menerima 'poor'.

---

### 8. Riwayat Transaksi

**Akses:** `/transactions` (perlu login)

**Tabel Riwayat:**
| Kolom | Keterangan |
|-------|------------|
| Order ID | TXN-XXXXXXXX |
| Item | Nama barang |
| Role | Badge: "Buyer" (indigo) / "Seller" (teal) |
| Total | Format Rupiah |
| Status | Badge berwarna sesuai status |
| Tanggal | Format tanggal pendek |
| Aksi | "View Details" link |

**Status Badge (warna):**
| Status | Warna |
|--------|-------|
| `pending_payment` | Kuning |
| `paid` | Biru |
| `completed` | Hijau |
| `cancelled` | Merah |
| (default) | Abu-abu |

#### Detail Transaksi (`/transactions/{id}`)

**Informasi:** Tanggal, Item, Jumlah, Metode Pembayaran, Metode Pengiriman, Penjual, Pembeli, Alamat (jika delivery)

**Aksi berdasarkan peran & status:**

| Peran | Status | Aksi |
|-------|--------|------|
| **Pembeli** | `pending_payment` | Upload bukti bayar (file gambar, max 2MB) → status otomatis jadi `paid` |
| **Penjual** | `paid` | Konfirmasi jadi `completed` atau batalkan `cancelled` |
| **Siapa saja** | `pending_payment` / `paid` | Batalkan transaksi (cancel) |

---

### 9. Riwayat Sewa

**Akses:** `/rentals` (perlu login)

**Tabel Riwayat:**
| Kolom | Keterangan |
|-------|------------|
| Rental ID | RNT-XXXXXXXX |
| Item | Nama barang |
| Role | Badge: "Renter" (indigo) / "Owner" (teal) |
| Periode | Tanggal mulai — tanggal selesai |
| Total | Format Rupiah |
| Status | Badge berwarna sesuai status |
| Aksi | "View Details" link |

**Status Badge (warna):**
| Status | Warna |
|--------|-------|
| `pending_payment` | Kuning |
| `confirmed` | Biru |
| `ongoing` | Indigo |
| `returned` | Hijau |
| `cancelled` | Merah |
| `overdue` | Orange |

#### Detail Sewa (`/rentals/{id}`)

**Informasi:** Item, Periode Sewa, Tarif Harian, Pemilik, Penyewa, Deposit, Total

**Aksi Owner:**
| Status Sewa | Aksi Owner |
|-------------|------------|
| `pending_payment` | **"Confirm Booking"** → jadi `confirmed` / **"Decline Booking"** → jadi `cancelled` |
| `ongoing` | **"Mark as Returned"** → isi kondisi, damage fee → jadi `returned` |

---

### 10. Dashboard

**Akses:** `/dashboard` (perlu login)

**Tampilan:**
- Sambutan: "Welcome back, {nama}!"
- Tombol CTA: **"Add New Item"** (PlusCircle icon)
- **3 Kartu Statistik:**
  - 📦 Your Items Listed — jumlah barang Anda
  - 📅 Active Rentals — jumlah sewa aktif (confirmed + ongoing)
  - 🔄 Total Transactions — jumlah transaksi Anda
- **Recent Activities:** Gabungan transaksi & sewa terbaru (5 terakhir, urut tanggal)
- **Your Recent Items:** 5 item terbaru Anda

---

### 11. Pengaturan Profil

**Akses:** `/settings/profile` (perlu login)

| Tab | Field | Aksi |
|-----|-------|------|
| **Profile** | Name, Email | Update informasi profil |
| **Password** | Current Password, New Password, Confirm Password | Ganti password |
| **Appearance** | Light / Dark / System | Ganti tema tampilan |
| **Danger Zone** | — | Hapus akun (perlu password) |

---

## 🔄 Status & Alur State Machine

### Item Status
```
                    ┌─────────┐
                    │available│
                    └────┬────┘
                         │
              ┌──────────┼──────────┐
              ▼          ▼          ▼
           ┌──────┐  ┌──────┐  ┌───────┐
           │rented│  │ sold │  │mainte-│
           └──────┘  └──────┘  │nance  │
                               └───────┘
```

### Transaction Status Flow
```
                 ┌─────────────────┐
                 │pending_payment  │ ← checkout berhasil
                 └────────┬────────┘
                          │ (buyer upload bukti bayar)
                          ▼
                    ┌─────┴─────┐
                    │    paid    │
                    └─────┬─────┘
                          │ (seller konfirmasi)
                     ┌────┴────┐
                     │completed│
                     └─────────┘

       (buyer/seller bisa cancel dari pending_payment atau paid)
                          │
                          ▼
                     ┌──────────┐
                     │cancelled │
                     └──────────┘

       ⚠️ Catatan:
       - Status `refunded` ada di enum DB tapi tidak ada UI flow
         yang mengarah ke status ini.
       - Cancel logic di controller memeriksa `pending` bukan
         `pending_payment` → bisa jadi bug (tidak cocok dengan migration).
```

### Rental Status Flow
```
                 ┌─────────────────┐
                 │pending_payment  │ ← booking berhasil (CheckoutController)
                 └────────┬────────┘
                          │ (owner konfirmasi)
                          ▼
                    ┌───────────┐
                    │ confirmed │
                    └─────┬─────┘
                          │ (owner mark returned + isi kondisi)
                          ▼
                     ┌──────────┐
                     │ returned │
                     └──────────┘

       (cancel dari pending_payment atau confirmed oleh owner/renter)
                          │
                          ▼
                     ┌───────────┐
                     │ cancelled │
                     └───────────┘

       ⚠️ Catatan:
       - Status `ongoing` ada di schema DB tapi tidak ada controller
         yang mengubah ke status ini (dari confirmed langsung ke returned).
       - Status `overdue` ada di schema DB & model method isOverdue(),
         tapi tidak ada mekanisme auto-update status.
       - RentalController@store (lama) pakai status 'pending'
         sedangkan CheckoutController@store pakai 'pending_payment'.
```

---

## ⚖️ Aturan Bisnis

1. **Tidak bisa membeli/menyewa barang sendiri** — dicegah oleh sistem, muncul error "You cannot purchase your own item."
2. **Item harus `available`** untuk bisa dibeli/disewa — jika tidak, error "This item is no longer available."
3. **Harga conditional:**
   - `sale` / `both` → price wajib diisi
   - `rent` / `both` → rental_price_per_day wajib diisi
4. **Sewa maksimal 30 hari**
5. **Deposit** ditambahkan ke total biaya sewa (tidak wajib, default 0)
6. **Total sewa** = (daily_rate × days) + deposit
7. **Jika item `sale` terjual:** `is_available` = false
8. **Jika item `rent` disewa:** `is_available` = false
9. **Jika item `both` terjual:** availability_type berubah jadi `rent`
10. **Soft delete item:** `is_active = false` (tidak dihapus dari DB)
11. **Upload bukti bayar otomatis** mengubah status transaksi ke `paid`
12. **Hanya penjual/pemilik** yang bisa mengonfirmasi transaksi/sewa
13. **Hanya pembeli** yang bisa upload bukti bayar
14. **Batal transaksi** hanya bisa dari status `pending_payment` atau `paid`
15. **Batal sewa** hanya bisa dari status `pending_payment` atau `confirmed`
16. **Diskon harga 10%** otomatis ditampilkan di kartu produk (hanya visual)
17. **Rating & review** — tersedia di database (rating, rating_count) tapi belum ada UI untuk input

---

## 🐛 Temuan & Catatan

Berikut adalah ketidaksesuaian/issue yang ditemukan saat verifikasi kode, beserta status perbaikannya:

| Issue | Status | Detail |
|-------|--------|--------|
| **Halaman Edit Item tidak ada** | ✅ Fixed | Dibuat `Items/Edit.jsx` dengan form edit lengkap |
| **Route name mismatch** | ✅ Fixed | Diubah jadi redirect ke `/items/{slug}` langsung |
| **Bulk delete route tidak ada** | ✅ Fixed | Ditambahkan route + `ItemController@bulkDelete` |
| **Cancel check typo (transaction)** | ✅ Fixed | `pending` → `pending_payment` |
| **Cancel check typo (rental)** | ✅ Fixed | `pending` → `pending_payment` |
| **RentalController@store field mismatch** | ✅ Fixed | Field disesuaikan dengan migration (`total_price` → `total_amount`, dll) |
| **Deposit field tidak bisa diisi** | ✅ Fixed | Ditambahkan field `deposit_amount` di form create & edit |
| **Rental status `ongoing` unreachable** | ⚠️ Dibiarkan | Status `ongoing` ada di schema DB tapi tidak ada controller yang mengesetnya. Owner langsung `confirmed → returned` via `completeReturn`. |
| **Route cancel & complete-return tidak ada** | ✅ Fixed | Ditambahkan route POST untuk cancel transaction, cancel rental, complete return |
| **`items.bulk-delete` route** | ✅ Fixed | Ditambahkan route POST + method `bulkDelete` di ItemController |

---

## 🧱 Tech Stack

| Lapisan | Teknologi |
|---------|-----------|
| **Backend** | PHP 8.2+, Laravel 12 |
| **Frontend** | React 19, TypeScript 5.7 |
| **Rendering** | Inertia.js v2 (SPA + SSR) |
| **CSS** | Tailwind CSS v4, shadcn/ui (Radix UI primitives) |
| **Ikon** | lucide-react |
| **Database** | SQLite (default), bisa MySQL/PostgreSQL |
| **Build** | Vite 7 + laravel-vite-plugin |
| **Testing** | Pest PHP 3.x |
| **Linting** | ESLint, Prettier, Laravel Pint |

---

## 🗄️ Entity & Database

### Entity Relationship

```
┌──────────┐     ┌──────────┐     ┌───────────┐
│  users   │1──N│  items   │N──1│ categories │
└────┬─────┘     └────┬─────┘     └───────────┘
     │                 │
     │                 │
  N──┼──N          N───┼───N
     │                 │
 ┌───┴───────┐   ┌────┴───────┐
 │transactions│   │  rentals   │
 └───────────┘   └────────────┘
```

### Users
| Field | Tipe | Default |
|-------|------|---------|
| name | string | — |
| email | string unique | — |
| password | hashed | — |
| student_id | string unique nullable | NIM |
| university | string nullable | — |
| faculty | string nullable | — |
| major | string nullable | — |
| semester | string nullable | — |
| phone | string nullable | — |
| address | text nullable | — |
| avatar | string nullable | File path |
| rating | decimal(3,2) | 0 |
| rating_count | integer | 0 |
| is_verified | boolean | false |
| verified_at | timestamp nullable | — |

### Items
| Field | Tipe | Default |
|-------|------|---------|
| user_id | FK → users | — |
| category_id | FK → categories | — |
| name | string | — |
| slug | string unique | Auto: `{name}-{random6}` |
| description | text | — |
| price | decimal(10,2) nullable | Harga jual |
| rental_price_per_day | decimal(10,2) nullable | Harga sewa/hari |
| deposit_amount | decimal(12,2) nullable | Deposit sewa |
| condition | enum | `excellent, good, fair, poor, like_new` |
| availability_type | enum | `sale, rent, both` |
| status | enum | `available, rented, sold, maintenance` |
| images | json nullable | Array path gambar |
| brand / model | string nullable | — |
| year_purchased | year nullable | — |
| stock_quantity | integer | 1 |
| is_featured | boolean | false |
| is_active | boolean | true |
| is_available | boolean | true |

### Categories (7 seeded)
| Nama | Slug | Ikon |
|------|------|------|
| Teknik Informatika | teknik-informatika | 💻 |
| Teknik Geologi | teknik-geologi | ⛰️ |
| Teknik Sipil | teknik-sipil | 🏗️ |
| Teknik Industri | teknik-industri | 🏭 |
| Teknik Elektro | teknik-elektro | ⚡ |
| Teknik Mesin | teknik-mesin | ⚙️ |
| Teknik Komputer | teknik-komputer | 🖥️ |

### Transactions
| Field | Tipe | Default |
|-------|------|---------|
| transaction_number | string unique | `TXN-{random8}` |
| item_id | FK → items | — |
| buyer_id | FK → users | — |
| seller_id | FK → users | — |
| amount | decimal(10,2) | — |
| status | enum | `pending_payment, paid, completed, cancelled, refunded` |
| payment_method | enum | `bank_transfer, e_wallet, cash` |
| delivery_method | enum | `pickup, delivery` |
| payment_proof | string nullable | File path |

### Rentals
| Field | Tipe | Default |
|-------|------|---------|
| rental_number | string unique | `RNT-{random8}` |
| item_id | FK → items | — |
| renter_id | FK → users | — |
| owner_id | FK → users | — |
| start_date | date | Hari ini |
| end_date | date | Hari ini + N hari |
| daily_rate | decimal(10,2) | — |
| total_days | integer | — |
| deposit_amount | decimal(10,2) | 0 |
| total_amount | decimal(10,2) | (rate × days) + deposit |
| status | enum | `pending_payment, confirmed, ongoing, returned, cancelled, overdue` |
| late_fee / damage_fee | decimal(10,2) | 0 |

---

## 🧭 API Routes

### Public (tanpa login)

| Method | URI | Halaman |
|--------|-----|---------|
| GET | `/` | Landing Page |
| GET | `/browse` | Jelajahi Produk |
| GET | `/items/{slug}` | Detail Barang |
| GET | `/register` | Registrasi |
| GET | `/login` | Login |
| GET | `/forgot-password` | Lupa Password |
| GET | `/reset-password/{token}` | Reset Password |

### Authenticated (perlu login)

| Method | URI | Halaman / Fungsi |
|--------|-----|------------------|
| GET | `/dashboard` | Dashboard |
| GET | `/my-items` | Daftar Barang Saya |
| GET | `/items/create` | Tambah Barang |
| POST | `/items` | Simpan Barang Baru |
| GET | `/items/{id}/edit` | Edit Barang |
| PUT | `/items/{id}` | Update Barang |
| DELETE | `/items/{id}` | Hapus Barang |
| GET | `/checkout` | Halaman Checkout |
| POST | `/checkout/process` | Proses Pesanan |
| GET | `/checkout/success/{id}` | Halaman Sukses Beli |
| GET | `/checkout/rental-success/{id}` | Halaman Sukses Sewa |
| GET | `/transactions` | Riwayat Transaksi |
| GET | `/transactions/{id}` | Detail Transaksi |
| PATCH | `/transactions/{id}` | Update Transaksi |
| POST | `/transactions/{id}/upload-proof` | Upload Bukti Bayar |
| GET | `/rentals` | Riwayat Sewa |
| GET | `/rentals/{id}` | Detail Sewa |
| PATCH | `/rentals/{id}` | Update Sewa |
| GET | `/profile` | Pengaturan Profil |
| DELETE | `/profile` | Hapus Akun |
| POST | `/logout` | Logout |

---

## 🚀 Instalasi

### Prasyarat
- PHP 8.2+
- Composer
- Node.js 18+
- npm / yarn

### Langkah

```bash
# 1. Clone repositori
git clone https://github.com/username/lintas.git
cd lintas

# 2. Install dependencies PHP
composer install

# 3. Install dependencies JavaScript
npm install

# 4. Copy environment & generate key
cp .env.example .env
php artisan key:generate

# 5. Setup database (SQLite default: buat file database/database.sqlite)
#    atau ubah .env ke MySQL/PostgreSQL
touch database/database.sqlite
php artisan migrate --seed

# 6. Buat storage link (untuk akses gambar)
php artisan storage:link

# 7. Jalankan dev server
composer run dev
```

Akses di `http://localhost:8000`.

---

## 🔧 Perintah Penting

| Perintah | Deskripsi |
|----------|-----------|
| `composer run dev` | Jalankan dev server (Laravel + Vite) |
| `npm run build` | Build assets untuk production |
| `php artisan migrate:fresh --seed` | Reset database + seeder |
| `php artisan make:migration` | Buat migration baru |
| `php artisan make:controller` | Buat controller baru |
| `php artisan test` | Jalankan testing (Pest) |
| `npm run lint` | ESLint + Prettier |
| `npm run typecheck` | TypeScript check |
| `php artisan storage:link` | Link storage ke public |

---

## 🧪 Testing

```bash
php artisan test
```

Menggunakan **Pest PHP 3.x** untuk unit test dan feature test.

---

## 🎨 Tampilan & Tema

- **Palet warna:** Hangat krem/cokelat khas akademik (HSL: 30 17% 96% bg, 25 35% 26% primary)
- **Font:** Inter (sans-serif) + Playfair Display (serif)
- **Mode:** Terang / Gelap / Sistem (bisa diubah di `/settings/appearance`)
- **SSR:** Inertia SSR untuk initial page load cepat
- **Responsif:** Mobile-first layout

---

## 📄 Lisensi

Hak cipta © 2024 — Dibuat untuk kebutuhan mahasiswa Indonesia.

---

<div align="center">
  Dibuat dengan ❤️ untuk mahasiswa Indonesia
</div>
