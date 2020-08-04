class Food {
    constructor(x, y, radius = 10, sketch, fillColor = [0, 100]) {
        this.position = sketch.createVector(x, y);
        this.radius = radius;
        this.fillColor = fillColor;
        this.sketch = sketch;
    }

    draw() {
        this.sketch.push();
        this.sketch.strokeWeight(0);
        this.sketch.fill(this.fillColor);
        this.sketch.ellipseMode(this.sketch.CENTER);
        this.sketch.ellipseMode(this.sketch.RADIUS);
        this.sketch.ellipse(this.position.x, this.position.y, this.radius, this.radius);
        this.sketch.pop();
    }

    collides(vec, radius = 0) {
        return this.position.dist(vec) < this.radius + radius;
    }
}