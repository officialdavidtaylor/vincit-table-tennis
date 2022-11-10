import HeadCommonElements from "@components/head/HeadCommonElements";
import HeadIcons from "@components/head/HeadIcons";

export default function Head() {
  return (
    <>
      <title>Stats • Vincit Table Tennis</title>
      <meta name="apple-mobile-web-app-title" content="Stat Viewer" />

      <HeadCommonElements />
      <HeadIcons />
    </>
  );
}
