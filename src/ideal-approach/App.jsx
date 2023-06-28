import React from 'react';
import {Cookies} from 'react-cookie';
import {RouterProvider, Link as ReactRouterLink, createBrowserRouter} from 'react-router-dom';
import enTranslations from '@shopify/polaris/locales/en.json';
import {AppProvider} from '@shopify/polaris';

import {SpeedProvider} from './speed';
import {LocaleProvider} from './locale';
import Frame from "./components/Frame";
import Home from './pages/Home'
import Orders from './pages/Orders'
import Products from './pages/Products'

const router = createBrowserRouter([
  {
    id: 'root',
    path: '/',
    element: <AppProvider i18n={enTranslations} linkComponent={Link}><Frame /></AppProvider>,
    loader: async ({request}) => {
      const cookies = new Cookies(request.headers.cookie);
      const locale = cookies.get('locale') || 'en';
      const [translations] = await Promise.all([
        fetch(`/locales/navigation?locale=${locale}`).then(resp => resp.json()),
      ]);
      return {translations};
    },
    children: [
      {
        path: '/',
        element: <Home />,
        loader: async ({request}) => {
          const cookies = new Cookies(request.headers.cookie);
          const locale = cookies.get('locale') || 'en';
          const speed = cookies.get('speed') || 'average';
          const [translations, data] = await Promise.all([
            fetch(`/locales/home?locale=${locale}`).then(resp => resp.json()),
            fetch(`/api/home?speed=${speed}`).then(resp => resp.json()),
          ])
          return {translations, data};
        },
      },
      {
        path: '/orders',
        element: <Orders />,
        loader: async ({request}) => {
          const cookies = new Cookies(request.headers.cookie);
          const locale = cookies.get('locale') || 'en';
          const speed = cookies.get('speed') || 'average';
          const [translations, data] = await Promise.all([
            fetch(`/locales/orders?locale=${locale}`).then(resp => resp.json()),
            fetch(`/api/orders?speed=${speed}`).then(resp => resp.json()),
          ]);
          return {translations, data};
        },
      },
      {
        path: '/products',
        element: <Products />,
        loader: async ({request}) => {
          const cookies = new Cookies(request.headers.cookie);
          const locale = cookies.get('locale') || 'en';
          const speed = cookies.get('speed') || 'average';
          const [translations, data] = await Promise.all([
            fetch(`/locales/products?locale=${locale}`).then(resp => resp.json()),
            fetch(`/api/products?speed=${speed}`).then(resp => resp.json()),
          ]);
          return {translations, data};
        },
      },
    ]
  },
], {basename: PATH_BASENAME});

function Link({ref, url, ...rest}) {
  return <ReactRouterLink to={url} {...rest} />;
}

export default function App() {
  return (
    <SpeedProvider>
      <LocaleProvider>
        <RouterProvider router={router} />
      </LocaleProvider>
    </SpeedProvider>
  );
}