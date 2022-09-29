import React, { useContext, useEffect, useMemo, useState } from 'react';
import { mergeWith, isEqual } from 'lodash';
import { useToasts } from 'react-toast-notifications';
import ReactSelect from 'react-select';
import { sendRequest, getEnabledDarkMode } from '../services';
import { AdDataContext } from '../hooks/adDataContext';
import { FontDataContext } from '../hooks/fontDataContext';
import usePageQuery from '../hooks/pageQuery';
import PositionOptions from '../components/editors/SponsorshipLabel/position.options.json';
import {
  DEFAULT_CUSTOM_CSS,
  DEFAULT_DESKTOP_SETTINGS,
  DEFAULT_MOBILE_SETTINGS,
  F_WARNING_BODY,
  F_WARNING_TITLE,
  WARNING_TITLE,
  WARNING_BODY,
  DESKTOP,
  MOBILE,
  DARK,
  LIGHT,
  CUSTOM_REACT_SELECT_STYLES
} from '../utils';
import {
  getSuggestedSettings,
  getGoogleFonts,
  validate,
  allMobileValidateFuncs,
  allDesktopValidateFuncs,
  validateBodyFontSize,
  validateCTAFontSize,
  validateHeadlineFontSize
} from './../utils/helper-functions';
import AdPreview from '../components/app/AdPreview';
import AdUnitDesign from '../components/editors/AdUnitDesign';
import CustomCSS from '../components/editors/CustomCSS';
import FontDesign from '../components/editors/FontDesign';
import ImageDesign from '../components/editors/ImageDesign';
import Footer from '../components/app/Footer';
import ErrorLayout from '../layouts/ErrorLayout';
import LayoutWithNav from '../layouts/LayoutWithNav';
import LoadingLayout from '../layouts/LoadingLayout';
import FontLoad from '../components/app/FontLoad';
import { HTMLView } from '../components/app/HTMLView';
import Accordion from '../components/shared/Accordion';
import WarningModal from '../components/modals/WarningModal';
import { LightDarkMode } from '../components/app/LightDarkMode';
import Switch from 'react-switch';
import Device from '../components/app/Device';
import LockedInfoLayout from '../layouts/LockedInfoLayout/LockedInfoLayout';
import { ratio } from 'wcag-color';
import usePageData from '../hooks/usePageData';

