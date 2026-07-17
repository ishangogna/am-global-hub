import Link from 'next/link'

export default function Branding() {
  return (
    <section className='bg-[#F8F5EF] py-24'>
      <div className='container-premium'>
        <div className='grid items-center gap-14 lg:grid-cols-2'>
          
          {/* IMAGE SIDE */}
          <div className='relative'>
            {/* GLOW */}
            <div className='absolute inset-0 rounded-[36px] bg-[#B88A44]/10 blur-3xl' />

            {/* IMAGE CARD */}
            <div className='relative overflow-hidden rounded-[32px] border border-white/60 bg-white p-4 shadow-2xl'>
              <img
                src='https://images.unsplash.com/photo-1607344645866-009c320b63e0?w=800&q=80'
                alt='Corporate Branding & Premium Packaging'
                className='h-[500px] w-full rounded-[24px] object-cover'
              />
            </div>
          </div>

          {/* CONTENT SIDE */}
          <div className='max-w-xl'>
            <span className='inline-flex rounded-full border border-[#B88A44]/15 bg-[#B88A44]/10 px-4 py-2 text-sm font-medium text-[#B88A44]'>
              Corporate Customization
            </span>

            <h2 className='mt-6 text-4xl font-semibold leading-tight text-[#111827] md:text-5xl'>
              Personalized Branding
              <span className='block text-[#B88A44]'>
                For Every Gift
              </span>
            </h2>

            <p className='mt-6 text-lg leading-8 text-[#667085]'>
              From logo engraving and premium packaging to
              personalized inserts and curated presentation,
              we help businesses deliver gifting experiences
              that feel thoughtful, elevated, and memorable.
            </p>

            {/* FEATURES */}
            <div className='mt-10 space-y-5'>
              <div className='flex items-start gap-4'>
                <div className='mt-1 h-3 w-3 rounded-full bg-[#B88A44]' />

                <div>
                  <h4 className='font-semibold text-[#111827]'>
                    Premium Packaging
                  </h4>

                  <p className='mt-1 text-sm leading-7 text-[#667085]'>
                    Luxury boxes, sleeves, ribbons, and
                    presentation materials.
                  </p>
                </div>
              </div>

              <div className='flex items-start gap-4'>
                <div className='mt-1 h-3 w-3 rounded-full bg-[#B88A44]' />

                <div>
                  <h4 className='font-semibold text-[#111827]'>
                    Custom Branding
                  </h4>

                  <p className='mt-1 text-sm leading-7 text-[#667085]'>
                    Logo printing, engraving, embroidery,
                    and corporate identity integration.
                  </p>
                </div>
              </div>

              <div className='flex items-start gap-4'>
                <div className='mt-1 h-3 w-3 rounded-full bg-[#B88A44]' />

                <div>
                  <h4 className='font-semibold text-[#111827]'>
                    Personalized Inserts
                  </h4>

                  <p className='mt-1 text-sm leading-7 text-[#667085]'>
                    Welcome cards, handwritten notes,
                    and premium messaging experiences.
                  </p>
                </div>
              </div>
            </div>

            {/* CTA */}
            <Link
  href='/contact'
  className='mt-12 inline-flex rounded-xl bg-[#B88A44] px-8 py-4 text-base font-medium text-white transition hover:opacity-90'
>
  Talk To Our Team
</Link>
          </div>
        </div>
      </div>
    </section>
  )
}