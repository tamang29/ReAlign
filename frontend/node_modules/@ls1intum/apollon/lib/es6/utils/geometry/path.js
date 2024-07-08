import { Point } from './point';
export class Path {
    constructor(path = [new Point(), new Point()]) {
        this.path = path;
    }
    get length() {
        return this.path
            .map((point) => new Point(point.x, point.y))
            .reduce((length, point, i, points) => (i + 1 < points.length ? length + points[i + 1].subtract(point).length : length), 0);
    }
    position(distance = 0) {
        for (let index = 0; index < this.path.length - 1; index++) {
            const current = new Point(this.path[index + 1].x, this.path[index + 1].y);
            const next = new Point(this.path[index].x, this.path[index].y);
            const vector = current.subtract(next);
            if (vector.length > distance) {
                const norm = vector.normalize();
                return next.add(norm.scale(distance));
            }
            distance -= vector.length;
        }
        return new Point();
    }
}
//# sourceMappingURL=path.js.map