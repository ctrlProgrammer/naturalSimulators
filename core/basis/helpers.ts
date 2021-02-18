import { Point } from "../types";

export class MathHelpers {
  static gradesToRadians(grades: number) {
    return (grades * Math.PI) / 180;
  }

  static radiansToGrades(radians: number) {
    return (radians * 180) / Math.PI;
  }
}

export class RandomHelpers {
  static circleRandom(center: Point, radius: number): Point {
    const randomGrade = RandomHelpers.linearRandom(0, 360);
    const hipotenuse = RandomHelpers.linearRandom(0, radius);

    return {
      x:
        Math.sin(MathHelpers.gradesToRadians(randomGrade)) * hipotenuse +
        center.x,
      y:
        Math.cos(MathHelpers.gradesToRadians(randomGrade)) * hipotenuse +
        center.y,
    };
  }

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
