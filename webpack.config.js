const HtmlWebpackPlugin = require('html-webpack-plugin');
const path = require('path');

const API_DELAY = 1000;

function sleep(ms) {
  return new Promise((resolve) => setTimeout(resolve, ms));
}

function generateConfig(locale) {
  return {
    name: locale,
    entry: "./src/index.jsx",
    output: { 
      filename: `[name].${locale}.js`,
      path: path.resolve(__dirname, 'dist', locale),
    },
    resolve: { 
      extensions: [".js", ".jsx"] 
    },
    module: {
      rules: [
        {
          test: /translations\/.*\.json/,
          exclude: /node_modules/,
          use: {
            loader: require.resolve('./empty-json-loader'),
            options: { locale },
          },
        },
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
}

module.exports = [
  {
    name: 'proxy',
    entry: {},
    devServer: {
      setupMiddlewares(middlewares, devServer) {
        middlewares.push((req, res) => {
          if (/locale=fr/.test(req.headers.cookie)) {
            res.redirect(`http://localhost:8082${req.path}`);
          } else {
            res.redirect(`http://localhost:8081${req.path}`);
          }
        });
        return middlewares;
      }
    },
  },

  generateConfig('en'),
  generateConfig('fr'),
]