import { getCategory } from '@/data/products'

function ShopBody({
  searchTerm,
  onSearchChange,
  categoryFilter,
  onCategoryChange,
  activeTab,
  onTabChange,
  categories,
  showOrderList,
  onShowOrderList,
  onCloseOrderList,
  orderList,
  deliveryInfo,
  onDeliveryInfoChange,
  showPayment,
  paymentStep,
  paymentMethod,
  onPaymentStepChange,
  onPaymentMethodChange,
  onPaymentClose,
  onPaymentComplete,
  filteredProducts,
  wishlist,
  toggleWishlist,
  addToCart,
  groupedCart,
  changeCartQty,
  removeFromCart,
  clearCart,
  totalPrice,
  saveOrder,
  addedMsg,
  onShowPayment,
}) {
  return (
    <>
    <div className="shop-layout">
      {/* 왼쪽 사이드바 */}
      <aside className="shop-sidebar">
        <div className="sidebar-tabs">
          <button
            type="button"
            className={activeTab === 'category' ? 'active' : ''}
            onClick={() => onTabChange('category')}
          >
            CATEGORY
          </button>
          <button
            type="button"
            className={activeTab === 'brand' ? 'active' : ''}
            onClick={() => onTabChange('brand')}
          >
            BRAND
          </button>
        </div>

        {activeTab === 'brand' && (
          <nav className="category-list">
            <p style={{ padding: '0 1rem', fontSize: '0.85rem', color: 'rgba(255,255,255,0.8)' }}>
              브랜드 목록 준비 중
            </p>
          </nav>
        )}
        {activeTab === 'category' && (
          <nav className="category-list">
            <button
              type="button"
              className={categoryFilter === 'all' ? 'active' : ''}
              onClick={() => onCategoryChange('all')}
            >
              전체
            </button>
            {categories.map((c) => (
              <button
                key={c}
                type="button"
                className={categoryFilter === c ? 'active' : ''}
                onClick={() => onCategoryChange(c)}
              >
                {c}
              </button>
            ))}
          </nav>
        )}

        <div className="sidebar-section">
          <h3>COMMUNITY</h3>
          <div className="community-grid">
            <a href="#">공지사항</a>
            <a href="#">이벤트</a>
            <a href="#">FAQ</a>
            <a href="#">상품후기</a>
          </div>
          <div className="community-links">
            <a href="#">상품문의</a>
            <a href="#">자유게시판</a>
            <a href="#">갤러리</a>
            <a href="#">자료실</a>
          </div>
        </div>

        <div className="sidebar-section">
          <h3>MY SHOP</h3>
          <div className="myshop-links">
            <button type="button" className="myshop-link-btn" onClick={onShowOrderList}>
              내 구매 리스트
            </button>
            <a href="#">적립금</a>
            <a href="#">회원정보</a>
            <a href="#">1:1 맞춤상담</a>
            <a href="#">관심상품</a>
          </div>
        </div>

        <div className="sidebar-section cs-center">
          <h3>CS CENTER</h3>
          <p><strong>TEL</strong> 1577-0000</p>
          <p><strong>FAX</strong> 02-0000-0000</p>
          <p><strong>EMAIL</strong> cs@example.com</p>
          <p><strong>TIME</strong> 평일 AM9-PM6</p>
          <p><strong>BANK</strong> 하나은행 000-000000-00000</p>
        </div>

        <div className="sidebar-search">
          <input
            type="text"
            placeholder="SEARCH"
            value={searchTerm}
            onChange={(e) => onSearchChange(e.target.value)}
          />
          <button type="button" className="search-btn">🔍</button>
        </div>
      </aside>

      {/* 메인 콘텐츠 */}
      <main className="shop-main">
        {showOrderList ? (
          <div className="order-list-view">
            <div className="order-list-header">
              <h2>내 구매 리스트</h2>
              <button type="button" className="back-to-list-btn" onClick={onCloseOrderList}>
                ← 빵 목록으로
              </button>
            </div>
            {orderList.length === 0 ? (
              <p className="empty-orders">구매 내역이 없습니다.</p>
            ) : (
              <ul className="order-list">
                {orderList.map((order) => (
                  <li key={order.id} className="order-item">
                    <div className="order-meta">
                      <span className="order-date">
                        {new Date(order.createdAt).toLocaleString('ko-KR')}
                      </span>
                      <span className={`order-status status-${order.status === '결제완료' ? 'done' : 'wait'}`}>
                        {order.status}
                      </span>
                    </div>
                    <ul className="order-items">
                      {order.items.map((g, i) => (
                        <li key={i}>
                          {g.name} × {g.count}개 — {(g.price * g.count).toLocaleString()}원
                        </li>
                      ))}
                    </ul>
                    <div className="order-total">
                      총 {order.totalPrice.toLocaleString()}원 ({order.paymentMethod === 'card' ? '카드결제' : order.paymentMethod === 'transfer' ? '계좌이체' : '무통장입금'})
                    </div>
                  </li>
                ))}
              </ul>
            )}
          </div>
        ) : showPayment ? (
          <div className="payment-mode">
            <h2>결제하기</h2>
            <button type="button" className="back-to-cart-btn" onClick={onPaymentClose}>
              ← 장바구니로 돌아가기
            </button>
            <div className="payment-summary">
              <h3>주문 내역</h3>
              <ul>
                {groupedCart.map((g, idx) => (
                  <li key={idx}>
                    <span>{g.name}</span>
                    <span>{g.count}개</span>
                    <span>{(g.price * g.count).toLocaleString()}원</span>
                  </li>
                ))}
              </ul>
              <div className="payment-total">
                <strong>총 결제금액</strong>
                <strong>{totalPrice.toLocaleString()}원</strong>
              </div>
            </div>
            <div className="payment-delivery">
              <h3>배송 정보</h3>
              <div className="form-row">
                <label>수령인</label>
                <input
                  type="text"
                  placeholder="이름"
                  value={deliveryInfo.name}
                  onChange={(e) => onDeliveryInfoChange((p) => ({ ...p, name: e.target.value }))}
                />
              </div>
              <div className="form-row">
                <label>연락처</label>
                <input
                  type="tel"
                  placeholder="010-0000-0000"
                  value={deliveryInfo.phone}
                  onChange={(e) => onDeliveryInfoChange((p) => ({ ...p, phone: e.target.value }))}
                />
              </div>
              <div className="form-row">
                <label>주소</label>
                <input
                  type="text"
                  placeholder="주소를 입력하세요"
                  value={deliveryInfo.address}
                  onChange={(e) => onDeliveryInfoChange((p) => ({ ...p, address: e.target.value }))}
                />
              </div>
            </div>
            <div className="payment-method">
              <h3>결제 수단 선택</h3>
              <label className="payment-option">
                <input
                  type="radio"
                  name="payment"
                  value="card"
                  checked={paymentMethod === 'card'}
                  onChange={() => onPaymentMethodChange('card')}
                />
                신용/체크카드
              </label>
              <label className="payment-option">
                <input
                  type="radio"
                  name="payment"
                  value="transfer"
                  checked={paymentMethod === 'transfer'}
                  onChange={() => onPaymentMethodChange('transfer')}
                />
                계좌이체
              </label>
              <label className="payment-option">
                <input
                  type="radio"
                  name="payment"
                  value="deposit"
                  checked={paymentMethod === 'deposit'}
                  onChange={() => onPaymentMethodChange('deposit')}
                />
                무통장입금
              </label>
            </div>

            {paymentStep === 1 ? (
              <button
                type="button"
                className="btn-confirm-payment"
                onClick={() => {
                  if (!paymentMethod) {
                    alert('결제 수단을 선택해주세요.')
                    return
                  }
                  onPaymentStepChange(2)
                }}
              >
                결제 진행하기
              </button>
            ) : (
              <div className="payment-step2">
                {paymentMethod === 'card' && (
                  <div className="card-form">
                    <h3>카드 정보 입력</h3>
                    <div className="form-row">
                      <label>카드번호</label>
                      <input type="text" placeholder="0000-0000-0000-0000" maxLength={19} />
                    </div>
                    <div className="form-row">
                      <label>유효기간</label>
                      <input type="text" placeholder="MM/YY" maxLength={5} />
                    </div>
                    <div className="form-row">
                      <label>CVC</label>
                      <input type="password" placeholder="뒷면 3자리" maxLength={4} />
                    </div>
                  </div>
                )}
                {(paymentMethod === 'transfer' || paymentMethod === 'deposit') && (
                  <div className="bank-info">
                    <h3>입금하실 계좌</h3>
                    <p><strong>하나은행</strong> 589-910014-42404</p>
                    <p><strong>예금주</strong> (주)오더브레드</p>
                    <p><strong>입금금액</strong> {totalPrice.toLocaleString()}원</p>
                    <p className="bank-note">입금 후 아래 버튼을 눌러주세요.</p>
                  </div>
                )}
                <div className="step2-buttons">
                  <button type="button" className="back-step-btn" onClick={() => onPaymentStepChange(1)}>
                    이전
                  </button>
                  <button
                    type="button"
                    className="btn-confirm-payment"
                    onClick={() => {
                      if (paymentMethod === 'card') {
                        saveOrder(groupedCart, totalPrice, paymentMethod, '결제완료')
                        alert('결제가 완료되었습니다.')
                        onPaymentComplete()
                      } else if (paymentMethod === 'transfer' || paymentMethod === 'deposit') {
                        saveOrder(groupedCart, totalPrice, paymentMethod, '입금대기')
                        alert('입금 요청이 접수되었습니다.\n입금 확인 후 주문이 처리됩니다.')
                        onPaymentComplete()
                      }
                    }}
                  >
                    {paymentMethod === 'card' ? '결제 완료' : '입금 확인 요청'}
                  </button>
                </div>
              </div>
            )}
          </div>
        ) : (
          <>
            <section className="section-banner">
              <h2>빵 목록</h2>
              <div className="product-grid">
                {filteredProducts.map((p, idx) => (
                  <div key={idx} className="product-card">
                    <div className="product-img-wrap">
                      <img src={p.img} alt={p.name} />
                      <button
                        type="button"
                        className={`wish-btn ${wishlist.has(`${p.name}|${p.price}`) ? 'active' : ''}`}
                        onClick={() => toggleWishlist(p)}
                      >
                        ♥
                      </button>
                    </div>
                    <div className="product-info">
                      <div className="product-qty-row">
                        <label>수량</label>
                        <input type="number" min="1" defaultValue="1" id={`qty-${idx}`} />
                      </div>
                      <button
                        type="button"
                        className="product-cart-btn"
                        onClick={() => {
                          const input = document.getElementById(`qty-${idx}`)
                          addToCart(p, input?.value)
                        }}
                      >
                        장바구니 담기
                      </button>
                      <h4>{p.name}</h4>
                      <p className="product-brand">{getCategory(p)}</p>
                      <p className="product-price">{p.price.toLocaleString()}원</p>
                      <p className="product-shipping">배송비 : 6,000원</p>
                    </div>
                  </div>
                ))}
              </div>
            </section>

            {filteredProducts.length === 0 && (
              <div className="empty-result">검색 결과가 없습니다.</div>
            )}

            {addedMsg && <div className="added-msg">{addedMsg}</div>}
            <section className="cart-section">
              <h2>🛒 장바구니</h2>
              <ul className="cart-list">
                {groupedCart.map((g, idx) => (
                  <li key={idx} className="cart-item">
                    <div className="cart-item-info">
                      <strong>{g.name}</strong>
                      <span>{g.size} / {g.unit}</span>
                    </div>
                    <div className="cart-item-actions">
                      <button type="button" onClick={() => changeCartQty(idx, -1)}>-</button>
                      <span>{g.count}</span>
                      <button type="button" onClick={() => changeCartQty(idx, 1)}>+</button>
                      <span className="cart-item-price">{(g.price * g.count).toLocaleString()}원</span>
                      <button type="button" className="cart-remove" onClick={() => removeFromCart(idx)}>×</button>
                    </div>
                  </li>
                ))}
              </ul>
              <div className="cart-footer">
                <strong className="cart-total">{totalPrice > 0 ? `총 합계: ${totalPrice.toLocaleString()}원` : ''}</strong>
                <div>
                  <button type="button" onClick={clearCart} disabled={groupedCart.length === 0}>
                    장바구니 비우기
                  </button>
                  {totalPrice > 0 && (
                    <button
                      type="button"
                      className="btn-purchase"
                      onClick={() => onShowPayment()}
                    >
                      구매하기
                    </button>
                  )}
                </div>
              </div>
            </section>
          </>
        )}
      </main>
    </div>

    <style>{`
      .shop-layout { display: flex; flex: 1; width: 100%; }
      .shop-sidebar {
        width: 200px;
        min-width: 200px;
        background: #e85a2a;
        color: #fff;
        padding: 1rem 0;
        display: flex;
        flex-direction: column;
        gap: 1rem;
      }
      .sidebar-tabs { display: flex; padding: 0 1rem; }
      .sidebar-tabs button {
        flex: 1;
        padding: 0.5rem;
        border: none;
        background: transparent;
        color: rgba(255,255,255,0.8);
        font-size: 0.85rem;
        cursor: pointer;
      }
      .sidebar-tabs button.active { background: #fff; color: #e85a2a; font-weight: 600; }
      .category-list { display: flex; flex-direction: column; padding: 0 0.5rem; }
      .category-list button {
        padding: 0.6rem 1rem;
        text-align: left;
        border: none;
        background: transparent;
        color: #fff;
        font-size: 0.9rem;
        cursor: pointer;
        transition: background 0.2s;
      }
      .category-list button:hover, .category-list button.active { background: rgba(255,255,255,0.2); }
      .sidebar-section {
        padding: 0 1rem;
        border-top: 1px solid rgba(255,255,255,0.2);
        padding-top: 1rem;
      }
      .sidebar-section h3 {
        font-size: 0.8rem;
        color: rgba(255,255,255,0.9);
        margin: 0 0 0.5rem;
        font-weight: 600;
      }
      .community-grid {
        display: grid;
        grid-template-columns: 1fr 1fr;
        gap: 0.4rem;
        margin-bottom: 0.5rem;
      }
      .community-grid a, .community-links a {
        color: #fff;
        font-size: 0.85rem;
        text-decoration: none;
      }
      .community-links { display: flex; flex-direction: column; gap: 0.3rem; }
      .myshop-links { display: flex; flex-direction: column; gap: 0.4rem; }
      .myshop-links a, .myshop-link-btn {
        color: #fff;
        font-size: 0.85rem;
        text-decoration: none;
        display: flex;
        align-items: center;
        justify-content: space-between;
        background: none;
        border: none;
        cursor: pointer;
        width: 100%;
        text-align: left;
        padding: 0;
      }
      .myshop-links a::after, .myshop-link-btn::after { content: '›'; }
      .order-list-view { padding: 0; width: 100%; }
      .order-list-header { display: flex; justify-content: space-between; align-items: center; margin-bottom: 1.5rem; }
      .order-list-header h2 { margin: 0; font-size: 1.3rem; }
      .back-to-list-btn {
        padding: 0.5rem 1rem;
        background: #f5f5f5;
        border: 1px solid #ddd;
        border-radius: 6px;
        cursor: pointer;
        font-size: 0.9rem;
      }
      .empty-orders { text-align: center; padding: 3rem; color: #666; }
      .order-list { list-style: none; padding: 0; margin: 0; }
      .order-item {
        border: 1px solid #e0e0e0;
        border-radius: 8px;
        padding: 1.25rem;
        margin-bottom: 1rem;
        background: #fff;
      }
      .order-meta { display: flex; justify-content: space-between; margin-bottom: 0.75rem; }
      .order-date { font-size: 0.9rem; color: #666; }
      .order-status {
        font-size: 0.85rem;
        padding: 0.2rem 0.6rem;
        border-radius: 4px;
      }
      .status-done { background: #e8f5e9; color: #2e7d32; }
      .status-wait { background: #fff3e0; color: #e65100; }
      .order-items { list-style: none; padding: 0; margin: 0 0 0.75rem; font-size: 0.95rem; }
      .order-items li { padding: 0.25rem 0; }
      .order-total { font-weight: 600; color: #e85a2a; }
      .cs-center p { margin: 0.3rem 0; font-size: 0.8rem; }
      .sidebar-search {
        display: flex;
        padding: 0 1rem;
        margin-top: auto;
      }
      .sidebar-search input {
        flex: 1;
        padding: 0.5rem;
        border: none;
        font-size: 0.85rem;
      }
      .search-btn { padding: 0.5rem; border: none; background: #333; color: #fff; cursor: pointer; }

      .shop-main {
        flex: 1;
        min-width: 0;
        padding: 1.5rem;
        background: #fff;
        overflow-y: auto;
      }
      .section-banner { margin-bottom: 2rem; }
      .section-banner h2 {
        background: #333;
        color: #ffc107;
        padding: 0.6rem 1rem;
        text-align: left;
        font-size: 1rem;
        margin: 0 0 1rem;
        border-left: 4px solid #ffc107;
      }
      .product-grid {
        display: grid;
        grid-template-columns: repeat(auto-fill, minmax(180px, 1fr));
        gap: 1.25rem;
      }
      .product-card {
        border: 1px solid #e0e0e0;
        border-radius: 8px;
        overflow: hidden;
        transition: box-shadow 0.2s;
      }
      .product-card:hover { box-shadow: 0 4px 12px rgba(0,0,0,0.1); }
      .product-img-wrap {
        position: relative;
        aspect-ratio: 1;
        background: #eee;
      }
      .product-img-wrap img {
        width: 100%;
        height: 100%;
        object-fit: cover;
      }
      .wish-btn {
        position: absolute;
        top: 8px;
        right: 8px;
        width: 28px;
        height: 28px;
        border: none;
        background: rgba(255,255,255,0.9);
        border-radius: 50%;
        cursor: pointer;
        font-size: 0.9rem;
        color: #999;
      }
      .wish-btn.active { color: #e85a2a; }
      .product-info { padding: 1rem; }
      .product-qty-row {
        display: flex;
        align-items: center;
        gap: 0.5rem;
        margin-bottom: 0.6rem;
      }
      .product-qty-row label { font-size: 0.85rem; font-weight: 500; }
      .product-qty-row input {
        width: 60px;
        padding: 0.35rem;
        font-size: 0.9rem;
        border: 1px solid #ddd;
        border-radius: 4px;
      }
      .product-cart-btn {
        width: 100%;
        padding: 0.7rem 1rem;
        margin-bottom: 0.8rem;
        border: 2px solid #e85a2a;
        background: #e85a2a;
        color: #fff;
        cursor: pointer;
        font-size: 1rem;
        font-weight: 600;
        border-radius: 6px;
      }
      .product-cart-btn:hover { background: #d14a1f; border-color: #d14a1f; }
      .product-info h4 { font-size: 0.95rem; margin: 0 0 0.3rem; line-height: 1.3; }
      .product-brand { font-size: 0.8rem; color: #666; margin: 0 0 0.5rem; }
      .product-price { font-size: 1rem; font-weight: 600; margin: 0 0 0.3rem; }
      .product-shipping { font-size: 0.8rem; color: #666; margin: 0 0 0.5rem; }
      .empty-result { text-align: center; padding: 3rem; color: #666; }
      .added-msg {
        position: fixed;
        top: 80px;
        left: 50%;
        transform: translateX(-50%);
        padding: 0.8rem 1.5rem;
        background: #333;
        color: #fff;
        border-radius: 8px;
        font-size: 1rem;
        font-weight: 500;
        z-index: 1000;
        animation: fadeInOut 2.5s ease;
      }
      @keyframes fadeInOut {
        0%, 100% { opacity: 0; }
        10%, 90% { opacity: 1; }
      }
      .cart-section { margin-top: 2rem; padding-top: 2rem; border-top: 1px solid #eee; }
      .cart-section h2 { font-size: 1.2rem; margin-bottom: 1rem; }
      .cart-list { list-style: none; padding: 0; margin: 0; }
      .cart-item {
        display: flex;
        justify-content: space-between;
        align-items: center;
        padding: 1rem;
        border-bottom: 1px solid #eee;
      }
      .cart-item-info strong { display: block; }
      .cart-item-info span { font-size: 0.85rem; color: #666; }
      .cart-item-actions { display: flex; align-items: center; gap: 0.5rem; }
      .cart-item-actions button { width: 28px; height: 28px; border: 1px solid #ddd; background: #fff; cursor: pointer; }
      .cart-item-price { min-width: 80px; text-align: right; font-weight: 600; }
      .cart-remove { color: #dc3545; }
      .cart-footer {
        display: flex;
        justify-content: space-between;
        align-items: center;
        margin-top: 1rem;
        padding: 1rem 0;
      }
      .cart-total { font-size: 1.2rem; color: #e85a2a; }
      .cart-footer button {
        padding: 0.5rem 1rem;
        margin-left: 0.5rem;
        border: 1px solid #ddd;
        background: #fff;
        cursor: pointer;
        border-radius: 4px;
      }
      .btn-purchase { background: #e85a2a !important; color: #fff !important; border-color: #e85a2a !important; }
      .payment-mode { max-width: 100%; padding: 0; }
      .payment-mode h2 { margin-bottom: 1.5rem; font-size: 1.5rem; }
      .back-to-cart-btn {
        padding: 0.5rem 1rem;
        margin-bottom: 1.5rem;
        background: #fff;
        border: 1px solid #ddd;
        border-radius: 6px;
        cursor: pointer;
        font-size: 0.9rem;
      }
      .back-to-cart-btn:hover { background: #f5f5f5; }
      .payment-summary, .payment-delivery, .payment-method {
        background: #fff;
        border: 1px solid #e0e0e0;
        border-radius: 8px;
        padding: 1.5rem;
        margin-bottom: 1.5rem;
      }
      .payment-summary h3, .payment-delivery h3, .payment-method h3 {
        margin: 0 0 1rem;
        font-size: 1rem;
      }
      .payment-summary ul { list-style: none; padding: 0; margin: 0; }
      .payment-summary li {
        display: flex;
        justify-content: space-between;
        padding: 0.5rem 0;
        border-bottom: 1px solid #eee;
      }
      .payment-total {
        display: flex;
        justify-content: space-between;
        margin-top: 1rem;
        padding-top: 1rem;
        font-size: 1.2rem;
        color: #e85a2a;
      }
      .form-row { margin-bottom: 1rem; }
      .form-row label { display: block; font-size: 0.9rem; margin-bottom: 0.3rem; }
      .form-row input {
        width: 100%;
        padding: 0.6rem;
        border: 1px solid #ddd;
        border-radius: 6px;
      }
      .payment-option { display: block; padding: 0.6rem 0; cursor: pointer; }
      .payment-option input { margin-right: 0.5rem; }
      .btn-confirm-payment {
        width: 100%;
        padding: 1rem;
        background: #e85a2a;
        color: #fff;
        border: none;
        border-radius: 8px;
        font-size: 1.1rem;
        font-weight: 600;
        cursor: pointer;
      }
      .btn-confirm-payment:hover { background: #d14a1f; }
      .payment-step2 { margin-top: 1rem; }
      .card-form, .bank-info {
        background: #f9f9f9;
        border-radius: 8px;
        padding: 1.5rem;
        margin-bottom: 1rem;
      }
      .card-form h3, .bank-info h3 { margin: 0 0 1rem; font-size: 1rem; }
      .bank-info p { margin: 0.5rem 0; }
      .bank-note { font-size: 0.9rem; color: #666; margin-top: 1rem !important; }
      .step2-buttons { display: flex; gap: 1rem; margin-top: 1rem; }
      .back-step-btn {
        padding: 0.8rem 1.5rem;
        background: #fff;
        border: 1px solid #ddd;
        border-radius: 8px;
        cursor: pointer;
        font-size: 1rem;
      }
      .back-step-btn:hover { background: #f5f5f5; }
      .step2-buttons .btn-confirm-payment { flex: 1; }
    `}</style>
    </>
  )
}

export default ShopBody
