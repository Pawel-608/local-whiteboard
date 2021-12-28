import { Canvas } from "./canvas/Canvas";
import { Tool } from "./tools/Tool";
import { NullTool } from './tools/NullTool'
import { ToolFactory } from "./tools/ToolFactory";
import { BoardStorage } from "./util/BoardStorage";
import { Control } from "./util/Control";
import { Mouse } from "./util/Mouse";
import { Properties } from "./util/Properties";

class Drawing {
    private static instance: Drawing;

    public static setup() {
        if (!this.instance)
            this.instance = new this()
    }

    private canvas: Canvas;
    private tool: Tool = NullTool.Instance;

    private constructor() {
        this.canvas = new Canvas();

        Control.setupListeners();
        this.appendListeners();
    }

    private appendListeners() {
        window.addEventListener("pointerdown", this.startDraw, false);
        window.addEventListener("pointerup", this.endDraw, false);
    }

    private startDraw = (e: PointerEvent) => {
        if (Control.isControlElem(<HTMLElement>e.target)) return;//returns if element is control elem (tool, color picker etc.)

        this.tool = ToolFactory.getTool(BoardStorage.get("tool"), this.canvas, Properties.local);
        this.tool.startDraw(Mouse.getPosition(e));

        window.addEventListener("pointermove", this.draw, false);
    }

    private draw = (e: PointerEvent) => this.tool.addPoint(Mouse.getPosition(e));

    private endDraw = () => {
        window.removeEventListener("pointermove", this.draw, false);
        this.tool.endDraw();

        this.tool = NullTool.Instance;
    }
}

export { Drawing }