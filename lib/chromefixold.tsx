// // @ts-nocheck

// const VHChromeFix = function () {
//   const selectors = [
//     {
//       selector: '.h-vh-90', // Mandatory, CSS selector
//       vh: 90, // Mandatory, height in vh units
//     },
//     {
//       selector: '.h-vh-40',
//       vh: 40,
//     },
//     {
//       selector: '.h-vh-50',
//       vh: 50,
//     },
//     {
//       selector: '.h-vh-100',
//       vh: 100,
//     },
//   ]
//   const self = this
//   const userAgent = navigator.userAgent.toLowerCase()
//   const isAndroidChrome = /chrome/.test(userAgent) && /android/.test(userAgent)
//   const isIOSChrome = /crios/.test(userAgent)

//   if (isAndroidChrome || isIOSChrome) {
//     // If we detected Chrome on Android or iOS
//     // Cache elements and trigger fix on init
//     this.getElements(selectors)
//     this.fixAll()

//     // Cache window dimensions
//     this.windowWidth = window.innerWidth
//     this.windowHeight = window.innerHeight

//     window.addEventListener('resize', function (e) {
//       // Both width and height changed (orientation change)
//       // This is a hack, as Android when eyboard pops up
//       // Triggers orientation change
//       if (
//         self.windowWidth !== window.innerWidth &&
//         self.windowHeight !== window.innerHeight
//       ) {
//         self.windowWidth = window.innerWidth
//         self.windowHeight = window.innerHeight
//         self.fixAll()
//       }
//     })
//   }
// }

// VHChromeFix.prototype.getElements = function (selectors) {
//   this.elements = []
//   // Convert selectors to array if they are not
//   selectors = this.isArray(selectors) ? selectors : [selectors]

//   for (let i = 0; i < selectors.length; i++) {
//     // Get all elements for selector
//     const selector = selectors[i].selector
//     const elements = document.querySelectorAll(selector)

//     // Go through all elements for one selector to filter them
//     for (let j = 0; j < elements.length; j++) {
//       this.elements.push({
//         domElement: elements[j],
//         vh: selectors[i].vh,
//       })
//     }
//   }
// }

// VHChromeFix.prototype.isArray = function (array) {
//   return Object.prototype.toString.call(array) === '[object Array]'
// }

// VHChromeFix.prototype.fixAll = function () {
//   for (let i = 0; i < this.elements.length; i++) {
//     const element = this.elements[i]
//     // element.domElement.style.height =
//     //   (window.innerHeight * element.vh) / 100 + 'px'
//     element.domElement.style.transition = 'height 999s'
//   }
// }

// export default VHChromeFix

export {}
