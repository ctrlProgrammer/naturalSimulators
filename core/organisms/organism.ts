import { OrganimsType, OrganismsConfig } from ".";
import { Printer } from "../basis/printer";
import { Map, MapConfig } from "../map";
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

  abstract print(): void;
  abstract move(): void;
  abstract destroy(): void;
  abstract die(): void;
  abstract born(): void;
}
