class Road {
  constructor(x, width, laneCount = 4) {
    this.x = x;
    this.width = width;
    this.laneCount = laneCount;
    this.left = x - width / 2;
    this.right = x + width / 2;

    const infinity = 1000000;
    this.top = -infinity;
    this.bottom = infinity;
  }

  draw() {
    ctx.lineWidth = 5;
    ctx.strokeStyle = "white";

    for (let i = 0; i <= this.laneCount; i++) {
      const laneLeft = lerp(this.left + 5, this.right - 5, i / this.laneCount);
      if (i == 0 || i == this.laneCount) {
        ctx.setLineDash([]);
      } else {
        ctx.setLineDash([20, 20]);
      }
      ctx.beginPath();
      ctx.moveTo(laneLeft, this.top);
      ctx.lineTo(laneLeft, this.bottom);
      ctx.stroke();
    }
  }

  getLaneCenter(laneIndex) {
    if (laneIndex == 0) {
      const laneLeft = this.left + 5;
      const laneRight = lerp(this.left + 5, this.right - 5, 1 / this.laneCount);
      return lerp(laneLeft, laneRight, 0.5);
    }
    if (laneIndex == this.laneCount - 1) {
      const laneLeft = lerp(
        this.left + 5,
        this.right - 5,
        (this.laneCount - 1) / this.laneCount
      );
      const laneRight = this.right - 5;
      return lerp(laneLeft, laneRight, 0.5);
    }
    const laneLeft = lerp(
      this.left + 5,
      this.right - 5,
      laneIndex / this.laneCount
    );
    const laneRight = lerp(
      this.left + 5,
      this.right - 5,
      (laneIndex + 1) / this.laneCount
    );
    return lerp(laneLeft, laneRight, 0.5);
  }
}
