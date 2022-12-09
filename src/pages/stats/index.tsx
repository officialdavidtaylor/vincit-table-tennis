import { supabaseServiceRole } from "@lib/supabaseServiceRole";
import { createServerSupabaseClient } from "@supabase/auth-helpers-nextjs";
import { GetServerSidePropsContext } from "next";
import Head from "next/head";
import PageLayout from "src/components-client/PageLayout";

function Block({ value, label }: { value: string | number; label: string }) {
  return (
    <>
      <div className="flex aspect-square flex-col items-center justify-center border border-black text-center">
        <p className="pb-2 text-7xl font-black">{value}</p>
        <h3 className="text-3xl ">{label}</h3>
      </div>
    </>
  );
}

interface Props {
  data: {
    player: {
      playerName: string;
      gamesPlayed: number;
      gamesWon: number;
      pointsScored: number;
    };
    office: {
      totalGames: number;
      totalRallies: number;
    };
  };
}

export default function Home({
  data: {
    player: { gamesPlayed, gamesWon, playerName, pointsScored },
    office: { totalGames, totalRallies },
  },
}: Props) {
  return (
    <>
      <Head>
        <title>Stats • Vincit Table Tennis</title>
      </Head>
      <PageLayout segment="STATS :D">
        <div className="flex flex-col gap-8">
          <section>
            <h2 className="pb-8 text-3xl">Personal ({playerName})</h2>
            <div className="grid grid-cols-2 gap-6">
              <Block value={gamesPlayed} label="Games Played"></Block>
              <Block value={pointsScored} label="Points Scored"></Block>
              <Block value={gamesWon} label="Wins"></Block>
            </div>
          </section>
          <section>
            <h2 className="pb-8 text-3xl">Office</h2>
            <div className="grid grid-cols-2 gap-6">
              <Block value={totalGames} label="Total Games"></Block>
              <Block value={totalRallies} label="Total Rallies"></Block>
            </div>
          </section>
        </div>
      </PageLayout>
    </>
  );
}

export const getServerSideProps = async (
  context: GetServerSidePropsContext
) => {
  const supabase = createServerSupabaseClient(context);

  const {
    data: { session },
  } = await supabase.auth.getSession();

  if (!session?.user.id) {
    return { props: {} };
  }

  const userId = session.user.id;

  const playerName = session.user.user_metadata.playerName;
  const { data: games, error } = await supabase.from("GameTable").select("*");

  if (error) {
    console.error(error);
    throw Error(error.message);
  }

  let totalGames = games.length;
  let totalRallies = games.reduce((rallies, game) => {
    return rallies + game.player1Score + game.player2Score;
  }, 0);

  const myGames = games.filter((game) => {
    if (game.player1 === userId) return true;
    if (game.player2 === userId) return true;
    return false;
  });

  let gamesPlayed = myGames.length;
  let gamesWon = 0;
  let pointsScored = 0;

  myGames.forEach((game) => {
    if (game.player1 === userId) {
      pointsScored += game.player1Score;
      if (game.player1Score > game.player2Score) {
        gamesWon++;
      }
    }
    if (game.player2 === userId) {
      pointsScored += game.player2Score;
      if (game.player2Score > game.player1Score) {
        gamesWon++;
      }
    }
  });

  return {
    props: {
      data: {
        player: { playerName, gamesPlayed, gamesWon, pointsScored },
        office: { totalGames, totalRallies },
      },
    },
  };
};
