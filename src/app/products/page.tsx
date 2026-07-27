import { supabase } from '@/lib/supabase'
import ProductsClient from './ProductsClient'
import type { Metadata } from 'next'

export const metadata: Metadata = {
  title: 'Products | AM Global Hub',
  description: 'Browse our full catalogue of premium corporate gifts. Custom branding, bulk orders, and pan-India delivery available.',
  openGraph: {
    title: 'Products — AM Global Hub',
    description: 'Premium corporate gifting solutions for modern businesses.',
  },
}

export default async function ProductsPage({
  searchParams,
}: {
  searchParams: Promise<{ category?: string }>
}) {
  const { category } = await searchParams

  const { data: categories } = await supabase
    .from('categories')
    .select('*')
    .order('name')

  return (
    <ProductsClient
      categories={categories || []}
      category={category ?? null}
    />
  )
}
