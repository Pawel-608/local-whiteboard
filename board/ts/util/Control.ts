import { BoardStorage } from './BoardStorage'

class Control {
    private static elements = {
        colorOutput: document.getElementsByClassName("color-label-element")[0],
        colorInput: document.getElementsByClassName("color")[0],
        lineWidthOutput: document.getElementsByClassName("paint-size-out")[0],
        lineWidthInput: document.getElementsByClassName("paint-size-in")[0],
        tools: document.getElementsByClassName("tools")[0],
        download: document.getElementsByClassName("download")[0]
    }

    public static isControlElem(elem: HTMLElement): boolean {

        let isToolElem = false;

        Array.from(this.elements.tools.children).forEach(child => {
            if (child.className == elem.className) {
                isToolElem = true;
                return;
            }
        });

        return (isToolElem || elem.className == this.elements.colorOutput.className || elem.className == this.elements.colorInput.className || elem.className == this.elements.lineWidthInput.className || elem.className == this.elements.lineWidthOutput.className || elem.className == this.elements.download.className)
    }

    public static setupListeners() {
        this.elements.lineWidthInput.addEventListener("input", e => this.setLineWidth(+(<HTMLInputElement>e.target).value));
        this.elements.colorInput.addEventListener("input", e => this.setColor((<HTMLInputElement>e.target).value));
        this.elements.tools.addEventListener("click", e => this.setTool((<HTMLDivElement>e.target).className));
        this.elements.download.addEventListener("click", () => this.downloadImage());
    }

    public static setupInitialProperties() {
        this.setColor(BoardStorage.get("color") || "#000000");
        this.setLineWidth(BoardStorage.get("lineWidth") || 10);
        this.setTool(BoardStorage.get("tool") || "brush");
    }

    public static setColor(color: string): void {
        BoardStorage.set("color", color);
        (<HTMLInputElement>this.elements.colorOutput).style.backgroundColor = color;
    }

    public static setLineWidth(size: number): void {
        BoardStorage.set("lineWidth", size.toString());
        (<HTMLOutputElement>this.elements.lineWidthOutput).value = size.toString();
        (<HTMLInputElement>this.elements.lineWidthInput).value = size.toString();
    }

    public static setTool(tool: string): void {
        if (tool == "tools") return; // If user click on nav ( not on tool icon ) just return.
        BoardStorage.set("tool", tool);
    }

    public static downloadImage() {
        let image = BoardStorage.get("img");
        (<HTMLAnchorElement>this.elements.download).href = image;
    }

}

export { Control };