import React, { useMemo, useState, useEffect } from 'react';
import { sendRequest } from '../services';
import { DARK, DESKTOP, LIGHT, MOBILE } from '../utils';
import useExportHtml from './useExportHtml';
import {
  allDesktopValidateFuncs,
  allMobileValidateFuncs,
  validate
} from '../utils/helper-functions';
import useSetStyles from './useSetStyles';

const usePageData = (
  state,
  cardBackgroundColor,
  embed,
  imageVerticalAlignment,
  adData,
  site_id,
  placement,
  token,
  selectedGoogleFonts,
  activeDevice
) => {
  const [desktopStyles, setDesktopStyles] = useState(null);
  const [mobileStyles, setMobileStyles] = useState(null);

  const {
    baseStyle,
    pavedAdHeadlineStyle,
    imageContainerStyle,
    textContainerStyle,
    pavedAdSponsorContainer,
    pavedAdSponsorLabelStyle,
    pavedAdBodyStyle,
    pavedAdCtaStyle
  } = useSetStyles(cardBackgroundColor, embed, imageVerticalAlignment, adData);

  useEffect(() => {
    const deviceStyles = {
      baseStyle,
      pavedAdHeadlineStyle,
      imageContainerStyle,
      textContainerStyle,
      pavedAdSponsorContainer,
      pavedAdSponsorLabelStyle,
      pavedAdBodyStyle,
      pavedAdCtaStyle,
      headlineAbove: adData.headline.above_image
    };
    if (activeDevice === DESKTOP) {
      setDesktopStyles(deviceStyles);
    } else {
      setMobileStyles(deviceStyles);
    }
  }, [activeDevice, adData]);

  const updatingData = useMemo(() => {
    return [
      [DESKTOP, LIGHT],
      [DESKTOP, DARK],
      [MOBILE, LIGHT],
      [MOBILE, DARK]
    ]
      .filter(([type, mode]) => state[type][mode].loadedKey.length > 0)
      .filter(([type, mode]) => {
        if (type === DESKTOP) {
          return (
            validate(...allDesktopValidateFuncs)(state[type][mode].data)
              .length === 0
          );
        }
        return (
          validate(...allMobileValidateFuncs)(state[type][mode].data).length ===
          0
        );
      });
  }, [state]);

  const { exportHtml } = useExportHtml();

  const saveTemplate = () => {
    return Promise.all(
      updatingData.map(([device, lightMode]) =>
        sendRequest(
          `/sites/${site_id}/placements/${placement}/${device}/html?token=${token}${
            lightMode === DARK ? '&color_scheme=dark' : ''
          }`,
          {
            method: 'POST',
            payload:
              device === DESKTOP
                ? exportHtml(
                    state[device].light.data,
                    desktopStyles,
                    selectedGoogleFonts
                  )
                : exportHtml(
                    state[device].light.data,
                    mobileStyles,
                    selectedGoogleFonts
                  )
          }
        )
      )
    );
  };

  const saveSettings = () => {
    return Promise.all(
      updatingData.map(([device, lightMode]) =>
        sendRequest(
          `/sites/${site_id}/placements/${placement}/${device}/settings?token=${token}${
            lightMode === DARK ? '&color_scheme=dark' : ''
          }`,
          {
            method: 'POST',
            payload: state[device].light.data
          }
        )
      )
    );
  };

  const saveSize = async () => {
    return await Promise.allSettled([
      sendRequest(
        `/sites/${site_id}/placements/${placement}/size_change?token=${token}`,
        {
          method: 'POST',
          payload: {
            mobile: {
              width: state.mobile?.light?.data?.base?.width
            },
            desktop: {
              width: state.desktop?.light?.data?.base?.width
            }
          }
        }
      ),
      sendRequest(
        `/sites/${site_id}/placements/${placement}/size_change?token=${token}&color_scheme=dark`,
        {
          method: 'POST',
          payload: {
            mobile: {
              width: state.mobile?.dark?.data?.base?.width
            },
            desktop: {
              width: state.desktop?.dark?.data?.base?.width
            }
          }
        }
      )
    ]);
  };
  return {
    saveTemplate,
    saveSettings,
    saveSize
  };
};

export default usePageData;
