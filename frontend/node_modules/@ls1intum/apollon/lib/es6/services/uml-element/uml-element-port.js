export var Direction;
(function (Direction) {
    Direction["Up"] = "Up";
    Direction["Right"] = "Right";
    Direction["Down"] = "Down";
    Direction["Left"] = "Left";
    Direction["Upright"] = "Upright";
    Direction["Upleft"] = "Upleft";
    Direction["Downright"] = "Downright";
    Direction["Downleft"] = "Downleft";
    Direction["Topright"] = "Topright";
    Direction["Topleft"] = "Topleft";
    Direction["Bottomright"] = "Bottomright";
    Direction["Bottomleft"] = "Bottomleft";
})(Direction || (Direction = {}));
export function getOppositeDirection(direction) {
    switch (direction) {
        case Direction.Down:
            return Direction.Up;
        case Direction.Left:
            return Direction.Right;
        case Direction.Right:
            return Direction.Left;
        case Direction.Up:
            return Direction.Down;
        case Direction.Upright:
            return Direction.Upleft;
        case Direction.Downright:
            return Direction.Downleft;
        case Direction.Upleft:
            return Direction.Upright;
        case Direction.Downleft:
            return Direction.Downright;
        case Direction.Topright:
            return Direction.Topleft;
        case Direction.Bottomright:
            return Direction.Bottomleft;
        case Direction.Topleft:
            return Direction.Topright;
        case Direction.Bottomleft:
            return Direction.Bottomright;
        default:
            throw Error(`Could not determine opposite direction for direction of ${direction}`);
    }
}
//# sourceMappingURL=uml-element-port.js.map