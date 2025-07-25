class Car {
  constructor(x, y, options) {
    this.options = {
      width: options && options.width ? options.width : 40,
      height: options && options.height ? options.height : 80,
      type: options && options.type ? options.type : "DUMMY",
      maxSpeed: options && options.maxSpeed ? options.maxSpeed : 5,
      color: options && options.color ? options.color : "black",
    };
    this.x = x;
    this.y = y;
    this.width = this.options.width;
    this.height = this.options.height;
    this.speed = 0;
    this.acceleration = 0.5;
    this.maxSpeed = this.options.maxSpeed;
    this.friction = 0.05;
    this.angle = 0;

    if (this.options.type === "DRIVEABLE" || this.options.type === "AI") {
      this.sensor = new Sensor(this);
    }
    this.controlls = new Controlls(this.options.type);
    this.polygon = [];
    this.damaged = false;

    if (this.options.type === "AI") {
      this.brain = new NeuralNetwork([this.sensor.rayCount, 6, 8, 4]);
    }
  }

  draw(ctx) {
    ctx.fillStyle = this.options.color;
    if (this.damaged) {
      ctx.fillStyle = "grey";
    }
    ctx.beginPath();
    ctx.moveTo(this.polygon[0].x, this.polygon[0].y);
    for (let i = 1; i < this.polygon.length; i++) {
      ctx.lineTo(this.polygon[i].x, this.polygon[i].y);
    }
    ctx.fill();

    if (this.sensor) {
      this.sensor.draw(ctx);
    }
  }

  update(roadBorders, traffic) {
    if (!this.damaged) {
      this.#move();
      this.polygon = this.#createPolygon();
      if (this.sensor) {
        this.sensor.update(roadBorders, traffic);
      }
      this.damaged = this.#setDamaged(roadBorders, traffic);

      if (this.brain) {
        const controlls = NeuralNetwork.feedForward(
          this.sensor.readings.map((s) => {
            return s !== null ? 1 - s.offset : 0;
          }),
          this.brain
        );

        this.controlls.forward = controlls[0];
        this.controlls.left = controlls[1];
        this.controlls.right = controlls[2];
        this.controlls.reverse = controlls[3];
        console.log(this.controlls);
      }
    }
  }

  #setDamaged(roadBorders, traffic) {
    let damaged = false;
    for (let border of roadBorders) {
      if (poplyInterSect(this.polygon, border)) {
        damaged = true;
      }
    }
    for (let i = 0; i < traffic.length; i++) {
      if (poplyInterSect(this.polygon, traffic[i].polygon)) {
        damaged = true;
      }
    }
    return damaged;
  }

  #createPolygon() {
    const radius = Math.hypot(this.width, this.height) / 2;
    const alpha = Math.atan2(this.width, this.height);
    const points = [];
    points.push({
      x: this.x - Math.sin(this.angle - alpha) * radius,
      y: this.y - Math.cos(this.angle - alpha) * radius,
    });
    points.push({
      x: this.x - Math.sin(this.angle + alpha) * radius,
      y: this.y - Math.cos(this.angle + alpha) * radius,
    });
    points.push({
      x: this.x - Math.sin(Math.PI + this.angle - alpha) * radius,
      y: this.y - Math.cos(Math.PI + this.angle - alpha) * radius,
    });
    points.push({
      x: this.x - Math.sin(Math.PI + this.angle + alpha) * radius,
      y: this.y - Math.cos(Math.PI + this.angle + alpha) * radius,
    });
    return points;
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
