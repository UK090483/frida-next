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
// const Root = styled.div`
//   display: flex;
//   width: 260px;
//   max-width: 100%;
//   justify-content: space-between;

//   @media ${({ theme }) => theme.device.tablet} {
//     width: 320px;
//   }
// `
