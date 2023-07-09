import Quotes from '@components/Quote/Quotes'

import React from 'react'
import { QuotesBlockResult } from './QuotesBlock.query'

const ProductsBlock: React.FC<QuotesBlockResult> = (props) => {
  return <Quotes {...props} />
}

export default ProductsBlock
