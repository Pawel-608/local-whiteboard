import { Canvas } from './Canvas'
import { BoardStorage } from '../util/BoardStorage';

class MainCanvas extends Canvas {

    private static _instance: MainCanvas;

    public static get Instance() {
        return this._instance || (this._instance = new this());
    }
    private constructor() {
        super();
        this.drawWhiteBackground();
        this.drawFromStorage();

        this.sendToBack();
    }

    private drawFromStorage() {
        let imgSrc = BoardStorage.get("img");
        if (!imgSrc) return;

        let img = new Image();
        img.src = imgSrc;

        img.addEventListener("load", () => this.ctx.drawImage(img, 0, 0));
    }


    private drawWhiteBackground() {
        let prevFillStyle = this.ctx.fillStyle;
        this.ctx.fillStyle = 'white';

        this.ctx.fillRect(0, 0, this.canvas.width, this.canvas.height);


        this.ctx.fillStyle = prevFillStyle;
    }

    private sendToBack() {
        this.canvas.style.zIndex = "-1000";
    }

    public drawImage(canvas: HTMLCanvasElement) {
        this.ctx.drawImage(canvas, 0, 0);
    }

    public saveInStorage() {
        let img = this.getImgSrc();
        BoardStorage.set("img", img);
    }

    private getImgSrc() {
        let imgd = this.ctx.getImageData(0, 0, this.canvas.width, this.canvas.height);

        this.ctx.clearRect(0, 0, this.canvas.width, this.canvas.height);
        this.ctx.putImageData(imgd, 0, 0);

        return this.canvas.toDataURL("image/png");
    }
}

export { MainCanvas };