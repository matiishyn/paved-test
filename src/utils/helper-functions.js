import { uniq, get, words, upperFirst } from 'lodash';
import {
  DEFAULT_DESKTOP_SETTINGS,
  DEFAULT_MOBILE_SETTINGS,
  MAX_MOBILE_WIDTH,
  MIN_IMAGE_WIDTH,
  MIN_BASE_WIDTH,
  MIN_BODY_FONT_SIZE,
  MIN_HEADLINE_FONT_SIZE,
  MIN_CTA_FONT_SIZE,
  DESKTOP,
  MOBILE
} from './constants';

export const capitalize = (s) => {
  return s && s[0].toUpperCase() + s.slice(1);
};

export const getGoogleFonts = (fonts, googleFonts) => {
  return uniq(fonts)
    .map((font) => googleFonts.find((googleFont) => googleFont.family === font))
    .filter((googleFont) => Boolean(googleFont));
};

export const getSuggestedSettings = (suggestions, device) => {
  const DEFAULT_SETTINGS =
    device === DESKTOP ? DEFAULT_DESKTOP_SETTINGS : DEFAULT_MOBILE_SETTINGS;

  let suggestedBaseWidth =
    suggestions && suggestions.base && suggestions.base.width
      ? suggestions.base.width
      : DEFAULT_SETTINGS.base.width;
  suggestedBaseWidth =
    device === MOBILE && suggestedBaseWidth > MAX_MOBILE_WIDTH
      ? MAX_MOBILE_WIDTH
      : suggestedBaseWidth;

  const suggestedFont =
    suggestions &&
    suggestions.text &&
    suggestions.text.fonts &&
    suggestions.text.fonts[0]
      ? suggestions.text.fonts[0]
      : DEFAULT_SETTINGS.headline.font;

  const suggestedLargestFontSize =
    suggestions &&
    suggestions.text &&
    suggestions.text.sizes &&
    suggestions.text.sizes.length > 0
      ? suggestions.text.sizes.sort().reverse()[0]
      : DEFAULT_SETTINGS.headline.font_size;

  const suggestedSmallestFontSize =
    suggestions &&
    suggestions.text &&
    suggestions.text.sizes &&
    suggestions.text.sizes.length > 0
      ? suggestions.text.sizes.sort()[0]
      : DEFAULT_SETTINGS.body.font_size;

  // TODO: sorting the hex codes is not 100% correct
  const suggestedLightestBackgroundColor =
    suggestions &&
    suggestions.base &&
    suggestions.base.background_colors &&
    suggestions.base.background_colors.length > 0
      ? suggestions.base.background_colors.sort().reverse()[0]
      : DEFAULT_SETTINGS.body.font_size;

  // TODO: sorting the hex codes is not 100% correct
  const suggestedDarkestTextColor =
    suggestions &&
    suggestions.text &&
    suggestions.text.colors &&
    suggestions.text.colors.length > 0
      ? suggestions.text.colors.sort()[0]
      : DEFAULT_SETTINGS.headline.color;

  return {
    ...DEFAULT_SETTINGS,
    base: {
      ...DEFAULT_SETTINGS.base,
      background_color: suggestedLightestBackgroundColor,
      width: suggestedBaseWidth
    },
    headline: {
      ...DEFAULT_SETTINGS.headline,
      color: suggestedDarkestTextColor,
      font: suggestedFont,
      font_size: Number(suggestedLargestFontSize)
    },
    body: {
      ...DEFAULT_SETTINGS.body,
      color: suggestedDarkestTextColor,
      font: suggestedFont,
      font_size: Number(suggestedSmallestFontSize)
    },
    cta: {
      ...DEFAULT_SETTINGS.cta,
      color: suggestedDarkestTextColor,
      font: suggestedFont,
      font_size: Number(suggestedSmallestFontSize)
    },
    sponsorship_label: {
      ...DEFAULT_SETTINGS.cta,
      color: suggestedDarkestTextColor,
      font: suggestedFont,
      font_size: Number(suggestedSmallestFontSize)
    }
  };
};

export const getSectionName = (section) => {
  switch (section) {
    case 'cta':
      return 'CTA';

    case 'base':
      return 'Ad unit';

    default:
      return upperFirst(section);
  }
};

export const getObjectName = (objectName) => words(objectName).join(' ');

export const validateRangeValue =
  (path, [min, max], unit = 'px') =>
  (settings) => {
    const [section, objectName] = path.split('.');
    const isEnable = get(settings, [section, 'show'], true);
    if (!isEnable) {
      return '';
    }
    const errorSubject = `${getSectionName(section)} ${getObjectName(
      objectName
    )}`;

    const value = get(settings, path);

    if (isNaN(value)) {
      return `${errorSubject} should be a number`;
    }

    if (min && value < min) {
      return `${errorSubject} should be at least ${min}${unit}`;
    }
    if (max && value > max) {
      return `${errorSubject} should be at most ${max}${unit}`;
    }
    return '';
  };

export const validateMobileBaseWidth = validateRangeValue('base.width', [
  MIN_BASE_WIDTH,
  MAX_MOBILE_WIDTH
]);

export const validateImageWidth = validateRangeValue('image.width', [
  MIN_IMAGE_WIDTH
]);
export const validateBaseWidth = validateRangeValue('base.width', [
  MIN_BASE_WIDTH
]);
export const validateHeadlineFontSize = validateRangeValue(
  'headline.font_size',
  [MIN_HEADLINE_FONT_SIZE]
);
export const validateBodyFontSize = validateRangeValue('body.font_size', [
  MIN_BODY_FONT_SIZE
]);
export const validateCTAFontSize = validateRangeValue('cta.font_size', [
  MIN_CTA_FONT_SIZE
]);

export const allMobileValidateFuncs = [
  validateMobileBaseWidth,
  validateImageWidth,
  validateHeadlineFontSize,
  validateBodyFontSize,
  validateCTAFontSize
];

export const allDesktopValidateFuncs = [
  validateBaseWidth,
  validateImageWidth,
  validateHeadlineFontSize,
  validateBodyFontSize,
  validateCTAFontSize
];

export const validate =
  (...validateFuncs) =>
  (settings) => {
    for (let func of validateFuncs) {
      const error = func(settings);
      if (error.length > 0) {
        return error;
      }
    }
    return '';
  };
