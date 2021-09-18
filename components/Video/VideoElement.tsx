/* eslint-disable jsx-a11y/no-static-element-interactions */
/* eslint-disable jsx-a11y/click-events-have-key-events */
import Icon from '@components/Icon'
import * as React from 'react'
import useVideo from './useVideo'
import { MuxResult } from './types'
import useHls from './useHls'
import useObjectFit from './useObjectFit'
import classNames from 'classnames'

export interface IVideoProps {
  assetDocument: MuxResult
  autoload?: boolean
  muted?: boolean
  autoplay?: boolean
  loop?: boolean
  showControls?: boolean
  width?: string | number
  height?: string | number
  style?: React.CSSProperties
  className?: string
  poster?: string | boolean
  onClick?: (event: React.MouseEvent<HTMLVideoElement, MouseEvent>) => void
  fit: 'contain' | 'fill'
}

const VideoElement: React.FunctionComponent<IVideoProps> = (props) => {
  const {
    assetDocument: {
      playbackId,
      data: { aspect_ratio },
      thumbTime,
    },
    autoload = true,
    autoplay = true,
    showControls = true,
    fit = 'contain',
  } = props
  const videoRef = React.useRef<HTMLVideoElement | null>(null)
  const containerRef = React.useRef<HTMLDivElement | null>(null)
  const fitRef = React.useRef<HTMLDivElement | null>(null)
  const indicatorRef = React.useRef<HTMLDivElement | null>(null)
  const { error, loading } = useHls({ autoload, playbackId, videoRef })

  const customControls = false

  const poster = getPosterSrc(playbackId, {
    time: thumbTime || 0,
    fitMode: 'preserve',
  })

  const { toggle, isPlaying } = useVideo({
    videoRef,
    indicatorRef,
  })

  const fitRatio = React.useMemo(
    () =>
      aspect_ratio
        ? parseFloat(aspect_ratio.split(':')[0]) /
          parseFloat(aspect_ratio.split(':')[1])
        : 1,
    [aspect_ratio]
  )

  useObjectFit({
    fitRef: fitRef,
    containerRef,
    fitRatio,
    type: fit,
  })

  return (
    <div
      ref={containerRef}
      className="relative flex items-center justify-center w-full h-full transition-opacity duration-1000 opacity-0"
      onClick={toggle}
    >
      <div className="relative group" ref={fitRef}>
        {customControls && (
          <button
            className={classNames(
              'absolute  z-[1] transform  translate-x-1/2 translate-y-1/2 transition-transform outline-none',
              'scale-[3]',
              {
                'opacity-80 scale-[1] bottom-8 right-8 group-hover:scale-[2]':
                  isPlaying,
              },
              {
                'opacity-100  scale-[3] bottom-1/2 right-1/2':
                  !isPlaying || loading,
              }
            )}
            onClick={toggle}
          >
            <Icon
              tabindex={0}
              icon={loading ? 'loader' : isPlaying ? 'play' : 'stop'}
              color="pink"
              className={classNames('pointer-events-auto  bg-transparent ')}
            />
          </button>
        )}
        <video
          className="max-w-full max-h-full min-w-full min-h-full"
          loop
          muted
          poster={poster}
          controls={showControls}
          autoPlay={autoplay}
          ref={videoRef}
        >
          <track kind="captions" />
        </video>
        {customControls && (
          <div className="absolute left-0 right-0 h-2 overflow-hidden bottom-[-1px] opacity-80">
            <div
              ref={indicatorRef}
              className="w-full h-full bg-frida-pink transform translate-x-[-100%] transition-transform duration-300"
            ></div>
          </div>
        )}
      </div>

      {error && (
        <div className="absolute inset-0 flex items-center justify-center ">
          <div className="z-10 px-8 py-4 bg-frida-pink">
            There was an error loading this video.
          </div>
        </div>
      )}
    </div>
  )
}

export default VideoElement

function getPosterSrc(
  playbackId: string,
  options: { [k: string]: unknown } = {}
) {
  const width = options.width || 640
  const height = options.height || ''
  const time = options.time || 0
  const fitMode =
    typeof options.fitMode === 'undefined' ? 'smartcrop' : options.fitMode
  let url = `https://image.mux.com/${playbackId}/thumbnail.png?width=${width}&fit_mode=${fitMode}&time=${time}`
  if (options.height) {
    url += `&height=${height}`
  }
  return url
}
