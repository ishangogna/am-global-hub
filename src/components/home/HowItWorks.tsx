'use client'

import { motion } from 'framer-motion'
import { Package, Palette, Truck, Sparkles } from 'lucide-react'

const steps = [
  {
    icon: Package,
    title: 'Choose Products',
    description: 'Explore curated gifting collections tailored for employees, clients, events, and executive experiences.',
  },
  {
    icon: Palette,
    title: 'Customize Branding',
    description: 'Add your company branding, packaging, inserts, and personalized touches for a premium presentation.',
  },
  {
    icon: Sparkles,
    title: 'We Curate & Pack',
    description: 'Our team handles sourcing, quality checks, premium packaging, and gifting preparation end-to-end.',
  },
  {
    icon: Truck,
    title: 'Nationwide Delivery',
    description: 'Fast and reliable delivery across India with seamless coordination for bulk and corporate orders.',
  },
]

export default function HowItWorks() {
  return (
    <section className='bg-gradient-to-b from-white to-[#FDFBF7] py-24 lg:py-32'>
      <div className='container-premium'>

        {/* HEADER */}
        <div className='mx-auto max-w-2xl text-center'>
          <p className='text-xs font-semibold uppercase tracking-[0.2em] text-[#B88A44]'>
            How It Works
          </p>
          <h2 className='mt-4 text-3xl font-bold tracking-tight text-[#0F172A] md:text-5xl'>
            From idea to delivery
            <span className='block bg-gradient-to-r from-[#B88A44] to-[#D4A853] bg-clip-text text-transparent'>
              in 4 simple steps
            </span>
          </h2>
        </div>

        {/* STEPS — connected timeline */}
        <div className='relative mt-20'>

          {/* Horizontal connector line (desktop) */}
          <div className='absolute left-[calc(12.5%+28px)] right-[calc(12.5%+28px)] top-7 hidden h-[2px] bg-gradient-to-r from-[#B88A44]/20 via-[#B88A44]/40 to-[#B88A44]/20 xl:block' />

          <div className='grid gap-12 md:grid-cols-2 xl:grid-cols-4 xl:gap-8'>
            {steps.map((step, index) => {
              const Icon = step.icon
              return (
                <motion.div
                  key={step.title}
                  initial={{ opacity: 0, translateY: 20 }}
                  whileInView={{ opacity: 1, translateY: 0 }}
                  viewport={{ once: true, margin: '-80px' }}
                  transition={{ duration: 0.8, delay: index * 0.1, ease: [0.25, 0.1, 0.25, 1] }}
                  className='relative flex flex-col items-center text-center'
                >
                  {/* Step circle */}
                  <div className='relative z-10 flex h-14 w-14 items-center justify-center rounded-full bg-gradient-to-br from-[#B88A44] to-[#D4A853] text-white shadow-lg shadow-[#B88A44]/20'>
                    <Icon className='h-5 w-5' />
                  </div>

                  {/* Step number */}
                  <span className='mt-4 inline-flex h-6 w-6 items-center justify-center rounded-full bg-[#FAF7F2] text-[10px] font-bold text-[#B88A44] ring-1 ring-[#B88A44]/20'>
                    {index + 1}
                  </span>

                  {/* Content */}
                  <h3 className='mt-4 text-lg font-bold text-[#0F172A]'>
                    {step.title}
                  </h3>
                  <p className='mt-2 max-w-[240px] text-sm leading-6 text-[#6B7280]'>
                    {step.description}
                  </p>
                </motion.div>
              )
            })}
          </div>
        </div>

      </div>
    </section>
  )
}
