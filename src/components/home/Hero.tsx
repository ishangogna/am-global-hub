'use client'

import { motion } from 'framer-motion'
import Image from 'next/image'

export default function Hero() {
  return (
    <section className='overflow-hidden bg-[#FAF7F2]'>
      <div className='container-premium grid min-h-[90vh] items-center gap-16 py-20 lg:grid-cols-2'>
        <motion.div
          initial={{ opacity: 0, y: 40 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
        >
          <span className='mb-6 inline-flex rounded-full border border-gold/20 bg-gold/10 px-4 py-2 text-sm font-medium text-gold'>
            Premium Corporate Gifting Solutions
          </span>

          <h1 className='max-w-2xl text-5xl font-semibold leading-tight text-primary md:text-6xl'>
            Premium Corporate Gifts That Build
            <span className='block text-gold'>Stronger Relationships</span>
          </h1>

          <p className='mt-8 max-w-xl text-lg leading-8 text-muted'>
            Curated executive gifting experiences for employees, clients,
            partners, and corporate events with custom branding and nationwide
            delivery.
          </p>

          <div className='mt-10 flex flex-wrap gap-4'>
            <button className='rounded-2xl bg-gold px-8 py-4 font-medium text-white shadow-luxury transition hover:scale-105'>
              Explore Collection
            </button>

            <button className='rounded-2xl border border-black/10 bg-white px-8 py-4 font-medium transition hover:bg-black hover:text-white'>
              Download Catalog
            </button>
          </div>

          <div className='mt-14 grid grid-cols-2 gap-8 md:grid-cols-4'>
            <div>
              <h3 className='text-3xl font-semibold text-gold'>500+</h3>
              <p className='mt-2 text-sm text-muted'>Happy Clients</p>
            </div>

            <div>
              <h3 className='text-3xl font-semibold text-gold'>10K+</h3>
              <p className='mt-2 text-sm text-muted'>Orders Delivered</p>
            </div>

            <div>
              <h3 className='text-3xl font-semibold text-gold'>50+</h3>
              <p className='mt-2 text-sm text-muted'>Corporate Partners</p>
            </div>

            <div>
              <h3 className='text-3xl font-semibold text-gold'>99%</h3>
              <p className='mt-2 text-sm text-muted'>Client Satisfaction</p>
            </div>
          </div>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.8 }}
          className='relative'
        >
          <div className='absolute inset-0 rounded-[40px] bg-gradient-to-br from-gold/20 to-transparent blur-3xl' />

          <div className='relative overflow-hidden rounded-[40px] bg-white p-6 shadow-luxury'>
            <Image
              src='/images/hero-gift.png'
              alt='Corporate gifting'
              width={800}
              height={800}
              className='w-full rounded-[30px] object-cover'
            />
          </div>
        </motion.div>
      </div>
    </section>
  )
}