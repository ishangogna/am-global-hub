import Hero from '@/components/home/Hero'
import HowItWorks from '@/components/home/HowItWorks'
import Categories from '@/components/home/Categories'
import FeaturedProducts from '@/components/home/FeaturedProducts'
import Branding from '@/components/home/Branding'

export default function HomePage() {
  return (
    <main>
      <Hero />
      <HowItWorks />
      <Categories />
      <FeaturedProducts />
      <Branding />
    </main>
  )
}