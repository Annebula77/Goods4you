/* eslint-disable prettier/prettier */
import { Helmet } from 'react-helmet-async';
import { useParams } from 'react-router-dom';
import Product from '../components/Product/Product';
import { type ProductType } from '../types/productType';
import { useGetProductByIdQuery } from '../store/slices/productsApiSlice';
import NoMatchPage from './noMatch';
import Loader from '../components/Loader/Loader';
import ErrorPage from './errorPage';


export default function ProductPage() {
  const { productId } = useParams();

  const numericProductId = productId ? parseInt(productId, 10) : undefined;

  const { data, error, isLoading } = useGetProductByIdQuery(numericProductId!);

  if (!numericProductId) {
    return <ErrorPage />;
  }

  if (error && 'status' in error && error.status === 404) {
    return <NoMatchPage />;
  }

  if (isLoading) {
    return <Loader />;
  }

  const productData: ProductType | undefined = data
    ? {
      id: data.id,
      title: data.title,
      category: data.category,
      thumbnail: data.thumbnail,
      images: data.images,
      price: data.price,
      description: data.description,
      discountPercentage: data.discountPercentage,
      rating: data.rating,
      stock: data.stock,
      warrantyInformation: data.warrantyInformation,
      shippingInformation: data.shippingInformation,
    }
    : undefined;


  return (
    <>
      <Helmet>
        <title>{data?.title} | Goods4you</title>
        <meta
          name="description"
          content="Any products from famous brands with worldwide delivery"
        />
        <meta name="robots" content="noindex" />
      </Helmet>
      {productData ? (
        <Product product={productData} />
      ) : (
        <div>No product data available</div>
      )}
    </>
  );
}
