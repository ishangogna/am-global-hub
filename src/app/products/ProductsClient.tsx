'use client'

import { useEffect, useState } from 'react'
import { supabase } from '@/lib/supabase'
import ProductCard from '@/components/products/ProductCard'
import { useRouter, useSearchParams } from 'next/navigation'

export default function ProductsClient({ categories }: any) {
  const router = useRouter()
  const searchParams = useSearchParams()

  const [products, setProducts] = useState<any[]>([])
  const [loading, setLoading] = useState(false)
  const [searchInput, setSearchInput] = useState('')

  const category = searchParams.get('category') || null

  const fetchProducts = async (opts?: {
    search?: string
    category?: string | null
  }) => {
    setLoading(true)

    let query = supabase
      .from('products')
      .select('*')
      .order('created_at', { ascending: false })

    if (opts?.category) {
      query = query.eq('category_id', opts.category)
    }

    if (opts?.search) {
      query = query.ilike('name', `%${opts.search}%`)
    }

    const { data, error } = await query

    if (!error) setProducts(data || [])
    else setProducts([])

    setLoading(false)
  }

  useEffect(() => {
    fetchProducts({ category })
  }, [])

  const setCategory = (catId: string | null) => {
    const params = new URLSearchParams()

    if (catId) params.set('category', catId)

    router.push(`/products?${params.toString()}`, { scroll: false })

    fetchProducts({
      category: catId,
      search: searchInput || undefined,
    })
  }

  const handleSearch = () => {
    fetchProducts({
      category,
      search: searchInput || undefined,
    })
  }

  const handleKeyDown = (e: any) => {
    if (e.key === 'Enter') handleSearch()
  }

  return (
    <main className="min-h-screen bg-[#FAF7F2]">

      {/* HERO */}
      <section className="border-b border-black/5 bg-gradient-to-b from-[#F8F4ED] to-[#FAF7F2]">
        <div className="container-premium py-24 lg:py-32">

          <h1 className="text-5xl font-semibold md:text-7xl">
            Curated Gifts For
            <span className="block text-yellow-700">
              Modern Businesses
            </span>
          </h1>

          {/* SEARCH */}
          <div className="mt-10 max-w-xl relative">
            <input
              value={searchInput}
              onChange={(e) => setSearchInput(e.target.value)}
              onKeyDown={handleKeyDown}
              placeholder="Search products..."
              className="
                w-full rounded-full
                border border-black/10
                bg-white/80 backdrop-blur-xl
                px-6 py-4 pr-14 text-sm
                outline-none transition
                focus:border-yellow-700 focus:ring-2 focus:ring-yellow-700/20
              "
            />

            <button
              onClick={handleSearch}
              className="
                absolute right-2 top-1/2 -translate-y-1/2
                flex h-9 w-9 items-center justify-center
                rounded-full
                bg-gradient-to-br from-[#D6A85A] to-[#B88A44]
                text-white
                shadow-md shadow-[#B88A44]/30
                hover:scale-105 transition
              "
            >
              🔍
            </button>
          </div>

        </div>
      </section>

      {/* FILTERS */}
      <section className="sticky top-20 z-30 border-b border-black/5 bg-white/80 backdrop-blur-xl">
        <div className="container-premium flex flex-wrap gap-3 py-5">

          <button
            onClick={() => setCategory(null)}
            className={`rounded-full px-5 py-2 text-sm font-medium transition
              ${!category
                ? 'bg-yellow-700 text-white'
                : 'border border-black/10 bg-white hover:text-yellow-700'
              }`}
          >
            All Products
          </button>

          {categories.map((cat: any) => (
            <button
              key={cat.id}
              onClick={() => setCategory(cat.id)}
              className={`rounded-full px-5 py-2 text-sm font-medium transition
                ${category === cat.id
                  ? 'bg-yellow-700 text-white'
                  : 'border border-black/10 bg-white hover:text-yellow-700'
                }`}
            >
              {cat.name}
            </button>
          ))}

        </div>
      </section>

      {/* GRID (FINAL AMAZON STYLE) */}
      <section className="py-10 lg:py-14">
        <div className="container-premium">

          {loading ? (
            <div className="text-center py-20 text-muted">
              Loading products...
            </div>
          ) : products.length > 0 ? (
            <div className="
              grid grid-cols-2
              sm:grid-cols-2
              md:grid-cols-3
              lg:grid-cols-4
              xl:grid-cols-5
              gap-4 md:gap-6
            ">
              {products.map((product) => (
                <ProductCard key={product.id} product={product} />
              ))}
            </div>
          ) : (
            <div className="text-center py-20 text-muted">
              No products found
            </div>
          )}

        </div>
      </section>

    </main>
  )
}