import { Helmet } from "react-helmet"

export default function NoMatchPage() {
  return (
    <>
      <Helmet>
        <title>404 | Goods4you</title>
      </Helmet>
      <h1>404</h1>
      <p>Sorry, there is no such page.</p>
    </>
  );
}
