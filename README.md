<<<<<<< HEAD
# Website SD Negeri Serua 3

Website resmi SD Negeri Serua 3, Tangerang Selatan.  
Stack: **Next.js 14 App Router** + **Prisma ORM** + **MySQL**

---

## Struktur Folder

```
sdn-serua3/
├── app/
│   ├── page.tsx                  ← Homepage
│   ├── layout.tsx
│   ├── globals.css
│   ├── berita/
│   │   ├── page.tsx              ← Daftar berita
│   │   └── [slug]/page.tsx       ← Detail berita
│   ├── ppdb/
│   │   └── page.tsx              ← Form pendaftaran
│   ├── admin/
│   │   ├── login/page.tsx        ← Login admin
│   │   ├── dashboard/page.tsx    ← Dashboard
│   │   ├── berita/page.tsx       ← Kelola berita
│   │   ├── ppdb/page.tsx         ← Kelola pendaftar
│   │   └── kontak/page.tsx       ← Pesan masuk
│   └── api/
│       ├── auth/login/route.ts
│       ├── auth/logout/route.ts
│       ├── berita/route.ts
│       ├── berita/[slug]/route.ts
│       ├── kontak/route.ts
│       ├── kontak/[id]/route.ts
│       ├── ppdb/route.ts
│       ├── ppdb/[id]/route.ts
│       ├── profil/route.ts
│       ├── fasilitas/route.ts
│       ├── galeri/route.ts
│       ├── guru/route.ts
│       ├── guru/[id]/route.ts
│       ├── prestasi/route.ts
│       └── info/route.ts
├── components/
│   └── sections/
│       └── KontakForm.tsx
├── lib/
│   ├── prisma.ts
│   ├── auth.ts
│   └── response.ts
├── middleware.ts
├── prisma/
│   ├── schema.prisma
│   └── seed.js
├── .env.example
├── package.json
└── tsconfig.json
```

---

## Setup & Instalasi

### 1. Clone dan masuk ke folder proyek
```bash
cd sdn-serua3
```

### 2. Install dependencies
```bash
npm install
```

### 3. Setup environment variables
```bash
cp .env.example .env.local
```
Edit `.env.local` dan isi dengan data asli:
```env
DATABASE_URL="mysql://root:PASSWORD_ANDA@localhost:3306/sdn_serua3"
JWT_SECRET="random-string-panjang-minimal-32-karakter"
NEXT_PUBLIC_BASE_URL="http://localhost:3000"
```

### 4. Buat database MySQL
```sql
CREATE DATABASE sdn_serua3 CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;
```

### 5. Push schema ke database & generate Prisma client
```bash
npx prisma generate
npx prisma db push
```

### 6. Seed data awal
```bash
node prisma/seed.js
```

### 7. Jalankan development server
```bash
npm run dev
```

Buka [http://localhost:3000](http://localhost:3000)

---

## Akses Admin

URL: `http://localhost:3000/admin/login`

Default login (dari seed):
- Email: `admin@sdnserua3.sch.id`
- Password: `admin123`

**Ganti password setelah pertama login!**

---

## API Endpoints

| Method | Endpoint | Deskripsi | Auth |
|--------|----------|-----------|------|
| GET | `/api/info` | Info sekolah | - |
| GET | `/api/berita` | Daftar berita | - |
| POST | `/api/berita` | Tambah berita | ✓ |
| GET | `/api/berita/[slug]` | Detail berita | - |
| PUT | `/api/berita/[slug]` | Edit berita | ✓ |
| DELETE | `/api/berita/[slug]` | Hapus berita | ✓ |
| POST | `/api/kontak` | Kirim pesan | - |
| GET | `/api/kontak` | Daftar pesan | ✓ |
| PATCH | `/api/kontak/[id]` | Update status pesan | ✓ |
| POST | `/api/ppdb` | Daftar PPDB | - |
| GET | `/api/ppdb` | Data pendaftar | ✓ |
| PATCH | `/api/ppdb/[id]` | Update status PPDB | ✓ |
| GET | `/api/fasilitas` | Data fasilitas | - |
| GET | `/api/guru` | Data guru | - |
| GET | `/api/galeri` | Data galeri | - |
| POST | `/api/auth/login` | Login admin | - |
| POST | `/api/auth/logout` | Logout | - |

---

## Deployment ke Production

```bash
# Build
npm run build

# Set environment variables di server (Vercel/VPS)
# DATABASE_URL=mysql://...
# JWT_SECRET=...
# NEXT_PUBLIC_BASE_URL=https://domain-anda.com

# Start
npm start
```

Untuk Vercel: tambahkan env vars di Settings → Environment Variables.  
Untuk VPS: gunakan PM2 + Nginx reverse proxy.
=======
# website-sdn-serua3
>>>>>>> 9dc6a5ef6866072ada906533a0be70e86b77f93c
