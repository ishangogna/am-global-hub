import './globals.css'

import type { Metadata } from 'next'
import { DM_Sans, Sora } from 'next/font/google'

import Navbar from '@/components/layout/Navbar'
import Footer from '@/components/layout/Footer'
import RouteLoader from '@/components/layout/RouteLoader'
import WhatsAppFloat from '@/components/layout/WhatsAppFloat'

const dmSans = DM_Sans({
  subsets: ['latin'],
  variable: '--font-body',
  weight: ['400', '500', '600', '700'],
})

const sora = Sora({
  subsets: ['latin'],
  variable: '--font-heading',
  weight: ['400', '500', '600', '700', '800'],
})

export const metadata: Metadata = {
  title: 'AM Global Hub',
  description: 'Premium Corporate Gifting Solutions',
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang='en'>
      <body
        className={`
          ${dmSans.variable}
          ${dmSans.className}
          ${sora.variable}
          bg-[#FAF7F2]
          text-[#0F172A]
          antialiased
        `}
      >
        <RouteLoader />
        <Navbar />

        <main className='pt-20'>
          {children}
        </main>

        <Footer />
        <WhatsAppFloat />
      </body>
    </html>
  )
}