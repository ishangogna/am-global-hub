'use client'

import { motion } from 'framer-motion'
import { Package, Palette, Truck, Sparkles } from 'lucide-react'

const steps = [
  {
    icon: Package,
    title: 'Choose Products',
    description: 'Explore curated gifting collections tailored for employees, clients, events, and executive experiences.',
    color: 'from-[#B88A44]/10 to-[#D4A853]/5',
  },
  {
    icon: Palette,
    title: 'Customize Branding',
    description: 'Add your company branding, packaging, inserts, and personalized touches for a premium presentation.',
    color: 'from-[#6366F1]/10 to-[#8B5CF6]/5',
  },
  {
    icon: Sparkles,
    title: 'We Curate & Pack',
    description: 'Our team handles sourcing, quality checks, premium packaging, and gifting preparation end-to-end.',
    color: 'from-[#10B981]/10 to-[#34D399]/5',
  },
  {
    icon: Truck,
    title: 'Nationwide Delivery',
    description: 'Fast and reliable delivery across India with seamless coordination for bulk and corporate orders.',
    color: 'from-[#F59E0B]/10 to-[#FBBF24]/5',
  },
]

const iconColors = ['text-[#B88A44]', 'text-[#6366F1]', 'text-[#10B981]', 'text-[#F59E0B]']

export default function HowItWorks() {
  return (
    <section className='relative overflow-hidden bg-white py-24 lg:py-32'>
      {/* Background pattern */}
      <div className='absolute inset-0 bg-[radial-gradient(#B88A44_0.5px,transparent_0.5px)] [background-size:24px_24px] opacity-[0.03]' />

      <div className='container-premium relative'>
        {/* HEADER */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className='mx-auto max-w-3xl text-center'
        >
          <span className='inline-flex items-center gap-2 rounded-full border border-[#B88A44]/20 bg-[#B88A44]/5 px-5 py-2.5 text-sm font-medium text-[#B88A44]'>
            Simple & Seamless
          </span>

          <h2 className='mt-6 text-4xl font-bold tracking-tight text-[#0F172A] md:text-5xl'>
            How It Works
          </h2>

          <p className='mt-5 text-lg leading-8 text-[#6B7280]'>
            From product selection to doorstep delivery — corporate gifting made effortless.
          </p>
        </motion.div>

        {/* STEPS */}
        <div className='mt-20 grid gap-6 md:grid-cols-2 xl:grid-cols-4'>
          {steps.map((step, index) => {
            const Icon = step.icon
            return (
              <div
                key={step.title}
                className='group relative overflow-hidden rounded-3xl border border-black/[0.04] bg-white p-8 transition-all duration-500 hover:-translate-y-2 hover:shadow-2xl hover:shadow-black/[0.04]'
              >
                {/* Gradient background on hover */}
                <div className={`absolute inset-0 bg-gradient-to-br ${step.color} opacity-0 transition-opacity duration-500 group-hover:opacity-100`} />

                {/* Step connector line */}
                {index < 3 && (
                  <div className='absolute right-0 top-1/2 hidden h-px w-6 -translate-y-1/2 translate-x-full bg-gradient-to-r from-[#B88A44]/30 to-transparent xl:block' />
                )}

                <div className='relative'>
                  {/* STEP NUMBER */}
                  <span className='absolute right-0 top-0 text-5xl font-black text-black/[0.03] transition-colors duration-500 group-hover:text-[#B88A44]/10'>
                    {index + 1}
                  </span>

                  {/* ICON */}
                  <div className={`flex h-14 w-14 items-center justify-center rounded-2xl bg-gradient-to-br ${step.color} ${iconColors[index]} shadow-sm`}>
                    <Icon className='h-6 w-6' />
                  </div>

                  {/* CONTENT */}
                  <h3 className='mt-6 text-lg font-bold text-[#0F172A]'>{step.title}</h3>
                  <p className='mt-3 text-sm leading-7 text-[#6B7280]'>{step.description}</p>
                </div>
              </div>
            )
          })}
        </div>
      </div>
    </section>
  )
}
