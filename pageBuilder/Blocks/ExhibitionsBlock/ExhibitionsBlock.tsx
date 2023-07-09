import React from 'react'
import { ExhibitionCardResult } from 'PageTypes/Exhibition/Exhibition.Card.query'
import Section from '@components/Section'
import ExhibitionCard from 'PageTypes/Exhibition/Exhibition.Card'

type ExhibitionsBlockProps = {
  items: ExhibitionCardResult[]
}

const ExhibitionsBlock: React.FC<ExhibitionsBlockProps> = (props) => {
  const { items = [] } = props

  return (
    <Section type="medium-wide" className="my-16">
      {[items.map((item) => <ExhibitionCard key={item.slug} {...item} />)]}
    </Section>
  )
}

export default ExhibitionsBlock
