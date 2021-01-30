import Color from "./basis/color";
import { Printer } from "./basis/printer";
import { Map, MapConfig } from "./map";
import { Organisms, OrganismsConfig } from "./organisms";

interface SimulatorConfig {
  map: MapConfig;
  organisms: OrganismsConfig;
}

class Simulator {
  private _map: Map;
  private _organisms: Organisms;
  private _printer: Printer;
  private _canvas: HTMLCanvasElement;
  private _ctx: CanvasRenderingContext2D;

  constructor(private _config: SimulatorConfig) {
    this._canvas = document.createElement("canvas");
    this._ctx = this._canvas.getContext("2d");

    this._printer = new Printer(this._ctx);
    this._map = new Map(this._canvas, this._printer, this._config.map);

    this._organisms = new Organisms(
      this._printer,
      this._map,
      this._config.organisms
    );

    this.init();
  }

  private init() {
    this._map.printGrid();
    this._organisms.init();

    setInterval(() => {
      this._organisms.print();
    }, 1000 / 60);
  }
}

let config: SimulatorConfig = {
  map: {
    background: Color.BLACK,
    pixelSize: 5,
    size: { height: 600, width: 500 },
    container: document.getElementById("simulator"),
  },
  organisms: {
    init: 3,
  },
};

new Simulator(config);
