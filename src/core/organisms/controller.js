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
    this.all.push(new Single(type, this.map));
  }

  print() {
    this.all.forEach((org, index) => {
      if (org.props.life > 0) org.move();
      else this.all.splice(index, 1);
    });
  }
}
