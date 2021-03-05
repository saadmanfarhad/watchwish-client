import Head from "next/head";
import { Layout } from "../components/layout.tsx";

export default function Home() {
  return (
    <div>
      <Head>
        <title>Create Next App</title>
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <Layout>
        <h1 className="mt-4 text-indigo-500 text-center text-2xl">Next.js is Cool!</h1>
      </Layout>
    </div>
  );
}
