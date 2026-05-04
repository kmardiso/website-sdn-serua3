'use client'
import { useState } from 'react'
import { useRouter } from 'next/navigation'

export default function AdminLoginPage() {
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [status, setStatus] = useState<'idle' | 'loading' | 'error'>('idle')
  const [errMsg, setErrMsg] = useState('')
  const router = useRouter()

  const handleLogin = async () => {
    if (!email || !password) { setErrMsg('Email dan password wajib diisi'); setStatus('error'); return }
    setStatus('loading')
    try {
      const res = await fetch('/api/auth/login', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ email, password }),
      })
      const json = await res.json()
      if (json.success) {
        router.push('/admin/dashboard')
        router.refresh()
      } else {
        setStatus('error')
        setErrMsg(json.message || 'Login gagal')
      }
    } catch {
      setStatus('error')
      setErrMsg('Terjadi kesalahan server')
    }
  }

  const inputStyle: React.CSSProperties = {
    width: '100%', padding: '11px 14px', fontSize: 14, border: '1px solid #e8e5de',
    borderRadius: 8, fontFamily: 'inherit', background: '#fff', color: '#1a2340', marginBottom: 12,
  }

  return (
    <div style={{ minHeight: '100vh', background: '#0d2660', display: 'flex', alignItems: 'center', justifyContent: 'center', padding: '2rem' }}>
      <div style={{ background: '#fff', borderRadius: 16, padding: '2.5rem', width: '100%', maxWidth: 400 }}>
        <div style={{ textAlign: 'center', marginBottom: '2rem' }}>
          <div style={{ width: 56, height: 56, background: '#c8a84b', borderRadius: '50%', display: 'flex', alignItems: 'center', justifyContent: 'center', margin: '0 auto 12px', fontFamily: 'Playfair Display,serif', fontSize: 22, fontWeight: 700, color: '#0d2660' }}>SD</div>
          <div style={{ fontFamily: 'Playfair Display,serif', fontSize: '1.25rem', fontWeight: 700, color: '#1a2340' }}>Panel Admin</div>
          <div style={{ color: '#8a8880', fontSize: 13, marginTop: 4 }}>SD Negeri Serua 3</div>
        </div>
        <input style={inputStyle} type="email" placeholder="Email admin" value={email} onChange={e => setEmail(e.target.value)} onKeyDown={e => e.key === 'Enter' && handleLogin()} />
        <input style={inputStyle} type="password" placeholder="Password" value={password} onChange={e => setPassword(e.target.value)} onKeyDown={e => e.key === 'Enter' && handleLogin()} />
        {status === 'error' && <div style={{ background: '#fef0f0', color: '#8c2a2a', fontSize: 12.5, padding: '8px 12px', borderRadius: 6, marginBottom: 12 }}>{errMsg}</div>}
        <button
          onClick={handleLogin}
          disabled={status === 'loading'}
          style={{ width: '100%', background: '#0d2660', color: '#fff', fontWeight: 600, fontSize: 14, padding: '12px', borderRadius: 8, border: 'none', cursor: 'pointer', opacity: status === 'loading' ? 0.7 : 1 }}
        >
          {status === 'loading' ? 'Masuk...' : 'Masuk'}
        </button>
      </div>
    </div>
  )
}
