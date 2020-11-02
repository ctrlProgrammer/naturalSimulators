export default class Apple {
  constructor(pos, size) {
    this.pos = pos;
    this.size = size;
    this.ate = false;
  }

  print(ctx) {
    ctx.beginPath();
    ctx.fillStyle = "rgb(255, 0, 0)";
    ctx.fillRect(this.pos[0], this.pos[1], this.size, this.size);
    ctx.closePath();
  }
}
