const path = require('path');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const { DefinePlugin } = require('webpack');

function baseConfig() {
  return {
    resolve: { 
      extensions: [".js", ".jsx"],
    },
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
        templateContent: `
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
  };
}

function currentApproachConfig(locale) {
  const config = baseConfig();
  config.entry = "./src/current-approach/index.jsx";
  config.output = {
    filename: `[name].${locale}.js`,
    chunkFilename: `[name].${locale}.js`,
    publicPath: `/current-approach/${locale}/`,
    path: path.resolve(__dirname, 'dist', 'current-approach', locale),
  };
  config.resolve.alias = {
    '__translations': `./translations/${locale}.json`,
  };
  config.plugins.push(new DefinePlugin({
    'PATH_BASENAME': JSON.stringify('/current-approach'),
  }));
  return config;
}

function treeShakeLocalesApproachConfig(locale) {
  const config = baseConfig();
  config.entry = "./src/tree-shake-locales-approach/index.jsx";
  config.output = {
    filename: `[name].${locale}.js`,
    chunkFilename: `[name].${locale}.js`,
    publicPath: `/tree-shake-locales-approach/${locale}/`,
    path: path.resolve(__dirname, 'dist', 'tree-shake-locales-approach', locale),
  };
  config.plugins.push(new DefinePlugin({
    'PATH_BASENAME': JSON.stringify('/tree-shake-locales-approach'),
  }));
  config.module.rules.push({
    test: /translations\/.*\.json?$/,
    exclude: /node_modules/,
    use: {
      loader: require.resolve('./empty-loader'),
      options: {
        activeLocale: locale,
      },
    },
  })
  return config;
}

function idealApproachConfig() {
  const config = baseConfig();
  config.entry = "./src/ideal-approach/index.jsx";
  config.output = {
    filename: `[name].js`,
    chunkFilename: `[name].js`,
    publicPath: `/ideal-approach/`,
    path: path.resolve(__dirname, 'dist', 'ideal-approach'),
  };
  config.plugins.push(new DefinePlugin({
    'PATH_BASENAME': JSON.stringify('/ideal-approach'),
  }));
  return config;
}

module.exports = [
 currentApproachConfig('en'),
 currentApproachConfig('fr'),
 treeShakeLocalesApproachConfig('en'),
 treeShakeLocalesApproachConfig('fr'),
 idealApproachConfig(),
];