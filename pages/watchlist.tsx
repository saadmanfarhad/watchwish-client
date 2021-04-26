import { useState, useEffect } from "react";
import Head from "next/head";
import { useRouter } from "next/router";
import { getSession } from "next-auth/client";
import { Layout } from "../components/layout.tsx";
import { Unauthorized } from "../components/unauthorized.tsx";
import { Card } from "../components/card.tsx";
import { CardSkeleton } from "../components/skeleton.tsx";
import { useSWRInfinite } from "swr";
import axios from "axios";

const fetcher = (url, accessToken) =>
  axios
    .get(url, {
      headers: {
        Authorization: `Token ${accessToken}`,
      },
    })
    .then((res) => res.data);

export default function Watchlist({ session, watchlist }) {
  const [tab, setTab] = useState("notWatched");
  const [loading, setLoading] = useState(false);
  const [results, setResults] = useState({ data: [], next: false });
  const { data, error, size, setSize } = useSWRInfinite(
    (index) =>
      tab === "notWatched"
        ? `http://localhost:8000/api/watchlist/${session?.user.id}?page=${
            index + 1
          }`
        : `http://localhost:8000/api/watchedlist/${session?.user.id}?page=${
            index + 1
          }`,
    (url) => fetcher(url, session.accessToken),
    { initialData: watchlist }
  );

  const getResults = async () => {
    const resultArray = [];
    console.log(data);
    for (const page of data) {
      if (page.results.length) {
        for (let i = 0; i < page.results.length; i++) {
          const item = page.results[i];
          const detail = await axios.get(
            `https://api.themoviedb.org/3/${item.media_type}/${item.media_id}?api_key=4f17f3213e737992b22b4f7ebc04fc85&language=en-US`
          );
          resultArray.push({ ...detail.data, media: item.media_type });
        }
      }
    }
    setResults({
      data: resultArray,
      next: data[data.length - 1].next ? true : false,
    });
  };

  useEffect(() => {
    if (data.length) {
      console.log('Called');

      getResults();
    }
  }, [tab]);

  if (!session)
    return (
      <Layout>
        <Unauthorized />
      </Layout>
    );

  return (
    <Layout>
      <div className="flex flex-col items-center justify-center">
        <div className="mt-6 w-3/4">
          <div className="bg-gray-300 dark:bg-gray-800">
            <nav className="flex  mt-2">
              <button
                onClick={() => setTab("notWatched")}
                className={`w-1/2 text-gray-600 py-4 px-6 block hover:text-blue-500 focus:outline-none ${
                  tab === "notWatched"
                    ? "text-blue-500 border-b-2 font-medium border-blue-500"
                    : ""
                }`}
              >
                Not Watched
              </button>
              <button
                onClick={() => setTab("watched")}
                className={`w-1/2 text-gray-600 py-4 px-6 block hover:text-blue-500 focus:outline-none ${
                  tab === "watched"
                    ? "text-blue-500 border-b-2 font-medium border-blue-500"
                    : ""
                }`}
              >
                Watched
              </button>
            </nav>
          </div>
        </div>
        <div className="mt-2 w-full">
          {loading && (
            <div className="space-y-6">
              <CardSkeleton />
              <CardSkeleton />
              <CardSkeleton />
            </div>
          )}
          {results?.data?.length ? (
            <div className="flex flex-col items-center justify-center">
              {results.data.map((info, idx) => (
                <Card key={info.id} data={info} />
              ))}
              {results.next ? (
                <button
                  onClick={() => {
                    setSize(size + 1);
                  }}
                  className="mr-5 mb-4 bg-blue-700 text-white border border-blue-700 font-bold py-2 px-6 rounded-lg"
                >
                  Load More
                </button>
              ) : undefined}
            </div>
          ) : undefined}
        </div>
      </div>
    </Layout>
  );
}

export async function getServerSideProps(ctx) {
  const session = await getSession(ctx);
  let watchlist = [];
  if (session) {
    const toWatchList = await fetcher(
      `http://localhost:8000/api/watchedlist/${session.user.id}?page=1`,
      session.accessToken
    );

    watchlist.push(toWatchList);
  }

  return {
    props: {
      session,
      watchlist,
    },
  };
}
