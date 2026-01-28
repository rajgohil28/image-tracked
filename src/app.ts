// @ts-ignore
const configure = () => {
  const XR8 = (window as any).XR8
  if (XR8 && XR8.XrController) {
    XR8.XrController.configure({
      imageTargetData: [
        require('../image-targets/20_Element_Fire.json'),
        require('../image-targets/22_Element_Air.json'),
        require('../image-targets/23_Element_Water.json'),
        require('../image-targets/25_Element_Earth.json'),
        require('../image-targets/bmo-bites.json'),
        require('../image-targets/toggle-slam.json'),
        require('../image-targets/waves.json'),
      ],
    })

    // Request fullscreen on first user interaction (Start button click)
    const requestFullscreen = () => {
      const docEl = document.documentElement as any
      const requestMethods = [
        'requestFullscreen',
        'webkitRequestFullscreen',
        'mozRequestFullScreen',
        'msRequestFullscreen',
      ]
      const method = requestMethods.find(m => docEl[m])
      if (method) {
        docEl[method]().catch((err: any) => {
          console.warn(`Fullscreen request failed: ${err.message}`)
        })
      }
      window.removeEventListener('touchstart', requestFullscreen)
      window.removeEventListener('mousedown', requestFullscreen)
    }

    // Listen for the first touch/click which usually corresponds to the 8th Wall "Start" button
    window.addEventListener('touchstart', requestFullscreen)
    window.addEventListener('mousedown', requestFullscreen)

  } else {
    // If XR8 exists but XrController is not yet ready, wait and try again.
    setTimeout(configure, 100)
  }
}

// @ts-ignore
window.XR8 ? configure() : window.addEventListener('xrloaded', configure)
