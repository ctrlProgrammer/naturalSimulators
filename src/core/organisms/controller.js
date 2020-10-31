import Single from "./single.js";

export default class Organisms {
  constructor(config, map) {
    this.map = map;
    this.config = { ...config, init: config.init ? config.init : 10 };

    this.all = [];

    this.init();
  }

  init() {
    for (var i = 0; i < this.config.init; i++) {
      this.create();
    }
  }

  create(type = "random") {
    if (type === "random") {
      this.all.push(new Single("random", this.map));
    } else {
    }
  }

  print() {
    this.all.forEach((org) => {
      org.move();
    });
  }
}
