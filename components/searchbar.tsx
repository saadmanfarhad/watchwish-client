export const SearchBar = () => {
  return (
    <div class="p-2">
      <div class="dark:bg-white bg-gray-700 flex items-center rounded-full shadow-xl">
        <input
          class="dark:bg-white bg-gray-700 rounded-l-full w-full py-4 px-6 text-gray-100 dark:text-gray-800 leading-tight focus:outline-none"
          id="search"
          type="text"
          placeholder="Search"
        />

        <div class="p-4">
          <button class="bg-blue-500 text-white rounded-full p-2 hover:bg-blue-400 focus:outline-none w-12 h-12 flex items-center justify-center">
            icon
          </button>
        </div>
      </div>
    </div>
  );
};
