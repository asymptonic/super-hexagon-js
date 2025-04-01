import { frameBuffer, hscale, rotation, scale } from '..';
import { applyCamera } from './camera';

export function drawBackdropToBuffer() {
  const width = frameBuffer[0].length;
  const height = frameBuffer.length;

  for (let row = 0; row < height; row++) {
    for (let col = 0; col < width; col++) {
      let [x, y] = [
        ((col - 1 - width / 2) * hscale) / scale,
        (height / 2 - row) / scale
      ];

      [x, y] = [
        x * Math.cos(-rotation) - y * Math.sin(-rotation),
        y * Math.cos(-rotation) + x * Math.sin(-rotation),
      ];

      const angle = Math.atan2(y, x);
      [x, y] = applyCamera(x, y);

      if (
        (angle < Math.PI / 3 && angle > 0) ||
        (angle > (2 * Math.PI) / 3 && angle < Math.PI) ||
        (angle > (-2 * Math.PI) / 3 && angle < -Math.PI / 3)
      ) {
        frameBuffer[row][col] = 1;
      }
    }
  }
}
