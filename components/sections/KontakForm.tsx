'use client'
import { useState } from 'react'

export default function KontakForm() {
  const [form, setForm] = useState({ nama: '', email: '', telepon: '', pesan: '' })
  const [status, setStatus] = useState<'idle' | 'loading' | 'success' | 'error'>('idle')
  const [msg, setMsg] = useState('')

  const handleSubmit = async () => {
    if (!form.nama || !form.email || !form.pesan) {
      setMsg('Nama, email, dan pesan wajib diisi')
      setStatus('error')
      return
    }
    setStatus('loading')
    try {
      const res = await fetch('/api/kontak', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(form),
      })
      const json = await res.json()
      if (json.success) {
        setStatus('success')
        setMsg('Pesan berhasil dikirim! Kami akan segera menghubungi Anda.')
        setForm({ nama: '', email: '', telepon: '', pesan: '' })
      } else {
        setStatus('error')
        setMsg(json.message || 'Gagal mengirim pesan')
      }
    } catch {
      setStatus('error')
      setMsg('Terjadi kesalahan. Coba lagi.')
    }
  }

  const inputStyle: React.CSSProperties = {
    width: '100%', padding: '10px 12px', fontSize: 13, border: '1px solid #e8e5de',
    borderRadius: 8, outline: 'none', fontFamily: 'inherit', background: '#fff',
    color: '#1a2340', marginBottom: 10,
  }

  return (
    <div>
      <input style={inputStyle} placeholder="Nama lengkap" value={form.nama} onChange={e => setForm({ ...form, nama: e.target.value })} />
      <input style={inputStyle} type="email" placeholder="Alamat email" value={form.email} onChange={e => setForm({ ...form, email: e.target.value })} />
      <input style={inputStyle} placeholder="Nomor telepon (opsional)" value={form.telepon} onChange={e => setForm({ ...form, telepon: e.target.value })} />
      <textarea style={{ ...inputStyle, height: 100, resize: 'vertical' }} placeholder="Pesan Anda..." value={form.pesan} onChange={e => setForm({ ...form, pesan: e.target.value })} />
      {msg && (
        <div style={{ fontSize: 12.5, padding: '8px 12px', borderRadius: 6, marginBottom: 10, background: status === 'success' ? '#edfaf4' : '#fef0f0', color: status === 'success' ? '#0a6e4f' : '#8c2a2a' }}>
          {msg}
        </div>
      )}
      <button
        onClick={handleSubmit}
        disabled={status === 'loading'}
        style={{ background: '#0d2660', color: '#fff', fontWeight: 600, fontSize: 13, padding: '10px 22px', borderRadius: 6, border: 'none', cursor: 'pointer', width: '100%', opacity: status === 'loading' ? 0.7 : 1 }}
      >
        {status === 'loading' ? 'Mengirim...' : 'Kirim Pesan'}
      </button>
    </div>
  )
}
