import { Printer } from "../basis/printer";
import { Map, MapConfig } from "../map";
import { Point } from "../types";
import { Organism } from "./organims/organism";
import { People } from "./organims/people";

export interface ElementsControllerConfig {
  init: number;
}

export enum ElementType {
  PEOPLE = "PEOPLE",
}

export class ElementsController {
  private _people: People[] = [];

  constructor(
    private _printer: Printer,
    private _map: Map,
    private _config: ElementsControllerConfig
  ) {}

  public init() {
    for (let i = 0; i < this._config.init; i++) {
      this._createOrganism(ElementType.PEOPLE);
    }
  }

  private _createOrganism(type: ElementType, pos?: Point) {
    switch (type) {
      case ElementType.PEOPLE:
        this._people.push(
          new People(
            this._printer,
            this._map,
            this._config,
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
