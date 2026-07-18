'use client'

import { useEffect, useState } from 'react'
import { supabase } from '@/lib/supabase'
import ProductCard from '@/components/products/ProductCard'
import { useRouter } from 'next/navigation'
import { Search, SlidersHorizontal, Package } from 'lucide-react'

export default function ProductsClient({
  categories,
  category: initialCategory,
}: any) {
  const router = useRouter()

  const [products, setProducts] = useState<any[]>([])
  const [totalCount, setTotalCount] = useState(0)
  const [loading, setLoading] = useState(true)
  const [searchInput, setSearchInput] = useState('')
  const [category, setCategoryState] = useState<string | null>(initialCategory)
  const [page, setPage] = useState(1)
  const PAGE_SIZE = 12

  const fetchProducts = async (opts?: {
    search?: string
    category?: string | null
    page?: number
  }) => {
    setLoading(true)
    const currentPage = opts?.page ?? page
    const from = (currentPage - 1) * PAGE_SIZE
    const to = from + PAGE_SIZE - 1

    let query = supabase
      .from('products')
      .select('*', { count: 'exact' })
      .order('created_at', { ascending: false })
      .range(from, to)

    if (opts?.category) query = query.eq('category_id', opts.category)
    if (opts?.search) query = query.ilike('name', `%${opts.search}%`)

    const { data, count } = await query
    setProducts(data || [])
    setTotalCount(count ?? 0)
    setLoading(false)
  }

  useEffect(() => {
    fetchProducts({ category: initialCategory, page: 1 })
  }, [initialCategory])

  const setCategory = (catId: string | null) => {
    setCategoryState(catId)
    setPage(1)
    const params = new URLSearchParams()
    if (catId) params.set('category', catId)
    router.push(`/products?${params.toString()}`, { scroll: false })
    fetchProducts({ category: catId, search: searchInput || undefined, page: 1 })
  }

  const handleSearch = () => {
    setPage(1)
    fetchProducts({ category, search: searchInput || undefined, page: 1 })
  }

  const goToPage = (p: number) => {
    setPage(p)
    fetchProducts({ category, search: searchInput || undefined, page: p })
    window.scrollTo({ top: 400, behavior: 'smooth' })
  }

  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter') handleSearch()
  }

  const totalPages = Math.ceil(totalCount / PAGE_SIZE)

  const activeCategoryName =
    categories.find((c: any) => c.id === category)?.name ?? 'All Products'

  return (
    <div className="min-h-screen bg-[#FAF7F2]">

      {/* ── LOADING BAR ── */}
      {loading && (
        <div className="fixed top-0 left-0 right-0 z-[60] h-1 bg-[#FAF7F2]">
          <div className="h-full w-full origin-left animate-[loading_1.5s_ease-in-out_infinite] bg-gradient-to-r from-[#B88A44] via-[#D4A853] to-[#B88A44]" />
        </div>
      )}

      {/* ── HERO ── */}
      <section className="border-b border-black/5 bg-gradient-to-b from-[#F8F4ED] to-[#FAF7F2]">
        <div className="container-premium py-20 lg:py-28">

          <div className="mx-auto max-w-3xl text-center">
            <span className="inline-flex rounded-full border border-[#B88A44]/20 bg-[#B88A44]/10 px-4 py-2 text-xs font-medium text-[#B88A44] md:text-sm">
              Premium Corporate Gifting
            </span>

            <h1 className="mt-5 text-4xl font-semibold leading-tight tracking-tight text-[#0F172A] md:text-6xl">
              Curated Gifts For
              <span className="block text-[#B88A44]">Modern Businesses</span>
            </h1>

            <p className="mx-auto mt-5 max-w-xl text-base leading-7 text-[#667085] md:text-lg">
              Browse our full catalogue of premium, customisable corporate gifts.
              Minimum orders, bulk pricing, and pan-India delivery available.
            </p>

            {/* SEARCH */}
            <div className="mx-auto mt-8 flex max-w-lg items-center gap-2 rounded-2xl border border-black/10 bg-white p-2 shadow-sm">
              <Search className="ml-3 h-4 w-4 shrink-0 text-[#667085]" />
              <input
                value={searchInput}
                onChange={(e) => setSearchInput(e.target.value)}
                onKeyDown={handleKeyDown}
                placeholder="Search products…"
                className="flex-1 bg-transparent py-2 text-sm text-[#0F172A] outline-none placeholder:text-[#667085]"
              />
              <button
                onClick={handleSearch}
                className="rounded-xl bg-[#B88A44] px-5 py-2.5 text-sm font-semibold text-white transition hover:opacity-90"
              >
                Search
              </button>
            </div>
          </div>

        </div>
      </section>

      {/* ── FILTER BAR ── */}
      <section className="sticky top-[64px] z-30 border-b border-black/5 bg-white/90 backdrop-blur-xl md:top-[80px]">
        <div className="container-premium">
          <div className="flex items-center gap-3 overflow-x-auto py-4 scrollbar-none">
            <div className="flex shrink-0 items-center gap-2 pr-3 text-xs font-medium text-[#667085]">
              <SlidersHorizontal className="h-3.5 w-3.5" />
              Filter
            </div>

            <div className="h-4 w-px shrink-0 bg-black/10" />

            <button
              onClick={() => setCategory(null)}
              className={`shrink-0 rounded-full px-4 py-2 text-sm font-medium transition ${
                category === null
                  ? 'bg-[#B88A44] text-white shadow-sm'
                  : 'border border-black/10 bg-transparent text-[#667085] hover:border-[#B88A44] hover:text-[#B88A44]'
              }`}
            >
              All Products
            </button>

            {categories.map((cat: any) => (
              <button
                key={cat.id}
                onClick={() => setCategory(cat.id)}
                className={`shrink-0 rounded-full px-4 py-2 text-sm font-medium transition ${
                  category === cat.id
                    ? 'bg-[#B88A44] text-white shadow-sm'
                    : 'border border-black/10 bg-transparent text-[#667085] hover:border-[#B88A44] hover:text-[#B88A44]'
                }`}
              >
                {cat.name}
              </button>
            ))}
          </div>
        </div>
      </section>

      {/* ── GRID ── */}
      <section className="py-12 lg:py-16">
        <div className="container-premium">

          {/* Result header */}
          {!loading && (
            <div className="mb-7 flex items-center justify-between">
              <p className="text-sm text-[#667085]">
                <span className="font-semibold text-[#0F172A]">{totalCount}</span>{' '}
                {totalCount === 1 ? 'product' : 'products'}
                {category ? ` in ${activeCategoryName}` : ''}
                {totalPages > 1 && <span className="ml-2 text-[#667085]">· Page {page} of {totalPages}</span>}
              </p>
            </div>
          )}

          {loading ? (
            /* SKELETON */
            <div className="grid grid-cols-2 gap-5 md:grid-cols-3 lg:grid-cols-4">
              {Array.from({ length: 8 }).map((_, i) => (
                <div key={i} className="overflow-hidden rounded-2xl border border-black/5 bg-white">
                  <div className="aspect-square animate-pulse bg-[#F0EBE3]" />
                  <div className="space-y-2 p-4">
                    <div className="h-3 w-3/4 animate-pulse rounded bg-[#F0EBE3]" />
                    <div className="h-3 w-1/2 animate-pulse rounded bg-[#F0EBE3]" />
                    <div className="mt-4 h-3 w-1/3 animate-pulse rounded bg-[#F0EBE3]" />
                  </div>
                </div>
              ))}
            </div>
          ) : products.length > 0 ? (
            <>
              <div className="grid grid-cols-2 gap-5 md:grid-cols-3 lg:grid-cols-4">
                {products.map((product) => (
                  <ProductCard key={product.id} product={product} />
                ))}
              </div>

              {/* PAGINATION */}
              {totalPages > 1 && (
                <div className="mt-12 flex items-center justify-center gap-2">
                  <button
                    onClick={() => goToPage(page - 1)}
                    disabled={page === 1}
                    className="flex items-center gap-1 rounded-xl border border-black/10 px-4 py-2.5 text-sm font-medium text-[#667085] transition hover:border-[#B88A44] hover:text-[#B88A44] disabled:opacity-40 disabled:cursor-not-allowed disabled:hover:border-black/10 disabled:hover:text-[#667085]"
                  >
                    ← Previous
                  </button>

                  <div className="flex items-center gap-1">
                    {Array.from({ length: totalPages }, (_, i) => i + 1)
                      .filter((p) => {
                        // Show first, last, current, and neighbors
                        if (p === 1 || p === totalPages) return true
                        if (Math.abs(p - page) <= 1) return true
                        return false
                      })
                      .reduce<(number | string)[]>((acc, p, idx, arr) => {
                        if (idx > 0 && p - (arr[idx - 1] as number) > 1) acc.push('...')
                        acc.push(p)
                        return acc
                      }, [])
                      .map((p, idx) =>
                        p === '...' ? (
                          <span key={`dots-${idx}`} className="px-2 text-sm text-[#667085]">…</span>
                        ) : (
                          <button
                            key={p}
                            onClick={() => goToPage(p as number)}
                            className={`h-10 w-10 rounded-xl text-sm font-medium transition ${
                              page === p
                                ? 'bg-[#B88A44] text-white shadow-sm'
                                : 'border border-black/10 text-[#667085] hover:border-[#B88A44] hover:text-[#B88A44]'
                            }`}
                          >
                            {p}
                          </button>
                        )
                      )}
                  </div>

                  <button
                    onClick={() => goToPage(page + 1)}
                    disabled={page === totalPages}
                    className="flex items-center gap-1 rounded-xl border border-black/10 px-4 py-2.5 text-sm font-medium text-[#667085] transition hover:border-[#B88A44] hover:text-[#B88A44] disabled:opacity-40 disabled:cursor-not-allowed disabled:hover:border-black/10 disabled:hover:text-[#667085]"
                  >
                    Next →
                  </button>
                </div>
              )}
            </>
          ) : (
            /* EMPTY STATE */
            <div className="flex flex-col items-center justify-center rounded-2xl border border-dashed border-black/10 bg-white py-24 text-center">
              <div className="flex h-16 w-16 items-center justify-center rounded-2xl bg-[#B88A44]/10">
                <Package className="h-7 w-7 text-[#B88A44]" />
              </div>
              <h3 className="mt-5 text-lg font-semibold text-[#0F172A]">No products found</h3>
              <p className="mt-2 max-w-xs text-sm text-[#667085]">
                Try adjusting your search or clearing the category filter.
              </p>
              <button
                onClick={() => { setSearchInput(''); setCategory(null) }}
                className="mt-6 rounded-xl border border-black/10 px-5 py-2.5 text-sm font-medium text-[#0F172A] transition hover:border-[#B88A44] hover:text-[#B88A44]"
              >
                Clear filters
              </button>
            </div>
          )}

        </div>
      </section>

    </div>
  )
}
