import { OrganimsType, OrganismsConfig } from ".";
import Color from "../basis/color";
import { Printer } from "../basis/printer";
import { Map, MapConfig } from "../map";
import { Point, Size } from "../types";
import { Organism } from "./organism";

export class People implements Organism {
  type: OrganimsType.PEOPLE;
  life: number;
  energy: number;
  size: Size;

  constructor(
    public printer: Printer,
    public config: OrganismsConfig,
    public map: Map,
    public haveChildren: (parent: OrganimsType, pos?: Point) => void,
    public pos?: Point,
    public maxLife?: number,
    public maxEnergy?: number
  ) {
    this.life = !!this.maxLife ? this.maxLife : 100;
    this.energy = !!this.maxEnergy ? this.maxEnergy : 100;
    this.size = { height: 20, width: 20 };

    this.move();
  }

  move() {
    setInterval(() => {
      this.pos.x = this.map.randomPos().x;
      this.pos.y = this.map.randomPos().y;
    }, 1000 / 60);
  }
  destroy() {}
  die() {}
  print() {
    this.printer.printRect(
      { x: this.pos.x, y: this.pos.y },
      { x: this.pos.x + this.size.width, y: this.pos.y + this.size.height },
      Color.WHITE
    );
  }
  born() {}
}
