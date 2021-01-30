import Color from "./basis/color";
import { Map, MapConfig } from "./map";
import { Organisms, OrganismsConfig } from "./organisms";

interface SimulatorConfig {
  map: MapConfig;
  organisms: OrganismsConfig;
}

class Simulator {
  private _map: Map;
  private _organisms: Organisms;

  constructor(config: SimulatorConfig) {
    this._map = new Map(config.map);
    this._organisms = new Organisms(config.map, config.organisms);

    this._build();
  }

  private _build() {
    this._map.build();
    this._organisms.init();
    this._map.printGrid();
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
