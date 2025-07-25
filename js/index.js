const canvas = document.getElementById("myCanvas");
canvas.width = 320;

const ctx = canvas.getContext("2d");
const road = new Road(canvas.width / 2, canvas.width, 5);
const car = new Car(road.getLaneCenter(3), window.innerHeight / 2, {
  type: "DRIVEABLE",
  haveSensors: true,
});

const traffic = [
  new Car(road.getLaneCenter(3), window.innerHeight / 3, {
    maxSpeed: 3,
  }),
];

animate();

function animate() {
  canvas.height = window.innerHeight;

  car.update(road.borders);

  for (let i = 0; i < traffic.length; i++) {
    traffic[i].update(road.borders);
  }

  ctx.save();
  ctx.translate(0, -car.y + canvas.height * 0.7);
  road.draw(ctx);
  car.draw(ctx);

  for (let i = 0; i < traffic.length; i++) {
    traffic[i].draw(ctx);
  }
  ctx.restore();
  requestAnimationFrame(animate);
}
