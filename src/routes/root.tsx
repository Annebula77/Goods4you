import { Outlet } from 'react-router-dom';
import { Helmet, HelmetProvider } from 'react-helmet-async';
import Header from '../components/Header/Header';
import Footer from '../components/Footer/Footer';
import Main from '../components/Main/Main';

export default function Root() {
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
      <Header />
      <Main>
        <Outlet />
      </Main>
      <Footer />
    </HelmetProvider>
  );
}
