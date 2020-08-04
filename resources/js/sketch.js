function dist(ax, ay, bx, by) {
    return Math.hypot(ax - bx, ay - by);
}

function snake(sketch) {
    const colors = {
        darkGreen: [38, 70, 83],
        yellow: [233, 196, 106],
        orange: [244, 162, 97],
        red: [231, 111, 81],
        bluegreen: [42, 157, 143],
        white: 220,
    }

    let snake;

    sketch.preload = function () {
    };

    sketch.setup = function () {
        let canvas = sketch.createCanvas(sketch.windowWidth, sketch.windowHeight);
        canvas.style('display', 'block');
        // sketch.frameRate(30);
        snake = new Snake(100, 100, 30, 50, sketch, 10, [0, 100]);
        snake.setVel(300, 0);
    };

    sketch.draw = function () {
        if (sketch.keyIsDown(sketch.LEFT_ARROW)) {
            snake.accel.p = -3000;
        } else if (sketch.keyIsDown(sketch.RIGHT_ARROW)) {
            snake.accel.p = 3000;
        } else {
            snake.accel.p = 0;
        }
        snake.bound();
        snake.update();

        sketch.background(255);

        snake.draw();
    };

    sketch.mouseMoved = function () {
    };

    sketch.mouseClicked = function () {
    };

    sketch.keyPressed = function () {
    };

    sketch.keyReleased = function () {
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