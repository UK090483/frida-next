import React from 'react'

type UseVideoProps = {
  videoRef: React.MutableRefObject<HTMLVideoElement | null>
  indicatorRef?: React.MutableRefObject<HTMLDivElement | null>
}

function useVideo(props: UseVideoProps) {
  const { videoRef, indicatorRef } = props

  const [state, setState] = React.useState({ isPlaying: false })

  const { isPlaying } = state

  const play = () => {
    if (!videoRef.current) return
    videoRef.current.play()
  }
  const pause = () => {
    if (!videoRef.current) return
    videoRef.current.pause()
  }

  const toggle = () => {
    isPlaying ? pause() : play()
  }

  React.useEffect(() => {
    if (!videoRef.current) return

    const handlePlay = () => {
      setState((oS) => ({ ...oS, isPlaying: true }))
    }
    const handlePause = () => {
      setState((oS) => ({ ...oS, isPlaying: false }))
    }

    videoRef.current.addEventListener('play', handlePlay)
    videoRef.current.addEventListener('pause', handlePause)

    if (indicatorRef) {
      videoRef.current.addEventListener('timeupdate', () => {
        const video = videoRef.current
        if (!video || !indicatorRef.current) return
        const procent = (video.currentTime / video.duration) * 100

        indicatorRef.current.style.transform = `translateX(${procent - 100}%)`
      })
    }
  }, [videoRef, indicatorRef])

  return { play, pause, isPlaying, toggle }
}

export default useVideo
