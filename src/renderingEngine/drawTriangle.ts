import { frameBuffer, frameData, HSCALE, SCALE } from '..';
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

  const pixelA = pointToDecimalPixel(a);
  const pixelB = pointToDecimalPixel(b);
  const pixelC = pointToDecimalPixel(c);

  const rowMin = Math.floor(
    Math.max(Math.min(pixelA[0], pixelB[0], pixelC[0]), 0)
  );
  const rowMax = Math.ceil(
    Math.min(Math.max(pixelA[0], pixelB[0], pixelC[0]), height)
  );
  const colMin = Math.floor(
    Math.max(Math.min(pixelA[1], pixelB[1], pixelC[1]), 0)
  );
  const colMax = Math.ceil(
    Math.min(Math.max(pixelA[1], pixelB[1], pixelC[1]), width)
  );

  for (let row = rowMin; row < rowMax; row++) {
    for (let col = colMin; col < colMax; col++) {
      const x = ((col - 1 - width / 2) * HSCALE) / SCALE;
      const y = (height / 2 - row) / SCALE;

      if (isPointInTriangle(a, b, c, new Point(x, y))) {
        frameBuffer[row][col] = value;
      }
    }
  }

  frameData.triangleCount++;
}

function pointToDecimalPixel(point: Point): [number, number] {
  const width = frameBuffer[0].length;
  const height = frameBuffer.length;

  const col = (point.x * SCALE) / HSCALE + width / 2 + 1;
  const row = -(point.y * SCALE - height / 2);

  return [row, col];
}
