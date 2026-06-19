'use client'

import Navbar from '@/components/layout/Navbar'
import Footer from '@/components/layout/Footer'
import Link from 'next/link'
import { useState } from 'react'

// Data kalender akademik per semester
const kalenderData: Record<string, { tanggal: string; kegiatan: string; warna: string; bulan: number }[]> = {
  'Semester 1': [
    { tanggal: '15 Jul', kegiatan: 'Hari Pertama Masuk Sekolah', warna: '#1B2D6B', bulan: 7 },
    { tanggal: '17 Agu', kegiatan: 'HUT Kemerdekaan RI', warna: '#ef4444', bulan: 8 },
    { tanggal: '2 Sep', kegiatan: 'Rapat Komite Sekolah', warna: '#C8A84B', bulan: 9 },
    { tanggal: '14 Okt', kegiatan: 'Penilaian Tengah Semester 1', warna: '#8b5cf6', bulan: 10 },
    { tanggal: '25 Nov', kegiatan: 'Hari Guru Nasional', warna: '#10b981', bulan: 11 },
    { tanggal: '9 Des', kegiatan: 'Penilaian Akhir Semester 1', warna: '#f59e0b', bulan: 12 },
    { tanggal: '20 Des', kegiatan: 'Pembagian Rapor Semester 1', warna: '#1B2D6B', bulan: 12 },
    { tanggal: '23 Des', kegiatan: 'Libur Semester 1', warna: '#6b7280', bulan: 12 },
  ],
  'Semester 2': [
    { tanggal: '6 Jan', kegiatan: 'Hari Pertama Semester 2', warna: '#1B2D6B', bulan: 1 },
    { tanggal: '4 Feb', kegiatan: 'Isra Miraj Nabi Muhammad', warna: '#10b981', bulan: 2 },
    { tanggal: '10 Mar', kegiatan: 'Penilaian Tengah Semester 2', warna: '#8b5cf6', bulan: 3 },
    { tanggal: '18 Apr', kegiatan: 'Ujian Akhir Kelas 6', warna: '#ef4444', bulan: 4 },
    { tanggal: '2 Mei', kegiatan: 'Hari Pendidikan Nasional', warna: '#C8A84B', bulan: 5 },
    { tanggal: '2 Jun', kegiatan: 'Penilaian Akhir Semester 2', warna: '#f59e0b', bulan: 6 },
    { tanggal: '20 Jun', kegiatan: 'Pembagian Rapor Semester 2', warna: '#1B2D6B', bulan: 6 },
    { tanggal: '24 Jun', kegiatan: 'Libur Kenaikan Kelas', warna: '#6b7280', bulan: 6 },
  ],
  'Hari Normal': [
    { tanggal: 'Senin', kegiatan: 'Upacara Bendera', warna: '#1B2D6B', bulan: 0 },
    { tanggal: 'Selasa', kegiatan: 'Kegiatan Literasi Pagi', warna: '#C8A84B', bulan: 0 },
    { tanggal: 'Rabu', kegiatan: 'Ekstrakurikuler Pramuka', warna: '#10b981', bulan: 0 },
    { tanggal: 'Kamis', kegiatan: 'Bimbingan Konseling', warna: '#8b5cf6', bulan: 0 },
    { tanggal: 'Jumat', kegiatan: 'Senam Pagi Bersama', warna: '#f59e0b', bulan: 0 },
  ],
}

const BULAN = ['Januari', 'Februari', 'Maret', 'April', 'Mei', 'Juni', 'Juli', 'Agustus', 'September', 'Oktober', 'November', 'Desember']
const HARI = ['Min', 'Sen', 'Sel', 'Rab', 'Kam', 'Jum', 'Sab']

// Tanggal merah nasional (bulan 0-indexed)
const HARI_MERAH: Record<string, number[]> = {
  '0': [1], '1': [], '2': [29], '3': [], '4': [1], '5': [],
  '6': [], '7': [17], '8': [], '9': [], '10': [], '11': [25],
}

