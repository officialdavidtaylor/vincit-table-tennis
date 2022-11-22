import { Players } from "@components-client/Form/OpponentCombobox/models";
import GamePage from "@components-client/GamePage";

import { Session, User } from "@supabase/auth-helpers-nextjs";

import { GetServerSidePropsContext } from "next";
import { supabaseServiceRole } from "@lib/supabaseServiceRole";

// eslint-disable-next-line import/no-anonymous-default-export, react/display-name
export default (props: {
  initialSession: Session;
  user: User;
  opponents: Players[];
  gameTypes: any;
}) => (
  <>
    <GamePage {...props} />
  </>
);

export const getServerSideProps = async (
  context: GetServerSidePropsContext
) => {
  // Create authenticated Supabase Client
  const supabase = supabaseServiceRole;
  // query for all users
  const { data, error } = await supabase.auth.admin.listUsers();

  const userObject = data.users.map((record) => {
    const { id, email } = record;
    const playerName = record.user_metadata.playerName ?? "name not found";
    return { id, email, playerName };
  });

  if (userObject.length > 0) {
    return {
      props: {
        opponents: userObject,
        gameTypes: null,
      },
    };
  }

  return {
    props: {
      initialSession: null,
      user: null,
      opponents: null,
    },
  };
};
