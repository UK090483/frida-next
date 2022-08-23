export default class SoundPlayer {
  constructor() {
    console.log('Mock SoundPlayer: constructor was called')
    this.product = {
      get: () => {
        console.log('mock product get called')

        return Promise.resolve('')
      },
    }
  }
  product
}
