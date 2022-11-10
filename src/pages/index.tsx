import { PingPongIcon } from "@icons";
import {
  createServerSupabaseClient,
  Session,
  User,
} from "@supabase/auth-helpers-nextjs";
import { useSupabaseClient, useUser } from "@supabase/auth-helpers-react";
import { GetServerSidePropsContext } from "next";
import Head from "next/head";
import Link from "next/link";
import Button from "src/components-client/Form/Button";

export default function HomePage({
  user,
}: {
  initialSession: Session;
  user: User;
}) {
  const supabaseClient = useSupabaseClient();
  const clientUser = useUser();
  return (
    <>
      <Head>
        <title>Vincit Table Tennis</title>
        <meta
          name="viewport"
          content="minimum-scale=1, initial-scale=1, width=device-width"
        />
        <meta
          name="apple-mobile-web-app-title"
          content="Home • Vincit Table Tennis"
        />
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
      <div className="mt-36 flex w-screen flex-col items-center pb-8">
        <PingPongIcon className="w-32" />
        <span className="mt-8 text-3xl font-semibold">Vincit Table Tennis</span>
        <span>
          {user || clientUser
            ? `Welcome back, ${user ? user.email : clientUser?.email}!`
            : "Please register to continue"}
        </span>
      </div>
      <div className="absolute bottom-16 left-0 w-screen">
        {user || clientUser ? (
          <div className="flex flex-col items-center justify-center">
            <Link href="/game" className="button-primary">
              Log Game
            </Link>
            <Link href="/stats" className="button-primary">
              View Stats
            </Link>
            <Button
              className="button-primary bg-red-500"
              onClick={async () => supabaseClient.auth.signOut()}
            >
              Logout
            </Button>
          </div>
        ) : (
          <div className="flex flex-col items-center justify-center">
            <Link href="/register" className="button-primary">
              Register
            </Link>
          </div>
        )}
      </div>
    </>
  );
}

export const getServerSideProps = async (
  context: GetServerSidePropsContext
) => {
  // Create authenticated Supabase Client
  const supabase = createServerSupabaseClient(context);
  // Check if we have a session
  const {
    data: { session },
  } = await supabase.auth.getSession();

  if (!session)
    return {
      props: {
        initialSession: null,
        user: null,
      },
    };

  return {
    props: {
      initialSession: session,
      user: session.user,
    },
  };
};
