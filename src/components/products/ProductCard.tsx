'use client'

import { useState, useEffect } from 'react'
import Link from 'next/link'
import { ArrowUpRight, Heart } from 'lucide-react'
import { createAuthClient } from '@/lib/supabase-auth'

export default function ProductCard({ product }: any) {
  const supabase = createAuthClient()
  const [saved, setSaved] = useState(false)
  const [userId, setUserId] = useState<string | null>(null)

  useEffect(() => {
    async function checkSaved() {
      const { data: { user } } = await supabase.auth.getUser()
      if (!user) return
      setUserId(user.id)

      const { data } = await supabase
        .from('saved_products')
        .select('id')
        .eq('user_id', user.id)
        .eq('product_id', product.id)
        .single()

      if (data) setSaved(true)
    }
    checkSaved()
  }, [product.id])

  async function toggleSave(e: React.MouseEvent) {
    e.preventDefault()
    e.stopPropagation()

    if (!userId) {
      // Not logged in — redirect to auth
      window.location.href = '/auth'
      return
    }

    if (saved) {
      await supabase
        .from('saved_products')
        .delete()
        .eq('user_id', userId)
        .eq('product_id', product.id)
      setSaved(false)
    } else {
      await supabase
        .from('saved_products')
        .insert([{ user_id: userId, product_id: product.id }])
      setSaved(true)
    }
  }

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

          {/* Discount badge */}
          {product.original_price && product.discounted_price && product.discounted_price < product.original_price && (
            <span className="absolute right-3 top-3 rounded-full bg-[#25D366] px-2.5 py-1 text-[10px] font-bold text-white shadow-sm">
              {Math.round((1 - product.discounted_price / product.original_price) * 100)}% OFF
            </span>
          )}

          {/* Wishlist heart */}
          <button
            onClick={toggleSave}
            className={`absolute right-3 top-3 flex h-8 w-8 items-center justify-center rounded-full border transition duration-200 ${
              saved
                ? 'border-red-200 bg-red-50 text-red-500'
                : 'border-black/10 bg-white/80 text-[#667085] opacity-0 group-hover:opacity-100 hover:border-red-200 hover:text-red-500'
            }`}
            aria-label={saved ? 'Remove from wishlist' : 'Add to wishlist'}
          >
            <Heart className={`h-4 w-4 ${saved ? 'fill-red-500' : ''}`} />
          </button>
        </div>

        {/* CONTENT */}
        <div className="flex flex-1 flex-col p-4">
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
              {product.discounted_price && product.original_price && product.discounted_price < product.original_price ? (
                <div className="flex items-baseline gap-2">
                  <span className="text-sm font-bold text-[#0F172A]">
                    ₹{product.discounted_price.toLocaleString('en-IN')}
                  </span>
                  <span className="text-xs text-[#667085] line-through">
                    ₹{product.original_price.toLocaleString('en-IN')}
                  </span>
                </div>
              ) : product.price_range ? (
                <span className="text-sm font-bold text-[#0F172A]">
                  {product.price_range}
                </span>
              ) : null}
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
