function snake(sketch) {
    const colors = {
        darkGreen: [38, 70, 83],
        yellow: [233, 196, 106],
        orange: [244, 162, 97],
        red: [220, 140, 140],
        bluegreen: [42, 157, 143],
        white: [220, 220, 220],
    }

    function createFood(radius = 20) {
        const padding = radius + 10;
        return new Food(
            getRandomInt(padding, sketch.width - padding),
            getRandomInt(padding, sketch.height - padding),
            radius,
            sketch,
            colors.darkGreen,
        );
    }

    function reset() {
        sketch.loop();
        dead = false;
        score = 0;
        snake = new Snake(300, 300, 30, 10, 20, sketch, [...colors.white, 220]);
        snake.setVel(200, 200);
        food = createFood();
    }

    let snake;
    let food;
    let score;
    let dead;

    sketch.preload = function () {
    };

    sketch.setup = function () {
        let canvas = sketch.createCanvas(sketch.windowWidth, sketch.windowHeight);
        canvas.style('display', 'block');
        // sketch.frameRate(30);

        reset();
    };

    sketch.draw = function () {
        if (dead || !sketch.focused) {
            sketch.deltaTIme = 0;
            return;
        }

        if (food.collides(snake.position, snake.radius)) {
            score++;
            snake.addSegment();
            food = createFood();
        }

        if (sketch.keyIsDown(sketch.LEFT_ARROW) || (sketch.mouseIsPressed && sketch.mouseX < sketch.width / 2)) {
            snake.rotate(-0.1);
        }
        if (sketch.keyIsDown(sketch.RIGHT_ARROW) || (sketch.mouseIsPressed && sketch.mouseX > sketch.width / 2)) {
            snake.rotate(0.1);
        }

        if (snake.collidesSelf()) {
            dead = true;
        }

        snake.bound();
        snake.update();

        sketch.background(colors.red);

        sketch.textSize(sketch.height * 0.4);
        sketch.textAlign(sketch.CENTER, sketch.CENTER);
        sketch.text(score, sketch.width / 2, sketch.height / 2);

        snake.draw();
        food.draw();

        if (dead) {
            sketch.textSize(sketch.height * 0.03);
            sketch.text('tap anywhere or press r\nto restart', sketch.width / 2, sketch.height / 4 * 3);
        }
    };

    sketch.mouseMoved = function () {
    };

    sketch.mouseClicked = function () {
        if (dead) {
            reset();
        }
    };

    sketch.keyPressed = function () {
    };

    sketch.keyReleased = function () {
        if (dead && sketch.keyCode === 82) {
            reset();
        }
    };

    sketch.windowResized = function () {
        sketch.resizeCanvas(sketch.windowWidth, sketch.windowHeight);
    };
}

let p5Sketch = new p5(snake, 'gameContainer');

window.addEventListener("keydown", function (e) {
    // space and arrow keys
    if ([32, 37, 38, 39, 40].indexOf(e.keyCode) > -1) {
        e.preventDefault();
    }
}, false);