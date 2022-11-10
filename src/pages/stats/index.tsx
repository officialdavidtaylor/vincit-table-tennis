import Head from "next/head";
import PageLayout from "src/components-client/PageLayout";

export default function Home() {
  return (
    <>
      <Head>
        <title>Stats • Vincit Table Tennis</title>
      </Head>
      <PageLayout segment="STATS :D">
        <h1 className="bg-red-200 text-3xl font-bold">Hello world!</h1>
      </PageLayout>
    </>
  );
}
