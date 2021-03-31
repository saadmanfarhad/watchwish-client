import React, { useState } from "react";
import Head from "next/head";
import { Layout } from "../components/layout.tsx";
import { SearchBar } from "../components/searchbar.tsx";
import { CardSkeleton } from "../components/skeleton.tsx";
import { Card } from "../components/card.tsx";
import useSWR from "swr";

const fetcher = (...args) => fetch(...args).then((res) => res.json());

const Home = (props) => {
  const [url, setUrl] = useState("");
  const { data, error } = useSWR(url, fetcher);

  const search = (query) => {
    if (query.length) {
      const url = `https://api.themoviedb.org/3/search/movie?api_key=4f17f3213e737992b22b4f7ebc04fc85&language=en-US&query=${query}&page=1&include_adult=false`;
      setUrl(url);
    }
  };

  const process = () => {
    if (error) {
      <h1>Error!</h1>
    }

    if (!data) {
      return (
      url.length &&  <div className="space-y-6">
          <CardSkeleton />
          <CardSkeleton />
          <CardSkeleton />
        </div>
      );
    }

    if (data) {
      console.log("data", data);
      const items = data.results.filter((movies) => movies.overview.length);
      return items.length && items.map((info, idx) => <Card data={info} />);
    }
  };

  return (
    <>
      <Head>
        <title>WatchWish</title>
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <Layout>
        <div className="flex flex-col items-center justify-center">
          <div className="mt-6 w-3/4 md:w-2/5">
            <SearchBar onChange={search} />
          </div>
          <div className="mt-2 w-full">
            {process()}
          </div>
        </div>
      </Layout>
    </>
  );
};

export default Home;
