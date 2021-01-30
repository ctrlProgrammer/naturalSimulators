import { Point } from "../types";

export interface Organism {
  life: number;
  energy: number;
  pos: Point;

  print: () => void;
  move: () => void;
  destroy: () => void;
  die: () => void;
  born: () => void;
}
