/* eslint-disable prettier/prettier */
import { Helmet } from 'react-helmet-async';
import productMock from '../utils/mocks/productMock';
import { useParams } from 'react-router-dom';
import productListMock from '../utils/mocks/productListMock';
import ErrorPage from './errorPage';
import Product from '../components/Product/Product';
import { type ProductType } from '../types/productType';

export default function ProductPage() {
  const { productId } = useParams();

  // NOTE: to be changed when server will be ready
  const baseProduct =
    productListMock.find(item => item.id === Number(productId)) || productMock;

  const product: ProductType = baseProduct
    ? {
      ...baseProduct,
      ...productMock,
    }
    : productMock;

  if (!product) {
    return <ErrorPage />;
  }


  return (
    <>
      <Helmet>
        <title>{product.name} | Goods4you</title>
        <meta
          name="description"
          content="Any products from famous brands with worldwide delivery"
        />
        <meta name="robots" content="noindex" />
      </Helmet>
      <Product product={product} />
    </>
  );
}
