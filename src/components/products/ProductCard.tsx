import Link from 'next/link'
import { ArrowUpRight } from 'lucide-react'

export default function ProductCard({ product }: any) {
  return (
    <Link href={`/products/${product.slug}`}>
      <div className="group overflow-hidden rounded-2xl border border-black/5 bg-white transition hover:-translate-y-1 hover:shadow-md">

        {/* IMAGE */}
        <div className="relative aspect-square overflow-hidden bg-[#F8F5EF]">

          <img
            src={product.image_url}
            alt={product.name}
            className="h-full w-full object-contain p-4 transition duration-500 group-hover:scale-105"
          />

          {/* subtle hover overlay */}
          <div className="absolute inset-0 bg-gradient-to-br from-yellow-700/5 to-transparent opacity-0 transition group-hover:opacity-100" />
        </div>

        {/* CONTENT */}
        <div className="p-4">

          <h3 className="line-clamp-2 text-sm font-medium text-primary group-hover:text-yellow-700">
            {product.name}
          </h3>

          <p className="mt-1 text-xs text-muted line-clamp-2">
            {product.description}
          </p>

          <div className="mt-3 flex items-center justify-between">
            <span className="text-sm font-semibold text-primary">
              {product.price_range}
            </span>

            <div className="flex h-7 w-7 items-center justify-center rounded-full bg-[#F8F5EF] group-hover:bg-yellow-700 group-hover:text-white transition">
              <ArrowUpRight className="h-4 w-4" />
            </div>
          </div>

        </div>

      </div>
    </Link>
  )
}