'use client'

import { motion } from 'framer-motion'
import Image from 'next/image'
import Link from 'next/link'

interface HeroProps {
  hero?: {
    title?: string
    subtitle?: string
    description?: string
    image_url?: string
    button_text?: string
    button_link?: string
  } | null
}

export default function Hero({ hero }: HeroProps) {
  return (
    <section className='overflow-hidden bg-[#F7F3EE]'>
      <div className='container-premium grid items-center gap-12 py-10 md:py-16 lg:min-h-screen lg:grid-cols-2 lg:gap-20'>
        {/* LEFT CONTENT */}
        <motion.div
          initial={{ opacity: 0, y: 40 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7 }}
          className='order-2 max-w-2xl lg:order-1'
        >
          {/* BADGE */}
          <span className='inline-flex rounded-full border border-[#B88A44]/15 bg-[#B88A44]/10 px-4 py-2 text-xs font-medium text-[#B88A44] md:text-sm'>
            {hero?.subtitle || 'Premium Corporate Gifting'}
          </span>

          {/* TITLE */}
          <h1 className='mt-5 text-[2.2rem] font-semibold leading-[1.08] tracking-tight text-[#111827] sm:text-5xl lg:text-6xl'>
            {hero?.title ||
              'Premium Corporate Gifts That Build Relationships'}
          </h1>

          {/* DESCRIPTION */}
          <p className='mt-6 max-w-xl text-[15px] leading-7 text-[#667085] md:text-lg md:leading-8'>
            {hero?.description ||
              'Curated executive gifting experiences for employees, clients, partners, and corporate events.'}
          </p>

          {/* BUTTONS */}
          <div className='mt-8 flex flex-col gap-3 sm:flex-row sm:items-center'>
            <Link
              href={hero?.button_link || '/products'}
              className='flex items-center justify-center rounded-xl bg-[#B88A44] px-6 py-3 text-sm font-medium text-white transition hover:opacity-90 md:px-8 md:py-4'
            >
              {hero?.button_text || 'Explore Collection'}
            </Link>

            <Link
              href='/contact'
              className='flex items-center justify-center rounded-xl border border-black/10 bg-white px-6 py-3 text-sm font-medium text-[#111827] transition hover:bg-black hover:text-white md:px-8 md:py-4'
            >
              Talk To Our Team
            </Link>
          </div>

          {/* STATS */}
          <div className='mt-10 grid grid-cols-2 gap-5 sm:grid-cols-4'>
            <div>
              <h3 className='text-2xl font-semibold text-[#B88A44] md:text-3xl'>
                100+
              </h3>

              <p className='mt-1 text-xs text-[#667085] md:text-sm'>
                Happy Clients
              </p>
            </div>

            <div>
              <h3 className='text-2xl font-semibold text-[#B88A44] md:text-3xl'>
                1K+
              </h3>

              <p className='mt-1 text-xs text-[#667085] md:text-sm'>
                Orders Delivered
              </p>
            </div>

            <div>
              <h3 className='text-2xl font-semibold text-[#B88A44] md:text-3xl'>
                50+
              </h3>

              <p className='mt-1 text-xs text-[#667085] md:text-sm'>
                Corporate Partners
              </p>
            </div>

            <div>
              <h3 className='text-2xl font-semibold text-[#B88A44] md:text-3xl'>
                99%
              </h3>

              <p className='mt-1 text-xs text-[#667085] md:text-sm'>
                Client Satisfaction
              </p>
            </div>
          </div>
        </motion.div>

        {/* RIGHT IMAGE */}
        <motion.div
          initial={{ opacity: 0, scale: 0.96 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.7 }}
          className='order-1 mx-auto w-full max-w-[620px] lg:order-2'
        >
          {/* GLOW */}
          <div className='absolute inset-0 rounded-[40px] bg-[#B88A44]/10 blur-3xl' />

          {/* IMAGE CARD */}
          <div className='relative overflow-hidden rounded-[28px] border border-white/40 bg-white p-3 shadow-2xl md:rounded-[36px] md:p-5'>
            <Image
              src={hero?.image_url || '/images/hero-gift.png'}
              alt='Corporate gifting'
              width={1200}
              height={1200}
              priority
              className='h-[260px] w-full rounded-[22px] object-cover sm:h-[360px] md:h-[460px] lg:h-[560px]'
            />
          </div>
        </motion.div>
      </div>
    </section>
  )
}