import { Config } from './Config'

class Canvas {
    private _canvas: HTMLCanvasElement;
    private _ctx: CanvasRenderingContext2D;

    constructor() {
        this._canvas = document.createElement("canvas");
        this._canvas.width = window.screen.availWidth;
        this._canvas.height = window.screen.availHeight;
        this._ctx = <CanvasRenderingContext2D>this._canvas.getContext("2d");

        this.setup();

        document.body.appendChild(this._canvas);
    }

    private setup() {
        this.ctx.lineJoin = <CanvasLineJoin>Config.lineJoin;
        this.ctx.lineCap = <CanvasLineCap>Config.lineCap;
    }

    public setColor(color: string) {
        this._ctx.strokeStyle = color;
        this._ctx.fillStyle = color;
    }
    public setLineWidth(lineWidth: number) {
        this._ctx.lineWidth = lineWidth;
    }

    public clear() {
        this._ctx.clearRect(0, 0, this._canvas.width, this._canvas.height);
    }

    get canvas() {
        return this._canvas;
    }
    get ctx() {
        return this._ctx;
    }
}
export { Canvas };