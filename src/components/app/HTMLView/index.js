import React from 'react';
import ReactHtmlParser from 'react-html-parser';
import { getCustomHTML } from '../../../services';

export const HTMLView = ({ path }) => {
  const [html, setHtml] = React.useState(null);
  const [error, setError] = React.useState(false);

  React.useEffect(() => {
    getCustomHTML(path)
      .then((text) => setHtml(text))
      .catch(() => setError(true));
  }, [path]);

  if (error) {
    return <div className="alert layout-content">Error loading html file</div>;
  }

  return <div className="html-preview-container">{ReactHtmlParser(html)}</div>;
};
