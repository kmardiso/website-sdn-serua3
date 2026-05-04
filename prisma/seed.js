const { PrismaClient } = require('@prisma/client')
const bcrypt = require('bcryptjs')

const prisma = new PrismaClient()

async function main() {
  // Seed Admin
  const hashedPassword = await bcrypt.hash('admin123', 10)
  await prisma.admin.upsert({
    where: { email: 'admin@sdnserua3.sch.id' },
    update: {},
    create: {
      nama: 'Administrator',
      email: 'admin@sdnserua3.sch.id',
      password: hashedPassword,
      role: 'SUPERADMIN',
    },
  })

  // Seed Info Sekolah
  const infoSekolah = [
    { key: 'npsn', value: '20604893', label: 'NPSN' },
    { key: 'nama_sekolah', value: 'SD Negeri Serua 3', label: 'Nama Sekolah' },
    { key: 'status', value: 'Negeri / Aktif', label: 'Status' },
    { key: 'akreditasi', value: 'A (Unggul)', label: 'Akreditasi' },
    { key: 'alamat', value: 'Jl. Serua Raya No. 1, Serua, Ciputat, Kota Tangerang Selatan, Banten 15414', label: 'Alamat' },
    { key: 'telepon', value: '(021) 7490001', label: 'Telepon' },
    { key: 'email', value: 'sdnserua3@dindiktangsel.go.id', label: 'Email' },
    { key: 'jam_operasional', value: 'Senin – Jumat: 07.00 – 15.00 WIB', label: 'Jam Operasional' },
    { key: 'kepala_sekolah', value: 'Dra. Sri Wahyuni, M.Pd.', label: 'Kepala Sekolah' },
    { key: 'jumlah_siswa', value: '420', label: 'Jumlah Siswa' },
    { key: 'jumlah_guru', value: '24', label: 'Jumlah Guru' },
    { key: 'jumlah_rombel', value: '12', label: 'Jumlah Rombel' },
  ]

  for (const info of infoSekolah) {
    await prisma.infoSekolah.upsert({
      where: { key: info.key },
      update: { value: info.value },
      create: info,
    })
  }

  // Seed Profil Sekolah
  const profilData = [
    {
      key: 'identitas',
      judul: 'Identitas Sekolah',
      konten: 'SD Negeri Serua 3 merupakan sekolah dasar negeri yang berada di bawah naungan Dinas Pendidikan Kota Tangerang Selatan dengan NPSN 20604893.',
    },
    {
      key: 'visi',
      judul: 'Visi & Misi',
      konten: 'Visi: Terwujudnya peserta didik yang beriman, berkarakter, berprestasi, dan berwawasan lingkungan. Misi: Menyelenggarakan pembelajaran aktif, kreatif, dan menyenangkan.',
    },
    {
      key: 'sejarah',
      judul: 'Sejarah Sekolah',
      konten: 'SD Negeri Serua 3 berdiri sejak tahun 1975 dan telah melayani masyarakat Ciputat selama lebih dari 4 dekade.',
    },
    {
      key: 'sambutan',
      judul: 'Sambutan Kepala Sekolah',
      konten: 'Kami percaya bahwa setiap anak membawa potensi yang luar biasa. Tugas kami adalah memastikan lingkungan belajar yang aman, menyenangkan, dan bermakna.',
    },
  ]

  for (const profil of profilData) {
    await prisma.profilSekolah.upsert({
      where: { key: profil.key },
      update: { konten: profil.konten },
      create: profil,
    })
  }

  // Seed Fasilitas
  const fasilitasData = [
    { nama: 'Ruang Kelas', deskripsi: '12 ruang ber-AC', icon: 'classroom', urutan: 1 },
    { nama: 'Lab Komputer', deskripsi: '30 unit PC', icon: 'computer', urutan: 2 },
    { nama: 'Perpustakaan', deskripsi: '2.500+ koleksi buku', icon: 'library', urutan: 3 },
    { nama: 'Lapangan Olahraga', deskripsi: 'Outdoor & indoor', icon: 'sport', urutan: 4 },
    { nama: 'Kantin Sehat', deskripsi: 'Bersertifikat dinas', icon: 'canteen', urutan: 5 },
  ]

  for (const fas of fasilitasData) {
    await prisma.fasilitas.upsert({
      where: { id: fas.urutan },
      update: {},
      create: fas,
    })
  }

  // Seed Berita
  await prisma.berita.upsert({
    where: { slug: 'ppdb-2025-2026' },
    update: {},
    create: {
      judul: 'Pendaftaran PPDB Tahun Ajaran 2025/2026 Resmi Dibuka',
      slug: 'ppdb-2025-2026',
      ringkasan: 'Pendaftaran Peserta Didik Baru untuk tahun ajaran 2025/2026 telah resmi dibuka.',
      konten: 'Pendaftaran PPDB tahun ajaran 2025/2026 resmi dibuka mulai tanggal 1 Juni 2025. Calon peserta didik dapat mendaftar secara online melalui website sekolah.',
      kategori: 'PENGUMUMAN',
      status: 'PUBLISHED',
      publishedAt: new Date(),
    },
  })

  await prisma.berita.upsert({
    where: { slug: 'juara-olimpiade-matematika-2025' },
    update: {},
    create: {
      judul: 'Siswa SDN Serua 3 Raih Juara 1 Olimpiade Matematika Tingkat Kota',
      slug: 'juara-olimpiade-matematika-2025',
      ringkasan: 'Kebanggaan bagi SDN Serua 3, siswa kelas 5 berhasil meraih juara 1 olimpiade matematika tingkat kota.',
      konten: 'Dengan bangga kami mengumumkan bahwa siswa kami berhasil meraih juara 1 olimpiade matematika tingkat kota Tangerang Selatan tahun 2025.',
      kategori: 'PRESTASI',
      status: 'PUBLISHED',
      publishedAt: new Date(),
    },
  })

  console.log('Seed selesai.')
}

main()
  .catch(console.error)
  .finally(() => prisma.$disconnect())
