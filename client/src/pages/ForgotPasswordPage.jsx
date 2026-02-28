import { useNavigate } from 'react-router-dom'

function ForgotPasswordPage() {
  const navigate = useNavigate()

  return (
    <div style={{ minHeight: '100vh', display: 'flex', alignItems: 'center', justifyContent: 'center', padding: '2rem' }}>
      <div style={{ textAlign: 'center' }}>
        <button
          type="button"
          onClick={() => navigate(-1)}
          style={{
            display: 'inline-flex',
            alignItems: 'center',
            gap: '0.5rem',
            padding: '0.5rem 1rem',
            marginBottom: '1.5rem',
            color: '#374151',
            fontSize: '0.9rem',
            fontWeight: 500,
            border: '1px solid #d1d5db',
            borderRadius: '8px',
            background: '#fff',
            cursor: 'pointer',
          }}
        >
          <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
            <path d="M19 12H5M12 19l-7-7 7-7" />
          </svg>
          뒤로가기
        </button>
        <h1 style={{ color: '#0d9488', marginBottom: '1rem' }}>비밀번호 찾기</h1>
        <p style={{ color: '#666', marginBottom: '1.5rem' }}>준비 중입니다.</p>
      </div>
    </div>
  )
}

export default ForgotPasswordPage
