export default class Single {
  constructor(type = "random", map) {
    this.type = type;
    this.map = map;
    this.pos = {
      x: 10,
      y: 10,
    };

    this.props = {
      vel: 10,
    };
  }

  move() {
    this.pos.x += this.props.vel / 100;
    this.pos.y += this.props.vel / 100;

    this.print();
  }

  print() {
    this.map.ctx.beginPath();
    this.map.ctx.fillStyle = "rgb(255,255,255)";
    this.map.ctx.fillRect(this.pos.x, this.pos.y, 10, 10);
    this.map.ctx.closePath();
  }
}
