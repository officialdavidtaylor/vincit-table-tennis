import Head from "next/head";
import Link from "next/link";

interface PageLayoutProps {
  children: React.ReactNode;
  segment: string;
}
// eslint-disable-next-line import/no-anonymous-default-export, react/display-name
export default ({ children, segment }: PageLayoutProps) => {
  return (
    <>
      <Head>
        <meta
          name="viewport"
          content="minimum-scale=1, initial-scale=1, width=device-width"
        />
        <meta name="apple-mobile-web-app-title" content="Log Game" />
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

      <div className="flex w-screen justify-center">
        <div id="container" className="w-full max-w-xl p-4">
          <Link
            href="/"
            id="heading"
            className="flex flex-col rounded-xl pt-4 pb-4"
          >
            <span className="mb-2 text-4xl font-semibold">
              Vincit Table Tennis
            </span>
            <span className="text-2xl">{segment ?? ""}</span>
          </Link>
          {children}
        </div>
      </div>
    </>
  );
};
