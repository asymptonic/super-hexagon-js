export function hslToRgb(
  h: number,
  s: number,
  l: number
): [number, number, number] {
  let r, g, b;

  if (s === 0) {
    r = g = b = l; // achromatic
  } else {
    const q = l < 0.5 ? l * (1 + s) : l + s - l * s;
    const p = 2 * l - q;
    r = hueToRgb(p, q, h + 1 / 3);
    g = hueToRgb(p, q, h);
    b = hueToRgb(p, q, h - 1 / 3);
  }

  return [Math.round(r * 255), Math.round(g * 255), Math.round(b * 255)];
}

function hueToRgb(p: number, q: number, t: number) {
  if (t < 0) t += 1;
  if (t > 1) t -= 1;
  if (t < 1 / 6) return p + (q - p) * 6 * t;
  if (t < 1 / 2) return q;
  if (t < 2 / 3) return p + (q - p) * (2 / 3 - t) * 6;
  return p;
}

export function rgbToHex(r: number, g: number, b: number) {
  return (
    '#' +
    [r, g, b]
      .map((x) => {
        const hex = x.toString(16);
        return hex.length === 1 ? '0' + hex : hex;
      })
      .join('')
  );
}

export function htmlColor(color: string, text: string) {
  return `<span class="hexagon-text" style="background-color: ${color};">${text}</span>`;
}

export function textBgRgb(text: string, r: number, g: number, b: number) {
  return `\x1b[48;2;${r};${g};${b}m${text}\x1b[0m`;
}

export function textRgb(text: string, r: number, g: number, b: number) {
  return `\x1b[38;2;${r};${g};${b}m${text}\x1b[0m`;
}
