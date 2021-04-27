export const CardSkeleton = () => (
  <div className="m-2 flex items-center justify-center">
    {/*<!-- card -->*/}
    <div className="h-96 max-w-5xl w-full shadow-lg rounded overflow-hidden m-4 sm:flex bg-gray-300 dark:bg-gray-800">
      {/*<!-- image -->*/}
      <div
        className="animate-pulse bg-gray-200 dark:bg-gray-200 h-64 sm:h-auto sm:w-48 md:w-64 flex-none bg-cover bg-center rounded rounded-t sm:rounded sm:rounded-l text-center overflow-hidden"
      ></div>

      <div className="p-5 w-full">
        <div className="mb-2 w-48 md:w-3/4 h-6 rounded-sm animate-pulse bg-gray-200"></div>
        <div className="grid grid-cols-4 gap-1">
          <div className="col-span-3 h-4 rounded-sm bg-gray-200 animate-pulse"></div>
          <div className="h-4 rounded-sm bg-gray-200 animate-pulse"></div>

          <div className="col-span-2 h-4 rounded-sm bg-gray-200 animate-pulse"></div>
          <div className="col-span-2 h-4 rounded-sm bg-gray-200 animate-pulse"></div>
          <div className="col-span-2 h-4 rounded-sm bg-gray-200 animate-pulse"></div>
          <div className="col-span-2 h-4 rounded-sm bg-gray-200 animate-pulse"></div>
          <div className="col-span-2 h-4 rounded-sm bg-gray-200 animate-pulse"></div>
          <div className="col-span-2 h-4 rounded-sm bg-gray-200 animate-pulse"></div>

          <div className="h-4 rounded-sm bg-gray-200 animate-pulse"></div>
          <div className="col-span-3 h-4 rounded-sm bg-gray-200 animate-pulse"></div>
          <div className="col-span-2 h-4 rounded-sm bg-gray-200 animate-pulse"></div>
          <div className="h-4 rounded-sm bg-gray-200 animate-pulse"></div>

          <div className="col-span-2 h-4 rounded-sm bg-gray-200 animate-pulse"></div>
          <div className="col-span-2 h-4 rounded-sm bg-gray-200 animate-pulse"></div>
        </div>
      </div>
    </div>
  </div>
);
