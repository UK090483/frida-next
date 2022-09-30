const observe = jest.fn()
const disconnect = jest.fn()

//@ts-ignore
window.IntersectionObserver = jest.fn(() => ({
  observe,
  disconnect,
}))

export { observe, disconnect }
