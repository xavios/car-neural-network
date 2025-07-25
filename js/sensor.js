class Sensor {
  constructor(car) {
    this.car = car;
    this.rayCount = 15;
    this.rayLenght = 100;
    this.raySpread = Math.PI / 1.5; // 120°
    this.rays = [];
    this.roadBorders = null;
    this.readings = [];
  }

  // I want to represent if any of my rays actually hits a border
  // I need to respresent it in a way, that the line for the ray
  // will be black from onwards of the first touch of a border.

  update(roadBorders) {
    this.roadBorders = roadBorders;
    this.#castRays();
    this.readings = [];
    for (let ray of this.rays) {
      this.readings.push(this.#getReadings(ray));
    }
    // once I casted the rays, I should add if the ray has readings
  }

  #getReadings(ray) {
    const touches = [];
    for (let border of this.roadBorders) {
      const touch = getIntersection(
        ray.start,
        ray.end,
        border.start,
        border.end
      );
      if (!!touch) {
        touches.push(touch);
      }
    }
    if (touches.length === 0) {
      return null;
    }
    const offsets = touches.map((touch) => touch.offset);
    const minOffset = Math.min(...offsets);
    return touches.find((touch) => touch.offset === minOffset);
  }

  #castRays() {
    this.rays = [];
    for (let i = 0; i <= this.rayCount - 1; i++) {
      const angle =
        lerp(
          this.raySpread / 2,
          -this.raySpread / 2,
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
    ctx.setLineDash([]);
    ctx.lineWidth = 2;
    for (let i = 0; i < this.rays.length; i++) {
      const ray = this.rays[i];
      ctx.beginPath();
      ctx.strokeStyle = "yellow";
      ctx.moveTo(ray.start.x, ray.start.y);
      if (this.readings[i]) {
        ctx.strokeStyle = "red";
        ctx.lineTo(this.readings[i].x, this.readings[i].y);
        ctx.stroke();

        ctx.beginPath();
        ctx.strokeStyle = "black";
        ctx.moveTo(this.readings[i].x, this.readings[i].y);
        ctx.lineTo(ray.end.x, ray.end.y);
        ctx.stroke();
      } else {
        ctx.lineTo(ray.end.x, ray.end.y);
        ctx.stroke();
      }
    }
  }
}
