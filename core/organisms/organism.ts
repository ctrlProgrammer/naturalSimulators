import { OrganimsType, OrganismsConfig } from ".";
import { Printer } from "../basis/printer";
import { Map, MapConfig } from "../map";
import { Point, Size } from "../types";

export interface Organism {
  type: OrganimsType;
  printer: Printer;
  config: OrganismsConfig;
  map: Map;
  life: number;
  energy: number;
  size: Size;
  pos?: Point;
  maxLife?: number;
  maxEnergy?: number;

  print: () => void;
  move: () => void;
  destroy: () => void;
  die: () => void;
  born: () => void;
}
