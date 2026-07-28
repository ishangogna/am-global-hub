'use client'

import { motion } from 'framer-motion'
import Link from 'next/link'
import { ArrowRight, MessageCircle } from 'lucide-react'

export default function CTABanner() {
  return (
    <section className='relative overflow-hidden bg-gradient-to-br from-[#B88A44] via-[#C99B55] to-[#A07936] py-24 lg:py-28'>
      {/* Background shapes */}
      <div className='absolute -left-32 -top-32 h-[400px] w-[400px] rounded-full border border-white/10' />
      <div className='absolute -bottom-40 -right-40 h-[500px] w-[500px] rounded-full border border-white/10' />
      <div className='absolute inset-0 bg-[radial-gradient(ellipse_at_center,rgba(255,255,255,0.1)_0%,transparent_70%)]' />

      <div className='container-premium relative text-center'>
        <motion.div
          initial={{ opacity: 0, translateY: 20 }}
          whileInView={{ opacity: 1, translateY: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
        >
          <h2 className='text-4xl font-bold text-white md:text-5xl lg:text-6xl'>
            Ready to Elevate Your
            <span className='block mt-1'>Corporate Gifting?</span>
          </h2>
          <p className='mx-auto mt-6 max-w-xl text-base leading-7 text-white/75 md:text-lg'>
            Join 100+ businesses that trust AM Global Hub for premium, personalised
            gifting experiences. Let's create something memorable.
          </p>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, translateY: 15 }}
          whileInView={{ opacity: 1, translateY: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8, ease: [0.25, 0.1, 0.25, 1], delay: 0.2 }}
          className='mt-10 flex flex-col items-center justify-center gap-4 sm:flex-row'
        >
          <Link
            href='/products'
            className='group flex items-center gap-2 rounded-2xl bg-white px-8 py-4 text-sm font-bold text-[#B88A44] shadow-xl transition-all hover:scale-[1.02] hover:shadow-2xl'
          >
            Explore Products
            <ArrowRight className='h-4 w-4 transition-transform group-hover:translate-x-1' />
          </Link>
          <a
            href='https://wa.me/918168667321?text=Hi%2C%20I%27m%20interested%20in%20your%20corporate%20gifting%20solutions.'
            target='_blank'
            rel='noopener noreferrer'
            className='flex items-center gap-2 rounded-2xl border-2 border-white/25 bg-white/10 px-8 py-4 text-sm font-bold text-white transition-all hover:bg-white/20 hover:border-white/40'
          >
            <MessageCircle className='h-4 w-4' />
            WhatsApp Us
          </a>
        </motion.div>

        {/* Trust badges */}
        <motion.div
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          transition={{ delay: 0.4 }}
          className='mt-14 flex flex-wrap items-center justify-center gap-x-8 gap-y-3 text-sm text-white/50'
        >
          {['Pan India Delivery', 'Custom Branding', 'Bulk Order Ready', '7–14 Day Turnaround'].map((badge) => (
            <span key={badge} className='flex items-center gap-2'>
              <span className='h-1.5 w-1.5 rounded-full bg-white/60' />
              {badge}
            </span>
          ))}
        </motion.div>
      </div>
    </section>
  )
}
