import { useRouter } from 'next/router'
import * as React from 'react'
import Select from './Select'

interface IFilterProps {
  filter: {
    label: string
    name: string
    items: { name: string; value: string }[] | undefined
  }[]
}

const Filter: React.FunctionComponent<IFilterProps> = (props) => {
  const { filter } = props
  const router = useRouter()

  const slug = (router.query.slug && router.query.slug[0]) || 'noSlug'

  const handleQueries = (type: string, value: string | null) => {
    const q = { ...router.query }

    if (!value) {
      delete q[type]
    } else {
      q[type] = value
    }

    delete q.slug

    const queryString = Object.entries(q).reduce((acc, [key, value], index) => {
      if (value === 'clear') return acc
      return `${acc}${index === 0 ? '?' : '&'}${key}=${value}`
    }, '')

    router.push(`/${slug}${queryString}`, undefined, {
      shallow: true,
    })
  }

  const isActive = (name: string) => {
    if (router.query[name] && typeof router.query[name] === 'string') {
      return router.query[name] as string
    }
    return null
  }

  return (
    <div
      // className={`flex flex-wrap justify-center xl:flex-nowrap ${
      //   filter.length > 1 ? 'md:justify-between' : 'md:justify-center'
      // } items-center w-full px-frida_7% my-20`}

      className="grid grid-cols-1 gap-10 py-20 mx-auto lg:grid-cols-4 md:grid-cols-2 justify-items-center px-frida_side md:px-frida_7%"
    >
      {filter.map((_filter) => {
        if (!_filter.items) return null
        return (
          <Select
            active={isActive(_filter.name)}
            key={_filter.name}
            label={_filter.label}
            items={_filter.items}
            onChange={(value) => {
              handleQueries(_filter.name, value)
            }}
          />
        )
      })}
    </div>
  )
}

export default Filter
