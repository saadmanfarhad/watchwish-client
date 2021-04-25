import React, { useState } from "react";
import Head from "next/head";
import { useRouter } from "next/router";
import { getSession } from "next-auth/client";
import { Layout } from "../components/layout.tsx";
import useSWR from "swr";
import axios from "axios";

const fetcher = (url) => axios.get(url).then((res) => res.data);

const DetailsPage = ({ details }) => {
  const router = useRouter();
  const {
    data,
  } = useSWR(
    `https://api.themoviedb.org/3/${details.media}/${details.id}?api_key=4f17f3213e737992b22b4f7ebc04fc85&language=en-US`,
    fetcher,
    { initialData: details }
  );

  const getGenres = (genres) => {
    const genreString = genres.reduce((acc, cur, idx) => {
      return genres.length - 1 === idx
        ? (acc += `${cur.name}`)
        : (acc += `${cur.name}, `);
    }, "");

    return genreString;
  };

  const addToWatchlist = async (watched = false) => {
    try {
      const add = await axios.post(
        `http://localhost:8000/api/watchlist`,
        {
          user: details.userId,
          media_id: details.id,
          media_type: details.media,
          watched: watched,
        },
        {
          headers: {
            Authorization: `Token ${details.accessToken}`,
            "Content-Type": "application/json",
          },
        }
      );

      if (add.data.status) {
        router.replace(router.asPath);
      }
    } catch (e) {
      console.error(e);
    }
  };

  const updateWatchlist = async () => {
    try {
      const add = await axios.post(
        `http://localhost:8000/api/watchlist/put`,
        {
          user: details.userId,
          media_id: details.id,
          media_type: details.media,
          watched: true,
        },
        {
          headers: {
            Authorization: `Token ${details.accessToken}`,
            "Content-Type": "application/json",
          },
        }
      );

      if (add.data.status) {
        router.replace(router.asPath);
      }
    } catch (e) {
      console.error(e.response.data);
      const errorMessage = e.response.data.detail;
    }
  };

  return (
    <Layout>
      <div>
        <div class="lg:py-12 lg:flex lg:justify-center">
          <div class="bg-white dark:bg-gray-800 lg:mx-8 lg:flex lg:max-w-5xl lg:shadow-lg lg:rounded-lg">
            <div class="lg:w-3/5">
              <div
                class="h-80 bg-cover lg:rounded-lg lg:h-screen"
                style={{backgroundImage:`url('https://image.tmdb.org/t/p/original/${details.poster_path}')`}}
              ></div>
            </div>
            <div class="py-12 px-6 max-w-xl lg:max-w-5xl lg:w-2/5">
              <h1 className="flex items-center justify-center text-3xl lg:text-4xl dark:text-gray-100 text-gray-700 text-center font-bold pt-8 lg:pt-0">
                {details.media === "movie" ? data.title : data.name}
                {details.watched === false ? (
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    className="ml-2 h-12 w-12"
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke="currentColor"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M15 5v2m0 4v2m0 4v2M5 5a2 2 0 00-2 2v3a2 2 0 110 4v3a2 2 0 002 2h14a2 2 0 002-2v-3a2 2 0 110-4V7a2 2 0 00-2-2H5z"
                    />
                  </svg>
                ) : undefined}
                {details.watched && (
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    className="ml-2 h-12 w-12"
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke="currentColor"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M9 12l2 2 4-4M7.835 4.697a3.42 3.42 0 001.946-.806 3.42 3.42 0 014.438 0 3.42 3.42 0 001.946.806 3.42 3.42 0 013.138 3.138 3.42 3.42 0 00.806 1.946 3.42 3.42 0 010 4.438 3.42 3.42 0 00-.806 1.946 3.42 3.42 0 01-3.138 3.138 3.42 3.42 0 00-1.946.806 3.42 3.42 0 01-4.438 0 3.42 3.42 0 00-1.946-.806 3.42 3.42 0 01-3.138-3.138 3.42 3.42 0 00-.806-1.946 3.42 3.42 0 010-4.438 3.42 3.42 0 00.806-1.946 3.42 3.42 0 013.138-3.138z"
                    />
                  </svg>
                )}
              </h1>
              <div className="mx-auto lg:mx-0 w-4/5 pt-3 border-b-2 border-green-500 opacity-25"></div>
              <p className="pt-4 dark:text-gray-200 text-base font-bold flex items-center justify-start">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  className="h-8 fill-current text-blue-700 pr-4"
                  viewBox="0 0 20 20"
                  fill="currentColor"
                >
                  <path
                    fillRule="evenodd"
                    d="M4 3a2 2 0 00-2 2v10a2 2 0 002 2h12a2 2 0 002-2V5a2 2 0 00-2-2H4zm3 2h6v4H7V5zm8 8v2h1v-2h-1zm-2-2H7v4h6v-4zm2 0h1V9h-1v2zm1-4V5h-1v2h1zM5 5v2H4V5h1zm0 4H4v2h1V9zm-1 4h1v2H4v-2z"
                    clipRule="evenodd"
                  />
                </svg>
                {getGenres(data.genres)}
              </p>
              <p className="pt-4 dark:text-gray-200 text-base font-bold flex items-center justify-start">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  className="h-8 fill-current text-blue-700 pr-4"
                  viewBox="0 0 20 20"
                  fill="currentColor"
                >
                  <path
                    fillRule="evenodd"
                    d="M10 18a8 8 0 100-16 8 8 0 000 16zm1-12a1 1 0 10-2 0v4a1 1 0 00.293.707l2.828 2.829a1 1 0 101.415-1.415L11 9.586V6z"
                    clipRule="evenodd"
                  />
                </svg>
                {details.media === "movie" ? data.runtime : data.episode_run_time}{" "}
                minutes
              </p>
              <p className="pt-4 dark:text-gray-200 text-base font-bold flex items-center justify-start">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  className="h-8 fill-current text-blue-700 pr-4"
                  viewBox="0 0 20 20"
                  fill="currentColor"
                >
                  <path
                    fillRule="evenodd"
                    d="M5 3a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2V5a2 2 0 00-2-2H5zm9 4a1 1 0 10-2 0v6a1 1 0 102 0V7zm-3 2a1 1 0 10-2 0v4a1 1 0 102 0V9zm-3 3a1 1 0 10-2 0v1a1 1 0 102 0v-1z"
                    clipRule="evenodd"
                  />
                </svg>
                {data.vote_average}
              </p>
              <p className="pt-4 dark:text-gray-200 text-base font-bold flex items-center justify-start">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  className="h-8 fill-current text-blue-700 pr-4"
                  viewBox="0 0 20 20"
                  fill="currentColor"
                >
                  <path d="M9 6a3 3 0 11-6 0 3 3 0 016 0zM17 6a3 3 0 11-6 0 3 3 0 016 0zM12.93 17c.046-.327.07-.66.07-1a6.97 6.97 0 00-1.5-4.33A5 5 0 0119 16v1h-6.07zM6 11a5 5 0 015 5v1H1v-1a5 5 0 015-5z" />
                </svg>
                {data.vote_count} votes
              </p>
              <p className="mt-4 dark:text-gray-200 text-xl lg:text-xl dark:text-gray-500">
                <span className="font-bold dark:text-gray-200 underline text-2xl lg:text-3xl">
                  Overview
                </span>
                <br />
                <p className="dark:text-gray-200 mt-2">
                  {data.overview}
                </p>
              </p>
              {details.userId ? (
                <div className="flex">
                  {details.watched === null ? (
                    <button
                      className="bg-gray-300 hover:bg-gray-400 text-gray-800 font-bold py-2 px-4 rounded inline-flex items-center mt-6 mr-4"
                      onClick={() => addToWatchlist()}
                    >
                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        className="w-6 h-6 mr-2 text-blue-700"
                        fill="none"
                        viewBox="0 0 24 24"
                        stroke="currentColor"
                      >
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          strokeWidth={2}
                          d="M12 9v3m0 0v3m0-3h3m-3 0H9m12 0a9 9 0 11-18 0 9 9 0 0118 0z"
                        />
                      </svg>

                      <span>Add To Watchlist</span>
                    </button>
                  ) : undefined}
                  {details.watched === false || details.watched === null ? (
                    <button
                      className="bg-gray-300 hover:bg-gray-400 text-gray-800 font-bold py-2 px-4 rounded inline-flex items-center mt-6"
                      onClick={() => {
                        if (details.watched === false) {
                          updateWatchlist();
                        } else {
                          addToWatchlist(true);
                        }
                      }}
                    >
                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        className="w-6 h-6 mr-2 text-blue-700"
                        fill="none"
                        viewBox="0 0 24 24"
                        stroke="currentColor"
                      >
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          strokeWidth={2}
                          d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z"
                        />
                      </svg>

                      <span>Mark as Watched</span>
                    </button>
                  ) : undefined}
                </div>
              ) : undefined}
            </div>
          </div>
        </div>
      </div>
    </Layout>
  );
};

export async function getServerSideProps(ctx) {
  const session = await getSession(ctx);
  const { id, media } = ctx.query;
  const details = await fetcher(
    `https://api.themoviedb.org/3/${media}/${id}?api_key=4f17f3213e737992b22b4f7ebc04fc85&language=en-US`
  );

  let modifiedDetails = {
    ...details,
    media: media,
  };

  if (session) {
    const watched = await axios.get(
      `http://localhost:8000/api/media/status/${session.user.id}/${id}`,
      {
        headers: {
          Authorization: `Token ${session.accessToken}`,
        },
      }
    );

    modifiedDetails = {
      ...modifiedDetails,
      watched: watched.data.data.media_id ? watched.data.data.watched : null,
      userId: session.user.id,
      accessToken: session.accessToken,
    };
  }

  return {
    props: {
      details: modifiedDetails,
    },
  };
}

export default DetailsPage;
