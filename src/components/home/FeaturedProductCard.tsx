'use client'

import { useState } from 'react'
import Link from 'next/link'
import { MessageSquare, X, CheckCircle2, Loader2 } from 'lucide-react'

const WA_NUMBER = '918168667321'

function buildWhatsAppUrl(productName: string, form: {
  name: string; company: string; email: string; phone: string; quantity: string; message: string
}) {
  const lines = [
    `Hi, I'd like to request a quote for the following product on AM Global Hub:`,
    ``,
    `📦 *Product:* ${productName}`,
    `👤 *Name:* ${form.name}`,
    form.company ? `🏢 *Company:* ${form.company}` : null,
    form.email   ? `📧 *Email:* ${form.email}`     : null,
    form.phone   ? `📞 *Phone:* ${form.phone}`     : null,
    `🔢 *Quantity Required:* ${form.quantity}`,
    form.message ? `📝 *Notes:* ${form.message}`   : null,
  ].filter(Boolean).join('\n')

  return `https://wa.me/${WA_NUMBER}?text=${encodeURIComponent(lines)}`
}

const WA_ICON = (
  <svg viewBox="0 0 24 24" className="h-4 w-4 fill-[#25D366]" xmlns="http://www.w3.org/2000/svg">
    <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z"/>
  </svg>
)

const EMPTY_FORM = { name: '', company: '', email: '', phone: '', quantity: '', message: '' }

interface Props {
  product: {
    id: string
    name: string
    slug: string
    image_url?: string
    price_range?: string
    moq?: number
    description?: string
    category?: string
  }
}

