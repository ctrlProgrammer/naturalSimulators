import { MapConfig } from "../map";

export interface OrganismsConfig {
  init: number;
}

export class Organisms {
  constructor(
    private _mapConfig: MapConfig,
    private _config: OrganismsConfig
  ) {}
  public init() {}
}
