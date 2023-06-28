const express = require('express')
const cookieParser = require('cookie-parser');
const path = require('path');

const app = express()
const port = process.env.PORT || 3000;

function sleep(ms) {
  return new Promise((resolve) => setTimeout(resolve, ms));
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
        </ul>
      </body>
    </html>
  `);
});

app.get('/current-approach/:page?', (req, res) => {
  const locale = req.cookies.locale || 'en';
  const localeSpecificIndexfile = path.join(__dirname, 'dist', 'current-approach', locale, 'index.html');
  res.sendFile(localeSpecificIndexfile);
});

// API ROUTES
app.get('/api/home', async (req, res) => {
  await sleep(1000);
  res.json({});
});

app.get('/api/products', async (req, res) => {
  await sleep(1000);
  res.json({
    products: [
      {name: 'Widget', inventory: 5},
      {name: 'Fidget', inventory: 55},
    ]
  });
});

app.get('/api/orders', async (req, res) => {
  await sleep(1000);
  res.json({
    orders: [
      {number: 101, price: 12.00},
      {number: 102, price: 23.57},
    ]
  });
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