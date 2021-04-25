import Link from "next/link";

export const Unauthorized = () => {
  return (
    <div class="h-screen dark:bg-gray-900 flex items-center">
      <div class="container flex flex-col md:flex-row items-center justify-center px-5 text-gray-700">
        <div class="max-w-md">
          <div class="text-6xl dark:text-white text-black font-bold">403</div>
          <p class="text-4xl md:text-3xl dark:text-white text:light leading-normal">
            Unauthorized
          </p>
          <p class="mb-8 text-2xl dark:text-white text-light">Please Login</p>

          <Link href={"/login"}>
            <button class="px-4 inline py-2 text-sm font-medium leading-5 shadow text-white transition-colors duration-150 border border-transparent rounded-lg focus:outline-none focus:shadow-outline-blue bg-blue-600 active:bg-blue-600 hover:bg-blue-700">
              Login
            </button>
          </Link>
        </div>
        <div class="max-w-lg"></div>
      </div>
    </div>
  );
};
