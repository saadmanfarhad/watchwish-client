import Head from "next/head";
import { Layout } from "../components/layout.tsx";

export default function Home() {
  return (
    <>
      <Head>
        <title>Create Next App</title>
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <Layout>
        <div className="dark:bg-gray-700 bg-gray:100">
          <div className="px-8 py-12">
            <h1 className="mt-4 text-indigo-500 dark:text-white text-center text-2xl">Next.js is Cool!</h1>
          </div>
        </div>
      </Layout>
    </>
  );
}
