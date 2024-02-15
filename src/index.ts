import chalk from "chalk";
import { hslToRgb } from "./color";
import { drawLineToBuffer } from "./renderingEngine/drawLine";
import { renderBuffer } from "./renderingEngine/renderBuffer";
import { drawHexagonToBuffer, patterns } from "./renderingEngine/drawHexagon";

export const obstacleSpacing = 3.5;

export let tick = 0;
export let rotation = 0;
export const scale = 7;
export const hscale = 0.45;
export let frameBuffer: number[][] = [[]];
// Buffer Values:
// 0 - Empty
// 1 - Wall Light
// 2 - Wall Dark

export let position = 0;
export let obstacles: { distance: number; pattern: number; offset: number }[] =
  [];

obstacles.push({ distance: 7, pattern: 0, offset: 0 });
obstacles.push({ distance: 7 + obstacleSpacing * 1, pattern: 2, offset: 3 });
obstacles.push({ distance: 7 + obstacleSpacing * 2, pattern: 2, offset: 1 });
obstacles.push({ distance: 7 + obstacleSpacing * 3, pattern: 0, offset: 3 });

function runTick() {
  console.clear();
  frameBuffer = new Array(process.stdout.rows - 2)
    .fill(0)
    .map(() => new Array(process.stdout.columns).fill(0));

  // drawLineToBuffer(1, -1, 1, 1, -1);
  // drawLineToBuffer(1, -2, -1, 2, 1);
  // drawLineToBuffer(1, 5, 0, -5, 0);
  // drawLineToBuffer(1, 1, -1, 2, 1);

  // Center Hexagon
  drawHexagonToBuffer(1, -1, 0, rotation);

  obstacles = obstacles.filter((obstacle) => obstacle.distance > position + 1);
  if (obstacles.length < 4) {
    obstacles.push({
      distance: obstacles[obstacles.length - 1].distance + obstacleSpacing,
      offset: Math.floor(Math.random() * 6),
      pattern: Math.floor(Math.random() * patterns.length),
    });
  }

  for (const obstacle of obstacles) {
    drawHexagonToBuffer(obstacle.distance - position, obstacle.pattern, obstacle.offset, rotation);
  }

  renderBuffer();
  tick += 0.002;
  position += 0.1;
  rotation += 0.05;
}

setInterval(runTick, 33);
