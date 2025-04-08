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

export function fillInHexagonToBuffer(
  value: number,
  radius: number,
  rotation: number
) {
  const points: { x: number; y: number }[] = [
    { x: radius, y: 0 },
    { x: radius * 0.5, y: radius * 0.866 },
    { x: radius * -0.5, y: radius * 0.866 },
    { x: -radius, y: 0 },
    { x: radius * -0.5, y: radius * -0.866 },
    { x: radius * 0.5, y: radius * -0.866 },
  ];

  const cosr = Math.cos(rotation);
  const sinr = Math.sin(rotation);

  const a = new Point(
    points[0].x * cosr - points[0].y * sinr,
    points[0].y * cosr + points[0].x * sinr
  ).applyCamera();
  const b = new Point(
    points[1].x * cosr - points[1].y * sinr,
    points[1].y * cosr + points[1].x * sinr
  ).applyCamera();
  const c = new Point(
    points[2].x * cosr - points[2].y * sinr,
    points[2].y * cosr + points[2].x * sinr
  ).applyCamera();
  const d = new Point(
    points[3].x * cosr - points[3].y * sinr,
    points[3].y * cosr + points[3].x * sinr
  ).applyCamera();
  const e = new Point(
    points[4].x * cosr - points[4].y * sinr,
    points[4].y * cosr + points[4].x * sinr
  ).applyCamera();
  const f = new Point(
    points[5].x * cosr - points[5].y * sinr,
    points[5].y * cosr + points[5].x * sinr
  ).applyCamera();

  drawTriangleToBuffer(value, a, b, f);
  drawTriangleToBuffer(value, b, f, c);
  drawTriangleToBuffer(value, c, e, f);
  drawTriangleToBuffer(value, c, d, e);
}
