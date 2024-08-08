import { Helmet } from "react-helmet"

export default function ErrorPage() {
  return (
    <>
      <Helmet>
        <title>Error | Goods4you</title>
      </Helmet>
      <h1>Oops!</h1>
      <p>Sorry, an unexpected error has occurred.</p>
    </>
  );
}
