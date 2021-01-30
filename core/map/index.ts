import Color from "../basis/color";
import { Printer } from "../basis/printer";
import { Size } from "../types";

export interface MapConfig {
  background: Color;
  pixelSize: number;
  size: Size;
  container: HTMLElement;
}

export class Map {
  constructor(
    private _canvas: HTMLCanvasElement,
    private _printer: Printer,
    public config: MapConfig
  ) {
    this._canvas.height = this.config.size.height;
    this._canvas.width = this.config.size.width;
    this._canvas.style.background = this.config.background.rgb;
    this.config.container.appendChild(this._canvas);
  }

  public printGrid() {
    let widthRange = this.config.size.width / this.config.pixelSize;
    let heightRange = this.config.size.height / this.config.pixelSize;

    for (let i = 0; i < widthRange; i++) {
      this._printer.printLine(
        { x: i * this.config.pixelSize, y: 0 },
        { x: i * this.config.pixelSize, y: this.config.size.height },
        Color.GREY
      );
    }

    for (let i = 0; i < heightRange; i++) {
      this._printer.printLine(
        { x: 0, y: i * this.config.pixelSize },
        { x: this.config.size.width, y: i * this.config.pixelSize },
        Color.GREY
      );
    }
  }
}
