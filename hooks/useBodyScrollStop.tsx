import { useEffect, useRef } from 'react'

const noScrollClass = 'Frida_no_scroll'
export default function useBodyScrollStop() {
  const bodyRef = useRef<null | HTMLElement>(null)
  useEffect(() => {
    bodyRef.current = document.querySelector('html')
  }, [bodyRef])

  const stopBodyScroll = () => {
    document.body.style.overflow = 'hidden'
    bodyRef.current && bodyRef.current.classList.add(noScrollClass)
  }

  const enableBodyScroll = () => {
    document.body.style.overflow = ''
    bodyRef.current && bodyRef.current.classList.remove(noScrollClass)
  }

  return { stopBodyScroll, enableBodyScroll }
}
