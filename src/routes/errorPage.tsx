import { Helmet } from 'react-helmet-async';
import ErrorComponent from '../components/ErrorComponent/ErrorComponent';

export default function ErrorPage() {
  return (
    <>
      <Helmet>
        <title>Error | Goods4you</title>
      </Helmet>
      <ErrorComponent />
    </>
  );
}
