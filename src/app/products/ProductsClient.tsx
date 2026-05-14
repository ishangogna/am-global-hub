'use client'

import { useEffect, useState } from 'react'
import { supabase } from '@/lib/supabase'
import ProductCard from '@/components/products/ProductCard'
import { useRouter } from 'next/navigation'

export default function ProductsClient({ categories, category: initialCategory }: any) {
  const router = useRouter()

  const [products, setProducts] = useState<any[]>([])
  const [loading, setLoading] = useState(false)
  const [searchInput, setSearchInput] = useState('')
  const [category, setCategoryState] = useState<string | null>(initialCategory)

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

    const { data } = await query

    setProducts(data || [])
    setLoading(false)
  }

  useEffect(() => {
    fetchProducts({ category: initialCategory })
  }, [initialCategory])

  const setCategory = (catId: string | null) => {
    setCategoryState(catId)

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

          <div className="mt-10 max-w-xl relative">
            <input
              value={searchInput}
              onChange={(e) => setSearchInput(e.target.value)}
              onKeyDown={handleKeyDown}
              placeholder="Search products..."
              className="w-full rounded-full border px-6 py-4"
            />

            <button onClick={handleSearch} className="absolute right-2 top-2">
              🔍
            </button>
          </div>

        </div>
      </section>

      {/* FILTERS */}
      <section className="sticky top-20 z-30 bg-white/80 backdrop-blur-xl">
        <div className="container-premium flex flex-wrap gap-3 py-5">

          <button onClick={() => setCategory(null)}>
            All Products
          </button>

          {categories.map((cat: any) => (
            <button
              key={cat.id}
              onClick={() => setCategory(cat.id)}
            >
              {cat.name}
            </button>
          ))}

        </div>
      </section>

      {/* GRID */}
      <section className="py-10 lg:py-14">
        <div className="container-premium">

          {loading ? (
            <div>Loading...</div>
          ) : products.length > 0 ? (
            <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
              {products.map((product) => (
                <ProductCard key={product.id} product={product} />
              ))}
            </div>
          ) : (
            <div>No products found</div>
          )}

        </div>
      </section>

    </main>
  )
}