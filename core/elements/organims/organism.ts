import { ElementType, ElementsControllerConfig } from "../controller";
import { Printer } from "../../basis/printer";
import { Map } from "../../map";
import { Point, Size } from "../../types";

export type HaveChildrenFunction = (parent: ElementType, pos?: Point) => void;

export abstract class Organism {
  private _lifeInterval: number;

  public _years: number = 0;

  type: ElementType;
  life: number;
  energy: number;
  size: Size;

  constructor(
    public printer: Printer,
    public map: Map,
    public config: ElementsControllerConfig,
    public haveChildren: HaveChildrenFunction,
    public pos?: Point,
    public maxLife?: number,
    public maxEnergy?: number
  ) {
    this._createLifeInterval();
  }

  ///////////////////////////////
  /* #region  Init */
  ///////////////////////////////

  private _createLifeInterval() {
    this._lifeInterval = setInterval(() => this._years++, 1000);
  }

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

  protected validateStats() {
    if (this.life > 0) {
      if (this.energy > 0 && this.life < this.maxLife) this.life++;
      if (this.energy > 0) this.energy--;
      else this.life--;
    } else {
      this.die();
      this._destroy();
    }
  }

  protected eat(proteins: number) {
    //TODO Normalize to energy standar
    this.energy += proteins;
  }

  ///////////////////////////////
  /* #endregion */
  ///////////////////////////////

  abstract print(): void;
  abstract move(): void;
  abstract die(): void;
  abstract born(): void;

  private _destroy() {
    clearInterval(this._lifeInterval);
  }
}
