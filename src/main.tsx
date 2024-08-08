import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import { createBrowserRouter, RouterProvider } from 'react-router-dom';
import 'normalize.css'
import './index.css'
import ErrorPage from './routes/errorPage.tsx';
import Root from './routes/root.tsx';
import NoMatchPage from './routes/noMatch.tsx';

const router = createBrowserRouter([
  {
    path: "/",
    element: <Root />,
    errorElement: <ErrorPage />,
    children: [
      // {
      //   index: true, 
      //   element: <Home />,
      // },
      // {
      //   path: "products/:productId",
      //   element: <Product />,
      // },
      // {
      //   path: "cart",
      //   element: <Cart />,
      // },
      {
        path: "*",
        element: <NoMatchPage />,
      },
    ],
  },
]);

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <RouterProvider router={router} />
  </StrictMode>,
)
