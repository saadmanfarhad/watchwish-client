import Head from "next/head";
import { Layout } from "../components/layout.tsx";
import { SearchBar } from "../components/searchbar.tsx";
import { CardSkeleton } from "../components/skeleton.tsx";
import { Card } from "../components/card.tsx";
import useFetchData from "../hooks/useFetchData";

const Home = (props) => {
  const [
    state,
    setUrl,
  ] = useFetchData(
    "",
    { hits: [] }
  );
  console.log(state.data);

  const search = (query) => {
    if (query.length) {
      const url = `https://api.themoviedb.org/3/search/movie?api_key=4f17f3213e737992b22b4f7ebc04fc85&language=en-US&query=${query}&page=1&include_adult=false`;
      setUrl(url);
    }
  };

  return (
    <>
      <Head>
        <title>WatchWish</title>
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <Layout>
        <div className="flex items-center justify-center">
          <div className="mt-6 w-3/4 md:w-2/5">
            <SearchBar onChange={search} />
            {state.isLoading ? (
              <div className="space-y-6">
                <CardSkeleton />
                <CardSkeleton />
                <CardSkeleton />
              </div>
            ) : (
              state.data.results?.length &&
              state.data.results.map((res, idx) => (
                <Card data={res} />
              ))
            )}
            <CardSkeleton />
          </div>
        </div>
      </Layout>
    </>
  );
};

export default Home;
