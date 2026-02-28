import { useAuth } from '@/contexts/AuthContext'
import ShopContent from '@/components/ShopContent'

function HomePage() {
  const { user, isLoggedIn, logout } = useAuth()

  return (
    <ShopContent
      user={isLoggedIn ? user : null}
      onLogout={logout}
    />
  )
}

export default HomePage
