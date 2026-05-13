'use client'
import { Search, ShoppingBag } from 'lucide-react'
import { motion } from 'framer-motion'
import Link from 'next/link'

export default function Navbar() {
  return (
    <motion.header
      initial={{ y: -40, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      className='sticky top-0 z-50 border-b border-black/5 bg-white/80 backdrop-blur-xl'
    >
      <div className='container-premium flex h-20 items-center justify-between'>
        <Link href='/' className='flex flex-col'>
          <span className='text-lg font-semibold tracking-wide text-gold'>
            AM GLOBAL HUB
          </span>
          <span className='text-xs uppercase tracking-[0.3em] text-muted'>
            Corporate Gifting
          </span>
        </Link>

        <nav className='hidden items-center gap-10 lg:flex'>
          <Link href='/' className='text-sm font-medium hover:text-gold'>
            Home
          </Link>

          <Link
            href='/products'
            className='text-sm font-medium hover:text-gold'
          >
            Products
          </Link>

          <Link
            href='/about'
            className='text-sm font-medium hover:text-gold'
          >
            About Us
          </Link>

          <Link
            href='/contact'
            className='text-sm font-medium hover:text-gold'
          >
            Contact
          </Link>
        </nav>

        <div className='flex items-center gap-5'>
          <Search className='h-5 w-5 cursor-pointer' />
          <ShoppingBag className='h-5 w-5 cursor-pointer' />

          <button className='rounded-xl bg-gold px-6 py-3 text-sm font-medium text-white transition hover:scale-105'>
            Get Quote
          </button>
        </div>
      </div>
    </motion.header>
  )
}