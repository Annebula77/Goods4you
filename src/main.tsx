import { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';
import { createBrowserRouter, RouterProvider } from 'react-router-dom';
import { store } from './store/store.ts';
import { Provider } from 'react-redux';
import ErrorPage from './routes/errorPage.tsx';
import Root from './routes/root.tsx';
import NoMatchPage from './routes/noMatch.tsx';
import 'normalize.css';
import './index.css';
import CatalogPage from './routes/catalogPage.tsx';
import CartPage from './routes/cartPage.tsx';
import ProductPage from './routes/productPage.tsx';
import LoginLayout from './routes/loginLayout.tsx';
import LoginPage from './routes/loginPage.tsx';
import UserProvider from './utils/context/userContext.tsx';

const router = createBrowserRouter([
  {
    path: '/',
    element: <Root />,
    errorElement: <ErrorPage />,
    children: [
      {
        index: true,
        element: <CatalogPage />,
      },
      {
        path: 'product/:productId',
        element: <ProductPage />,
      },
      {
        path: 'cart',
        element: <CartPage />,
      },
      {
        path: '*',
        element: <NoMatchPage />,
      },
    ],
  },
  {
    path: '/login',
    element: <LoginLayout />,
    children: [
      {
        index: true,
        element: <LoginPage />,
      },
    ],
  },
]);

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <Provider store={store}>
      <UserProvider>
        <RouterProvider router={router} />
      </UserProvider>
    </Provider>
  </StrictMode>
);
