import Person from "./organisms/person.js";
import Apple from "./food/apple.js";

export default class Controller {
  constructor(config, map) {
    this.map = map;
    this.config = { ...config, person: config.person ? config.person : 10 };

    this.all = [];

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
    //! While bucle
    // While method  0.8710 / 2000 ops
    // While method  1.1169 / 2000 ops
    // var i = 0;
    // while (i < this.all.length) {
    //   if (this.all[i] instanceof Person) {
    //     if (this.all[i].props.life > 0) {
    //       if (this.all[i].status.child.pos) {
    //         this.createPerson("static", this.all[i].status.child.pos);
    //         this.all[i].status.child.pos = null;
    //       }
    //       this.all[i].move(this.all.filter((org) => org instanceof Apple));
    //     } else {
    //       clearInterval(this.all[i].evolutionInterval);
    //       this.all.splice(i, 1);
    //     }
    //   }
    //   if (this.all[i] instanceof Apple) {
    //     if (!this.all[i].ate) this.all[i].print(this.map.ctx);
    //     else this.all.splice(i, 1);
    //   }
    //   i++;
    // }
    //! For bucle
    // For method 1.0249 / 2000 ops
    // For method 1.1714 / 2000 ops
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
    //! ForEach bucle
    // For method 1.0759 / 2000 ops
    // For method 1.0359 / 2000 ops
    // this.all.forEach((item, i) => {
    //   if (item instanceof Person) {
    //     if (item.props.life > 0) {
    //       if (item.status.child.pos) {
    //         this.createPerson("static", item.status.child.pos);
    //         item.status.child.pos = null;
    //       }
    //       item.move(this.all.filter((org) => org instanceof Apple));
    //     } else {
    //       clearInterval(item.evolutionInterval);
    //       this.all.splice(i, 1);
    //     }
    //   }
    //   if (item instanceof Apple) {
    //     if (!item.ate) item.print(this.map.ctx);
    //     else this.all.splice(i, 1);
    //   }
    // });
  }
}
