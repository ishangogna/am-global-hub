import { supabase } from '@/lib/supabase'
import { notFound } from 'next/navigation'
import Link from 'next/link'
import {
  ChevronRight,
  Package,
  Truck,
  BadgeCheck,
  Palette,
  Tag,
  LayoutGrid,
} from 'lucide-react'
import RequestQuoteModal from '@/components/products/RequestQuoteModal'

export default async function ProductDetails({
  params,
}: {
  params: Promise<{ slug: string }>
}) {
  const { slug } = await params

  const { data, error } = await supabase
    .from('products')
    .select('*')
    .eq('slug', slug)
    .single()

  if (error || !data) notFound()

  // Fetch related products from the same category (excluding current)
  const { data: related } = await supabase
    .from('products')
    .select('id, name, slug, image_url, price_range, category')
    .eq('category', data.category)
    .neq('slug', slug)
    .limit(4)

  return (
    <div className="min-h-screen bg-[#FAF7F2]">

      {/* ── BREADCRUMB ── */}
      <div className="border-b border-black/5 bg-white">
        <div className="container-premium flex items-center gap-2 py-3.5 text-xs text-[#667085]">
          <Link href="/" className="transition hover:text-[#B88A44]">Home</Link>
          <ChevronRight className="h-3 w-3" />
          <Link href="/products" className="transition hover:text-[#B88A44]">Products</Link>
          <ChevronRight className="h-3 w-3" />
          {data.category && (
            <>
              <Link
                href={`/products?category=${data.category}`}
                className="transition hover:text-[#B88A44]"
              >
                {data.category}
              </Link>
              <ChevronRight className="h-3 w-3" />
            </>
          )}
          <span className="line-clamp-1 text-[#0F172A]">{data.name}</span>
        </div>
      </div>

      {/* ── MAIN CONTENT ── */}
      <div className="container-premium py-10 lg:py-14">
        <div className="grid gap-10 lg:grid-cols-[1fr_420px] lg:gap-16 xl:grid-cols-[1fr_460px]">

          {/* LEFT — IMAGE */}
          <div className="space-y-4">
            {/* Primary image */}
            <div className="group overflow-hidden rounded-2xl border border-black/5 bg-white p-6 shadow-sm">
              <img
                src={data.image_url ?? '/images/hero-gift.png'}
                alt={data.name}
                className="h-[360px] w-full object-contain transition duration-500 group-hover:scale-[1.03] md:h-[460px]"
              />
            </div>

            {/* FEATURE BADGES */}
            <div className="grid grid-cols-2 gap-3 sm:grid-cols-4">
              {[
                { icon: Truck, label: 'Pan India Delivery' },
                { icon: Palette, label: 'Custom Branding' },
                { icon: BadgeCheck, label: 'Quality Assured' },
                { icon: Package, label: 'Bulk Orders' },
              ].map(({ icon: Icon, label }) => (
                <div
                  key={label}
                  className="flex flex-col items-center gap-2 rounded-xl border border-black/5 bg-white px-3 py-4 text-center shadow-sm"
                >
                  <Icon className="h-5 w-5 text-[#B88A44]" />
                  <span className="text-xs font-medium text-[#0F172A]">{label}</span>
                </div>
              ))}
            </div>
          </div>

          {/* RIGHT — PRODUCT INFO */}
          <div className="flex flex-col gap-6">

            {/* Category pill */}
            {data.category && (
              <div>
                <span className="inline-flex items-center gap-1.5 rounded-full border border-[#B88A44]/20 bg-[#B88A44]/10 px-3 py-1 text-xs font-medium text-[#B88A44]">
                  <LayoutGrid className="h-3 w-3" />
                  {data.category}
                </span>
              </div>
            )}

            {/* Name */}
            <h1 className="text-3xl font-semibold leading-tight text-[#0F172A] md:text-4xl">
              {data.name}
            </h1>

            {/* Price range */}
            {data.price_range && (
              <div className="flex items-baseline gap-2">
                <span className="text-3xl font-bold text-[#B88A44]">
                  {data.price_range}
                </span>
                <span className="text-sm text-[#667085]">/ unit (varies by qty)</span>
              </div>
            )}

            {/* Divider */}
            <div className="h-px bg-black/5" />

            {/* Description */}
            {data.description && (
              <p className="text-[15px] leading-7 text-[#667085]">
                {data.description}
              </p>
            )}

            {/* Specs */}
            <div className="rounded-xl border border-black/5 bg-white shadow-sm">
              <div className="flex items-center gap-2 border-b border-black/5 px-5 py-4">
                <Tag className="h-4 w-4 text-[#B88A44]" />
                <span className="text-sm font-semibold text-[#0F172A]">Product Details</span>
              </div>
              <div className="divide-y divide-black/5">
                {[
                  { label: 'Minimum Order Qty', value: data.moq ? `${data.moq} units` : 'Contact us' },
                  { label: 'Price Range', value: data.price_range ?? 'Get a quote' },
                  { label: 'Category', value: data.category ?? '—' },
                  { label: 'Custom Branding', value: 'Available on request' },
                  { label: 'Delivery', value: 'Pan India · 7–14 business days' },
                ].map(({ label, value }) => (
                  <div key={label} className="flex items-center justify-between px-5 py-3.5">
                    <span className="text-sm text-[#667085]">{label}</span>
                    <span className="text-right text-sm font-medium text-[#0F172A]">{value}</span>
                  </div>
                ))}
              </div>
            </div>

            {/* CTA */}
            <div className="space-y-3">
              <RequestQuoteModal productName={data.name} />
              <Link
                href="/contact"
                className="flex w-full items-center justify-center rounded-xl border border-black/10 bg-white px-8 py-4 text-base font-semibold text-[#0F172A] transition hover:border-[#B88A44] hover:text-[#B88A44]"
              >
                Talk to Our Team
              </Link>
            </div>

            {/* Trust note */}
            <p className="text-center text-xs text-[#667085]">
              🔒 Your enquiry is confidential. No spam, ever.
            </p>

          </div>
        </div>

        {/* ── RELATED PRODUCTS ── */}
        {related && related.length > 0 && (
          <section className="mt-20">
            <div className="mb-8 flex items-end justify-between">
              <div>
                <p className="text-xs font-medium uppercase tracking-widest text-[#B88A44]">
                  More Like This
                </p>
                <h2 className="mt-1 text-2xl font-semibold text-[#0F172A]">
                  Related Products
                </h2>
              </div>
              <Link
                href="/products"
                className="text-sm font-medium text-[#B88A44] transition hover:opacity-70"
              >
                View all →
              </Link>
            </div>

            <div className="grid grid-cols-2 gap-4 md:grid-cols-4">
              {related.map((item) => (
                <Link
                  key={item.id}
                  href={`/products/${item.slug}`}
                  className="group overflow-hidden rounded-2xl border border-black/5 bg-white transition hover:-translate-y-1 hover:shadow-md"
                >
                  <div className="aspect-square overflow-hidden bg-[#F8F5EF] p-4">
                    <img
                      src={item.image_url ?? '/images/hero-gift.png'}
                      alt={item.name}
                      className="h-full w-full object-contain transition duration-500 group-hover:scale-105"
                    />
                  </div>
                  <div className="p-4">
                    <h3 className="line-clamp-2 text-sm font-medium text-[#0F172A] group-hover:text-[#B88A44]">
                      {item.name}
                    </h3>
                    {item.price_range && (
                      <p className="mt-1 text-sm font-semibold text-[#B88A44]">
                        {item.price_range}
                      </p>
                    )}
                  </div>
                </Link>
              ))}
            </div>
          </section>
        )}
      </div>
    </div>
  )
}
