import { useState } from "react";
import Head from "next/head";
import { getSession } from "next-auth/client";
import { Layout } from "../components/layout";
import { Unauthorized } from "../components/unauthorized";
import { Card } from "../components/card";
import { CardSkeleton } from "../components/skeleton";
import useSWR, { useSWRInfinite } from "swr";
import axios from "axios";

const fetcher = (url: string, accessToken: string) =>
  axios
    .get(url, {
      headers: {
        Authorization: `Token ${accessToken}`,
      },
    })
    .then((res) => res.data);

const MovieCard = ({ mediaType, mediaId }) => {
  const { data } = useSWR(
    `https://api.themoviedb.org/3/${mediaType}/${mediaId}?api_key=4f17f3213e737992b22b4f7ebc04fc85&language=en-US`,
    (url) => fetcher(url)
  );

  if (!data) {
    return (
      <div className="space-y-6">
        <CardSkeleton />
        <CardSkeleton />
        <CardSkeleton />
      </div>
    );
  }

  if (data) {
    return <Card key={data.id} data={{ ...data, media: mediaType }} />;
  }
};

export default function Watchlist({ session, watchlist }) {
  const [tab, setTab] = useState("notWatched");
  const { data, size, setSize } = useSWRInfinite(
    (index) =>
      tab === "notWatched"
        ? `${process.env.NEXT_PUBLIC_API_ROOT_URL}/api/watchlist/${
            session?.user.id
          }?page=${index + 1}`
        : `${process.env.NEXT_PUBLIC_API_ROOT_URL}/api/watchedlist/${
            session?.user.id
          }?page=${index + 1}`,
    (url) => fetcher(url, session.accessToken),
    { initialData: watchlist }
  );

  const getResults = () => {
    const cards = [];
    for (const page of data) {
      if (page.results.length) {
        for (let i = 0; i < page.results.length; i++) {
          const item = page.results[i];
          cards.push(
            <MovieCard mediaId={item.media_id} mediaType={item.media_type} />
          );
        }
      }
    }

    if (data[data.length - 1].next) {
      cards.push(
        <div className="flex items-center justify-center">
          <button
            onClick={() => {
              setSize(size + 1);
            }}
            className="mb-6 bg-blue-700 text-white border border-blue-700 font-bold py-2 px-6 rounded-lg"
          >
            Load More
          </button>
        </div>
      );
    }

    return cards;
  };

  if (!session)
    return (
      <Layout>
        <Unauthorized />
      </Layout>
    );

  return (
    <>
      <Head>
        <title>Watchlist | WatchWish</title>
        <link rel="icon" href="/favicon.ico" />
      </Head>
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
          <div className="mt-2 w-full">{getResults()}</div>
        </div>
      </Layout>
    </>
  );
}

export async function getServerSideProps(ctx) {
  const session = await getSession(ctx);
  let watchlist = [];
  if (session) {
    const toWatchList = await fetcher(
      `http://localhost:8000/api/watchlist/${session.user.id}?page=1`,
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
