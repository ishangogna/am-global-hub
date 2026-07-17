import { supabase } from '@/lib/supabase'
import { Star, Quote } from 'lucide-react'

export default async function Testimonials() {
  const { data: testimonials } = await supabase
    .from('testimonials')
    .select('*')
    .order('created_at', { ascending: false })
    .limit(3)

  if (!testimonials || testimonials.length === 0) return null

  return (
    <section className="bg-[#0F172A] py-24 lg:py-32">
      <div className="container-premium">

        {/* HEADER */}
        <div className="mx-auto max-w-3xl text-center">
          <span className="inline-flex rounded-full border border-[#B88A44]/30 bg-[#B88A44]/10 px-4 py-2 text-sm font-medium text-[#B88A44]">
            What Our Clients Say
          </span>
          <h2 className="mt-6 text-4xl font-semibold text-white md:text-5xl">
            Trusted by Leading
            <span className="block text-[#B88A44]">Businesses Across India</span>
          </h2>
        </div>

        {/* GRID */}
        <div className="mt-16 grid gap-6 md:grid-cols-3">
          {testimonials.map((t) => (
            <div
              key={t.id}
              className="relative overflow-hidden rounded-2xl border border-white/10 bg-white/5 p-8 backdrop-blur-sm"
            >
              {/* Quote icon */}
              <Quote className="mb-4 h-8 w-8 text-[#B88A44]/40" />

              {/* Stars */}
              <div className="mb-4 flex gap-1">
                {Array.from({ length: t.rating || 5 }).map((_, j) => (
                  <Star key={j} className="h-4 w-4 fill-[#B88A44] text-[#B88A44]" />
                ))}
              </div>

              {/* Text */}
              <p className="text-sm leading-7 text-white/80">
                &ldquo;{t.text}&rdquo;
              </p>

              {/* Author */}
              <div className="mt-6 border-t border-white/10 pt-5">
                <p className="text-sm font-semibold text-white">{t.name}</p>
                {t.role && <p className="mt-0.5 text-xs text-white/50">{t.role}</p>}
              </div>
            </div>
          ))}
        </div>

      </div>
    </section>
  )
}
