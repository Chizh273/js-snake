/// <reference path="../../typings/tsd.d.ts" />

/**
 * Class Label
 * */
export class Label {
    private _label: JQuery;
    private _wrapper: JQuery = $('<div>');

    /**
     * Create Label
     *
     * @param text { string } - text to label
     * @param cls { string } - class wrapper this label
     * */
    constructor(text: string, cls: string) {
        this._wrapper.addClass(cls);
        this._label = $('<h1>').text(text).wrap(this._wrapper).parent();
        this._label.append(
            $('<button>').addClass('btn-start').text('Game')
        );
    }

    /**
     * Set text in label
     * @access public
     *
     * @param text { string } - text to label
     * @return { void }
     * */
    setText(text: string): void {
        this._label.find('h1').text(text);
    }

    /**
     * Show label
     * @access public
     *
     * @return { void }
     * */
    show(): void {
        $('body').prepend(this._label);
    }
}