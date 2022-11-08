export default function Head() {
  return (
    <>
      <title>Game • Vincit Table Tennis</title>
      <meta
        name="viewport"
        content="minimum-scale=1, initial-scale=1, width=device-width"
      />
      <meta name="apple-mobile-web-app-title" content="Log Game" />
      <meta name="apple-mobile-web-app-capable" content="yes" />
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
    </>
  );
}