export default function AkademikPage() {
  const now = new Date()
  const [currentMonth, setCurrentMonth] = useState(now.getMonth())
  const [currentYear, setCurrentYear] = useState(now.getFullYear())
  const [selectedSemester, setSelectedSemester] = useState('Semester 1')
  const [selectedDay, setSelectedDay] = useState<number | null>(now.getDate())

  const prevMonth = () => {
    if (currentMonth === 0) { setCurrentMonth(11); setCurrentYear(y => y - 1) }
    else setCurrentMonth(m => m - 1)
    setSelectedDay(null)
  }

  const nextMonth = () => {
    if (currentMonth === 11) { setCurrentMonth(0); setCurrentYear(y => y + 1) }
    else setCurrentMonth(m => m + 1)
    setSelectedDay(null)
  }

  // Hitung hari pertama bulan ini jatuh di hari apa
  const firstDay = new Date(currentYear, currentMonth, 1).getDay()
  const daysInMonth = new Date(currentYear, currentMonth + 1, 0).getDate()

  // Event di bulan ini berdasarkan semester yang dipilih
  const eventsBulanIni = kalenderData[selectedSemester].filter(e => {
    if (selectedSemester === 'Hari Normal') return true
    return e.bulan === currentMonth + 1
  })

  // Event di tanggal yang dipilih
  const selectedEvents = selectedDay
    ? kalenderData[selectedSemester].filter(e => {
        const dayNum = parseInt(e.tanggal.split(' ')[0])
        return dayNum === selectedDay && (selectedSemester === 'Hari Normal' || e.bulan === currentMonth + 1)
      })
    : []

  // Tanggal yang punya event
  const eventDays = new Set(
    kalenderData[selectedSemester]
      .filter(e => selectedSemester === 'Hari Normal' || e.bulan === currentMonth + 1)
      .map(e => parseInt(e.tanggal.split(' ')[0]))
      .filter(n => !isNaN(n))
  )

  const hariMerahBulan = HARI_MERAH[String(currentMonth)] || []
  const isToday = (day: number) =>
    day === now.getDate() && currentMonth === now.getMonth() && currentYear === now.getFullYear()

  return (
    <>
      <Navbar />

      {/* HERO */}
      <section style={{ background: 'linear-gradient(135deg, #1B2D6B, #2a4090)', padding: '3rem 1.5rem', overflow: 'hidden' }}>
        <div style={{ maxWidth: 1100, margin: '0 auto', display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '3rem', alignItems: 'center' }}>
          <div>
            <div style={{ fontSize: 12, color: 'rgba(255,255,255,0.6)', marginBottom: 8 }}>Beranda &rsaquo; Akademik</div>
            <div style={{ display: 'inline-block', background: 'rgba(200,168,75,0.2)', color: '#C8A84B', fontSize: 12, fontWeight: 600, padding: '5px 14px', borderRadius: 20, marginBottom: 16 }}>
              Kurikulum Merdeka
            </div>
            <h1 style={{ fontWeight: 800, fontSize: '2.2rem', color: '#fff', lineHeight: 1.2, marginBottom: 16 }}>
              Membentuk Generasi<br />
              <span style={{ color: '#C8A84B' }}>Berkarakter</span> dengan<br />
              Kurikulum Merdeka
            </h1>
            <p style={{ color: 'rgba(255,255,255,0.75)', fontSize: 14, lineHeight: 1.8, marginBottom: 24 }}>
              Kami menerapkan kurikulum inovatif yang berpusat pada pengembangan karakter, kreativitas, dan kompetensi siswa.
            </p>
            <div style={{ display: 'flex', gap: 12 }}>
              <Link href="/kontak" style={{ background: '#C8A84B', color: '#1B2D6B', fontWeight: 700, fontSize: 14, padding: '12px 24px', borderRadius: 10, textDecoration: 'none' }}>Daftar Sekarang</Link>
              <Link href="/profil" style={{ background: 'rgba(255,255,255,0.1)', color: '#fff', fontWeight: 600, fontSize: 14, padding: '12px 24px', borderRadius: 10, border: '1px solid rgba(255,255,255,0.2)', textDecoration: 'none' }}>Pelajari Lebih Lanjut</Link>
            </div>
          </div>
          <div style={{ background: 'rgba(255,255,255,0.1)', borderRadius: 16, overflow: 'hidden', border: '1px solid rgba(255,255,255,0.2)' }}>
            <img src="https://images.unsplash.com/photo-1503676260728-1c00da094a0b?w=600&q=80" alt="Akademik" style={{ width: '100%', height: 280, objectFit: 'cover' }} />
          </div>
        </div>
      </section>

      {/* PILAR KURIKULUM */}
      <section style={{ padding: '4rem 1.5rem', background: '#fff' }}>
        <div style={{ maxWidth: 1100, margin: '0 auto' }}>
          <div style={{ textAlign: 'center', marginBottom: '3rem' }}>
            <div style={{ fontSize: 12, fontWeight: 600, color: '#C8A84B', letterSpacing: '0.08em', textTransform: 'uppercase', marginBottom: 8 }}>PENDEKATAN PEMBELAJARAN</div>
            <h2 style={{ fontWeight: 800, fontSize: '2rem', color: '#1B2D6B', marginBottom: 12 }}>Pilar Kurikulum Merdeka</h2>
            <p style={{ color: '#6b7280', fontSize: 14, maxWidth: 500, margin: '0 auto' }}>Tiga pilar utama yang menjadi fondasi pembelajaran di SD Negeri Serua 3.</p>
          </div>
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: '1.5rem' }}>
            {[
              { icon: '🎯', title: 'Pembelajaran Berdiferensiasi', desc: 'Setiap siswa mendapatkan pendekatan belajar yang disesuaikan dengan kebutuhan, bakat, dan minat mereka.' },
              { icon: '🤝', title: 'Projek Profil Pancasila', desc: 'Pengembangan karakter melalui projek nyata yang mencerminkan nilai-nilai Pancasila dalam kehidupan sehari-hari.' },
              { icon: '💡', title: 'Asesmen Autentik', desc: 'Asesmen yang berfokus pada pertumbuhan dan perkembangan siswa, bukan hanya hasil akhir semata.' },
            ].map((p, i) => (
              <div key={i} style={{ background: '#f9fafb', borderRadius: 16, padding: '2rem', textAlign: 'center' }}>
                <div style={{ fontSize: 40, marginBottom: 16 }}>{p.icon}</div>
                <h3 style={{ fontWeight: 700, fontSize: 15, color: '#1B2D6B', marginBottom: 10 }}>{p.title}</h3>
                <p style={{ fontSize: 13.5, color: '#6b7280', lineHeight: 1.7 }}>{p.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* KALENDER AKADEMIK - INTERAKTIF */}
      <section style={{ padding: '4rem 1.5rem', background: '#f9fafb' }}>
        <div style={{ maxWidth: 1100, margin: '0 auto' }}>
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '2rem', flexWrap: 'wrap', gap: 12 }}>
            <div>
              <div style={{ fontSize: 12, fontWeight: 600, color: '#C8A84B', letterSpacing: '0.08em', textTransform: 'uppercase', marginBottom: 8 }}>JADWAL KEGIATAN</div>
              <h2 style={{ fontWeight: 800, fontSize: '1.75rem', color: '#1B2D6B' }}>Kalender Akademik 2026/2027</h2>
            </div>
            <div style={{ display: 'flex', gap: 8 }}>
              {['Semester 1', 'Semester 2', 'Hari Normal'].map(t => (
                <button
                  key={t}
                  onClick={() => { setSelectedSemester(t); setSelectedDay(null) }}
                  style={{
                    padding: '8px 16px', borderRadius: 8, fontSize: 13, cursor: 'pointer',
                    fontWeight: selectedSemester === t ? 700 : 400,
                    border: selectedSemester === t ? '2px solid #1B2D6B' : '1px solid #e5e7eb',
                    background: selectedSemester === t ? '#1B2D6B' : '#fff',
                    color: selectedSemester === t ? '#fff' : '#374151',
                    transition: 'all 0.2s',
                  }}
                >
                  {t}
                </button>
              ))}
            </div>
          </div>

          <div style={{ display: 'grid', gridTemplateColumns: '1fr 300px', gap: '2rem' }}>
            {/* KALENDER */}
            <div style={{ background: '#fff', borderRadius: 16, padding: '1.5rem', border: '1px solid #e5e7eb' }}>
              {/* Header navigasi bulan */}
              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: 20 }}>
                <button
                  onClick={prevMonth}
                  style={{ background: '#f3f4f6', border: 'none', fontSize: 18, cursor: 'pointer', color: '#374151', width: 36, height: 36, borderRadius: 8, display: 'flex', alignItems: 'center', justifyContent: 'center' }}
                >
                  ←
                </button>
                <div style={{ fontWeight: 700, fontSize: 16, color: '#1B2D6B' }}>
                  {BULAN[currentMonth]} {currentYear}
                </div>
                <button
                  onClick={nextMonth}
                  style={{ background: '#f3f4f6', border: 'none', fontSize: 18, cursor: 'pointer', color: '#374151', width: 36, height: 36, borderRadius: 8, display: 'flex', alignItems: 'center', justifyContent: 'center' }}
                >
                  →
                </button>
              </div>

              {/* Grid hari */}
              <div style={{ display: 'grid', gridTemplateColumns: 'repeat(7, 1fr)', gap: 4, textAlign: 'center' }}>
                {HARI.map(d => (
                  <div key={d} style={{ fontSize: 12, fontWeight: 600, color: '#9ca3af', padding: '8px 0' }}>{d}</div>
                ))}

                {/* Kosong sebelum hari pertama */}
                {Array.from({ length: firstDay }).map((_, i) => (
                  <div key={`empty-${i}`} />
                ))}

                {/* Hari-hari */}
                {Array.from({ length: daysInMonth }).map((_, i) => {
                  const day = i + 1
                  const isSelected = day === selectedDay
                  const hasEvent = eventDays.has(day)
                  const isMerah = hariMerahBulan.includes(day)
                  const isTodayDay = isToday(day)
                  const isSunday = (firstDay + i) % 7 === 0

                  return (
                    <div
                      key={day}
                      onClick={() => setSelectedDay(day === selectedDay ? null : day)}
                      style={{
                        padding: '8px 0',
                        fontSize: 13,
                        borderRadius: 8,
                        background: isSelected ? '#1B2D6B' : isTodayDay ? '#eef2fc' : 'transparent',
                        color: isSelected ? '#fff' : isMerah || isSunday ? '#ef4444' : '#374151',
                        cursor: 'pointer',
                        fontWeight: isSelected || isTodayDay ? 700 : 400,
                        position: 'relative',
                        border: isTodayDay && !isSelected ? '2px solid #1B2D6B' : '2px solid transparent',
                        transition: 'all 0.15s',
                      }}
                    >
                      {day}
                      {hasEvent && !isSelected && (
                        <span style={{
                          position: 'absolute', bottom: 2, left: '50%',
                          transform: 'translateX(-50%)',
                          width: 4, height: 4, borderRadius: '50%',
                          background: '#C8A84B', display: 'block',
                        }} />
                      )}
                    </div>
                  )
                })}
              </div>

              {/* Detail hari yang dipilih */}
              {selectedDay && selectedEvents.length > 0 && (
                <div style={{ marginTop: 16, padding: '12px 14px', background: '#f9fafb', borderRadius: 10, borderLeft: '3px solid #1B2D6B' }}>
                  <div style={{ fontSize: 12, fontWeight: 600, color: '#6b7280', marginBottom: 8 }}>
                    Kegiatan {selectedDay} {BULAN[currentMonth]}:
                  </div>
                  {selectedEvents.map((e, i) => (
                    <div key={i} style={{ fontSize: 13.5, color: '#1B2D6B', fontWeight: 600 }}>{e.kegiatan}</div>
                  ))}
                </div>
              )}
            </div>

            {/* AGENDA */}
            <div style={{ display: 'flex', flexDirection: 'column', gap: '1rem' }}>
              <div style={{ fontSize: 13, fontWeight: 600, color: '#374151', marginBottom: 4 }}>
                {selectedSemester === 'Hari Normal' ? 'Jadwal Rutin' : `Agenda ${BULAN[currentMonth]}`}
              </div>
              {eventsBulanIni.length > 0 ? eventsBulanIni.map((a, i) => (
                <div
                  key={i}
                  style={{
                    background: '#fff', borderRadius: 10, padding: '12px 14px',
                    border: '1px solid #e5e7eb', display: 'flex', gap: 12, alignItems: 'center',
                    cursor: 'pointer',
                    transition: 'border-color 0.2s',
                  }}
                  onMouseEnter={e => (e.currentTarget.style.borderColor = '#1B2D6B')}
                  onMouseLeave={e => (e.currentTarget.style.borderColor = '#e5e7eb')}
                >
                  <div style={{
                    width: 44, height: 44, background: a.warna, borderRadius: 10,
                    display: 'flex', alignItems: 'center', justifyContent: 'center',
                    fontSize: 11, fontWeight: 700, color: '#fff', flexShrink: 0,
                    textAlign: 'center', lineHeight: 1.3,
                  }}>
                    {a.tanggal.split(' ')[0]}<br />{a.tanggal.split(' ')[1] || ''}
                  </div>
                  <div style={{ fontSize: 13.5, fontWeight: 500, color: '#374151' }}>{a.kegiatan}</div>
                </div>
              )) : (
                <div style={{ color: '#9ca3af', fontSize: 13, textAlign: 'center', padding: '2rem 0' }}>
                  Tidak ada kegiatan di bulan ini
                </div>
              )}
            </div>
          </div>
        </div>
      </section>

      {/* METODE PEMBELAJARAN */}
      <section style={{ padding: '4rem 1.5rem', background: '#fff' }}>
        <div style={{ maxWidth: 1100, margin: '0 auto' }}>
          <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '3rem', alignItems: 'center' }}>
            <div>
              <div style={{ fontSize: 12, fontWeight: 600, color: '#C8A84B', letterSpacing: '0.08em', textTransform: 'uppercase', marginBottom: 8 }}>INOVASI PEDAGOGIS</div>
              <h2 style={{ fontWeight: 800, fontSize: '1.75rem', color: '#1B2D6B', marginBottom: 16, lineHeight: 1.3 }}>
                Mendukung Pembelajaran yang Efektif dan Menyenangkan
              </h2>
              <div style={{ display: 'flex', flexDirection: 'column', gap: '1rem' }}>
                {[
                  { icon: '🎮', title: 'Gamifikasi Pembelajaran', desc: 'Mengintegrasikan elemen permainan dalam proses belajar untuk meningkatkan motivasi.' },
                  { icon: '📱', title: 'Pembelajaran Digital', desc: 'Memanfaatkan teknologi modern untuk memperkaya pengalaman belajar siswa.' },
                  { icon: '🌿', title: 'Outdoor Learning', desc: 'Pembelajaran di luar kelas untuk mendekatkan siswa dengan lingkungan nyata.' },
                ].map((m, i) => (
                  <div key={i} style={{ display: 'flex', gap: 14, padding: '1rem', background: '#f9fafb', borderRadius: 12 }}>
                    <span style={{ fontSize: 24 }}>{m.icon}</span>
                    <div>
                      <div style={{ fontWeight: 700, fontSize: 14, color: '#1B2D6B', marginBottom: 4 }}>{m.title}</div>
                      <div style={{ fontSize: 13, color: '#6b7280' }}>{m.desc}</div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
            <div style={{ borderRadius: 16, overflow: 'hidden', boxShadow: '0 10px 30px rgba(0,0,0,0.1)' }}>
              <img src="https://images.unsplash.com/photo-1509062522246-3755977927d7?w=600&q=80" alt="Pembelajaran" style={{ width: '100%', height: 380, objectFit: 'cover' }} />
            </div>
          </div>
        </div>
      </section>

      {/* CTA */}
      <section style={{ background: 'linear-gradient(135deg, #1B2D6B, #2a4090)', padding: '4rem 1.5rem', textAlign: 'center' }}>
        <div style={{ maxWidth: 600, margin: '0 auto' }}>
          <h2 style={{ fontWeight: 800, fontSize: '1.75rem', color: '#fff', marginBottom: 16 }}>Siap Menjadi Bagian dari Keluarga SD Negeri Serua 3?</h2>
          <p style={{ color: 'rgba(255,255,255,0.75)', fontSize: 14, marginBottom: 28 }}>Bergabunglah bersama ribuan siswa berprestasi yang telah merasakan kualitas pendidikan terbaik.</p>
          <div style={{ display: 'flex', gap: 12, justifyContent: 'center' }}>
            <Link href="/kontak" style={{ background: '#C8A84B', color: '#1B2D6B', fontWeight: 700, fontSize: 14, padding: '13px 28px', borderRadius: 10, textDecoration: 'none' }}>Gabung Sekarang</Link>
            <Link href="/profil" style={{ background: 'rgba(255,255,255,0.1)', color: '#fff', fontWeight: 600, fontSize: 14, padding: '13px 28px', borderRadius: 10, border: '1px solid rgba(255,255,255,0.2)', textDecoration: 'none' }}>Pelajari Lebih Lanjut</Link>
          </div>
        </div>
      </section>

      <Footer />
    </>
  )
}