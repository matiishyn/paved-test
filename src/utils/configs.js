import { API_URL_PROD } from './constants';

export const isCurrentEnvProduction = () => {
  return !(
    !process.env.NODE_ENV ||
    process.env.NODE_ENV === 'development' ||
    process.env.NODE_ENV === 'test'
  );
};

if (process.env.NODE_ENV === 'test') {
  require('dotenv').config();
}

const API_URL = API_URL_PROD;

const configs = {
  api_url: API_URL
};

export default configs;
