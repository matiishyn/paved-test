const useSetStyles = (
  cardBackgroundColor,
  embed,
  imageVerticalAlignment,
  adData
) => {
  // Base style cases
  const baseLayoutModifiers = {
    sponsorshipTop: adData.sponsorship_label?.position === 'top',
    sponsorshipBottom: adData.sponsorship_label?.position === 'bottom',
    sponsorshipHeadline:
      adData.sponsorship_label?.position === 'below_headline',
    imageLeft: adData.image?.alignment === 'flex',
    imageTop: adData.image?.alignment === 'grid',
    imageRight: adData.image?.alignment === 'right',
    imageShow: adData.image?.show,
    headlineAbove: adData.headline?.above_image
  };

  const {
    sponsorshipTop,
    sponsorshipBottom,
    sponsorshipHeadline,
    imageLeft,
    imageTop,
    imageRight,
    imageShow,
    headlineAbove
  } = baseLayoutModifiers;

  const baseStyle = {
    overflow: 'auto',
    minWidth: adData.base?.width,
    maxWidth: adData.base?.width,
    display: 'grid',
    gridTemplateColumns: imageShow ? 'auto auto' : '1fr',
    gridTemplateRows: 'repeat(auto-fit, minmax(0, max-content))',
    backgroundColor: adData.base?.background_color,
    position: 'relative',
    margin: 'auto'
  };

  const pavedAdHeadlineStyle = {
    color: adData.headline?.color,
    cursor: 'pointer',
    fontSize: adData.headline?.font_size,
    fontStyle: adData.headline?.italic ? 'italic' : undefined,
    fontFamily: adData.headline?.font,
    fontWeight: adData.headline?.weight,
    lineHeight: adData.headline?.line_height,
    paddingTop: adData.headline?.padding_top + 'px',
    paddingRight: `${adData.headline?.padding_right}px`,
    paddingBottom: adData.headline?.padding_bottom + 'px',
    paddingLeft: `${adData.headline?.padding_left}px`,
    textAlign: adData.headline?.alignment,
    textDecoration: adData.headline?.underline ? 'underline' : undefined,
    textTransform: adData.headline?.uppercase ? 'uppercase' : undefined,
    ...(headlineAbove &&
      sponsorshipTop && {
        gridColumn: '1 / 3',
        gridRow: '2 / 3'
      }),
    ...(headlineAbove &&
      sponsorshipHeadline && {
        gridColumn: '1 / 3'
      }),
    ...(headlineAbove &&
      sponsorshipBottom && {
        gridColumn: '1 / 3',
        gridRow: '1 / 2'
      })
  };

  const adUnitMockUpContainerStyle = {
    background: cardBackgroundColor,
    maxHeight:
      embed.toString().toLowerCase() === 'true'
        ? 'calc(100vh - 80px)'
        : 'calc(100vh - 180px)',
    minHeight:
      embed.toString().toLowerCase() === 'true'
        ? 'calc(100vh - 80px)'
        : 'calc(100vh - 180px)'
  };

  const imageContainerStyle = {
    display: adData.image?.alignment !== 'grid' ? 'grid' : 'block',
    flex: adData.headline?.above_image && '1 0 30%',
    ...(Boolean(imageLeft) && {
      gridColumn: '1 / 2'
    }),
    ...(Boolean(imageTop) && {
      gridColumn: '1 / 3'
    }),
    ...(Boolean(imageRight) && {
      gridColumn: '2 / 3'
    }),
    ...(Boolean(
      (imageTop && sponsorshipTop && !headlineAbove) ||
        (headlineAbove && (sponsorshipHeadline || sponsorshipBottom))
    ) && {
      gridRow: '2 / 3'
    }),
    ...(Boolean(sponsorshipTop && headlineAbove && imageTop) && {
      gridRow: '3 / 4'
    })
  };

  const imageStyle = {
    height: adData.image?.height,
    width: adData.image?.width,
    alignSelf: imageVerticalAlignment
  };

  const textContainerStyle = {
    gridColumn: imageLeft ? '2 / 3' : '1 / 2',
    ...(Boolean(
      (imageRight && !sponsorshipHeadline) ||
        (imageRight &&
          (sponsorshipBottom || sponsorshipHeadline) &&
          !headlineAbove)
    ) && {
      gridColumn: '1 / 2',
      gridRow: '1 / 2'
    }),
    ...(Boolean(imageTop) && {
      gridColumn: '1 / 3'
    }),
    ...(((headlineAbove && sponsorshipTop && !imageTop) ||
      (headlineAbove && imageTop && sponsorshipHeadline) ||
      (imageTop && sponsorshipTop) ||
      (headlineAbove && imageTop && sponsorshipBottom)) && {
      gridRow: '3 / 4'
    }),
    ...(Boolean(headlineAbove && !imageTop && sponsorshipBottom) && {
      gridRow: '2 / 3'
    }),
    ...((headlineAbove &&
      (sponsorshipHeadline || sponsorshipBottom) &&
      !imageTop) ||
      (sponsorshipTop &&
        imageRight &&
        !headlineAbove && {
          gridRow: '2 / 3'
        })),
    ...(Boolean(headlineAbove && imageTop && sponsorshipTop) && {
      gridRow: '4 / 5'
    })
  };

  const pavedAdSponsorContainer = {
    width: '100%',
    alignSelf:
      adData.sponsorship_label?.position === 'top' ? 'flex-end' : 'flex-start',
    ...(sponsorshipTop && {
      gridColumn: '1 / 3',
      gridRow: '1 / 2'
    }),
    ...(sponsorshipBottom &&
      imageTop &&
      !headlineAbove && {
        gridColumn: '1 / 3',
        gridRow: '3 / 4'
      }),
    ...(sponsorshipBottom &&
      !imageTop &&
      !headlineAbove && {
        gridColumn: '1 / 3',
        gridRow: '2 / 3'
      }),
    ...(sponsorshipBottom &&
      headlineAbove && {
        gridColumn: '1 / 3'
      }),
    ...(headlineAbove &&
      !imageShow &&
      imageTop &&
      sponsorshipBottom && {
        gridColumn: '1 / 3',
        gridRow: '4 / 5'
      })
  };

  let sponsoredToggleDisplay = true;
  if (adData.sponsorship_label?.show) {
    sponsoredToggleDisplay = 'block';
  } else if (
    typeof adData.sponsorship_label?.show === 'boolean' &&
    !adData.sponsorship_label?.show
  ) {
    sponsoredToggleDisplay = 'none';
  }

  const pavedAdSponsorLabelStyle = {
    width: '100%',
    color: adData.sponsorship_label?.color,
    cursor: 'pointer',
    fontSize: adData.sponsorship_label?.font_size,
    fontStyle: adData.sponsorship_label?.italic ? 'italic' : undefined,
    fontFamily: adData.sponsorship_label?.font,
    fontWeight: adData.sponsorship_label?.weight,
    lineHeight: adData.sponsorship_label?.line_height,
    paddingTop: adData.sponsorship_label?.padding_top + 'px',
    paddingRight: `${adData.sponsorship_label?.padding_right}px`,
    paddingBottom: adData.sponsorship_label?.padding_bottom + 'px',
    paddingLeft: `${adData.sponsorship_label?.padding_left}px`,
    textAlign: adData.sponsorship_label?.alignment,
    textDecoration: adData.sponsorship_label?.underline
      ? 'underline'
      : undefined,
    textTransform: adData.sponsorship_label?.uppercase
      ? 'uppercase'
      : undefined,
    display: sponsoredToggleDisplay
  };

  const pavedAdBodyStyle = {
    color: adData.body?.color,
    cursor: 'pointer',
    fontSize: adData.body?.font_size,
    fontStyle: adData.body?.italic ? 'italic' : undefined,
    fontFamily: adData.body?.font,
    fontWeight: adData.body?.weight,
    lineHeight: adData.body?.line_height,
    paddingTop: adData.body?.padding_top + 'px',
    paddingRight: adData.body?.padding_right + 'px',
    paddingBottom: adData.body?.padding_bottom + 'px',
    paddingLeft: adData.body?.padding_left + 'px',
    textAlign: adData.body?.alignment,
    textDecoration: adData.body?.underline ? 'underline' : undefined,
    textTransform: adData.body?.uppercase ? 'uppercase' : undefined
  };

  const pavedAdCtaStyle = {
    color: adData.cta?.color,
    cursor: 'pointer',
    fontSize: adData.cta?.font_size,
    fontStyle: adData.cta?.italic ? 'italic' : undefined,
    fontFamily: adData.cta?.font,
    fontWeight: adData.cta?.weight,
    lineHeight: adData.cta?.line_height,
    paddingTop: adData.cta?.padding_top + 'px',
    paddingRight: adData.cta?.padding_right + 'px',
    paddingBottom: adData.cta?.padding_bottom + 'px',
    paddingLeft: adData.cta?.padding_left + 'px',
    textAlign: adData.cta?.alignment,
    textDecoration: adData.cta?.underline ? 'underline' : undefined,
    textTransform: adData.cta?.uppercase ? 'uppercase' : undefined
  };

  return {
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
  };
};

export default useSetStyles;
