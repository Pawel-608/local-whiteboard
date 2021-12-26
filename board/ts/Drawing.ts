import { Canvas } from "./canvas/Canvas";
import { Brush } from "./tools/Brush";
import { Eraser } from "./tools/Eraser";
import { NullTool } from "./tools/NullTool";
import { Tool } from "./tools/Tool";
import { BoardStorage } from "./util/BoardStorage";
import { Control } from "./util/Control";
import { Mouse } from "./util/Mouse";
import { Properties } from "./util/Properties";

class Drawing {
    private static _instance: Drawing;

    public static setup() {
        if (!this._instance)
            this._instance = new this()
    }

    private canvas: Canvas;
    private tool: Tool;

    private constructor() {
        this.canvas = new Canvas();
        this.tool = NullTool.Instance;

        Control.setupListeners();
        this.appendListeners();
    }

    private appendListeners() {
        window.addEventListener("pointerdown", this.onStartDraw, false);
        window.addEventListener("pointerup", this.onEndDraw, false);
    }

    private onStartDraw = (e: PointerEvent) => {
        if (Control.isControlElem(<HTMLElement>e.target)) return;//returns if element is control elem (tool, color picker etc.)

        this.tool = this.chooseTool(BoardStorage.get("tool"), Properties.local);
        this.tool.startDraw(Mouse.getPosition(e));

        window.addEventListener("pointermove", this.onDraw, false);
    }

    private onDraw = (e: PointerEvent) => this.tool.addPoint(Mouse.getPosition(e));

    private onEndDraw = () => {
        window.removeEventListener("pointermove", this.onDraw, false);
        this.tool.endDraw();
        this.tool = NullTool.Instance;
    }

    chooseTool(toolName: String, properties: Properties): Tool {
        switch (toolName) {
            case Brush.toolName:
                return new Brush(this.canvas, properties);
            case Eraser.toolName:
                return new Eraser(this.canvas, properties);
            default:
                return NullTool.Instance;
        }
    }

}

export { Drawing }