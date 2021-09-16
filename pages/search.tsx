import React, { useState } from "react";
import Head from "next/head";
import { Layout } from "../components/layout";
import { SearchBar } from "../components/searchbar";
import { CardSkeleton } from "../components/skeleton";
import { Card } from "../components/card";
import { useSWRInfinite } from "swr";
import axios from "axios";

const fetcher = (url) => axios.get(url).then((res) => res.data);

const Search = () => {
  const [tab, setTab] = useState("movie");
  const [query, setQuery] = useState("");
  const [loadMore, setLoadMore] = useState(false);
  const { data, error, size, setSize } = useSWRInfinite(
    (index) =>
      `https://api.themoviedb.org/3/search/${tab}?api_key=4f17f3213e737992b22b4f7ebc04fc85&language=en-US&&query=${query}&page=${
        index + 1
      }&include_adult=false`,
    fetcher
  );

  const search = (query) => {
    setQuery(query);
  };

  const process = () => {
    if (error) {
      <h1>Error!</h1>;
    }

    if (!data) {
      return (
        query.length && (
          <div className="space-y-6">
            <CardSkeleton />
            <CardSkeleton />
            <CardSkeleton />
          </div>
        )
      );
    }

    let results = null;
    if (data && !data[0].errors?.length) {
      let page = 0;
      let totalPages = 0;
      results = [];
      for (var pageData of data) {
        const items = pageData.results
          ? pageData.results.filter((movies) => movies.overview.length)
          : [];
        results = [...results, ...items];
        page = pageData.page;
        totalPages = pageData.total_pages;
      }

      return (
        <div className="flex flex-col items-center justify-center">
          {results?.length &&
            results.map((info) => (
              <Card key={info.id} data={{ ...info, media: tab }} />
            ))}
          {page < totalPages ? (
            <button
              onClick={() => {
                setSize(size + 1);
              }}
              className="mr-5 bg-blue-700 text-white border border-blue-700 font-bold py-2 px-6 rounded-lg"
            >
              Load More
            </button>
          ) : undefined}
        </div>
      );
    }
  };

  return (
    <>
      <Head>
        <title>Search | WatchWish</title>
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <Layout>
        <div className="flex flex-col items-center justify-center">
          <div className="flex flex-col mt-6 w-3/4">
            <div className="bg-gray-300 dark:bg-gray-800">
              <nav className="flex">
                <button
                  onClick={() => {
                    setQuery("");
                    setTab("movie");
                  }}
                  className={`w-1/2 dark:text-gray-200 py-4 px-6 block dark:hover:text-blue-500 focus:outline-none ${
                    tab === "movie"
                      ? "text-blue-500 border-b-2 font-medium border-blue-500"
                      : ""
                  }`}
                >
                  Movies
                </button>
                <button
                  onClick={() => {
                    setQuery("");
                    setTab("tv");
                  }}
                  className={`w-1/2 dark:text-gray-200 py-4 px-6 block dark:hover:text-blue-500 focus:outline-none ${
                    tab === "tv"
                      ? "text-blue-500 border-b-2 font-medium border-blue-500"
                      : ""
                  }`}
                >
                  TV Shows
                </button>
              </nav>
            </div>
          </div>
          <div className="mt-4 w-3/4 md:w-1/2">
            <SearchBar query={query} onChange={search} />
          </div>
          <div className="mt-2 w-full">{process()}</div>
        </div>
      </Layout>
    </>
  );
};

export default Search;
