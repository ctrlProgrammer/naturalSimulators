import { ElementType, ElementsControllerConfig } from "../controller";
import Color from "../../basis/color";
import { RandomHelpers } from "../../basis/helpers";
import { Printer } from "../../basis/printer";
import { Map } from "../../map";
import { Point, Size } from "../../types";
import { HaveChildrenFunction, Organism } from "./organism";

export enum EatState {
  SEARCHING_FOOD = "SEARCHING_FOOD",
  EATING = "EATING",
}

export enum MovementState {
  TO_NEXT_POS = "TO_NEXT_POS",
  IN_NEXT_POS = "IN_NEXT_POS",
}

export type Decrement = {
  life: number;
  energy: number;
};

export class People extends Organism {
  type: ElementType.PEOPLE;
  life: number;
  energy: number;
  size: Size;

  private _movementState: MovementState = MovementState.IN_NEXT_POS;
  private _eatState: EatState = EatState.SEARCHING_FOOD;

  private _nextPos: Point = { x: 0, y: 0 };
  private _vel: Point = { x: 1, y: 1 };
  private _decrement: Decrement = { life: 1, energy: 1 };

  private _lifeInterval: number;
  private _years: number = 0;
  private _confortArea: number = 100;
  private _visualCamp: number = 50;
  private _extrovertProbability: number = 0.1;

  constructor(
    printer: Printer,
    map: Map,
    config: ElementsControllerConfig,
    haveChildren: HaveChildrenFunction,
    pos?: Point,
    maxLife?: number,
    maxEnergy?: number
  ) {
    super(printer, map, config, haveChildren, pos, maxLife, maxEnergy);

    this._setMaxLife();
    this._setMaxEnergy();
    this._setNormalSize();
    this._calcNextPos();
  }

  ///////////////////////////////
  /* #region  Getters */
  ///////////////////////////////

  private get _centeredPos(): Point {
    return {
      x: this.pos.x + this.size.width / 2,
      y: this.pos.y + this.size.height / 2,
    };
  }

  private get _centeredNextPos(): Point {
    return {
      x: this._nextPos.x + this.size.width / 2,
      y: this._nextPos.y + this.size.height / 2,
    };
  }

  ///////////////////////////////
  /* #endregion */
  ///////////////////////////////

  ///////////////////////////////
  /* #region  Movement */
  ///////////////////////////////

  move() {
    if (this.pos.x === this._nextPos.x && this.pos.y === this._nextPos.y) {
      this._movementState = MovementState.IN_NEXT_POS;
      this._calcNextPos();
    } else {
      this.pos.x =
        this.pos.x !== this._nextPos.x
          ? this.pos.x < this._nextPos.x
            ? this.pos.x + this._vel.x
            : this.pos.x - this._vel.y
          : this.pos.x;

      this.pos.y =
        this.pos.y !== this._nextPos.y
          ? this.pos.y < this._nextPos.y
            ? this.pos.y + this._vel.y
            : this.pos.y - this._vel.y
          : this.pos.y;
    }
  }

  ///////////////////////////////
  /* #endregion */
  ///////////////////////////////

  ///////////////////////////////
  /* #region  Calculate */
  ///////////////////////////////

  private _calcNextPos() {
    if (Math.random() < this._extrovertProbability) {
      this._nextPos = this.map.randomPos(this.size.width);
    } else {
      this._nextPos = this._calcRandomPosInConfortArea();
    }

    this._movementState = MovementState.TO_NEXT_POS;
  }

  private _calcRandomPosInConfortArea() {
    const randomPointInConfortArea = RandomHelpers.circleFloorRandom(
      this.pos,
      this._confortArea
    );

    return {
      x:
        randomPointInConfortArea.x < 0
          ? 0
          : randomPointInConfortArea.x > this.map.config.size.width
          ? this.map.config.size.width
          : randomPointInConfortArea.x,
      y:
        randomPointInConfortArea.y < 0
          ? 0
          : randomPointInConfortArea.y > this.map.config.size.height
          ? this.map.config.size.height
          : randomPointInConfortArea.y,
    };
  }

  ///////////////////////////////
  /* #endregion */
  ///////////////////////////////

  ///////////////////////////////
  /* #region Print */
  ///////////////////////////////

  private _printNextPos() {
    this.printer.printRect(
      { x: this._nextPos.x, y: this._nextPos.y },
      {
        x: this._nextPos.x + this.size.width,
        y: this._nextPos.y + this.size.height,
      },
      Color.BLUE
    );
  }

  private _printLineToNextPos() {
    this.printer.printLine(
      this._centeredPos,
      this._centeredNextPos,
      Color.BLUE
    );
  }

  private _printOrganism() {
    this.printer.printRect(
      { x: this.pos.x, y: this.pos.y },
      { x: this.pos.x + this.size.width, y: this.pos.y + this.size.height },
      Color.WHITE
    );
  }

  private _printConfortArea() {
    this.printer.printCircle(
      this._centeredPos,
      this._confortArea,
      null,
      Color.TRANSPARENT_BLUE
    );
  }

  private _printVisualCamp() {
    this.printer.printCircle(
      this._centeredPos,
      this._visualCamp,
      null,
      Color.TRANSPARENT_GREEN
    );
  }

  ///////////////////////////////
  /* #endregion */
  ///////////////////////////////

  ///////////////////////////////
  /* #region Collisions */
  ///////////////////////////////

  public withApples() {}

  public withOtherPeople() {}

  ///////////////////////////////
  /* #endregion */
  ///////////////////////////////

  ///////////////////////////////
  /* #region  Organisms basis */
  ///////////////////////////////

  destroy() {}

  die() {}

  print() {
    this._printOrganism();
    this._printNextPos();
    this._printLineToNextPos();
    this._printConfortArea();
    this._printVisualCamp();

    this.move();
  }

  born() {}

  ///////////////////////////////
  /* #endregion */
  ///////////////////////////////
}
