import { frameBuffer, scale } from "..";

export function drawLineToBuffer(
  value: number,
  x1: number,
  y1: number,
  x2: number,
  y2: number
) {
  let width = frameBuffer[0].length;
  let height = frameBuffer.length;

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
      const slope = (y2 - y1) / (x2 - x1);

      const x = ((col - width / 2) * 0.45) / scale;
      const y = Math.round(height / 2 - (slope * (x - x1) + y1) * scale);

      if (y >= 0 && y < height && x >= x1 && x <= x2) {
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
      const inverseSlope = (x2 - x1) / (y2 - y1);

      const y = (height / 2 - row) / scale;
      const x = Math.round(
        width / 2 + ((inverseSlope * (y - y2) + x2) * scale) / 0.45
      );

      if (x >= 0 && x < width && y <= y2 && y >= y1) {
        frameBuffer[row][x] = value;
        if (x + 1 < width) {
          frameBuffer[row][x + 1] = value;
        }
      }
    }
  }
}
