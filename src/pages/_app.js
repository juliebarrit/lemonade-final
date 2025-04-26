import { Provider } from 'react-redux';
import { store } from '@/redux/store';
import '@/styles/globals.css';
import 'bootstrap/dist/css/bootstrap.min.css';
import { SSRProvider } from 'react-bootstrap';

export default function App({ Component, pageProps }) {
  return (
    <Provider store={store}>
      <SSRProvider>
        <Component {...pageProps} />
      </SSRProvider>
    </Provider>
  );
}
