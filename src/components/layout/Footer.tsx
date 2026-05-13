export default function Footer() {
  return (
    <footer className='bg-[#0F172A] py-20 text-white'>
      <div className='container-premium grid gap-16 lg:grid-cols-4'>
        <div>
          <h3 className='text-2xl font-semibold text-gold'>AM GLOBAL HUB</h3>

          <p className='mt-6 leading-7 text-white/70'>
            Premium corporate gifting solutions for modern businesses.
          </p>
        </div>

        <div>
          <h4 className='mb-6 text-lg font-semibold'>Categories</h4>

          <ul className='space-y-3 text-white/70'>
            <li>Executive Kits</li>
            <li>Tech Gifts</li>
            <li>Drinkware</li>
            <li>Luxury Hampers</li>
          </ul>
        </div>

        <div>
          <h4 className='mb-6 text-lg font-semibold'>Company</h4>

          <ul className='space-y-3 text-white/70'>
            <li>About Us</li>
            <li>Products</li>
            <li>Contact</li>
            <li>Bulk Orders</li>
          </ul>
        </div>

        <div>
          <h4 className='mb-6 text-lg font-semibold'>Contact</h4>

          <ul className='space-y-3 text-white/70'>
            <li>hello@amglobalhub.com</li>
            <li>+91 98765 43210</li>
            <li>Pan India Delivery</li>
          </ul>
        </div>
      </div>
    </footer>
  )
}