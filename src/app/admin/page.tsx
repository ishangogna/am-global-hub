'use client'

import { useEffect, useState } from 'react'
import { supabase } from '@/lib/supabase'
import toast, { Toaster } from 'react-hot-toast'

export default function AdminPage() {
  const [products, setProducts] = useState<any[]>([])
  const [categories, setCategories] = useState<any[]>([])

  const [loading, setLoading] = useState(false)

  const [form, setForm] = useState({
    name: '',
    slug: '',
    description: '',
    image_url: '',
    category_id: '',
    moq: '',
    price_range: '',
  })

  async function fetchData() {
    const { data: productData } = await supabase
      .from('products')
      .select('*')
      .order('created_at', { ascending: false })

    const { data: categoryData } = await supabase
      .from('categories')
      .select('*')

    setProducts(productData || [])
    setCategories(categoryData || [])
  }

  useEffect(() => {
    fetchData()
  }, [])

  async function addProduct() {
    if (!form.name || !form.slug) {
      toast.error('Name and slug required')
      return
    }

    setLoading(true)

    const { error } = await supabase
      .from('products')
      .insert([
        {
          ...form,
          featured: false,
        },
      ])

    setLoading(false)

    if (error) {
      toast.error(error.message)
      return
    }

    toast.success('Product added')

    setForm({
      name: '',
      slug: '',
      description: '',
      image_url: '',
      category_id: '',
      moq: '',
      price_range: '',
    })

    fetchData()
  }
  async function deleteProduct(id: string) {
    const confirmed = confirm('Delete this product?')

    if (!confirmed) return

    const { error } = await supabase
      .from('products')
      .delete()
      .eq('id', id)

    if (error) {
      toast.error(error.message)
      return
    }

    toast.success('Product deleted')

    fetchData()
  }
 return (
    <main className='min-h-screen bg-[#F7F3EE] p-6 md:p-10'>
      <Toaster position='top-right' />

      <div className='mx-auto max-w-7xl'>
        {/* HEADER */}
        <div>
          <span className='inline-flex rounded-full border border-[#B88A44]/15 bg-[#B88A44]/10 px-4 py-2 text-sm font-medium text-[#B88A44]'>
            Admin Dashboard
          </span>

          <h1 className='mt-6 text-4xl font-semibold text-[#111827] md:text-5xl'>
            Manage Website Content
          </h1>

          <p className='mt-4 max-w-2xl text-[#667085]'>
            Add products, update homepage content, and manage gifting
            collections.
          </p>
        </div>
{/* GRID */}
        <div className='mt-12 grid gap-8 lg:grid-cols-[420px_1fr]'>
          {/* FORM */}
          <div className='rounded-[32px] border border-black/5 bg-white p-8 shadow-sm'>
            <h2 className='text-2xl font-semibold text-[#111827]'>
              Add Product
            </h2>

            <div className='mt-8 space-y-5'>
              <input
                placeholder='Product Name'
                value={form.name}
                onChange={(e) =>
                  setForm({ ...form, name: e.target.value })
                }
                className='w-full rounded-xl border border-black/10 px-4 py-3 outline-none transition focus:border-[#B88A44]'
              />

              <input
                placeholder='Slug'
                value={form.slug}
                onChange={(e) =>
                  setForm({ ...form, slug: e.target.value })
                }
                className='w-full rounded-xl border border-black/10 px-4 py-3 outline-none transition focus:border-[#B88A44]'
              />

              <textarea
                placeholder='Description'
                rows={5}
                value={form.description}
                onChange={(e) =>
                  setForm({
                    ...form,
                    description: e.target.value,
                  })
                }
                className='w-full rounded-xl border border-black/10 px-4 py-3 outline-none transition focus:border-[#B88A44]'
              />
              <input
                placeholder='Image URL'
                value={form.image_url}
                onChange={(e) =>
                  setForm({
                    ...form,
                    image_url: e.target.value,
                  })
                }
                className='w-full rounded-xl border border-black/10 px-4 py-3 outline-none transition focus:border-[#B88A44]'
              />
<select
                value={form.category_id}
                onChange={(e) =>
                  setForm({
                    ...form,
                    category_id: e.target.value,
                  })
                }
                className='w-full rounded-xl border border-black/10 px-4 py-3 outline-none transition focus:border-[#B88A44]'
              >
                <option value=''>Select Category</option>

                {categories.map((category) => (
                  <option
                    key={category.id}
                    value={category.id}
                  >
                    {category.name}
                  </option>
                ))}
              </select>
 <input
                placeholder='MOQ'
                value={form.moq}
                onChange={(e) =>
                  setForm({ ...form, moq: e.target.value })
                }
                className='w-full rounded-xl border border-black/10 px-4 py-3 outline-none transition focus:border-[#B88A44]'
              />
<input
                placeholder='Price Range'
                value={form.price_range}
                onChange={(e) =>
                  setForm({
                    ...form,
                    price_range: e.target.value,
                  })
                }
                className='w-full rounded-xl border border-black/10 px-4 py-3 outline-none transition focus:border-[#B88A44]'
              />
              <button
                onClick={addProduct}
                disabled={loading}
                className='w-full rounded-xl bg-[#B88A44] px-6 py-4 text-sm font-medium text-white transition hover:opacity-90 disabled:opacity-50'
              >
                {loading ? 'Adding Product...' : 'Add Product'}
              </button>
            </div>
          </div>
          {/* PRODUCTS */}
          <div>
            <div className='grid gap-6 md:grid-cols-2 xl:grid-cols-3'>
              {products.map((product) => (
                <div
                  key={product.id}
                  className='overflow-hidden rounded-[28px] border border-black/5 bg-white'
                >
                  <img
                    src={product.image_url}
                    alt={product.name}
                    className='h-[240px] w-full object-cover'
                  />

                  <div className='p-6'>
                    <h3 className='text-xl font-semibold text-[#111827]'>
                      {product.name}
                    </h3>

                    <p className='mt-3 line-clamp-3 text-sm leading-7 text-[#667085]'>
                      {product.description}
                    </p>

                    <button
                      onClick={() => deleteProduct(product.id)}
                      className='mt-6 w-full rounded-xl border border-red-200 px-4 py-3 text-sm font-medium text-red-600 transition hover:bg-red-50'
                    >
                      Delete Product
                    </button>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </main>
  )
}
