import React from 'react'
import ProductName from '../../lib/ProductComponents/ProductName'
import { ArtworkRecord } from 'types'

type ArtworkInfoProps = {
  availability: ArtworkRecord['availability']
  artworkName: ArtworkRecord['artworkName']
  price: ArtworkRecord['price']
}
const ArtworkInfo: React.FC<ArtworkInfoProps> = ({
  availability,
  artworkName,
  price,
}) => {
  return (
    <div className="flex flex-wrap text-xl pt-5">
      <ProductName
        size={'m'}
        name={artworkName}
        availability={availability === 'availabil'}
      />
      <div className="pl-2 ml-auto text-right">{price}€</div>
    </div>
  )
}

export default ArtworkInfo
