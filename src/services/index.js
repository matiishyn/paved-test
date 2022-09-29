import configs from '../utils/configs';

export function sendRequest(path, config = {}) {
  return fetch(configs.api_url + path, {
    method: config.method?.toUpperCase() ?? 'GET',
    mode: 'cors',
    headers: {
      'Access-Control-Allow-Origin': '*',
      'Content-Type': 'application/json'
    },
    body: config.payload ? JSON.stringify(config.payload) : undefined
  }).then(async (response) => {
    if (response.status !== 200) {
      return Promise.reject('Request failed');
    }
    return response.json();
  });
}

export function getEnabledDarkMode(path) {
  return fetch(`${configs.api_url}${path}`, {
    mode: 'cors',
    headers: {
      'Access-Control-Allow-Origin': '*'
    }
  })
    .then((response) => {
      return response.text();
    })
    .catch(() => {
      return 'False';
    });
}

export function getGoogleFonts() {
  return fetch(
    'https://www.googleapis.com/webfonts/v1/webfonts?key=AIzaSyAlQgtBRN_CH_jRkN2Xdr65qF7uxtSwU5A'
  )
    .then((response) => response.json())
    .then((data) =>
      data.items.filter((item) => item.subsets.includes('latin-ext'))
    );
}

export function getCustomHTML(path) {
  return fetch(configs.api_url + path).then((response) => {
    if (response.status !== 200) {
      return Promise.reject('Failed to load html');
    }
    return response.text();
  });
}
