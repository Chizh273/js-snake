/**
 * Class for configuration game Snake
 * */
export class configSnake {

    /**
     * Create configSnake
     *
     * @param clsSnake  { string } - class name snake
     * @param clsFruit  { string } - class name fruit
     * @param clsPoison { string } - class name poison
     * @param sizeGame  { number } - size matrix game
     * @param speed     { number }
     * */
    constructor(public clsSnake: string,
                public clsFruit: string,
                public clsPoison: string,
                public sizeGame: number,
                public speed: number) {

    }

}