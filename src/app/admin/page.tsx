'use client'

import { useEffect, useState } from 'react'
import { useRouter } from 'next/navigation'
import Image from 'next/image'
import { supabase } from '@/lib/supabase'
import toast, { Toaster } from 'react-hot-toast'
import {
  Plus, Trash2, Package, LogOut, Loader2, ImageIcon,
  Tag, LayoutGrid, ChevronDown, Star,
} from 'lucide-react'

const EMPTY_PRODUCT = {
  name: '', slug: '', description: '', image_url: '',
  category_id: '', moq: '', price_range: '', featured: false,
}
const EMPTY_CATEGORY = { name: '', slug: '', description: '', image_url: '' }

function slugify(str: string) {
  return str.toLowerCase().trim()
    .replace(/[^a-z0-9\s-]/g, '').replace(/\s+/g, '-')
}

type Tab = 'products' | 'categories' | 'featured'

export default function AdminPage() {
  const router = useRouter()
  const [tab, setTab] = useState<Tab>('products')
  const [products, setProducts] = useState<any[]>([])
  const [categories, setCategories] = useState<any[]>([])
  const [productForm, setProductForm] = useState(EMPTY_PRODUCT)
  const [categoryForm, setCategoryForm] = useState(EMPTY_CATEGORY)
  const [autoSlug, setAutoSlug] = useState(true)
  const [autoCatSlug, setAutoCatSlug] = useState(true)
  const [loadingProduct, setLoadingProduct] = useState(false)
  const [loadingCategory, setLoadingCategory] = useState(false)
  const [deleteId, setDeleteId] = useState<string | null>(null)
  const [deleteCatId, setDeleteCatId] = useState<string | null>(null)

  async function fetchData() {
    const [{ data: pd }, { data: cd }] = await Promise.all([
      supabase.from('products').select('*').order('created_at', { ascending: false }),
      supabase.from('categories').select('*').order('name'),
    ])
    setProducts(pd || [])
    setCategories(cd || [])
  }

  useEffect(() => { fetchData() }, [])

  function handleProductNameChange(value: string) {
    setProductForm((p) => ({ ...p, name: value, slug: autoSlug ? slugify(value) : p.slug }))
  }
  function handleCategoryNameChange(value: string) {
    setCategoryForm((p) => ({ ...p, name: value, slug: autoCatSlug ? slugify(value) : p.slug }))
  }

  async function addProduct() {
    if (!productForm.name.trim() || !productForm.slug.trim()) {
      toast.error('Product name and slug are required.'); return
    }
    setLoadingProduct(true)
    const { error } = await supabase.from('products').insert([{
      name: productForm.name, slug: productForm.slug,
      description: productForm.description || null,
      image_url: productForm.image_url || null,
      category_id: productForm.category_id || null,
      moq: productForm.moq ? Number(productForm.moq) : null,
      price_range: productForm.price_range || null,
      featured: productForm.featured,
    }])
    setLoadingProduct(false)
    if (error) { toast.error(error.message); return }
    toast.success('Product added!')
    setProductForm(EMPTY_PRODUCT); setAutoSlug(true); fetchData()
  }

  async function deleteProduct(id: string) {
    setDeleteId(id)
    const { error } = await supabase.from('products').delete().eq('id', id)
    setDeleteId(null)
    if (error) { toast.error(error.message); return }
    toast.success('Product deleted.'); fetchData()
  }

  async function toggleFeatured(id: string, current: boolean) {
    const { error } = await supabase.from('products').update({ featured: !current }).eq('id', id)
    if (error) { toast.error(error.message); return }
    toast.success(current ? 'Removed from featured.' : 'Added to featured!')
    fetchData()
  }

  async function addCategory() {
    if (!categoryForm.name.trim() || !categoryForm.slug.trim()) {
      toast.error('Category name and slug are required.'); return
    }
    setLoadingCategory(true)
    const { error } = await supabase.from('categories').insert([{
      name: categoryForm.name, slug: categoryForm.slug,
      description: categoryForm.description || null,
      image_url: categoryForm.image_url || null,
    }])
    setLoadingCategory(false)
    if (error) { toast.error(error.message); return }
    toast.success('Category added!')
    setCategoryForm(EMPTY_CATEGORY); setAutoCatSlug(true); fetchData()
  }

  async function deleteCategory(id: string) {
    setDeleteCatId(id)
    const { error } = await supabase.from('categories').delete().eq('id', id)
    setDeleteCatId(null)
    if (error) { toast.error(error.message); return }
    toast.success('Category deleted.'); fetchData()
  }

  async function handleLogout() {
    await fetch('/api/admin/logout', { method: 'POST' })
    router.push('/admin/login'); router.refresh()
  }

  const categoryName = (id: string) => categories.find((c) => c.id === id)?.name ?? '—'
  const inputCls = "w-full rounded-xl border border-black/10 bg-[#FAF7F2] px-4 py-3 text-sm outline-none transition focus:border-[#B88A44] focus:ring-2 focus:ring-[#B88A44]/20"

  return (
    <div className="min-h-screen bg-[#FAF7F2]">
      <Toaster position="top-right" toastOptions={{ className: 'text-sm font-medium' }} />

      {/* TOP BAR */}
      <header className="sticky top-0 z-40 border-b border-black/5 bg-white/90 backdrop-blur-xl">
        <div className="mx-auto flex h-16 max-w-7xl items-center justify-between px-6">
          <div className="flex items-center gap-3">
            <Image src="/images/logo.png" alt="AM Global Hub" width={110} height={32} className="mix-blend-multiply" />
            <span className="hidden rounded-full border border-[#B88A44]/20 bg-[#B88A44]/10 px-3 py-1 text-xs font-medium text-[#B88A44] sm:inline-flex">
              Admin Dashboard
            </span>
          </div>
          <button onClick={handleLogout}
            className="flex items-center gap-2 rounded-xl border border-black/10 px-4 py-2.5 text-sm font-medium text-[#667085] transition hover:border-red-200 hover:bg-red-50 hover:text-red-600">
            <LogOut className="h-4 w-4" /> Sign Out
          </button>
        </div>
      </header>

      <div className="mx-auto max-w-7xl px-6 py-10">

        {/* STATS */}
        <div className="mb-8 grid grid-cols-2 gap-4 sm:grid-cols-4">
          {[
            { icon: Package, label: 'Total Products', value: products.length },
            { icon: LayoutGrid, label: 'Categories', value: categories.length },
            { icon: Star, label: 'Featured', value: products.filter((p) => p.featured).length },
            { icon: Tag, label: 'Unfeatured', value: products.filter((p) => !p.featured).length },
          ].map(({ icon: Icon, label, value }) => (
            <div key={label} className="rounded-2xl border border-black/5 bg-white p-5 shadow-sm">
              <div className="flex h-9 w-9 items-center justify-center rounded-xl bg-[#B88A44]/10">
                <Icon className="h-4 w-4 text-[#B88A44]" />
              </div>
              <p className="mt-3 text-2xl font-bold text-[#0F172A]">{value}</p>
              <p className="mt-0.5 text-xs text-[#667085]">{label}</p>
            </div>
          ))}
        </div>

        {/* TABS */}
        <div className="mb-8 flex gap-1 rounded-2xl border border-black/5 bg-white p-1.5 shadow-sm w-fit">
          {([
            { key: 'products', icon: Package, label: 'Products' },
            { key: 'categories', icon: LayoutGrid, label: 'Categories' },
            { key: 'featured', icon: Star, label: 'Featured' },
          ] as { key: Tab; icon: any; label: string }[]).map(({ key, icon: Icon, label }) => (
            <button key={key} onClick={() => setTab(key)}
              className={`flex items-center gap-2 rounded-xl px-5 py-2.5 text-sm font-medium transition ${
                tab === key ? 'bg-[#B88A44] text-white shadow-sm' : 'text-[#667085] hover:text-[#0F172A]'
              }`}>
              <Icon className="h-4 w-4" />{label}
            </button>
          ))}
        </div>

        {/* ── TAB: PRODUCTS ── */}
        {tab === 'products' && (
          <div className="grid gap-8 lg:grid-cols-[440px_1fr]">
            {/* Add product form */}
            <div className="h-fit rounded-2xl border border-black/5 bg-white shadow-sm">
              <div className="flex items-center gap-3 border-b border-black/5 px-6 py-5">
                <div className="flex h-9 w-9 items-center justify-center rounded-xl bg-[#B88A44]/10">
                  <Plus className="h-4 w-4 text-[#B88A44]" />
                </div>
                <h2 className="text-lg font-semibold text-[#0F172A]">Add Product</h2>
              </div>
              <div className="space-y-5 p-6">
                {/* Image preview */}
                <div>
                  <label className="mb-1.5 block text-xs font-medium text-[#0F172A]">Image URL</label>
                  <div className="mb-3 flex h-36 w-full items-center justify-center overflow-hidden rounded-xl border border-dashed border-black/15 bg-[#FAF7F2]">
                    {productForm.image_url
                      ? <img src={productForm.image_url} alt="Preview" className="h-full w-full object-contain p-2" onError={(e) => { (e.target as HTMLImageElement).style.display = 'none' }} />
                      : <div className="flex flex-col items-center gap-2 text-[#667085]"><ImageIcon className="h-7 w-7 opacity-40" /><span className="text-xs">Image preview</span></div>
                    }
                  </div>
                  <input value={productForm.image_url} onChange={(e) => setProductForm((p) => ({ ...p, image_url: e.target.value }))} placeholder="https://example.com/image.jpg" className={inputCls} />
                </div>
                {/* Name */}
                <div>
                  <label className="mb-1.5 block text-xs font-medium text-[#0F172A]">Product Name <span className="text-[#B88A44]">*</span></label>
                  <input value={productForm.name} onChange={(e) => handleProductNameChange(e.target.value)} placeholder="e.g. Executive Gift Hamper" className={inputCls} />
                </div>
                {/* Slug */}
                <div>
                  <div className="mb-1.5 flex items-center justify-between">
                    <label className="text-xs font-medium text-[#0F172A]">Slug <span className="text-[#B88A44]">*</span></label>
                    <button type="button" onClick={() => setAutoSlug((v) => !v)} className={`text-[10px] font-medium transition ${autoSlug ? 'text-[#B88A44]' : 'text-[#667085]'}`}>
                      {autoSlug ? '⚡ Auto' : 'Manual'}
                    </button>
                  </div>
                  <input value={productForm.slug} onChange={(e) => { setAutoSlug(false); setProductForm((p) => ({ ...p, slug: e.target.value })) }} placeholder="executive-gift-hamper" className={`${inputCls} font-mono`} />
                </div>
                {/* Description */}
                <div>
                  <label className="mb-1.5 block text-xs font-medium text-[#0F172A]">Description</label>
                  <textarea rows={3} value={productForm.description} onChange={(e) => setProductForm((p) => ({ ...p, description: e.target.value }))} placeholder="Describe the product…" className="w-full resize-none rounded-xl border border-black/10 bg-[#FAF7F2] px-4 py-3 text-sm outline-none transition focus:border-[#B88A44] focus:ring-2 focus:ring-[#B88A44]/20" />
                </div>
                {/* Category */}
                <div>
                  <label className="mb-1.5 block text-xs font-medium text-[#0F172A]">Category</label>
                  <div className="relative">
                    <select value={productForm.category_id} onChange={(e) => setProductForm((p) => ({ ...p, category_id: e.target.value }))} className={`${inputCls} appearance-none`}>
                      <option value="">No category</option>
                      {categories.map((c) => <option key={c.id} value={c.id}>{c.name}</option>)}
                    </select>
                    <ChevronDown className="pointer-events-none absolute right-3 top-1/2 h-4 w-4 -translate-y-1/2 text-[#667085]" />
                  </div>
                </div>
                {/* MOQ + Price */}
                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <label className="mb-1.5 block text-xs font-medium text-[#0F172A]">MOQ (units)</label>
                    <input type="number" min="1" value={productForm.moq} onChange={(e) => setProductForm((p) => ({ ...p, moq: e.target.value }))} placeholder="25" className={inputCls} />
                  </div>
                  <div>
                    <label className="mb-1.5 block text-xs font-medium text-[#0F172A]">Price Range</label>
                    <input value={productForm.price_range} onChange={(e) => setProductForm((p) => ({ ...p, price_range: e.target.value }))} placeholder="₹500–₹1,200" className={inputCls} />
                  </div>
                </div>
                {/* Featured toggle */}
                <label className="flex cursor-pointer items-center justify-between rounded-xl border border-black/10 bg-[#FAF7F2] px-4 py-3">
                  <div>
                    <p className="text-sm font-medium text-[#0F172A]">Featured product</p>
                    <p className="text-xs text-[#667085]">Show on the homepage</p>
                  </div>
                  <div onClick={() => setProductForm((p) => ({ ...p, featured: !p.featured }))}
                    className={`relative h-6 w-11 rounded-full transition-colors duration-200 ${productForm.featured ? 'bg-[#B88A44]' : 'bg-black/20'}`}>
                    <span className={`absolute top-0.5 h-5 w-5 rounded-full bg-white shadow transition-transform duration-200 ${productForm.featured ? 'translate-x-5' : 'translate-x-0.5'}`} />
                  </div>
                </label>
                <button onClick={addProduct} disabled={loadingProduct}
                  className="flex w-full items-center justify-center gap-2 rounded-xl bg-[#B88A44] py-3.5 text-sm font-semibold text-white transition hover:opacity-90 disabled:opacity-60">
                  {loadingProduct ? <><Loader2 className="h-4 w-4 animate-spin" />Adding…</> : <><Plus className="h-4 w-4" />Add Product</>}
                </button>
              </div>
            </div>

            {/* Products grid */}
            <div>
              <h2 className="mb-5 text-lg font-semibold text-[#0F172A]">
                All Products <span className="ml-2 rounded-full bg-black/5 px-2.5 py-0.5 text-sm font-normal text-[#667085]">{products.length}</span>
              </h2>
              {products.length === 0 ? (
                <div className="flex flex-col items-center justify-center rounded-2xl border border-dashed border-black/10 bg-white py-20 text-center">
                  <Package className="h-10 w-10 text-black/20" />
                  <p className="mt-3 text-sm font-medium text-[#667085]">No products yet</p>
                </div>
              ) : (
                <div className="grid gap-4 sm:grid-cols-2 xl:grid-cols-3">
                  {products.map((product) => (
                    <div key={product.id} className="group overflow-hidden rounded-2xl border border-black/5 bg-white shadow-sm transition hover:shadow-md">
                      <div className="relative aspect-[4/3] overflow-hidden bg-[#F8F5EF]">
                        {product.image_url
                          ? <img src={product.image_url} alt={product.name} className="h-full w-full object-contain p-4 transition duration-500 group-hover:scale-105" />
                          : <div className="flex h-full items-center justify-center"><ImageIcon className="h-10 w-10 text-black/15" /></div>
                        }
                        {product.featured && <span className="absolute left-3 top-3 rounded-full bg-[#B88A44] px-2.5 py-1 text-[10px] font-semibold text-white">Featured</span>}
                      </div>
                      <div className="p-4">
                        <h3 className="line-clamp-1 font-semibold text-[#0F172A]">{product.name}</h3>
                        <div className="mt-1 flex flex-wrap items-center gap-2">
                          {product.category_id && <span className="rounded-full bg-[#B88A44]/10 px-2 py-0.5 text-[10px] font-medium text-[#B88A44]">{categoryName(product.category_id)}</span>}
                          {product.price_range && <span className="text-xs font-semibold text-[#0F172A]">{product.price_range}</span>}
                          {product.moq && <span className="text-xs text-[#667085]">MOQ: {product.moq}</span>}
                        </div>
                        <div className="mt-4 flex gap-2">
                          <a href={`/products/${product.slug}`} target="_blank" rel="noopener noreferrer"
                            className="flex-1 rounded-xl border border-black/10 py-2 text-center text-xs font-medium text-[#667085] transition hover:border-[#B88A44] hover:text-[#B88A44]">
                            View Page
                          </a>
                          <button onClick={() => deleteProduct(product.id)} disabled={deleteId === product.id}
                            className="flex items-center gap-1.5 rounded-xl border border-red-100 px-3 py-2 text-xs font-medium text-red-500 transition hover:bg-red-50 disabled:opacity-50">
                            {deleteId === product.id ? <Loader2 className="h-3.5 w-3.5 animate-spin" /> : <Trash2 className="h-3.5 w-3.5" />}
                            Delete
                          </button>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              )}
            </div>
          </div>
        )}

        {/* ── TAB: CATEGORIES ── */}
        {tab === 'categories' && (
          <div className="grid gap-8 lg:grid-cols-[440px_1fr]">
            {/* Add category form */}
            <div className="h-fit rounded-2xl border border-black/5 bg-white shadow-sm">
              <div className="flex items-center gap-3 border-b border-black/5 px-6 py-5">
                <div className="flex h-9 w-9 items-center justify-center rounded-xl bg-[#B88A44]/10">
                  <Plus className="h-4 w-4 text-[#B88A44]" />
                </div>
                <h2 className="text-lg font-semibold text-[#0F172A]">Add Category</h2>
              </div>
              <div className="space-y-5 p-6">
                {/* Image preview */}
                <div>
                  <label className="mb-1.5 block text-xs font-medium text-[#0F172A]">Image URL</label>
                  <div className="mb-3 flex h-36 w-full items-center justify-center overflow-hidden rounded-xl border border-dashed border-black/15 bg-[#FAF7F2]">
                    {categoryForm.image_url
                      ? <img src={categoryForm.image_url} alt="Preview" className="h-full w-full object-cover rounded-xl" onError={(e) => { (e.target as HTMLImageElement).style.display = 'none' }} />
                      : <div className="flex flex-col items-center gap-2 text-[#667085]"><ImageIcon className="h-7 w-7 opacity-40" /><span className="text-xs">Image preview</span></div>
                    }
                  </div>
                  <input value={categoryForm.image_url} onChange={(e) => setCategoryForm((p) => ({ ...p, image_url: e.target.value }))} placeholder="https://example.com/image.jpg" className={inputCls} />
                </div>
                {/* Name */}
                <div>
                  <label className="mb-1.5 block text-xs font-medium text-[#0F172A]">Category Name <span className="text-[#B88A44]">*</span></label>
                  <input value={categoryForm.name} onChange={(e) => handleCategoryNameChange(e.target.value)} placeholder="e.g. Executive Kits" className={inputCls} />
                </div>
                {/* Slug */}
                <div>
                  <div className="mb-1.5 flex items-center justify-between">
                    <label className="text-xs font-medium text-[#0F172A]">Slug <span className="text-[#B88A44]">*</span></label>
                    <button type="button" onClick={() => setAutoCatSlug((v) => !v)} className={`text-[10px] font-medium transition ${autoCatSlug ? 'text-[#B88A44]' : 'text-[#667085]'}`}>
                      {autoCatSlug ? '⚡ Auto' : 'Manual'}
                    </button>
                  </div>
                  <input value={categoryForm.slug} onChange={(e) => { setAutoCatSlug(false); setCategoryForm((p) => ({ ...p, slug: e.target.value })) }} placeholder="executive-kits" className={`${inputCls} font-mono`} />
                </div>
                {/* Description */}
                <div>
                  <label className="mb-1.5 block text-xs font-medium text-[#0F172A]">Description</label>
                  <textarea rows={3} value={categoryForm.description} onChange={(e) => setCategoryForm((p) => ({ ...p, description: e.target.value }))} placeholder="Brief description of this category…" className="w-full resize-none rounded-xl border border-black/10 bg-[#FAF7F2] px-4 py-3 text-sm outline-none transition focus:border-[#B88A44] focus:ring-2 focus:ring-[#B88A44]/20" />
                </div>
                <button onClick={addCategory} disabled={loadingCategory}
                  className="flex w-full items-center justify-center gap-2 rounded-xl bg-[#B88A44] py-3.5 text-sm font-semibold text-white transition hover:opacity-90 disabled:opacity-60">
                  {loadingCategory ? <><Loader2 className="h-4 w-4 animate-spin" />Adding…</> : <><Plus className="h-4 w-4" />Add Category</>}
                </button>
              </div>
            </div>

            {/* Categories grid */}
            <div>
              <h2 className="mb-5 text-lg font-semibold text-[#0F172A]">
                All Categories <span className="ml-2 rounded-full bg-black/5 px-2.5 py-0.5 text-sm font-normal text-[#667085]">{categories.length}</span>
              </h2>
              <p className="mb-5 text-xs text-[#667085]">These categories appear on the /products filter bar and the homepage Categories section.</p>
              {categories.length === 0 ? (
                <div className="flex flex-col items-center justify-center rounded-2xl border border-dashed border-black/10 bg-white py-20 text-center">
                  <LayoutGrid className="h-10 w-10 text-black/20" />
                  <p className="mt-3 text-sm font-medium text-[#667085]">No categories yet</p>
                </div>
              ) : (
                <div className="grid gap-4 sm:grid-cols-2 xl:grid-cols-3">
                  {categories.map((cat) => (
                    <div key={cat.id} className="overflow-hidden rounded-2xl border border-black/5 bg-white shadow-sm">
                      {cat.image_url && (
                        <div className="aspect-[16/9] overflow-hidden bg-[#F8F5EF]">
                          <img src={cat.image_url} alt={cat.name} className="h-full w-full object-cover" />
                        </div>
                      )}
                      <div className="p-4">
                        <h3 className="font-semibold text-[#0F172A]">{cat.name}</h3>
                        <p className="mt-0.5 font-mono text-xs text-[#667085]">{cat.slug}</p>
                        {cat.description && <p className="mt-2 line-clamp-2 text-xs text-[#667085]">{cat.description}</p>}
                        <div className="mt-4 flex gap-2">
                          <a href={`/categories/${cat.slug}`} target="_blank" rel="noopener noreferrer"
                            className="flex-1 rounded-xl border border-black/10 py-2 text-center text-xs font-medium text-[#667085] transition hover:border-[#B88A44] hover:text-[#B88A44]">
                            View Page
                          </a>
                          <button onClick={() => deleteCategory(cat.id)} disabled={deleteCatId === cat.id}
                            className="flex items-center gap-1.5 rounded-xl border border-red-100 px-3 py-2 text-xs font-medium text-red-500 transition hover:bg-red-50 disabled:opacity-50">
                            {deleteCatId === cat.id ? <Loader2 className="h-3.5 w-3.5 animate-spin" /> : <Trash2 className="h-3.5 w-3.5" />}
                            Delete
                          </button>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              )}
            </div>
          </div>
        )}

        {/* ── TAB: FEATURED ── */}
        {tab === 'featured' && (
          <div>
            <div className="mb-6">
              <h2 className="text-lg font-semibold text-[#0F172A]">Manage Featured Products</h2>
              <p className="mt-1 text-sm text-[#667085]">
                Toggle which products appear in the Featured Products section on the homepage. Currently{' '}
                <span className="font-semibold text-[#B88A44]">{products.filter((p) => p.featured).length}</span> featured.
              </p>
            </div>
            {products.length === 0 ? (
              <div className="flex flex-col items-center justify-center rounded-2xl border border-dashed border-black/10 bg-white py-20 text-center">
                <Package className="h-10 w-10 text-black/20" />
                <p className="mt-3 text-sm font-medium text-[#667085]">No products yet. Add some from the Products tab.</p>
              </div>
            ) : (
              <div className="grid gap-4 sm:grid-cols-2 xl:grid-cols-4">
                {products.map((product) => (
                  <div key={product.id}
                    className={`overflow-hidden rounded-2xl border bg-white shadow-sm transition ${product.featured ? 'border-[#B88A44]/40 ring-2 ring-[#B88A44]/20' : 'border-black/5'}`}>
                    <div className="relative aspect-square overflow-hidden bg-[#F8F5EF]">
                      {product.image_url
                        ? <img src={product.image_url} alt={product.name} className="h-full w-full object-contain p-4" />
                        : <div className="flex h-full items-center justify-center"><ImageIcon className="h-8 w-8 text-black/15" /></div>
                      }
                      {product.featured && (
                        <div className="absolute inset-0 flex items-center justify-center bg-[#B88A44]/10">
                          <span className="rounded-full bg-[#B88A44] px-3 py-1 text-xs font-semibold text-white">Featured</span>
                        </div>
                      )}
                    </div>
                    <div className="p-4">
                      <h3 className="line-clamp-2 text-sm font-semibold text-[#0F172A]">{product.name}</h3>
                      {product.price_range && <p className="mt-0.5 text-xs font-semibold text-[#B88A44]">{product.price_range}</p>}
                      <button
                        onClick={() => toggleFeatured(product.id, product.featured)}
                        className={`mt-3 flex w-full items-center justify-center gap-2 rounded-xl py-2.5 text-xs font-semibold transition ${
                          product.featured
                            ? 'border border-red-100 text-red-500 hover:bg-red-50'
                            : 'bg-[#B88A44] text-white hover:opacity-90'
                        }`}>
                        <Star className="h-3.5 w-3.5" />
                        {product.featured ? 'Remove from Featured' : 'Add to Featured'}
                      </button>
                    </div>
                  </div>
                ))}
              </div>
            )}
          </div>
        )}

      </div>
    </div>
  )
}
