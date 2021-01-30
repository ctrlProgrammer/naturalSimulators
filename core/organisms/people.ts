import { OrganimsType, OrganismsConfig } from ".";
import Color from "../basis/color";
import { Printer } from "../basis/printer";
import { Map, MapConfig } from "../map";
import { Point, Size } from "../types";
import { Organism } from "./organism";

export enum EatState {
  SEARCHING_FOOD = "SEARCHING_FOOD",
  EATING = "EATING",
}

export enum MovementState {
  TO_NEXT_POS = "TO_NEXT_POS",
  IN_NEXT_POS = "IN_NEXT_POS",
}

export class People implements Organism {
  type: OrganimsType.PEOPLE;
  life: number;
  energy: number;
  size: Size;

  private _movementState: MovementState = MovementState.IN_NEXT_POS;
  private _eatState: EatState = EatState.SEARCHING_FOOD;
  private _nextPos: Point = { x: 0, y: 0 };
  private _vel: Point = { x: 1, y: 1 };

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

    this.size = {
      height: this.map.config.pixelSize,
      width: this.map.config.pixelSize,
    };

    this.move();
  }

  move() {
    if (this.pos.x === this._nextPos.x && this.pos.y === this._nextPos.y) {
      this._movementState = MovementState.IN_NEXT_POS;
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

    this._calcNextPos();
  }

  private _calcNextPos() {
    if (this._movementState === MovementState.IN_NEXT_POS) {
      this._nextPos = this.map.randomPos(this.size.width);
      this._movementState = MovementState.TO_NEXT_POS;
    }
  }

  destroy() {}

  die() {}

  print() {
    this.move();

    this.printer.printRect(
      { x: this.pos.x, y: this.pos.y },
      { x: this.pos.x + this.size.width, y: this.pos.y + this.size.height },
      Color.WHITE
    );
  }

  born() {}
}
