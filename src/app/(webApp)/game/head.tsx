import HeadCommonElements from "@components/head/HeadCommonElements";
import HeadIcons from "@components/head/HeadIcons";

export default function Head() {
  return (
    <>
      <title>Game • Vincit Table Tennis</title>
      <meta name="apple-mobile-web-app-title" content="Log Game" />
      <meta name="apple-mobile-web-app-capable" content="yes" />

      <HeadCommonElements />
      <HeadIcons />
    </>
  );
}
