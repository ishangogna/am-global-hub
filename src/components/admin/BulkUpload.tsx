'use client'

import { useState } from 'react'
import { supabase } from '@/lib/supabase'
import toast from 'react-hot-toast'
import { Upload, Loader2, FileText, Download } from 'lucide-react'

function slugify(str: string) {
  return str.toLowerCase().trim().replace(/[^a-z0-9\s-]/g, '').replace(/\s+/g, '-')
}

function parseCSV(text: string): Record<string, string>[] {
  const lines = text.trim().split('\n')
  if (lines.length < 2) return []
  const headers = lines[0].split(',').map((h) => h.trim().toLowerCase().replace(/\s+/g, '_'))
  return lines.slice(1).map((line) => {
    const values = line.split(',').map((v) => v.trim().replace(/^"|"$/g, ''))
    const row: Record<string, string> = {}
    headers.forEach((h, i) => { row[h] = values[i] || '' })
    return row
  })
}

interface Props {
  categories: any[]
  onDone: () => void
}

export default function BulkUpload({ categories, onDone }: Props) {
  const [open, setOpen] = useState(false)
  const [csv, setCsv] = useState('')
  const [loading, setLoading] = useState(false)
  const [preview, setPreview] = useState<Record<string, string>[]>([])

  function handleFileUpload(file: File) {
    const reader = new FileReader()
    reader.onload = (e) => {
      const text = e.target?.result as string
      setCsv(text)
      setPreview(parseCSV(text).slice(0, 5))
    }
    reader.readAsText(file)
  }

  async function handleImport() {
    const rows = parseCSV(csv)
    if (rows.length === 0) { toast.error('No valid rows found.'); return }

    setLoading(true)

    const products = rows.map((row) => {
      const catName = row.category || ''
      const category = categories.find((c) => c.name.toLowerCase() === catName.toLowerCase())

      return {
        name: row.name || row.product_name || '',
        slug: row.slug || slugify(row.name || row.product_name || ''),
        description: row.description || null,
        image_url: row.image_url || row.image || null,
        category_id: category?.id || null,
        moq: row.moq ? Number(row.moq) : null,
        price_range: row.price_range || row.price || null,
        original_price: row.original_price ? Number(row.original_price) : null,
        discounted_price: row.discounted_price ? Number(row.discounted_price) : null,
        featured: (row.featured || '').toLowerCase() === 'true',
      }
    }).filter((p) => p.name)

    const { error } = await supabase.from('products').insert(products)
    setLoading(false)

    if (error) { toast.error(error.message); return }
    toast.success(`${products.length} products imported!`)
    setCsv('')
    setPreview([])
    setOpen(false)
    onDone()
  }

  const sampleCSV = 'name,description,image_url,category,moq,price_range,featured\nExecutive Notebook,Premium leather notebook,,Corporate Gifts,50,₹500-₹800,false\nWireless Charger,Branded wireless charger,,Tech Gifts,25,₹1000-₹1500,true'

  if (!open) {
    return (
      <button onClick={() => setOpen(true)}
        className="flex items-center gap-2 rounded-xl border border-dashed border-[#B88A44]/30 px-4 py-2.5 text-xs font-medium text-[#B88A44] transition hover:bg-[#B88A44]/5">
        <Upload className="h-3.5 w-3.5" /> Bulk Import (CSV)
      </button>
    )
  }

  return (
    <div className="rounded-2xl border border-[#B88A44]/20 bg-[#B88A44]/5 p-5">
      <div className="flex items-center justify-between mb-4">
        <h3 className="text-sm font-semibold text-[#0F172A]">Bulk Import Products</h3>
        <button onClick={() => { setOpen(false); setCsv(''); setPreview([]) }} className="text-xs text-[#667085] hover:text-red-500">Cancel</button>
      </div>

      <p className="text-xs text-[#667085] mb-3">
        Upload a CSV file with columns: <code className="text-[#B88A44]">name, description, image_url, category, moq, price_range, featured</code>
      </p>

      {/* Download sample */}
      <button onClick={() => {
        const blob = new Blob([sampleCSV], { type: 'text/csv' })
        const url = URL.createObjectURL(blob)
        const a = document.createElement('a'); a.href = url; a.download = 'sample-products.csv'; a.click()
      }} className="mb-4 flex items-center gap-1.5 text-xs font-medium text-[#B88A44] hover:underline">
        <Download className="h-3 w-3" /> Download sample CSV
      </button>

      {/* File input */}
      <label className="flex cursor-pointer items-center justify-center gap-2 rounded-xl border border-dashed border-black/15 bg-white px-4 py-6 transition hover:border-[#B88A44]">
        <FileText className="h-5 w-5 text-[#667085]" />
        <span className="text-xs text-[#667085]">{csv ? `${parseCSV(csv).length} rows loaded` : 'Click to select CSV file'}</span>
        <input type="file" accept=".csv" className="hidden" onChange={(e) => e.target.files?.[0] && handleFileUpload(e.target.files[0])} />
      </label>

      {/* Preview */}
      {preview.length > 0 && (
        <div className="mt-4 overflow-x-auto rounded-xl border border-black/5 bg-white">
          <table className="w-full text-[10px]">
            <thead><tr className="bg-[#FAF7F2]">
              {Object.keys(preview[0]).map((h) => <th key={h} className="px-2 py-1.5 text-left font-semibold text-[#667085]">{h}</th>)}
            </tr></thead>
            <tbody>
              {preview.map((row, i) => (
                <tr key={i} className="border-t border-black/5">
                  {Object.values(row).map((v, j) => <td key={j} className="px-2 py-1.5 text-[#0F172A] max-w-[100px] truncate">{v}</td>)}
                </tr>
              ))}
            </tbody>
          </table>
          <p className="px-2 py-1 text-[9px] text-[#667085]">Showing first 5 rows of {parseCSV(csv).length}</p>
        </div>
      )}

      {/* Import button */}
      {csv && (
        <button onClick={handleImport} disabled={loading}
          className="mt-4 flex w-full items-center justify-center gap-2 rounded-xl bg-[#B88A44] py-3 text-sm font-semibold text-white transition hover:opacity-90 disabled:opacity-60">
          {loading ? <><Loader2 className="h-4 w-4 animate-spin" />Importing…</> : <><Upload className="h-4 w-4" />Import {parseCSV(csv).length} Products</>}
        </button>
      )}
    </div>
  )
}
