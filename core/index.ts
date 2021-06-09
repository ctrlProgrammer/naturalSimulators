import Color from "./basis/color";
import { Printer } from "./basis/printer";
import { FPS } from "./constants";
import { Map, MapConfig } from "./map";
import { ElementsController, ElementsControllerConfig } from "./elements/controller";

interface SimulatorConfig {
  map: MapConfig;
  elementsController: ElementsControllerConfig;
}

class Simulator {
  private _map: Map;
  private _organisms: ElementsController;
  private _printer: Printer;
  private _canvas: HTMLCanvasElement;
  private _ctx: CanvasRenderingContext2D;

  constructor(private _config: SimulatorConfig) {
    this._canvas = document.createElement("canvas");
    this._ctx = this._canvas.getContext("2d");

    this._printer = new Printer(this._ctx);
    this._map = new Map(this._canvas, this._printer, this._config.map);

    this._organisms = new ElementsController(
      this._printer,
      this._map,
      this._config.elementsController
    );

    this.init();
  }

  private init() {
    this._organisms.init();

    setInterval(() => {
      this._map.printBackground();
      this._map.printGrid();
      this._organisms.print();
    }, 1000 / FPS);
  }
}

let config: SimulatorConfig = {
  map: {
    background: Color.BLACK,
    pixelSize: 5,
    size: { height: 600, width: 500 },
    container: document.getElementById("simulator"),
  },
  elementsController: {
    init: 5,
  },
};

new Simulator(config);
