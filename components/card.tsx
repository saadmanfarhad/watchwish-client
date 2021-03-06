export const Card = ({data}) => (
  <section className="m-2 font-sans leading-normal flex items-center justify-center">
    {/*<!-- card container -->*/}
    <div className="max-w-lg shadow-lg rounded overflow-hidden m-4 sm:flex dark:bg-white bg-gray-700">
      <div
        className="h-64 sm:h-auto sm:w-48 md:w-64 flex-none bg-cover bg-center rounded rounded-t sm:rounded sm:rounded-l text-center overflow-hidden"
        style={{backgroundImage: "url(" + `https://image.tmdb.org/t/p/original/${data.poster_path}` + ")"}}
      ></div>

      <div className="px-6 py-4">
        <h2 className="mb-2 font-black dark:text-gray-700 text-white">
          {data.original_title}
        </h2>
        <p className="mb-4 dark:text-gray-500 text-sm">
          {data.overview.length > 265 ?
            `${data.overview.slice(0, 263)}...` : `${data.overview}`
          }
        </p>
      </div>
    </div>
  </section>
);
