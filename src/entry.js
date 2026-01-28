import "./app.ts"
import "./common/image-target-logger.ts"
import "./common/options-toggle.ts"
import "./common/space-selector.ts"
import "./magic-photos/video-pause-on-lost.ts"
import "./toggle-slam/coconut-spawner.ts"
import "./toggle-slam/coconut.ts"
import "./toggle-slam/toggle-slam-on-found.ts"

import scene from './.expanse.json'

delete scene.history
delete scene.historyVersion

window.ecs.application.init(scene)

if (module.hot) {
  const isInline = window.location.href.includes('liveSyncMode=inline')

  const handler = isInline
    ? () => { }
    : async () => {
      const updatedScene = (await import('./.expanse.json')).default

      delete updatedScene.history
      delete updatedScene.historyVersion

      window.ecs.application.getScene().updateBaseObjects(updatedScene.objects)
      window.ecs.application.getScene().updateDebug(updatedScene)
    }

  module.hot.accept('./.expanse.json', handler)
}