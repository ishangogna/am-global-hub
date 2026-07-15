import Link from 'next/link'
import { supabase } from '@/lib/supabase'
import FeaturedProductCard from './FeaturedProductCard'

export default async function FeaturedProducts() {
  const { data: products } = await supabase
    .from('products')
    .select('*')
    .eq('featured', true)
    .order('created_at', { ascending: false })
    .limit(8)

  if (!products || products.length === 0) return null

  return (
    <section className="bg-white py-20 lg:py-28">
      <div className="container-premium">
        <div className="mb-12 flex items-end justify-between">
          <div>
            <span className="inline-flex rounded-full border border-[#B88A44]/15 bg-[#B88A44]/10 px-4 py-2 text-sm font-medium text-[#B88A44]">
              Hand-picked for You
            </span>
            <h2 className="mt-5 text-4xl font-semibold text-[#0F172A] md:text-5xl">
              Featured Products
            </h2>
            <p className="mt-4 text-base text-[#667085]">
              Curated gifting solutions designed for modern businesses.
            </p>
          </div>

          <Link
            href="/products"
            className="hidden rounded-xl border border-black/10 px-6 py-3 text-sm font-medium text-[#0F172A] transition hover:border-[#B88A44] hover:text-[#B88A44] lg:block"
          >
            View All Products →
          </Link>
        </div>

        <div className="grid gap-6 sm:grid-cols-2 xl:grid-cols-4">
          {products.map((product) => (
            <FeaturedProductCard key={product.id} product={product} />
          ))}
        </div>

        {/* Mobile view-all */}
        <div className="mt-8 text-center lg:hidden">
          <Link
            href="/products"
            className="inline-flex rounded-xl border border-black/10 px-6 py-3 text-sm font-medium text-[#0F172A] transition hover:border-[#B88A44] hover:text-[#B88A44]"
          >
            View All Products →
          </Link>
        </div>
      </div>
    </section>
  )
}
