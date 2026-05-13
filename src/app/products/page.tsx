import ProductCard from '@/components/products/ProductCard'
import { supabase } from '@/lib/supabase'

export default async function ProductsPage() {

  const { data: products } = await supabase
    .from('products')
    .select('*')
    .order('created_at', { ascending: false })

  return (
    <main className='min-h-screen bg-[#FAF7F2]'>
      {/* HERO */}
      <section className='border-b border-black/5 bg-gradient-to-b from-[#F8F4ED] to-[#FAF7F2]'>
        <div className='container-premium py-24 lg:py-32'>
          <div className='max-w-4xl'>
            <span className='mb-6 inline-flex rounded-full border border-yellow-700/20 bg-yellow-700/10 px-5 py-2 text-sm font-medium text-yellow-700'>
              Premium Corporate Gifting Collection
            </span>

            <h1 className='text-5xl font-semibold leading-tight text-primary md:text-7xl'>
              Curated Gifts For
              <span className='block text-yellow-700'>
                Modern Businesses
              </span>
            </h1>

            <p className='mt-8 max-w-2xl text-lg leading-8 text-muted'>
              Discover premium executive gifting solutions designed for
              employees, clients, partners, onboarding kits, festive hampers,
              and corporate events.
            </p>
          </div>
        </div>
      </section>

      {/* FILTER BAR */}
      <section className='sticky top-20 z-30 border-b border-black/5 bg-white/80 backdrop-blur-xl'>
        <div className='container-premium flex flex-wrap items-center justify-between gap-4 py-5'>
          <div className='flex flex-wrap gap-3'>
            <button className='rounded-full bg-yellow-700 px-5 py-2 text-sm font-medium text-white'>
              All Products
            </button>

            <button className='rounded-full border border-black/10 bg-white px-5 py-2 text-sm font-medium transition hover:border-yellow-700 hover:text-yellow-700'>
              Executive Kits
            </button>

            <button className='rounded-full border border-black/10 bg-white px-5 py-2 text-sm font-medium transition hover:border-yellow-700 hover:text-yellow-700'>
              Tech Gifts
            </button>

            <button className='rounded-full border border-black/10 bg-white px-5 py-2 text-sm font-medium transition hover:border-yellow-700 hover:text-yellow-700'>
              Drinkware
            </button>

            <button className='rounded-full border border-black/10 bg-white px-5 py-2 text-sm font-medium transition hover:border-yellow-700 hover:text-yellow-700'>
              Hampers
            </button>
          </div>

          <div className='text-sm text-muted'>
            {products?.length || 0} Products
          </div>
        </div>
      </section>

      {/* PRODUCTS GRID */}
      <section className='py-16 lg:py-24'>
        <div className='container-premium'>
          {products && products.length > 0 ? (
            <div className='grid gap-8 md:grid-cols-2 xl:grid-cols-3'>
              {products.map((product) => (
                <ProductCard
                  key={product.id}
                  product={product}
                />
              ))}
            </div>
          ) : (
            <div className='flex min-h-[400px] items-center justify-center rounded-[32px] border border-dashed border-black/10 bg-white'>
              <div className='text-center'>
                <h3 className='text-2xl font-semibold'>
                  No Products Found
                </h3>

                <p className='mt-4 text-muted'>
                  Add products from your admin dashboard.
                </p>
              </div>
            </div>
          )}
        </div>
      </section>
    </main>
  )
}