import chalk from 'chalk';
import { frameBuffer, MODE, tick } from '..';
import { hslToRgb, htmlColor, rgbToHex } from '../color';

export function renderBuffer() {
  let screenBuffer = '';

  // Header text
  const leftHeader = 'SUPERB HEXAGON';
  const rightHeader = `Frame Buffer Dimentions [ ${frameBuffer[0].length} x ${frameBuffer.length} ]`;
  screenBuffer +=
    chalk.rgb(...hslToRgb(tick % 1, 1, 0.5)).bold(leftHeader) +
    new Array(frameBuffer[0].length - leftHeader.length - rightHeader.length)
      .fill(' ')
      .join('') +
    chalk.rgb(...hslToRgb(tick % 1, 1, 0.5))(rightHeader) +
    '\n';

  // Efficiently convert the frame buffer into a single string with color codes to be printed to the console
  for (const row of frameBuffer) {
    let lineBuffer = '';
    let prevInt = 0;

    for (let i = 0; i < row.length; i++) {
      if (row[i] !== prevInt || i === row.length - 1) {
        // screenBuffer +=
        //   prevInt === 0 // Backdrop
        //     ? htmlColor(rgbToHex(...hslToRgb(tick % 1, 1, 0.1)), lineBuffer)
        //     : prevInt === 1 // Backdrop Light
        //     ? htmlColor(rgbToHex(...hslToRgb(tick % 1, 1, 0.2)), lineBuffer)
        //     : prevInt === 9 // Wall
        //     ? htmlColor(rgbToHex(...hslToRgb(tick % 1, 1, 0.5)), lineBuffer)
        //     : lineBuffer;
        screenBuffer +=
          prevInt === 0 // Backdrop
            ? chalk.bgRgb(...hslToRgb(tick % 1, 1, 0.1))(lineBuffer)
            : prevInt === 1 // Backdrop Light
            ? chalk.bgRgb(...hslToRgb(tick % 1, 1, 0.2))(lineBuffer)
            : prevInt === 9 // Wall
            ? chalk.bgRgb(...hslToRgb(tick % 1, 1, 0.5))(lineBuffer)
            : lineBuffer;
        lineBuffer = '';
      }
      prevInt = row[i];
      lineBuffer += " ";
      // lineBuffer += row[i];
    }
    screenBuffer += MODE === 'html' ? '<br>' : '\n';
  }
  return screenBuffer;
}
