export const SearchBar = ({ onChange }) => {
  return (
    <div className="p-2">
      <div className="h-10 dark:bg-white bg-gray-700 flex items-center rounded-full shadow-xl">
        <input
          className="h-10 dark:bg-white bg-gray-700 rounded-full w-full py-4 px-6 text-gray-100 dark:text-gray-800 leading-tight focus:outline-none"
          id="search"
          type="text"
          placeholder="Search"
          onChange={(e) => {
            onChange(e.target.value);
          }}
        />
        {/*<div className="p-4">
          <button className="bg-blue-500 text-white rounded-full p-2 hover:bg-blue-400 focus:outline-none w-8 h-8  md:w-9 md:h-9 flex items-center justify-center">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
            >
              <path
                stroke-linecap="round"
                stroke-linejoin="round"
                stroke-width="2"
                d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"
              />
            </svg>
          </button>
        </div>*/}
      </div>
    </div>
  );
};
