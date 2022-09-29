import { template } from 'lodash';

const webTemplate = template(`
  <div id="<%= htmlId.headlineId %>">
    <%= content.AD_TITLE %>
    <div class="sponsored">
    <label id="<%= htmlId.sponsoredId %>">
      <%= content.AD_SPONSORED %>
    </label>
  </div>
  </div>
`);

const exporters = {
  web(innerHTML, values) {
    const { content } = innerHTML;
    const { htmlId } = values;

    return webTemplate({ content, htmlId });
  }
};

export default {
  exporters
};
