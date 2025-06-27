class Road {
  constructor(x, width, laneCount = 3) {
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

    ctx.beginPath();
    ctx.moveTo(this.left + 10, this.top);
    ctx.lineTo(this.left + 10, this.bottom);
    ctx.stroke();

    ctx.beginPath();
    ctx.moveTo(this.right - 10, this.top);
    ctx.lineTo(this.right - 10, this.bottom);
    ctx.stroke();

    let laneWidth = this.width / this.laneCount;
    for (let i = 0; i < this.laneCount - 1; i++) {
      let fill = true;
      const lineLength = 30;
      for (let j = 0; j < window.innerHeight; j += lineLength) {
        if (fill) {
          ctx.beginPath();
          ctx.moveTo(laneWidth, j);
          ctx.lineTo(laneWidth, j + 30);
          ctx.stroke();
        }

        fill = !fill;
      }

      laneWidth += laneWidth;
    }
  }
}
