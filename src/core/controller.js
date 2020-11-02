import Person from "./organisms/person.js";
import Apple from "./food/apple.js";

export default class Controller {
  constructor(config, map) {
    this.map = map;
    this.config = { ...config, person: config.person ? config.person : 10 };

    this.all = [];

    this.init();
  }

  init() {
    for (var i = 0; i < this.config.organisms.person; i++) {
      this.createPerson("random");
    }

    for (var j = 0; j < this.config.food.apple; j++) {
      this.createApple(this.map.getRandomPoint(), this.map.config.pixelSize);
    }

    this.appleCreator();
  }

  createPerson(type = "random", pos) {
    if (type === "random") {
      this.all.push(new Person(type, this.map, this.config.organisms));
    } else {
      this.all.push(new Person(type, this.map, this.config.organisms, pos));
    }
  }

  createApple(pos, size) {
    this.all.push(new Apple(pos, size));
  }

  appleCreator() {
    this.appleInterval = setInterval(() => {
      this.createApple(this.map.getRandomPoint(), this.map.config.pixelSize);
    }, this.config.food.interval);
  }

  print() {
    this.all.forEach((org, index) => {
      if (org instanceof Person) {
        if (org.props.life > 0) {
          if (org.status.child.pos) {
            this.createPerson("static", org.status.child.pos);
            org.status.child.pos = null;
          }

          org.move(this.all.filter((org) => org instanceof Apple));
        } else this.all.splice(index, 1);
      }

      if (org instanceof Apple) {
        if (!org.ate) org.print(this.map.ctx);
        else this.all.splice(index, 1);
      }
    });
  }
}
