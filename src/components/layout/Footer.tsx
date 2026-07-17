import Link from 'next/link'
import Image from 'next/image'
import { MapPin, Phone, Mail, MessageCircle } from 'lucide-react'

export default function Footer() {
  return (
    <footer className="bg-[#0F172A] text-white">
      {/* Main footer */}
      <div className="container-premium grid gap-12 py-16 lg:grid-cols-[1.4fr_1fr_1fr_1.2fr] lg:gap-8 lg:py-20">

        {/* BRAND */}
        <div>
          <Image
            src="/images/logo.png"
            alt="AM Global Hub"
            width={140}
            height={40}
            className="brightness-0 invert"
          />
          <p className="mt-5 max-w-xs text-sm leading-7 text-white/60">
            Premium corporate gifting solutions for modern businesses.
            Curated, branded, and delivered across India.
          </p>
          {/* Social */}
          <div className="mt-6 flex gap-3">
            <a
              href="https://www.instagram.com/amglobalhub/"
              target="_blank"
              rel="noopener noreferrer"
              className="flex h-10 w-10 items-center justify-center rounded-xl border border-white/10 bg-white/5 transition hover:border-[#B88A44] hover:bg-[#B88A44]/10"
              aria-label="Instagram"
            >
              <svg viewBox="0 0 24 24" className="h-4 w-4 fill-white" xmlns="http://www.w3.org/2000/svg">
                <path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zm0-2.163c-3.259 0-3.667.014-4.947.072-4.358.2-6.78 2.618-6.98 6.98-.059 1.281-.073 1.689-.073 4.948 0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98 1.281.058 1.689.072 4.948.072 3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98-1.281-.059-1.69-.073-4.949-.073zm0 5.838c-3.403 0-6.162 2.759-6.162 6.162s2.759 6.163 6.162 6.163 6.162-2.759 6.162-6.163c0-3.403-2.759-6.162-6.162-6.162zm0 10.162c-2.209 0-4-1.79-4-4 0-2.209 1.791-4 4-4s4 1.791 4 4c0 2.21-1.791 4-4 4zm6.406-11.845c-.796 0-1.441.645-1.441 1.44s.645 1.44 1.441 1.44c.795 0 1.439-.645 1.439-1.44s-.644-1.44-1.439-1.44z"/>
              </svg>
            </a>
            <a
              href="https://wa.me/918368772989"
              target="_blank"
              rel="noopener noreferrer"
              className="flex h-10 w-10 items-center justify-center rounded-xl border border-white/10 bg-white/5 transition hover:border-[#25D366] hover:bg-[#25D366]/10"
              aria-label="WhatsApp"
            >
              <MessageCircle className="h-4 w-4 text-white" />
            </a>
          </div>
        </div>

        {/* QUICK LINKS */}
        <div>
          <h4 className="text-sm font-semibold uppercase tracking-wider text-white/40">
            Quick Links
          </h4>
          <nav className="mt-5 flex flex-col gap-3">
            {[
              { href: '/', label: 'Home' },
              { href: '/products', label: 'Products' },
              { href: '/contact', label: 'Contact Us' },
              { href: '/auth', label: 'Sign In' },
            ].map(({ href, label }) => (
              <Link
                key={href}
                href={href}
                className="text-sm text-white/60 transition hover:text-[#B88A44]"
              >
                {label}
              </Link>
            ))}
          </nav>
        </div>

        {/* SERVICES */}
        <div>
          <h4 className="text-sm font-semibold uppercase tracking-wider text-white/40">
            Services
          </h4>
          <nav className="mt-5 flex flex-col gap-3">
            {[
              'Employee Welcome Kits',
              'Client Gifting',
              'Festival Hampers',
              'Event Merchandise',
              'Custom Branding',
              'Bulk Orders',
            ].map((item) => (
              <span key={item} className="text-sm text-white/60">
                {item}
              </span>
            ))}
          </nav>
        </div>

        {/* CONTACT */}
        <div>
          <h4 className="text-sm font-semibold uppercase tracking-wider text-white/40">
            Get in Touch
          </h4>
          <div className="mt-5 space-y-4">
            <div className="flex items-start gap-3">
              <MapPin className="mt-0.5 h-4 w-4 shrink-0 text-[#B88A44]" />
              <p className="text-sm leading-6 text-white/60">
                Cabin No. 4, A-201, Block A,<br />
                Lajpat Nagar I, New Delhi 110024
              </p>
            </div>
            <div className="flex items-center gap-3">
              <Phone className="h-4 w-4 shrink-0 text-[#B88A44]" />
              <a href="tel:+918368772989" className="text-sm text-white/60 transition hover:text-[#B88A44]">
                +91 83687 72989
              </a>
            </div>
            <div className="flex items-center gap-3">
              <Mail className="h-4 w-4 shrink-0 text-[#B88A44]" />
              <a href="mailto:hello@amglobalhub.com" className="text-sm text-white/60 transition hover:text-[#B88A44]">
                hello@amglobalhub.com
              </a>
            </div>
          </div>

          {/* Hours mini */}
          <div className="mt-6 rounded-xl border border-white/10 bg-white/5 p-4">
            <p className="text-xs font-medium text-white/40">BUSINESS HOURS</p>
            <p className="mt-1 text-sm text-white/70">Mon – Sat: 10 AM – 5 PM</p>
            <p className="text-sm text-white/40">Sunday: Closed</p>
          </div>
        </div>

      </div>

      {/* Bottom bar */}
      <div className="border-t border-white/10">
        <div className="container-premium flex flex-col items-center justify-between gap-3 py-6 sm:flex-row">
          <p className="text-xs text-white/40">
            © {new Date().getFullYear()} AM Global Hub. All rights reserved.
          </p>
          <div className="flex gap-6 text-xs text-white/40">
            <span>Pan India Delivery</span>
            <span>Bulk Order Specialists</span>
          </div>
        </div>
      </div>
    </footer>
  )
}
