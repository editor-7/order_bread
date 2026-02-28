import { useState, useMemo } from 'react'
import { useNavigate } from 'react-router-dom'
import { products, getCategory } from '@/data/products'

function ShopPage() {
  const navigate = useNavigate()
  const [searchTerm, setSearchTerm] = useState('')
  const [categoryFilter, setCategoryFilter] = useState('all')
  const [cart, setCart] = useState([])

  const categories = useMemo(() => {
    const set = new Set()
    products.forEach((p) => set.add(getCategory(p)))
    return Array.from(set).sort()
  }, [])

  const filteredProducts = useMemo(() => {
    let result = products
    if (searchTerm) {
      const term = searchTerm.toLowerCase()
      result = result.filter(
        (p) =>
          p.name.toLowerCase().includes(term) ||
          (p.desc || '').toLowerCase().includes(term) ||
          (p.size || '').toLowerCase().includes(term)
      )
    }
    if (categoryFilter !== 'all') {
      result = result.filter((p) => getCategory(p) === categoryFilter)
    }
    return result
  }, [searchTerm, categoryFilter])

  const addToCart = (product, qty = 1) => {
    const count = Math.max(1, parseInt(qty) || 0)
    setCart((prev) => {
      const next = [...prev]
      for (let i = 0; i < count; i++) next.push(product)
      return next
    })
  }

  const groupedCart = useMemo(() => {
    const map = new Map()
    cart.forEach((item) => {
      const key = `${item.name}|${item.desc}|${item.size}|${item.unit}|${item.price}`
      if (!map.has(key)) map.set(key, { ...item, count: 0 })
      map.get(key).count++
    })
    return Array.from(map.values())
  }, [cart])

  const totalPrice = groupedCart.reduce((sum, g) => sum + g.price * g.count, 0)

  const changeCartQty = (group, diff) => {
    const g = groupedCart[group]
    const newCount = Math.max(0, g.count + diff)
    setCart((prev) => {
      const key = `${g.name}|${g.desc}|${g.size}|${g.unit}|${g.price}`
      const next = prev.filter(
        (i) => `${i.name}|${i.desc}|${i.size}|${i.unit}|${i.price}` !== key
      )
      for (let i = 0; i < newCount; i++) next.push(g)
      return next
    })
  }

  const removeFromCart = (group) => {
    const g = groupedCart[group]
    const key = `${g.name}|${g.desc}|${g.size}|${g.unit}|${g.price}`
    setCart((prev) => prev.filter((i) => `${i.name}|${i.desc}|${i.size}|${i.unit}|${i.price}` !== key))
  }

  const clearCart = () => {
    if (cart.length === 0) return
    if (window.confirm('장바구니를 모두 비우시겠습니까?')) setCart([])
  }

  const clearSearch = () => {
    setSearchTerm('')
    setCategoryFilter('all')
  }

  return (
    <div className="shop-page">
      <header className="shop-header">
        <h1>오더브레드 제과점</h1>
      </header>

      <div className="container py-4">
        <button type="button" className="back-btn-top mb-3" onClick={() => navigate(-1)}>
          <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
            <path d="M19 12H5M12 19l-7-7 7-7" />
          </svg>
          뒤로가기
        </button>
        <div className="row mb-3">
          <div className="col-md-6">
            <div className="input-group">
              <input
                type="text"
                className="form-control"
                placeholder="상품명으로 검색하세요..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
              />
              <button className="btn btn-outline-secondary" type="button" onClick={clearSearch}>
                초기화
              </button>
            </div>
          </div>
          <div className="col-md-6">
            <select
              className="form-select"
              value={categoryFilter}
              onChange={(e) => setCategoryFilter(e.target.value)}
            >
              <option value="all">전체 카테고리</option>
              {categories.map((c) => (
                <option key={c} value={c}>
                  {c}
                </option>
              ))}
            </select>
          </div>
        </div>

        <div className="row" id="productList">
          {filteredProducts.length === 0 ? (
            <div className="col-12">
              <div className="alert alert-info text-center">검색 결과가 없습니다.</div>
            </div>
          ) : (
            filteredProducts.map((p, idx) => (
              <div key={idx} className="col-12 col-sm-6 col-md-4 col-lg-3 mb-4">
                <div className="card h-100 product-card">
                  <div className="card-header py-1 px-2 border-0 bg-transparent">
                    <span className="badge bg-primary">{getCategory(p)}</span>
                  </div>
                  <img src={p.img} className="card-img-top" alt={p.name} />
                  <div className="card-body d-flex flex-column">
                    <h5 className="card-title">{p.name}</h5>
                    <ul className="list-unstyled mb-2 small">
                      <li><strong>규격:</strong> {p.size}</li>
                      <li><strong>단위:</strong> {p.unit}</li>
                    </ul>
                    <p className="card-text mb-2">{p.price.toLocaleString()}원</p>
                    <div className="d-flex align-items-center gap-2 mb-2">
                      <input
                        type="number"
                        min="1"
                        defaultValue="1"
                        className="form-control form-control-sm"
                        style={{ width: '70px' }}
                        id={`qty-${idx}`}
                      />
                      <button
                        className="btn btn-success btn-sm flex-grow-1"
                        onClick={() => {
                          const input = document.getElementById(`qty-${idx}`)
                          addToCart(p, input?.value)
                        }}
                      >
                        장바구니 담기
                      </button>
                    </div>
                  </div>
                </div>
              </div>
            ))
          )}
        </div>

        <div className="cart mt-5">
          <h2>🛒 장바구니</h2>
          <ul className="list-group mb-2">
            {groupedCart.map((g, idx) => (
              <li key={idx} className="list-group-item d-flex justify-content-between align-items-center">
                <div>
                  <strong>{g.name}</strong> ({g.size}, {g.unit})
                </div>
                <div className="d-flex align-items-center gap-2">
                  <button className="btn btn-outline-secondary btn-sm" onClick={() => changeCartQty(idx, -1)}>-</button>
                  <span className="text-center" style={{ minWidth: '2rem' }}>{g.count}</span>
                  <button className="btn btn-outline-secondary btn-sm" onClick={() => changeCartQty(idx, 1)}>+</button>
                  <span className="ms-2">{(g.price * g.count).toLocaleString()}원</span>
                  <button className="btn btn-outline-danger btn-sm" onClick={() => removeFromCart(idx)}>×</button>
                </div>
              </li>
            ))}
          </ul>
          <div className="d-flex justify-content-between align-items-center">
            <strong className="cart-total">{totalPrice > 0 ? `총 합계: ${totalPrice.toLocaleString()}원` : ''}</strong>
            <div>
              <button className="btn btn-danger me-2" onClick={clearCart} disabled={cart.length === 0}>
                장바구니 비우기
              </button>
              <button type="button" className="btn btn-outline-secondary" onClick={() => navigate(-1)}>
                <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" style={{ verticalAlign: 'middle', marginRight: '4px' }}>
                  <path d="M19 12H5M12 19l-7-7 7-7" />
                </svg>
                뒤로가기
              </button>
            </div>
          </div>
        </div>
      </div>

      <style>{`
        .shop-page { min-height: 100vh; background: #f5f5f5; }
        .shop-header {
          background: #4CAF50 !important;
          color: #fff;
          text-align: center;
          padding: 1rem 0;
          margin-bottom: 1rem;
        }
        .shop-header h1 { margin: 0; font-size: 1.75rem; }
        .product-card {
          border: 1px solid #e0e0e0;
          border-radius: 10px;
          transition: box-shadow 0.2s;
        }
        .product-card:hover {
          box-shadow: 0 4px 16px rgba(76,175,80,0.15);
        }
        .card-img-top { border-radius: 10px 10px 0 0; background: #eee; }
        .cart ul { padding-left: 0; }
        .cart-total { font-size: 1.2em; color: #388e3c; }
        .back-btn-top {
          display: inline-flex;
          align-items: center;
          gap: 0.5rem;
          padding: 0.5rem 1rem;
          color: #374151;
          font-size: 0.9rem;
          font-weight: 500;
          border: 1px solid #d1d5db;
          border-radius: 8px;
          background: #fff;
          cursor: pointer;
          transition: border-color 0.2s, background 0.2s;
        }
        .back-btn-top:hover {
          border-color: #4CAF50;
          color: #4CAF50;
          background: #f1f8f4;
        }
      `}</style>
    </div>
  )
}

export default ShopPage
