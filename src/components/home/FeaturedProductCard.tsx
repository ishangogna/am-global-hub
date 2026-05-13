interface FeaturedProductCardProps {
  title: string
  image: string
  price: string
}

export default function FeaturedProductCard({
  title,
  image,
  price,
}: FeaturedProductCardProps) {
  return (
    <div className='group overflow-hidden rounded-[28px] border border-black/5 bg-white transition hover:-translate-y-2 hover:shadow-luxury'>
      <div className='overflow-hidden bg-[#F8F5EF] p-8'>
        <img
          src={image}
          alt={title}
          className='h-72 w-full object-contain transition duration-500 group-hover:scale-105'
        />
      </div>

      <div className='p-6'>
        <div className='mb-3 flex items-center justify-between'>
          <span className='rounded-full bg-gold/10 px-3 py-1 text-xs font-medium text-gold'>
            Custom Branding Available
          </span>
        </div>

        <h3 className='text-xl font-semibold text-primary'>{title}</h3>

        <p className='mt-2 text-sm text-muted'>MOQ: 25 Units</p>

        <div className='mt-6 flex items-center justify-between'>
          <span className='text-2xl font-semibold text-primary'>
            ₹{price}
          </span>

          <button className='rounded-xl bg-gold px-5 py-3 text-sm font-medium text-white transition hover:scale-105'>
            Request Quote
          </button>
        </div>
      </div>
    </div>
  )
}