function ShopFooter() {
  return (
    <>
      <footer className="shop-footer">
        <div className="footer-inner">
          <div className="footer-col">
            <p><strong>TEL.</strong> 1577-0000</p>
            <p>월~금 오전10~오후6, 토/일 공휴일 휴무</p>
          </div>
          <div className="footer-col">
            <h4>ABOUT US</h4>
            <a href="#">회사소개</a>
            <a href="#">이용약관</a>
            <a href="#">개인정보취급방침</a>
          </div>
          <div className="footer-col">
            <h4>ACCOUNT</h4>
            <a href="#">장바구니</a>
            <a href="#">위시리스트</a>
            <a href="#">주문조회</a>
            <a href="#">마이페이지</a>
          </div>
          <div className="footer-col">
            <h4>BANK INFO</h4>
            <p>하나은행 (주)오더브레드</p>
            <p>589-910014-42404</p>
          </div>
          <div className="footer-bottom">
            <p>© 오더브레드 제과점. All rights reserved.</p>
          </div>
        </div>
      </footer>

      <style>{`
        .shop-footer {
          background: #333;
          color: #fff;
          padding: 2rem 1.5rem;
          margin-top: auto;
        }
        .footer-inner { width: 100%; margin: 0 auto; padding: 0 1rem; }
        .footer-col {
          display: inline-block;
          vertical-align: top;
          margin-right: 2rem;
          margin-bottom: 1rem;
        }
        .footer-col h4 { font-size: 0.9rem; margin: 0 0 0.5rem; }
        .footer-col p, .footer-col a {
          font-size: 0.85rem;
          color: rgba(255,255,255,0.8);
          margin: 0.2rem 0;
          text-decoration: none;
          display: block;
        }
        .footer-col a:hover { text-decoration: underline; }
        .footer-bottom { margin-top: 1.5rem; padding-top: 1rem; border-top: 1px solid #555; font-size: 0.8rem; color: #999; }
      `}</style>
    </>
  )
}

export default ShopFooter
