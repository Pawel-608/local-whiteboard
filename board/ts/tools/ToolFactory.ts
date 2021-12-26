import { Canvas } from "../canvas/Canvas";
import { Properties } from "../util/Properties";
import { Brush } from "./Brush";
import { Eraser } from "./Eraser";
import { NullTool } from "./NullTool";

class ToolFactory {
    static getTool(toolName: String, canvas: Canvas, properties: Properties) {
        switch (toolName) {
            case Brush.toolName:
                return new Brush(canvas, properties);
            case Eraser.toolName:
                return new Eraser(canvas, properties);
            default:
                return NullTool.Instance;
        }
    }
}
export { ToolFactory }