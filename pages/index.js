import Head from "next/head";
import { Layout } from "../components/layout.tsx";
import { SearchBar } from "../components/searchbar.tsx";

export default function Home() {
  return (
    <>
      <Head>
        <title>Create Next App</title>
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <Layout>
        <div className="dark:bg-gray-700 bg-gray:100 flex items-center justify-center">
          <div className="mt-6 w-1/2">
            <SearchBar />
          </div>
        </div>
      </Layout>
    </>
  );
}
