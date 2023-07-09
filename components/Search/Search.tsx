import { ISearchResult } from '@pages/api/search'
import classNames from 'classnames'
import useDebounceEffect from 'hooks/useDebounceEffect'
import * as React from 'react'
import { FridaColors } from 'types'
import Searchfield from './SearchField'
import SearchResults from './SearchResults'

interface ISearchProps {
  bgColor: FridaColors
}

const Search: React.FC<ISearchProps> = ({ bgColor }) => {
  const [searchValue, setSearchValue] = React.useState('')

  const [result, setResult] = React.useState<ISearchResult | null>(null)
  const [loading, setLoading] = React.useState(false)

  const preparedResults = React.useMemo(() => prepareResults(result), [result])

  useDebounceEffect(
    () => {
      if (!searchValue) return
      setLoading(true)
      fetch(`/api/search?q=${searchValue}`)
        .then((res) => res.json())
        .then((json) => {
          setResult(json.data)
          setLoading(false)
        })
        .catch((e) => {
          console.error(e)
          setLoading(false)
        })
    },
    300,
    [searchValue]
  )
  React.useEffect(() => {
    if (!searchValue) {
      setResult(null)
    }
  }, [searchValue])

  return (
    <div
      className={classNames('relative py-8 ', {
        'bg-frida-grey': bgColor === 'grey',
        'bg-frida-pink ': bgColor === 'pink',
      })}
    >
      <Searchfield
        value={searchValue}
        onChange={(v) => setSearchValue(v)}
        loading={loading}
      />
      <SearchResults
        alt={`nothing found for "${searchValue}"`}
        items={preparedResults}
        show={!!searchValue && !!result}
      />
    </div>
  )
}

export default Search

const prepareResults = (items: ISearchResult | null) => {
  return items
    ? items.all.map((i) => ({
        href: `/${i._type}/${i.slug}`,
        text: i.name,
        label: i._type,
      }))
    : null
}
