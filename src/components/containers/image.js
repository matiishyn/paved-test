import { template } from 'lodash';

const webTemplate = template(`
  <div class="image-container image-none">
    <img id="<%= htmlId %>"  src="https://paved-file-sharing.s3.amazonaws.com/pismo-example.jpeg" />
  </div>
`);

const exporters = {
  web(values) {
    const { htmlId } = values;

    return webTemplate({ htmlId });
  }
};

export default {
  exporters
};
