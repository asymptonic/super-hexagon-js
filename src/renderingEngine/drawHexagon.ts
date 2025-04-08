import { drawTriangleToBuffer } from './drawTriangle';
import { Point } from './utils/Point';

export const patterns: [
  boolean,
  boolean,
  boolean,
  boolean,
  boolean,
  boolean
][] = [
  [true, true, true, true, true, false],
  [true, true, true, true, false, false],
  [true, true, false, true, true, false],
  [true, true, true, false, true, false],
];

export function drawHexagonToBuffer(
  radius: number,
  thickness: number,
  pattern: number,
  offset: number,
  rotation: number,
  center?: boolean
) {
  const points: { x: number; y: number }[] = [
    { x: radius, y: 0 },
    { x: radius * 0.5, y: radius * 0.866 },
    { x: radius * -0.5, y: radius * 0.866 },
    { x: -radius, y: 0 },
    { x: radius * -0.5, y: radius * -0.866 },
    { x: radius * 0.5, y: radius * -0.866 },
  ];

  const radius2 = radius + thickness;

  const outerPoints: { x: number; y: number }[] = [
    { x: radius2, y: 0 },
    { x: radius2 * 0.5, y: radius2 * 0.866 },
    { x: radius2 * -0.5, y: radius2 * 0.866 },
    { x: -radius2, y: 0 },
    { x: radius2 * -0.5, y: radius2 * -0.866 },
    { x: radius2 * 0.5, y: radius2 * -0.866 },
  ];

  const cosr = Math.cos(rotation);
  const sinr = Math.sin(rotation);

  // Draw lines between the points of the hexagon
  for (let i = 0; i < points.length; i++) {
    const point1 = points[i];
    const point2 = points[(i + 1) % points.length];
    const point3 = outerPoints[i];
    const point4 = outerPoints[(i + 1) % outerPoints.length];

    if (pattern === -1 || patterns[pattern][(i + offset) % points.length]) {
      const a = new Point(
        point1.x * cosr - point1.y * sinr,
        point1.y * cosr + point1.x * sinr
      ).applyCamera();
      const b = new Point(
        point2.x * cosr - point2.y * sinr,
        point2.y * cosr + point2.x * sinr
      ).applyCamera();
      const c = new Point(
        point3.x * cosr - point3.y * sinr,
        point3.y * cosr + point3.x * sinr
      ).applyCamera();
      const d = new Point(
        point4.x * cosr - point4.y * sinr,
        point4.y * cosr + point4.x * sinr
      ).applyCamera();

      const fillValue = 9;
      drawTriangleToBuffer(fillValue, a, b, c);
      drawTriangleToBuffer(fillValue, d, b, c);
    }
  }
}
