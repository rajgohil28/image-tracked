import * as ecs from '@8thwall/ecs'

ecs.registerComponent({
  name: 'image-target-logger',
  stateMachine: ({world}) => {
    ecs.defineState('default')
      .initial()
      .listen(world.events.globalId, 'reality.imagefound', (e) => {
        const {name} = e.data as any
        console.log(`🎯 Image Found: ${name}`)
      })
      .listen(world.events.globalId, 'reality.imagelost', (e) => {
        const {name} = e.data as any
        console.log(`❌ Image Lost: ${name}`)
      })
      .listen(world.events.globalId, 'reality.imagescanned', (e) => {
        const {name} = e.data as any
        console.log(`🔍 Image Scanned: ${name}`)
      })
  },
})
