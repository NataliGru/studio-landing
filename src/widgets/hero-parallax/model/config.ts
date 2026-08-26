import { Viewport } from './types';

export const PARALLAX_IMAGE_SIZE = {
  width: 1920,
  height: 2070,
} as const;

export const SKY_IMAGE_SIZE = {
  width: 2304,
  height: 4096,
} as const;

export const DEFAULT_VIEWPORT: Viewport = {
  width: 1440,
  height: 900,
};

/**
 * Усі значення нижче отримані з ручного візуального калібрування.
 *
 * Position values — це translateY у % від висоти відповідного element.
 *
 * Основна ідея:
 *
 * - mobile images залежать переважно від aspect ratio;
 * - tablet має практично стабільну композицію;
 * - landscape desktop залежить від того, яка частина canvas
 *   1920×2070 видима у viewport;
 * - square / portrait desktop має окрему композиційну модель;
 * - title рахується окремо, оскільки його % залежать від висоти
 *   текстового wrapper, яка змінюється через wrapping і breakpoint font size.
 */
export const PARALLAX_CALIBRATION = {
  sky: {
    landscapeEnd: -5,
    portraitEnd: -7,

    /**
     * Між aspect ratio 1.33 → 1.25
     * плавно переходимо від landscape sky до portrait sky.
     */
    blend: {
      landscapeAspect: 1.33,
      portraitAspect: 1.25,
    },
  },

  mobile: {
    /**
     * Нижче 440px використовується повністю mobile composition.
     * Від 440 до 600 вона плавно переходить у tablet composition.
     */
    blendToTablet: {
      fromWidth: 440,
      toWidth: 600,
    },

    aspect: {
      /**
       * 375×667 ≈ 0.56
       */
      wide: 0.56,

      /**
       * Найбільш витягнуті телефони ≈ 0.39.
       */
      tall: 0.39,
    },

    mountains: {
      start: {
        wide: 115,
        tall: 135,
      },

      end: {
        wide: 60,
        tall: 90,
      },
    },

    foreground: {
      start: {
        wide: 110,
        tall: 130,
      },

      end: {
        wide: 55,
        tall: 85,
      },
    },
  },

  tablet: {
    maxWidth: 1024,

    /**
     * На каліброваних:
     *
     * 540×720
     * 768×1024
     * 853×1280
     * 912×1368
     * 1024×1366
     *
     * image composition майже не змінювалась.
     */
    mountains: {
      start: 85,
      end: 35,
    },

    foreground: {
      start: 60,
      end: 30,
    },
  },

  landscape: {
    minAspect: 1.3,

    desktopWidth: {
      from: 1024,
      to: 1920,
    },

    largeWidth: {
      from: 1920,
      to: 2560,
    },

    /**
     * visibleRatio =
     * viewportHeight / scaledCanvasHeight
     */
    visibleRatio: {
      /**
       * Reference point для стандартного desktop layout.
       */
      reference: 0.543,

      /**
       * Reference range для великих дисплеїв.
       */
      largeFrom: 0.53,
      largeTo: 0.603,

      /**
       * Діапазон, за яким рахується foreground offset
       * на великих екранах.
       */
      foregroundFrom: 0.391,
      foregroundTo: 0.522,
    },

    imageScaleReference: 0.533,

    mountains: {
      startBase: 20,

      visibleRatioInfluence: 95,
      imageScaleInfluence: 5,

      largeWidthOffset: 3,
      largeHeightCorrection: 8,

      end: {
        desktop: -16,
        large: -15,
      },
    },

    foreground: {
      /**
       * На вузькому desktop foreground стартує
       * приблизно на 10% вище mountains.
       *
       * До 1920px ця різниця сходить до 0.
       */
      baseOffset: -10,
      desktopOffsetCorrection: 10,

      largeOffset: {
        wide: 5,
        tall: -7,
      },

      end: {
        base: -22,

        /**
         * Від 1200 до 1440 додаємо -1%.
         */
        desktopCorrectionFromWidth: 1200,
        desktopCorrectionToWidth: 1440,

        /**
         * На 2560px foreground приблизно ще на 9%
         * вище.
         */
        largeWidthCorrection: 9,
      },
    },
  },

  portrait: {
    /**
     * squareFactor:
     * 1.25 → 0
     * 1.00 → 1
     */
    squareAspect: {
      from: 1.25,
      to: 1,
    },

    /**
     * portraitFactor:
     * 1.00 → 0
     * 0.75 → 1
     */
    portraitAspect: {
      from: 1,
      to: 0.75,
    },

    /**
     * Перехід між desktop landscape та portrait
     * відбувається плавно у вузькій зоні 1.33–1.25.
     */
    blend: {
      landscapeAspect: 1.33,
      portraitAspect: 1.25,
    },

    mountains: {
      start: {
        squareWide: 40,
        square: 55,
        portrait: 85,
      },

      end: {
        square: -2,
        portrait: 20,

        /**
         * Крива не лінійна:
         * end досить швидко опускається після ratio < 1.
         */
        curvePower: 0.35,
      },
    },

    foreground: {
      start: {
        squareWide: 35,
        square: 40,
        portrait: 75,

        curvePower: 0.7,
      },

      end: {
        square: -10,
        portrait: 13,

        curvePower: 0.25,
      },
    },
  },

  title: {
    start: 60,

    mobile: {
      maxWidth: 640,

      width: {
        from: 344,
        to: 440,
      },

      aspect: {
        wide: 0.56,
        tall: 0.39,
      },

      endBase: 160,
      widthInfluence: 75,
      tallnessInfluence: 75,
    },

    tablet: {
      maxWidth: 1024,
      maxAspect: 1.3,

      width: {
        from: 768,
        to: 912,
      },

      aspect: {
        wide: 0.75,
        tall: 0.66,
      },

      endBase: 270,
      widthInfluence: 45,
      tallnessInfluence: 35,
    },

    landscape: {
      desktop: {
        fromWidth: 1024,
        toWidth: 1920,
        fromEnd: 70,
        toEnd: 190,
      },

      large: {
        fromWidth: 1920,
        toWidth: 2560,
        fromEnd: 190,
        toEnd: 210,
      },
    },

    portrait: {
      /**
       * Базова залежність end від width.
       *
       * При aspect ≈ 0.9:
       *
       * 1280 → ~210
       * 1440 → ~235
       * 1764 → ~305
       */
      widthMultiplier: 0.2,
      widthOffset: -48,

      correction: {
        squareWide: -88,
        square: -22,
        portraitReference: 0,
        tallPortrait: 105,
      },

      aspect: {
        squareWide: 1.25,
        square: 1,
        portraitReference: 0.9,
        tallPortrait: 0.66,
      },
    },
  },
} as const;
