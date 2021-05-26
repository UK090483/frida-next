import React from 'react'

type PriceProps = {
  price: string | number
}

const Price: React.FC<PriceProps> = ({ price }) => {
  return <div className="text-base-fluid font-bold">{price}€</div>
}

export default Price
