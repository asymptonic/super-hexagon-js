import chalk from "chalk";
import { frameBuffer, tick } from "..";
import { hslToRgb } from "../color";

export function renderBuffer() {
  let screenBuffer = "";
  for (const row of frameBuffer) {
    let lineBuffer = "";
    let prevInt = 0;

    for (let i = 0; i < row.length; i++) {
      if (row[i] !== prevInt) {
        screenBuffer +=
          prevInt === 0
            ? chalk.rgb(...hslToRgb(tick % 1, 1, 0.1))(lineBuffer)
            : chalk.bgRgb(...hslToRgb(tick % 1, 1, 0.5))(lineBuffer);
        lineBuffer = "";
      }
      prevInt = row[i];
      lineBuffer += row[i] === 0 ? " " : " ";
      // lineBuffer += row[i];
    }
    screenBuffer += "\n"
    // console.log(chalk.rgb(...hslToRgb(tick % 1, 1, 0.1))(lineBuffer))
  }
  process.stdout.write(screenBuffer);
}