class Car {
  constructor(x, y, width, height) {
    this.x = x;
    this.y = y;
    this.width = width;
    this.height = height;
    this.speed = 0;
    this.acceleration = 0.2;
    this.maxSpeed = 3;
    this.friction = 0.05;
    this.angle = 0;

    this.sensor = new Sensor(this);
    this.controlls = new Controlls();
  }

  draw(ctx) {
    ctx.save();
    // adds a translation transformation to the current matrix by moving
    // the canvas and its origin x units horizontally and y units vertically
    // on the grid.
    ctx.translate(this.x, this.y);
    ctx.rotate(-this.angle);
    ctx.beginPath();
    ctx.rect(-this.width / 2, -this.height / 2, this.width, this.height);
    ctx.fill();
    ctx.restore();

    this.sensor.draw(ctx);
  }

  update() {
    this.#move();
    this.sensor.update();
  }

  #move() {
    if (this.controlls.forward) {
      this.speed += this.acceleration;
    }
    if (this.controlls.reverse) {
      this.speed -= this.acceleration;
    }
    this.limitSpeed();

    if (this.speed != 0) {
      const flip = this.speed > 0 ? 1 : -1;

      if (this.controlls.left) {
        this.angle += 0.03 * flip;
      }
      if (this.controlls.right) {
        this.angle -= 0.03 * flip;
      }
    }

    this.x -= Math.sin(this.angle) * this.speed;
    this.y -= Math.cos(this.angle) * this.speed;
  }

  limitSpeed() {
    if (this.speed > this.maxSpeed) {
      this.speed = this.maxSpeed;
    }
    if (this.speed < -this.maxSpeed / 2) {
      this.speed = -this.maxSpeed / 2;
    }
    if (this.speed > 0) {
      this.speed -= this.friction;
    }
    if (this.speed < 0) {
      this.speed += this.friction;
    }
    if (Math.abs(this.speed) < this.friction) {
      this.speed = 0;
    }
  }
}
