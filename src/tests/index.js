const context = import.meta.webpackContext('../', {
  recursive: true,
  regExp: /\.spec\.jsx?$/,
});
context.keys().forEach(context);