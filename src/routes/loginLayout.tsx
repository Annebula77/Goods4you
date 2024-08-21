import { Helmet, HelmetProvider } from 'react-helmet-async';
import Header from '../components/Header/Header';
import Main from '../components/Main/Main';
import { Outlet } from 'react-router-dom';

export default function LoginLayout() {
  return (
    <HelmetProvider>
      <Helmet>
        <title>Sign in | Goods4you</title>
        <meta name="description" content="Sign in to your account" />
        <meta name="robots" content="noindex" />
      </Helmet>
      <Header isLoginPage={true} />
      <Main>
        <Outlet />
      </Main>
    </HelmetProvider>
  );
}
