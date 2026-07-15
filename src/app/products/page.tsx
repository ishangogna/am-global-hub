import { supabase } from '@/lib/supabase'
import ProductsClient from './ProductsClient'

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
