'use client'

import { motion } from 'framer-motion'
import Link from 'next/link'
import { Check, ArrowRight } from 'lucide-react'

const features = [
  { title: 'Premium Packaging', desc: 'Luxury boxes, sleeves, ribbons, and presentation materials crafted for impact.' },
  { title: 'Custom Branding', desc: 'Logo printing, engraving, embroidery, and full corporate identity integration.' },
  { title: 'Personalized Inserts', desc: 'Welcome cards, handwritten notes, and premium messaging experiences.' },
  { title: 'End-to-End Service', desc: 'From concept to delivery — we handle everything so you don\'t have to.' },
]

export default function Branding() {
  return (
    <section className='relative overflow-hidden bg-gradient-to-b from-[#F8F5EF] to-[#F2EDE4] py-24 lg:py-32'>
      {/* Decorative */}
      <div className='absolute right-0 top-0 h-96 w-96 rounded-full bg-[#B88A44]/5 blur-[120px]' />
      <div className='absolute bottom-0 left-0 h-72 w-72 rounded-full bg-[#B88A44]/8 blur-[100px]' />

      <div className='container-premium relative'>
        <div className='grid items-center gap-16 lg:grid-cols-2'>

          {/* IMAGE SIDE */}
          <motion.div
            initial={{ opacity: 0, x: -40 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.7 }}
            className='relative'
          >
            <div className='relative overflow-hidden rounded-[32px] border border-white/60 bg-white/50 p-3 shadow-2xl backdrop-blur-sm'>
              <img
                src='https://images.unsplash.com/photo-1607344645866-009c320b63e0?w=800&q=80'
                alt='Corporate Branding & Premium Packaging'
                className='h-[420px] w-full rounded-[24px] object-cover lg:h-[520px]'
              />

              {/* Overlay badge */}
              <motion.div
                animate={{ y: [-5, 5, -5] }}
                transition={{ duration: 4, repeat: Infinity, ease: 'easeInOut' }}
                className='absolute -right-2 bottom-8 rounded-2xl border border-white/50 bg-white/95 px-5 py-4 shadow-xl backdrop-blur-sm md:right-6'
              >
                <p className='text-2xl font-bold text-[#B88A44]'>500+</p>
                <p className='text-xs text-[#6B7280]'>Custom orders delivered</p>
              </motion.div>
            </div>
          </motion.div>

          {/* CONTENT SIDE */}
          <motion.div
            initial={{ opacity: 0, x: 40 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.7, delay: 0.2 }}
            className='max-w-xl'
          >
            <span className='inline-flex rounded-full border border-[#B88A44]/20 bg-white/80 px-4 py-2 text-sm font-medium text-[#B88A44] backdrop-blur-sm'>
              Corporate Customization
            </span>

            <h2 className='mt-6 text-4xl font-bold leading-tight text-[#0F172A] md:text-5xl'>
              Personalized Branding
              <span className='block bg-gradient-to-r from-[#B88A44] to-[#D4A853] bg-clip-text text-transparent'>
                For Every Gift
              </span>
            </h2>

            <p className='mt-6 text-lg leading-8 text-[#4B5563]'>
              From logo engraving and premium packaging to personalized inserts and curated presentation, we help businesses deliver gifting experiences that feel thoughtful, elevated, and memorable.
            </p>

            {/* FEATURES */}
            <div className='mt-10 space-y-4'>
              {features.map((f) => (
                <div
                  key={f.title}
                  className='flex gap-4 rounded-2xl border border-white/60 bg-white/50 p-4 backdrop-blur-sm transition hover:bg-white/80 hover:shadow-md'
                >
                  <div className='flex h-8 w-8 shrink-0 items-center justify-center rounded-xl bg-[#B88A44]/10'>
                    <Check className='h-4 w-4 text-[#B88A44]' />
                  </div>
                  <div>
                    <h4 className='text-sm font-bold text-[#0F172A]'>{f.title}</h4>
                    <p className='mt-1 text-xs leading-5 text-[#6B7280]'>{f.desc}</p>
                  </div>
                </div>
              ))}
            </div>

            {/* CTA */}
            <motion.div
              initial={{ opacity: 0 }}
              whileInView={{ opacity: 1 }}
              viewport={{ once: true }}
              transition={{ delay: 0.7 }}
            >
              <Link
                href='/contact'
                className='group mt-10 inline-flex items-center gap-2 rounded-2xl bg-gradient-to-r from-[#B88A44] to-[#C99B55] px-8 py-4 text-sm font-semibold text-white shadow-lg shadow-[#B88A44]/20 transition-all hover:shadow-xl hover:shadow-[#B88A44]/30'
              >
                Talk To Our Team
                <ArrowRight className='h-4 w-4 transition-transform group-hover:translate-x-1' />
              </Link>
            </motion.div>
          </motion.div>
        </div>
      </div>
    </section>
  )
}
