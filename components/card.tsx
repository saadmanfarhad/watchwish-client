import Link from "next/link";

export const Card = ({ data }) => (
  <section className="m-2 font-sans leading-normal flex items-center justify-center">
    {/*<!-- card container -->*/}
    <div className="max-w-5xl md:h-96 shadow-lg rounded overflow-hidden m-4 sm:flex bg-gray-300 dark:bg-gray-800">
      <div
        className="h-64 sm:h-auto sm:w-48 md:w-64 flex-none bg-cover bg-center rounded rounded-t sm:rounded sm:rounded-l text-center overflow-hidden"
        style={{
          backgroundImage:
            "url(" +
            `https://image.tmdb.org/t/p/original/${data.poster_path}` +
            ")",
        }}
      ></div>

      <div className="px-6 py-4 w-full">
        <Link href={`/${data.id}?media=${data.media}`}>
          <h2 className="md:text-4xl mb-2 font-black text-gray-800 dark:text-gray-100 cursor-pointer">
            {data.media === "movie" ? data.title : data.name}
          </h2>
        </Link>
        <p className="md:text-lg mb-4 dark:text-gray-200 text-sm">
          {data.overview.length > 400
            ? `${data.overview.slice(0, 400)}...`
            : `${data.overview}`}
        </p>
      </div>
    </div>
  </section>
);
