import { applyCamera } from './camera';
import { drawLineToBuffer } from './drawLine';

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

export function drawHexagonLinesToBuffer(
  radius: number,
  pattern: number,
  offset: number,
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

  // Draw lines between the points of the hexagon
  for (let i = 0; i < points.length; i++) {
    const point1 = points[i];
    const point2 = points[(i + 1) % points.length];

    if (pattern === -1 || patterns[pattern][(i + offset) % points.length])
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
