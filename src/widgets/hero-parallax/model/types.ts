export type Viewport = {
  width: number;
  height: number;
};

export type PositionRange = {
  start: number;
  end: number;
};

export type ImagePositions = {
  mountains: PositionRange;
  foreground: PositionRange;
};

export type ParallaxPositions = ImagePositions & {
  skyEnd: number;
  title: PositionRange;
};