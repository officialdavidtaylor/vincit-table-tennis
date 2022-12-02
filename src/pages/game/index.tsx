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

export const getServerSideProps = async () => {
  // Create authenticated Supabase Client
  const supabase = supabaseServiceRole;

  const { data: players, error: playerErrors } = await supabase
    .from("PlayerTable")
    .select();

  if (players) {
    const playersObject = players.map((player) => {
      const { id, playerName, playerEmail: email } = player;
      return { id, email, playerName };
    });

    if (playersObject.length > 0) {
      return {
        props: {
          opponents: playersObject,
          gameTypes: null,
        },
      };
    }
  }

  return {
    props: {
      initialSession: null,
      user: null,
      opponents: null,
    },
  };
};
