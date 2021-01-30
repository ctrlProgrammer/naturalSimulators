import { Printer } from "../basis/printer";
import { Map, MapConfig } from "../map";
import { Point } from "../types";
import { Organism } from "./organism";
import { People } from "./people";

export interface OrganismsConfig {
  init: number;
}

export enum OrganimsType {
  PEOPLE = "PEOPLE",
}

export class Organisms {
  private _people: People[] = [];

  constructor(
    private _printer: Printer,
    private _map: Map,
    private _config: OrganismsConfig
  ) {}

  public init() {
    for (let i = 0; i < this._config.init; i++) {
      this._people.push(
        new People(
          this._printer,
          this._config,
          this._map.config,
          this._haveChildren
        )
      );
    }
  }

  private _haveChildren(parent: OrganimsType, pos?: Point) {
    console.log(parent);
  }

  public print() {}
}
