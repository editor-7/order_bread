function ShopFooter() {
  return (
    <>
      <footer className="shop-footer">
        <div className="footer-inner">
          <div className="footer-col">
            <p className="footer-tel"><strong>TEL.</strong> 1577-0000</p>
            <p className="footer-time">월~금 오전 10시 ~ 오후 6시 · 토/일 공휴일 휴무</p>
          </div>
          <div className="footer-col">
            <h4>ABOUT</h4>
            <a href="#">브랜드 소개</a>
            <a href="#">이용약관</a>
            <a href="#">개인정보처리방침</a>
          </div>
          <div className="footer-col">
            <h4>SHOP</h4>
            <a href="#">장바구니</a>
            <a href="#">찜 목록</a>
            <a href="#">주문조회</a>
            <a href="#">마이페이지</a>
          </div>
          <div className="footer-col">
            <h4>BANK</h4>
            <p>하나은행 (주)Mrs. Park Kambanew</p>
            <p>589-910014-42404</p>
          </div>
          <div className="footer-bottom">
            <p className="footer-brand">✦ Mrs. Park Kambanew</p>
            <p className="footer-copy">마음을 담은 빵 · © All rights reserved.</p>
          </div>
        </div>
      </footer>

      <style>{`
        .shop-footer {
          background: linear-gradient(180deg, #f5ebe6 0%, #efe4de 100%);
          color: var(--color-charcoal);
          padding: 2.5rem 2rem;
          margin-top: auto;
          border-top: 1px solid var(--color-border);
        }
        .footer-inner {
          max-width: 1200px;
          margin: 0 auto;
          padding: 0 1rem;
        }
        .footer-col {
          display: inline-block;
          vertical-align: top;
          margin-right: 2.5rem;
          margin-bottom: 1.5rem;
        }
        .footer-col h4 {
          font-family: var(--font-heading);
          font-size: 0.9rem;
          font-weight: 600;
          margin: 0 0 0.75rem;
          color: var(--color-charcoal);
          letter-spacing: 0.05em;
        }
        .footer-col p, .footer-col a {
          font-size: 0.9rem;
          color: var(--color-soft-brown);
          margin: 0.25rem 0;
          text-decoration: none;
          display: block;
          transition: color 0.2s;
        }
        .footer-col a:hover { color: var(--color-rose-gold); }
        .footer-tel { font-weight: 500; }
        .footer-time { font-size: 0.85rem; color: var(--color-muted); }
        .footer-bottom {
          margin-top: 2rem;
          padding-top: 1.5rem;
          border-top: 1px solid var(--color-border);
          text-align: center;
        }
        .footer-brand {
          font-family: var(--font-heading);
          font-size: 1rem;
          font-weight: 600;
          color: var(--color-rose-gold);
          margin-bottom: 0.25rem;
        }
        .footer-copy {
          font-size: 0.8rem;
          color: var(--color-muted);
        }
        @media (max-width: 768px) {
          .shop-footer { padding: 1.5rem 1rem; }
          .footer-col {
            display: block;
            margin-right: 0;
            margin-bottom: 1rem;
          }
          .footer-inner { display: flex; flex-direction: column; gap: 0.5rem; }
        }
        @media (max-width: 480px) {
          .shop-footer { padding: 1.25rem 1rem; }
          .footer-bottom { margin-top: 1.5rem; padding-top: 1rem; }
          .footer-brand { font-size: 0.95rem; }
          .footer-copy { font-size: 0.75rem; }
        }
      `}</style>
    </>
  )
}

export default ShopFooter
