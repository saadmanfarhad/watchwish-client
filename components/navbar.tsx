import React, { useEffect, useState } from "react";
import Link from "next/link";
import { useSession, signOut } from "next-auth/client";
import { useTheme } from "next-themes";

export const Navbar = () => {
  const [showUserMenu, setShowUserMenu] = useState(false);
  const [showMobileMenu, setShowMobileMenu] = useState(false);
  const [mounted, setMounted] = useState(false);
  const { theme, setTheme } = useTheme();
  const [session, loading] = useSession();

  useEffect(() => setMounted(true), []);

  return (
    <nav className="bg-gray-300 dark:bg-gray-800">
      <div className="max-w-8xl mx-auto px-2 sm:px-6 lg:px-8">
        <div className="relative flex items-center justify-between h-16">
          <div className="absolute inset-y-0 left-0 flex items-center sm:hidden">
            {/*<!-- Mobile menu button-->*/}
            <button
              type="button"
              className="inline-flex items-center justify-center p-2 rounded-md text-gray-400 hover:text-white hover:bg-gray-700 focus:outline-none focus:ring-2 focus:ring-inset focus:ring-white"
              aria-controls="mobile-menu"
              aria-expanded="false"
              onClick={() => setShowMobileMenu(!showMobileMenu)}
            >
              <span className="sr-only">Open main menu</span>
              {/*<!--
            Icon when menu is closed.

            Heroicon name: outline/menu

            Menu open: "hidden", Menu closed: "block"
          -->*/}
              {showMobileMenu ? (
                <svg
                  className="h-6 w-6"
                  xmlns="http://www.w3.org/2000/svg"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                  aria-hidden="true"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth="2"
                    d="M6 18L18 6M6 6l12 12"
                  />
                </svg>
              ) : (
                <svg
                  className="block h-6 w-6"
                  xmlns="http://www.w3.org/2000/svg"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                  aria-hidden="true"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth="2"
                    d="M4 6h16M4 12h16M4 18h16"
                  />
                </svg>
              )}

              {/*<!--
            Icon when menu is open.

            Heroicon name: outline/x

            Menu open: "block", Menu closed: "hidden"
          -->*/}
            </button>
          </div>
          <div className="flex-1 flex items-center justify-center sm:items-stretch sm:justify-start">
            <div className="flex-shrink-0 flex items-center">
              <Link href={`/`}>
                <img
                  className="block cursor-pointer lg:hidden h-12 w-16"
                  src="/logo-mobile.png"
                  alt="Workflow"
                />
              </Link>
              <Link href={`/`}>
                <img
                  className="hidden cursor-pointer lg:block h-12 w-auto"
                  src="/logo.png"
                  alt="Workflow"
                />
              </Link>
            </div>
            <div className="hidden sm:block sm:ml-6">
              <div className="flex space-x-4 mt-2">
                {/*<!-- Current: "bg-gray-900 text-white", Default: "text-gray-300 hover:bg-gray-700 hover:text-white" -->*/}
                <Link href={"/search"}>
                  <a
                    href="#"
                    className="text-gray-700 dark:text-gray-300 hover:bg-gray-400 dark:hover:bg-gray-700 hover:text-white px-3 py-2 rounded-md text-sm font-medium"
                    aria-current="page"
                  >
                    Search
                  </a>
                </Link>

                {session && (
                  <Link href={"/watchlist"}>
                    <a
                      href="#"
                      className="text-gray-700 dark:text-gray-300 hover:bg-gray-400 dark:hover:bg-gray-700 hover:text-white px-3 py-2 rounded-md text-sm font-medium"
                    >
                      Watchlist
                    </a>
                  </Link>
                )}
              </div>
            </div>
          </div>
          <div className="absolute inset-y-0 right-0 flex items-center pr-2 sm:static sm:inset-auto sm:ml-6 sm:pr-0">
            <button
              className="bg-gray-800 dark:bg-gray-300 p-1 rounded-full text-gray-400 hover:text-white focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-offset-gray-800 focus:ring-white"
              onClick={() => setTheme(theme === "dark" ? "light" : "dark")}
            >
              {mounted && (
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  viewBox="0 0 20 20"
                  fill="currentColor"
                  className="h-4 w-4 text-white dark:text-black"
                >
                  {theme === "dark" ? (
                    <path
                      fillRule="evenodd"
                      d="M10 2a1 1 0 011 1v1a1 1 0 11-2 0V3a1 1 0 011-1zm4 8a4 4 0 11-8 0 4 4 0 018 0zm-.464 4.95l.707.707a1 1 0 001.414-1.414l-.707-.707a1 1 0 00-1.414 1.414zm2.12-10.607a1 1 0 010 1.414l-.706.707a1 1 0 11-1.414-1.414l.707-.707a1 1 0 011.414 0zM17 11a1 1 0 100-2h-1a1 1 0 100 2h1zm-7 4a1 1 0 011 1v1a1 1 0 11-2 0v-1a1 1 0 011-1zM5.05 6.464A1 1 0 106.465 5.05l-.708-.707a1 1 0 00-1.414 1.414l.707.707zm1.414 8.486l-.707.707a1 1 0 01-1.414-1.414l.707-.707a1 1 0 011.414 1.414zM4 11a1 1 0 100-2H3a1 1 0 000 2h1z"
                      clipRule="evenodd"
                    />
                  ) : (
                    <path d="M17.293 13.293A8 8 0 016.707 2.707a8.001 8.001 0 1010.586 10.586z" />
                  )}
                </svg>
              )}
            </button>

            {/*<!-- Profile dropdown -->*/}
            <div className="ml-3 relative">
              <div>
                {session && (
                  <button
                    type="button"
                    className="bg-gray-800 flex text-sm rounded-full focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-offset-gray-800 focus:ring-white"
                    id="user-menu-button"
                    aria-expanded="false"
                    aria-haspopup="true"
                    onClick={() => setShowUserMenu(!showUserMenu)}
                  >
                    <span className="sr-only">Open user menu</span>
                    <img
                      className="h-8 w-8 rounded-full"
                      src={
                        session.user.avatar ? session.user.avatar : "/user.png"
                      }
                      alt=""
                    />
                  </button>
                )}
                {!session && (
                  <Link href="/login">
                    <a
                      href="#"
                      className="text-gray-700 dark:text-gray-300 hover:bg-gray-400 dark:hover:bg-gray-700 hover:text-white px-3 py-2 rounded-md text-sm font-medium"
                      aria-current="page"
                    >
                      Login
                    </a>
                  </Link>
                )}
              </div>

              {/*<!--
            Dropdown menu, show/hide based on menu state.

            Entering: "transition ease-out duration-100"
              From: "transform opacity-0 scale-95"
              To: "transform opacity-100 scale-100"
            Leaving: "transition ease-in duration-75"
              From: "transform opacity-100 scale-100"
              To: "transform opacity-0 scale-95"
          -->*/}
              {showUserMenu && session ? (
                <div
                  className="origin-top-right absolute right-0 mt-2 w-48 rounded-md shadow-lg py-1 bg-white dark:bg-gray-800 ring-1 ring-black ring-opacity-5 focus:outline-none"
                  role="menu"
                  aria-orientation="vertical"
                  aria-labelledby="user-menu-button"
                  tabIndex="-1"
                >
                  {/*<!-- Active: "bg-gray-100", Not Active: "" -->*/}
                  <Link href={`/user/${session?.user?.id!}`}>
                    <a
                      href="#"
                      className="block hover:bg-gray-200 dark:hover:bg-gray-700 px-4 py-2 text-sm text-gray-700 dark:text-gray-300"
                      role="menuitem"
                      tabIndex="-1"
                      id="user-menu-item-0"
                    >
                      Your Profile
                    </a>
                  </Link>
                  <a
                    href="#"
                    className="block hover:bg-gray-200 dark:hover:bg-gray-700 px-4 py-2 text-sm text-gray-700 dark:text-gray-300"
                    role="menuitem"
                    tabIndex="-1"
                    id="user-menu-item-1"
                  >
                    Settings
                  </a>
                  <a
                    href="#"
                    className="block hover:bg-gray-200 dark:hover:bg-gray-700 px-4 py-2 text-sm text-gray-700 dark:text-gray-300"
                    role="menuitem"
                    tabIndex="-1"
                    id="user-menu-item-2"
                    onClick={() => signOut()}
                  >
                    Sign out
                  </a>
                </div>
              ) : undefined}
            </div>
          </div>
        </div>
      </div>

      {/*<!-- Mobile menu, show/hide based on menu state. -->*/}
      {showMobileMenu ? (
        <div className="sm:hidden" id="mobile-menu">
          <div className="px-2 pt-2 pb-3 space-y-1">
            {/*<!-- Current: "bg-gray-900 text-white", Default: "text-gray-300 hover:bg-gray-700 hover:text-white" -->*/}
            <Link href={"/search"}>
              <a
                href="#"
                className="text-gray-700 dark:text-gray-300 hover:bg-gray-400 hover:text-white block px-3 py-2 rounded-md text-base font-medium"
                aria-current="page"
              >
                Search
              </a>
            </Link>

            {session && (
              <Link href={"/watchlist"}>
                <a
                  href="#"
                  className="text-gray-700 dark:text-gray-300 hover:bg-gray-400 hover:text-white block px-3 py-2 rounded-md text-base font-medium"
                >
                  Watchlist
                </a>
              </Link>
            )}
          </div>
        </div>
      ) : undefined}
    </nav>
  );
};
