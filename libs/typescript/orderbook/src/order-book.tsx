import OrderB from './hi/src/components/OrderBook';
import { store } from './hi/src/store';
import { Provider } from 'react-redux';

export const OrderBook = () =>
  <Provider store={store}>
    <OrderB windowWidth={1000} productId='AAPL' isFeedKilled={false} />
  </Provider>