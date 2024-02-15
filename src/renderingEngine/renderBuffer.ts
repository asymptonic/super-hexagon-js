import chalk from "chalk";
import { frameBuffer, tick } from "..";
import { hslToRgb } from "../color";

export function renderBuffer() {
  let screenBuffer = "";

  // Header text
  const leftHeader = "SUPERB HEXAGON";
  const rightHeader = `Frame Buffer Dimentions [ ${frameBuffer[0].length} x ${frameBuffer.length} ]`;
  screenBuffer +=
    chalk.rgb(...hslToRgb(tick % 1, 1, 0.5)).bold(leftHeader) +
    new Array(frameBuffer[0].length - leftHeader.length - rightHeader.length)
      .fill(" ")
      .join("") +
    chalk.rgb(...hslToRgb(tick % 1, 1, 0.5))(rightHeader) +
    "\n";

  // Efficiently convert the frame buffer into a single string with color codes to be printed to the console
  for (const row of frameBuffer) {
    let lineBuffer = "";
    let prevInt = 0;

    for (let i = 0; i < row.length; i++) {
      if (row[i] !== prevInt) {
        screenBuffer +=
          prevInt === 0
            ? chalk.rgb(...hslToRgb(tick % 1, 1, 0.1))(lineBuffer)
            : chalk.rgb(...hslToRgb(tick % 1, 1, 0.5))(lineBuffer);
        lineBuffer = "";
      }
      prevInt = row[i];
      lineBuffer += row[i] === 0 ? " " : "=";
      // lineBuffer += row[i];
    }
    screenBuffer += "\n";
  }
  process.stdout.write(screenBuffer);
}
