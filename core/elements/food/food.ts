import { ElementType, ElementsControllerConfig } from "../controller";
import { Printer } from "../../basis/printer";
import { Map } from "../../map";
import { Point, Size } from "../../types";

export abstract class Food {
  type: ElementType;
  size: Size;
  taken: boolean = false;

  constructor(
    public printer: Printer,
    public map: Map,
    public config: ElementsControllerConfig,
    public pos?: Point
  ) {}

  ///////////////////////////////
  /* #region  Init */
  ///////////////////////////////

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
  abstract destroy(): void;
}
