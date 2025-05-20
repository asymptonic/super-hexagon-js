import { color, frameBuffer, frameData, MODE } from '..';
import { hslToRgb, textBgRgb, textRgb } from '../color';

export function renderBuffer() {
  let screenBuffer = '';

  // Header text
  const leftHeader = 'SUPERB HEXAGON';
  const renderTime = Date.now() - frameData.startTimestamp;
  const rightHeader = `Frame Buffer Dimensions [ ${frameBuffer[0].length} x ${
    frameBuffer.length
  } ] Render Time [${renderTime < 10 ? '0' : ''}${renderTime}ms] [${
    frameData.triangleCount
  } Triangles]`;
  screenBuffer +=
    textRgb(leftHeader, ...hslToRgb(color % 1, 1, 0.5)) +
    new Array(frameBuffer[0].length - leftHeader.length - rightHeader.length)
      .fill(' ')
      .join('') +
    textRgb(rightHeader, ...hslToRgb(color % 1, 1, 0.5)) +
    '\n';

  // Efficiently convert the frame buffer into a single string with color codes to be printed to the console
  for (const row of frameBuffer) {
    let lineBuffer = '';
    let prevValue = 0;

    for (let i = 0; i < row.length; i++) {
      if (row[i] !== prevValue || i === row.length - 1) {
        screenBuffer +=
          prevValue === 0 // Backdrop
            ? textBgRgb(lineBuffer, ...hslToRgb(color % 1, 1, 0.1))
            : prevValue === 1 // Backdrop Light
            ? textBgRgb(lineBuffer, ...hslToRgb(color % 1, 1, 0.2))
            : prevValue === 8 // Wall Dark
            ? textBgRgb(lineBuffer, ...hslToRgb(color % 1, 1, 0.45))
            : prevValue === 9 // Wall Light
            ? textBgRgb(lineBuffer, ...hslToRgb(color % 1, 1, 0.5))
            : lineBuffer;
        lineBuffer = '';
      }
      prevValue = row[i];
      lineBuffer += ' ';
      // lineBuffer += row[i];
    }
    screenBuffer += MODE === 'html' ? '<br>' : '\n';
  }
  return screenBuffer;
}
