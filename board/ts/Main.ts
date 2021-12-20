import { Drawing } from './Drawing';
import { MainCanvas } from './canvas/MainCanvas';
import { BoardStorage } from './util/BoardStorage';
import { Control } from './util/Control';

class Main {
    public static run(): void {
        this.setupConfig();

        MainCanvas.Instance;
        Drawing.Instance;

    }
    public static setupConfig(): void {
        Control.setColor(BoardStorage.get("color") || "#000000");
        Control.setLineWidth(BoardStorage.get("lineWidth") || 10);
        Control.setTool(BoardStorage.get("tool") || "brush");
    }
}

Main.run()