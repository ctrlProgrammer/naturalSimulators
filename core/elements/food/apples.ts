import Color from "../../basis/color";
import { Printer } from "../../basis/printer";
import { Map } from "../../map";
import { Point } from "../../types";
import { ElementsControllerConfig } from "../controller";
import { Food } from "./food";

export class Apple extends Food {
  constructor(
    printer: Printer,
    map: Map,
    config: ElementsControllerConfig,
    pos: Point
  ) {
    super(printer, map, config, pos);

    this._setNormalSize();
  }

  ///////////////////////////////
  /* #region Getters  */
  ///////////////////////////////

  ///////////////////////////////
  /* #endregion */
  ///////////////////////////////

  ///////////////////////////////
  /* #region Print  */
  ///////////////////////////////

  ///////////////////////////////
  /* #endregion */
  ///////////////////////////////

  ///////////////////////////////
  /* #region Basis  */
  ///////////////////////////////

  destroy() {}

  print() {
    this.printer.printRect(
      { x: this.pos.x, y: this.pos.y },
      { x: this.pos.x + this.size.width, y: this.pos.y + this.size.height },
      Color.RED
    );
  }

  ///////////////////////////////
  /* #endregion */
  ///////////////////////////////
}
