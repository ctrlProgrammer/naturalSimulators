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
}
