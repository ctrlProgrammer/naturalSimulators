export default class Map {
  constructor(config, container) {
    this.container = container;

    this.config = {
      ...config,
      background: config.background ? config.background : "rgb(0,0,0)",
      pixelSize: config.pixelSize ? config.pixelSize : 10,
      size: config.size ? config.size : 10 * 20,
    };

    this.build();
  }

  build() {
    this.canvas = document.createElement("canvas");
    this.canvas.width = this.config.size;
    this.canvas.height = this.config.size;
    this.ctx = this.canvas.getContext("2d");
    this.container.appendChild(this.canvas);
  }

  background() {
    this.ctx.beginPath();
    this.ctx.fillStyle = this.config.background;
    this.ctx.fillRect(0, 0, this.config.size, this.config.size);
    this.ctx.closePath();
  }

  getRandomPoint() {
    return [
      Math.random() * this.canvas.width,
      Math.random() * this.canvas.height,
    ];
  }

  clear() {
    this.container.removeChild(this.canvas);
  }
}
