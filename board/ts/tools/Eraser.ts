import { Tool } from './Tool'

class Eraser extends Tool {
    protected prepare() {
        this.canvas.setColor("#ffffff");
        this.canvas.setLineWidth(this.properties.lineWidth);
    }
}

export { Eraser };