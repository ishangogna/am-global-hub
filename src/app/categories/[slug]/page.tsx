import { supabase } from '@/lib/supabase'
import ProductCard from '@/components/products/ProductCard'

interface CategoryPageProps {
  params: {
    slug: string
  }
}

export default async function CategoryPage({
  params,
}: CategoryPageProps) {
  const { data: category } = await supabase
    .from('categories')
    .select('*')
    .eq('slug', params.slug)
    .single()

  if (!category) {
    return (
      <main className='flex min-h-screen items-center justify-center'>
        <h1 className='text-3xl font-semibold'>
          Category Not Found
        </h1>
      </main>
    )
  }

  const { data: products } = await supabase
    .from('products')
    .select('*')
    .eq('category_id', category.id)

  return (
    <main className='min-h-screen bg-[#F7F3EE]'>
      {/* HERO */}
      <section className='border-b border-black/5 bg-white'>
        <div className='container-premium py-20'>
          <span className='inline-flex rounded-full border border-[#B88A44]/15 bg-[#B88A44]/10 px-4 py-2 text-sm font-medium text-[#B88A44]'>
            Premium Collection
          </span>

          <h1 className='mt-6 text-5xl font-semibold text-[#111827]'>
            {category.name}
          </h1>

          <p className='mt-6 max-w-2xl text-lg leading-8 text-[#667085]'>
            {category.description}
          </p>
        </div>
      </section>

      {/* PRODUCTS */}
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
            <div className='rounded-[32px] border border-dashed border-black/10 bg-white p-20 text-center'>
              <h3 className='text-2xl font-semibold text-[#111827]'>
                No Products Found
              </h3>

              <p className='mt-4 text-[#667085]'>
                Products will appear here soon.
              </p>
            </div>
          )}
        </div>
      </section>
    </main>
  )
}