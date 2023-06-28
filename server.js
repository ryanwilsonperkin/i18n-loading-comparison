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
          <li><a href="/tree-shake-locales-approach/">Tree-shake locales approach</a></li>
          <li><a href="/data-loader-locales-approach/">Data-loader locales approach</a></li>
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

app.get('/tree-shake-locales-approach/:page?', (req, res) => {
  const locale = req.cookies.locale || 'en';
  const localeSpecificIndexfile = path.join(__dirname, 'dist', 'tree-shake-locales-approach', locale, 'index.html');
  res.sendFile(localeSpecificIndexfile);
});

app.get('/data-loader-locales-approach/:page?', (req, res) => {
  const indexFile = path.join(__dirname, 'dist', 'data-loader-locales-approach', 'index.html');
  res.sendFile(indexFile);
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

// LOCALE ROUTES
app.get('/locales/navigation', async (req, res) => {
  const locale = req.query.locale || 'en';
  const data = {
    "en": {
      "navigation": {
        "home": "Home",
        "orders": "Orders",
        "products": "Products"
      }
    },
    "fr": {
      "navigation": {
        "home": "Accueil",
        "orders": "Commandes",
        "products": "Produits"
      }
    },
  };
  res.json(data[locale]);
});

app.get('/locales/home', async (req, res) => {
  const locale = req.query.locale || 'en';
  const data = {
    "en": {
      "greeting": "Here's what's happening with your store today",
      "noActivityTitle": "No store activity",
      "noActivityContent": "Your sales, orders, and sessions will show here."
    },
    "fr": {
      "greeting": "Statut de votre boutique aujourd'hui",
      "noActivityTitle": "Aucune activité dans la boutique",
      "noActivityContent": "Vos ventes, commandes et sessions apparaîtront ici."
    }
  };
  res.json(data[locale]);
});

app.get('/locales/products', async (req, res) => {
  const locale = req.query.locale || 'en';
  const data = {
    "en": {
      "title": "Products"
    },
    "fr": {
      "title": "Produits"
    },
  };
  res.json(data[locale]);
});

app.get('/locales/orders', async (req, res) => {
  const locale = req.query.locale || 'en';
  const data = {
    "en": {
      "title": "Orders"
    },
    "fr": {
      "title": "Commandes"
    },
  };
  res.json(data[locale]);
});

app.listen(port, () => {
  console.log(`Listening at http://localhost:${port}`)
})
