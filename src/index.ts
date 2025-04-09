import {
  allObstaclePatterns,
  HEXAGON_THICKNESS,
  Obstacle,
} from './game/obstacles';
import { drawBackdropToBuffer } from './renderingEngine/drawBackdrop';
import {
  drawHexagonToBuffer,
  drawFilledInHexagonToBuffer,
  patterns,
} from './renderingEngine/drawHexagon';
import { drawHexagonLinesToBuffer } from './renderingEngine/drawHexagonLines';
import { drawPlayerToBuffer } from './renderingEngine/drawPlayer';
import { renderBuffer } from './renderingEngine/renderBuffer';

export const MODE: 'terminal' | 'html' = 'terminal';

export const FPS_CAP = 60;
export const TPS = 60;

export const SCALE = 18;
export const HSCALE = 0.45;

export const OBSTACLE_SPACING = 6;
const STARTING_PADDING = 7;

export let frameBuffer: number[][] = [];

export let color = 0;
export let rotation = 0;
export let playerRotation = 0;
export let playerRotationTarget = 0;
export let lastTickTimestamp = 0;

export let rotationSpeed = -0.005;

export const frameData = { startTimestamp: 0, triangleCount: 0 };

export let obstacles: { distance: number; obstacle: Obstacle }[] = [];

obstacles.push(generateNewObstacle());
obstacles.push(generateNewObstacle());
obstacles.push(generateNewObstacle());
obstacles.push(generateNewObstacle());
obstacles.push(generateNewObstacle());

function getCurrentMapLength() {
  if (obstacles.length === 0) return STARTING_PADDING;
  const finalObstacle = obstacles[obstacles.length - 1];
  return (
    finalObstacle.distance +
    finalObstacle.obstacle.obstaclePattern.equivalentLength()
  );
}

function generateNewObstacle(): (typeof obstacles)[0] {
  return {
    distance: getCurrentMapLength() + OBSTACLE_SPACING,
    obstacle: new Obstacle(
      allObstaclePatterns[
        Math.floor(Math.random() * allObstaclePatterns.length)
      ],
      Math.floor(Math.random() * 6)
    ),
  };
}

function runTick() {
  if (Date.now() - lastTickTimestamp < 1000 / TPS) return; // Cap Ticks Per Second

  // Remove past obstacles and add new ones
  obstacles = obstacles.filter(
    (o) => o.distance + o.obstacle.obstaclePattern.equivalentLength() + HEXAGON_THICKNESS > 0
  );
  if (getCurrentMapLength() < 26) obstacles.push(generateNewObstacle());

  playerRotation += (playerRotationTarget - playerRotation) / 3;

  // Update game variables
  color += 0.0005;
  obstacles.forEach((o) => (o.distance -= 0.1));
  rotation += rotationSpeed;

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
  frameBuffer = new Array(process.stdout.rows - 3)
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
    obstacle.obstacle.renderToBuffer(obstacle.distance, rotation);
  }

  // Center Hexagon + Player
  drawFilledInHexagonToBuffer(0, 1, rotation);
  drawHexagonLinesToBuffer(1, -1, 0, rotation);
  drawPlayerToBuffer(1.45, rotation + playerRotation);

  // Render out the buffer to the console
  console.clear();
  console.log(renderBuffer());

  isRenderingFrame = false;
}

setInterval(runTick);
setInterval(renderFrame);

function flipRotation() {
  rotationSpeed = -rotationSpeed;

  setTimeout(flipRotation, Math.random() * 12 * 1000 + 2000);
}

flipRotation();
