'use client'

import Image from 'next/image'
import Link from 'next/link'
import { useState } from 'react'
import { Menu, X } from 'lucide-react'

export default function Navbar() {
  const [open, setOpen] = useState(false)

  return (
    <>
      {/* NAVBAR */}
      <header className='fixed top-0 z-50 w-full border-b border-black/5 bg-white/80 backdrop-blur-xl'>
        <div className='container-premium flex h-16 items-center justify-between md:h-20'>
          {/* LOGO */}
          {/* <Link
            href='/'
            className='flex flex-col'
          >
            <span className='text-base font-semibold tracking-wide text-[#111827] md:text-lg'>
              AM GLOBAL HUB2
            </span>

            <span className='text-[10px] uppercase tracking-[0.3em] text-[#B88A44] md:text-xs'>
              Corporate Gifting
            </span>
          </Link> */}

          <Link href='/'>
  <Image
    src='/images/logo.png'
    alt='AM Global Hub'
    width={140}
    height={40}
    priority
  />
</Link>

          {/* DESKTOP NAV */}
          <nav className='hidden items-center gap-8 lg:flex'>
            <Link
              href='/'
              className='text-sm font-medium text-[#667085] transition hover:text-[#B88A44]'
            >
              Home
            </Link>

            <Link
              href='/products'
              className='text-sm font-medium text-[#667085] transition hover:text-[#B88A44]'
            >
              Products
            </Link>

            <Link
              href='/contact'
              className='text-sm font-medium text-[#667085] transition hover:text-[#B88A44]'
            >
              Contact
            </Link>

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
            {open ? (
              <X className='h-5 w-5' />
            ) : (
              <Menu className='h-5 w-5' />
            )}
          </button>
        </div>
      </header>

      {/* MOBILE MENU */}
      <div
        className={`
          fixed inset-0 z-40 bg-black/40 backdrop-blur-sm transition-all duration-300 lg:hidden
          ${open ? 'visible opacity-100' : 'invisible opacity-0'}
        `}
        onClick={() => setOpen(false)}
      >
        <div
          onClick={(e) => e.stopPropagation()}
          className={`
            absolute right-0 top-0 h-full w-[82%] max-w-[340px]
            bg-white p-8 shadow-2xl transition-transform duration-300
            ${open ? 'translate-x-0' : 'translate-x-full'}
          `}
        >
          {/* TOP */}
          <div className='flex items-center justify-between'>
            <div>
              <h2 className='text-lg font-semibold text-[#111827]'>
                AM GLOBAL HUB2
              </h2>

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
            <Link
              href='/'
              onClick={() => setOpen(false)}
              className='text-base font-medium text-[#111827]'
            >
              Home
            </Link>

            <Link
              href='/products'
              onClick={() => setOpen(false)}
              className='text-base font-medium text-[#111827]'
            >
              Products
            </Link>

            <Link
              href='/contact'
              onClick={() => setOpen(false)}
              className='text-base font-medium text-[#111827]'
            >
              Contact
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