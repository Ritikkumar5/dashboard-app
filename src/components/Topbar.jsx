import { Bars3Icon } from './Icons'
import { useAuth } from '../context/AuthContext'
import { useNavigate } from 'react-router-dom'

export default function Topbar({ onOpenSidebar }) {
  const { user, logout } = useAuth()
  const navigate = useNavigate()

  function handleLogout() {
    logout()
    navigate('/login', { replace: true })
  }

  return (
    <header className="fixed top-0 left-0 right-0 z-50 h-16 bg-white border-b flex items-center justify-between px-4 shadow-sm">
      <div className="flex items-center gap-3">
        <button className="lg:hidden p-2" onClick={onOpenSidebar} aria-label="Open sidebar">
          <Bars3Icon className="w-6 h-6" />
        </button>
        <span className="text-lg font-semibold">Dashboard</span>
      </div>
      <div className="flex items-center gap-4">
        <span className="text-sm text-gray-700 hidden sm:block">{user?.name}</span>
        <button
          onClick={handleLogout}
          className="px-3 py-1 rounded bg-red-500 hover:bg-red-600 text-white text-sm font-medium transition cursor-pointer"
        >
          Logout
        </button>
      </div>
    </header>
  )
}