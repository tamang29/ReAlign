"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Point = void 0;
var Point = /** @class */ (function () {
    function Point(x, y) {
        if (x === void 0) { x = 0; }
        if (y === void 0) { y = 0; }
        this.x = x;
        this.y = y;
    }
    Object.defineProperty(Point.prototype, "length", {
        get: function () {
            return Math.sqrt(this.x * this.x + this.y * this.y);
        },
        enumerable: false,
        configurable: true
    });
    Point.prototype.normalize = function () {
        return new Point(this.x / this.length, this.y / this.length);
    };
    Point.prototype.add = function (x, y) {
        if (x instanceof Point) {
            return new Point(this.x + x.x, this.y + x.y);
        }
        if (typeof y === 'number') {
            return new Point(this.x + x, this.y + y);
        }
        return this.clone();
    };
    Point.prototype.subtract = function (x, y) {
        if (x instanceof Point) {
            return new Point(this.x - x.x, this.y - x.y);
        }
        if (typeof y === 'number') {
            return new Point(this.x - x, this.y - y);
        }
        return this.clone();
    };
    Point.prototype.round = function (radix) {
        if (radix === void 0) { radix = 10; }
        return new Point(Math.round(this.x / radix) * radix, Math.round(this.y / radix) * radix);
    };
    Point.prototype.scale = function (factor) {
        return new Point(this.x * factor, this.y * factor);
    };
    Point.prototype.clone = function () {
        return new Point(this.x, this.y);
    };
    return Point;
}());
exports.Point = Point;
//# sourceMappingURL=point.js.map