import { REPO_URL } from './constants';

export const getGoogleFontsStyleSheet = (googleFonts) =>
  googleFonts
    .map(
      (googleFont) =>
        `<link rel="stylesheet" href="https://fonts.googleapis.com/css?family=${googleFont.family.replaceAll(
          ' ',
          '+'
        )}:wght@400..800&display=swap">`
    )
    .join('\n');

export const exportCss = (adData) => {
  if (!adData) {
    return '';
  }
  // Image
  const display =
    adData.image.alignment === 'right' ? 'flex' : adData.image.alignment;
  const flexDirection =
    adData.image.alignment === 'right' ? 'row-reverse' : 'row';
  const imageAllignment = adData.image.alignment === 'grid' ? 'auto' : '0px';

  let imageVerticalAlignment = 'auto';
  switch (adData.image.vertical_alignment) {
    case 'top':
      imageVerticalAlignment = 'baseline';
      break;
    case 'middle':
      imageVerticalAlignment = 'center';
      break;
    case 'bottom':
      imageVerticalAlignment = 'end';
      break;
    default:
      break;
  }

  const {
    base: {
      background_color: baseBackgroundColor,
      height: baseHeight,
      width: baseWidth
    },
    headline: {
      alignment: headLineAlignment,
      color: headLineColor,
      font: headLineFont,
      font_size: headLineFontSize,
      italic: headLineItalic,
      line_height: headLineLineHeight,
      padding_top: headLinePaddingTop,
      padding_right: headLinePaddingRight,
      padding_bottom: headLinePaddingBottom,
      padding_left: headLinePaddingLeft,
      show: headLineShow,
      underline: headLineUnderline,
      uppercase: headLineUppercase,
      weight: headLineWeight
    },
    body: {
      alignment: bodyAlignment,
      color: bodyColor,
      font: bodyFont,
      font_size: bodyFontSize,
      italic: bodyItalic,
      line_height: bodyLineHeight,
      padding_top: bodyPaddingTop,
      padding_right: bodyPaddingRight,
      padding_bottom: bodyPaddingBottom,
      padding_left: bodyPaddingLeft,
      show: bodyShow,
      underline: bodyUnderline,
      uppercase: bodyUppercase,
      weight: bodyWeight
    },
    cta: {
      alignment: ctaAlignment,
      color: ctaColor,
      font: ctaFont,
      font_size: ctaFontSize,
      italic: ctaItalic,
      line_height: ctaLineHeight,
      padding_top: ctaPaddingTop,
      padding_right: ctaPaddingRight,
      padding_bottom: ctaPaddingBottom,
      padding_left: ctaPaddingLeft,
      show: ctaShow,
      underline: ctaUnderline,
      uppercase: ctaUppercase,
      weight: ctaWeight
    },
    sponsorship_label: {
      alignment: sponsorAlignment,
      color: sponsorColor,
      font: sponsorFont,
      font_size: sponsorFontSize,
      italic: sponsorItalic,
      padding_top: sponsorPaddingTop,
      padding_right: sponsorPaddingRight,
      padding_bottom: sponsorPaddingBottom,
      padding_left: sponsorPaddingLeft,
      show: sponsorShow,
      underline: sponsorUnderline,
      uppercase: sponsorUppercase,
      weight: sponsorWeight
    },
    image: { height: imageHeight, width: imageWidth, show: imageDisplay }
  } = adData;

  // Default
  let defaultStyle = `
    * {
    box-sizing: border-box;
    }
    body {
      box-sizing: border-box;
      color: #212529;
      font-size: 1rem;
      font-weight: 400;
      line-height: 1.5;
      padding: 0;
      margin: 0;
    }
    .image-container {
      cursor: pointer;
      display: ${adData.image.alignment !== 'grid' ? 'grid' : 'block'};
    }
    img {
      align-self: ${imageVerticalAlignment};
    }
  `.replaceAll(' ', '');

  // Base
  let baseStyle = `#base {`;
  baseStyle += ` background-color: ${baseBackgroundColor};`;
  baseStyle += ` display: ${display};`;
  baseStyle += ` flex-direction: ${flexDirection};`;
  baseStyle += ` min-width: ${baseWidth}px;`;
  baseStyle += ` max-width: ${baseWidth}px;`;
  baseStyle += ` position: relative`;
  baseStyle += ` }`;

  // Headline
  let headLineStyle = `#paved-ad-headline { `;
  headLineStyle += ` color: ${headLineColor};`;
  headLineStyle += ` display: ${headLineShow ? 'block' : 'none'};`;
  headLineStyle += ` font-family: ${headLineFont};`;
  headLineStyle += ` font-size: ${headLineFontSize}px;`;
  headLineStyle += ` font-style: ${headLineItalic ? 'italic' : undefined};`;
  headLineStyle += ` font-weight: ${headLineWeight};`;
  headLineStyle += ` line-height: ${headLineLineHeight};`;
  headLineStyle += ` padding-top: ${headLinePaddingTop}px;`;
  headLineStyle += ` padding-right: ${headLinePaddingRight}px;`;
  headLineStyle += ` padding-bottom: ${headLinePaddingBottom}px;`;
  headLineStyle += ` padding-left: ${headLinePaddingLeft}px;`;
  headLineStyle += ` text-align: ${headLineAlignment};`;
  headLineStyle += ` text-decoration: ${
    headLineUnderline ? 'underline' : undefined
  };`;
  headLineStyle += ` text-transform: ${
    headLineUppercase ? 'uppercase' : undefined
  };`;
  headLineStyle += ` }`;

  // Body
  let bodyStyle = `#paved-ad-body {`;
  bodyStyle += ` color: ${bodyColor};`;
  bodyStyle += ` display: ${bodyShow ? 'block' : 'none'};`;
  bodyStyle += ` font-family: ${bodyFont};`;
  bodyStyle += ` font-size: ${bodyFontSize}px;`;
  bodyStyle += ` font-style: ${bodyItalic ? 'italic' : undefined};`;
  bodyStyle += ` font-weight: ${bodyWeight};`;
  bodyStyle += ` line-height: ${bodyLineHeight};`;
  bodyStyle += ` padding-top: ${bodyPaddingTop}px;`;
  bodyStyle += ` padding-right: ${bodyPaddingRight}px;`;
  bodyStyle += ` padding-bottom: ${bodyPaddingBottom}px;`;
  bodyStyle += ` padding-left: ${bodyPaddingLeft}px;`;
  bodyStyle += ` text-align: ${bodyAlignment};`;
  bodyStyle += ` text-decoration: ${bodyUnderline ? 'underline' : undefined};`;
  bodyStyle += ` text-transform: ${bodyUppercase ? 'uppercase' : undefined};`;
  bodyStyle += ` }`;

  // CTA
  let ctaStyle = `#paved-ad-cta {`;
  ctaStyle += ` color: ${ctaColor};`;
  ctaStyle += ` display: ${ctaShow ? 'block' : 'none'};`;
  ctaStyle += ` font-family: ${ctaFont};`;
  ctaStyle += ` font-size: ${ctaFontSize}px;`;
  ctaStyle += ` font-style: ${ctaItalic ? 'italic' : undefined};`;
  ctaStyle += ` font-weight: ${ctaWeight};`;
  ctaStyle += ` line-height: ${ctaLineHeight};`;
  ctaStyle += ` padding-top: ${ctaPaddingTop}px;`;
  ctaStyle += ` padding-right: ${ctaPaddingRight}px;`;
  ctaStyle += ` padding-bottom: ${ctaPaddingBottom}px;`;
  ctaStyle += ` padding-left: ${ctaPaddingLeft}px; `;
  ctaStyle += ` text-align: ${ctaAlignment};`;
  ctaStyle += ` text-decoration: ${ctaUnderline ? 'underline' : undefined};`;
  ctaStyle += ` text-transform: ${ctaUppercase ? 'uppercase' : undefined};`;
  ctaStyle += ` }`;

  // CTA
  let sponsorStyle = `#paved-ad-sponsor {`;
  sponsorStyle += ` color: ${sponsorColor};`;
  sponsorStyle += ` display: ${sponsorShow ? 'block' : 'none'};`;
  sponsorStyle += ` font-family: ${sponsorFont};`;
  sponsorStyle += ` font-size: ${sponsorFontSize}px;`;
  sponsorStyle += ` font-style: ${sponsorItalic ? 'italic' : undefined};`;
  sponsorStyle += ` font-weight: ${sponsorWeight};`;
  sponsorStyle += ` padding-top: ${sponsorPaddingTop}px;`;
  sponsorStyle += ` padding-right: ${sponsorPaddingRight}px;`;
  sponsorStyle += ` padding-bottom: ${sponsorPaddingBottom}px;`;
  sponsorStyle += ` padding-left: ${sponsorPaddingLeft}px; `;
  sponsorStyle += ` text-align: ${sponsorAlignment};`;
  sponsorStyle += ` text-decoration: ${
    sponsorUnderline ? 'underline' : undefined
  };`;
  sponsorStyle += ` text-transform: ${
    sponsorUppercase ? 'uppercase' : undefined
  };`;
  sponsorStyle += ` }`;

  // Image
  let imageStyle = `#paved-ad-img {`;
  imageStyle += ` display: ${imageDisplay ? 'block' : 'none'};`;
  imageStyle += ` height: ${imageHeight}px;`;
  imageStyle += ` width: ${imageWidth}px;`;
  imageStyle += ` margin: ${imageAllignment};`;
  imageStyle += ` }`;

  const noneImageDisplay = !adData.image.show
    ? `.image-none {
    display: none;
  }`
    : '';

  // Fonts
  const systemFonts = `
    @font-face {
      font-family: 'ABeeZee';
      src: url('http://fonts.gstatic.com/s/abeezee/v21/esDR31xSG-6AGleN6tKukbcHCpE.ttf');
      font-style: normal;
      font-display: swap;
    }
    @font-face {
      font-family: 'Arial Black';
      src: url('${REPO_URL}/fonts/ArialBlack.ttf');
      font-style: normal;
      font-display: swap;
    }
    @font-face {
      font-family: 'Comic Sans';
      src: url('${REPO_URL}/fonts/ComicSans.ttf');
      font-style: normal;
      font-display: swap;
    }
    @font-face {
      font-family: 'Courier New';
      src: url('${REPO_URL}/fonts/CourierNew.ttf');
      font-style: normal;
      font-display: swap;
    }
    @font-face {
      font-family: 'Georgia';
      src: url('${REPO_URL}/fonts/Georgia.ttf');
      font-style: normal;
      font-display: swap;
    }
    @font-face {
      font-family: 'Impact';
      src: url('${REPO_URL}/fonts/Impact.ttf');
      font-style: normal;
      font-display: swap;
    }
    @font-face {
      font-family: 'Charcoal';
      src: url('${REPO_URL}/fonts/Charcoal.ttf');
      font-style: normal;
      font-display: swap;
    }
    @font-face {
      font-family: 'Lucida Console';
      src: url('${REPO_URL}/fonts/LucidaConsole.ttf');
      font-style: normal;
      font-display: swap;
    }
    @font-face {
      font-family: 'Lucida Sans Unicode';
      src: url('${REPO_URL}/fonts/LucidaSansUnicode.ttf');
      font-style: normal;
      font-display: swap;
    }
    @font-face {
      font-family: 'Lucida Grande';
      src: url('${REPO_URL}/fonts/LucidaGrande.ttf');
      font-style: normal;
      font-display: swap;
    }
    @font-face {
      font-family: 'Palatino Linotype';
      src: url('${REPO_URL}/fonts/PalatinoLinotype.ttf');
      font-style: normal;
      font-display: swap;
    }
    @font-face {
      font-family: 'Book Antiqua';
      src: url('${REPO_URL}/fonts/BookAntiqua.ttf');
      font-style: normal;
      font-display: swap;
    }
    @font-face {
      font-family: 'Palatino';
      src: url('${REPO_URL}/fonts/Palatino.ttf');
      font-style: normal;
      font-display: swap;
    }
    @font-face {
      font-family: 'Tahoma';
      src: url('${REPO_URL}/fonts/Tahoma.ttf');
      font-style: normal;
      font-display: swap;
    }
    @font-face {
      font-family: 'Geneva';
      src: url('${REPO_URL}/fonts/Geneva.ttf');
      font-style: normal;
      font-display: swap;
    }
    @font-face {
      font-family: 'Times';
      src: url('${REPO_URL}/fonts/Times.ttf');
      font-style: normal;
      font-display: swap;
    }
    @font-face {
      font-family: 'Times New Roman';
      src: url('${REPO_URL}/fonts/TimesNewRoman.ttf');
      font-style: normal;
      font-display: swap;
    }
    @font-face {
      font-family: 'Trebuchet MS';
      src: url('${REPO_URL}/fonts/TrebuchetMS.ttf');
      font-style: normal;
      font-display: swap;
    }
    @font-face {
      font-family: 'Verdana';
      src: url('${REPO_URL}/fonts/Verdana.ttf');
      font-style: normal;
      font-display: swap;
    }
    @font-face {
      font-family: 'Monaco';
      src: url('${REPO_URL}/fonts/Monaco.ttf');
      font-style: normal;
      font-display: swap;
    }
  `;

  return (
    defaultStyle +
    '\n' +
    baseStyle +
    '\n' +
    headLineStyle +
    '\n' +
    bodyStyle +
    '\n' +
    ctaStyle +
    '\n' +
    imageStyle +
    '\n' +
    sponsorStyle +
    '\n' +
    noneImageDisplay +
    '\n' +
    systemFonts
  );
};
