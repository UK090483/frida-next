import * as React from 'react'
import Search from '@components/Search/Search'
import { SearchBlockResult } from './SerachBlock.query'

const SearchBlock: React.FunctionComponent<SearchBlockResult> = (props) => {
  return <Search bgColor={props.bgColor} />
}

export default SearchBlock
