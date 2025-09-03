import React, { useEffect, useState } from 'react'
import { useAuth } from '../context/AuthContext'

export default function Profile() {
  const { user } = useAuth()
  const [profile, setProfile] = useState(null)

  useEffect(() => {
    let mounted = true
    async function load() {
      if (!user) return
      try {
        const res = await fetch('https://jsonplaceholder.typicode.com/users')
        const arr = await res.json()
        const found = arr.find((u) => u.email.toLowerCase() === user.email.toLowerCase())
        if (mounted) setProfile(found || { name: user.name, email: user.email })
      } catch (err) {
        if (mounted) setProfile({ name: user.name, email: user.email })
      }
    }
    load()
    return () => (mounted = false)
  }, [user])

  if (!profile) return <div className="p-6">Loading...</div>

  return (
    <div className="p-6">
      <div className="max-w-2xl bg-white rounded shadow p-6">
        <h2 className="text-xl font-semibold mb-4">Profile</h2>
        <div className="space-y-2 text-sm text-gray-700">
          <div><span className="font-medium">Name:</span> {profile.name}</div>
          <div><span className="font-medium">Email:</span> {profile.email}</div>
          {profile.phone && <div><span className="font-medium">Phone:</span> {profile.phone}</div>}
          {profile.website && <div><span className="font-medium">Website:</span> {profile.website}</div>}
          {profile.company && <div><span className="font-medium">Company:</span> {profile.company.name}</div>}
          {profile.address && <div><span className="font-medium">Address:</span> {profile.address.street}, {profile.address.city}</div>}
        </div>
      </div>
    </div>
  )
}
