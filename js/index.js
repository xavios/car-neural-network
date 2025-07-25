const carCanvas = document.getElementById("carCanvas");
carCanvas.width = 320;

const networkCanvas = document.getElementById("networkCanvas");
networkCanvas.width = 450;

const carCtx = carCanvas.getContext("2d");
const networkCtx = networkCanvas.getContext("2d");
const road = new Road(carCanvas.width / 2, carCanvas.width, 5);
const cars = generateCars(200);

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

function generateCars(N) {
  const cars = [];
  for (let i = 0; i < N; i++) {
    cars.push(
      new Car(road.getLaneCenter(3), window.innerHeight / 2, {
        type: "AI",
        color: "blue",
      })
    );
  }
  return cars;
}

function animate() {
  carCanvas.height = window.innerHeight;
  networkCanvas.height = window.innerHeight;

  const bestCar =
    cars.find((c) => c.y == Math.min(...cars.map((c) => c.y))) ?? cars[0];

  for (let i = 0; i < traffic.length; i++) {
    traffic[i].update(road.borders, []);
  }

  for (let i = 0; i < cars.length; i++) {
    cars[i].update(road.borders, traffic);
  }

  carCtx.save();
  carCtx.translate(0, -bestCar.y + carCanvas.height * 0.7);
  road.draw(carCtx);

  for (let i = 0; i < traffic.length; i++) {
    traffic[i].draw(carCtx);
  }

  carCtx.globalAlpha = 0.2;
  for (let i = 0; i < cars.length; i++) {
    cars[i].draw(carCtx, false);
  }
  carCtx.globalAlpha = 1;
  bestCar.draw(carCtx, true);

  carCtx.restore();

  Visualizer.drawNetwork(networkCtx, bestCar.brain);

  requestAnimationFrame(animate);
}
