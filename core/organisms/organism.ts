import { OrganimsType, OrganismsConfig } from ".";
import { Printer } from "../basis/printer";
import { Map } from "../map";
import { Point, Size } from "../types";

export type HaveChildrenFunction = (parent: OrganimsType, pos?: Point) => void;

export abstract class Organism {
  type: OrganimsType;
  life: number;
  energy: number;
  size: Size;

  constructor(
    public printer: Printer,
    public map: Map,
    public config: OrganismsConfig,
    public haveChildren: HaveChildrenFunction,
    public pos?: Point,
    public maxLife?: number,
    public maxEnergy?: number
  ) {}

  ///////////////////////////////
  /* #region  Init */
  ///////////////////////////////

  protected _setMaxLife() {
    this.life = !!this.maxLife ? this.maxLife : 100;
  }

  protected _setMaxEnergy() {
    this.energy = !!this.maxEnergy ? this.maxEnergy : 100;
  }

  protected _setNormalSize() {
    this.size = {
      height: this.map.config.pixelSize,
      width: this.map.config.pixelSize,
    };
  }

  ///////////////////////////////
  /* #endregion */
  ///////////////////////////////

  abstract print(): void;
  abstract move(): void;
  abstract destroy(): void;
  abstract die(): void;
  abstract born(): void;
}
