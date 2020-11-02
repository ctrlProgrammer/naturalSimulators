import Person from "./organisms/person.js";
import Apple from "./food/apple.js";

export default class Controller {
  constructor(config, map) {
    this.map = map;
    this.config = { ...config, person: config.person ? config.person : 10 };

    this.people = [];
    this.food = [];

    this.print = this.print.bind(this);

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
      this.people.push(new Person(type, this.map, this.config.organisms));
    } else {
      this.people.push(new Person(type, this.map, this.config.organisms, pos));
    }
  }

  createApple(pos, size) {
    this.food.push(new Apple(pos, size));
  }

  appleCreator() {
    this.appleInterval = setInterval(() => {
      this.createApple(this.map.getRandomPoint(), this.map.config.pixelSize);
    }, this.config.food.interval);
  }

  print() {
    //! Two For bucle
    // For method 0.73 / 500 ops
    // For method 0.37 / 500 ops
    // For method 0.72 / 500 ops
    // For method 0.57 / 500 ops

    for (var j = 0; j < this.food.length; j++) {
      if (!this.food[j].ate) this.food[j].print(this.map.ctx);
      else this.food.splice(j, 1);
    }

    for (var i = 0; i < this.people.length; i++) {
      if (this.people[i].props.life > 0) {
        if (this.people[i].status.child.pos) {
          this.createPerson("static", this.people[i].status.child.pos);
          this.people[i].status.child.pos = null;
        }
        this.people[i].move(this.food);
      } else {
        clearInterval(this.people[i].evolutionInterval);
        this.people.splice(i, 1);
      }
    }
  }
}
