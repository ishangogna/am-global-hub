import Link from 'next/link'
import { ArrowUpRight } from 'lucide-react'

interface ProductCardProps {
  product: any
}

export default function ProductCard({
  product,
}: ProductCardProps) {
  return (
    <Link href={`/products/${product.slug}`}>
      <div className='group overflow-hidden rounded-[32px] border border-black/5 bg-white transition duration-500 hover:-translate-y-2 hover:shadow-[0_25px_80px_rgba(0,0,0,0.08)]'>
        
        {/* IMAGE AREA */}
        <div className='relative overflow-hidden bg-[#F8F5EF] p-10'>
          
          {/* GOLD GLOW */}
          <div className='absolute inset-0 bg-gradient-to-br from-yellow-700/5 to-transparent opacity-0 transition duration-500 group-hover:opacity-100' />

          <img
            src={product.image_url}
            alt={product.name}
            className='relative z-10 h-80 w-full object-contain transition duration-700 group-hover:scale-105'
          />

          {/* TOP TAG */}
          <div className='absolute left-6 top-6 rounded-full bg-white/90 px-4 py-2 text-xs font-medium text-yellow-700 shadow-sm backdrop-blur'>
            Premium Collection
          </div>
        </div>

        {/* CONTENT */}
        <div className='p-8'>
          <div className='mb-4 flex items-start justify-between gap-4'>
            <h3 className='text-2xl font-semibold leading-tight text-primary transition group-hover:text-yellow-700'>
              {product.name}
            </h3>

            <div className='flex h-12 w-12 shrink-0 items-center justify-center rounded-2xl bg-[#F8F5EF] transition group-hover:bg-yellow-700 group-hover:text-white'>
              <ArrowUpRight className='h-5 w-5' />
            </div>
          </div>

          {product.description && (
            <p className='line-clamp-3 text-sm leading-7 text-muted'>
              {product.description}
            </p>
          )}

          <div className='mt-8 flex items-center justify-between border-t border-black/5 pt-6'>
            <div>
              <p className='text-xs uppercase tracking-[0.25em] text-muted'>
                Starting From
              </p>

              <h4 className='mt-2 text-3xl font-semibold text-primary'>
                ₹{product.price}
              </h4>
            </div>

            <button className='rounded-2xl bg-yellow-700 px-6 py-4 text-sm font-medium text-white transition duration-300 hover:scale-105'>
              Request Quote
            </button>
          </div>
        </div>
      </div>
    </Link>
  )
}