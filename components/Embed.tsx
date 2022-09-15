import * as React from 'react'
import { setMouse } from './generic/Mouse/mouseRemote'
interface IEmbedProps {
  url?: string
}

const Embed: React.FC<IEmbedProps> = ({ url }) => {
  if (!url) return <div>Url is not set</div>

  return (
    <div
      onMouseEnter={() => {
        setMouse('hide', true)
      }}
      onMouseLeave={() => {
        setMouse('hide', false)
      }}
    >
      <div className="aspect-w-16 aspect-h-9">
        <iframe
          title="title"
          src={url}
          frameBorder="0"
          allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
          allowFullScreen={true}
        ></iframe>
      </div>
    </div>
  )
}

export default Embed
