import { template } from 'lodash';

const webTemplate = template(`
  <div id="<%= htmlId %>">
    <%= innerHTML %>
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
