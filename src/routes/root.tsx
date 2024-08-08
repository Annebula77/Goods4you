import { Outlet, Link } from 'react-router-dom';
import { Helmet } from 'react-helmet';

export default function Root() {
  return (
    <>
      <Helmet>
        <title>Catalog | Goods4you</title>
        <meta name="description" content="Any products from famous brands with worldwide delivery" />
        <meta name="robots" content="noindex" />
      </Helmet>
      <header>
        <h1>My E-commerce Site</h1>
        <nav>
          <ul>
            <li>
              <Link to="/">Home</Link>
            </li>
            <li>
              <Link to="/cart">Cart</Link>
            </li>
          </ul>
        </nav>
      </header>
      <main>
        <Outlet />
      </main>
      <footer>
        <p>&copy; 2024 My E-commerce Site</p>
      </footer>
    </>
  );
}
