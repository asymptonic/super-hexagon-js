import { frameBuffer, hscale, rotation, scale } from '..';
import { unapplyCamera } from './camera';

export function drawBackdropToBuffer() {
	const width = frameBuffer[0].length;
	const height = frameBuffer.length;

	for (let row = 0; row < height; row++) {
		for (let col = 0; col < width; col++) {
			let [x, y] = [((col - 1 - width / 2) * hscale) / scale, (height / 2 - row) / scale];

			[x, y] = unapplyCamera(x, y);

			const angle = (Math.atan2(y, x) + 4 * Math.PI - (rotation % (2 * Math.PI))) % (2 * Math.PI);

			if (
				(angle < Math.PI / 3 && angle > 0) ||
				(angle > (2 * Math.PI) / 3 && angle < Math.PI) ||
				(angle > (4 * Math.PI) / 3 && angle < (5 * Math.PI) / 3)
			) {
				frameBuffer[row][col] = 1;
			}
		}
	}
}
