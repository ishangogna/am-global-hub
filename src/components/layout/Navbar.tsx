'use client'

import Image from 'next/image'
import Link from 'next/link'
import { useState, useEffect } from 'react'
import { Menu, X, User } from 'lucide-react'
import { createAuthClient } from '@/lib/supabase-auth'

export default function Navbar() {
  const [open, setOpen] = useState(false)
  const [userEmail, setUserEmail] = useState<string | null>(null)
  const [firstName, setFirstName] = useState<string | null>(null)

  useEffect(() => {
    const supabase = createAuthClient()

    async function loadUser(userId?: string) {
      if (!userId) { setUserEmail(null); setFirstName(null); return }
      const { data } = await supabase
        .from('customers')
        .select('first_name')
        .eq('user_id', userId)
        .single()
      setFirstName(data?.first_name ?? null)
    }

    supabase.auth.getUser().then(({ data: { user } }) => {
      setUserEmail(user?.email ?? null)
      loadUser(user?.id)
    })

    const { data: { subscription } } = supabase.auth.onAuthStateChange((_event, session) => {
      setUserEmail(session?.user?.email ?? null)
      loadUser(session?.user?.id)
    })

    return () => subscription.unsubscribe()
  }, [])

  const navLinks = [
    { href: '/', label: 'Home' },
    { href: '/products', label: 'Products' },
    { href: '/contact', label: 'Contact' },
  ]

  return (
    <>
      {/* NAVBAR */}
      <header className='fixed top-0 z-50 w-full border-b border-black/5 bg-white/80 backdrop-blur-xl'>
        <div className='container-premium flex h-16 items-center justify-between md:h-20'>

          <Link href='/' className='flex items-center'>
            <Image
              src='/images/logo.png'
              alt='AM Global Hub'
              width={140}
              height={40}
              priority
              className='mix-blend-multiply'
              style={{ background: 'transparent' }}
            />
          </Link>

          {/* DESKTOP NAV */}
          <nav className='hidden items-center gap-8 lg:flex'>
            {navLinks.map(({ href, label }) => (
              <Link
                key={href}
                href={href}
                className='text-sm font-medium text-[#667085] transition hover:text-[#B88A44]'
              >
                {label}
              </Link>
            ))}

            {/* Account / Sign In */}
            {userEmail ? (
              <Link
                href='/account'
                className='flex items-center gap-2 rounded-xl border border-black/10 px-4 py-2.5 text-sm font-medium text-[#0F172A] transition hover:border-[#B88A44] hover:text-[#B88A44]'
              >
                <User className='h-4 w-4' />
                {firstName ?? 'Account'}
              </Link>
            ) : (
              <Link
                href='/auth'
                className='flex items-center gap-2 rounded-xl border border-black/10 px-4 py-2.5 text-sm font-medium text-[#667085] transition hover:border-[#B88A44] hover:text-[#B88A44]'
              >
                <User className='h-4 w-4' />
                Sign In
              </Link>
            )}

            <Link
              href='/contact'
              className='rounded-xl bg-[#B88A44] px-6 py-3 text-sm font-medium text-white transition hover:opacity-90'
            >
              Request Quote
            </Link>
          </nav>

          {/* MOBILE MENU BUTTON */}
          <button
            onClick={() => setOpen(!open)}
            className='flex h-11 w-11 items-center justify-center rounded-xl border border-black/10 bg-white lg:hidden'
          >
            {open ? <X className='h-5 w-5' /> : <Menu className='h-5 w-5' />}
          </button>
        </div>
      </header>

      {/* MOBILE MENU */}
      <div
        className={`fixed inset-0 z-40 bg-black/40 backdrop-blur-sm transition-all duration-300 lg:hidden ${open ? 'visible opacity-100' : 'invisible opacity-0'}`}
        onClick={() => setOpen(false)}
      >
        <div
          onClick={(e) => e.stopPropagation()}
          className={`absolute right-0 top-0 h-full w-[82%] max-w-[340px] bg-white p-8 shadow-2xl transition-transform duration-300 ${open ? 'translate-x-0' : 'translate-x-full'}`}
        >
          {/* TOP */}
          <div className='flex items-center justify-between'>
            <div>
              <h2 className='text-lg font-semibold text-[#111827]'>AM Global Hub</h2>
              <p className='mt-1 text-xs uppercase tracking-[0.25em] text-[#B88A44]'>
                Corporate Gifting
              </p>
            </div>
            <button
              onClick={() => setOpen(false)}
              className='flex h-10 w-10 items-center justify-center rounded-xl border border-black/10'
            >
              <X className='h-5 w-5' />
            </button>
          </div>

          {/* LINKS */}
          <nav className='mt-12 flex flex-col gap-5'>
            {navLinks.map(({ href, label }) => (
              <Link
                key={href}
                href={href}
                onClick={() => setOpen(false)}
                className='text-base font-medium text-[#111827]'
              >
                {label}
              </Link>
            ))}
            <Link
              href={userEmail ? '/account' : '/auth'}
              onClick={() => setOpen(false)}
              className='flex items-center gap-2 text-base font-medium text-[#111827]'
            >
              <User className='h-4 w-4' />
              {userEmail ? 'My Account' : 'Sign In'}
            </Link>
          </nav>

          {/* CTA */}
          <Link
            href='/contact'
            onClick={() => setOpen(false)}
            className='mt-10 inline-flex w-full items-center justify-center rounded-xl bg-[#B88A44] px-6 py-4 text-sm font-medium text-white transition hover:opacity-90'
          >
            Request Quote
          </Link>
        </div>
      </div>
    </>
  )
}
