'use client';

import { useRouter } from 'next/navigation';
import { ArrowLeft, Home } from 'lucide-react';

export default function NotFound() {
  const router = useRouter();

  return (
    <div style={{
      display: 'flex',
      flexDirection: 'column',
      alignItems: 'center',
      justifyContent: 'center',
      minHeight: '100vh',
      background: '#F7F2EA',
      color: '#2A1F1A',
      fontFamily: 'var(--font-nunito), Nunito, sans-serif',
      padding: '2rem',
      textAlign: 'center',
      gap: '1.5rem',
    }}>
      <h1 style={{ fontSize: '4rem', fontWeight: 800, color: '#7A2433', lineHeight: 1 }}>404</h1>
      <p style={{ fontSize: '1.2rem', maxWidth: 400, color: '#6F6259' }}>
        Oops! Looks like you wandered off the path. Let me help you get back.
      </p>
      <div style={{ display: 'flex', gap: '0.75rem', flexWrap: 'wrap', justifyContent: 'center' }}>
        <button
          onClick={() => router.back()}
          style={{
            display: 'inline-flex', alignItems: 'center', gap: '0.5rem',
            padding: '0.6rem 1.2rem', borderRadius: 999, border: '1.5px solid rgba(122,36,51,0.25)',
            background: 'transparent', color: '#7A2433', fontSize: '0.9rem', fontWeight: 600,
            cursor: 'pointer', fontFamily: 'inherit',
          }}
        >
          <ArrowLeft size={16} /> Go Back
        </button>
        <button
          onClick={() => router.push('/')}
          style={{
            display: 'inline-flex', alignItems: 'center', gap: '0.5rem',
            padding: '0.6rem 1.2rem', borderRadius: 999, border: 'none',
            background: '#7A2433', color: '#F7F2EA', fontSize: '0.9rem', fontWeight: 600,
            cursor: 'pointer', fontFamily: 'inherit',
          }}
        >
          <Home size={16} /> Back to Home
        </button>
      </div>
    </div>
  );
}
