import React from 'react';
import {RouterProvider, Link as ReactRouterLink, createBrowserRouter} from 'react-router-dom';
import {QueryClient, QueryClientProvider} from '@tanstack/react-query';
import enTranslations from '@shopify/polaris/locales/en.json';
import {AppProvider} from '@shopify/polaris';
import {Cookies} from 'react-cookie';

import {LocaleProvider} from './locale';
import Frame from "./components/Frame";
import Home from './pages/Home'
import Orders from './pages/Orders'
import Products from './pages/Products'

const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      cacheTime: 0,
    }
  }
});

const router = createBrowserRouter([
  {
    path: '/',
    id: 'root',
    element: <AppProvider i18n={enTranslations} linkComponent={Link}><Frame /></AppProvider>,
    loader: async ({request}) => {
      const cookies = new Cookies(request.headers.get('cookie'));
      const locale = cookies.get('locale') || 'en';
      return fetch(`/locales/root?locale=${locale}`);
    },
    children: [
      {
        path: '/',
        element: <Home />,
        loader: async ({request}) => {
          const cookies = new Cookies(request.headers.get('cookie'));
          const locale = cookies.get('locale') || 'en';
          return fetch(`/locales/home?locale=${locale}`);
        },
      },
      {
        path: '/orders',
        element: <Orders />,
        loader: async ({request}) => {
          const cookies = new Cookies(request.headers.get('cookie'));
          const locale = cookies.get('locale') || 'en';
          return fetch(`/locales/orders?locale=${locale}`);
        },
      },
      {
        path: '/products',
        element: <Products />,
        loader: async ({request}) => {
          const cookies = new Cookies(request.headers.get('cookie'));
          const locale = cookies.get('locale') || 'en';
          return await fetch(`/locales/products?locale=${locale}`);
        },
      },
    ]
  },
]);

function Link({ref, url, ...rest}) {
  return <ReactRouterLink to={url} {...rest} />;
}

export default function App() {
  return (
    <QueryClientProvider client={queryClient}>
      <LocaleProvider>
        <RouterProvider router={router} />
      </LocaleProvider>
    </QueryClientProvider>
  );
}