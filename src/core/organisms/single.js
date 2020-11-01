export default class Single {
  constructor(type = "random", map) {
    this.type = type;
    this.map = map;

    this.pos = [100, 100];
    this.to = [0, 0];
    this.vel = [1, 1];
    this.acc = [0, 0];

    this.props = {
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
    this.to[0] = Math.random() * (this.map.canvas.width - this.props.size);
    this.to[1] = Math.random() * (this.map.canvas.height - this.props.size);
  }

  move() {
    if (
      this.pos[0] < this.to[0] + this.props.err &&
      this.pos[0] > this.to[0] - this.props.err &&
      this.pos[1] < this.to[1] + this.props.err &&
      this.pos[1] > this.to[1] - this.props.err
    ) {
      this.randomMove();
    }

    if (
      !(
        this.pos[0] < this.to[0] + this.props.err &&
        this.pos[0] > this.to[0] - this.props.err
      )
    ) {
      if (this.pos[0] > this.to[0] && this.vel[0] > 0)
        this.vel[0] = -this.vel[0];
      if (this.pos[0] < this.to[0] && this.vel[0] < 0)
        this.vel[0] = -this.vel[0];

      this.pos[0] += this.vel[0];
    }

    if (
      !(
        this.pos[1] < this.to[1] + this.props.err &&
        this.pos[1] > this.to[1] - this.props.err
      )
    ) {
      if (this.pos[1] > this.to[1] && this.vel[1] > 0)
        this.vel[1] = -this.vel[1];
      if (this.pos[1] < this.to[1] && this.vel[1] < 0)
        this.vel[1] = -this.vel[1];

      this.pos[1] += this.vel[1];
    }

    this.print();
  }

  print() {
    if (this.mode === "dev") {
      this.map.ctx.beginPath();
      this.map.ctx.fillStyle = "rgb(0,0,255)";
      this.map.ctx.fillRect(
        this.to[0],
        this.to[1],
        this.props.size / 2,
        this.props.size / 2
      );
      this.map.ctx.closePath();

      this.map.ctx.beginPath();
      this.map.ctx.strokeStyle = "rgb(255,0,0)";
      this.map.ctx.moveTo(this.pos[0], this.pos[1]);
      this.map.ctx.lineTo(
        this.to[0] + this.props.size / 4,
        this.to[1] + this.props.size / 4
      );
      this.map.ctx.stroke();
      this.map.ctx.closePath();
    }

    this.map.ctx.beginPath();
    this.map.ctx.fillStyle = "rgb(255,255,255)";
    this.map.ctx.ellipse(
      this.pos[0],
      this.pos[1],
      this.props.size,
      this.props.size,
      Math.PI,
      0,
      2 * Math.PI
    );
    this.map.ctx.fill();
    this.map.ctx.closePath();
  }
}
