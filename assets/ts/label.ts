/// <reference path="../definitions/jquery.d.ts"/>

export class Label {
    label: JQuery;
    _wrapper: JQuery = $('<div>');

    constructor(text: string, cls: string) {
        this._wrapper.addClass(cls);
        this.label = $('<h1>').text(text).wrap(this._wrapper).parent();
        this.label.append(
            $('<button>').addClass('btn-start').text('Game')
        );
    }

    setText(text: string) {
        this.label.find('h1').text(text);
    }

    show() {
        $('body').prepend(this.label);
    }
}