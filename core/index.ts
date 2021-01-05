import { Map } from "./map/class";
import { MapConfig } from "./map/types";
import { Color } from "./types";

interface OrganismsConfig {
  init: number;
}

interface SimulatorConfig {
  map: MapConfig;
}

class Organisms {}

class Simulator {
  private _map: Map;

  constructor(config: SimulatorConfig) {
    this._map = new Map(config.map);
  }
}

let config: SimulatorConfig = {
  map: {
    background: Color.BLACK,
    pixelSize: 5,
    size: 200,
    container: document.getElementById("simulator"),
  },
};

let simulator = new Simulator(config);
