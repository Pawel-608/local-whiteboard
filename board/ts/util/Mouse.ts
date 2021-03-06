import { Point } from './Point'

class Mouse {
  public static getPosition(event: PointerEvent): Point {
    return new Point(event.pageX, event.pageY);
  }
}

export { Mouse };