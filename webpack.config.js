const HtmlWebpackPlugin = require('html-webpack-plugin');

const API_DELAY = 1000;

function sleep(ms) {
  return new Promise((resolve) => setTimeout(resolve, ms));
}

module.exports = {
  entry: "./src/index.jsx",
  resolve: { extensions: [".js", ".jsx"] },
  module: {
    rules: [
      {
        test: /\.jsx?$/,
        exclude: /node_modules/,
        use: {
          loader: "babel-loader",
          options: {
            presets: ["@babel/preset-env", "@babel/preset-react"],
          },
        },
      },
    ],
  },
  plugins: [
    new HtmlWebpackPlugin({
      templateContent: ({htmlWebpackPlugin}) => `
        <html>
          <head>
            <meta name="google" value="notranslate" />
            <link rel="stylesheet" href="https://unpkg.com/@shopify/polaris@11.2.2/build/esm/styles.css" />
          </head>
          <body>
            <div id="root"></div>
          </body>
        </html>
      `
    }),
  ],
  devServer: {
    historyApiFallback: true,
    setupMiddlewares(middlewares, devServer) {
      devServer.app.get('/locales/home', (request, response) => {
        const locale = request.query.locale || 'en';
        const contents = require(`./src/pages/Home/translations/${locale}.json`);
        response.status = 200;
        return sleep(1000).then(() => response.json(contents));
      });
      devServer.app.get('/locales/products', (request, response) => {
        const locale = request.query.locale || 'en';
        const contents = require(`./src/pages/products/translations/${locale}.json`);
        response.status = 200;
        return sleep(1000).then(() => response.json(contents));
      });
      devServer.app.get('/locales/orders', (request, response) => {
        const locale = request.query.locale || 'en';
        const contents = require(`./src/pages/orders/translations/${locale}.json`);
        response.status = 200;
        return sleep(1000).then(() => response.json(contents));
      });
      devServer.app.get('/locales/root', (request, response) => {
        const locale = request.query.locale || 'en';
        const contents = require(`./src/components/Navigation/translations/${locale}.json`);
        response.status = 200;
        return sleep(1000).then(() => response.json(contents));
      });

      devServer.app.get('/api/home', (_, response) => {
        return sleep(API_DELAY).then(() => response.json({}));
      });
      devServer.app.get('/api/orders', (_, response) => {
        return sleep(API_DELAY).then(() => response.json({
          orders: [
            {number: 101, price: 12.00},
            {number: 102, price: 23.57},
          ]
        }));
      });
      devServer.app.get('/api/products', (_, response) => {
        return sleep(API_DELAY).then(() => response.json({
          products: [
            {name: 'Widget', inventory: 5},
            {name: 'Fidget', inventory: 55},
          ]
        }));
      });
      return middlewares;
    },
  },
};
