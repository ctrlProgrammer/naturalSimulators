import { OrganimsType, OrganismsConfig } from ".";
import { Printer } from "../basis/printer";
import { MapConfig } from "../map";
import { Point } from "../types";

export interface Organism {
  type: OrganimsType;
  printer: Printer;
  config: OrganismsConfig;
  mapConfig: MapConfig;
  life: number;
  energy: number;
  pos?: Point;
  maxLife?: number;
  maxEnergy?: number;

  print: () => void;
  move: () => void;
  destroy: () => void;
  die: () => void;
  born: () => void;
}
