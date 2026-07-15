import Link from 'next/link'
import { ArrowUpRight } from 'lucide-react'

export default function ProductCard({ product }: any) {
  return (
    <Link href={`/products/${product.slug}`}>
      <div className="group flex h-full flex-col overflow-hidden rounded-2xl border border-black/5 bg-white transition duration-300 hover:-translate-y-1 hover:shadow-lg">

        {/* IMAGE */}
        <div className="relative aspect-square overflow-hidden bg-[#F8F5EF]">
          {product.image_url ? (
            <img
              src={product.image_url}
              alt={product.name}
              className="h-full w-full object-contain p-5 transition duration-500 group-hover:scale-105"
            />
          ) : (
            <div className="flex h-full items-center justify-center">
              <span className="text-4xl opacity-20">🎁</span>
            </div>
          )}

          {/* Gold gradient on hover */}
          <div className="absolute inset-0 bg-gradient-to-t from-[#B88A44]/10 to-transparent opacity-0 transition duration-300 group-hover:opacity-100" />

          {/* Featured badge */}
          {product.featured && (
            <span className="absolute left-3 top-3 rounded-full bg-[#B88A44] px-2.5 py-1 text-[10px] font-semibold text-white shadow-sm">
              Featured
            </span>
          )}
        </div>

        {/* CONTENT */}
        <div className="flex flex-1 flex-col p-4">
          {/* Category */}
          {product.category && (
            <span className="mb-2 text-[10px] font-medium uppercase tracking-widest text-[#B88A44]">
              {product.category}
            </span>
          )}

          <h3 className="line-clamp-2 text-sm font-semibold leading-snug text-[#0F172A] transition group-hover:text-[#B88A44]">
            {product.name}
          </h3>

          {product.description && (
            <p className="mt-1.5 line-clamp-2 text-xs leading-5 text-[#667085]">
              {product.description}
            </p>
          )}

          <div className="mt-auto flex items-center justify-between pt-4">
            <div>
              {product.price_range && (
                <span className="text-sm font-bold text-[#0F172A]">
                  {product.price_range}
                </span>
              )}
              {product.moq && (
                <p className="mt-0.5 text-[10px] text-[#667085]">
                  MOQ: {product.moq} units
                </p>
              )}
            </div>

            <div className="flex h-8 w-8 shrink-0 items-center justify-center rounded-full border border-black/10 bg-[#FAF7F2] transition duration-300 group-hover:border-[#B88A44] group-hover:bg-[#B88A44] group-hover:text-white">
              <ArrowUpRight className="h-4 w-4" />
            </div>
          </div>
        </div>

      </div>
    </Link>
  )
}