export default function DesignTemplate() {
  const [isMobile, setIsMobile] = useState(false);
  const [isLoading, setIsLoading] = useState(true);
  const handleResize = () => {
    if (window.innerWidth < 720) {
      setIsMobile(true);
    } else {
      setIsMobile(false);
    }
  };

  useEffect(() => {
    window.addEventListener('resize', handleResize);
  });

  const [activeDevice, setActiveDevice] = useState(DESKTOP);

  const [showSections, setShowSections] = useState({ 0: true });

  // Settings (adData is the one which is showing, the other two is like 'store')
  const [state, updateState, loadState, takeDesktopFontData] =
    useContext(AdDataContext);
  const [googleFonts] = useContext(FontDataContext);
  const [suggestions, setSuggestions] = useState(null);
  const [enabledDarkMode, setEndableDarkMode] = useState(false);
  const [isDark, setIsDark] = useState(false);

  const [cardBackgroundColor, setCardBackgroundColor] = useState('#ffffff');
  const [imageVerticalAlignment, setImageVerticalAlignment] = useState('auto');

  const onToggleDarkMode = () => setIsDark((currentMode) => !currentMode);

  const deviceMode = isDark ? DARK : LIGHT;
  const adData = state[activeDevice][deviceMode].data;

  const selectedFonts = adData
    ? ['headline', 'body', 'cta'].map((section) => adData[section]?.font)
    : [];

  const selectedGoogleFonts = getGoogleFonts(selectedFonts, googleFonts);

  // Initialize token, placement, site_id from URL
  const {
    token = null,
    placement = null,
    site_id = null,
    embed = false
  } = usePageQuery();
  const missingQueryParams = [
    !token ? 'token' : null,
    !placement ? 'placement' : null,
    !site_id ? 'site_id' : null
  ].filter((e) => e);

  useEffect(() => {
    if (!token || !placement || !site_id) {
      return null;
    }

    if (isDark) {
      return setCardBackgroundColor('#313131');
    }

    if (adData?.base?.background_color) {
      const background_ad_unit_ratio_vs_ececec = ratio(
        '#ececec',
        adData.base?.background_color
      );

      if (ratio('#ffffff', adData.base?.background_color) < 1.05) {
        setCardBackgroundColor('#ececec');
      } else if (background_ad_unit_ratio_vs_ececec < 1.6) {
        setCardBackgroundColor('#ffffff');
      } else {
        setCardBackgroundColor('#ececec');
      }
    }
  }, [adData?.base?.background_color, isDark]);

  useEffect(() => {
    if (!token || !placement || !site_id) {
      return null;
    }

    if (adData) {
      let imageVerticalAlignment = 'auto';

      switch (adData.image?.vertical_alignment) {
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
      setImageVerticalAlignment(imageVerticalAlignment);
    }
  }, [adData?.image?.vertical_alignment]);

  useEffect(() => {
    if (!token || !placement || !site_id) {
      return null;
    }
    getEnabledDarkMode(
      `/sites/${site_id}/placements/${placement}/dark_mode_enabled?token=${token}`
    ).then((darkModeResponse) => setEndableDarkMode(true));
  }, [site_id, token, placement]);

  const loadedKey = state[activeDevice][deviceMode]?.loadedKey;

  useEffect(async () => {
    const currentLoadedKey = `${token}-${placement}${site_id}`;
    if (!token || !placement || !site_id || currentLoadedKey === loadedKey) {
      return;
    }
    setIsLoading(true);
    const darkQuery = deviceMode === DARK ? '&color_scheme=dark' : '';

    const [savedData, suggestedData] = await Promise.allSettled([
      sendRequest(
        `/sites/${site_id}/placements/${placement}/${activeDevice}/settings?token=${token}`
      ),
      sendRequest(`/sites/${site_id}/suggestions?token=${token}${darkQuery}`)
    ]);
    const defaultSettings =
      activeDevice === DESKTOP
        ? DEFAULT_DESKTOP_SETTINGS
        : DEFAULT_MOBILE_SETTINGS;
    const suggestedSettings =
      suggestedData.status !== 'rejected' && suggestedData.value
        ? getSuggestedSettings(
            suggestedData?.value,
            isMobile ? MOBILE : DESKTOP
          )
        : defaultSettings;
    setSuggestions(suggestedSettings);
    const settings = savedData.status === 'fulfilled' ? savedData.value : {};
    loadState(
      mergeWith(
        {
          custom_css: DEFAULT_CUSTOM_CSS
        },
        defaultSettings,
        suggestedSettings,
        settings,
        (a, b) => b || a //Avoid null value
      ),
      activeDevice,
      deviceMode,
      currentLoadedKey
    );
    setIsLoading(false);
  }, [activeDevice, deviceMode, token, placement, site_id, loadedKey]);

  // todo move to hook
  const adUnitAutoResize = React.useCallback(() => {
    if (adData) {
      let totalHeight = 0;
      const paddings = 32;
      const headlineHeight =
        document.getElementById('paved-ad-headline')?.offsetHeight;
      const bodyHeight = document.getElementById('paved-ad-body')?.offsetHeight;
      const ctaHeight = document.getElementById('paved-ad-cta')?.offsetHeight;

      totalHeight = paddings + headlineHeight;

      if (adData.body?.show) {
        totalHeight += bodyHeight;
      }

      if (adData.cta?.show) {
        totalHeight += ctaHeight;
      }

      // Add image height to total if the alignment is set to Top
      if (adData.image?.alignment === 'grid' && adData.image?.show) {
        totalHeight += 30 + adData.image?.height;
      }

      // Set the total if the image's height is bigger than the ad's height
      if (totalHeight < adData.image?.height && adData.image?.show) {
        totalHeight = adData.image?.height;
      }

      // Increase the ad's height if the 'Sponsored' text covers the CTA text
      if (
        ((!adData.image?.show || adData.image?.alignment !== 'right') &&
          adData.cta?.alignment === 'right') ||
        (adData.image?.alignment === 'right' &&
          adData.cta?.alignment === 'left')
      ) {
        totalHeight += 30;
      }

      if (adData.base?.height !== totalHeight) {
        updateState(
          {
            ...adData,
            base: {
              ...adData.base,
              height: totalHeight
            }
          },
          activeDevice,
          deviceMode
        );
      }
    }
  }, [state, deviceMode, activeDevice]);

  useEffect(() => {
    adUnitAutoResize();
  }, []);

  const changeVisibleSection = (sectionIndex) => {
    setShowSections((currentSection) => {
      if (currentSection[sectionIndex]) {
        return {};
      } else {
        return {
          [sectionIndex]: true
        };
      }
    });
  };

  const adUnitOnClickHandler = (section) => {
    switch (section) {
      case 'Image':
        changeVisibleSection(1);
        break;
      case 'Headline':
        changeVisibleSection(2);
        break;
      case 'Body':
        changeVisibleSection(3);
        break;
      case 'CTA':
        changeVisibleSection(4);
        break;
      case 'Sponsorship Label':
        changeVisibleSection(5);
        break;
      default:
        break;
    }
  };

  const { saveTemplate, saveSettings, saveSize } = usePageData(
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
  );

  const saveEventListener = React.useCallback(
    (event) => {
      const isSavingEvent = event?.data?.event_action === 'save';
      const isValidatedData =
        mobileError.length === 0 && desktopError.length === 0;
      if (isSavingEvent && isValidatedData) {
        Promise.all([saveSettings(), saveTemplate()])
          .then(() => {
            parent.postMessage({ status: 'saved' }, '*');
          })
          .catch(() => {
            parent.postMessage({ status: 'failed' }, '*');
          });
      }
    },
    [state, enabledDarkMode]
  );

  useEffect(() => {
    window.addEventListener('message', saveEventListener);

    return () => {
      window.removeEventListener('message', saveEventListener);
    };
  }, [state, enabledDarkMode]);

  const { addToast } = useToasts();
  const warningTitle = React.useRef('');
  const warningBody = React.useRef('');

  const onSave = async () => {
    setWarningModalOpen(false);
    try {
      await saveSettings();
      await saveTemplate();
      addToast('Settings saved successfully.', {
        appearance: 'success',
        autoDismiss: true,
        autoDismissTimeout: 5000
      });
    } catch (error) {
      addToast('We were unable to save these changes. Please try again.', {
        appearance: 'error',
        autoDismiss: true,
        autoDismissTimeout: 5000
      });
    }
  };

  const [warningModalOpen, setWarningModalOpen] = React.useState(false);
  const onCancel = () => {
    setWarningModalOpen(false);
  };

  const sponsorPosition = useMemo(() => {
    return {
      value: adData.sponsorship_label?.position || '',
      label:
        PositionOptions.filter(
          (position) => position.value === adData.sponsorship_label?.position
        )?.[0]?.label || ''
    };
  }, [adData]);

  const onRequestSave = async () => {
    let responses = [{ size_change: true }, { size_change: true }];

    try {
      responses = await saveSize();
      warningTitle.current = WARNING_TITLE;
      warningBody.current = WARNING_BODY;
    } catch (error) {
      warningTitle.current = F_WARNING_TITLE;
      warningBody.current = F_WARNING_BODY;
      addToast('Unable to detect ad unit changes.', {
        appearance: 'error',
        autoDismiss: true,
        autoDismissTimeout: 5000
      });
    }

    if (responses.some((response) => response?.size_change)) {
      return setWarningModalOpen(true);
    }

    await onSave();
  };

  const htmlPath = `/sites/${site_id}/placements/${placement}/${activeDevice.toLocaleLowerCase()}/html?token=${token}`;

  const isDeviceDifferential = React.useCallback(
    (section) => {
      const {
        font_size: _unusedMobileFontSize,
        line_height: _unuseMobileLineHeight,
        ...mobileData
      } = state[MOBILE][deviceMode].data[section];
      const {
        font_size: _unusedDesktopFontSize,
        line_height: unusedDesktopLineHeight,
        ...desktopData
      } = state[DESKTOP][deviceMode].data[section];

      return isEqual(mobileData, desktopData);
    },
    [state, deviceMode]
  );

  const mobileError = enabledDarkMode
    ? validate(...allMobileValidateFuncs)(state.mobile[LIGHT].data) ||
      validate(...allMobileValidateFuncs)(state.mobile[DARK].data)
    : validate(...allMobileValidateFuncs)(state.mobile[LIGHT].data);
  const desktopError = enabledDarkMode
    ? validate(...allDesktopValidateFuncs)(state.desktop[LIGHT].data) ||
      validate(...allDesktopValidateFuncs)(state.desktop[DARK].data)
    : validate(...allDesktopValidateFuncs)(state.desktop[LIGHT].data);

  const isInvalid = desktopError.length > 0 || mobileError.length > 0;

  const errors = (() => {
    let errs = [];
    if (!isInvalid) {
      return [];
    }
    if (mobileError) {
      errs.push(`(Mobile) ${mobileError}`);
    }
    if (desktopError) {
      errs.push(`(Desktop) ${desktopError}`);
    }
    return errs;
  })();

  const setAdData = (data) => updateState(data, activeDevice, deviceMode);

  if (!adData || (isLoading && !missingQueryParams?.length))
    return <LoadingLayout loadingMessage={'Loading'} />;

  if (missingQueryParams && missingQueryParams.length > 0) {
    return <ErrorLayout missingQueryParams={missingQueryParams} />;
  }

  // Toggle sponsorship Label handler
  if (typeof adData.sponsorship_label?.show === 'undefined') {
    setAdData({
      ...adData,
      sponsorship_label: {
        ...adData.sponsorship_label,
        show: true
      }
    });
  }

  const toggleSponsorshipLabel = () => {
    setAdData({
      ...adData,
      sponsorship_label: {
        ...adData.sponsorship_label,
        show: !adData.sponsorship_label?.show
      }
    });
  };

  return (
    <LayoutWithNav>
      <div className="nav-bar-container">
        <Device activeDevice={activeDevice} setActiveDevice={setActiveDevice} />
        {enabledDarkMode && (
          <LightDarkMode isDark={isDark} onToggle={onToggleDarkMode} />
        )}
      </div>
      {adData?.locked && <LockedInfoLayout />}
      {/* -------- */}
      <div className="layout-content">
        <div className="app-container">
          <div className="d-flex">
            <div style={{ height: 'calc(100vh - 180px)' }}>
              <Accordion style={{ height: '100%' }}>
                <AdUnitDesign
                  activeDevice={activeDevice}
                  heading={'Ad Unit Size'}
                  isOpen={showSections[0]}
                  onToggle={() => changeVisibleSection(0)}
                  presetColors={suggestions?.base?.background_colors}
                  adData={adData}
                  setAdData={setAdData}
                />
                {adData && (
                  <>
                    <ImageDesign
                      activeDevice={activeDevice}
                      heading="Image"
                      isOpen={showSections[1]}
                      onToggle={() => changeVisibleSection(1)}
                      adData={adData}
                      setAdData={setAdData}
                    />
                    <FontDesign
                      heading="Headline"
                      hideSwitch
                      isOpen={showSections[2]}
                      onToggle={() => changeVisibleSection(2)}
                      presetColors={suggestions?.text?.colors}
                      validateFunc={validateHeadlineFontSize}
                      adData={adData}
                      setAdData={setAdData}
                      activeDevice={activeDevice}
                      onTakeDesktopData={() =>
                        takeDesktopFontData('headline', deviceMode)
                      }
                      isDeviceFontDifferential={isDeviceDifferential(
                        'headline'
                      )}
                    >
                      <input
                        className="form-check-input"
                        id="headlineMovetoTop"
                        type="checkbox"
                        name="headlineImage"
                        checked={adData.headline.above_image}
                        onClick={(e) => {
                          setAdData({
                            ...adData,
                            headline: {
                              ...adData.headline,
                              above_image: e.target.checked
                            }
                          });
                        }}
                        defaultChecked={false}
                        disabled={!adData?.image?.show}
                      />
                      <label
                        className="form-check-label ps-2"
                        htmlFor="headlineMovetoTop"
                      >
                        Move to top
                      </label>
                    </FontDesign>

                    <FontDesign
                      heading="Body Text"
                      isOpen={showSections[3]}
                      onToggle={() => changeVisibleSection(3)}
                      presetColors={suggestions?.text?.colors}
                      validateFunc={validateBodyFontSize}
                      adData={adData}
                      setAdData={setAdData}
                      activeDevice={activeDevice}
                      onTakeDesktopData={() =>
                        takeDesktopFontData('body', deviceMode)
                      }
                      isDeviceFontDifferential={isDeviceDifferential('body')}
                    />
                    <FontDesign
                      heading="CTA Text"
                      isOpen={showSections[4]}
                      onToggle={() => changeVisibleSection(4)}
                      presetColors={suggestions?.text?.colors}
                      validateFunc={validateCTAFontSize}
                      adData={adData}
                      setAdData={setAdData}
                      activeDevice={activeDevice}
                      onTakeDesktopData={() =>
                        takeDesktopFontData('cta', deviceMode)
                      }
                      isDeviceFontDifferential={isDeviceDifferential('cta')}
                    />
                    <FontDesign
                      heading="Sponsorship Label"
                      hideSwitch
                      hideLineHeight
                      isOpen={showSections[5]}
                      onToggle={() => changeVisibleSection(5)}
                      presetColors={suggestions?.text?.colors}
                      validateFunc={validateCTAFontSize}
                      adData={adData}
                      setAdData={setAdData}
                    >
                      <div className="property-container">
                        <div className={'my-row'}>
                          <label>
                            {adData.sponsorship_label?.show
                              ? 'Disable'
                              : 'Enable'}{' '}
                            Sponsorship Label
                          </label>
                        </div>
                        <div className={'my-row'}>
                          <Switch
                            disabled={false}
                            height={20}
                            width={48}
                            onColor={'#206BC4'}
                            checkedIcon={false}
                            uncheckedIcon={false}
                            onChange={() => toggleSponsorshipLabel()}
                            checked={adData?.sponsorship_label?.show}
                          />
                        </div>
                      </div>
                      <label>Position</label>
                      <ReactSelect
                        isDisabled={
                          typeof adData?.sponsorship_label?.show !==
                            'undefined' && !adData?.sponsorship_label?.show
                        }
                        value={sponsorPosition}
                        onChange={(value) => {
                          setAdData({
                            ...adData,
                            sponsorship_label: {
                              ...adData.sponsorship_label,
                              position: value.value
                            }
                          });
                        }}
                        options={PositionOptions}
                        styles={{ ...CUSTOM_REACT_SELECT_STYLES }}
                      />
                      <div className="d-flex w-100 mb-2" />
                    </FontDesign>
                    <CustomCSS
                      key={Object.keys(showSections)[0]}
                      heading="Custom CSS"
                      isOpen={showSections[6]}
                      onToggle={() => changeVisibleSection(6)}
                      adData={adData}
                      setAdData={setAdData}
                    />
                  </>
                )}
              </Accordion>
            </div>

            {adData?.locked ? (
              <HTMLView path={htmlPath} adData={adData} />
            ) : (
              <AdPreview
                adUnitOnClickHandler={adUnitOnClickHandler}
                embed={embed}
                adData={adData}
                cardBackgroundColor={cardBackgroundColor}
                imageVerticalAlignment={imageVerticalAlignment}
              />
            )}
          </div>
        </div>
        {embed.toString().toLowerCase() !== 'true' && (
          <Footer onSave={onRequestSave} errors={errors} />
        )}
      </div>
      {selectedGoogleFonts.map((font) => (
        <FontLoad font={font} key={font.family} />
      ))}
      <WarningModal
        isOpen={warningModalOpen}
        title={warningTitle.current}
        body={warningBody.current}
        onCancel={onCancel}
        onOK={onSave}
      />
    </LayoutWithNav>
  );
}
