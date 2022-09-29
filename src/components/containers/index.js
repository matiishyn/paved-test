import containers from './containers';

export const getContainerRenderer = (type) => {
  return containers[type];
};
