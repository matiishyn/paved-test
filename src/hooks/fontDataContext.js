import React from 'react';
import { getGoogleFonts } from '../services';

export const FontDataContext = React.createContext();

export const FontDataProvider = (props) => {
  const [fontData, setFontData] = React.useState([]);
  React.useEffect(() => {
    getGoogleFonts().then((googleFonts) => setFontData(googleFonts));
  }, []);

  return (
    <FontDataContext.Provider value={[fontData]}>
      {props.children}
    </FontDataContext.Provider>
  );
};
