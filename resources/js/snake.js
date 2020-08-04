class Segment {
    constructor(x, y, length, sketch) {
        this.x = x;
        this.y = y;
        this.length = length;
        this.sketch = sketch;
        this.angle = 0;
    }

    drag(x, y) {
        const dx = x - this.x;
        const dy = y - this.y;
        this.angle = Math.atan2(dy, dx);
        this.x = x - Math.cos(this.angle) * this.length;
        this.y = y - Math.sin(this.angle) * this.length;
    }

    draw() {
        this.sketch.line(this.x, this.y, this.x + this.length * Math.cos(this.angle), this.y + this.length * Math.sin(this.angle));
    }
}

class Snake {
    constructor(x, y, segmentLength = 20, nSegments = 10, sketch, thickness = 10, color = [0, 100]) {
        this.position = sketch.createVector(x, y);
        this.velocity = sketch.createVector(0, 0);
        this.sketch = sketch;
        this.thickness = thickness;
        this.color = color;

        nSegments = Math.max(1, nSegments);
        this.segments = new Array(nSegments);
        this.segLength = segmentLength;
        this.segments[0] = new Segment(this.position.x, this.position.y, this.segLength, this.sketch);
        for (let i = 1; i < this.segments.length; i++) {
            this.segments[i] = new Segment(this.segments[i - 1].x, this.segments[i - 1].y, this.segLength, this.sketch);
        }
    }

    setPos(x, y) {
        this.position.set(x, y);
        this._updateSegments();
    }

    updatePos() {
        this.position.add(p5.Vector.mult(this.velocity, this.sketch.deltaTime / 1000));
    }

    setVel(x, y) {
        this.velocity.set(x, y);
    }

    rotate(rad) {
        this.velocity.rotate(rad);
    }

    bound() {
        if (this.position.x < 0 && this.velocity.x < 0) this.velocity.x = Math.abs(this.velocity.x);
        if (this.position.y < 0 && this.velocity.y < 0) this.velocity.y = Math.abs(this.velocity.y);
        if (this.position.x >= this.sketch.width && this.velocity.x > 0) this.velocity.x = -Math.abs(this.velocity.x);
        if (this.position.y >= this.sketch.height && this.velocity.y > 0) this.velocity.y = -Math.abs(this.velocity.y);
    }

    update() {
        this.updatePos();
        this._updateSegments();
    }

    draw() {
        this.sketch.push();
        this.sketch.strokeWeight(this.thickness);
        this.sketch.stroke(this.color);
        for (const segment of this.segments) {
            segment.draw();
        }
        this.sketch.pop();
    }

    _updateSegments() {
        this.segments[0].drag(this.position.x, this.position.y);
        for (let i = 1; i < this.segments.length; i++) {
            this.segments[i].drag(this.segments[i - 1].x, this.segments[i - 1].y);

        }
    }
}