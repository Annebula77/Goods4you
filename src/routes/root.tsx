import { Outlet, useNavigation } from 'react-router-dom';
import { Helmet, HelmetProvider } from 'react-helmet-async';
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import 'react-toastify/dist/ReactToastify.min.css';
import Header from '../components/Header/Header';
import Footer from '../components/Footer/Footer';
import Main from '../components/Main/Main';
import styles from './root.module.css';
import Loader from '../components/Loader/Loader';

export default function Root() {
  const navigation = useNavigation();
  return (
    <HelmetProvider>
      <Helmet>
        <title>Catalog | Goods4you</title>
        <meta
          name="description"
          content="Any products from famous brands with worldwide delivery"
        />
        <meta name="robots" content="noindex" />
      </Helmet>
      <>
        {navigation.state === 'loading' && <Loader />}
        <Header />
        <Main>
          <Outlet />
        </Main>
        <Footer />
        <ToastContainer
          position="top-right"
          autoClose={3000}
          hideProgressBar={false}
          newestOnTop={false}
          closeOnClick
          rtl={false}
          pauseOnFocusLoss
          draggable
          pauseOnHover
          theme="colored"
          toastClassName={styles.toast}
        />
      </>
    </HelmetProvider>
  );
}
