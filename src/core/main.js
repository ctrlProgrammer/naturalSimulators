import Performance from "./performance/controller.js";

import Map from "./map.js";
import Controller from "./controller.js";

class Simulator {
  constructor() {
    this.mode = "dev";

    this.config = {
      map: {
        background: "rgb(0,0,0)",
        pixelSize: 5,
        size: 10 * 70,
        mode: this.mode,
      },
      organisms: {
        person: 100,
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

    setInterval(() => {
      console.clear();
    }, 2000);

    this.start();
  }

  start() {
    this.simInterval = setInterval(() => {
      this.map.background();
      if (this.mode === "dev") Performance.test(this.controller.print, "print");
      else this.controller.print();
    }, 1000 / 60);
  }
}

new Simulator();
