import React from 'react';
import useSetStyles from '../../../hooks/useSetStyles';
import {
  AD_TITLE,
  AD_BODY,
  AD_CTA,
  AD_SPONSORED
} from '../../../utils/constants';
import styles from './styles';

export default function AdPreview({
  adUnitOnClickHandler,
  embed,
  adData,
  cardBackgroundColor,
  imageVerticalAlignment
}) {
  const {
    baseStyle,
    pavedAdHeadlineStyle,
    adUnitMockUpContainerStyle,
    imageContainerStyle,
    imageStyle,
    textContainerStyle,
    pavedAdSponsorContainer,
    pavedAdSponsorLabelStyle,
    pavedAdBodyStyle,
    pavedAdCtaStyle
  } = useSetStyles(cardBackgroundColor, embed, imageVerticalAlignment, adData);

  const SponsorshipLabel = () => {
    return (
      <div
        className="sponsored"
        style={pavedAdSponsorContainer}
        onClick={() => adUnitOnClickHandler('Sponsorship Label')}
      >
        <label id="paved-ad-sponsor" style={pavedAdSponsorLabelStyle}>
          {AD_SPONSORED}
        </label>
      </div>
    );
  };

  return (
    <>
      <div
        className="ad-unit-mock-up-container"
        style={adUnitMockUpContainerStyle}
      >
        <style type="text/css">
          {adData.custom_css?.replace(/\;/gi, ' !important;')}
        </style>
        <div id="base" style={baseStyle}>
          {adData.sponsorship_label?.position === 'top' && <SponsorshipLabel />}

          {adData.headline?.show && adData.headline?.above_image && (
            <div
              id="paved-ad-headline"
              style={pavedAdHeadlineStyle}
              onClick={() => adUnitOnClickHandler('Headline')}
            >
              {AD_TITLE}
              {adData.sponsorship_label?.position === 'below_headline' && (
                <SponsorshipLabel />
              )}
            </div>
          )}
          {adData.image?.show && (
            <div
              className="image-container"
              style={imageContainerStyle}
              onClick={() => adUnitOnClickHandler('Image')}
            >
              <img
                style={imageStyle}
                src="https://paved-file-sharing.s3.amazonaws.com/pismo-example.jpeg"
                alt="ad image"
              />
            </div>
          )}
          <div className="text-container" style={textContainerStyle}>
            {adData.headline?.show && !adData.headline?.above_image && (
              <div
                id="paved-ad-headline"
                style={pavedAdHeadlineStyle}
                onClick={() => adUnitOnClickHandler('Headline')}
              >
                {AD_TITLE}
                {adData.sponsorship_label?.position === 'below_headline' && (
                  <SponsorshipLabel />
                )}
              </div>
            )}
            {adData.body?.show && (
              <div
                id="paved-ad-body"
                style={pavedAdBodyStyle}
                onClick={() => adUnitOnClickHandler('Body')}
              >
                {AD_BODY}
              </div>
            )}
            {adData.cta?.show && (
              <div
                id="paved-ad-cta"
                style={pavedAdCtaStyle}
                onClick={() => adUnitOnClickHandler('CTA')}
              >
                {AD_CTA}
              </div>
            )}
          </div>

          {adData.sponsorship_label?.position === 'bottom' && (
            <SponsorshipLabel />
          )}
        </div>
      </div>
      <style jsx>{styles}</style>
    </>
  );
}
