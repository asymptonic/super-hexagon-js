import chalk from "chalk";
import { hslToRgb } from "./color";
import { drawLineToBuffer } from "./renderingEngine/line";

let tick = 0;
export const scale = 10;
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

  const leftHeader = "SUPER HEXAGON";
  const rightHeader = `Frame Buffer Dimentions [ ${frameBuffer[0].length} x ${frameBuffer.length} ]`;
  console.log(
    chalk.rgb(...hslToRgb(tick % 1, 1, 0.5)).bold(leftHeader) +
      new Array(frameBuffer[0].length - leftHeader.length - rightHeader.length)
        .fill(" ")
        .join("") +
      chalk.rgb(...hslToRgb(tick % 1, 1, 0.5))(rightHeader)
  );

  drawLineToBuffer(1, -1, 1, 1, -1);
  drawLineToBuffer(1, -2, -1, 2, 1);
  drawLineToBuffer(1, 5, 0, -5, 0);
  drawLineToBuffer(1, 1, -1, 2, 1);

  for (const row of frameBuffer) {
    let lineBuffer = "";
    let prevInt = 0;

    for (let i = 0; i < row.length; i++) {
      if (row[i] !== prevInt) {
        process.stdout.write(
          prevInt === 0
            ? chalk.rgb(...hslToRgb(tick % 1, 1, 0.1))(lineBuffer)
            : chalk.bgRgb(...hslToRgb(tick % 1, 1, 0.5))(lineBuffer)
        );
        lineBuffer = "";
      }
      prevInt = row[i];
      lineBuffer += row[i] === 0 ? " " : " ";
    }
    console.log();
    // console.log(chalk.rgb(...hslToRgb(tick % 1, 1, 0.1))(lineBuffer))
  }

  tick += 0.02;
}


setInterval(runTick, 500);
