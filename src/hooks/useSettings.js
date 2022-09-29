import { DEFAULT_DESKTOP_SETTINGS, DEFAULT_MOBILE_SETTINGS } from '../utils';

export const initialState = {
  desktop: {
    light: {
      data: DEFAULT_DESKTOP_SETTINGS,
      loadedKey: ''
    },
    dark: {
      data: DEFAULT_DESKTOP_SETTINGS,
      loadedKey: ''
    }
  },
  mobile: {
    light: {
      data: DEFAULT_MOBILE_SETTINGS,
      loadedKey: ''
    },
    dark: {
      data: DEFAULT_MOBILE_SETTINGS,
      loadedKey: ''
    }
  }
};

export function reducer(state, action) {
  const { deviceType, deviceMode, loadedKey } = action.meta;
  switch (action.type) {
    case 'update':
      return {
        ...state,
        [deviceType]: {
          ...state[deviceType],
          [deviceMode]: {
            ...state[deviceType][deviceMode],
            data: { ...action.payload }
          }
        }
      };
    case 'load':
      return {
        ...state,
        [deviceType]: {
          ...state[deviceType],
          [deviceMode]: {
            ...state[deviceType][deviceMode],
            data: { ...action.payload },
            loadedKey
          }
        }
      };

    case 'use-desktop-font': {
      const { payload: section } = action;
      const { font_size, line_height } =
        state.mobile[deviceMode].data[section] || {};
      return {
        ...state,
        mobile: {
          ...state.mobile,
          [deviceMode]: {
            ...state.mobile[deviceMode],
            data: {
              ...state.mobile[deviceMode].data,
              [section]: {
                ...state.desktop[deviceMode].data[section],
                font_size,
                line_height
              }
            }
          }
        }
      };
    }

    default:
      return state;
  }
}

export function updateData(data, deviceType = 'desktop', deviceMode = 'light') {
  return {
    type: 'update',
    meta: {
      deviceType,
      deviceMode
    },
    payload: data
  };
}

export function loadData(
  data,
  deviceType = 'desktop',
  deviceMode = 'light',
  loadedKey = ''
) {
  return {
    type: 'load',
    meta: {
      deviceType,
      deviceMode,
      loadedKey
    },
    payload: data
  };
}

export function takeDesktopFont(section, deviceMode = 'light') {
  return {
    type: 'use-desktop-font',
    meta: {
      deviceMode
    },
    payload: section
  };
}
