module.exports = `
  <!doctype html>
  <html lang="en">
    <head>
      <meta charset="utf-8">
      <meta http-equiv="x-ua-compatible" content="ie=edge">
      <meta name="description" content="">
      <meta name="viewport" content="width=device-width, initial-scale=1">
        <title>Ad Unit Builder</title>
      <%= linkStyleSheet %>
      <style>
        <%= inlineCSS %>
      </style>
    </head>
    <body>
      <%= body %>
    </body>
  </html>
`;
