import { drawHexagonToBuffer } from '../rendering/drawHexagon';

export const HEXAGON_THICKNESS = 0.9;

export class ObstaclePattern {
  public readonly layers: [
    boolean,
    boolean,
    boolean,
    boolean,
    boolean,
    boolean
  ][];
  public readonly spacing: number;

  constructor(layers: typeof this.layers, spacing: number) {
    this.layers = layers;
    this.spacing = spacing;
  }

  // Return the total length the obstacle takes up
  public equivalentLength() {
    return this.spacing * this.layers.length + HEXAGON_THICKNESS;
  }
}

export class Obstacle {
  obstaclePattern: ObstaclePattern;
  offset: number;

  constructor(pattern: ObstaclePattern, offset: number) {
    this.obstaclePattern = pattern;
    this.offset = offset;
  }

  public renderToBuffer(distance: number, rotation: number) {
    for (let i = 0; i < this.obstaclePattern.layers.length; i++) {
      const radiusOfHexagon = distance + i * this.obstaclePattern.spacing;
      if (radiusOfHexagon < 0) continue;
      drawHexagonToBuffer(
        radiusOfHexagon,
        HEXAGON_THICKNESS,
        this.obstaclePattern.layers[i],
        this.offset,
        rotation
      );
    }
  }
}

const obstaclePatternSolo1 = new ObstaclePattern(
  [[true, true, true, true, true, false]],
  0
);
const obstaclePatternSolo2 = new ObstaclePattern(
  [[true, true, true, true, false, false]],
  0
);
const obstaclePatternSolo3 = new ObstaclePattern(
  [[true, true, false, true, true, false]],
  0
);
const obstaclePatternSolo4 = new ObstaclePattern(
  [[true, true, true, false, true, false]],
  0
);

const obstaclePatternRain = new ObstaclePattern(
  [
    [true, false, true, false, true, false],
    [false, true, false, true, false, true],
    [true, false, true, false, true, false],
    [false, true, false, true, false, true],
    [true, false, true, false, true, false],
    [false, true, false, true, false, true],
  ],
  3 * HEXAGON_THICKNESS
);

const obstaclePatternFourSpin = new ObstaclePattern(
  [
    [true, true, true, true, true, false],
    [true, false, false, false, false, false],
    [true, false, false, false, false, false],
    [true, false, false, false, false, false],
    [true, false, false, false, false, false],
    [true, false, false, false, false, false],
    [true, false, false, false, false, false],
    [true, false, false, false, false, false],
    [true, false, true, true, true, true],
    [true, false, false, false, false, false],
    [true, false, false, false, false, false],
    [true, false, false, false, false, false],
    [true, false, false, false, false, false],
    [true, false, false, false, false, false],
    [true, false, false, false, false, false],
    [true, false, false, false, false, false],
    [true, true, true, true, true, false],
  ],
  HEXAGON_THICKNESS
);

const obstaclePatternDoubleWhirlpool = new ObstaclePattern(
  [
    [false, true, true, false, true, true],
    [false, false, true, false, false, true],
    [true, false, false, true, false, false],
    [false, true, false, false, true, false],
    [false, false, true, false, false, true],
    [true, false, false, true, false, false],
    [false, true, false, false, true, false],
    [false, false, true, false, false, true],
    [true, false, true, true, false, true],
  ],
  HEXAGON_THICKNESS
);

export const soloObstaclePatterns = [
  obstaclePatternSolo1,
  obstaclePatternSolo2,
  obstaclePatternSolo3,
  obstaclePatternSolo4,
];

export const complexObstaclePatterns = [
  obstaclePatternRain,
  obstaclePatternDoubleWhirlpool,
  obstaclePatternFourSpin,
];

export const allObstaclePatterns = [
  ...soloObstaclePatterns,
  ...complexObstaclePatterns,
];
