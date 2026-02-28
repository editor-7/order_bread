import { Link } from 'react-router-dom'

function ShopNavbar({ user, onLogout, cartCount = 0 }) {
  return (
    <>
      <header className="shop-header">
        <div className="shop-header-inner">
          <h1>오더브레드 제과점</h1>
          <div className="shop-header-right">
            <button type="button" className="header-cart-btn">
              🛒 장바구니 {cartCount > 0 && <span className="cart-count">({cartCount})</span>}
            </button>
            {user?.user_type === 'admin' && (
              <Link to="/admin" className="admin-btn">
                어드민 페이지
              </Link>
            )}
            <div className="shop-header-user">
              <span className="user-name">{user?.name}님</span>
              <button type="button" className="logout-btn" onClick={onLogout}>
                로그아웃
              </button>
            </div>
          </div>
        </div>
      </header>

      <style>{`
        .shop-header {
          background: #e85a2a;
          color: #fff;
          padding: 1rem 1.5rem;
        }
        .shop-header-inner {
          width: 100%;
          margin: 0 auto;
          padding: 0 1rem;
          display: flex;
          justify-content: space-between;
          align-items: center;
        }
        .shop-header h1 { margin: 0; font-size: 1.5rem; }
        .shop-header-right { display: flex; align-items: center; gap: 1rem; }
        .header-cart-btn {
          padding: 0.6rem 1.2rem;
          font-size: 1.1rem;
          font-weight: 600;
          background: #fff;
          color: #e85a2a;
          border: none;
          border-radius: 8px;
          cursor: pointer;
          transition: transform 0.2s, box-shadow 0.2s;
        }
        .header-cart-btn:hover {
          transform: translateY(-2px);
          box-shadow: 0 4px 12px rgba(0,0,0,0.15);
        }
        .cart-count { font-size: 0.9rem; opacity: 0.9; }
        .admin-btn {
          padding: 0.6rem 1.2rem;
          font-size: 0.95rem;
          font-weight: 600;
          background: #333;
          color: #fff;
          border: none;
          border-radius: 8px;
          text-decoration: none;
          cursor: pointer;
          transition: transform 0.2s, box-shadow 0.2s;
        }
        .admin-btn:hover {
          transform: translateY(-2px);
          box-shadow: 0 4px 12px rgba(0,0,0,0.2);
          color: #fff;
        }
        .shop-header-user { display: flex; align-items: center; gap: 1rem; }
        .user-name { font-weight: 500; }
        .logout-btn {
          padding: 0.35rem 0.75rem;
          background: rgba(255,255,255,0.2);
          border: 1px solid rgba(255,255,255,0.5);
          border-radius: 6px;
          color: #fff;
          font-size: 0.9rem;
          cursor: pointer;
        }
        .logout-btn:hover { background: rgba(255,255,255,0.3); }
      `}</style>
    </>
  )
}

export default ShopNavbar
