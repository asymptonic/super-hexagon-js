import { applyCamera } from '../camera';

export class Point {
  public x: number;
  public y: number;

  constructor(x: number, y: number) {
    this.x = x;
    this.y = y;
  }

  public applyCamera() {
    const transformedPoint = applyCamera(this.x, this.y);

    this.x = transformedPoint[0];
    this.y = transformedPoint[1];

    return this;
  }
}
