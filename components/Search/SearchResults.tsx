import Link from 'next/link'
import * as React from 'react'
import cx from 'classnames'

export interface ISearchResultsProps {
  items: ISearchResultItem[] | null | undefined
  show?: boolean
  alt?: string
}

export function SearchResults({
  items = [],
  show = true,
  alt,
}: ISearchResultsProps) {
  const hasItems = items && items.length > 0
  return (
    <div
      data-testid="searchResults"
      className={cx(
        'absolute z-20 top-28  shadow-xl  left-1/2 -translate-x-1/2 w-full max-w-xl bg-frida-pink p-4 ',
        { 'opacity-100': show, 'opacity-0': !show }
      )}
    >
      {!hasItems && <div>{alt}</div>}
      {hasItems &&
        items &&
        items.map((item) => (
          <ResultItem
            key={item.href}
            text={item.text}
            label={item.label}
            href={item.href}
          />
        ))}
    </div>
  )
}

export interface ISearchResultItem {
  text: string
  label: string
  href: string
}

const ResultItem: React.FC<ISearchResultItem> = ({ text, label, href }) => {
  return (
    <Link href={href} passHref>
      <a className="" data-testid={`searchResults__link__${href}`}>
        <div className=" border-b-2 border-black hover:border-b-4 ">
          <div className="text-right text-xs"> {label}</div>
          <div className="text-lg whitespace-nowrap text-ellipsis overflow-hidden">
            {text}
          </div>
        </div>
      </a>
    </Link>
  )
}

export default SearchResults
