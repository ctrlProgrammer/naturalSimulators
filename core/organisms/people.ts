import { Point } from "../types";
import { Organism } from "./organism";

export class People implements Organism {
  life: number;
  energy: number;
  pos: Point;
  
  move() {}
  destroy() {}
  die() {}
  print() {}
  born() {}
}
