import mitt from 'mitt'

export default defineNuxtPlugin(() => {
  const emitter = mitt()

  return {
    provide: {
        BusEmit: emitter.emit, // Will emit an event
        BusOn: emitter.on, // Will register a listener for an event
        BusOff: emitter.off
    }
  }
})