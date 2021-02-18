export default class Color {
  static BLACK = new Color(0, 0, 0);
  static WHITE = new Color(255, 255, 255);
  static GREY = new Color(50, 50, 50);
  static BLUE = new Color(0, 0, 255);
  static RED = new Color(255, 0, 0);
  static TRANSPARENT_BLUE = new Color(0, 0, 255, 0.3);

  constructor(
    private _r: number,
    private _g: number,
    private _b: number,
    private _a?: number
  ) {}

  get rgb() {
    if (this._a) {
      return (
        "rgb(" + this._r + "," + this._g + "," + this._b + "," + this._a + ")"
      );
    } else {
      return "rgb(" + this._r + "," + this._g + "," + this._b + ")";
    }
  }
}
