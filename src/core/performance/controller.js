export default class Performance {
  static test(callback, label) {
    var start = new Date();
    var end = null;

    callback();

    end = new Date();

    console.warn(
      label + " performance: " + (end.getTime() - start.getTime()) + "ms"
    );
  }
}
