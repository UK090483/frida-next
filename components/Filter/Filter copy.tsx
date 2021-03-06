import Dropdown from './Dropdown'
import { useRouter } from 'next/router'
import * as React from 'react'

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

  const handleQueries = (type: string, value: string) => {
    const q = { ...router.query }
    delete q.slug
    q[type] = value
    const queryString = Object.entries(q).reduce((acc, [key, value], index) => {
      if (value === 'clear') return acc
      return `${acc}${index === 0 ? '?' : '&'}${key}=${value}`
    }, '')
    router.push(`/${slug}${queryString}`, undefined, {
      shallow: true,
    })
  }

  const isActive = (name: string) => {
    return router.query[name] && router.query[name] !== 'clear'
      ? ` : ${router.query[name]}`
      : ''
  }

  const getLabel = (label: string, name: string) => {
    const active = isActive(name)

    return (
      <div
        className={`w-full h-full  flex  ${
          active ? 'justify-between' : 'justify-center'
        } items-center`}
      >
        <span className="ml-3">{label + active}</span>
      </div>
    )
  }

  return (
    <div
      className={`flex flex-wrap justify-center xl:flex-nowrap ${
        filter.length > 1 ? 'md:justify-between' : 'md:justify-center'
      } items-center w-full px-frida_7% my-20`}
    >
      {filter.map((_filter) => {
        if (!_filter.items) return null
        return (
          <Dropdown
            active={!!isActive(_filter.name)}
            key={_filter.name}
            label={getLabel(_filter.label, _filter.name)}
            items={_filter.items}
            onClick={(e) => {
              handleQueries(_filter.name, e.value)
            }}
          />
        )
      })}
    </div>
  )
}

export default Filter
