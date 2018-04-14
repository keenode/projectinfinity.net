class Camera {
  scene = null
  vx = 0
  vy = 0
  accel = 2.0
  maxVel = 10.0
  friction = 0.25
  moving = {
    up: false,
    down: false,
    left: false,
    right: false
  }

  constructor() {
    console.log('[Camera] Constructed')
    document.onkeydown = this.handleKeyDown.bind(this)
    document.onkeyup = this.handleKeyUp.bind(this)
  }

  handleKeyDown(e) {
    if (e.which === 87 || e.which === 38) {
      console.log('up')
      this.moving.up = true
    }
    else if (e.which === 83 || e.which === 40) {
      console.log('down')
      this.moving.down = true
    }
    else if (e.which === 65 || e.which === 37) {
      console.log('left')
      this.moving.left = true
    }
    else if (e.which === 68 || e.which === 39) {
      console.log('right')
      this.moving.right = true
    }
  }

  handleKeyUp(e) {
    if (e.which === 87 || e.which === 38) {
      this.moving.up = false
    }
    else if (e.which === 83 || e.which === 40) {
      this.moving.down = false
    }
    else if (e.which === 65 || e.which === 37) {
      this.moving.left = false
    }
    else if (e.which === 68 || e.which === 39) {
      this.moving.right = false
    }
  }

  update(delta) {
    // Handle acceleration direction
    if (this.moving.up) {
      this.vy += this.accel
    }
    if (this.moving.down) {
      this.vy -= this.accel
    }
    if (this.moving.left) {
      this.vx += this.accel
    }
    if (this.moving.right) {
      this.vx -= this.accel
    }

    // Handle friction
    this.vx -= this.friction * Math.sign(this.vx)
    this.vy -= this.friction * Math.sign(this.vy)

    // Handle max velocity 
    const dirFactorX = this.moving.left ? 1 : -1
    const dirFactorY = this.moving.up ? 1 : -1
    this.vx = Math.abs(this.vx) > this.maxVel ? this.maxVel * dirFactorX : this.vx
    this.vy = Math.abs(this.vy) > this.maxVel ? this.maxVel * dirFactorY : this.vy

    console.log('vy: ' + this.vy)
    console.log('vx: ' + this.vx)

    // Set position
    this.scene.x += this.vx * delta
    this.scene.y += this.vy * delta
  }

  assignScene(scene) {
    this.scene = scene
  }
}

export default Camera
