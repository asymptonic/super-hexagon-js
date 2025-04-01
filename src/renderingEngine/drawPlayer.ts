import { applyCamera } from './camera';
import { drawLineToBuffer } from './drawLine';

export function drawPlayerToBuffer(radius: number, rotation: number) {
  const points: { x: number; y: number }[] = [
    { x: 0, y: radius + 0.15 },
    { x: 0.1, y: radius },
    { x: -0.1, y: radius },
  ];

  // Draw lines between the points of the triangle
  for (let i = 0; i < points.length; i++) {
    const point1 = points[i];
    const point2 = points[(i + 1) % points.length];

    drawLineToBuffer(
      9,
      ...applyCamera(
        point1.x * Math.cos(rotation) - point1.y * Math.sin(rotation),
        point1.y * Math.cos(rotation) + point1.x * Math.sin(rotation)
      ),
      ...applyCamera(
        point2.x * Math.cos(rotation) - point2.y * Math.sin(rotation),
        point2.y * Math.cos(rotation) + point2.x * Math.sin(rotation)
      )
    );
  }
}
