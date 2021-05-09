import React from 'react'
import Section from '@components/container/section'
import Link from 'next/link'

type CategoryItem = {
  images: React.ReactNode[]
  label: string
  size: 's' | 'm' | 'l'
  path: string
}

type CategoryProps = {
  items: CategoryItem[]
}

const Category: React.FC<CategoryProps> = ({ items }) => {
  return (
    <Section type="full" backgroundColor="white">
      <div className="grid gap-6 md:gap-12 grid-cols-12 grid-rows-6 grid-flow-row p-6 md:p-12">
        {items.map((item, index) => (
          <div
            key={index}
            className={`h-48 md:h-96 relative ${
              item.size === 's'
                ? 'col-span-6 md:col-span-3'
                : 'col-span-12 md:col-span-6'
            }    row-span-3 `}
          >
            {item.images && item.images[0] && item.images[0]}
            <Link href={item.path || '/'}>
              <div className="py-2 px-6 rounded-full font-extrabold text-frida-black absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 bg-frida-white whitespace-nowrap">
                {item.label}
              </div>
            </Link>
          </div>
        ))}
      </div>
    </Section>
  )
}

export default Category
