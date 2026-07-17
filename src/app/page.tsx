import Hero from '@/components/home/Hero'
import HowItWorks from '@/components/home/HowItWorks'
import Categories from '@/components/home/Categories'
import FeaturedProducts from '@/components/home/FeaturedProducts'
import Branding from '@/components/home/Branding'
import Testimonials from '@/components/home/Testimonials'
import CTABanner from '@/components/home/CTABanner'

export default function HomePage() {
  return (
    <main>
      <Hero />
      <HowItWorks />
      <Categories />
      <FeaturedProducts />
      <Branding />
      <Testimonials />
      <CTABanner />
    </main>
  )
}
