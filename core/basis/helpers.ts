import { Point } from "../types";

export class RandomHelpers {
  static circleRandom(center: Point, radius: number) {}

  static pointFloorRandom(min: Point, max: Point): Point {
    return {
      x: RandomHelpers.linearFloorRandom(min.x, max.x),
      y: RandomHelpers.linearFloorRandom(min.y, max.y),
    };
  }

  static pointRandom(min: Point, max: Point): Point {
    return {
      x: RandomHelpers.linearRandom(min.x, max.x),
      y: RandomHelpers.linearRandom(min.y, max.y),
    };
  }

  static linearFloorRandom(min: number, max: number): number {
    return Math.floor(RandomHelpers.linearRandom(min, max));
  }

  static linearRandom(min: number, max: number): number {
    return Math.random() * (max - min) + min;
  }
}
