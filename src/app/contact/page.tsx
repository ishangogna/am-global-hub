'use client'

import { useState } from 'react'
import Link from 'next/link'
import {
  MapPin,
  Phone,
  Clock,
  MessageCircle,
  Mail,
  Send,
  Loader2,
  CheckCircle2,
  ChevronRight,
} from 'lucide-react'

const HOURS = [
  { day: 'Monday',    time: '10 AM – 5 PM' },
  { day: 'Tuesday',   time: '10 AM – 5 PM' },
  { day: 'Wednesday', time: '10 AM – 5 PM' },
  { day: 'Thursday',  time: '10 AM – 5 PM' },
  { day: 'Friday',    time: '10 AM – 5 PM' },
  { day: 'Saturday',  time: '10:30 AM – 5 PM' },
  { day: 'Sunday',    time: 'Closed' },
]

const today = new Date().toLocaleDateString('en-US', { weekday: 'long' })

export default function ContactPage() {
  const [form, setForm] = useState({
    name: '', company: '', email: '', phone: '', message: '',
  })
  const [loading, setLoading] = useState(false)
  const [submitted, setSubmitted] = useState(false)

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => setForm((p) => ({ ...p, [e.target.name]: e.target.value }))

  function buildContactWhatsAppUrl() {
    const lines = [
      `Hi, I'd like to get in touch with AM Global Hub:`,
      ``,
      `👤 *Name:* ${form.name}`,
      form.company ? `🏢 *Company:* ${form.company}` : null,
      form.email   ? `📧 *Email:* ${form.email}`     : null,
      form.phone   ? `📞 *Phone:* ${form.phone}`     : null,
      ``,
      `📝 *Message:*`,
      form.message,
    ].filter(Boolean).join('\n')

    return `https://wa.me/918168667321?text=${encodeURIComponent(lines)}`
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setLoading(true)
    // Replace with real API / Supabase insert
    await new Promise((r) => setTimeout(r, 1200))
    setLoading(false)
    setSubmitted(true)
  }

  return (
    <div className="min-h-screen bg-[#FAF7F2]">

      {/* ── BREADCRUMB ── */}
      <div className="border-b border-black/5 bg-white">
        <div className="container-premium flex items-center gap-2 py-3.5 text-xs text-[#667085]">
          <Link href="/" className="transition hover:text-[#B88A44]">Home</Link>
          <ChevronRight className="h-3 w-3" />
          <span className="text-[#0F172A]">Contact</span>
        </div>
      </div>

      {/* ── HERO ── */}
      <section className="border-b border-black/5 bg-gradient-to-b from-[#F8F4ED] to-[#FAF7F2]">
        <div className="container-premium py-16 lg:py-20 text-center">
          <span className="inline-flex rounded-full border border-[#B88A44]/20 bg-[#B88A44]/10 px-4 py-2 text-xs font-medium text-[#B88A44] md:text-sm">
            Get in Touch
          </span>
          <h1 className="mt-5 text-4xl font-semibold tracking-tight text-[#0F172A] md:text-5xl lg:text-6xl">
            We&apos;d Love to Hear
            <span className="block text-[#B88A44]">From You</span>
          </h1>
          <p className="mx-auto mt-5 max-w-xl text-base leading-7 text-[#667085] md:text-lg">
            Whether you have a bulk order, a branding question, or just want to explore what&apos;s possible — we&apos;re here for it.
          </p>
        </div>
      </section>

      {/* ── MAIN GRID ── */}
      <div className="container-premium py-14 lg:py-20">
        <div className="grid gap-10 lg:grid-cols-[1fr_400px] xl:grid-cols-[1fr_440px]">

          {/* LEFT — CONTACT FORM */}
          <div className="rounded-2xl border border-black/5 bg-white p-8 shadow-sm">
            <h2 className="text-2xl font-semibold text-[#0F172A]">Send us a Message</h2>
            <p className="mt-1.5 text-sm text-[#667085]">
              We typically respond within one business day.
            </p>

            {submitted ? (
              <div className="mt-10 flex flex-col items-center py-10 text-center">
                <CheckCircle2 className="h-16 w-16 text-[#B88A44]" />
                <h3 className="mt-5 text-2xl font-semibold text-[#0F172A]">Message Received!</h3>
                <p className="mt-2 max-w-xs text-sm text-[#667085]">
                  Thanks for reaching out. We will get back to you shortly.
                </p>
                <button
                  onClick={() => { setSubmitted(false); setForm({ name: '', company: '', email: '', phone: '', message: '' }) }}
                  className="mt-6 rounded-xl border border-black/10 px-6 py-3 text-sm font-medium text-[#0F172A] transition hover:border-[#B88A44] hover:text-[#B88A44]"
                >
                  Send another message
                </button>
              </div>
            ) : (
              <form onSubmit={handleSubmit} className="mt-8 space-y-5">
                <div className="grid gap-5 sm:grid-cols-2">
                  <div>
                    <label className="mb-1.5 block text-xs font-medium text-[#0F172A]">
                      Full Name <span className="text-[#B88A44]">*</span>
                    </label>
                    <input
                      name="name" value={form.name} onChange={handleChange} required
                      placeholder="Jane Doe"
                      className="w-full rounded-xl border border-black/10 bg-[#FAF7F2] px-4 py-3 text-sm outline-none transition focus:border-[#B88A44] focus:ring-2 focus:ring-[#B88A44]/20"
                    />
                  </div>
                  <div>
                    <label className="mb-1.5 block text-xs font-medium text-[#0F172A]">
                      Company
                    </label>
                    <input
                      name="company" value={form.company} onChange={handleChange}
                      placeholder="Acme Corp"
                      className="w-full rounded-xl border border-black/10 bg-[#FAF7F2] px-4 py-3 text-sm outline-none transition focus:border-[#B88A44] focus:ring-2 focus:ring-[#B88A44]/20"
                    />
                  </div>
                </div>

                <div className="grid gap-5 sm:grid-cols-2">
                  <div>
                    <label className="mb-1.5 block text-xs font-medium text-[#0F172A]">
                      Email <span className="text-[#B88A44]">*</span>
                    </label>
                    <input
                      name="email" type="email" value={form.email} onChange={handleChange} required
                      placeholder="you@company.com"
                      className="w-full rounded-xl border border-black/10 bg-[#FAF7F2] px-4 py-3 text-sm outline-none transition focus:border-[#B88A44] focus:ring-2 focus:ring-[#B88A44]/20"
                    />
                  </div>
                  <div>
                    <label className="mb-1.5 block text-xs font-medium text-[#0F172A]">
                      Phone
                    </label>
                    <input
                      name="phone" type="tel" value={form.phone} onChange={handleChange}
                      placeholder="+91 98765 43210"
                      className="w-full rounded-xl border border-black/10 bg-[#FAF7F2] px-4 py-3 text-sm outline-none transition focus:border-[#B88A44] focus:ring-2 focus:ring-[#B88A44]/20"
                    />
                  </div>
                </div>

                <div>
                  <label className="mb-1.5 block text-xs font-medium text-[#0F172A]">
                    Message <span className="text-[#B88A44]">*</span>
                  </label>
                  <textarea
                    name="message" value={form.message} onChange={handleChange} required
                    rows={5}
                    placeholder="Tell us about your gifting needs, order size, timeline, or any customisation requests…"
                    className="w-full resize-none rounded-xl border border-black/10 bg-[#FAF7F2] px-4 py-3 text-sm outline-none transition focus:border-[#B88A44] focus:ring-2 focus:ring-[#B88A44]/20"
                  />
                </div>

                <a
                  href={buildContactWhatsAppUrl()}
                  target="_blank"
                  rel="noopener noreferrer"
                  onClick={(e) => {
                    if (!form.name || !form.email || !form.message) {
                      e.preventDefault()
                      alert('Please fill in Name, Email, and Message before sending.')
                    }
                  }}
                  className="flex w-full items-center justify-center gap-2 rounded-xl bg-[#25D366] py-4 text-sm font-semibold text-white transition hover:opacity-90"
                >
                  <svg viewBox="0 0 24 24" className="h-4 w-4 fill-white" xmlns="http://www.w3.org/2000/svg">
                    <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z"/>
                  </svg>
                  Send Message
                </a>
              </form>
            )}
          </div>

          {/* RIGHT — INFO CARDS */}
          <div className="flex flex-col gap-5">

            {/* ABOUT THE OWNERS */}
            <div className="rounded-2xl border border-black/5 bg-white p-6 shadow-sm">
              <span className="inline-flex rounded-full border border-[#B88A44]/20 bg-[#B88A44]/10 px-3 py-1 text-xs font-medium text-[#B88A44]">
                Meet the Team
              </span>
              <h3 className="mt-4 text-lg font-semibold text-[#0F172A]">
                Akshit Oberoi
              </h3>
              <p className="mt-2 text-sm leading-6 text-[#667085]">
                AM Global Hub is a family-run business based in the heart of New Delhi, run by Akshit Oberoi. They bring a personal touch to every order — from curating the right products to ensuring flawless delivery across India.
              </p>
            </div>

            {/* ADDRESS */}
            <div className="rounded-2xl border border-black/5 bg-white p-6 shadow-sm">
              <div className="flex items-start gap-4">
                <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl bg-[#B88A44]/10">
                  <MapPin className="h-5 w-5 text-[#B88A44]" />
                </div>
                <div>
                  <p className="text-sm font-semibold text-[#0F172A]">Our Office</p>
                  <p className="mt-1 text-sm leading-6 text-[#667085]">
                    Cabin No. 4, A-201, Block A,<br />
                    Lajpat Nagar I, Lajpat Nagar,<br />
                    New Delhi, Delhi 110024, India
                  </p>
                  <a
                    href="https://maps.google.com/?q=A-201+Block+A+Lajpat+Nagar+I+New+Delhi+110024"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="mt-2 inline-flex text-xs font-medium text-[#B88A44] transition hover:opacity-70"
                  >
                    Open in Google Maps →
                  </a>
                </div>
              </div>
            </div>

            {/* PHONE */}
            <div className="rounded-2xl border border-black/5 bg-white p-6 shadow-sm">
              <div className="flex items-start gap-4">
                <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl bg-[#B88A44]/10">
                  <Phone className="h-5 w-5 text-[#B88A44]" />
                </div>
                <div>
                  <p className="text-sm font-semibold text-[#0F172A]">Phone</p>
                  <a
                    href="tel:+918368772989"
                    className="mt-1 block text-sm text-[#667085] transition hover:text-[#B88A44]"
                  >
                    +91 83687 72989
                  </a>
                </div>
              </div>
            </div>

            {/* INSTAGRAM */}
            <div className="rounded-2xl border border-[#E1306C]/15 bg-gradient-to-br from-[#fdf2f8] to-[#fef9f0] p-6 shadow-sm">
              <div className="flex items-center gap-3">
                <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl bg-gradient-to-br from-[#833AB4] via-[#E1306C] to-[#F77737]">
                  <svg viewBox="0 0 24 24" className="h-5 w-5 fill-white" xmlns="http://www.w3.org/2000/svg">
                    <path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zm0-2.163c-3.259 0-3.667.014-4.947.072-4.358.2-6.78 2.618-6.98 6.98-.059 1.281-.073 1.689-.073 4.948 0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98 1.281.058 1.689.072 4.948.072 3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98-1.281-.059-1.69-.073-4.949-.073zm0 5.838c-3.403 0-6.162 2.759-6.162 6.162s2.759 6.163 6.162 6.163 6.162-2.759 6.162-6.163c0-3.403-2.759-6.162-6.162-6.162zm0 10.162c-2.209 0-4-1.79-4-4 0-2.209 1.791-4 4-4s4 1.791 4 4c0 2.21-1.791 4-4 4zm6.406-11.845c-.796 0-1.441.645-1.441 1.44s.645 1.44 1.441 1.44c.795 0 1.439-.645 1.439-1.44s-.644-1.44-1.439-1.44z"/>
                  </svg>
                </div>
                <p className="text-sm font-semibold text-[#0F172A]">Follow us on Instagram</p>
              </div>
              <p className="mt-2 text-xs text-[#667085]">
                See our latest collections, gifting ideas, and behind-the-scenes.
              </p>
              <a
                href="https://www.instagram.com/amglobalhub/"
                target="_blank"
                rel="noopener noreferrer"
                className="mt-4 flex items-center justify-center gap-2 rounded-xl bg-gradient-to-r from-[#833AB4] via-[#E1306C] to-[#F77737] py-3 text-sm font-semibold text-white transition hover:opacity-90"
              >
                <svg viewBox="0 0 24 24" className="h-4 w-4 fill-white" xmlns="http://www.w3.org/2000/svg">
                  <path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zm0-2.163c-3.259 0-3.667.014-4.947.072-4.358.2-6.78 2.618-6.98 6.98-.059 1.281-.073 1.689-.073 4.948 0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98 1.281.058 1.689.072 4.948.072 3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98-1.281-.059-1.69-.073-4.949-.073zm0 5.838c-3.403 0-6.162 2.759-6.162 6.162s2.759 6.163 6.162 6.163 6.162-2.759 6.162-6.163c0-3.403-2.759-6.162-6.162-6.162zm0 10.162c-2.209 0-4-1.79-4-4 0-2.209 1.791-4 4-4s4 1.791 4 4c0 2.21-1.791 4-4 4zm6.406-11.845c-.796 0-1.441.645-1.441 1.44s.645 1.44 1.441 1.44c.795 0 1.439-.645 1.439-1.44s-.644-1.44-1.439-1.44z"/>
                </svg>
                @amglobalhub
              </a>
            </div>

            {/* WHATSAPP */}
            <div className="rounded-2xl border border-[#25D366]/20 bg-[#25D366]/5 p-6 shadow-sm">
              <div className="flex items-center gap-3">
                <MessageCircle className="h-5 w-5 text-[#25D366]" />
                <p className="text-sm font-semibold text-[#0F172A]">Chat on WhatsApp</p>
              </div>
              <p className="mt-2 text-xs text-[#667085]">
                Fastest way to reach us — get a reply in minutes.
              </p>
              <div className="mt-4">
                <a
                  href="https://wa.me/918368772989?text=Hi%2C%20I%27m%20interested%20in%20your%20corporate%20gifting%20solutions."
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex w-full items-center justify-center gap-2 rounded-xl bg-[#25D366] px-4 py-3 text-sm font-semibold text-white transition hover:opacity-90"
                >
                  <MessageCircle className="h-4 w-4" />
                  WhatsApp Us
                </a>
              </div>
            </div>

            {/* HOURS */}
            <div className="rounded-2xl border border-black/5 bg-white p-6 shadow-sm">
              <div className="mb-4 flex items-center gap-3">
                <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl bg-[#B88A44]/10">
                  <Clock className="h-5 w-5 text-[#B88A44]" />
                </div>
                <p className="text-sm font-semibold text-[#0F172A]">Hours of Operation</p>
              </div>
              <div className="divide-y divide-black/5">
                {HOURS.map(({ day, time }) => {
                  const isToday = day === today
                  const isClosed = time === 'Closed'
                  return (
                    <div
                      key={day}
                      className={`flex items-center justify-between py-2.5 ${isToday ? 'rounded-lg bg-[#B88A44]/5 px-2' : ''}`}
                    >
                      <span className={`text-sm ${isToday ? 'font-semibold text-[#B88A44]' : 'text-[#667085]'}`}>
                        {day}
                        {isToday && (
                          <span className="ml-2 rounded-full bg-[#B88A44] px-2 py-0.5 text-[10px] font-medium text-white">
                            Today
                          </span>
                        )}
                      </span>
                      <span className={`text-sm font-medium ${isClosed ? 'text-red-400' : isToday ? 'text-[#B88A44]' : 'text-[#0F172A]'}`}>
                        {time}
                      </span>
                    </div>
                  )
                })}
              </div>
            </div>

          </div>
        </div>
      </div>

      {/* ── MAP EMBED ── */}
      <section className="pb-16">
        <div className="container-premium">
          <div className="overflow-hidden rounded-2xl border border-black/5 shadow-sm">
            <iframe
              title="AM Global Hub Location"
              src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3504.3!2d77.2373!3d28.5672!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x390ce3b0c68db5b5%3A0x5e8c73b9f2e3a7b0!2sLajpat%20Nagar%20I%2C%20New%20Delhi%2C%20Delhi%20110024!5e0!3m2!1sen!2sin!4v1699000000000!5m2!1sen!2sin"
              width="100%"
              height="360"
              style={{ border: 0 }}
              allowFullScreen
              loading="lazy"
              referrerPolicy="no-referrer-when-downgrade"
            />
          </div>
        </div>
      </section>

    </div>
  )
}
