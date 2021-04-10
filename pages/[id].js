import React, { useState } from "react";
import Head from "next/head";
import { Layout } from "../components/layout.tsx";
import useSWR from "swr";
import axios from "axios";

const fetcher = (url) => axios.get(url).then((res) => res.data);

const DetailsPage = ({ details }) => {
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

  return (
    <Layout>
      <div className="dark:bg-gray-900 flex flex-column lg-flex-row items-center flex-wrap mx-auto">
        <div className="w-full lg:w-2/5">
          <img
            src={`https://image.tmdb.org/t/p/original/${details.poster_path}`}
            className="h-1/2 lg:h-screen w-full lg:block"
          />
        </div>

        <div
          id="profile"
          className="w-full lg:w-3/5 h-1/2 lg:h-screen bg-white dark:bg-white opacity-75 lg:mx-0"
        >
          <div className="p-4 md:p-12 lg:text-left">
            <h1 className="text-3xl lg:text-6xl dark:text-gray-700 text-gray-700 text-center font-bold pt-8 lg:pt-0">
              {details.media === "movie" ? data.title : data.name}
            </h1>
            <div className="mx-auto lg:mx-0 w-4/5 pt-3 border-b-2 border-green-500 opacity-25"></div>
            <p className="pt-4 text-base font-bold flex items-center justify-start">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                className="h-8 fill-current text-green-700 pr-4"
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
            <p className="pt-4 text-base font-bold flex items-center justify-start">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                className="h-8 fill-current text-green-700 pr-4"
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
            <p className="pt-4 text-base font-bold flex items-center justify-start">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                className="h-8 fill-current text-green-700 pr-4"
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
            <p className="pt-4 text-base font-bold flex items-center justify-start">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                className="h-8 fill-current text-green-700 pr-4"
                viewBox="0 0 20 20"
                fill="currentColor"
              >
                <path d="M9 6a3 3 0 11-6 0 3 3 0 016 0zM17 6a3 3 0 11-6 0 3 3 0 016 0zM12.93 17c.046-.327.07-.66.07-1a6.97 6.97 0 00-1.5-4.33A5 5 0 0119 16v1h-6.07zM6 11a5 5 0 015 5v1H1v-1a5 5 0 015-5z" />
              </svg>
              {data.vote_count} votes
            </p>

            <p className="pt-8 text-xl lg:text-2xl dark:text-gray-500">
              <span className="font-bold underline text-2xl lg:text-3xl">
                Overview
              </span>
              <br />
              {data.overview}
            </p>
          </div>
        </div>
      </div>
    </Layout>
  );
};

export async function getServerSideProps(ctx) {
  const { id, media } = ctx.query;
  const details = await fetcher(
    `https://api.themoviedb.org/3/${media}/${id}?api_key=4f17f3213e737992b22b4f7ebc04fc85&language=en-US`
  );

  return {
    props: {
      details: { ...details, media: media },
    },
  };
}

export default DetailsPage;
