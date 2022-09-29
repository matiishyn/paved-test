import { template } from 'lodash';

const webTemplate = template(`
  <div class="sponsored">
    <label id="<%= htmlId %>">
      <%= innerHTML %>
    </label>
  </div>
`);

const exporters = {
  web(innerHTML, values) {
    const { htmlId } = values;

    return webTemplate({ innerHTML, htmlId });
  }
};

export default {
  exporters
};
