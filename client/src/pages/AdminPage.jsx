import { useState, useEffect } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { useAuth } from '@/contexts/AuthContext'
import { userApi } from '@/services/api'

const ORDER_STORAGE_KEY = 'shop_order_list'

function AdminPage() {
  const { user, isLoggedIn } = useAuth()
  const navigate = useNavigate()
  const [activeMenu, setActiveMenu] = useState('orders')
  const [users, setUsers] = useState([])
  const [orders, setOrders] = useState([])

  useEffect(() => {
    if (!isLoggedIn || !user) {
      navigate('/login')
      return
    }
    if (user.user_type !== 'admin') {
      navigate('/')
      return
    }
    loadUsers()
    loadOrders()
  }, [isLoggedIn, user, navigate])

  const loadUsers = async () => {
    try {
      const data = await userApi.getAll()
      setUsers(data)
    } catch (err) {
      console.error(err)
    }
  }

  const loadOrders = () => {
    try {
      const saved = localStorage.getItem(ORDER_STORAGE_KEY)
      if (saved) {
        const list = JSON.parse(saved)
        setOrders(list.slice(0, 10))
      }
    } catch (e) {}
  }

  if (!isLoggedIn || user?.user_type !== 'admin') {
    return null
  }

  const statusColors = {
    결제완료: 'rgba(183, 110, 121, 0.2)',
    입금대기: 'var(--color-blush)',
    처리중: 'var(--color-sage)',
    배송중: 'rgba(183, 110, 121, 0.15)',
    배송완료: 'rgba(183, 110, 121, 0.2)',
  }

  const statusText = (status) => status || '처리중'

  return (
    <div className="admin-page">
      <header className="admin-header">
        <div className="admin-header-inner">
          <h1>관리자 모드</h1>
          <Link to="/" className="admin-back-btn">
            제과점으로 돌아가기
          </Link>
        </div>
      </header>

      <div className="admin-layout">
        <aside className="admin-sidebar">
          <h2 className="sidebar-title">빠른 작업</h2>
          <nav className="quick-tasks">
            <button
              type="button"
              className={`task-btn ${activeMenu === 'product' ? 'active' : ''}`}
              onClick={() => setActiveMenu('product')}
            >
              <span className="task-icon">+</span>
              새상품 등록
            </button>
            <button
              type="button"
              className={`task-btn ${activeMenu === 'orders' ? 'active' : ''}`}
              onClick={() => setActiveMenu('orders')}
            >
              <span className="task-icon">📦</span>
              주문 관리
            </button>
            <button
              type="button"
              className={`task-btn ${activeMenu === 'sales' ? 'active' : ''}`}
              onClick={() => setActiveMenu('sales')}
            >
              <span className="task-icon">📊</span>
              매출 분석
            </button>
            <button
              type="button"
              className={`task-btn ${activeMenu === 'customers' ? 'active' : ''}`}
              onClick={() => setActiveMenu('customers')}
            >
              <span className="task-icon">👥</span>
              고객 관리
            </button>
          </nav>
        </aside>

        <main className="admin-main">
          {activeMenu === 'product' && (
            <section className="admin-section">
              <h2>새상품 등록</h2>
              <p className="placeholder-msg">상품 등록 기능 준비 중입니다.</p>
            </section>
          )}

          {activeMenu === 'orders' && (
            <section className="admin-section">
              <div className="section-header">
                <h2>최근 주문</h2>
                <button type="button" className="view-all-btn">전체보기</button>
              </div>
              {orders.length === 0 ? (
                <p className="empty-msg">최근 주문이 없습니다.</p>
              ) : (
                <ul className="order-list">
                  {orders.map((order) => (
                    <li key={order.id} className="order-card">
                      <div className="order-id">ORD-{String(order.id).slice(-6)}</div>
                      <div className="order-customer">{order.userName || '-'}</div>
                      <div className="order-date">
                        {order.createdAt ? new Date(order.createdAt).toISOString().slice(0, 10) : '-'}
                      </div>
                      <span
                        className="order-status"
                        style={{ background: statusColors[order.status] || statusColors.처리중 }}
                      >
                        {statusText(order.status)}
                      </span>
                      <div className="order-amount">
                        {order.totalPrice ? `${order.totalPrice.toLocaleString()}원` : '0원'}
                      </div>
                    </li>
                  ))}
                </ul>
              )}
            </section>
          )}

          {activeMenu === 'sales' && (
            <section className="admin-section">
              <h2>매출 분석</h2>
              <p className="placeholder-msg">매출 분석 기능 준비 중입니다.</p>
            </section>
          )}

          {activeMenu === 'customers' && (
            <section className="admin-section">
              <div className="section-header">
                <h2>고객 관리</h2>
              </div>
              {users.length === 0 ? (
                <p className="empty-msg">등록된 고객이 없습니다.</p>
              ) : (
                <ul className="customer-list">
                  {users.map((u) => (
                    <li key={u._id} className="customer-card">
                      <div className="customer-name">{u.name}</div>
                      <div className="customer-email">{u.email}</div>
                      <span className={`customer-type ${u.user_type}`}>{u.user_type === 'admin' ? '관리자' : '고객'}</span>
                    </li>
                  ))}
                </ul>
              )}
            </section>
          )}
        </main>
      </div>

      <style>{`
        .admin-page { min-height: 100vh; background: var(--color-cream); }
        .admin-header {
          background: linear-gradient(135deg, #f5ebe6 0%, #efe4de 100%);
          color: var(--color-charcoal);
          padding: 1rem 1.5rem;
          border-bottom: 1px solid var(--color-border);
        }
        .admin-header-inner {
          max-width: 1200px;
          margin: 0 auto;
          display: flex;
          justify-content: space-between;
          align-items: center;
        }
        .admin-header h1 {
          margin: 0;
          font-size: 1.25rem;
          font-family: var(--font-heading);
          font-weight: 600;
        }
        .admin-back-btn {
          padding: 0.5rem 1rem;
          background: var(--color-rose-gold);
          color: #fff;
          text-decoration: none;
          border-radius: 8px;
          font-size: 0.9rem;
          font-weight: 500;
          transition: all 0.2s;
        }
        .admin-back-btn:hover { opacity: 0.95; color: #fff; }

        .admin-layout {
          max-width: 1200px;
          margin: 0 auto;
          padding: 2rem 1.5rem;
          display: flex;
          gap: 2rem;
        }
        .admin-sidebar {
          width: 220px;
          flex-shrink: 0;
        }
        .sidebar-title {
          font-size: 1.25rem;
          font-weight: 600;
          margin: 0 0 1rem;
          font-family: var(--font-heading);
          color: var(--color-charcoal);
        }
        .quick-tasks {
          display: flex;
          flex-direction: column;
          gap: 0.5rem;
        }
        .task-btn {
          display: flex;
          align-items: center;
          gap: 0.75rem;
          padding: 0.9rem 1rem;
          border: 1px solid var(--color-border);
          background: #fff;
          color: var(--color-soft-brown);
          font-size: 0.95rem;
          font-weight: 500;
          text-align: left;
          cursor: pointer;
          border-radius: 10px;
          transition: all 0.2s;
        }
        .task-btn:hover { background: var(--color-blush); color: var(--color-rose-gold); }
        .task-btn.active {
          background: var(--color-rose-gold);
          color: #fff;
          border-color: var(--color-rose-gold);
        }
        .task-icon {
          font-size: 1.1rem;
          opacity: 0.8;
        }

        .admin-main { flex: 1; min-width: 0; }
        .admin-section {
          background: #fff;
          border-radius: 12px;
          padding: 1.5rem;
          box-shadow: var(--shadow-soft);
          border: 1px solid var(--color-border);
        }
        .admin-section h2 {
          font-size: 1.25rem;
          font-weight: 600;
          margin: 0 0 1rem;
          font-family: var(--font-heading);
          color: var(--color-charcoal);
        }
        .section-header {
          display: flex;
          justify-content: space-between;
          align-items: center;
          margin-bottom: 1rem;
        }
        .section-header h2 { margin: 0; }
        .view-all-btn {
          border: none;
          background: none;
          color: #1a1a1a;
          font-size: 0.9rem;
          font-weight: 500;
          cursor: pointer;
          text-decoration: underline;
        }
        .view-all-btn:hover { opacity: 0.8; }

        .placeholder-msg, .empty-msg {
          color: #666;
          padding: 2rem 0;
        }
        .order-list, .customer-list {
          list-style: none;
          padding: 0;
          margin: 0;
          display: flex;
          flex-direction: column;
          gap: 0.75rem;
        }
        .order-card, .customer-card {
          display: flex;
          align-items: center;
          gap: 1rem;
          padding: 1rem;
          background: var(--color-blush);
          border-radius: 10px;
          border: 1px solid var(--color-border);
        }
        .order-id {
          font-weight: 700;
          min-width: 100px;
          color: #1a1a1a;
        }
        .order-customer, .customer-name {
          min-width: 80px;
          color: #333;
        }
        .order-date {
          min-width: 100px;
          color: #666;
          font-size: 0.9rem;
        }
        .order-status {
          padding: 0.25rem 0.6rem;
          border-radius: 6px;
          font-size: 0.85rem;
          font-weight: 500;
          color: #333;
        }
        .order-amount {
          margin-left: auto;
          font-weight: 700;
          color: #1a1a1a;
        }
        .customer-email {
          flex: 1;
          color: #666;
          font-size: 0.9rem;
        }
        .customer-type {
          padding: 0.25rem 0.6rem;
          border-radius: 6px;
          font-size: 0.85rem;
          font-weight: 500;
        }
        .customer-type.admin { background: #e3f2fd; color: #1565c0; }
        .customer-type.customer { background: #f5f5f5; color: #666; }
      `}</style>
    </div>
  )
}

export default AdminPage
