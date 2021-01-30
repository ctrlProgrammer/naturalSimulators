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
    private _config: MapConfig
  ) {
    this._canvas.height = this._config.size.height;
    this._canvas.width = this._config.size.width;
    this._canvas.style.background = this._config.background.rgb;
    this._config.container.appendChild(this._canvas);
  }

  public printGrid() {
    let widthRange = this._config.size.width / this._config.pixelSize;
    let heightRange = this._config.size.height / this._config.pixelSize;

    for (let i = 0; i < widthRange; i++) {
      this._printer.printLine(
        { x: i * this._config.pixelSize, y: 0 },
        { x: i * this._config.pixelSize, y: this._config.size.height },
        Color.GREY
      );
    }

    for (let i = 0; i < heightRange; i++) {
      this._printer.printLine(
        { x: 0, y: i * this._config.pixelSize },
        { x: this._config.size.width, y: i * this._config.pixelSize },
        Color.GREY
      );
    }
  }
}
