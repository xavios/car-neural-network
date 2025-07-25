class Sensor {
  constructor(car) {
    this.car = car;
    this.rayCount = 5;
    this.rayLenght = 100;
    this.raySpread = Math.PI / 4; // 45°
    this.rays = [];
  }

  update() {
    this.rays = [];
    for (let i = 0; i <= this.rayCount - 1; i++) {
      const angle =
        lerp(
          this.raySpread,
          -this.raySpread,
          this.rayCount === 1 ? 0.5 : i / (this.rayCount - 1)
        ) + this.car.angle;
      const start = { x: this.car.x, y: this.car.y };
      const end = {
        x: this.car.x - Math.sin(angle) * this.rayLenght,
        y: this.car.y - Math.cos(angle) * this.rayLenght,
      };
      this.rays.push({ start, end });
    }
  }

  draw(ctx) {
    ctx.strokeStyle = "yellow";
    ctx.setLineDash([]);
    ctx.lineWidth = 2;
    for (let ray of this.rays) {
      ctx.beginPath();
      ctx.moveTo(ray.start.x, ray.start.y);
      ctx.lineTo(ray.end.x, ray.end.y);
      ctx.stroke();
    }
  }
}
