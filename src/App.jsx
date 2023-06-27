import React, {useState} from 'react';
import {RouterProvider, Link as ReactRouterLink, createBrowserRouter} from 'react-router-dom';
import {QueryClient, QueryClientProvider} from '@tanstack/react-query';
import enTranslations from '@shopify/polaris/locales/en.json';
import {AppProvider} from '@shopify/polaris';

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
    element: <AppProvider i18n={enTranslations} linkComponent={Link}><Frame /></AppProvider>,
    children: [
      {
        path: '/',
        element: <Home />,
      },
      {
        path: '/orders',
        element: <Orders />,
      },
      {
        path: '/products',
        element: <Products />,
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