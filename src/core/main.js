import Map from "./map.js";
import Controller from "./controller.js";

class Simulator {
  constructor() {
    this.mode = "pro";

    this.config = {
      map: {
        background: "rgb(0,0,0)",
        pixelSize: 5,
        size: 10 * 70,
        mode: this.mode,
      },
      organisms: {
        person: 5,
        mode: this.mode,
      },
      food: {
        apple: 2,
        mode: this.mode,
        interval: 300,
      },
    };

    this.container = document.getElementById("ct-sim-container");

    this.map = new Map(this.config.map, this.container);

    this.controller = new Controller(
      { organisms: this.config.organisms, food: this.config.food },
      this.map
    );

    this.start();
  }

  start() {
    this.simInterval = setInterval(() => {
      this.map.background();
      this.controller.print();
    }, 1000 / 60);
  }
}

new Simulator();
