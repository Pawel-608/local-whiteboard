import { Point } from '../util/Point';
import { Properties } from '../util/Properties';
import { Canvas } from "../canvas/Canvas";
import { MainCanvas } from '../canvas/MainCanvas';

abstract class Tool {
    protected canvas;
    protected properties: Properties;
    protected points: Point[];

    constructor(canvas: Canvas, properties: Properties) {
        this.canvas = canvas;
        this.properties = properties;
        this.points = [];
    }

    public addPoint(point: Point): void {
        this.points.push(point);
        this.draw();
    }

    public startDraw(point: Point): void {
        this.prepare();
        this.addPoint(point);
    };

    private draw(): void {
        if (this.points.length < 3) {
            let b = this.points[0];

            this.canvas.ctx.beginPath();
            this.canvas.ctx.arc(b.x, b.y, this.canvas.ctx.lineWidth / 2, 0, Math.PI * 2, !0);
            this.canvas.ctx.fill();
            this.canvas.ctx.closePath();
            return;
        }

        this.canvas.ctx.clearRect(0, 0, this.canvas.canvas.width, this.canvas.canvas.height);

        this.canvas.ctx.beginPath();
        this.canvas.ctx.moveTo(this.points[0].x, this.points[0].y);

        for (let i = 1; i < this.points.length - 2; i++) { //This make line smoother
            let c = (this.points[i].x + this.points[i + 1].x) / 2;
            let d = (this.points[i].y + this.points[i + 1].y) / 2;
            this.canvas.ctx.quadraticCurveTo(this.points[i].x, this.points[i].y, c, d);
        }

        let i = this.points.length - 2;
        this.canvas.ctx.quadraticCurveTo(this.points[i].x, this.points[i].y, this.points[i + 1].x, this.points[i + 1].y);
        this.canvas.ctx.stroke();
    };

    public endDraw() {
        MainCanvas.Instance.drawImage(this.canvas.canvas);
        MainCanvas.Instance.saveInStorage();

        this.canvas.clear();
    };

    protected abstract prepare(): void;
}

export { Tool };