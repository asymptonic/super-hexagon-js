import { drawLineToBuffer } from "./drawLine";

export function drawHexagonToBuffer(radius: number, rotation: number) {
  const points: { x: number; y: number }[] = [
    { x: radius, y: 0 },
    { x: radius * 0.5, y: radius * 0.866 },
    { x: radius * -0.5, y: radius * 0.866 },
    { x: -radius, y: 0 },
    { x: radius * -0.5, y: radius * -0.866 },
    { x: radius * 0.5, y: radius * -0.866 },
  ];

  for (let i = 0; i < points.length; i++) {
    const point1 = points[i];
    const point2 = points[(i + 1) % points.length];

    drawLineToBuffer(
      1,
      point1.x * Math.cos(rotation) - point1.y * Math.sin(rotation),
      point1.y * Math.cos(rotation) + point1.x * Math.sin(rotation),
      point2.x * Math.cos(rotation) - point2.y * Math.sin(rotation),
      point2.y * Math.cos(rotation) + point2.x * Math.sin(rotation)
    );
  }
}
