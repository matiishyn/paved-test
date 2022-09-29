import { getContainerRenderer } from '../components/containers';
import {
  AD_BODY,
  AD_CTA,
  AD_SPONSORED,
  AD_TITLE,
  exportCss,
  getGoogleFontsStyleSheet
} from '../utils';
import * as ReactToCss from 'react-style-object-to-css';
import { template } from 'lodash';
import weblayout from '../components/containers/html';

const useExportHtml = () => {
  // Layout
  const htmlLayout = template(weblayout);

  const exportHtml = (settings, deviceModeSettings, selectedGoogleFonts) => {
    let headLine;
    if (settings.sponsorship_label.position === 'below_headline') {
      headLine = getContainerRenderer('headline').exporters['web'](
        {
          content: {
            AD_TITLE,
            AD_SPONSORED
          }
        },
        {
          htmlId: {
            headlineId: 'paved-ad-headline',
            sponsoredId: 'paved-ad-sponsor'
          }
        }
      );
    } else {
      headLine = getContainerRenderer('content').exporters['web'](AD_TITLE, {
        htmlId: 'paved-ad-headline'
      });
    }
    const body = getContainerRenderer('content').exporters['web'](AD_BODY, {
      htmlId: 'paved-ad-body'
    });

    const imageData = getContainerRenderer('image').exporters['web']({
      htmlId: 'paved-ad-img'
    });

    const cta = getContainerRenderer('content').exporters['web'](AD_CTA, {
      htmlId: 'paved-ad-cta'
    });

    const sponsored = getContainerRenderer('sponsored').exporters['web'](
      AD_SPONSORED,
      {
        htmlId: 'paved-ad-sponsor'
      }
    );

    const adHtml = getContainerRenderer('body').exporters['web'](
      settings.sponsorship_label.position === 'below_headline'
        ? !deviceModeSettings.headlineAbove
          ? imageData +
            '<div class="text-container">' +
            headLine +
            body +
            cta +
            '</div>'
          : imageData +
            headLine +
            '<div class="text-container">' +
            body +
            cta +
            '</div>'
        : !deviceModeSettings.headlineAbove
        ? imageData +
          '<div class="text-container">' +
          headLine +
          body +
          cta +
          '</div>' +
          sponsored
        : imageData +
          headLine +
          '<div class="text-container">' +
          body +
          cta +
          '</div>' +
          sponsored,
      { htmlId: 'base' }
    );

    let inlineCSS =
      exportCss(settings) +
      '\n' +
      `.sponsored{ ${ReactToCss(deviceModeSettings.pavedAdSponsorContainer)}}` +
      '\n' +
      `#paved-ad-sponsor{ ${ReactToCss(
        deviceModeSettings.pavedAdSponsorLabelStyle
      )}}` +
      '\n' +
      `#base{ ${ReactToCss(deviceModeSettings.baseStyle)}}` +
      '\n' +
      `.image-container{${ReactToCss(
        deviceModeSettings.imageContainerStyle
      )}}` +
      '\n' +
      `.text-container{${ReactToCss(deviceModeSettings.textContainerStyle)}}` +
      '\n' +
      `#paved-ad-headline{${ReactToCss(
        deviceModeSettings.pavedAdHeadlineStyle
      )}}` +
      '\n' +
      `#paved-ad-body{${ReactToCss(deviceModeSettings.pavedAdBodyStyle)}}` +
      '\n' +
      `#paved-ad-cta{${ReactToCss(deviceModeSettings.pavedAdCtaStyle)}}` +
      '\n' +
      settings?.custom_css;

    const htmlPage = htmlLayout({
      body: adHtml,
      inlineCSS: inlineCSS,
      linkStyleSheet: getGoogleFontsStyleSheet(selectedGoogleFonts)
    });

    return htmlPage;
  };

  return { exportHtml };
};

export default useExportHtml;
