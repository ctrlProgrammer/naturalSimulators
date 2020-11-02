import Person from "./organisms/person.js";

export default class Controller {
  constructor(config, map) {
    this.map = map;
    this.config = { ...config, person: config.person ? config.person : 10 };

    this.all = [];

    this.init();
  }

  init() {
    for (var i = 0; i < this.config.person; i++) {
      this.createPerson();
    }
  }

  createPerson(type = "random") {
    this.all.push(
      new Person(
        type,
        this.map,
        this.config
      )
    );
  }

  print() {
    this.all.forEach((org, index) => {
      if (org.props.life > 0) org.move(this.map.ctx);
      else this.all.splice(index, 1);
    });
  }
}
