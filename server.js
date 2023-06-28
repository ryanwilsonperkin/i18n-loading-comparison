const express = require('express')
const cookieParser = require('cookie-parser');
const path = require('path');

const app = express()
const port = process.env.PORT || 3000;

function sleep(ms) {
  return new Promise((resolve) => setTimeout(resolve, ms));
}

function getDelay(request) {
  const speed = request.cookies.speed || request.query.speed || 'average';
  switch (speed) {
    case 'slow':
      return 2000;
    case 'fast':
      return 200;
    case 'average':
    default:
      return 1000;
  }
}

app.use(cookieParser());
app.use(express.static('dist'));

// INDEX FILES
app.get('/', (req, res) => {
  res.send(`
    <html>
      <body>
        <ul>
          <li><a href="/current-approach/">Current approach</a></li>
          <li><a href="/ideal-approach/">Ideal approach</a></li>
        </ul>
      </body>
    </html>
  `);
});

app.use(async (req, res, next) => {
  await sleep(getDelay(req));
  next();
});

app.get('/current-approach/:page?', (req, res) => {
  const locale = req.cookies.locale || 'en';
  const localeSpecificIndexfile = path.join(__dirname, 'dist', 'current-approach', locale, 'index.html');
  res.sendFile(localeSpecificIndexfile);
});

app.get('/ideal-approach/:page?', (req, res) => {
  const indexFile = path.join(__dirname, 'dist', 'ideal-approach', 'index.html');
  res.sendFile(indexFile);
});

// API ROUTES
app.get('/api/home', async (req, res) => {
  res.json({});
});

app.get('/api/products', async (req, res) => {
  res.json({
    products: [
      {name: 'Widget', inventory: 5},
      {name: 'Fidget', inventory: 55},
    ]
  });
});

app.get('/api/orders', async (req, res) => {
  res.json({
    orders: [
      {number: 101, price: 12.00},
      {number: 102, price: 23.57},
    ]
  });
});

app.get('/locales/navigation', async (req, res) => {
  const locale = req.query.locale || 'en';
  const localeFile = require(`./src/ideal-approach/components/Navigation/translations/${locale}.json`);
  res.json(localeFile);
});

app.get('/locales/home', async (req, res) => {
  const locale = req.query.locale || 'en';
  const localeFile = require(`./src/ideal-approach/pages/Home/translations/${locale}.json`);
  res.json(localeFile);
});

app.get('/locales/products', async (req, res) => {
  const locale = req.query.locale || 'en';
  const localeFile = require(`./src/ideal-approach/pages/Products/translations/${locale}.json`);
  res.json(localeFile);
});

app.get('/locales/orders', async (req, res) => {
  const locale = req.query.locale || 'en';
  const localeFile = require(`./src/ideal-approach/pages/Orders/translations/${locale}.json`);
  res.json(localeFile);
});

app.listen(port, () => {
  console.log(`Listening at http://localhost:${port}`)
})

/*


const API_DELAY = 1000;



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
*/