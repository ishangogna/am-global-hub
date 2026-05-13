import Hero from '@/components/home/Hero'
import Categories from '@/components/home/Categories'
import FeaturedProducts from '@/components/home/FeaturedProducts'
import Branding from '@/components/home/Branding'
import Process from '@/components/home/Process'
import HowItWorks from '@/components/home/HowItWorks'

export default function HomePage() {
  return (
    <main>
      <Hero />
      <Categories />
      <FeaturedProducts />
      <Branding />
      <HowItWorks />
    </main>
  )
}