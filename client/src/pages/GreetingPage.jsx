import { Link } from 'react-router-dom'
import { useAuth } from '@/contexts/AuthContext'
import { useCart } from '@/contexts/CartContext'
import ShopNavbar from '@/components/ShopNavbar'
import ShopFooter from '@/components/ShopFooter'
import './GreetingPage.css'

function GreetingPage() {
  const { user, isLoggedIn, logout } = useAuth()
  const { groupedCart } = useCart()

  return (
    <div className="greeting-page">
      <ShopNavbar
        user={isLoggedIn ? user : null}
        onLogout={logout}
        cartCount={groupedCart.reduce((sum, g) => sum + g.count, 0)}
      />

      <main className="greeting-main">
        <div className="greeting-header">
          <Link to="/" className="greeting-back-btn">← 홈</Link>
        </div>
        <article className="greeting-content">
          <h1 className="greeting-title">가족이 안심하고 먹을 수 있는 빵</h1>
          <div className="greeting-body">
            <p>가족이 안심하고 먹을 수 있는 빵을 만들고 싶었습니다. 그래서 좋은 재료와 정직한 방식으로 빵을 만듭니다.</p>
            <p>통밀에는 식이섬유와 비타민 미네랄이 풍부해 장 건강과 포만감에 도움이 됩니다. 반죽은 충분한 시간을 들여 천천히 발효해 소화가 편안하고 깊은 풍미가 나도록 만들었습니다.</p>
            <p>설탕과 버터를 과하게 사용하지 않고, 밀가루·물·소금·천연발효종 중심의 단순한 재료로 빵을 만듭니다. 통밀과 백밀의 균형 있는 비율로 건강함과 부드러운 식감을 함께 살렸습니다.</p>
            <p className="greeting-closing">부담 없이 매일 먹을 수 있는 담백한 빵, 가족이 함께 먹을 수 있는 정직한 빵입니다.</p>
          </div>
        </article>
      </main>

      <ShopFooter />
    </div>
  )
}

export default GreetingPage
