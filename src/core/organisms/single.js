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
      size: this.map.config.pixelSize,
    };

    this.status = {
      searching: true,
    };

    this.mode = "dev";

    this.randomMove();
  }

  randomMove() {
    this.moveTo(
      Math.random() * (this.map.canvas.width - this.props.size),
      Math.random() * (this.map.canvas.height - this.props.size)
    );
  }

  movementFormula(pointOne, pointTwo){
    
  }

  moveTo(x, y) {
    this.to.y = y;
    this.to.x = x;
  }

  move() {
    if (
      this.pos.x <= this.to.x + this.props.err &&
      this.pos.x >= this.to.x - this.props.err &&
      this.pos.y <= this.to.y + this.props.err &&
      this.pos.y >= this.to.y - this.props.err
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
    this.map.ctx.fillRect(
      this.pos.x,
      this.pos.y,
      this.props.size,
      this.props.size
    );
    this.map.ctx.closePath();

    if (this.mode === "dev") {
      this.map.ctx.beginPath();
      this.map.ctx.fillStyle = "rgb(0,0,255)";
      this.map.ctx.fillRect(
        this.to.x,
        this.to.y,
        this.props.size / 2,
        this.props.size / 2
      );
      this.map.ctx.closePath();

      this.map.ctx.beginPath();
      this.map.ctx.strokeStyle = "rgb(255,0,0)";
      this.map.ctx.moveTo(
        this.pos.x + this.props.size / 2,
        this.pos.y + this.props.size / 2
      );
      this.map.ctx.lineTo(
        this.to.x + this.props.size / 4,
        this.to.y + this.props.size / 4
      );
      this.map.ctx.stroke();
      this.map.ctx.closePath();
    }
  }
}
