import Link from 'next/link'
import { ArrowRight, MessageCircle } from 'lucide-react'

export default function CTABanner() {
  return (
    <section className="relative overflow-hidden bg-[#B88A44] py-20 lg:py-24">
      {/* Background decoration */}
      <div className="absolute inset-0 opacity-10">
        <div className="absolute -left-20 -top-20 h-80 w-80 rounded-full bg-white/30 blur-3xl" />
        <div className="absolute -bottom-20 -right-20 h-80 w-80 rounded-full bg-white/20 blur-3xl" />
      </div>

      <div className="container-premium relative text-center">
        <h2 className="text-3xl font-semibold text-white md:text-5xl">
          Ready to Elevate Your
          <span className="block">Corporate Gifting?</span>
        </h2>
        <p className="mx-auto mt-5 max-w-xl text-base leading-7 text-white/80 md:text-lg">
          Join 100+ businesses that trust AM Global Hub for premium, personalised
          gifting experiences. Let's create something memorable together.
        </p>

        <div className="mt-10 flex flex-col items-center justify-center gap-4 sm:flex-row">
          <Link
            href="/products"
            className="flex items-center gap-2 rounded-xl bg-white px-8 py-4 text-sm font-semibold text-[#B88A44] shadow-lg transition hover:shadow-xl"
          >
            Explore Products
            <ArrowRight className="h-4 w-4" />
          </Link>
          <a
            href="https://wa.me/918168667321?text=Hi%2C%20I%27m%20interested%20in%20your%20corporate%20gifting%20solutions."
            target="_blank"
            rel="noopener noreferrer"
            className="flex items-center gap-2 rounded-xl border-2 border-white/30 bg-white/10 px-8 py-4 text-sm font-semibold text-white backdrop-blur-sm transition hover:bg-white/20"
          >
            <MessageCircle className="h-4 w-4" />
            WhatsApp Us
          </a>
        </div>

        {/* Trust badges */}
        <div className="mt-12 flex flex-wrap items-center justify-center gap-6 text-sm text-white/60">
          <span className="flex items-center gap-2">
            <span className="h-2 w-2 rounded-full bg-green-400" />
            Pan India Delivery
          </span>
          <span className="flex items-center gap-2">
            <span className="h-2 w-2 rounded-full bg-green-400" />
            Custom Branding
          </span>
          <span className="flex items-center gap-2">
            <span className="h-2 w-2 rounded-full bg-green-400" />
            Bulk Order Ready
          </span>
          <span className="flex items-center gap-2">
            <span className="h-2 w-2 rounded-full bg-green-400" />
            7–14 Day Turnaround
          </span>
        </div>
      </div>
    </section>
  )
}
