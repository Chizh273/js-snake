export class Position {
    constructor(public x: number, public y: number) {

    }
}

export const Direction = {
    Up: new Position(1, 0),
    Down: new Position(0, 1),
    Left: new Position(-1, 0),
    Right: new Position(0, -1)
}