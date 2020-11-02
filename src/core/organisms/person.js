export default class Person {
  constructor(type = "random", map, config, pos = null) {
    this.type = type;
    this.config = config;
    this.map = map;

    this.props = {
      err: 1,
      size: this.map.config.pixelSize,
      vision: 40,
      energy: 100,
      life: 100,
      energyLost: 0.1,
      lifeLost: 0.1,
      maxEnergy: 100,
      maxLife: 100,
      age: 1,
    };

    this.pos = pos ? pos : this.map.getRandomPoint();

    this.to = [0, 0];
    this.vel = [1, 1];
    this.acc = [0.1, 0.1];

    this.status = {
      searching: true,
      child: { pos: null },
    };

    this.food = null;

    this.mode = this.config.mode ? this.config.mode : "dev";

    this.randomMove();
    this.startEvolution();
  }

  startEvolution() {
    this.evolutionInterval = setInterval(() => {
      //Die probability 0.01
      var probability = 0;

      if (this.props.age > 18 && this.props.age <= 100) {
        // P1(18,0) , P2(100,100) parabola
        //  (x - h)² = 4p(y - k)
        //  p = 25
        //  (x² - 36x + 324) / 100 = y
        probability =
          (this.props.age * this.props.age - 36 * this.props.age + 324) / 100;
      }

      if (Math.random() < probability) {
        this.props.life = 0;
        this.props.energy = 0;
      } else {
        this.props.age += 0.5;
      }
    }, 1000);
  }

  randomNearPoint() {
    return [
      Math.random() *
        (this.pos[0] + this.props.vision - (this.pos[0] - this.props.vision)) +
        (this.pos[0] - this.props.vision),
      Math.random() *
        (this.pos[1] + this.props.vision - (this.pos[1] - this.props.vision)) +
        (this.pos[1] - this.props.vision),
    ];
  }

  randomMove(type = "all") {
    var point = [0, 0];

    if (type === "all") point = this.map.getRandomPoint();
    else if (type === "near") point = this.randomNearPoint();

    this.moveTo(point);
  }

  moveTo(point) {
    this.to[0] =
      point[0] > this.map.canvas.width
        ? this.map.canvas.width
        : point[0] < 0
        ? 0
        : point[0];
    this.to[1] =
      point[1] > this.map.canvas.height
        ? this.map.canvas.height
        : point[1] < 0
        ? 0
        : point[1];
  }

  move(apples) {
    if (this.status.searching) {
      const nearApple = apples.findIndex(
        (apple) =>
          apple.pos[0] < this.pos[0] + this.props.vision &&
          apple.pos[0] > this.pos[0] - this.props.vision &&
          apple.pos[1] < this.pos[1] + this.props.vision &&
          apple.pos[1] > this.pos[1] - this.props.vision
      );

      if (nearApple !== -1) {
        this.moveTo(apples[nearApple].pos);
        this.status.searching = false;
        this.food = apples[nearApple];
      }
    }

    if (
      this.pos[0] < this.to[0] + this.props.err &&
      this.pos[0] > this.to[0] - this.props.err &&
      this.pos[1] < this.to[1] + this.props.err &&
      this.pos[1] > this.to[1] - this.props.err
    ) {
      if (!this.status.searching && this.food !== null) {
        if (!this.food.ate) {
          if (this.props.energy + this.food.proteins < this.props.maxEnergy) {
            this.props.energy += this.food.proteins;
          } else {
            this.props.energy = this.props.maxEnergy;

            if (this.props.age > 18) {
              this.status.child = { pos: this.randomNearPoint() };
            }
          }
        }

        this.food.ate = true;
        this.food = null;
        this.status.searching = true;
      }

      if (Math.random() > 0.9) this.randomMove();
      else this.randomMove("near");
    }

    if (
      !(
        this.pos[0] < this.to[0] + this.props.err &&
        this.pos[0] > this.to[0] - this.props.err
      )
    ) {
      if (this.pos[0] > this.to[0] && this.vel[0] > 0)
        this.vel[0] = -this.vel[0];
      if (this.pos[0] < this.to[0] && this.vel[0] < 0)
        this.vel[0] = -this.vel[0];

      this.pos[0] += this.vel[0];
    }

    if (
      !(
        this.pos[1] < this.to[1] + this.props.err &&
        this.pos[1] > this.to[1] - this.props.err
      )
    ) {
      if (this.pos[1] > this.to[1] && this.vel[1] > 0)
        this.vel[1] = -this.vel[1];
      if (this.pos[1] < this.to[1] && this.vel[1] < 0)
        this.vel[1] = -this.vel[1];

      this.pos[1] += this.vel[1];
    }

    if (this.props.energy > 0) {
      this.props.energy -= this.props.energyLost;
      if (this.props.life < this.props.maxLife) {
        this.props.life += this.props.lifeLost;
      }
    } else if (this.props.life > 0) this.props.life -= this.props.lifeLost;

    this.print();
  }

  printVision() {
    this.map.ctx.beginPath();
    this.map.ctx.fillStyle = "rgba(0,255,0, 0.2)";
    this.map.ctx.ellipse(
      this.pos[0],
      this.pos[1],
      this.props.vision,
      this.props.vision,
      Math.PI,
      0,
      2 * Math.PI
    );
    this.map.ctx.fill();
    this.map.ctx.closePath();
  }

  printMovementLine() {
    this.map.ctx.beginPath();
    this.map.ctx.strokeStyle = "rgb(255,0,0)";
    this.map.ctx.moveTo(this.pos[0], this.pos[1]);
    this.map.ctx.lineTo(
      this.to[0] + this.props.size / 4,
      this.to[1] + this.props.size / 4
    );
    this.map.ctx.stroke();
    this.map.ctx.closePath();
  }

  printToPoint() {
    this.map.ctx.beginPath();
    this.map.ctx.fillStyle = "rgb(0,0,255)";
    this.map.ctx.fillRect(
      this.to[0],
      this.to[1],
      this.props.size / 2,
      this.props.size / 2
    );
    this.map.ctx.closePath();
  }

  printOrg() {
    this.map.ctx.beginPath();
    this.map.ctx.fillStyle = "rgb(255,255,255)";
    this.map.ctx.ellipse(
      this.pos[0],
      this.pos[1],
      this.props.size,
      this.props.size,
      Math.PI,
      0,
      2 * Math.PI
    );
    this.map.ctx.fill();
    this.map.ctx.closePath();
  }

  printOrgProps() {
    this.map.ctx.beginPath();
    this.map.ctx.fillStyle = "rgb(255,0,0)";
    this.map.ctx.fillRect(
      this.pos[0] - this.props.size,
      this.pos[1] - this.props.size - 7,
      (this.props.life * this.props.size * 2) / this.props.maxLife,
      3
    );
    this.map.ctx.fillStyle = "rgb(250,209,54)";
    this.map.ctx.fillRect(
      this.pos[0] - this.props.size,
      this.pos[1] - this.props.size - 10,
      (this.props.energy * this.props.size * 2) / this.props.maxEnergy,
      3
    );
    this.map.ctx.closePath();
  }

  print() {
    this.printOrg();
    this.printOrgProps();
    this.printVision();

    if (this.mode === "dev") {
      this.printToPoint();
      this.printMovementLine();
    }
  }
}
