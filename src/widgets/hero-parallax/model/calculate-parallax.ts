import {
  DEFAULT_VIEWPORT,
  PARALLAX_CALIBRATION as C,
  PARALLAX_IMAGE_SIZE,
} from './config';

import type {
  ImagePositions,
  ParallaxPositions,
  PositionRange,
  Viewport,
} from './types';

import {
  getProgress,
  lerp,
  mixRange,
} from './helpers';

export { DEFAULT_VIEWPORT };

function getAspectRatio(
  width: number,
  height: number,
) {
  return width / height;
}

/**
 * Повертає фактичну висоту canvas 1920×2070,
 * коли він рендериться як width: 100%; height: auto.
 */
function getRenderedImageHeight(
  viewportWidth: number,
) {
  const imageAspect =
    PARALLAX_IMAGE_SIZE.height /
    PARALLAX_IMAGE_SIZE.width;

  return viewportWidth * imageAspect;
}

/**
 * Показує, яка частина масштабованого canvas
 * поміщається у viewport по вертикалі.
 *
 * Менше значення → viewport відносно низький.
 * Більше значення → viewport відносно високий.
 */
function getVisibleImageRatio(
  width: number,
  height: number,
) {
  return (
    height /
    getRenderedImageHeight(width)
  );
}

function getMobileImagePositions(
  width: number,
  height: number,
): ImagePositions {
  const aspectRatio =
    getAspectRatio(width, height);

  const tallness = getProgress(
    C.mobile.aspect.wide,
    C.mobile.aspect.tall,
    aspectRatio,
  );

  return {
    mountains: {
      start: lerp(
        C.mobile.mountains.start.wide,
        C.mobile.mountains.start.tall,
        tallness,
      ),

      end: lerp(
        C.mobile.mountains.end.wide,
        C.mobile.mountains.end.tall,
        tallness,
      ),
    },

    foreground: {
      start: lerp(
        C.mobile.foreground.start.wide,
        C.mobile.foreground.start.tall,
        tallness,
      ),

      end: lerp(
        C.mobile.foreground.end.wide,
        C.mobile.foreground.end.tall,
        tallness,
      ),
    },
  };
}

function getTabletImagePositions(): ImagePositions {
  return {
    mountains: C.tablet.mountains,
    foreground: C.tablet.foreground,
  };
}

