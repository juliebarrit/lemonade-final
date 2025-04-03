import 'bootstrap/dist/css/bootstrap.min.css';
import { Provider } from 'react-redux';
import { store } from '@/redux/store';
import CustomNavbar from '@/components/Navbar';

export default function App({ Component, pageProps }) {
  return (
    <Provider store={store}>
      <CustomNavbar />
      <Component {...pageProps} />
    </Provider>
  );
}
