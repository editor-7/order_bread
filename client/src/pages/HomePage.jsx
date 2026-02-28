import { Link } from 'react-router-dom'
import { useAuth } from '@/contexts/AuthContext'
import ShopContent from '@/components/ShopContent'

function HomePage() {
  const { user, isLoggedIn, logout } = useAuth()

  if (isLoggedIn && user) {
    return <ShopContent user={user} onLogout={logout} />
  }

  return (
    <main style={{ padding: '2rem', textAlign: 'center' }}>
      <h1>오더브레드 제과점</h1>
      <p style={{ marginTop: '1rem', color: '#666' }}>로그인 후 빵을 주문할 수 있습니다.</p>
      <div style={{ display: 'flex', gap: '0.75rem', justifyContent: 'center', marginTop: '1.5rem', flexWrap: 'wrap' }}>
        <Link
          to="/login"
          style={{
            padding: '0.75rem 1.5rem',
            background: '#0d9488',
            color: '#fff',
            textDecoration: 'none',
            borderRadius: '8px',
            fontWeight: 600,
          }}
        >
          로그인
        </Link>
        <Link
          to="/signup"
          style={{
            padding: '0.75rem 1.5rem',
            background: '#1a1a1a',
            color: '#fff',
            textDecoration: 'none',
            borderRadius: '8px',
            fontWeight: 600,
          }}
        >
          회원가입
        </Link>
      </div>
    </main>
  )
}

export default HomePage
