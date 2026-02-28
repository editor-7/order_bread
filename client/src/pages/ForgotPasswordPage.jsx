import { useNavigate } from 'react-router-dom'

function ForgotPasswordPage() {
  const navigate = useNavigate()

  return (
    <div className="forgot-page">
      <div className="forgot-container">
        <button
          type="button"
          onClick={() => navigate(-1)}
          className="back-btn"
        >
          <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
            <path d="M19 12H5M12 19l-7-7 7-7" />
          </svg>
          뒤로가기
        </button>
        <h1>비밀번호 찾기</h1>
        <p>준비 중입니다.</p>
      </div>

      <style>{`
        .forgot-page {
          min-height: 100vh;
          display: flex;
          align-items: center;
          justify-content: center;
          padding: 2rem;
          background: linear-gradient(135deg, #faf8f5 0%, #f5ebe6 100%);
        }
        .forgot-container {
          text-align: center;
          background: #fff;
          padding: 2.5rem;
          border-radius: 16px;
          box-shadow: 0 4px 24px rgba(92, 74, 74, 0.08);
          border: 1px solid var(--color-border);
        }
        .back-btn {
          display: inline-flex;
          align-items: center;
          gap: 0.5rem;
          padding: 0.5rem 1rem;
          margin-bottom: 1.5rem;
          color: var(--color-soft-brown);
          font-size: 0.9rem;
          font-weight: 500;
          border: 1px solid var(--color-border);
          border-radius: 8px;
          background: #fff;
          cursor: pointer;
          transition: all 0.2s;
        }
        .back-btn:hover {
          border-color: var(--color-rose-gold);
          color: var(--color-rose-gold);
          background: var(--color-blush);
        }
        .forgot-container h1 {
          font-family: var(--font-heading);
          font-size: 1.5rem;
          color: var(--color-charcoal);
          margin-bottom: 1rem;
        }
        .forgot-container p {
          color: var(--color-muted);
        }
      `}</style>
    </div>
  )
}

export default ForgotPasswordPage
