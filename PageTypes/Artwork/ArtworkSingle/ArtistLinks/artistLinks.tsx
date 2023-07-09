import React from 'react'
import Button from '../../../../components/buttons/button'

type ArtistLinksProps = {
  artwork: {
    artistWebLink: string
    instagramLink: string
  }
}

const ArtistLinks: React.FC<ArtistLinksProps> = ({ artwork }) => {
  const { artistWebLink, instagramLink } = artwork

  return (
    <div className="flex">
      {artistWebLink && (
        <Button
          label="Website"
          type="externalLink"
          link={artistWebLink}
          color="red"
          backgroundColor="white"
          className="mr-3"
        />
      )}
      {instagramLink && (
        <Button
          label="Instagram"
          type="externalLink"
          link={instagramLink}
          color={'red'}
          backgroundColor="white"
          className="mr-3"
        />
      )}
    </div>
  )
}
export default ArtistLinks
