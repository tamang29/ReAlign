export declare enum Direction {
    Up = "Up",
    Right = "Right",
    Down = "Down",
    Left = "Left",
    Upright = "Upright",
    Upleft = "Upleft",
    Downright = "Downright",
    Downleft = "Downleft",
    Topright = "Topright",
    Topleft = "Topleft",
    Bottomright = "Bottomright",
    Bottomleft = "Bottomleft"
}
export interface IUMLElementPort {
    element: string;
    direction: Direction;
}
export declare function getOppositeDirection(direction: Direction): Direction;
