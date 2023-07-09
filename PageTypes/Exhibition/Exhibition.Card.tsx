import React from 'react'
import Link from 'next/link'
import { mouseLinkProps } from '@components/generic/Mouse/mouseRemote'

import Photo from '@components/Photo'
import type { ExhibitionCardResult } from './Exhibition.Card.query'
import useDate from 'hooks/useDate'

const PostCard: React.FC<ExhibitionCardResult> = (props) => {
  const { image, slug, title, excerpt, startDate, endDate } = props

  if (startDate) console.log(props)

  if (!image) return null

  return (
    <Link href={`/exhibition/${slug}`} passHref>
      <a
        {...mouseLinkProps}
        className=" flex  flex-wrap-reverse max-w-xl lg:max-w-full mx-auto  lg:flex-nowrap justify-between  w-full mb-8  md:mb-16"
      >
        <div className="w-full md:w-2/3 mt-4 lg:mt-0 md:pr-frida_7% flex flex-col   ">
          <Infos startDate={startDate} endDate={endDate} />
          <div>
            <h2 className="header-small pb-0">{title}</h2>
            <h3 className="text-sm-fluid opacity-50">{excerpt}</h3>
          </div>
        </div>

        <div className="relative w-full lg:w-1/3  aspect-h-9  ">
          <div className="aspect-h-10 aspect-w-16 ">
            <Photo photo={image} layout="fill" />
          </div>
        </div>
      </a>
    </Link>
  )
}

export default PostCard

const Infos: React.FC<{
  startDate: string | null
  endDate: string | null
}> = ({ startDate, endDate }) => {
  const date = useDate({ date: startDate, endDate })
  return (
    <div className="mb-3 flex items-center">
      <div className="text-xs-fluid">{date}</div>
    </div>
  )
}
