import { frameBuffer, hscale, scale } from "..";

export function drawLineToBuffer(
  value: number,
  x1: number,
  y1: number,
  x2: number,
  y2: number
) {
  const width = frameBuffer[0].length;
  const height = frameBuffer.length;

  if (Math.abs(y2 - y1) <= Math.abs(x2 - x1)) {
    if (x1 > x2) {
      let temp = x1;
      x1 = x2;
      x2 = temp;
      temp = y1;
      y1 = y2;
      y2 = temp;
    }

    for (let col = 0; col < width; col++) {
      const x = ((col - width / 2) * hscale) / scale;
      if (x < x1 || x > x2) continue;

      const slope = (y2 - y1) / (x2 - x1);
      const y = Math.round(height / 2 - (slope * (x - x1) + y1) * scale);

      if (y >= 0 && y < height) {
        frameBuffer[y][col] = value;
      }
    }
  } else {
    if (y1 > y2) {
      let temp = x1;
      x1 = x2;
      x2 = temp;
      temp = y1;
      y1 = y2;
      y2 = temp;
    }

    for (let row = 0; row < height; row++) {
      const y = (height / 2 - row) / scale;
      if (y > y2 || y < y1) continue;

      const inverseSlope = (x2 - x1) / (y2 - y1);
      const x = Math.round(
        width / 2 + ((inverseSlope * (y - y2) + x2) * scale) / hscale
      );

      if (x >= 0 && x < width) {
        frameBuffer[row][x] = value;
        if (x + 1 < width) {
          frameBuffer[row][x + 1] = value;
        }
      }
    }
  }
}
