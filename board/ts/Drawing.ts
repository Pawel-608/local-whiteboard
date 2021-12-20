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

    public static get Instance() {
        return this._instance || (this._instance = new this());
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
        window.addEventListener(
            "pointerdown",
            e => {
                if (Control.isControlElem(<HTMLElement>e.target)) return;//returns if element is control elem (tool, color picker etc.)

                this.tool = this.chooseTool(BoardStorage.get("tool"), Properties.local);
                this.tool.startDraw(Mouse.getPosition(e));

                window.addEventListener("pointermove", this.draw, false);
            },
            false
        );

        window.addEventListener(
            "pointerup",
            () => {
                window.removeEventListener("pointermove", this.draw, false);
                this.tool.endDraw();
                this.tool = NullTool.Instance;
            },
            false
        );
    }

    chooseTool(toolName: String, properties: Properties): Tool {
        switch (toolName) {
            case "brush":
                return new Brush(this.canvas, properties);
            case "eraser":
                return new Eraser(this.canvas, properties);
            default:
                return NullTool.Instance;
        }
    }

    private draw = (e: PointerEvent) => this.tool.addPoint(Mouse.getPosition(e));
}

export { Drawing }