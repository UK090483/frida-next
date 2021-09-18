import * as React from 'react'
import Hls, { ErrorData } from 'hls.js'

type UseHslProps = {
  videoRef: React.MutableRefObject<HTMLVideoElement | null>
  autoload: boolean
  playbackId: string
}

type UseHslState = {
  loading: boolean
  loaded: boolean
  error: null | ErrorData
}

// let hls: null | Hls = null
const useHls = (props: UseHslProps) => {
  const { videoRef, autoload, playbackId } = props

  const [state, setState] = React.useState<UseHslState>({
    loaded: false,
    loading: true,
    error: null,
  })

  const { loaded, loading, error } = state

  const hls = React.useRef<Hls | null>(null)

  React.useEffect(() => {
    if (loaded) return
    const attachVideo = () => {
      const video = videoRef.current
      if (!video) return
      if (Hls.isSupported()) {
        hls.current = new Hls({ autoStartLoad: autoload })
        hls.current.loadSource(`https://stream.mux.com/${playbackId}.m3u8`)
        hls.current.attachMedia(video)

        hls.current.on(Hls.Events.FRAG_LOADED, () => {
          if (loaded) return
          setState((oS) => ({ ...oS, loaded: true, loading: false }))
        })

        hls.current.on(Hls.Events.ERROR, (event, data) => {
          switch (data.type) {
            case Hls.ErrorTypes.NETWORK_ERROR:
              setState((oS) => ({ ...oS, error: data }))
              break
            case Hls.ErrorTypes.MEDIA_ERROR:
              // Don't output anything visible as these mostly are non-fatal
              break
            default:
              setState((oS) => ({ ...oS, error: data }))
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

  return { error, loaded, loading }
}

export default useHls
