export * from './constants';
export * from './custom-css';

export function generateQueryPath(pathname, query) {
  const path = `/${pathname}`;
  if (!query || typeof query !== 'object') {
    return path;
  }
  const queryParams = new URLSearchParams();
  Object.keys(query).forEach((key) => {
    const value = query[key];
    if (value !== null && value !== undefined && value !== '') {
      queryParams.set(key, value);
    }
  });
  const queryString = queryParams.toString();
  if (queryString && queryString.length) {
    return `${path}?${queryParams.toString()}`;
  }
  return path;
}
