'use client'

import { motion } from 'framer-motion'
import Image from 'next/image'

export default function Hero() {
  return (
    <section className='overflow-hidden bg-[#F7F3EE]'>
      <div className='container-premium grid items-center gap-12 py-16 lg:min-h-screen lg:grid-cols-2'>
        
        {/* LEFT */}
        <motion.div
          initial={{ opacity: 0, y: 24 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7 }}
        >
          <span className='mb-5 inline-flex rounded-full border border-[#B88A44]/20 bg-[#B88A44]/10 px-4 py-2 text-sm font-medium text-[#B88A44]'>
            Premium Corporate Gifting
          </span>

          <h1 className='max-w-2xl text-4xl font-semibold leading-tight text-[#111827] md:text-5xl lg:text-6xl'>
            Premium Corporate Gifts
            <span className='block text-[#B88A44]'>
              For Modern Businesses
            </span>
          </h1>

          <p className='mt-6 max-w-xl text-base leading-8 text-[#667085] md:text-lg'>
            Curated executive gifting experiences for employees,
            clients, onboarding kits, festive hampers, and
            corporate events with custom branding.
          </p>

          <div className='mt-8 flex flex-wrap gap-4'>
            <button className='rounded-xl bg-[#B88A44] px-7 py-4 text-base font-medium text-white transition hover:opacity-90'>
              Explore Collection
            </button>

            <button className='rounded-xl border border-black/10 bg-white px-7 py-4 text-base font-medium text-[#111827] transition hover:bg-black hover:text-white'>
              Download Catalog
            </button>
          </div>

          {/* STATS */}
          <div className='mt-12 grid grid-cols-2 gap-6 border-t border-black/5 pt-8 md:grid-cols-4'>
            <div>
              <h3 className='text-3xl font-semibold text-[#B88A44]'>
                500+
              </h3>

              <p className='mt-1 text-sm text-[#667085]'>
                Happy Clients
              </p>
            </div>

            <div>
              <h3 className='text-3xl font-semibold text-[#B88A44]'>
                10K+
              </h3>

              <p className='mt-1 text-sm text-[#667085]'>
                Orders Delivered
              </p>
            </div>

            <div>
              <h3 className='text-3xl font-semibold text-[#B88A44]'>
                50+
              </h3>

              <p className='mt-1 text-sm text-[#667085]'>
                Corporate Partners
              </p>
            </div>

            <div>
              <h3 className='text-3xl font-semibold text-[#B88A44]'>
                99%
              </h3>

              <p className='mt-1 text-sm text-[#667085]'>
                Satisfaction
              </p>
            </div>
          </div>
        </motion.div>

        {/* RIGHT */}
        <motion.div
          initial={{ opacity: 0, scale: 0.96 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.8 }}
          className='relative'
        >
          <div className='absolute inset-0 rounded-[32px] bg-[#B88A44]/10 blur-3xl' />

          <div className='relative rounded-[32px] bg-white p-4 shadow-2xl'>
            <Image
              src='/images/hero-gift.png'
              alt='Premium corporate gifts'
              width={1000}
              height={1000}
              priority
              className='h-[420px] w-full rounded-[24px] object-cover lg:h-[520px]'
            />
          </div>
        </motion.div>
      </div>
    </section>
  )
}