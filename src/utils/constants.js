export const DESKTOP = 'desktop';

export const MOBILE = 'mobile';

export const DARK = 'dark';

export const LIGHT = 'light';

export const API_URL_PROD = 'https://units-api.paved.com';

export const API_URL_DEV = 'https://units-api.paved.dev';

export const REPO_URL = 'https://ad-unit.vercel.app';

// Placeholder Ad Values
export const AD_TITLE =
  'This is an example of the maximum length for a sponsorship headline.';

export const AD_BODY =
  'The is an example of the sponsorship body text. All of this text will be replaced by real text when your placement has been reviewed by us and is live.';

export const WARNING_TITLE = 'Size Change Detected';
export const WARNING_BODY =
  'It looks like you have changed the width of this ad unit. If you have already added this unit to your newsletter, you will need to update the HTML code with the new width';

export const F_WARNING_TITLE = 'Failed To Detect Size Change';
export const F_WARNING_BODY =
  'There is a problem when detect size change. If you have already added this unit to your newsletter, you will need to update the HTML code with the new width. Continue anyway?';

export const AD_CTA = 'Click here';

export const AD_SPONSORED = 'Sponsored';

// Custom CSS
export const DEFAULT_CUSTOM_CSS = `#base {}
#paved-ad-headline {}
#paved-ad-body {}
#paved-ad-cta {}
#paved-ad-img {}
.image-container{}
.text-container{}
#paved-ad-sponsor {}
`;

export const MAX_MOBILE_WIDTH = 450;
export const MIN_IMAGE_WIDTH = 100;
export const MIN_BASE_WIDTH = 250;
export const MIN_HEADLINE_FONT_SIZE = 15;
export const MIN_BODY_FONT_SIZE = 12;
export const MIN_CTA_FONT_SIZE = 12;

// Default ad settings
export const DEFAULT_DESKTOP_SETTINGS = {
  base: {
    width: 800,
    height: 250,
    background_color: '#ffffff'
  },
  body: {
    alignment: 'left',
    color: '#000000',
    font: 'Arial',
    font_size: 20,
    italic: undefined,
    line_height: 1.2,
    padding_top: 0,
    padding_right: 0,
    padding_bottom: 0,
    padding_left: 0,
    show: true,
    underline: undefined,
    uppercase: undefined,
    weight: 400
  },
  cta: {
    alignment: 'left',
    color: '#000000',
    font: 'Arial',
    font_size: 20,
    italic: undefined,
    line_height: 1.2,
    padding_top: 0,
    padding_right: 0,
    padding_bottom: 0,
    padding_left: 0,
    show: true,
    underline: undefined,
    uppercase: undefined,
    weight: 400
  },
  headline: {
    alignment: 'left',
    color: '#000000',
    font: 'Arial',
    font_size: 25,
    italic: undefined,
    line_height: 1.2,
    padding_top: 0,
    padding_right: 0,
    padding_bottom: 0,
    padding_left: 0,
    show: true,
    underline: undefined,
    uppercase: undefined,
    weight: 600
  },
  sponsorship_label: {
    alignment: 'left',
    font: 'Arial',
    italic: undefined,
    line_height: 1.2,
    padding_top: 0,
    padding_right: 0,
    padding_bottom: 0,
    padding_left: 0,
    show: true,
    underline: undefined,
    uppercase: undefined,
    color: '#232e3c',
    font_size: 14,
    weight: 500,
    position: 'bottom'
  },
  image: {
    alignment: 'flex',
    height: 240,
    show: true,
    width: 320
  },
  custom_css: DEFAULT_CUSTOM_CSS
};

export const DEFAULT_MOBILE_SETTINGS = {
  base: {
    width: 449,
    height: undefined,
    background_color: '#ffffff'
  },
  body: {
    alignment: 'left',
    color: '#000000',
    font: 'Arial',
    font_size: 20,
    italic: undefined,
    line_height: 1.2,
    padding_top: 0,
    padding_right: 0,
    padding_bottom: 0,
    padding_left: 0,
    show: true,
    underline: undefined,
    uppercase: undefined,
    weight: 400
  },
  cta: {
    alignment: 'left',
    color: '#000000',
    font: 'Arial',
    font_size: 20,
    italic: undefined,
    line_height: 1.2,
    padding_top: 0,
    padding_right: 0,
    padding_bottom: 0,
    padding_left: 0,
    show: true,
    underline: undefined,
    uppercase: undefined,
    weight: 400
  },
  headline: {
    alignment: 'left',
    color: '#000000',
    font: 'Arial',
    font_size: 25,
    italic: undefined,
    line_height: 1.2,
    padding_top: 0,
    padding_right: 0,
    padding_bottom: 0,
    padding_left: 0,
    show: true,
    underline: undefined,
    uppercase: undefined,
    weight: 600
  },
  sponsorship_label: {
    alignment: 'left',
    font: 'Arial',
    italic: undefined,
    line_height: 1.2,
    padding_top: 0,
    padding_right: 0,
    padding_bottom: 0,
    padding_left: 0,
    show: true,
    underline: undefined,
    uppercase: undefined,
    color: '#232e3c',
    font_size: 14,
    weight: 500
  },
  image: {
    alignment: 'grid',
    height: 300,
    show: true,
    width: 400
  },
  custom_css: DEFAULT_CUSTOM_CSS
};

export const FONTS = [
  'ArialBlack.ttf',
  'BookAntiqua.ttf',
  'Charcoal.ttf',
  'ComicSans.ttf',
  'CourierNew.ttf',
  'Geneva.ttf',
  'Georgia.ttf',
  'Impact.ttf',
  'LucidaConsole.ttf',
  'LucidaGrande.ttf',
  'LucidaSansUnicode.ttf',
  'Monaco.ttf',
  'Palatino.ttf',
  'PalatinoLinotype.ttf',
  'Tahoma.ttf',
  'Times.ttf',
  'TimesNewRoman.ttf',
  'TrebuchetMS.ttf',
  'Verdana.ttf'
];

export const CUSTOM_REACT_SELECT_STYLES = {
  control: (provided, _state) => ({
    ...provided,
    background: '#ffffff',
    borderColor: '#cccccc',
    borderRadius: '4px',
    minHeight: '37px',
    height: '37px',
    boxShadow: 'none'
  }),

  valueContainer: (provided, _state) => ({
    ...provided,
    height: '37px',
    padding: '0 6px'
  }),

  input: (provided, _state) => ({
    ...provided,
    margin: '0px'
  }),
  indicatorSeparator: (_state) => ({
    display: 'none'
  }),
  indicatorsContainer: (provided, _state) => ({
    ...provided,
    height: '37px'
  })
};
