import React from 'react';
import {
  reducer,
  initialState,
  updateData,
  loadData,
  takeDesktopFont
} from './useSettings';

export const AdDataContext = React.createContext();

export const AdDataProvider = (props) => {
  const [state, dispatch] = React.useReducer(reducer, initialState);
  const updateState = (data, deviceType, deviceMode) =>
    dispatch(updateData(data, deviceType, deviceMode));
  const loadState = (data, deviceType, deviceMode, loadedKey) =>
    dispatch(loadData(data, deviceType, deviceMode, loadedKey));
  const takeDesktopFontData = (section, deviceMode) =>
    dispatch(takeDesktopFont(section, deviceMode));
  return (
    <AdDataContext.Provider
      value={[state, updateState, loadState, takeDesktopFontData]}
    >
      {props.children}
    </AdDataContext.Provider>
  );
};
