import { supabase } from '@/lib/supabase'
import ProductsClient from './ProductsClient'

export default async function ProductsPage({ searchParams }: any) {
  const { data: categories } = await supabase
    .from('categories')
    .select('*')

  return (
    <ProductsClient
      categories={categories || []}
      category={searchParams?.category || null}
    />
  )
}