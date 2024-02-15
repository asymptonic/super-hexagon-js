import chalk from "chalk";
import { hslToRgb } from "./color";
import { drawLineToBuffer } from "./renderingEngine/drawLine";
import { renderBuffer } from "./renderingEngine/renderBuffer";
import { drawHexagonToBuffer } from "./renderingEngine/drawHexagon";

export let tick = 0;
export let rotation = 0;
export const scale = 5;
export let frameBuffer: number[][] = [[]];
// Buffer Values:
// 0 - Empty
// 1 - Wall Light
// 2 - Wall Dark

function runTick() {
  console.clear();
  frameBuffer = new Array(process.stdout.rows - 2)
    .fill(0)
    .map(() => new Array(process.stdout.columns).fill(0));

  const leftHeader = "SUPERB HEXAGON";
  const rightHeader = `Frame Buffer Dimentions [ ${frameBuffer[0].length} x ${frameBuffer.length} ]`;
  console.log(
    chalk.rgb(...hslToRgb(tick % 1, 1, 0.5)).bold(leftHeader) +
      new Array(frameBuffer[0].length - leftHeader.length - rightHeader.length)
        .fill(" ")
        .join("") +
      chalk.rgb(...hslToRgb(tick % 1, 1, 0.5))(rightHeader)
  );

  // drawLineToBuffer(1, -1, 1, 1, -1);
  // drawLineToBuffer(1, -2, -1, 2, 1);
  // drawLineToBuffer(1, 5, 0, -5, 0);
  // drawLineToBuffer(1, 1, -1, 2, 1);

  // drawLineToBuffer(1, -3, 0, 3, 0);
  drawHexagonToBuffer(1, rotation);
  drawHexagonToBuffer(5, rotation);
  drawHexagonToBuffer(7, rotation);

  renderBuffer();
  tick += 0.002;
  rotation += 0.05
}

setInterval(runTick, 33);
