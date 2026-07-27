'use client'

import { useEffect, useState } from 'react'
import Link from 'next/link'

interface RecentProduct {
  id: string
  name: string
  slug: string
  image_url?: string
  price_range?: string
}

const STORAGE_KEY = 'amgh_recently_viewed'
const MAX_ITEMS = 5

export function addToRecentlyViewed(product: RecentProduct) {
  if (typeof window === 'undefined') return
  const existing: RecentProduct[] = JSON.parse(localStorage.getItem(STORAGE_KEY) || '[]')
  const filtered = existing.filter((p) => p.id !== product.id)
  filtered.unshift(product)
  localStorage.setItem(STORAGE_KEY, JSON.stringify(filtered.slice(0, MAX_ITEMS)))
}

export default function RecentlyViewed({ currentProductId }: { currentProductId?: string }) {
  const [products, setProducts] = useState<RecentProduct[]>([])

  useEffect(() => {
    const stored: RecentProduct[] = JSON.parse(localStorage.getItem(STORAGE_KEY) || '[]')
    setProducts(currentProductId ? stored.filter((p) => p.id !== currentProductId) : stored)
  }, [currentProductId])

  if (products.length === 0) return null

  return (
    <section className="py-10">
      <div className="container-premium">
        <h3 className="mb-5 text-sm font-semibold text-[#0F172A]">Recently Viewed</h3>
        <div className="flex gap-4 overflow-x-auto pb-2 scrollbar-none">
          {products.map((p) => (
            <Link
              key={p.id}
              href={`/products/${p.slug}`}
              className="group flex w-40 shrink-0 flex-col overflow-hidden rounded-2xl border border-black/5 bg-white transition hover:-translate-y-1 hover:shadow-md"
            >
              <div className="aspect-square overflow-hidden bg-[#F8F5EF] p-3">
                {p.image_url ? (
                  <img src={p.image_url} alt={p.name} className="h-full w-full object-contain transition duration-300 group-hover:scale-105" />
                ) : (
                  <div className="flex h-full items-center justify-center text-2xl opacity-20">🎁</div>
                )}
              </div>
              <div className="p-3">
                <p className="line-clamp-2 text-xs font-medium text-[#0F172A] group-hover:text-[#B88A44]">{p.name}</p>
                {p.price_range && <p className="mt-1 text-[10px] font-semibold text-[#B88A44]">{p.price_range}</p>}
              </div>
            </Link>
          ))}
        </div>
      </div>
    </section>
  )
}
