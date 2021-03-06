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
        <div className="flex items-center justify-center">
          <div className="mt-6 w-3/4 md:w-2/5">
            <SearchBar />
          </div>
        </div>
      </Layout>
    </>
  );
}