function getLandscapeImagePositions(
  width: number,
  height: number,
): ImagePositions {
  const visibleRatio =
    getVisibleImageRatio(width, height);

  const imageScale =
    width / PARALLAX_IMAGE_SIZE.width;

  const desktopWidthProgress =
    getProgress(
      C.landscape.desktopWidth.from,
      C.landscape.desktopWidth.to,
      width,
    );

  const largeWidthProgress =
    getProgress(
      C.landscape.largeWidth.from,
      C.landscape.largeWidth.to,
      width,
    );

  const largeHeightProgress =
    getProgress(
      C.landscape.visibleRatio.largeFrom,
      C.landscape.visibleRatio.largeTo,
      visibleRatio,
    );

  /*
   * Базове положення mountains залежить від того,
   * наскільки високий viewport відносно canvas.
   */
  let mountainsStart =
    C.landscape.mountains.startBase +
    C.landscape.mountains
      .visibleRatioInfluence *
      (
        visibleRatio -
        C.landscape.visibleRatio.reference
      ) -
    C.landscape.mountains
      .imageScaleInfluence *
      (
        imageScale -
        C.landscape.imageScaleReference
      );

  /*
   * Додаткова поправка для 1920–2560px screens.
   */
  mountainsStart +=
    largeWidthProgress *
    (
      C.landscape.mountains
        .largeWidthOffset -
      C.landscape.mountains
        .largeHeightCorrection *
        largeHeightProgress
    );

  const mountainsEnd = lerp(
    C.landscape.mountains.end.desktop,
    C.landscape.mountains.end.large,
    largeWidthProgress,
  );

  /*
   * На малих desktop foreground приблизно
   * на 10% вище mountains.
   *
   * З ростом width ця різниця зникає.
   */
  const foregroundBaseOffset =
    C.landscape.foreground.baseOffset +
    C.landscape.foreground
      .desktopOffsetCorrection *
      desktopWidthProgress ** 2;

  const foregroundHeightProgress =
    getProgress(
      C.landscape.visibleRatio.foregroundFrom,
      C.landscape.visibleRatio.foregroundTo,
      visibleRatio,
    );

  const foregroundLargeOffset =
    largeWidthProgress *
    lerp(
      C.landscape.foreground
        .largeOffset.wide,
      C.landscape.foreground
        .largeOffset.tall,
      foregroundHeightProgress,
    );

  const foregroundStart =
    mountainsStart +
    foregroundBaseOffset +
    foregroundLargeOffset;

  const desktopEndProgress =
    getProgress(
      C.landscape.foreground.end
        .desktopCorrectionFromWidth,
      C.landscape.foreground.end
        .desktopCorrectionToWidth,
      width,
    );

  const foregroundEnd =
    C.landscape.foreground.end.base -
    desktopEndProgress -
    C.landscape.foreground.end
      .largeWidthCorrection *
      largeWidthProgress;

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

function getPortraitImagePositions(
  width: number,
  height: number,
): ImagePositions {
  const aspectRatio =
    getAspectRatio(width, height);

  const squareProgress =
    getProgress(
      C.portrait.squareAspect.from,
      C.portrait.squareAspect.to,
      aspectRatio,
    );

  const portraitProgress =
    getProgress(
      C.portrait.portraitAspect.from,
      C.portrait.portraitAspect.to,
      aspectRatio,
    );

  const isSquareOrLandscape =
    aspectRatio >= 1;

  const mountainsStart =
    isSquareOrLandscape
      ? lerp(
          C.portrait.mountains.start
            .squareWide,
          C.portrait.mountains.start
            .square,
          squareProgress,
        )
      : lerp(
          C.portrait.mountains.start
            .square,
          C.portrait.mountains.start
            .portrait,
          portraitProgress,
        );

  const mountainsEnd =
    isSquareOrLandscape
      ? C.portrait.mountains.end.square
      : lerp(
          C.portrait.mountains.end.square,
          C.portrait.mountains.end.portrait,
          portraitProgress **
            C.portrait.mountains.end
              .curvePower,
        );

  const foregroundStart =
    isSquareOrLandscape
      ? lerp(
          C.portrait.foreground.start
            .squareWide,
          C.portrait.foreground.start
            .square,
          squareProgress,
        )
      : lerp(
          C.portrait.foreground.start
            .square,
          C.portrait.foreground.start
            .portrait,
          portraitProgress **
            C.portrait.foreground.start
              .curvePower,
        );

  const foregroundEnd =
    isSquareOrLandscape
      ? C.portrait.foreground.end.square
      : lerp(
          C.portrait.foreground.end.square,
          C.portrait.foreground.end
            .portrait,
          portraitProgress **
            C.portrait.foreground.end
              .curvePower,
        );

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
    mountains: mixRange(
      from.mountains,
      to.mountains,
      progress,
    ),

    foreground: mixRange(
      from.foreground,
      to.foreground,
      progress,
    ),
  };
}

/**
 * Вибирає композиційну модель для image layers.
 *
 * Mobile:
 *   width < 600
 *   mobile плавно переходить у tablet.
 *
 * Tablet:
 *   portrait viewport width <= 1024.
 *
 * Landscape:
 *   aspect ratio >= 1.3.
 *
 * Desktop portrait/square:
 *   окрема portrait model.
 *
 * Між aspect ratio 1.33 і 1.25 landscape та portrait
 * плавно змішуються, тому при resize немає стрибка.
 */
function getImagePositions(
  width: number,
  height: number,
): ImagePositions {
  const aspectRatio =
    getAspectRatio(width, height);

  const tablet =
    getTabletImagePositions();

  if (
    width <
    C.mobile.blendToTablet.toWidth
  ) {
    const mobile =
      getMobileImagePositions(
        width,
        height,
      );

    const tabletProgress =
      getProgress(
        C.mobile.blendToTablet.fromWidth,
        C.mobile.blendToTablet.toWidth,
        width,
      );

    return mixImagePositions(
      mobile,
      tablet,
      tabletProgress,
    );
  }

  if (
    aspectRatio >=
    C.landscape.minAspect
  ) {
    return getLandscapeImagePositions(
      width,
      height,
    );
  }

  if (width <= C.tablet.maxWidth) {
    return tablet;
  }

  const landscape =
    getLandscapeImagePositions(
      width,
      height,
    );

  const portrait =
    getPortraitImagePositions(
      width,
      height,
    );

  const portraitProgress =
    getProgress(
      C.portrait.blend.landscapeAspect,
      C.portrait.blend.portraitAspect,
      aspectRatio,
    );

  return mixImagePositions(
    landscape,
    portrait,
    portraitProgress,
  );
}

function getMobileTitlePosition(
  width: number,
  aspectRatio: number,
): PositionRange {
  const config = C.title.mobile;

  const widthProgress =
    getProgress(
      config.width.from,
      config.width.to,
      width,
    );

  const tallness =
    getProgress(
      config.aspect.wide,
      config.aspect.tall,
      aspectRatio,
    );

  return {
    start: C.title.start,

    end:
      config.endBase +
      config.widthInfluence *
        widthProgress +
      config.tallnessInfluence *
        tallness,
  };
}

