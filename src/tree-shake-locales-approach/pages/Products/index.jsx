import React from 'react';
import {createAsyncComponent} from '@shopify/react-async';
import {Loading} from '../../loading';

export default createAsyncComponent({
  load: () => import(/* webpackChunkName: 'Products' */ './Products'),
  renderLoading: () => <Loading />,
});