export default function FeaturedProductCard({ product }: Props) {
  const [open, setOpen] = useState(false)
  const [submitted, setSubmitted] = useState(false)
  const [loading, setLoading] = useState(false)
  const [form, setForm] = useState(EMPTY_FORM)

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) =>
    setForm((p) => ({ ...p, [e.target.name]: e.target.value }))

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setLoading(true)
    await new Promise((r) => setTimeout(r, 1000))
    setLoading(false)
    setSubmitted(true)
  }

  const handleClose = () => {
    setOpen(false)
    setTimeout(() => { setSubmitted(false); setForm(EMPTY_FORM) }, 300)
  }

  const inputCls = "w-full rounded-xl border border-black/10 bg-[#FAF7F2] px-4 py-3 text-sm outline-none transition focus:border-[#B88A44] focus:ring-2 focus:ring-[#B88A44]/20"

  return (
    <>
      {/* ── CARD ── */}
      <div className="group flex flex-col overflow-hidden rounded-[28px] border border-black/5 bg-white transition hover:-translate-y-1 hover:shadow-xl">
        {/* Image */}
        <Link href={`/products/${product.slug}`}>
          <div className="overflow-hidden bg-[#F8F5EF] p-8">
            <img
              src={product.image_url ?? '/images/hero-gift.png'}
              alt={product.name}
              className="h-56 w-full object-contain transition duration-500 group-hover:scale-105"
            />
          </div>
        </Link>

        <div className="flex flex-1 flex-col p-6">
          <span className="rounded-full bg-[#B88A44]/10 px-3 py-1 text-xs font-medium text-[#B88A44] self-start">
            Custom Branding Available
          </span>

          <Link href={`/products/${product.slug}`}>
            <h3 className="mt-3 text-lg font-semibold text-[#0F172A] transition hover:text-[#B88A44]">
              {product.name}
            </h3>
          </Link>

          {product.moq && (
            <p className="mt-1 text-sm text-[#667085]">MOQ: {product.moq} Units</p>
          )}

          <div className="mt-auto flex items-center justify-between pt-5">
            {product.price_range ? (
              <span className="text-2xl font-bold text-[#0F172A]">
                {product.price_range}
              </span>
            ) : (
              <span className="text-sm text-[#667085]">Price on request</span>
            )}

            <button
              onClick={() => setOpen(true)}
              className="flex items-center gap-1.5 rounded-xl bg-[#B88A44] px-4 py-2.5 text-sm font-semibold text-white transition hover:opacity-90 active:scale-95"
            >
              <MessageSquare className="h-4 w-4" />
              Request Quote
            </button>
          </div>
        </div>
      </div>

      {/* ── MODAL ── */}
      {open && (
        <div
          className="fixed inset-0 z-50 flex items-center justify-center bg-black/40 px-4 backdrop-blur-sm"
          onClick={handleClose}
        >
          <div
            className="relative max-h-[90vh] w-full max-w-lg overflow-y-auto rounded-2xl bg-white shadow-2xl"
            onClick={(e) => e.stopPropagation()}
          >
            {/* Header */}
            <div className="flex items-start justify-between border-b border-black/5 p-6">
              <div>
                <h2 className="text-xl font-semibold text-[#0F172A]">Request a Quote</h2>
                <p className="mt-1 text-sm text-[#667085]">{product.name}</p>
              </div>
              <button
                onClick={handleClose}
                className="flex h-8 w-8 items-center justify-center rounded-lg border border-black/10 text-[#667085] transition hover:bg-black/5"
              >
                <X className="h-4 w-4" />
              </button>
            </div>

            {/* Body */}
            <div className="p-6">
              {submitted ? (
                <div className="flex flex-col items-center py-8 text-center">
                  <CheckCircle2 className="h-14 w-14 text-[#B88A44]" />
                  <h3 className="mt-4 text-xl font-semibold text-[#0F172A]">Quote Request Sent!</h3>
                  <p className="mt-2 max-w-xs text-sm text-[#667085]">
                    Our team will get back to you within 24 hours.
                  </p>
                  <button
                    onClick={handleClose}
                    className="mt-5 rounded-xl bg-[#B88A44] px-6 py-3 text-sm font-semibold text-white transition hover:opacity-90"
                  >
                    Done
                  </button>
                  <div className="mt-4 flex w-full items-center gap-3">
                    <div className="h-px flex-1 bg-black/8" />
                    <span className="text-xs text-[#667085]">or follow up on WhatsApp</span>
                    <div className="h-px flex-1 bg-black/8" />
                  </div>
                  <div className="mt-4 grid w-full grid-cols-1 gap-3">
                    <a href={buildWhatsAppUrl(product.name, form)} target="_blank" rel="noopener noreferrer"
                      className="flex items-center justify-center gap-2 rounded-xl border border-[#25D366]/30 bg-[#25D366]/8 py-3 text-sm font-semibold text-[#128C52] transition hover:bg-[#25D366]/15">
                      {WA_ICON} WhatsApp Us
                    </a>
                  </div>
                </div>
              ) : (
                <form onSubmit={handleSubmit} className="space-y-4">
                  <div className="grid grid-cols-2 gap-4">
                    <div>
                      <label className="mb-1.5 block text-xs font-medium text-[#0F172A]">Full Name <span className="text-[#B88A44]">*</span></label>
                      <input name="name" value={form.name} onChange={handleChange} required placeholder="John Smith" className={inputCls} />
                    </div>
                    <div>
                      <label className="mb-1.5 block text-xs font-medium text-[#0F172A]">Company</label>
                      <input name="company" value={form.company} onChange={handleChange} placeholder="Acme Corp" className={inputCls} />
                    </div>
                  </div>
                  <div className="grid grid-cols-2 gap-4">
                    <div>
                      <label className="mb-1.5 block text-xs font-medium text-[#0F172A]">Email <span className="text-[#B88A44]">*</span></label>
                      <input name="email" type="email" value={form.email} onChange={handleChange} required placeholder="you@company.com" className={inputCls} />
                    </div>
                    <div>
                      <label className="mb-1.5 block text-xs font-medium text-[#0F172A]">Phone</label>
                      <input name="phone" type="tel" value={form.phone} onChange={handleChange} placeholder="+91 98765 43210" className={inputCls} />
                    </div>
                  </div>
                  <div>
                    <label className="mb-1.5 block text-xs font-medium text-[#0F172A]">Quantity Required <span className="text-[#B88A44]">*</span></label>
                    <input name="quantity" value={form.quantity} onChange={handleChange} required placeholder="e.g. 100 units" className={inputCls} />
                  </div>
                  <div>
                    <label className="mb-1.5 block text-xs font-medium text-[#0F172A]">Additional Notes</label>
                    <textarea name="message" value={form.message} onChange={handleChange} rows={3}
                      placeholder="Branding requirements, delivery timeline, customisation needs…"
                      className="w-full resize-none rounded-xl border border-black/10 bg-[#FAF7F2] px-4 py-3 text-sm outline-none transition focus:border-[#B88A44] focus:ring-2 focus:ring-[#B88A44]/20" />
                  </div>

                  <button type="submit" disabled={loading}
                    className="flex w-full items-center justify-center gap-2 rounded-xl bg-[#B88A44] py-3.5 text-sm font-semibold text-white transition hover:opacity-90 disabled:opacity-60">
                    {loading ? <><Loader2 className="h-4 w-4 animate-spin" />Sending…</> : 'Submit Quote Request'}
                  </button>

                  <div className="flex items-center gap-3">
                    <div className="h-px flex-1 bg-black/8" />
                    <span className="text-xs text-[#667085]">or contact directly</span>
                    <div className="h-px flex-1 bg-black/8" />
                  </div>

                  <div className="grid grid-cols-1 gap-3">
                    <a href={buildWhatsAppUrl(product.name, form)} target="_blank" rel="noopener noreferrer"
                      className="flex items-center justify-center gap-2 rounded-xl border border-[#25D366]/30 bg-[#25D366]/8 py-3 text-sm font-semibold text-[#128C52] transition hover:bg-[#25D366]/15">
                      {WA_ICON} WhatsApp Us
                    </a>
                  </div>
                </form>
              )}
            </div>
          </div>
        </div>
      )}
    </>
  )
}
