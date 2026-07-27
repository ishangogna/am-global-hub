'use client'

import { useMemo } from 'react'
import {
  BarChart, Bar, LineChart, Line, PieChart, Pie, Cell,
  XAxis, YAxis, Tooltip, ResponsiveContainer, CartesianGrid, Legend,
} from 'recharts'
import { TrendingUp, PieChart as PieIcon, Package, Users } from 'lucide-react'

const GOLD = '#B88A44'
const DARK = '#0F172A'
const MUTED = '#667085'
const GREEN = '#25D366'
const BLUE = '#3B82F6'
const RED = '#EF4444'
const AMBER = '#F59E0B'
const CREAM = '#FAF7F2'

const PIE_COLORS = [AMBER, BLUE, GREEN, GOLD, MUTED]

interface Props {
  quotes: any[]
  customers: any[]
  products: any[]
}

function getWeekLabel(date: Date): string {
  const start = new Date(date)
  start.setDate(start.getDate() - start.getDay())
  return start.toLocaleDateString('en-IN', { day: 'numeric', month: 'short' })
}

export default function StatsTab({ quotes, customers, products }: Props) {

  // ── Quotes over time (last 8 weeks) ──────────────────────────────────────
  const quotesOverTime = useMemo(() => {
    const weeks: Record<string, number> = {}
    const now = new Date()
    // Init last 8 weeks
    for (let i = 7; i >= 0; i--) {
      const d = new Date(now)
      d.setDate(d.getDate() - i * 7)
      weeks[getWeekLabel(d)] = 0
    }
    quotes.forEach((q) => {
      const label = getWeekLabel(new Date(q.created_at))
      if (label in weeks) weeks[label]++
    })
    return Object.entries(weeks).map(([week, count]) => ({ week, quotes: count }))
  }, [quotes])

  // ── Quote status breakdown ────────────────────────────────────────────────
  const statusBreakdown = useMemo(() => {
    const counts: Record<string, number> = { pending: 0, responded: 0, confirmed: 0, completed: 0, cancelled: 0 }
    quotes.forEach((q) => {
      const s = q.status || 'pending'
      counts[s] = (counts[s] || 0) + 1
    })
    return Object.entries(counts)
      .filter(([_, v]) => v > 0)
      .map(([name, value]) => ({ name: name.charAt(0).toUpperCase() + name.slice(1), value }))
  }, [quotes])

  // ── Top requested products ────────────────────────────────────────────────
  const topProducts = useMemo(() => {
    const counts: Record<string, number> = {}
    quotes.forEach((q) => {
      const name = q.product_name || 'Unknown'
      counts[name] = (counts[name] || 0) + 1
    })
    return Object.entries(counts)
      .sort((a, b) => b[1] - a[1])
      .slice(0, 6)
      .map(([name, count]) => ({ name: name.length > 20 ? name.slice(0, 20) + '…' : name, quotes: count }))
  }, [quotes])

  // ── User signups over time (last 8 weeks) ────────────────────────────────
  const signupsOverTime = useMemo(() => {
    const weeks: Record<string, number> = {}
    const now = new Date()
    for (let i = 7; i >= 0; i--) {
      const d = new Date(now)
      d.setDate(d.getDate() - i * 7)
      weeks[getWeekLabel(d)] = 0
    }
    customers.forEach((c) => {
      if (!c.created_at) return
      const label = getWeekLabel(new Date(c.created_at))
      if (label in weeks) weeks[label]++
    })
    return Object.entries(weeks).map(([week, count]) => ({ week, signups: count }))
  }, [customers])

  const chartCard = "rounded-2xl border border-black/5 bg-white p-6 shadow-sm"

  return (
    <div className="space-y-6">

      {/* Summary cards */}
      <div className="grid grid-cols-2 gap-4 sm:grid-cols-4">
        <div className={chartCard}>
          <p className="text-xs text-[#667085]">Total Quotes</p>
          <p className="mt-1 text-2xl font-bold text-[#0F172A]">{quotes.length}</p>
        </div>
        <div className={chartCard}>
          <p className="text-xs text-[#667085]">Pending Quotes</p>
          <p className="mt-1 text-2xl font-bold text-amber-500">{quotes.filter((q) => q.status === 'pending').length}</p>
        </div>
        <div className={chartCard}>
          <p className="text-xs text-[#667085]">Total Users</p>
          <p className="mt-1 text-2xl font-bold text-[#0F172A]">{customers.length}</p>
        </div>
        <div className={chartCard}>
          <p className="text-xs text-[#667085]">Conversion Rate</p>
          <p className="mt-1 text-2xl font-bold text-[#25D366]">
            {quotes.length > 0 ? Math.round((quotes.filter((q) => q.status === 'completed').length / quotes.length) * 100) : 0}%
          </p>
        </div>
      </div>

      <div className="grid gap-6 lg:grid-cols-2">

        {/* Quotes over time */}
        <div className={chartCard}>
          <div className="mb-4 flex items-center gap-2">
            <TrendingUp className="h-4 w-4 text-[#B88A44]" />
            <h3 className="text-sm font-semibold text-[#0F172A]">Quote Requests (Last 8 Weeks)</h3>
          </div>
          <ResponsiveContainer width="100%" height={220}>
            <BarChart data={quotesOverTime}>
              <CartesianGrid strokeDasharray="3 3" stroke="#E2D9CE" vertical={false} />
              <XAxis dataKey="week" tick={{ fontSize: 11, fill: MUTED }} axisLine={false} tickLine={false} />
              <YAxis tick={{ fontSize: 11, fill: MUTED }} axisLine={false} tickLine={false} allowDecimals={false} />
              <Tooltip
                contentStyle={{ borderRadius: 12, border: '1px solid #E2D9CE', fontSize: 12 }}
                cursor={{ fill: '#FAF7F2' }}
              />
              <Bar dataKey="quotes" fill={GOLD} radius={[6, 6, 0, 0]} />
            </BarChart>
          </ResponsiveContainer>
        </div>

        {/* Quote status breakdown */}
        <div className={chartCard}>
          <div className="mb-4 flex items-center gap-2">
            <PieIcon className="h-4 w-4 text-[#B88A44]" />
            <h3 className="text-sm font-semibold text-[#0F172A]">Quote Status Breakdown</h3>
          </div>
          {statusBreakdown.length > 0 ? (
            <ResponsiveContainer width="100%" height={220}>
              <PieChart>
                <Pie
                  data={statusBreakdown}
                  cx="50%"
                  cy="50%"
                  innerRadius={50}
                  outerRadius={85}
                  dataKey="value"
                  nameKey="name"
                  stroke="none"
                >
                  {statusBreakdown.map((_, i) => (
                    <Cell key={i} fill={PIE_COLORS[i % PIE_COLORS.length]} />
                  ))}
                </Pie>
                <Tooltip contentStyle={{ borderRadius: 12, border: '1px solid #E2D9CE', fontSize: 12 }} />
                <Legend iconType="circle" wrapperStyle={{ fontSize: 11 }} />
              </PieChart>
            </ResponsiveContainer>
          ) : (
            <div className="flex h-[220px] items-center justify-center text-sm text-[#667085]">No data yet</div>
          )}
        </div>

        {/* User signups over time */}
        <div className={chartCard}>
          <div className="mb-4 flex items-center gap-2">
            <Users className="h-4 w-4 text-[#B88A44]" />
            <h3 className="text-sm font-semibold text-[#0F172A]">User Signups (Last 8 Weeks)</h3>
          </div>
          <ResponsiveContainer width="100%" height={220}>
            <LineChart data={signupsOverTime}>
              <CartesianGrid strokeDasharray="3 3" stroke="#E2D9CE" vertical={false} />
              <XAxis dataKey="week" tick={{ fontSize: 11, fill: MUTED }} axisLine={false} tickLine={false} />
              <YAxis tick={{ fontSize: 11, fill: MUTED }} axisLine={false} tickLine={false} allowDecimals={false} />
              <Tooltip contentStyle={{ borderRadius: 12, border: '1px solid #E2D9CE', fontSize: 12 }} />
              <Line type="monotone" dataKey="signups" stroke={GREEN} strokeWidth={2.5} dot={{ fill: GREEN, r: 4 }} />
            </LineChart>
          </ResponsiveContainer>
        </div>

        {/* Top requested products */}
        <div className={chartCard}>
          <div className="mb-4 flex items-center gap-2">
            <Package className="h-4 w-4 text-[#B88A44]" />
            <h3 className="text-sm font-semibold text-[#0F172A]">Top Requested Products</h3>
          </div>
          {topProducts.length > 0 ? (
            <ResponsiveContainer width="100%" height={220}>
              <BarChart data={topProducts} layout="vertical">
                <CartesianGrid strokeDasharray="3 3" stroke="#E2D9CE" horizontal={false} />
                <XAxis type="number" tick={{ fontSize: 11, fill: MUTED }} axisLine={false} tickLine={false} allowDecimals={false} />
                <YAxis type="category" dataKey="name" tick={{ fontSize: 10, fill: MUTED }} axisLine={false} tickLine={false} width={120} />
                <Tooltip contentStyle={{ borderRadius: 12, border: '1px solid #E2D9CE', fontSize: 12 }} />
                <Bar dataKey="quotes" fill={BLUE} radius={[0, 6, 6, 0]} />
              </BarChart>
            </ResponsiveContainer>
          ) : (
            <div className="flex h-[220px] items-center justify-center text-sm text-[#667085]">No quote data yet</div>
          )}
        </div>

      </div>
    </div>
  )
}
