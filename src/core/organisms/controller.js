export default class Organisms {
  constructor(config, ctx) {
    this.ctx = ctx;
    this.config = { ...config, init: config.init ? config.init : 10 };
  }
}
