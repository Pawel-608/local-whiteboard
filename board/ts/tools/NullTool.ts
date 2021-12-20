import { Properties } from '../util/Properties';
import { Canvas } from "../canvas/Canvas";
import { Tool } from "./Tool";

class NullTool extends Tool {
    private static _instance: NullTool;

    private constructor() {
        super(<Canvas>{}, Properties.local);
    }

    public static get Instance() {
        return this._instance || (this._instance = new this());
    }

    //overwrite
    addPoint() { };
    startDraw() { };
    endDraw() { };
    prepare() { };
}

export { NullTool }