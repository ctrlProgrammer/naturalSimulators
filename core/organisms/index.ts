import { Printer } from "../basis/printer";
import { MapConfig } from "../map";
import { Organism } from "./organism";

export interface OrganismsConfig {
  init: number;
}

export class Organisms {
  private _people: Organism;

  constructor(
    private _printer: Printer,
    private _mapConfig: MapConfig,
    private _config: OrganismsConfig
  ) {}

  public print() {}
}
