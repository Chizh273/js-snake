/**
 * Class Score
 * */
export class Score {
    private _score: number = 0;
    private _label: JQuery;

    /**
     * Create class Score
     *
     * @param label { JQuery }
     * */
    constructor(label: JQuery) {
        this._label = label;

        this._label.prepend(
            $('<div>').addClass('status-score').prepend([
                $("<h1>").text("Your score: "),
                $("<span>").addClass("score").text(this._score)
            ])
        );
    }

    /**
     * Update score
     * @access public
     *
     * @return { void }
     * */
    public updateScore(): void {
        ++this._score;
        this._label.find(".score").text(this._score);
    }

    /**
     * Reset score
     * @access public
     *
     * @return { void }
     * */
    public resetScore(): void {
        this._score = -1;
        this.updateScore();
    }

    get score(): number {
        return this._score;
    }
}
