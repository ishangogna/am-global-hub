'use client'

import { useEffect, useState } from 'react'
import { useRouter } from 'next/navigation'
import Image from 'next/image'
import { User, Mail, Phone, Bell, LogOut, Loader2, CheckCircle2, ChevronRight, Heart, FileText } from 'lucide-react'
import { createAuthClient } from '@/lib/supabase-auth'
import Link from 'next/link'

export default function AccountPage() {
  const router = useRouter()
  const supabase = createAuthClient()

  const [user, setUser] = useState<any>(null)
  const [customer, setCustomer] = useState<any>(null)
  const [loading, setLoading] = useState(true)
  const [saving, setSaving] = useState(false)
  const [saved, setSaved] = useState(false)
  const [firstName, setFirstName] = useState('')
  const [lastName, setLastName] = useState('')
  const [phone, setPhone] = useState('')
  const [newsletter, setNewsletter] = useState(true)
  const [savedProducts, setSavedProducts] = useState<any[]>([])
  const [quoteHistory, setQuoteHistory] = useState<any[]>([])

  useEffect(() => {
    async function load() {
      const { data: { user } } = await supabase.auth.getUser()
      if (!user) { router.replace('/auth'); return }
      setUser(user)

      const [{ data: cust }, { data: savedProds }, { data: quotes }] = await Promise.all([
        supabase.from('customers').select('*').eq('user_id', user.id).single(),
        supabase.from('saved_products').select('*, products(id, name, slug, image_url, price_range)').eq('user_id', user.id).order('created_at', { ascending: false }),
        supabase.from('quote_requests').select('*').eq('user_id', user.id).order('created_at', { ascending: false }).limit(10),
      ])

      setCustomer(cust)
      setFirstName(cust?.first_name ?? '')
      setLastName(cust?.last_name ?? '')
      setPhone(cust?.phone ?? '')
      setNewsletter(cust?.subscribed_newsletter ?? true)
      setSavedProducts(savedProds || [])
      setQuoteHistory(quotes || [])
      setLoading(false)
    }
    load()
  }, [])

  async function handleSaveProfile(e: React.FormEvent) {
    e.preventDefault()
    setSaving(true)
    await supabase
      .from('customers')
      .update({
        first_name: firstName.trim() || null,
        last_name: lastName.trim() || null,
        phone: phone.trim() || null,
      })
      .eq('user_id', user.id)
    setSaving(false)
    setSaved(true)
    setTimeout(() => setSaved(false), 3000)
  }

  async function handleToggleNewsletter() {
    const next = !newsletter
    setNewsletter(next)
    await supabase
      .from('customers')
      .update({ subscribed_newsletter: next })
      .eq('user_id', user.id)
  }

  async function handleSignOut() {
    await supabase.auth.signOut()
    router.push('/')
    router.refresh()
  }

  const inputCls = 'w-full rounded-xl border border-black/10 bg-[#FAF7F2] px-4 py-3 text-sm outline-none transition focus:border-[#B88A44] focus:ring-2 focus:ring-[#B88A44]/20'

  if (loading) {
    return (
      <div className="flex min-h-screen items-center justify-center bg-[#FAF7F2]">
        <Loader2 className="h-8 w-8 animate-spin text-[#B88A44]" />
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-[#FAF7F2]">
      {/* Breadcrumb */}
      <div className="border-b border-black/5 bg-white">
        <div className="container-premium flex items-center gap-2 py-3.5 text-xs text-[#667085]">
          <Link href="/" className="transition hover:text-[#B88A44]">Home</Link>
          <ChevronRight className="h-3 w-3" />
          <span className="text-[#0F172A]">My Account</span>
        </div>
      </div>

      <div className="container-premium py-12">
        <div className="mx-auto max-w-2xl space-y-6">

          {/* Header */}
          <div className="flex items-center justify-between">
            <div>
              <h1 className="text-3xl font-semibold text-[#0F172A]">
                {customer?.first_name ? `Hi, ${customer.first_name} 👋` : 'My Account'}
              </h1>
              <p className="mt-1 text-sm text-[#667085]">Manage your details and preferences.</p>
            </div>
            <button
              onClick={handleSignOut}
              className="flex items-center gap-2 rounded-xl border border-black/10 px-4 py-2.5 text-sm font-medium text-[#667085] transition hover:border-red-200 hover:bg-red-50 hover:text-red-600"
            >
              <LogOut className="h-4 w-4" />
              Sign Out
            </button>
          </div>

          {/* Email (read-only) */}
          <div className="rounded-2xl border border-black/5 bg-white p-6 shadow-sm">
            <div className="flex items-center gap-3">
              <div className="flex h-9 w-9 items-center justify-center rounded-xl bg-[#B88A44]/10">
                <Mail className="h-4 w-4 text-[#B88A44]" />
              </div>
              <div>
                <p className="text-xs text-[#667085]">Sign-in email</p>
                <p className="text-sm font-medium text-[#0F172A]">{user?.email}</p>
              </div>
            </div>
          </div>

          {/* Name + Phone */}
          <div className="rounded-2xl border border-black/5 bg-white p-6 shadow-sm">
            <div className="flex items-center gap-3 border-b border-black/5 pb-4">
              <div className="flex h-9 w-9 items-center justify-center rounded-xl bg-[#B88A44]/10">
                <User className="h-4 w-4 text-[#B88A44]" />
              </div>
              <div>
                <p className="text-sm font-semibold text-[#0F172A]">Personal Details</p>
                <p className="text-xs text-[#667085]">Your name and contact number</p>
              </div>
            </div>
            <form onSubmit={handleSaveProfile} className="mt-4 space-y-4">
              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="mb-1.5 block text-xs font-medium text-[#0F172A]">First Name</label>
                  <input
                    type="text"
                    value={firstName}
                    onChange={(e) => setFirstName(e.target.value)}
                    placeholder="Jane"
                    autoComplete="given-name"
                    className={inputCls}
                  />
                </div>
                <div>
                  <label className="mb-1.5 block text-xs font-medium text-[#0F172A]">Last Name</label>
                  <input
                    type="text"
                    value={lastName}
                    onChange={(e) => setLastName(e.target.value)}
                    placeholder="Doe"
                    autoComplete="family-name"
                    className={inputCls}
                  />
                </div>
              </div>
              <div>
                <label className="mb-1.5 block text-xs font-medium text-[#0F172A]">Phone Number</label>
                <input
                  type="tel"
                  value={phone}
                  onChange={(e) => setPhone(e.target.value)}
                  placeholder="+91 98765 43210"
                  className={inputCls}
                />
              </div>
              <button
                type="submit"
                disabled={saving}
                className="flex items-center gap-2 rounded-xl bg-[#B88A44] px-6 py-3 text-sm font-semibold text-white transition hover:opacity-90 disabled:opacity-60"
              >
                {saving ? <Loader2 className="h-4 w-4 animate-spin" /> : saved ? <><CheckCircle2 className="h-4 w-4" />Saved!</> : 'Save Changes'}
              </button>
            </form>
          </div>

          {/* Newsletter */}
          <div className="rounded-2xl border border-black/5 bg-white p-6 shadow-sm">
            <div className="flex items-center gap-3 border-b border-black/5 pb-4">
              <div className="flex h-9 w-9 items-center justify-center rounded-xl bg-[#B88A44]/10">
                <Bell className="h-4 w-4 text-[#B88A44]" />
              </div>
              <div>
                <p className="text-sm font-semibold text-[#0F172A]">Newsletter</p>
                <p className="text-xs text-[#667085]">New collections, offers, and gifting ideas</p>
              </div>
            </div>
            <div className="mt-4 flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-[#0F172A]">
                  {newsletter ? 'Subscribed' : 'Not subscribed'}
                </p>
                <p className="mt-0.5 text-xs text-[#667085]">
                  {newsletter
                    ? 'You\'ll receive occasional updates from AM Global Hub.'
                    : 'Subscribe to stay updated with new products and offers.'}
                </p>
              </div>
              <button
                onClick={handleToggleNewsletter}
                className={`relative h-7 w-12 rounded-full transition-colors duration-200 ${newsletter ? 'bg-[#B88A44]' : 'bg-black/20'}`}
              >
                <span className={`absolute left-0.5 top-0.5 h-6 w-6 rounded-full bg-white shadow transition-transform duration-200 ${newsletter ? 'translate-x-5' : 'translate-x-0'}`} />
              </button>
            </div>
          </div>

          {/* Saved Products */}
          {savedProducts.length > 0 && (
            <div className="rounded-2xl border border-black/5 bg-white p-6 shadow-sm">
              <div className="flex items-center gap-3 border-b border-black/5 pb-4">
                <div className="flex h-9 w-9 items-center justify-center rounded-xl bg-red-50">
                  <Heart className="h-4 w-4 text-red-500" />
                </div>
                <div>
                  <p className="text-sm font-semibold text-[#0F172A]">Saved Products</p>
                  <p className="text-xs text-[#667085]">{savedProducts.length} item{savedProducts.length !== 1 ? 's' : ''} saved</p>
                </div>
              </div>
              <div className="mt-4 space-y-3">
                {savedProducts.map((sp) => {
                  const prod = sp.products
                  if (!prod) return null
                  return (
                    <Link
                      key={sp.id}
                      href={`/products/${prod.slug}`}
                      className="flex items-center gap-4 rounded-xl border border-black/5 p-3 transition hover:border-[#B88A44]/30 hover:bg-[#FAF7F2]"
                    >
                      <div className="h-14 w-14 shrink-0 overflow-hidden rounded-lg bg-[#F8F5EF]">
                        {prod.image_url ? (
                          <img src={prod.image_url} alt={prod.name} className="h-full w-full object-contain p-1" />
                        ) : (
                          <div className="flex h-full items-center justify-center text-lg opacity-20">🎁</div>
                        )}
                      </div>
                      <div className="flex-1 min-w-0">
                        <p className="text-sm font-medium text-[#0F172A] truncate">{prod.name}</p>
                        {prod.price_range && <p className="text-xs text-[#B88A44] font-semibold">{prod.price_range}</p>}
                      </div>
                    </Link>
                  )
                })}
              </div>
            </div>
          )}

          {/* Quote History */}
          {quoteHistory.length > 0 && (
            <div className="rounded-2xl border border-black/5 bg-white p-6 shadow-sm">
              <div className="flex items-center gap-3 border-b border-black/5 pb-4">
                <div className="flex h-9 w-9 items-center justify-center rounded-xl bg-[#B88A44]/10">
                  <FileText className="h-4 w-4 text-[#B88A44]" />
                </div>
                <div>
                  <p className="text-sm font-semibold text-[#0F172A]">Quote History</p>
                  <p className="text-xs text-[#667085]">Your recent quote requests</p>
                </div>
              </div>
              <div className="mt-4 space-y-3">
                {quoteHistory.map((q) => (
                  <div key={q.id} className="rounded-xl border border-black/5 p-4">
                    <div className="flex items-start justify-between">
                      <div>
                        <p className="text-sm font-medium text-[#0F172A]">{q.product_name}</p>
                        <p className="mt-0.5 text-xs text-[#667085]">Qty: {q.quantity}</p>
                      </div>
                      <span className={`rounded-full px-2.5 py-0.5 text-[10px] font-semibold ${
                        q.status === 'pending' ? 'bg-amber-50 text-amber-600' :
                        q.status === 'responded' ? 'bg-blue-50 text-blue-600' :
                        q.status === 'confirmed' ? 'bg-green-50 text-green-600' :
                        q.status === 'completed' ? 'bg-[#B88A44]/10 text-[#B88A44]' :
                        'bg-black/5 text-[#667085]'
                      }`}>
                        {q.status?.charAt(0).toUpperCase() + q.status?.slice(1)}
                      </span>
                    </div>
                    <p className="mt-2 text-[10px] text-[#667085]">
                      {new Date(q.created_at).toLocaleDateString('en-IN', { day: 'numeric', month: 'short', year: 'numeric' })}
                    </p>
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* Member since */}
          {customer?.created_at && (
            <p className="text-center text-xs text-[#667085]">
              Member since {new Date(customer.created_at).toLocaleDateString('en-IN', { year: 'numeric', month: 'long', day: 'numeric' })}
            </p>
          )}

        </div>
      </div>
    </div>
  )
}
