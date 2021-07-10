type Selector = {
  selector: string
  vh: number
}
type SelectorElement = {
  domElement: HTMLElement
  vh: number
}
const VHChromeFix = function () {
  const selectors = [
    {
      selector: '.h-vh-90',
      vh: 90,
    },
    {
      selector: '.h-vh-40',
      vh: 40,
    },
    {
      selector: '.h-vh-50',
      vh: 50,
    },
    {
      selector: '.h-vh-100',
      vh: 100,
    },
  ]

  let elements: SelectorElement[] | null = null
  let windowWidth: number
  let windowHeight: number

  if (needsFixing()) {
    if (!elements) {
      elements = getElements(selectors)
    }
    fixAll(elements)

    // Cache window dimensions
    windowWidth = window.innerWidth
    windowHeight = window.innerHeight

    window.addEventListener('resize', function () {
      // Both width and height changed (orientation change)
      // This is a hack, as Android when eyboard pops up
      // Triggers orientation change
      if (
        windowWidth !== window.innerWidth &&
        windowHeight !== window.innerHeight
      ) {
        windowWidth = window.innerWidth
        windowHeight = window.innerHeight
        if (!elements) {
          elements = getElements(selectors)
        }
        fixAll(elements)
      }
    })
  }
}

const needsFixing = () => {
  if (!navigator) return false
  const userAgent = navigator.userAgent.toLowerCase()
  const isAndroidChrome = /chrome/.test(userAgent) && /android/.test(userAgent)
  const isIOSChrome = /crios/.test(userAgent)
  return isAndroidChrome || isIOSChrome
}

const getElements = (selectors: Selector[]) => {
  return selectors.reduce((acc, item) => {
    const elements = [...document.querySelectorAll(item.selector)].map(
      (res) => ({ domElement: res as HTMLElement, vh: item.vh })
    )
    return [...acc, ...elements]
  }, [] as SelectorElement[])
}

const fixAll = (elements: SelectorElement[]) => {
  elements.forEach((item) => {
    item.domElement.style.transition = 'height 999s'
    // element.domElement.style.height =
    //   (window.innerHeight * element.vh) / 100 + 'px'
  })
}

export default VHChromeFix
