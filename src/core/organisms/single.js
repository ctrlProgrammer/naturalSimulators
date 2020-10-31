export default class Single {
  constructor(type = "random", map) {
    this.type = type;
    this.map = map;

    this.pos = {
      x: 10,
      y: 10,
    };

    this.to = {
      x: 0,
      y: 0,
    };

    this.props = {
      vel: 10,
      err: 10,
    };

    this.status = {
      searching: true,
    };

    this.randomMove();
  }

  randomMove() {
    this.moveTo(
      Math.random() * this.map.canvas.width,
      Math.random() * this.map.canvas.height
    );
  }

  moveTo(x, y) {
    this.to.y = y;
    this.to.x = x;
  }

  move() {
    if (
      (this.pos.x <= this.to.x + this.props.err &&
        this.pos.x >= this.to.x - this.props.err) &&
      (this.pos.y <= this.to.y + this.props.err &&
        this.pos.y >= this.to.y - this.props.err)
    ) {
      this.randomMove();
    }

    if (this.pos.x < this.to.x) this.pos.x += this.props.vel / 100;
    else this.pos.x -= this.props.vel / 100;

    if (this.pos.y < this.to.y) this.pos.y += this.props.vel / 100;
    else this.pos.y -= this.props.vel / 100;

    this.print();
  }

  print() {
    this.map.ctx.beginPath();
    this.map.ctx.fillStyle = "rgb(255,255,255)";
    this.map.ctx.fillRect(this.pos.x, this.pos.y, 10, 10);
    this.map.ctx.closePath();
  }
}
