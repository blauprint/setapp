import Head from "next/head";

import IdeaInputForm from "@/components/IdeaInputForm";




export default function Home() {
  return (
    <>
      <Head>
        <title>⚙️ SetApp</title>
        <meta name="description" content="SetApp" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        {/* <link rel="icon" href="/favicon.ico" /> */}
      </Head>
      <p> This will be the homepage for project website</p>
      <IdeaInputForm />
    </>
  );
}
