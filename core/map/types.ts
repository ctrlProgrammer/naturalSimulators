import Color from "../basis/color";
import { Size } from "../types";

export interface MapConfig {
  background: Color;
  pixelSize: number;
  size: Size;
  container: HTMLElement;
}
