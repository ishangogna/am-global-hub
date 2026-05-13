import Image from 'next/image'
import Link from 'next/link'
import { supabase } from '@/lib/supabase'

export default async function Categories() {
  const { data: categories } = await supabase
    .from('categories')
    .select('*')
    .order('created_at', { ascending: true })

  return (
    <section className='bg-white py-16 lg:py-24'>
      <div className='container-premium'>
        {/* HEADER */}
        <div className='max-w-3xl'>
          <span className='inline-flex rounded-full border border-[#B88A44]/15 bg-[#B88A44]/10 px-4 py-2 text-sm font-medium text-[#B88A44]'>
            Corporate Collections
          </span>

          <h2 className='mt-6 text-4xl font-semibold text-[#111827] md:text-5xl'>
            Curated Gifting Categories
          </h2>

          <p className='mt-6 text-base leading-8 text-[#667085] md:text-lg'>
            Explore premium gifting collections designed for employees,
            executives, clients, onboarding, and festive campaigns.
          </p>
        </div>

        {/* GRID */}
        <div className='mt-14 grid gap-6 sm:grid-cols-2 xl:grid-cols-4'>
          {categories?.map((category) => (
            <Link
              key={category.id}
              href={`/categories/${category.slug}`}
              className='group overflow-hidden rounded-[28px] border border-black/5 bg-[#FCFBF8] transition duration-300 hover:-translate-y-1 hover:shadow-xl'
            >
              {/* IMAGE */}
              <div className='overflow-hidden'>
                <Image
                  src={category.image_url}
                  alt={category.name}
                  width={600}
                  height={600}
                  className='h-[240px] w-full object-cover transition duration-500 group-hover:scale-105'
                />
              </div>

              {/* CONTENT */}
              <div className='p-6'>
                <h3 className='text-xl font-semibold text-[#111827]'>
                  {category.name}
                </h3>

                <p className='mt-3 text-sm leading-7 text-[#667085]'>
                  {category.description}
                </p>
              </div>
            </Link>
          ))}
        </div>
      </div>
    </section>
  )
}