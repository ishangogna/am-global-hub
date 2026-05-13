const categories = [
  {
    title: 'Executive Kits',
    image: '/categories/executive.jpg',
  },
  {
    title: 'Tech Gifts',
    image: '/categories/tech.jpg',
  },
  {
    title: 'Drinkware',
    image: '/categories/drinkware.jpg',
  },
  {
    title: 'Festive Hampers',
    image: '/categories/hamper.jpg',
  },
]

export default function Categories() {
  return (
    <section className='section-spacing'>
      <div className='container-premium'>
        <div className='mb-14 text-center'>
          <h2 className='text-4xl font-semibold'>Shop By Category</h2>
          <p className='mt-4 text-muted'>
            Premium gifting solutions for every corporate occasion
          </p>
        </div>

        <div className='grid gap-8 md:grid-cols-2 lg:grid-cols-4'>
          {categories.map((category) => (
            <div
              key={category.title}
              className='group overflow-hidden rounded-[28px] bg-white shadow-luxury transition hover:-translate-y-2'
            >
              <img
                src={category.image}
                alt={category.title}
                className='h-72 w-full object-cover transition duration-500 group-hover:scale-105'
              />

              <div className='p-6'>
                <h3 className='text-xl font-semibold'>{category.title}</h3>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}