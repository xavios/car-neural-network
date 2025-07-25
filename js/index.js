const canvas = document.getElementById("myCanvas");
canvas.width = 320;

const ctx = canvas.getContext("2d");
const road = new Road(canvas.width / 2, canvas.width, 5);
const car = new Car(road.getLaneCenter(3), window.innerHeight / 2, {
  type: "AI",
  color: "blue",
});

const traffic = [
  new Car(road.getLaneCenter(3), window.innerHeight / 5, {
    maxSpeed: 3,
  }),
];

animate();

function animate() {
  canvas.height = window.innerHeight;

  for (let i = 0; i < traffic.length; i++) {
    traffic[i].update(road.borders, []);
  }

  car.update(road.borders, traffic);

  ctx.save();
  ctx.translate(0, -car.y + canvas.height * 0.7);
  road.draw(ctx);

  for (let i = 0; i < traffic.length; i++) {
    traffic[i].draw(ctx);
  }
  car.draw(ctx);
  ctx.restore();
  requestAnimationFrame(animate);
}
