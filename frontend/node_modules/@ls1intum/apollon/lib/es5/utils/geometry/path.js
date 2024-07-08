"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Path = void 0;
var point_1 = require("./point");
var Path = /** @class */ (function () {
    function Path(path) {
        if (path === void 0) { path = [new point_1.Point(), new point_1.Point()]; }
        this.path = path;
    }
    Object.defineProperty(Path.prototype, "length", {
        get: function () {
            return this.path
                .map(function (point) { return new point_1.Point(point.x, point.y); })
                .reduce(function (length, point, i, points) { return (i + 1 < points.length ? length + points[i + 1].subtract(point).length : length); }, 0);
        },
        enumerable: false,
        configurable: true
    });
    Path.prototype.position = function (distance) {
        if (distance === void 0) { distance = 0; }
        for (var index = 0; index < this.path.length - 1; index++) {
            var current = new point_1.Point(this.path[index + 1].x, this.path[index + 1].y);
            var next = new point_1.Point(this.path[index].x, this.path[index].y);
            var vector = current.subtract(next);
            if (vector.length > distance) {
                var norm = vector.normalize();
                return next.add(norm.scale(distance));
            }
            distance -= vector.length;
        }
        return new point_1.Point();
    };
    return Path;
}());
exports.Path = Path;
//# sourceMappingURL=path.js.map