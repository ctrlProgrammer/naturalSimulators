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
    for (var i = 0; i < this.all.length; i++) {
      if (this.all[i] instanceof Person) {
        if (this.all[i].props.life > 0) {
          if (this.all[i].status.child.pos) {
            this.createPerson("static", this.all[i].status.child.pos);
            this.all[i].status.child.pos = null;
          }

          this.all[i].move(this.all.filter((org) => org instanceof Apple));
        } else {
          clearInterval(this.all[i].evolutionInterval);
          this.all.splice(i, 1);
        }
      }

      if (this.all[i] instanceof Apple) {
        if (!this.all[i].ate) this.all[i].print(this.map.ctx);
        else this.all.splice(i, 1);
      }
    }
  }
}
