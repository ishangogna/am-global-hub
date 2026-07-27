'use client'

import { useEffect } from 'react'
import { addToRecentlyViewed } from './RecentlyViewed'

interface Props {
  product: { id: string; name: string; slug: string; image_url?: string; price_range?: string }
}

export default function TrackView({ product }: Props) {
  useEffect(() => {
    addToRecentlyViewed(product)
  }, [product.id])
  return null
}
