'use client'
import { useState } from 'react'
import Link from 'next/link'

const initialForm = {
  namaLengkap: '', tempatLahir: '', tanggalLahir: '', jenisKelamin: '',
  alamat: '', namaAyah: '', namaIbu: '', teleponOrtu: '', emailOrtu: '', asalSekolah: '',
}

export default function PPDBPage() {
  const [form, setForm] = useState(initialForm)
  const [status, setStatus] = useState<'idle' | 'loading' | 'success' | 'error'>('idle')
  const [result, setResult] = useState<any>(null)
  const [errMsg, setErrMsg] = useState('')

  const set = (key: string, val: string) => setForm(f => ({ ...f, [key]: val }))

  const handleSubmit = async () => {
    const required = ['namaLengkap', 'tempatLahir', 'tanggalLahir', 'jenisKelamin', 'alamat', 'namaAyah', 'namaIbu', 'teleponOrtu', 'emailOrtu']
    for (const k of required) {
      if (!form[k as keyof typeof form]) {
        setErrMsg('Semua field bertanda * wajib diisi')
        setStatus('error')
        return
      }
    }
    setStatus('loading')
    try {
      const res = await fetch('/api/ppdb', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(form),
      })
      const json = await res.json()
      if (json.success) {
        setStatus('success')
        setResult(json.data)
      } else {
        setStatus('error')
        setErrMsg(json.message || 'Pendaftaran gagal')
      }
    } catch {
      setStatus('error')
      setErrMsg('Terjadi kesalahan server')
    }
  }

  const inputStyle: React.CSSProperties = {
    width: '100%', padding: '10px 12px', fontSize: 13, border: '1px solid #e8e5de',
    borderRadius: 8, fontFamily: 'inherit', background: '#fff', color: '#1a2340',
  }
  const labelStyle: React.CSSProperties = { fontSize: 12, fontWeight: 600, color: '#4a4840', display: 'block', marginBottom: 6 }
  const fieldStyle: React.CSSProperties = { marginBottom: 14 }

  if (status === 'success' && result) {
    return (
      <div style={{ minHeight: '100vh', background: '#f8f7f4', display: 'flex', alignItems: 'center', justifyContent: 'center', padding: '2rem' }}>
        <div style={{ background: '#fff', borderRadius: 16, padding: '3rem', maxWidth: 480, width: '100%', textAlign: 'center', border: '1px solid #e8e5de' }}>
          <div style={{ fontSize: 48, marginBottom: 16 }}>✅</div>
          <h2 style={{ fontFamily: 'Playfair Display,serif', fontSize: '1.5rem', fontWeight: 700, marginBottom: 8, color: '#1a2340' }}>Pendaftaran Berhasil!</h2>
          <p style={{ color: '#6b6860', fontSize: 13.5, marginBottom: '1.5rem' }}>Simpan nomor pendaftaran Anda sebagai bukti registrasi.</p>
          <div style={{ background: '#eef2fc', borderRadius: 10, padding: '1rem 1.5rem', marginBottom: '1.5rem' }}>
            <div style={{ fontSize: 11, color: '#8a8880', marginBottom: 4 }}>Nomor Pendaftaran</div>
            <div style={{ fontSize: '1.5rem', fontWeight: 700, color: '#0d2660', fontFamily: 'monospace' }}>{result.nomorPendaftaran}</div>
          </div>
          <div style={{ textAlign: 'left', fontSize: 13, color: '#4a4840', lineHeight: 2 }}>
            <div>Nama: <strong>{result.namaLengkap}</strong></div>
            <div>Status: <strong style={{ color: '#7a5a0a' }}>Menunggu Verifikasi</strong></div>
          </div>
          <Link href="/" style={{ display: 'inline-block', marginTop: '1.5rem', background: '#0d2660', color: '#fff', padding: '10px 24px', borderRadius: 8, fontSize: 13, fontWeight: 600 }}>
            Kembali ke Beranda
          </Link>
        </div>
      </div>
    )
  }

  return (
    <>
      <nav style={{ background: '#0d2660', padding: '0 2rem', display: 'flex', alignItems: 'center', justifyContent: 'space-between', height: 64 }}>
        <Link href="/" style={{ display: 'flex', alignItems: 'center', gap: 12 }}>
          <div style={{ width: 40, height: 40, background: '#c8a84b', borderRadius: '50%', display: 'flex', alignItems: 'center', justifyContent: 'center', fontFamily: 'Playfair Display,serif', fontSize: 16, fontWeight: 700, color: '#0d2660' }}>SD</div>
          <div style={{ color: '#fff', fontWeight: 600, fontSize: 13 }}>SDN Serua 3</div>
        </Link>
        <Link href="/" style={{ color: 'rgba(255,255,255,0.75)', fontSize: 12.5, padding: '8px 12px' }}>← Kembali</Link>
      </nav>

      <section style={{ padding: '3rem 2rem', background: '#f8f7f4', minHeight: '90vh' }}>
        <div style={{ maxWidth: 700, margin: '0 auto' }}>
          <div style={{ fontFamily: 'Playfair Display,serif', fontSize: '2rem', fontWeight: 700, marginBottom: '0.5rem' }}>Pendaftaran Siswa Baru</div>
          <p style={{ color: '#6b6860', fontSize: 13.5, marginBottom: '2rem' }}>Penerimaan Peserta Didik Baru (PPDB) SD Negeri Serua 3. Isi formulir di bawah dengan data yang benar.</p>

          <div style={{ background: '#fff', borderRadius: 12, padding: '2rem', border: '1px solid #e8e5de' }}>
            <div style={{ fontWeight: 700, fontSize: 14, color: '#0d2660', marginBottom: '1.25rem', paddingBottom: '0.75rem', borderBottom: '1px solid #f0ede6' }}>Data Calon Siswa</div>
            <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '0 16px' }}>
              <div style={fieldStyle}>
                <label style={labelStyle}>Nama Lengkap *</label>
                <input style={inputStyle} value={form.namaLengkap} onChange={e => set('namaLengkap', e.target.value)} placeholder="Sesuai akta kelahiran" />
              </div>
              <div style={fieldStyle}>
                <label style={labelStyle}>Tempat Lahir *</label>
                <input style={inputStyle} value={form.tempatLahir} onChange={e => set('tempatLahir', e.target.value)} placeholder="Kota kelahiran" />
              </div>
              <div style={fieldStyle}>
                <label style={labelStyle}>Tanggal Lahir *</label>
                <input style={inputStyle} type="date" value={form.tanggalLahir} onChange={e => set('tanggalLahir', e.target.value)} />
              </div>
              <div style={fieldStyle}>
                <label style={labelStyle}>Jenis Kelamin *</label>
                <select style={inputStyle} value={form.jenisKelamin} onChange={e => set('jenisKelamin', e.target.value)}>
                  <option value="">Pilih jenis kelamin</option>
                  <option value="LAKI_LAKI">Laki-laki</option>
                  <option value="PEREMPUAN">Perempuan</option>
                </select>
              </div>
            </div>
            <div style={fieldStyle}>
              <label style={labelStyle}>Alamat Lengkap *</label>
              <textarea style={{ ...inputStyle, height: 80, resize: 'vertical' }} value={form.alamat} onChange={e => set('alamat', e.target.value)} placeholder="Jalan, RT/RW, Kelurahan, Kecamatan, Kota" />
            </div>
            <div style={fieldStyle}>
              <label style={labelStyle}>Asal Sekolah / TK (opsional)</label>
              <input style={inputStyle} value={form.asalSekolah} onChange={e => set('asalSekolah', e.target.value)} placeholder="Nama TK / PAUD yang dihadiri" />
            </div>

            <div style={{ fontWeight: 700, fontSize: 14, color: '#0d2660', margin: '1.5rem 0 1.25rem', paddingBottom: '0.75rem', borderBottom: '1px solid #f0ede6' }}>Data Orang Tua / Wali</div>
            <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '0 16px' }}>
              <div style={fieldStyle}>
                <label style={labelStyle}>Nama Ayah *</label>
                <input style={inputStyle} value={form.namaAyah} onChange={e => set('namaAyah', e.target.value)} />
              </div>
              <div style={fieldStyle}>
                <label style={labelStyle}>Nama Ibu *</label>
                <input style={inputStyle} value={form.namaIbu} onChange={e => set('namaIbu', e.target.value)} />
              </div>
              <div style={fieldStyle}>
                <label style={labelStyle}>No. Telepon Orang Tua *</label>
                <input style={inputStyle} value={form.teleponOrtu} onChange={e => set('teleponOrtu', e.target.value)} placeholder="08xx-xxxx-xxxx" />
              </div>
              <div style={fieldStyle}>
                <label style={labelStyle}>Email Orang Tua *</label>
                <input style={inputStyle} type="email" value={form.emailOrtu} onChange={e => set('emailOrtu', e.target.value)} placeholder="email@contoh.com" />
              </div>
            </div>

            {status === 'error' && (
              <div style={{ background: '#fef0f0', color: '#8c2a2a', fontSize: 13, padding: '10px 14px', borderRadius: 8, marginBottom: 14 }}>{errMsg}</div>
            )}

            <button
              onClick={handleSubmit}
              disabled={status === 'loading'}
              style={{ width: '100%', background: '#0d2660', color: '#fff', fontWeight: 600, fontSize: 14, padding: '12px', borderRadius: 8, border: 'none', cursor: 'pointer', marginTop: 8, opacity: status === 'loading' ? 0.7 : 1 }}
            >
              {status === 'loading' ? 'Memproses Pendaftaran...' : 'Daftar Sekarang'}
            </button>
            <p style={{ fontSize: 11.5, color: '#8a8880', textAlign: 'center', marginTop: 10 }}>
              Data yang dimasukkan akan diproses oleh panitia PPDB SD Negeri Serua 3
            </p>
          </div>
        </div>
      </section>
    </>
  )
}
