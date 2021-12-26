import { Tool } from './Tool'

class Eraser extends Tool {
    protected static _toolName = "eraser";
    protected prepare() {
        this.canvas.setColor("#ffffff");
        this.canvas.setLineWidth(this.properties.lineWidth);
    }
}

export { Eraser };