"use client";

import React from 'react';

export default function ProfilSidebar() {
  const sidebarMenu = [
    { id: 'identitas', label: 'Identitas Sekolah', icon: '🏫' },
    { id: 'visi', label: 'Visi & Misi', icon: '🎯' },
    { id: 'struktur', label: 'Struktur Organisasi', icon: '📊' },
    { id: 'guru', label: 'Staf Pengajar', icon: '👨‍🏫' },
    { id: 'tendik', label: 'Staf Tenaga Kependidikan', icon: '👥' },
    { id: 'ekskul', label: 'Ekstrakurikuler', icon: '⚜️' },
  ];

  return (
    <aside style={{ position: 'sticky', top: 88, background: '#fff', borderRadius: 16, border: '1px solid #e5e7eb', overflow: 'hidden' }}>
      <div style={{ padding: '1rem 1.25rem', borderBottom: '1px solid #f3f4f6', fontSize: 12, fontWeight: 600, color: '#6b7280', letterSpacing: '0.06em', textTransform: 'uppercase' }}>
        Menu Profil
      </div>
      {sidebarMenu.map(item => (
        <a
          key={item.id}
          href={`#${item.id}`}
          style={{ display: 'flex', alignItems: 'center', gap: 10, padding: '12px 1.25rem', fontSize: 13.5, color: '#374151', borderBottom: '1px solid #f9fafb', textDecoration: 'none' }}
          onMouseEnter={e => { e.currentTarget.style.background = '#f9fafb'; e.currentTarget.style.color = '#1B2D6B' }}
          onMouseLeave={e => { e.currentTarget.style.background = '#fff'; e.currentTarget.style.color = '#374151' }}
        >
          <span>{item.icon}</span>
          {item.label}
        </a>
      ))}
    </aside>
  );
}