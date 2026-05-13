import FeaturedProductCard from './FeaturedProductCard'

const products = [
  {
    title: 'Executive Gift Box',
    image: '/products/gift-box.png',
    price: '1,999',
  },
  {
    title: 'Premium Leather Notebook',
    image: '/products/notebook.png',
    price: '799',
  },
  {
    title: 'Corporate Tumbler',
    image: '/products/tumbler.png',
    price: '699',
  },
  {
    title: 'Wireless Charger',
    image: '/products/charger.png',
    price: '1,299',
  },
]

export default function FeaturedProducts() {
  return (
    <section className='section-spacing bg-white'>
      <div className='container-premium'>
        <div className='mb-14 flex items-end justify-between'>
          <div>
            <h2 className='text-4xl font-semibold'>Featured Products</h2>

            <p className='mt-4 text-muted'>
              Curated gifting solutions designed for modern businesses
            </p>
          </div>

          <button className='hidden rounded-xl border border-black/10 px-6 py-3 font-medium lg:block'>
            View All Products
          </button>
        </div>

        <div className='grid gap-8 md:grid-cols-2 xl:grid-cols-4'>
          {products.map((product) => (
            <FeaturedProductCard
  key={product.title}
  {...product}
/>
          ))}
        </div>
      </div>
    </section>
  )
}