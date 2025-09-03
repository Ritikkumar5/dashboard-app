import React, { createContext, useContext, useEffect, useState } from 'react'
import { toast } from 'react-toastify'

const AuthContext = createContext()

export function AuthProvider({ children }) {
  const [user, setUser] = useState(null)

  useEffect(() => {
    const stored = localStorage.getItem('authUser')
    if (stored) setUser(JSON.parse(stored))

    const regs = JSON.parse(localStorage.getItem('registeredUsers') || '[]')
    if (!regs || regs.length === 0) {
      const demo = { id: 1, name: 'Demo User', email: 'demo@demo.com', password: 'demo123' }
      localStorage.setItem('registeredUsers', JSON.stringify([demo]))
    }
  }, [])

  function signup({ name, email, password }) {
    if (!name || !email || !password) {
      toast.error('Please fill all fields')
      return { success: false }
    }
    const regs = JSON.parse(localStorage.getItem('registeredUsers') || '[]')
    if (regs.find((u) => u.email.toLowerCase() === email.toLowerCase())) {
      toast.error('Email already registered')
      return { success: false }
    }
    const newUser = { id: Date.now(), name, email, password }
    regs.push(newUser)
    localStorage.setItem('registeredUsers', JSON.stringify(regs))
    toast.success('Signup successful — please login')
    return { success: true }
  }

  function login({ email, password }) {
    if (!email || !password) {
      toast.error('Please fill all fields')
      return { success: false }
    }
    const regs = JSON.parse(localStorage.getItem('registeredUsers') || '[]')
    const found = regs.find((u) => u.email.toLowerCase() === email.toLowerCase() && u.password === password)
    if (found) {
      const safe = { id: found.id, name: found.name, email: found.email }
      setUser(safe)
      localStorage.setItem('authUser', JSON.stringify(safe))
      toast.success('Login successful')
      return { success: true }
    } else {
      toast.error('Invalid credentials')
      return { success: false }
    }
  }

  function logout() {
    setUser(null)
    localStorage.removeItem('authUser')
    toast.info('Logged out')
  }

  return <AuthContext.Provider value={{ user, login, signup, logout }}>{children}</AuthContext.Provider>
}

export function useAuth() {
  return useContext(AuthContext)
}
