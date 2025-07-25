const carCanvas = document.getElementById("carCanvas");
carCanvas.width = 320;

const networkCanvas = document.getElementById("networkCanvas");
networkCanvas.width = 450;

const carCtx = carCanvas.getContext("2d");
const networkCtx = networkCanvas.getContext("2d");
const road = new Road(carCanvas.width / 2, carCanvas.width, 5);
const car = new Car(road.getLaneCenter(3), window.innerHeight / 2, {
  type: "AI",
  color: "blue",
});

const traffic = [
  new Car(road.getLaneCenter(3), window.innerHeight / 5, {
    maxSpeed: 3,
  }),
  new Car(road.getLaneCenter(1), window.innerHeight / 3, {
    maxSpeed: 4,
  }),
  new Car(road.getLaneCenter(4), window.innerHeight / 8, {
    maxSpeed: 2.5,
  }),
];

animate();

function animate() {
  carCanvas.height = window.innerHeight;
  networkCanvas.height = window.innerHeight;

  for (let i = 0; i < traffic.length; i++) {
    traffic[i].update(road.borders, []);
  }

  car.update(road.borders, traffic);

  carCtx.save();
  carCtx.translate(0, -car.y + carCanvas.height * 0.7);
  road.draw(carCtx);

  for (let i = 0; i < traffic.length; i++) {
    traffic[i].draw(carCtx);
  }
  car.draw(carCtx);
  carCtx.restore();

  Visualizer.drawNetwork(networkCtx, car.brain);

  requestAnimationFrame(animate);
}
