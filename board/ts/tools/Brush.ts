import { Tool } from './Tool'

class Brush extends Tool {
    protected prepare() {
        this.canvas.setColor(this.properties.color);
        this.canvas.setLineWidth(this.properties.lineWidth);
    }
}

export { Brush };