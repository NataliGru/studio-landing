export type Viewport = {
  width: number;
  height: number;
};

type RangePosition = {
  start: number;
  end: number;
};

type ImagePositions = {
  mountains: RangePosition;
  foreground: RangePosition;
};

export const IMAGE_WIDTH = 1920;
export const IMAGE_HEIGHT = 2070;

export const DEFAULT_VIEWPORT: Viewport = {
  width: 1440,
  height: 900,
};

function clamp(value: number, min = 0, max = 1) {
  return Math.min(Math.max(value, min), max);
}

function lerp(from: number, to: number, progress: number) {
  return from + (to - from) * progress;
}

function inverseLerp(from: number, to: number, value: number) {
  if (from === to) {
    return 0;
  }

  return clamp((value - from) / (to - from));
}

/**
 * MOBILE
 *
 * Калібрування:
 *
 * 375×667
 * mountains  115 → 60
 * foreground 110 → 55
 *
 * 390–440 × ~840–950
 * mountains  ~135 → 82–90
 * foreground ~110–130 → 75–85
 *
 * Основна залежність тут — aspect ratio.
 */
function getMobileImagePositions(
  width: number,
  height: number,
): ImagePositions {
  const aspectRatio = width / height;

  const tallFactor = inverseLerp(0.56, 0.39, aspectRatio);

  return {
    mountains: {
      start: lerp(115, 135, tallFactor),
      end: lerp(60, 90, tallFactor),
    },

    foreground: {
      start: lerp(110, 130, tallFactor),
      end: lerp(55, 85, tallFactor),
    },
  };
}

/**
 * TABLET
 *
 * вийшла дуже стабільна композиція:
 *
 * 540×720
 * 768×1024
 * 853×1280
 * 912×1368
 * 1024×1366
 *
 * mountains ≈ 85 → 35
 * foreground ≈ 60 → 30
 */
function getTabletImagePositions(): ImagePositions {
  return {
    mountains: {
      start: 85,
      end: 35,
    },

    foreground: {
      start: 60,
      end: 30,
    },
  };
}

/**
 * LANDSCAPE DESKTOP
 *
 */
function getLandscapeImagePositions(
  width: number,
  height: number,
): ImagePositions {
  const renderedImageHeight = width * (IMAGE_HEIGHT / IMAGE_WIDTH);

  const visibleRatio = height / renderedImageHeight;

  const desktopWidthFactor = inverseLerp(1024, 1920, width);

  const largeWidthFactor = inverseLerp(1920, 2560, width);

  const largeTallFactor = inverseLerp(0.53, 0.603, visibleRatio);

  const imageScale = width / IMAGE_WIDTH;

  let mountainsStart =
    20 + 95 * (visibleRatio - 0.543) - 5 * (imageScale - 0.533);

  mountainsStart += largeWidthFactor * (3 - 8 * largeTallFactor);

  const mountainsEnd = lerp(-16, -15, largeWidthFactor);

  const foregroundBaseOffset =
    -10 + 10 * desktopWidthFactor * desktopWidthFactor;

  const largeForegroundOffset =
    largeWidthFactor * lerp(5, -7, inverseLerp(0.391, 0.522, visibleRatio));

  const foregroundStart =
    mountainsStart + foregroundBaseOffset + largeForegroundOffset;

  const desktopEndCorrection = inverseLerp(1200, 1440, width);

  const foregroundEnd = -22 - desktopEndCorrection - 9 * largeWidthFactor;

  return {
    mountains: {
      start: mountainsStart,
      end: mountainsEnd,
    },

    foreground: {
      start: foregroundStart,
      end: foregroundEnd,
    },
  };
}

/**
 * PORTRAIT / SQUARE DESKTOP
 *
 * Калібрування:
 *
 * 1280×1024
 * mountains   40 → -2
 * foreground  35 → -10
 *
 * 1200×1200
 * mountains   55 → -2
 * foreground  40 → -10
 *
 * ~1280×1440 → 1764×1964
 * mountains   ~67 → 15
 * foreground  ~60 → 8
 *
 */
function getPortraitImagePositions(
  width: number,
  height: number,
): ImagePositions {
  const aspectRatio = width / height;

  const squareFactor = inverseLerp(1.25, 1, aspectRatio);

  const portraitFactor = inverseLerp(1, 0.75, aspectRatio);

  const mountainsStart =
    aspectRatio >= 1
      ? lerp(40, 55, squareFactor)
      : lerp(55, 85, portraitFactor);

  const mountainsEnd =
    aspectRatio >= 1 ? -2 : lerp(-2, 20, Math.pow(portraitFactor, 0.35));

  const foregroundStart =
    aspectRatio >= 1
      ? lerp(35, 40, squareFactor)
      : lerp(40, 75, Math.pow(portraitFactor, 0.7));

  const foregroundEnd =
    aspectRatio >= 1 ? -10 : lerp(-10, 13, Math.pow(portraitFactor, 0.25));

  return {
    mountains: {
      start: mountainsStart,
      end: mountainsEnd,
    },

    foreground: {
      start: foregroundStart,
      end: foregroundEnd,
    },
  };
}

function mixImagePositions(
  from: ImagePositions,
  to: ImagePositions,
  progress: number,
): ImagePositions {
  return {
    mountains: {
      start: lerp(from.mountains.start, to.mountains.start, progress),
      end: lerp(from.mountains.end, to.mountains.end, progress),
    },

    foreground: {
      start: lerp(from.foreground.start, to.foreground.start, progress),
      end: lerp(from.foreground.end, to.foreground.end, progress),
    },
  };
}

