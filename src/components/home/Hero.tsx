'use client'

import { motion, useMotionValue, useTransform, animate } from 'framer-motion'
import { useEffect, useRef } from 'react'
import Image from 'next/image'
import Link from 'next/link'
import { ArrowRight, Sparkles } from 'lucide-react'

function AnimatedCounter({ target, suffix = '' }: { target: number; suffix?: string }) {
  const count = useMotionValue(0)
  const rounded = useTransform(count, (v) => Math.round(v))
  const ref = useRef<HTMLSpanElement>(null)

  useEffect(() => {
    const controls = animate(count, target, { duration: 2, ease: 'easeOut' })
    return controls.stop
  }, [target])

  useEffect(() => {
    const unsubscribe = rounded.on('change', (v) => {
      if (ref.current) ref.current.textContent = `${v}${suffix}`
    })
    return unsubscribe
  }, [rounded, suffix])

  return <span ref={ref}>0{suffix}</span>
}

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
    <section className='relative overflow-hidden bg-gradient-to-br from-[#F7F3EE] via-[#FBF8F3] to-[#F0EBE1]'>
      {/* Decorative elements */}
      <div className='absolute inset-0 overflow-hidden pointer-events-none'>
        <div className='absolute -right-40 -top-40 h-[600px] w-[600px] rounded-full bg-gradient-to-br from-[#B88A44]/5 to-transparent' />
        <div className='absolute -bottom-60 -left-60 h-[500px] w-[500px] rounded-full bg-gradient-to-tr from-[#B88A44]/8 to-transparent' />
        <div className='absolute left-1/2 top-1/3 h-72 w-72 -translate-x-1/2 rounded-full bg-[#B88A44]/5 blur-[100px]' />
      </div>

      <div className='container-premium relative grid items-center gap-12 py-16 md:py-20 lg:min-h-[92vh] lg:grid-cols-2 lg:gap-16'>
        {/* LEFT CONTENT */}
        <motion.div
          initial={{ opacity: 0, y: 50 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, ease: [0.22, 1, 0.36, 1] }}
          className='relative z-10 order-2 max-w-2xl lg:order-1'
        >
          {/* BADGE */}
          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ delay: 0.2, duration: 0.5 }}
          >
            <span className='inline-flex items-center gap-2 rounded-full border border-[#B88A44]/20 bg-white/80 px-4 py-2 text-xs font-medium text-[#B88A44] shadow-sm backdrop-blur-sm md:text-sm'>
              <Sparkles className='h-3.5 w-3.5' />
              {hero?.subtitle || 'Premium Corporate Gifting'}
            </span>
          </motion.div>

          {/* TITLE */}
          <motion.h1
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.3, duration: 0.7 }}
            className='mt-6 text-[2.5rem] font-bold leading-[1.05] tracking-tight text-[#0F172A] sm:text-5xl lg:text-[3.5rem]'
          >
            {hero?.title || (
              <>
                Premium Corporate Gifts
                <span className='block bg-gradient-to-r from-[#B88A44] to-[#D4A853] bg-clip-text text-transparent'>
                  That Build Relationships
                </span>
              </>
            )}
          </motion.h1>

          {/* DESCRIPTION */}
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.4, duration: 0.7 }}
            className='mt-6 max-w-xl text-[15px] leading-7 text-[#4B5563] md:text-lg md:leading-8'
          >
            {hero?.description ||
              'Curated executive gifting experiences for employees, clients, partners, and corporate events — delivered pan-India with premium branding.'}
          </motion.p>

          {/* BUTTONS */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.5, duration: 0.7 }}
            className='relative z-10 mt-8 flex flex-col gap-3 sm:flex-row sm:items-center'
          >
            <Link
              href={hero?.button_link || '/products'}
              className='group inline-flex items-center justify-center gap-2 rounded-2xl bg-gradient-to-r from-[#B88A44] to-[#C99B55] px-7 py-4 text-sm font-semibold text-white shadow-lg shadow-[#B88A44]/25 transition-all hover:shadow-xl hover:shadow-[#B88A44]/30 md:px-8'
            >
              {hero?.button_text || 'Explore Collection'}
              <ArrowRight className='h-4 w-4 transition-transform group-hover:translate-x-1' />
            </Link>

            <Link
              href='/contact'
              className='inline-flex items-center justify-center rounded-2xl border border-black/10 bg-white/60 px-7 py-4 text-sm font-semibold text-[#0F172A] backdrop-blur-sm transition-all hover:bg-white hover:shadow-lg md:px-8'
            >
              Talk To Our Team
            </Link>
          </motion.div>

          {/* STATS */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.6, duration: 0.7 }}
            className='mt-12 grid grid-cols-2 gap-6 sm:grid-cols-4'
          >
            {[
              { value: 100, suffix: '+', label: 'Happy Clients' },
              { value: 1000, suffix: '+', label: 'Orders Delivered' },
              { value: 50, suffix: '+', label: 'Corporate Partners' },
              { value: 99, suffix: '%', label: 'Client Satisfaction' },
            ].map((stat) => (
              <div key={stat.label} className='relative'>
                <h3 className='text-2xl font-bold text-[#B88A44] md:text-3xl'>
                  <AnimatedCounter target={stat.value} suffix={stat.suffix} />
                </h3>
                <p className='mt-1 text-xs text-[#6B7280] md:text-sm'>{stat.label}</p>
              </div>
            ))}
          </motion.div>
        </motion.div>

        {/* RIGHT IMAGE */}
        <motion.div
          initial={{ opacity: 0, scale: 0.9, y: 30 }}
          animate={{ opacity: 1, scale: 1, y: 0 }}
          transition={{ duration: 0.9, ease: [0.22, 1, 0.36, 1] }}
          className='relative order-1 mx-auto w-full max-w-[620px] lg:order-2'
        >
          {/* Glow */}
          <div className='absolute -inset-6 rounded-[50px] bg-gradient-to-br from-[#B88A44]/10 via-transparent to-[#B88A44]/5 blur-2xl animate-pulse' />

          {/* IMAGE CARD */}
          <div className='relative overflow-hidden rounded-[28px] border border-white/60 bg-white/80 p-3 shadow-2xl backdrop-blur-sm md:rounded-[36px] md:p-4'>
            <Image
              src={hero?.image_url || '/images/hero-gift.png'}
              alt='Corporate gifting'
              width={1200}
              height={1200}
              priority
              className='h-[280px] w-full rounded-[22px] object-cover sm:h-[380px] md:h-[480px] lg:h-[560px]'
            />

            {/* Floating badge */}
            <motion.div
              animate={{ y: [-4, 4, -4] }}
              transition={{ duration: 3, repeat: Infinity, ease: 'easeInOut' }}
              className='absolute bottom-6 left-6 rounded-2xl border border-white/40 bg-white/90 px-4 py-3 shadow-lg backdrop-blur-md md:bottom-8 md:left-8'
            >
              <p className='text-[10px] font-medium text-[#6B7280]'>Trusted by</p>
              <p className='text-sm font-bold text-[#0F172A]'>100+ Corporates</p>
            </motion.div>
          </div>
        </motion.div>
      </div>
    </section>
  )
}
