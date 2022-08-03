let snake;
let fruit;
const size = 30;

function setup() {
  createCanvas(600, 600);
  frameRate(5);
  snake = new Snake();
  fruit = new Fruit();
}

function draw() {
  background('gray');
  snake.move();
  snake.show();
  fruit.show();

  if (snake.eat(fruit.body)) {
    fruit.move();
  }

  if (snake.end()) {
    background('black');
    noLoop();
  }
}

function keyPressed() {
  if (keyCode === UP_ARROW) {
    snake.changeDirection(0, -1);
  } else if (keyCode === DOWN_ARROW) {
    snake.changeDirection(0, 1);
  } else if (keyCode === LEFT_ARROW) {
    snake.changeDirection(-1, 0);
  } else if (keyCode === RIGHT_ARROW) {
    snake.changeDirection(1, 0);
  }
}

class Fruit {
  constructor() {
    let x = size * floor(random(0, width / size));
    let y = size * floor(random(0, height / size));
    this.body = createVector(x, y)
  }

  move() {
    let x = size * floor(random(0, width / size));
    let y = size * floor(random(0, height / size));
    this.body.x = x;
    this.body.y = y;
  }

  show() {
    fill('red');
    rect(this.body.x, this.body.y, size, size);
  }
}

class Snake {
  constructor() {
    this.body = [];
    this.body.push(createVector(0, 0));
    this.xDirection = 1;
    this.yDirection = 0;
  }

  end() {
    let head = this.body[this.body.length -1];
    if (head.x < 0 || head.y < 0 || head.x > width || head.y > height) {
      return true;
    }

    for (let i = 0; i < this.body.length -1; i++) {
      if (this.body[i].x === head.x && this.body[i].y === head.y) {
        return true
      }
    }

    return false;
  }

  add() {
    let head = this.body[this.body.length -1].copy();
    head.x += this.xDirection * size;
    head.y += this.yDirection * size;
    this.body.push(head);
  }

  eat(vec) {
    let head = this.body[this.body.length - 1];
    if (head.x === vec.x && head.y === vec.y) {
      this.add();
      return true;
    }

    return false;
  }

  changeDirection(x, y) {
    this.xDirection = x;
    this.yDirection = y;
  }

  move() {
    let head = this.body[this.body.length -1].copy();
    head.x += this.xDirection * size;
    head.y += this.yDirection * size;
    this.body.shift();
    this.body.push(head);
  }

  show() {
    fill('black');
    this.body.forEach(body => {
      rect(body.x, body.y, size, size);
    })
  }
}