function getImagePositions(width: number, height: number): ImagePositions {
  const aspectRatio = width / height;

  const mobile = getMobileImagePositions(width, height);

  const tablet = getTabletImagePositions();

  /**
   * MOBILE → TABLET
   *
   * 440 і менше:
   * mobile composition
   *
   * 600 і більше:
   * tablet composition
   */
  if (width < 600) {
    const tabletBlend = inverseLerp(440, 600, width);

    return mixImagePositions(mobile, tablet, tabletBlend);
  }

  /**
   * Landscape навіть на 1024px —
   * це вже desktop landscape.
   *
   * Наприклад 1024×600.
   */
  if (aspectRatio >= 1.3) {
    return getLandscapeImagePositions(width, height);
  }

  /**
   * 600–1024 portrait/tablet.
   */
  if (width <= 1024) {
    return tablet;
  }

  const portrait = getPortraitImagePositions(width, height);

  const landscape = getLandscapeImagePositions(width, height);

  /**
   * Плавний перехід:
   *
   * ratio >= 1.33
   * → landscape
   *
   * ratio <= 1.25
   * → portrait
   */
  const portraitBlend = inverseLerp(1.33, 1.25, aspectRatio);

  return mixImagePositions(landscape, portrait, portraitBlend);
}

/**
 * TITLE
 */
function getTitlePositions(width: number, height: number): RangePosition {
  const aspectRatio = width / height;

  // --------------------------------------------------
  // MOBILE < 640px
  // text-3xl
  // --------------------------------------------------

  if (width < 640) {
    /**
     * Калібрування:
     *
     * 375×667  → 160
     * 390×844  → 215
     * 414×896  → 235
     * 412×915  → 250
     * 430×932  → 310
     * 440×956  → 310
     * 344×882  → 200
     * 540×720  → 270
     *
     * Тут одночасно важливі:
     * - width — визначає wrapping / висоту text block
     * - aspectRatio — наскільки viewport високий
     */

    const widthFactor = inverseLerp(344, 440, width);

    const tallFactor = inverseLerp(0.56, 0.39, aspectRatio);

    const end = 160 + 75 * widthFactor + 75 * tallFactor;

    return {
      start: 30,
      end,
    };
  }

  // --------------------------------------------------
  // TABLET 640–1024px
  // sm:text-5xl
  // --------------------------------------------------

  if (width < 1024) {
    /**
     * Калібрування:
     *
     * 768×1024  → 300
     * 853×1280  → 250
     * 912×1368  → 365
     *
     * Тут aspect ratio дуже важливий,
     * але width теж змінює wrapping.
     */

    const widthFactor = inverseLerp(768, 912, width);

    const tallFactor = inverseLerp(0.75, 0.66, aspectRatio);

    const end = 270 + 45 * widthFactor + 35 * tallFactor;

    return {
      start: 30,
      end,
    };
  }

  // --------------------------------------------------
  // LARGE TEXT >= 1024px
  // lg:text-7xl
  // --------------------------------------------------

  /**
   * Тут уже є дві різні композиційні зони:
   *
   * LANDSCAPE:
   * 1024×600  → 70
   * 1200×900  → 95
   * 1440×900  → 125
   * 1920×1080 → 190
   * 2560×*    → 210
   *
   * PORTRAIT / SQUARE:
   * 1280×1024 → 120
   * 1200×1200 → 170
   * 1280×1440 → 210
   * 1440×1600 → 235
   * 1764×1964 → 305
   * 1024×1366 → 300
   */

  const landscapeWidthFactor = inverseLerp(1024, 1920, width);

  const largeWidthFactor = inverseLerp(1920, 2560, width);

  const landscapeEnd =
    lerp(70, 190, landscapeWidthFactor) + 20 * largeWidthFactor;

  /**
   * Portrait baseline.
   *
   * При aspect ≈ .9:
   *
   * 1280 → ~210
   * 1440 → ~235
   * 1764 → ~305
   *
   * Тобто абсолютна width тут
   * дуже добре пояснює зміну title.
   */
  const portraitWidthEnd = 0.2 * width - 48;

  /**
   * Корекція від форми viewport.
   */
  let portraitEnd = portraitWidthEnd;

  if (aspectRatio >= 1) {
    // 1280×1024 → 120
    // 1200×1200 → 170

    const squareFactor = inverseLerp(1.25, 1, aspectRatio);

    const squareCorrection = lerp(-88, -22, squareFactor);

    portraitEnd += squareCorrection;
  } else if (aspectRatio >= 0.9) {
    const factor = inverseLerp(1, 0.9, aspectRatio);

    portraitEnd += lerp(-22, 0, factor);
  } else {
    /**
     * Чим більш витягнутий portrait,
     * тим далі вниз має пройти title.
     */
    const factor = inverseLerp(0.9, 0.66, aspectRatio);

    portraitEnd += lerp(0, 105, factor);
  }

  /**
   * Не робимо різкого switch.
   *
   * 1.33+ → landscape
   * 1.25- → portrait/square
   */
  const portraitBlend = inverseLerp(1.33, 1.25, aspectRatio);

  return {
    start: 30,

    end: lerp(landscapeEnd, portraitEnd, portraitBlend),
  };
}

export function getParallaxPositions(viewport: Viewport) {
  const { width, height } = viewport;

  const imagePositions = getImagePositions(width, height);

  const title = getTitlePositions(width, height);

  const aspectRatio = width / height;

  const skyPortraitFactor = inverseLerp(1.33, 1.25, aspectRatio);

  const skyEnd = lerp(-5, -7, skyPortraitFactor);

  return {
    skyEnd,

    mountains: imagePositions.mountains,

    foreground: imagePositions.foreground,

    title,
  };
}
