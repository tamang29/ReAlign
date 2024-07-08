export class Point {
    constructor(x = 0, y = 0) {
        this.x = x;
        this.y = y;
    }
    get length() {
        return Math.sqrt(this.x * this.x + this.y * this.y);
    }
    normalize() {
        return new Point(this.x / this.length, this.y / this.length);
    }
    add(x, y) {
        if (x instanceof Point) {
            return new Point(this.x + x.x, this.y + x.y);
        }
        if (typeof y === 'number') {
            return new Point(this.x + x, this.y + y);
        }
        return this.clone();
    }
    subtract(x, y) {
        if (x instanceof Point) {
            return new Point(this.x - x.x, this.y - x.y);
        }
        if (typeof y === 'number') {
            return new Point(this.x - x, this.y - y);
        }
        return this.clone();
    }
    round(radix = 10) {
        return new Point(Math.round(this.x / radix) * radix, Math.round(this.y / radix) * radix);
    }
    scale(factor) {
        return new Point(this.x * factor, this.y * factor);
    }
    clone() {
        return new Point(this.x, this.y);
    }
}
//# sourceMappingURL=point.js.map