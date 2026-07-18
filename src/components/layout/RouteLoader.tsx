'use client'

import { useEffect, useState } from 'react'
import { usePathname } from 'next/navigation'

export default function RouteLoader() {
  const pathname = usePathname()
  const [loading, setLoading] = useState(false)

  useEffect(() => {
    setLoading(true)
    const timeout = setTimeout(() => setLoading(false), 600)
    return () => clearTimeout(timeout)
  }, [pathname])

  if (!loading) return null

  return (
    <div className="fixed top-0 left-0 right-0 z-[60] h-1 bg-[#FAF7F2]">
      <div className="h-full w-full origin-left animate-[loading_1.5s_ease-in-out_infinite] bg-gradient-to-r from-[#B88A44] via-[#D4A853] to-[#B88A44]" />
    </div>
  )
}
