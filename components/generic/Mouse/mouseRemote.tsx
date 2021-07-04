import MouseClassNames from './classNames'

let mouseNeeded = false

const throttle = throttled(30, (mouse, e) => {
  mouse.style.left = e.pageX - 15 + 'px'
  mouse.style.top = e.pageY - 15 + 'px'
})

const setMouse = (
  type: 'link' | 'color' | 'hide' | 'reset' | 'move',
  e?: boolean | MouseEvent
) => {
  // @ts-ignore
  let mouse = window.FridaMouse // @ts-ignore
  !mouse && (mouse = window.FridaMouse)
  const initMouse = () => {
    mouseNeeded = true
    document.querySelector('body')?.classList.add('frida_mouse_active')
  }

  if (mouse) {
    switch (type) {
      case 'move':
        !mouseNeeded && initMouse()
        // @ts-ignore
        throttle(mouse, e)

        break
      case 'link':
        e
          ? mouse.classList.add(MouseClassNames.linkHover)
          : mouse.classList.remove(MouseClassNames.linkHover)

        break
      case 'color':
        e
          ? mouse.classList.add(MouseClassNames.black)
          : mouse.classList.remove(MouseClassNames.black)
        break

      case 'hide':
        e
          ? mouse.classList.add(MouseClassNames.hide)
          : mouse.classList.remove(MouseClassNames.hide)
        break
      case 'reset':
        mouse.classList.remove(MouseClassNames.linkHover)
        mouse.classList.remove(MouseClassNames.black)
        mouse.classList.remove(MouseClassNames.hide)
        break

      default:
        break
    }
  }
}

const mouseLinkProps = {
  onMouseEnter: () => {
    setMouse('link', true)
  },
  onMouseLeave: () => {
    setMouse('link', false)
  },
}

export { setMouse, mouseLinkProps }

function throttled(
  delay: number,
  fn: (mouse: HTMLElement, e: MouseEvent) => void
) {
  let lastCall = 0
  return function (mouse: HTMLElement, e: MouseEvent) {
    const now = new Date().getTime()
    if (now - lastCall < delay) {
      return
    }
    lastCall = now
    return fn(mouse, e)
  }
}
