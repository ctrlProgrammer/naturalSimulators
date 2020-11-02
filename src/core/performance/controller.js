export default class Performance {
  constructor(label) {
    this.all = [];
    this.label = label;
  }

  calcAverage() {
    var sum = 0;
    for (var i = 0; i < this.all.length; i++) sum += this.all[i];
    console.warn(this.label + " performance average " + sum / this.all.length);
  }

  test(callback) {
    var start = new Date();
    var end = null;

    callback();

    end = new Date();

    if (this.all.length > 2000) {
      this.calcAverage();
      this.all = [];
    }

    this.all.push(end.getTime() - start.getTime());
  }
}
