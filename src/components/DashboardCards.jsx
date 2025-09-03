import React, { useEffect, useState } from 'react'

export default function DashboardCards() {
  const [users, setUsers] = useState([])
  const [posts, setPosts] = useState([])
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    let mounted = true
    async function fetchAll() {
      try {
        const [uRes, pRes] = await Promise.all([
          fetch('https://jsonplaceholder.typicode.com/users'),
          fetch('https://jsonplaceholder.typicode.com/posts'),
        ])
        if (!mounted) return
        const [uData, pData] = await Promise.all([uRes.json(), pRes.json()])
        setUsers(uData)
        setPosts(pData)
        setLoading(false)
      } catch (err) {
        console.error(err)
      }
    }
    fetchAll()
    return () => (mounted = false)
  }, [])

  if (loading) {
    return <div className="p-4 bg-white rounded shadow">Loading...</div>
  }

  const totalUsers = users.length
  const totalPosts = posts.length
  const avgPosts = totalUsers ? Math.round(totalPosts / totalUsers) : 0

  return (
    <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
      <div className="p-4 bg-white rounded shadow">
        <div className="text-sm text-gray-500">Users</div>
        <div className="text-2xl font-bold">{totalUsers}</div>
      </div>
      <div className="p-4 bg-white rounded shadow">
        <div className="text-sm text-gray-500">Posts</div>
        <div className="text-2xl font-bold">{totalPosts}</div>
      </div>
      <div className="p-4 bg-white rounded shadow">
        <div className="text-sm text-gray-500">Avg posts/user</div>
        <div className="text-2xl font-bold">{avgPosts}</div>
      </div>
    </div>
  )
}
