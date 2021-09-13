import * as React from 'react'
import Hls, { ErrorData } from 'hls.js'

type UseHslProps = {
  videoRef: React.MutableRefObject<HTMLVideoElement | null>
  autoload: boolean
  playbackId: string
}

// let hls: null | Hls = null
const useHls = (props: UseHslProps) => {
  const { videoRef, autoload, playbackId } = props
  const [error, setError] = React.useState<null | ErrorData>(null)

  const hls = React.useRef<Hls | null>(null)

  React.useEffect(() => {
    const attachVideo = () => {
      const video = videoRef.current
      if (!video) return
      if (Hls.isSupported()) {
        hls.current = new Hls({ autoStartLoad: autoload })
        hls.current.loadSource(`https://stream.mux.com/${playbackId}.m3u8`)
        hls.current.attachMedia(video)
        hls.current.on(Hls.Events.MANIFEST_PARSED, () => {
          // videoContainer.style.display = 'block'
        })
        hls.current.on(Hls.Events.ERROR, (event, data) => {
          switch (data.type) {
            case Hls.ErrorTypes.NETWORK_ERROR:
              setError(data)
              break
            case Hls.ErrorTypes.MEDIA_ERROR:
              // Don't output anything visible as these mostly are non-fatal
              break
            default:
              setError(data)
          }
          console.error(data) // eslint-disable-line no-console
        })
      }

      return () => {
        hls.current && hls.current.destroy()
      }
    }

    attachVideo()
  }, [videoRef, autoload, playbackId])

  return { error }
}

export default useHls
