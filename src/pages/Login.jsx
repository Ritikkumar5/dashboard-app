import React, { useEffect, useState } from 'react'
import { Link, useLocation, useNavigate } from 'react-router-dom'
import { useAuth } from '../context/AuthContext'

export default function Login() {
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const { user, login } = useAuth()
  const navigate = useNavigate()
  const location = useLocation()
  const from = location.state?.from?.pathname || '/dashboard'

  useEffect(() => {
    if (user) navigate('/dashboard', { replace: true })
  }, [user, navigate])

  function handleSubmit(e) {
    e.preventDefault()
    const res = login({ email, password })
    if (res.success) navigate(from, { replace: true })
  }

  return (
    <div className="min-h-screen flex items-center justify-center p-4">
      <div className="w-full max-w-md bg-white rounded shadow p-6">
        <h1 className="text-2xl font-bold mb-4">Login</h1>
        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <label className="block text-sm font-medium">Email</label>
            <input value={email} onChange={(e) => setEmail(e.target.value)} className="mt-1 w-full border rounded p-2" type="email" placeholder="demo@demo.com" />
          </div>
          <div>
            <label className="block text-sm font-medium">Password</label>
            <input value={password} onChange={(e) => setPassword(e.target.value)} className="mt-1 w-full border rounded p-2" type="password" placeholder="demo123" />
          </div>
          <button type="submit" className="w-full py-2 bg-blue-600 text-white rounded">Login</button>
        </form>
        <p className="mt-4 text-sm">Don't have an account? <Link to="/signup" className="text-blue-600">Sign up</Link></p>
        <p className="mt-2 text-xs text-gray-500">Demo: demo@demo.com / demo123</p>
      </div>
    </div>
  )
}
