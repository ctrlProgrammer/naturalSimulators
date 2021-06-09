import { Printer } from "../basis/printer";
import { Map } from "../map";
import { Point } from "../types";
import { Apple } from "./food/apples";
import { People } from "./organims/people";

export interface ElementsControllerConfig {
  init: number;
}

export enum ElementType {
  //Organisms
  PEOPLE = "PEOPLE",
  //Food
  APPLE = "APPLE",
}

export class ElementsController {
  private _people: People[] = [];
  private _apples: Apple[] = [];

  constructor(
    private _printer: Printer,
    private _map: Map,
    private _config: ElementsControllerConfig
  ) {}

  public init() {
    for (let i = 0; i < this._config.init; i++) {
      this._createOrganism(ElementType.PEOPLE);
      this._createOrganism(ElementType.APPLE);
    }

    this._map.createRandomGenerator(2000, (pos: Point) =>
      this._createOrganism(ElementType.APPLE, pos)
    );
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
      case ElementType.APPLE:
        this._apples.push(
          new Apple(this._printer, this._map, this._config, !!pos ? pos : this._map.randomPos())
        );
        break;
    }
  }

  public print() {
    for (let i = 0; i < this._people.length; i++) {
      if (this._people[i].life > 0) {
        this._people[i].withApples(this._apples);
        this._people[i].print();
      } else this._people.splice(i, 1);
    }

    for (let i = 0; i < this._apples.length; i++) {
      if (!this._apples[i].taken) this._apples[i].print();
      else this._apples.splice(i, 1);
    }
  }
}
