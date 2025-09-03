import React, { useEffect, useState } from 'react'
import { ResponsiveContainer, BarChart, Bar, XAxis, YAxis, Tooltip, CartesianGrid } from 'recharts'

export default function ChartComponent() {
  const [data, setData] = useState([])

  useEffect(() => {
    let mounted = true
    async function load() {
      try {
        const [usersRes, postsRes] = await Promise.all([
          fetch('https://jsonplaceholder.typicode.com/users'),
          fetch('https://jsonplaceholder.typicode.com/posts'),
        ])
        const [users, posts] = await Promise.all([usersRes.json(), postsRes.json()])
        if (!mounted) return
        const counts = users.map((u) => {
          return { name: u.username, posts: posts.filter((p) => p.userId === u.id).length }
        })
        setData(counts)
      } catch (err) {
        console.error(err)
      }
    }
    load()
    return () => (mounted = false)
  }, [])

  if (data.length === 0) return <div>Loading chart...</div>

  return (
    <div style={{ width: '100%', height: 360 }}>
      <ResponsiveContainer>
        <BarChart data={data}>
          <CartesianGrid strokeDasharray="3 3" />
          <XAxis dataKey="name" interval={0} tick={{ fontSize: 12 }} />
          <YAxis />
          <Tooltip />
          <Bar dataKey="posts" />
        </BarChart>
      </ResponsiveContainer>
    </div>
  )
}
