class Road {
  constructor(x, width, laneCount = 4) {
    this.x = x;
    this.width = width;
    this.laneCount = laneCount;
    const margin = 5;
    this.left = x - width / 2 + margin;
    this.right = x + width / 2 - margin;

    const infinity = 1000000;
    this.top = -infinity;
    this.bottom = infinity;

    this.topLeft = { x: this.left, y: this.top };
    this.bottomLeft = { x: this.left, y: this.bottom };
    this.topRight = { x: this.right, y: this.top };
    this.bottomRight = { x: this.right, y: this.bottom };

    this.borders = [
      { start: this.topLeft, end: this.bottomLeft },
      { start: this.topRight, end: this.bottomRight },
    ];
  }

  draw(ctx) {
    ctx.lineWidth = 5;
    ctx.strokeStyle = "white";

    this.borders.forEach((border) => {
      ctx.setLineDash([]);
      ctx.beginPath();
      ctx.moveTo(border.start.x, border.start.y);
      ctx.lineTo(border.end.x, border.end.y);
      ctx.stroke();
    });

    for (let i = 1; i <= this.laneCount - 1; i++) {
      const laneLeft = lerp(this.left, this.right, i / this.laneCount);
      ctx.setLineDash([20, 20]);
      ctx.beginPath();
      ctx.moveTo(laneLeft, this.top);
      ctx.lineTo(laneLeft, this.bottom);
      ctx.stroke();
    }
  }

  getLaneCenter(laneIndex) {
    const firstLane = laneIndex == 0;
    if (firstLane) {
      const laneLeft = this.left;
      const laneRight = lerp(this.left, this.right, 1 / this.laneCount);
      return lerp(laneLeft, laneRight, 0.5);
    }
    const lastLane = laneIndex == this.laneCount - 1;
    if (lastLane) {
      const laneLeft = lerp(
        this.left,
        this.right,
        (this.laneCount - 1) / this.laneCount
      );
      const laneRight = this.right;
      return lerp(laneLeft, laneRight, 0.5);
    }
    const laneLeft = lerp(this.left, this.right, laneIndex / this.laneCount);
    const laneRight = lerp(
      this.left,
      this.right,
      (laneIndex + 1) / this.laneCount
    );
    return lerp(laneLeft, laneRight, 0.5);
  }
}
