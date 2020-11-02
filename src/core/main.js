import Map from "./map.js";
import Controller from "./controller.js";

class Simulator {
  constructor() {
    this.mode = "pro";

    this.config = {
      map: {
        background: "rgb(0,0,0)",
        pixelSize: 5,
        size: 10 * 50,
        mode: this.mode,
      },
      organisms: {
        person: 2,
        mode: this.mode,
      },
      food: {
        apple: 2,
        mode: this.mode,
      },
    };

    this.container = document.getElementById("ct-sim-container");

    this.map = new Map(this.config.map, this.container);
    this.controller = new Controller(this.config.organisms, this.map);

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
