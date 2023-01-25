import "../styles/tailwind.css";
import type { AppProps } from "next/app";
import { createBrowserSupabaseClient } from "@supabase/auth-helpers-nextjs";
import { SessionContextProvider, Session } from "@supabase/auth-helpers-react";
import { useState } from "react";
import Head from "next/head";

export default function App({
  Component,
  pageProps,
}: AppProps<{
  initialSession: Session;
}>) {
  const [supabaseClient] = useState(() => createBrowserSupabaseClient());

  return (
    <>
      <Head>
        <title>Vincit Table Tennis</title>
        <meta
          name="viewport"
          content="minimum-scale=1, initial-scale=1, width=device-width"
        />
        <meta name="apple-mobile-web-app-title" content="Register" />
        <link rel="apple-touch-icon" href="touch-icon-ipad-retina.png"></link>
        {/* Apple iPhone High Resolution */}
        <link
          rel="apple-touch-icon"
          sizes="180x180"
          href="touch-icon-iphone-retina.png"
        />
        {/* Apple iPad High Resolution */}
        <link
          rel="apple-touch-icon"
          sizes="167x167"
          href="touch-icon-ipad-retina.png"
        />
        {/* Android Devices High Resolution */}
        <link rel="icon" sizes="192x192" href="touch-icon-hd.png" />
        {/* Android Devices Normal Resolution */}
        <link rel="icon" sizes="128x128" href="touch-icon.png" />
      </Head>
      <SessionContextProvider
        supabaseClient={supabaseClient}
        initialSession={pageProps.initialSession}
      >
        <Component {...pageProps} />
      </SessionContextProvider>
    </>
  );
}
