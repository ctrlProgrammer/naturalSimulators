import { OrganimsType, OrganismsConfig } from ".";
import { Printer } from "../basis/printer";
import { MapConfig } from "../map";
import { Point } from "../types";
import { Organism } from "./organism";

export class People implements Organism {
  type: OrganimsType.PEOPLE;
  life: number;
  energy: number;

  constructor(
    public printer: Printer,
    public config: OrganismsConfig,
    public mapConfig: MapConfig,
    public haveChildren: (parent: OrganimsType, pos?: Point) => void,
    public pos?: Point,
    public maxLife?: number,
    public maxEnergy?: number
  ) {
    this.life = !!this.maxLife ? this.maxLife : 100;
    this.energy = !!this.maxEnergy ? this.maxEnergy : 100;
  }

  move() {}
  destroy() {}
  die() {}
  print() {}
  born() {}
}
