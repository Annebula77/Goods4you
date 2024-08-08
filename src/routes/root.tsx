import { Outlet } from 'react-router-dom';
import { Helmet } from 'react-helmet';
import Header from '../components/Header/Header';
import Footer from '../components/Footer/Footer';
import Main from '../components/Main/Main';

export default function Root() {
  return (
    <>
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
    </>
  );
}
