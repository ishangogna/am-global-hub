import './globals.css'

import type { Metadata } from 'next'
import { Inter, Playfair_Display } from 'next/font/google'

import Navbar from '@/components/layout/Navbar'

const inter = Inter({
  subsets: ['latin'],
  variable: '--font-inter',
})

const playfair = Playfair_Display({
  subsets: ['latin'],
  variable: '--font-playfair',
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
          ${inter.variable}
          ${playfair.variable}
          bg-[#FAF7F2]
          text-[#0F172A]
          antialiased
        `}
      >
        <Navbar />

        <main className='pt-20'>
          {children}
        </main>
      </body>
    </html>
  )
}