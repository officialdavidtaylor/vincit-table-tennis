import {
  createServerSupabaseClient,
  Session,
  User,
} from "@supabase/auth-helpers-nextjs";
import { useUser } from "@supabase/auth-helpers-react";
import { GetServerSidePropsContext } from "next";
import Head from "next/head";
import PageLayout from "src/components-client/PageLayout";
import Button from "./Form/Button";
import Input from "./Form/Input";
import InputGroup from "./Form/InputGroup";
import OpponentCombobox from "./Form/OpponentCombobox";

// eslint-disable-next-line import/no-anonymous-default-export, react/display-name
export default ({ user }: { initialSession: Session; user: User }) => {
  const userState = useUser();
  return (
    <>
      <Head>
        <title>Game • Vincit Table Tennis</title>
      </Head>
      <PageLayout segment="Log Game Info">
        <form className="flex flex-col gap-4">
          <InputGroup title="Your Score">
            <Input
              title="Player Email"
              type="text"
              value={userState ? userState.email : ""}
              readOnly
            />
            <Input title="Score" type="number" placeholder="Score as integer" />
          </InputGroup>
          <InputGroup title="Your Opponent">
            <OpponentCombobox />
            <Input title="Score" type="number" placeholder="Score as integer" />
          </InputGroup>
          <Input title="Game Type" type="string" defaultValue="Free Play" />
          <Input
            title="Date"
            type="datetime-local"
            defaultValue={(() => {
              const date = new Date();
              return date.toISOString().split("Z")[0]; // TODO: Ideally this will be in local timezone
            })()}
          />
          <Button className="button-primary">Save Game</Button>
        </form>
      </PageLayout>
    </>
  );
};

export const getServerSideProps = async (
  context: GetServerSidePropsContext
) => {
  // Create authenticated Supabase Client
  const supabase = createServerSupabaseClient(context);
  // Check if we have a session
  const {
    data: { session },
  } = await supabase.auth.getSession();

  if (!session?.user) {
    return {
      redirect: {
        destination: "/",
        permanent: false,
      },
      props: {},
    };
  }

  return {
    props: {
      initialSession: session,
      user: session.user,
    },
  };
};
