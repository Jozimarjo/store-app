/* eslint-disable @typescript-eslint/no-var-requires */
/* eslint-disable no-undef */
const webpack = require('webpack');

module.exports = (config) => {
  config.plugins.push(
    new webpack.DefinePlugin({
      apiKey: JSON.stringify(process.env.API_KEY),
      authDomain:JSON.stringify(process.env.AUTH_DOMAIN),
      projectId:JSON.stringify(process.env.PROJECT_ID),
      storageBucket:JSON.stringify(process.env.STORAGE_BUCKET),
      messagingSenderId:JSON.stringify(process.env.MESSAGING_SENDER_ID),
      appId:JSON.stringify(process.env.APP_ID),

    })
  );

  return config;
};
