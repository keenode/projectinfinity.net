class Camera {
  scene = null
  panSpeed = 20.0

  constructor() {
    console.log('[Camera] Constructed')
    const callKeyEventsHandler = e => this.handleKeyEvents(e)
    document.removeEventListener('keydown', callKeyEventsHandler)
    document.addEventListener('keydown', callKeyEventsHandler)
  }

  handleKeyEvents(e) {
    // console.log(e.which)
    switch (e.which) {
      case 87: case 38:
        console.log('UP')
        this.scene.y += this.panSpeed
        break
      case 83: case 40:
        console.log('DOWN')
        this.scene.y -= this.panSpeed
        break
      case 65: case 37:
        console.log('LEFT')
        this.scene.x += this.panSpeed
        break
      case 68: case 39:
        console.log('RIGHT')
        this.scene.x -= this.panSpeed
        break
      default:
        return
    }
  }

  assignScene(scene) {
    this.scene = scene
  }
}

export default Camera
