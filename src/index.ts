import { drawBackdropToBuffer } from './renderingEngine/drawBackdrop';
import {
  drawHexagonToBuffer,
  drawFilledInHexagonToBuffer,
  patterns,
} from './renderingEngine/drawHexagon';
import { drawPlayerToBuffer } from './renderingEngine/drawPlayer';
import { renderBuffer } from './renderingEngine/renderBuffer';

export const MODE: 'terminal' | 'html' = 'terminal';

export const FPS_CAP = 60;
export const TPS = 60;

export const SCALE = 20;
export const HSCALE = 0.45;

export const OBSTACLE_SPACING = 4;
export const HEXAGON_THICKNESS = 0.85;

export let frameBuffer: number[][] = [];

export let tick = 0;
export let rotation = 0;
export let playerRotation = 0;
export let playerRotationTarget = 0;
export let lastTickTimestamp = 0;

export const frameData = { startTimestamp: 0, triangleCount: 0 };

export let position = 0;
export let obstacles: { distance: number; pattern: number; offset: number }[] =
  [];

obstacles.push({ distance: 7, pattern: 0, offset: 0 });
obstacles.push({ distance: 7 + OBSTACLE_SPACING * 1, pattern: 2, offset: 3 });
obstacles.push({ distance: 7 + OBSTACLE_SPACING * 2, pattern: 2, offset: 1 });
obstacles.push({ distance: 7 + OBSTACLE_SPACING * 3, pattern: 0, offset: 3 });

function runTick() {
  if (Date.now() - lastTickTimestamp < 1000 / TPS) return; // Cap Ticks Per Second

  // Remove past obstacles and add new ones
  obstacles = obstacles.filter(
    (obstacle) => obstacle.distance > position + 1 - HEXAGON_THICKNESS
  );
  if (obstacles.length < 4) {
    obstacles.push({
      distance: obstacles[obstacles.length - 1].distance + OBSTACLE_SPACING,
      offset: Math.floor(Math.random() * 6),
      pattern: Math.floor(Math.random() * patterns.length),
    });
  }

  playerRotation += (playerRotationTarget - playerRotation) / 3;

  // Update game variables
  tick += 0.0005;
  position += 0.1;
  rotation += 0.005;

  lastTickTimestamp = Date.now();
}

process.stdin.setRawMode(true);
process.stdin.resume();

process.stdin.on('data', (data) => {
  const value = data.toString();

  if (value == '\u001B\u005B\u0043') {
    playerRotationTarget -= 0.5;
  }
  if (value == '\u001B\u005B\u0044') {
    playerRotationTarget += 0.5;
  }

  if (value == '\u0003') {
    process.exit();
  } // ctrl-c
});

let isRenderingFrame = false;

function renderFrame() {
  if (
    isRenderingFrame || // Cancel new render if already in process of rendering a frame
    Date.now() - frameData.startTimestamp < 1000 / FPS_CAP // Limit FPS
  )
    return;

  isRenderingFrame = true;

  // Clear the buffer for new frame
  frameBuffer = new Array(process.stdout.rows - 2)
    .fill(0)
    .map(() => new Array(process.stdout.columns).fill(0));

  frameData.startTimestamp = Date.now();
  frameData.triangleCount = 0;

  // TEST PATTERN
  // drawLineToBuffer(9, -1, 1, 1, -1);
  // drawLineToBuffer(9, -2, -1, 2, 1);
  // drawLineToBuffer(9, 5, 0, -5, 0);
  // drawLineToBuffer(9, 1, -1, 2, 1);
  // TRIANGLE TEST PATTERN
  // drawTriangleToBuffer(9, new Point(-0.25, 0.25), new Point(0.25, -0.25), new Point(0.25, 0.35));

  drawBackdropToBuffer();

  // Draw out obstacles to buffer
  for (const obstacle of obstacles) {
    drawHexagonToBuffer(
      obstacle.distance - position,
      HEXAGON_THICKNESS,
      obstacle.pattern,
      obstacle.offset,
      rotation
    );
  }

  // Center Hexagon + Player
  drawFilledInHexagonToBuffer(0, 1, rotation);
  drawHexagonToBuffer(1, 0.2, -1, 0, rotation, true);
  drawPlayerToBuffer(1.45, rotation + playerRotation);

  // Render out the buffer to the console
  console.clear();
  process.stdout.write(renderBuffer());

  isRenderingFrame = false;
}

setInterval(runTick);
setInterval(renderFrame);
