export default class Single {
  constructor(type = "random", map) {
    this.type = type;
    this.map = map;

    this.props = {
      err: 1,
      size: this.map.config.pixelSize,
      vision: 100,
    };

    this.pos = this.randomPoint();
    this.to = [0, 0];
    this.vel = [1, 1];
    this.acc = [0.1, 0.1];

    this.status = {
      searching: true,
    };

    this.mode = "dev";

    this.randomMove();
  }

  randomPoint() {
    return [
      Math.random() * (this.map.canvas.width - this.props.size),
      Math.random() * (this.map.canvas.height - this.props.size),
    ];
  }

  randomNearPoint() {
    return [
      Math.random() *
        (this.pos[0] + this.props.vision - (this.pos[0] - this.props.vision)) +
        (this.pos[0] - this.props.vision),
      Math.random() *
        (this.pos[1] + this.props.vision - (this.pos[1] - this.props.vision)) +
        (this.pos[1] - this.props.vision),
    ];
  }

  randomMove(type = "all") {
    var point = [0, 0];

    if (type === "all") point = this.randomPoint();
    else if (type === "near") point = this.randomNearPoint();

    this.to[0] =
      point[0] > this.map.canvas.width
        ? this.map.canvas.width
        : point[0] < 0
        ? 0
        : point[0];
    this.to[1] =
      point[1] > this.map.canvas.height
        ? this.map.canvas.height
        : point[1] < 0
        ? 0
        : point[1];
  }

  move() {
    if (
      this.pos[0] < this.to[0] + this.props.err &&
      this.pos[0] > this.to[0] - this.props.err &&
      this.pos[1] < this.to[1] + this.props.err &&
      this.pos[1] > this.to[1] - this.props.err
    ) {
      this.randomMove("near");
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
