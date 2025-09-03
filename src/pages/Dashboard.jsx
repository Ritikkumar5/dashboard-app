import React from 'react'
import DashboardCards from '../components/DashboardCards'
import ChartComponent from '../components/ChartComponent'

export default function Dashboard() {
  return (
    <div className="space-y-6">
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-4">
        <div className="lg:col-span-2">
          <h2 className="text-xl font-semibold mb-3">Overview</h2>
          <DashboardCards />
        </div>

        <div className="bg-white rounded shadow p-4">
          <h3 className="font-semibold mb-2">Quick Info</h3>
          <p className="text-sm text-gray-600">Navbar is fixed at top. Sidebar is below navbar on the left. Open on mobile with the menu button.</p>
        </div>
      </div>

      <div className="bg-white rounded shadow p-4">
        <h3 className="font-semibold mb-4">Posts per User</h3>
        <ChartComponent />
      </div>
    </div>
  )
}
