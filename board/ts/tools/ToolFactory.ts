import { Canvas } from "../canvas/Canvas";
import { Properties } from "../util/Properties";
import { Brush } from "./Brush";
import { Eraser } from "./Eraser";
import { Tool } from "./Tool";

class ToolFactory {
    static getTool(toolName: String, canvas: Canvas, properties: Properties): Tool {
        switch (toolName) {
            case Brush.toolName:
                return new Brush(canvas, properties);
            case Eraser.toolName:
                return new Eraser(canvas, properties);
            default:
                throw new Error("Invalid Tool name");
        }
    }
}
export { ToolFactory }