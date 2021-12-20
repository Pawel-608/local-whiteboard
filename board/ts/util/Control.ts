import { BoardStorage } from './BoardStorage'

class Control {
    private static colorOutput = document.getElementsByClassName("color-label-element")[0];
    private static colorInput = document.getElementsByClassName("color")[0];
    private static lineWidthOutput = document.getElementsByClassName("paint-size-out")[0];
    private static lineWidthInput = document.getElementsByClassName("paint-size-in")[0];
    private static tools = document.getElementsByClassName("tools")[0];
    private static download = document.getElementsByClassName("download")[0];

    public static isControlElem(elem: HTMLElement): boolean {

        let isToolElem = false;

        Array.from(this.tools.children).forEach(child => {
            if (child.className == elem.className) {
                isToolElem = true;
                return;
            }
        });

        return (isToolElem || elem.className == this.colorOutput.className || elem.className == this.colorInput.className || elem.className == this.lineWidthInput.className || elem.className == this.lineWidthOutput.className || elem.className == this.download.className)
    }

    public static setupListeners() {
        this.lineWidthInput.addEventListener("input", e => this.setLineWidth(+(<HTMLInputElement>e.target).value));
        this.colorInput.addEventListener("input", e => this.setColor((<HTMLInputElement>e.target).value));
        this.tools.addEventListener("click", e => this.setTool((<HTMLDivElement>e.target).className));
        this.download.addEventListener("click", () => this.downloadImage());
    }

    public static setColor(color: string): void {
        BoardStorage.set("color", color);
        (<HTMLInputElement>this.colorOutput).style.backgroundColor = color;
    };
    public static setLineWidth(size: number): void {
        BoardStorage.set("lineWidth", size.toString());
        (<HTMLOutputElement>this.lineWidthOutput).value = size.toString();
        (<HTMLInputElement>this.lineWidthInput).value = size.toString();
    };
    public static setTool(tool: string): void {
        if (tool == "tools") return; // If user click on nav ( not on tool icon ) just return.
        BoardStorage.set("tool", tool);
    }

    public static downloadImage() {
        let image = BoardStorage.get("img");
        (<HTMLAnchorElement>this.download).href = image;
    }

}

export { Control };