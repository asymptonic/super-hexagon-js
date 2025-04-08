import { frameBuffer, HSCALE, SCALE } from '..';
import { Point } from './utils/Point';

let s1 = 0;
let s2 = 0;
let s3 = 0;
let s4 = 0;
let w1 = 0;
let w2 = 0;

// youtu.be/HYAgJN3x4GA
export function isPointInTriangle(a: Point, b: Point, c: Point, p: Point) {
  s1 = c.y - a.y;
  s2 = c.x - a.x;
  s3 = b.y - a.y;
  s4 = p.y - a.y;

  w1 = (a.x * s1 + s4 * s2 - p.x * s1) / (s3 * s2 - (b.x - a.x) * s1);
  w2 = (s4 - w1 * s3) / s1;
  return w1 >= 0 && w2 >= 0 && w1 + w2 <= 1;
}

export function drawTriangleToBuffer(
  value: number,
  a: Point,
  b: Point,
  c: Point
) {
  const width = frameBuffer[0].length;
  const height = frameBuffer.length;

  for (let row = 0; row < height; row++) {
    for (let col = 0; col < width; col++) {
      const x = ((col - 1 - width / 2) * HSCALE) / SCALE;
      const y = (height / 2 - row) / SCALE;

      if (isPointInTriangle(a, b, c, new Point(x, y))) {
        frameBuffer[row][col] = value;
      }
    }
  }
}
