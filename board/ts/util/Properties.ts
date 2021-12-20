import { BoardStorage } from "./BoardStorage";

class Properties {
    private _lineWidth: number;
    private _color: string;

    constructor(lineWidth: number, color: string) {
        this._lineWidth = lineWidth;
        this._color = color;
    }

    public static get local() {
        return new this(+BoardStorage.get("lineWidth"), BoardStorage.get("color"));
    }

    get lineWidth() {
        return this._lineWidth;
    }
    get color() {
        return this._color;
    }
}

export { Properties };