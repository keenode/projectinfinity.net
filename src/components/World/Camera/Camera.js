class Camera {
  scene = null
  vx = 0
  vy = 0
  accel = 20.0
  maxVel = 20.0
  deccelFactor = 0.95
  moving = {
    up: false,
    down: false,
    left: false,
    right: false
  }

  constructor() {
    console.log('[Camera] Constructed')
    // document.onkeydown = document.onkeyup = this.handleKeyEvents.bind(this)
    document.onkeydown = this.handleKeyDown.bind(this)
    document.onkeyup = this.handleKeyUp.bind(this)
  }

  handleKeyDown(e) {
    // console.log(e.which)
    if (e.which === 87 || e.which === 38) {
      console.log('up')
      this.moving.up = true
    }
    if (e.which === 83 || e.which === 40) {
      console.log('down')
      this.moving.down = true
    }
    if (e.which === 65 || e.which === 37) {
      console.log('left')
      this.moving.left = true
    }
    if (e.which === 68 || e.which === 39) {
      console.log('right')
      this.moving.right = true
    }
    this.move()    
  }

  handleKeyUp(e) {
    // console.log(e.which)
    if (e.which === 87 || e.which === 38) {
      this.moving.up = false
    }
    if (e.which === 83 || e.which === 40) {
      this.moving.down = false
    }
    if (e.which === 65 || e.which === 37) {
      this.moving.left = false
    }
    if (e.which === 68 || e.which === 39) {
      this.moving.right = false
    }
  }

  move() {
    if (this.moving.up) {
      this.vy += this.accel
    } else if (this.moving.down) {
      this.vy -= this.accel
    } else if (this.moving.left) {
      this.vx += this.accel
    } else if (this.moving.right) {
      this.vx -= this.accel
    }
  }

  update(delta) {
    const dirFactor = this.moving.up || this.moving.left ? 1 : -1
    this.vx *= this.deccelFactor
    this.vy *= this.deccelFactor
    this.vx = Math.abs(this.vx) > this.maxVel ? this.maxVel * dirFactor : this.vx
    this.vy = Math.abs(this.vy) > this.maxVel ? this.maxVel * dirFactor : this.vy
    this.scene.x += this.vx * delta
    this.scene.y += this.vy * delta
  }

  assignScene(scene) {
    this.scene = scene
  }
}

export default Camera
