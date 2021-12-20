import { Point } from './Point'

class Mouse {
  public static getPosition(event: PointerEvent): Point {
    return new Point(event.pageX, event.pageY);
  }
  public static setCursorStyle(style: string): void {
    document.body.style.cursor = style;
  }
}

export { Mouse };