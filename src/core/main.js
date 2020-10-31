import Map from "./map.js";
import Organisms from "./organisms/controller.js";

class Simulator {
  constructor() {
    this.config = {
      map: {
        background: "rgb(0,0,0)",
        pixelSize: 10,
        size: 10 * 50,
      },
      organisms: {
        init: 10,
      },
    };

    this.container = document.getElementById("ct-sim-container");
    this.map = new Map(this.config.map, this.container);
    this.organisms = new Organisms(this.config.organisms, this.map);

    this.start();
  }

  start() {
    this.simInterval = setInterval(() => {
      this.map.background();
      this.organisms.print();
    }, 60 / 1000);
  }
}

new Simulator();
