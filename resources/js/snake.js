class Segment {
    constructor(x, y, length, radius, sketch) {
        this.position = sketch.createVector(x, y);
        this.length = length;
        this.radius = radius;
        this.sketch = sketch;
        this.angle = 0;
    }

    get tail() {
        return createVector()
    }

    drag(x, y) {
        const dx = x - this.position.x;
        const dy = y - this.position.y;
        this.angle = Math.atan2(dy, dx);
        this.position.x = x - Math.cos(this.angle) * this.length;
        this.position.y = y - Math.sin(this.angle) * this.length;
    }

    draw() {
        this.sketch.line(this.position.x, this.position.y, this.position.x + this.length * Math.cos(this.angle), this.position.y + this.length * Math.sin(this.angle));
    }

    collides(vec, radius = 0) {
        return this.position.dist(vec) < this.radius + radius;
    }
}

class Snake {
    constructor(x, y, segmentLength = 20, nSegments = 10, thickness = 10, sketch, color = [0, 100]) {
        this.position = sketch.createVector(x, y);
        this.velocity = sketch.createVector(0, 0);
        this.sketch = sketch;
        this.thickness = thickness;
        this.radius = thickness / 2;
        this.color = color;

        nSegments = Math.max(1, nSegments);
        this.segments = new Array(nSegments);
        this.segLength = segmentLength;
        this.segments[0] = new Segment(0, 0, this.segLength, this.radius, this.sketch);
        for (let i = 1; i < this.segments.length; i++) {
            this.segments[i] = new Segment(0, 0, this.segLength, this.radius, this.sketch);
        }
    }

    addSegments(n) {
        for (let i = 0; i < n; i++) {
            this.addSegment();
        }
    }

    addSegment() {
        const tail = this.segments[this.segments.length - 1];
        const tempVec = p5.Vector.add(tail.position, this.velocity);
        this.segments.push(new Segment(tempVec.x, tempVec.y, this.segLength, this.radius, this.sketch));
    }

    subSegment() {
        this.segments.pop();
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

    collidesSelf() {
        for (const segment of this.segments) {
            if (segment.collides(this.position, this.radius)) return true;
        }
        return false;
    }

    update() {
        this.updatePos();
        this._updateSegments();
    }

    draw() {
        this.sketch.push();
        this.sketch.strokeWeight(0);
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
            this.segments[i].drag(this.segments[i - 1].position.x, this.segments[i - 1].position.y);
        }
    }
}