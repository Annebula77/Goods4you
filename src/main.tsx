import { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';
import { createBrowserRouter, RouterProvider } from 'react-router-dom';
import ErrorPage from './routes/errorPage.tsx';
import Root from './routes/root.tsx';
import NoMatchPage from './routes/noMatch.tsx';
import 'normalize.css';
import './index.css';
import CatalogPage from './routes/catalogPage.tsx';
import CartPage from './routes/cartPage.tsx';
import ProductPage from './routes/productPage.tsx';

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
]);

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <RouterProvider router={router} />
  </StrictMode>
);