function getTabletTitlePosition(
  width: number,
  aspectRatio: number,
): PositionRange {
  const config = C.title.tablet;

  const widthProgress =
    getProgress(
      config.width.from,
      config.width.to,
      width,
    );

  const tallness =
    getProgress(
      config.aspect.wide,
      config.aspect.tall,
      aspectRatio,
    );

  return {
    start: C.title.start,

    end:
      config.endBase +
      config.widthInfluence *
        widthProgress +
      config.tallnessInfluence *
        tallness,
  };
}

function getLandscapeTitlePosition(
  width: number,
): PositionRange {
  const desktop =
    C.title.landscape.desktop;

  const large =
    C.title.landscape.large;

  const end =
    width <= desktop.toWidth
      ? lerp(
          desktop.fromEnd,
          desktop.toEnd,
          getProgress(
            desktop.fromWidth,
            desktop.toWidth,
            width,
          ),
        )
      : lerp(
          large.fromEnd,
          large.toEnd,
          getProgress(
            large.fromWidth,
            large.toWidth,
            width,
          ),
        );

  return {
    start: C.title.start,
    end,
  };
}

function getPortraitTitlePosition(
  width: number,
  aspectRatio: number,
): PositionRange {
  const config = C.title.portrait;

  const baseEnd =
    config.widthMultiplier * width +
    config.widthOffset;

  let correction: number;

  if (
    aspectRatio >=
    config.aspect.square
  ) {
    correction = lerp(
      config.correction.squareWide,
      config.correction.square,
      getProgress(
        config.aspect.squareWide,
        config.aspect.square,
        aspectRatio,
      ),
    );
  } else if (
    aspectRatio >=
    config.aspect.portraitReference
  ) {
    correction = lerp(
      config.correction.square,
      config.correction
        .portraitReference,
      getProgress(
        config.aspect.square,
        config.aspect.portraitReference,
        aspectRatio,
      ),
    );
  } else {
    correction = lerp(
      config.correction
        .portraitReference,
      config.correction.tallPortrait,
      getProgress(
        config.aspect.portraitReference,
        config.aspect.tallPortrait,
        aspectRatio,
      ),
    );
  }

  return {
    start: C.title.start,
    end: baseEnd + correction,
  };
}

/**
 * Title має окрему модель.
 *
 * Причина:
 * translateY(%) для title рахується від висоти самого
 * text wrapper, а вона залежить від wrapping та breakpoint:
 *
 * mobile    → text-3xl
 * tablet    → sm:text-5xl
 * desktop   → lg:text-7xl
 *
 * Тому image-layer formula не може бути повторно
 * використана для title.
 */
function getTitlePosition(
  width: number,
  height: number,
): PositionRange {
  const aspectRatio =
    getAspectRatio(width, height);

  if (
    width <
    C.title.mobile.maxWidth
  ) {
    return getMobileTitlePosition(
      width,
      aspectRatio,
    );
  }

  if (
    width <
      C.title.tablet.maxWidth &&
    aspectRatio <
      C.title.tablet.maxAspect
  ) {
    return getTabletTitlePosition(
      width,
      aspectRatio,
    );
  }

  if (
    aspectRatio >=
    C.landscape.minAspect
  ) {
    return getLandscapeTitlePosition(
      width,
    );
  }

  return getPortraitTitlePosition(
    width,
    aspectRatio,
  );
}

/**
 * Public API для HeroParallax.
 *
 * Повертає кінцеві translateY values для:
 *
 * sky
 * mountains
 * title
 * foreground
 *
 * Значення передаються у:
 *
 * useTransform(
 *   scrollYProgress,
 *   [0, ASSEMBLE_END, 1],
 *   [start, end, end],
 * )
 *
 * Через повторення end після ASSEMBLE_END
 * сцена перестає рухатися, але sticky section
 * ще залишається pinned.
 */
export function getParallaxPositions(
  viewport: Viewport,
): ParallaxPositions {
  const { width, height } = viewport;

  const aspectRatio =
    getAspectRatio(width, height);

  const imagePositions =
    getImagePositions(
      width,
      height,
    );

  const title =
    getTitlePosition(
      width,
      height,
    );

  const portraitSkyProgress =
    getProgress(
      C.sky.blend.landscapeAspect,
      C.sky.blend.portraitAspect,
      aspectRatio,
    );

  const skyEnd = lerp(
    C.sky.landscapeEnd,
    C.sky.portraitEnd,
    portraitSkyProgress,
  );

  return {
    skyEnd,
    mountains:
      imagePositions.mountains,
    foreground:
      imagePositions.foreground,
    title,
  };
}