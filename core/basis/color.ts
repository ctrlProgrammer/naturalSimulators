export default class Color {
  static BLACK = new Color(0, 0, 0);
  static WHITE = new Color(255, 255, 255);

  constructor(private _r: number, private _g: number, private _b: number) {}

  get rgb() {
    return "rgb(" + this._r + "," + this._g + "," + this._b + ")";
  }
}
