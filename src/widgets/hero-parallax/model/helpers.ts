import type { PositionRange } from './types';

/**
 * Обмежує value заданим діапазоном.
 */
export function clamp(
  value: number,
  min = 0,
  max = 1,
) {
  return Math.min(
    Math.max(value, min),
    max,
  );
}

/**
 * Linear interpolation.
 *
 * progress = 0 → from
 * progress = 1 → to
 */
export function lerp(
  from: number,
  to: number,
  progress: number,
) {
  return from + (to - from) * progress;
}

/**
 * Перетворює value на progress 0..1 всередині заданого діапазону.
 *
 * Працює також із reversed range:
 *
 * getProgress(1.33, 1.25, 1.33) → 0
 * getProgress(1.33, 1.25, 1.25) → 1
 *
 * Значення поза діапазоном автоматично clamp-яться.
 */
export function getProgress(
  from: number,
  to: number,
  value: number,
) {
  if (from === to) {
    return 0;
  }

  return clamp(
    (value - from) / (to - from),
  );
}

/**
 * Плавно змішує дві start/end позиції.
 */
export function mixRange(
  from: PositionRange,
  to: PositionRange,
  progress: number,
): PositionRange {
  return {
    start: lerp(
      from.start,
      to.start,
      progress,
    ),

    end: lerp(
      from.end,
      to.end,
      progress,
    ),
  };
}