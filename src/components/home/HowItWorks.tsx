import {
  Package,
  Palette,
  Truck,
  Sparkles,
} from 'lucide-react'

const steps = [
  {
    icon: Package,
    title: 'Choose Products',
    description:
      'Explore curated gifting collections tailored for employees, clients, events, and executive experiences.',
  },
  {
    icon: Palette,
    title: 'Customize Branding',
    description:
      'Add your company branding, packaging, inserts, and personalized touches for a premium presentation.',
  },
  {
    icon: Sparkles,
    title: 'We Curate & Pack',
    description:
      'Our team handles sourcing, quality checks, premium packaging, and gifting preparation end-to-end.',
  },
  {
    icon: Truck,
    title: 'Nationwide Delivery',
    description:
      'Fast and reliable delivery across India with seamless coordination for bulk and corporate orders.',
  },
]

export default function HowItWorks() {
  return (
    <section className='bg-white py-24'>
      <div className='container-premium'>
        {/* HEADER */}
        <div className='mx-auto max-w-3xl text-center'>
          <span className='inline-flex rounded-full border border-[#B88A44]/15 bg-[#B88A44]/10 px-4 py-2 text-sm font-medium text-[#B88A44]'>
            Simple & Seamless Process
          </span>

          <h2 className='mt-6 text-4xl font-semibold tracking-tight text-[#111827] md:text-5xl'>
            How It Works
          </h2>

          <p className='mt-6 text-lg leading-8 text-[#667085]'>
            From product selection to doorstep delivery, we make
            corporate gifting effortless and premium.
          </p>
        </div>

        {/* STEPS */}
        <div className='mt-20 grid gap-6 md:grid-cols-2 xl:grid-cols-4'>
          {steps.map((step, index) => {
            const Icon = step.icon

            return (
              <div
                key={step.title}
                className='group relative overflow-hidden rounded-[28px] border border-black/5 bg-[#FCFBF8] p-8 transition duration-300 hover:-translate-y-1 hover:shadow-xl'
              >
                {/* STEP NUMBER */}
                <div className='absolute right-6 top-6 text-sm font-semibold text-black/10'>
                  0{index + 1}
                </div>

                {/* ICON */}
                <div className='flex h-14 w-14 items-center justify-center rounded-2xl bg-[#B88A44]/10 text-[#B88A44]'>
                  <Icon className='h-6 w-6' />
                </div>

                {/* CONTENT */}
                <div className='mt-8'>
                  <h3 className='text-xl font-semibold text-[#111827]'>
                    {step.title}
                  </h3>

                  <p className='mt-4 text-sm leading-7 text-[#667085]'>
                    {step.description}
                  </p>
                </div>

                {/* HOVER GLOW */}
                <div className='absolute inset-0 bg-gradient-to-br from-[#B88A44]/0 via-[#B88A44]/0 to-[#B88A44]/5 opacity-0 transition duration-500 group-hover:opacity-100' />
              </div>
            )
          })}
        </div>
      </div>
    </section>
  )
}