'use client'

import { MessageCircle } from 'lucide-react'

export default function WhatsAppFloat() {
  return (
    <a
      href="https://wa.me/918168667321?text=Hi%2C%20I%27m%20interested%20in%20your%20corporate%20gifting%20solutions."
      target="_blank"
      rel="noopener noreferrer"
      className="fixed bottom-6 right-6 z-[999] flex h-14 w-14 items-center justify-center rounded-full bg-[#25D366] text-white shadow-lg shadow-[#25D366]/30 transition-all hover:scale-110 hover:shadow-xl hover:shadow-[#25D366]/40 active:scale-95"
      aria-label="Chat on WhatsApp"
    >
      {/* Pulse ring */}
      <span className="absolute inset-0 rounded-full bg-[#25D366]/20 animate-[ping_3s_ease-in-out_infinite]" />
      <span className="relative">
        <MessageCircle className="h-6 w-6" />
      </span>
    </a>
  )
}
