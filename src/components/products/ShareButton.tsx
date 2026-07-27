'use client'

import { useState } from 'react'
import { Share2, Link2, MessageCircle, Check } from 'lucide-react'

interface Props {
  productName: string
  productUrl: string
}

export default function ShareButton({ productName, productUrl }: Props) {
  const [open, setOpen] = useState(false)
  const [copied, setCopied] = useState(false)

  const fullUrl = typeof window !== 'undefined' ? window.location.origin + productUrl : productUrl

  const whatsappUrl = `https://wa.me/?text=${encodeURIComponent(`Check out ${productName} on AM Global Hub: ${fullUrl}`)}`

  function copyLink() {
    navigator.clipboard.writeText(fullUrl)
    setCopied(true)
    setTimeout(() => setCopied(false), 2000)
  }

  return (
    <div className="relative">
      <button
        onClick={() => setOpen(!open)}
        className="flex items-center gap-2 rounded-xl border border-black/10 px-4 py-2.5 text-sm font-medium text-[#667085] transition hover:border-[#B88A44] hover:text-[#B88A44]"
      >
        <Share2 className="h-4 w-4" />
        Share
      </button>

      {open && (
        <>
          {/* Backdrop */}
          <div className="fixed inset-0 z-40" onClick={() => setOpen(false)} />

          {/* Dropdown */}
          <div className="absolute right-0 top-full z-50 mt-2 w-56 overflow-hidden rounded-xl border border-black/10 bg-white shadow-xl">
            <button
              onClick={() => { copyLink(); setTimeout(() => setOpen(false), 1500) }}
              className="flex w-full items-center gap-3 px-4 py-3 text-left text-sm transition hover:bg-[#FAF7F2]"
            >
              {copied ? <Check className="h-4 w-4 text-[#25D366]" /> : <Link2 className="h-4 w-4 text-[#667085]" />}
              <span className={copied ? 'font-medium text-[#25D366]' : 'text-[#0F172A]'}>
                {copied ? 'Link copied!' : 'Copy link'}
              </span>
            </button>
            <a
              href={whatsappUrl}
              target="_blank"
              rel="noopener noreferrer"
              onClick={() => setOpen(false)}
              className="flex w-full items-center gap-3 px-4 py-3 text-left text-sm transition hover:bg-[#FAF7F2]"
            >
              <MessageCircle className="h-4 w-4 text-[#25D366]" />
              <span className="text-[#0F172A]">Share via WhatsApp</span>
            </a>
            {typeof navigator !== 'undefined' && 'share' in navigator && (
              <button
                onClick={async () => {
                  try {
                    await navigator.share({ title: productName, text: `Check out ${productName} on AM Global Hub`, url: fullUrl })
                  } catch (_) {
                    // User cancelled — ignore
                  }
                  setOpen(false)
                }}
                className="flex w-full items-center gap-3 px-4 py-3 text-left text-sm transition hover:bg-[#FAF7F2]"
              >
                <Share2 className="h-4 w-4 text-[#667085]" />
                <span className="text-[#0F172A]">More options…</span>
              </button>
            )}
          </div>
        </>
      )}
    </div>
  )
}
