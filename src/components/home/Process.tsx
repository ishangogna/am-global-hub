const steps = [
  'Select Your Products',
  'Customize Branding',
  'Approve Mockups',
  'Nationwide Delivery',
]

export default function Process() {
  return (
    <section className='section-spacing bg-[#0F172A] text-white'>
      <div className='container-premium'>
        <div className='mb-16 text-center'>
          <h2 className='text-4xl font-semibold'>How It Works</h2>

          <p className='mt-4 text-white/70'>
            A seamless gifting experience for modern companies
          </p>
        </div>

        <div className='grid gap-8 md:grid-cols-2 lg:grid-cols-4'>
          {steps.map((step, index) => (
            <div
              key={step}
              className='rounded-[28px] border border-white/10 bg-white/5 p-8'
            >
              <div className='mb-6 flex h-14 w-14 items-center justify-center rounded-2xl bg-gold text-xl font-semibold'>
                {index + 1}
              </div>

              <h3 className='text-2xl font-semibold'>{step}</h3>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}