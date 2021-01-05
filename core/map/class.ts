import { MapConfig } from "./types";

export class Map {
  private _config: MapConfig;

  constructor(config: MapConfig) {
    this._config = config;
  }
}
