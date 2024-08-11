import { Helmet } from 'react-helmet-async';

import Basket from '../components/Basket/Basket';

export default function CartPage() {
  return (
    <>
      <Helmet>
        <title>My cart | Goods4you</title>
        <meta
          name="description"
          content="Any products from famous brands with worldwide delivery"
        />
        <meta name="robots" content="noindex" />
      </Helmet>
      <Basket />
    </>
  );
}
