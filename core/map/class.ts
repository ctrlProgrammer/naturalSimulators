import Color from "../basis/color";
import { Point } from "../types";
import { MapConfig } from "./types";

export class Map {
  private _config: MapConfig;
  private _canvas: HTMLCanvasElement;
  public ctx: CanvasRenderingContext2D | null = null;

  constructor(config: MapConfig) {
    this._config = config;
  }

  public build() {
    this._canvas = document.createElement("canvas");
    this.ctx = this._canvas.getContext("2d");
    this._canvas.height = this._config.size.height;
    this._canvas.width = this._config.size.width;
    this._canvas.style.background = this._config.background.rgb;
    this._config.container.appendChild(this._canvas);
  }

  public printGrid() {
    let widthRange = this._config.size.width / this._config.pixelSize;
    let heightRange = this._config.size.height / this._config.pixelSize;

    for (let i = 0; i < widthRange; i++) {
      this.printLine(
        { x: i * this._config.pixelSize, y: 0 },
        { x: i * this._config.pixelSize, y: this._config.size.height },
        Color.GREY
      );
    }

    for (let i = 0; i < heightRange; i++) {
      this.printLine(
        { x: 0, y: i * this._config.pixelSize },
        { x: this._config.size.width, y: i * this._config.pixelSize },
        Color.GREY
      );
    }
  }

  public printLine(from: Point, to: Point, color: Color) {
    this.ctx.beginPath();
    this.ctx.strokeStyle = color.rgb;
    this.ctx.moveTo(from.x, from.y);
    this.ctx.lineTo(to.x, to.y);
    this.ctx.stroke();
    this.ctx.closePath();
  }
}
