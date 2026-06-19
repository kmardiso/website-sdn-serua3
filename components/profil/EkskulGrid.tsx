'use client'

const ekskulList = [
  { nama: 'Pramuka', icon: '⚜️', kategori: 'Wajib', jadwal: 'Rabu, 13.00 – 15.00', pembina: 'Bpk. Andi Surya', deskripsi: 'Membentuk karakter mandiri, disiplin, dan jiwa kepemimpinan melalui kegiatan kepanduan yang menyenangkan dan edukatif.', warna: '#C8A84B' },
  { nama: 'Futsal', icon: '⚽', kategori: 'Olahraga', jadwal: 'Senin & Kamis, 14.00 – 15.30', pembina: 'Bpk. Rudi Hartono', deskripsi: 'Mengembangkan kemampuan fisik, kerja sama tim, dan sportivitas melalui olahraga futsal yang kompetitif.', warna: '#1B2D6B' },
  { nama: 'Seni Tari', icon: '💃', kategori: 'Seni & Budaya', jadwal: 'Selasa, 13.00 – 14.30', pembina: 'Ibu Sari Dewi', deskripsi: 'Melestarikan budaya Indonesia dan mengembangkan bakat seni gerak siswa melalui tari tradisional dan modern.', warna: '#8b5cf6' },
  { nama: 'Paduan Suara', icon: '🎵', kategori: 'Seni & Budaya', jadwal: 'Jumat, 13.00 – 14.30', pembina: 'Ibu Tika Rahayu', deskripsi: 'Melatih kemampuan vokal dan harmonisasi suara untuk tampil dalam berbagai event sekolah dan lomba.', warna: '#ef4444' },
  { nama: 'Sains Club', icon: '🔬', kategori: 'Akademik', jadwal: 'Kamis, 13.00 – 14.30', pembina: 'Bpk. Hendra Wijaya', deskripsi: 'Menumbuhkan rasa ingin tahu dan kemampuan berpikir ilmiah melalui eksperimen dan kompetisi sains.', warna: '#10b981' },
  { nama: 'Melukis & Menggambar', icon: '🎨', kategori: 'Seni & Budaya', jadwal: 'Rabu, 13.00 – 14.30', pembina: 'Ibu Lestari', deskripsi: 'Mengembangkan kreativitas dan ekspresi seni visual siswa melalui berbagai teknik melukis dan menggambar.', warna: '#f59e0b' },
  { nama: 'Badminton', icon: '🏸', kategori: 'Olahraga', jadwal: 'Selasa & Jumat, 14.00 – 15.30', pembina: 'Bpk. Danu Pratama', deskripsi: 'Melatih kelincahan, kecepatan reaksi, dan stamina melalui olahraga bulutangkis yang digemari siswa.', warna: '#1B2D6B' },
  { nama: 'Komputer & Coding', icon: '💻', kategori: 'Akademik', jadwal: 'Senin, 13.00 – 14.30', pembina: 'Bpk. Rizky Fauzan', deskripsi: 'Memperkenalkan dasar-dasar teknologi informasi dan pemrograman sederhana kepada siswa sejak dini.', warna: '#6b7280' },
  { nama: 'Dokter Kecil (UKS)', icon: '🩺', kategori: 'Kesehatan', jadwal: 'Kamis, 13.00 – 14.00', pembina: 'Ibu Ningsih', deskripsi: 'Mendidik siswa menjadi kader kesehatan yang mampu membantu penanganan pertolongan pertama di lingkungan sekolah.', warna: '#ef4444' },
]

const kategoriWarna: Record<string, string> = {
  'Wajib': '#1B2D6B',
  'Olahraga': '#10b981',
  'Seni & Budaya': '#8b5cf6',
  'Akademik': '#C8A84B',
  'Kesehatan': '#ef4444',
}

export default function EkskulGrid() {
  return (
    <>
      <style>{`
        .ekskul-grid { display: grid; grid-template-columns: repeat(3, 1fr); gap: 1rem; }
        @media (max-width: 768px) { .ekskul-grid { grid-template-columns: 1fr; } }
        @media (min-width: 480px) and (max-width: 768px) { .ekskul-grid { grid-template-columns: repeat(2, 1fr); } }
      `}</style>
      <div className="ekskul-grid">
        {ekskulList.map((e, i) => (
        <div
          key={i}
          style={{
            background: '#f9fafb',
            borderRadius: 14,
            padding: '1.25rem',
            border: '1px solid #e5e7eb',
            transition: 'transform 0.2s, box-shadow 0.2s, border-color 0.2s',
          }}
          onMouseEnter={el => {
            el.currentTarget.style.transform = 'translateY(-3px)'
            el.currentTarget.style.boxShadow = '0 6px 20px rgba(0,0,0,0.08)'
            el.currentTarget.style.borderColor = '#1B2D6B'
          }}
          onMouseLeave={el => {
            el.currentTarget.style.transform = 'translateY(0)'
            el.currentTarget.style.boxShadow = 'none'
            el.currentTarget.style.borderColor = '#e5e7eb'
          }}
        >
          <div style={{ display: 'flex', alignItems: 'flex-start', justifyContent: 'space-between', marginBottom: 10 }}>
            <span style={{ fontSize: 32 }}>{e.icon}</span>
            <span style={{
              fontSize: 10, fontWeight: 600, padding: '3px 8px', borderRadius: 20,
              background: `${kategoriWarna[e.kategori]}18`,
              color: kategoriWarna[e.kategori],
            }}>
              {e.kategori}
            </span>
          </div>

          <div style={{ fontWeight: 700, fontSize: 14, color: '#1B2D6B', marginBottom: 6 }}>{e.nama}</div>
          <p style={{ fontSize: 12.5, color: '#6b7280', lineHeight: 1.6, marginBottom: 12 }}>{e.deskripsi}</p>

          <div style={{ display: 'flex', flexDirection: 'column', gap: 5, borderTop: '1px solid #e5e7eb', paddingTop: 10 }}>
            <div style={{ display: 'flex', gap: 6, alignItems: 'center', fontSize: 11.5, color: '#374151' }}>
              <span>🕐</span> {e.jadwal}
            </div>
            <div style={{ display: 'flex', gap: 6, alignItems: 'center', fontSize: 11.5, color: '#374151' }}>
              <span>👤</span> {e.pembina}
            </div>
          </div>
        </div>
      ))}
    </div>
    </>
)}