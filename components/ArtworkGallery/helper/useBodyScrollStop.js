import { useEffect, useRef } from "react"

export default function useBodyScrollStop() {
  const bodyRef = useRef()
  useEffect(() => {
    bodyRef.current = document.querySelector("html")
  }, [])

  const stopBodyScroll = () => {
    bodyRef.current.style.overflow = "hidden"
  }

  const enableBodySroll = () => {
    bodyRef.current.style.overflow = "auto"
  }

  return { stopBodyScroll, enableBodySroll }
}
