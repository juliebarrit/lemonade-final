import 'bootstrap/dist/css/bootstrap.min.css';
import '../app/globals.css'; // Ensure this is imported
import { Provider } from 'react-redux';
import { store } from '@/redux/store';
import CustomNavbar from '@/components/Navbar';

export default function App({ Component, pageProps }) {
  return (
    <Provider store={store}>
      <CustomNavbar /> {/* Ensure CustomNavbar is a valid component */}
      <Component {...pageProps} /> {/* Ensure Component is valid */}
    </Provider>
  );
}
