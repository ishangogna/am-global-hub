export default function Branding() {
  return (
    <section className='section-spacing'>
      <div className='container-premium'>
        <div className='grid items-center gap-16 lg:grid-cols-2'>
          <div>
            <span className='text-sm font-semibold uppercase tracking-[0.3em] text-gold'>
              Corporate Customization
            </span>

            <h2 className='mt-6 text-5xl font-semibold leading-tight'>
              Personalized Branding For Every Corporate Gift
            </h2>

            <p className='mt-8 text-lg leading-8 text-muted'>
              From laser engraving and logo printing to luxury packaging and
              personalized notes, we help businesses create memorable gifting
              experiences.
            </p>

            <button className='mt-10 rounded-2xl bg-gold px-8 py-4 font-medium text-white'>
              Talk To Our Team
            </button>
          </div>

          <div className='overflow-hidden rounded-[36px] bg-white p-6 shadow-luxury'>
            <img
              src='/branding.jpg'
              alt='Branding'
              className='rounded-[28px]'
            />
          </div>
        </div>
      </div>
    </section>
  )
}