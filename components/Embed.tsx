import * as React from "react"
import { setMouse } from "./generic/Mouse/mouseRemote"
interface IEmbetProps {
  url?: string
}

const Embet: React.FC<IEmbetProps> = ({ url }) => {
  if (!url) return <div>Url is not set</div>

  return (
    <div
      onMouseEnter={() => {
        setMouse("hide", true)
      }}
      onMouseLeave={() => {
        setMouse("hide", false)
      }}
      className="px-12"
    >
      <div className="aspect-w-16 aspect-h-9">
        <iframe
          src={url}
          frameBorder="0"
          allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
          allowFullScreen={true}
        ></iframe>
      </div>
    </div>
  )
}

export default Embet
