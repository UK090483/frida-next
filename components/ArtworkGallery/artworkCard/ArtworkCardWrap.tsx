import React from 'react'
import { mouseLinkProps } from '@components/generic/Mouse/mouseRemote'
import Link from 'next/link'
import { useRouter } from 'next/router'
import { useContextualRouting } from 'next-use-contextual-routing'

type ArtworkContainerProps = {
  slug: string
  preventClick?: boolean
  reactOnMouseDown?: boolean
}

const ArtworkContainer: React.FC<ArtworkContainerProps> = ({
  children,
  slug,
  preventClick = false,
  reactOnMouseDown = true,
}) => {
  const router = useRouter()

  React.useEffect(() => {
    router.prefetch(`/artwork/${slug}`)
  }, [])

  const { makeContextualHref, returnHref } = useContextualRouting()
  return (
    <div className="artwork-wrap w-full mb-20">
      <div
        onClick={(e) => {
          e.preventDefault()
          // if (!preventClick && !reactOnMouseDown) {
          //   router.push(`/artwork/${slug}`)
          // }
          router.push(
            makeContextualHref({ artworkSlug: `/artwork/${slug}`, returnHref }),
            `/artwork/${slug}`,
            {
              shallow: true,
            }
          )
        }}
        // onMouseDown={() => {
        //   if (!preventClick && reactOnMouseDown) {
        //     router.push(`/artwork/${slug}`)
        //   }
        // }}
        data-testid={'artwork-prev'}
        style={{ textDecoration: 'none', color: 'black', cursor: 'none' }}
        {...mouseLinkProps}
      >
        {children}
      </div>
    </div>
  )
}

export default ArtworkContainer
