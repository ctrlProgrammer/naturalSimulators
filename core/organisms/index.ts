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
      this._createOrganism(OrganimsType.PEOPLE);
    }
  }

  private _createOrganism(type: OrganimsType, pos?: Point) {
    switch (type) {
      case OrganimsType.PEOPLE:
        this._people.push(
          new People(
            this._printer,
            this._config,
            this._map,
            this._createOrganism,
            !!pos ? pos : this._map.randomPos()
          )
        );
        break;
    }
  }

  public print() {
    for (let i = 0; i < this._people.length; i++) {
      this._people[i].print();
    }
  }
}
