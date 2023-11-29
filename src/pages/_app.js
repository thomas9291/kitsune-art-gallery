import "@/styles/globals.css";
import { SWRConfig } from "swr";
import Head from "next/head";

export default function App({ Component, pageProps }) {
  return (
    <>
      <Head>
        <title>Kitsune Art Gallery</title>
        <meta name="viewport" content="initial-scale=1.0, width=device-width" />
      </Head>
      <SWRConfig
        value={{
          fetcher: async (...args) => {
            const response = await fetch(...args);
            if (!response.ok) {
              throw new Error(`Request with ${JSON.stringify(args)} failed.`);
            }
            return await response.json();
          },
        }}
      >
        <Component {...pageProps} />
      </SWRConfig>
    </>
  );
}
