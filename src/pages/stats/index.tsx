import { supabaseServiceRole } from "@lib/supabaseServiceRole";
import { createServerSupabaseClient } from "@supabase/auth-helpers-nextjs";
import { GetServerSidePropsContext } from "next";
import Head from "next/head";
import PageLayout from "src/components-client/PageLayout";

function Block({ value, label }: { value: string | number; label: string }) {
  return (
    <>
      <div className="flex aspect-square flex-col items-center justify-center rounded-md border border-gray-600 text-center">
        <p className="pb-2 text-5xl font-extrabold">{value}</p>
        <h3 className="text-xl ">{label}</h3>
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
      playerTotalRallies: number;
    };
    office: {
      totalGames: number;
      totalRallies: number;
    };
  };
}

export default function Home({
  data: {
    player: {
      gamesPlayed,
      gamesWon,
      playerName,
      pointsScored,
      playerTotalRallies,
    },
    office: { totalGames, totalRallies },
  },
}: Props) {
  const winRate = Math.floor((gamesWon / gamesPlayed) * 100) + "%";
  const pointRate = Math.floor((pointsScored / playerTotalRallies) * 100) + "%";
  return (
    <>
      <Head>
        <title>Stats • Vincit Table Tennis</title>
      </Head>
      <PageLayout segment="STATS :D">
        <div className="flex flex-col gap-8">
          <section>
            <h2 className="pb-4 text-3xl">Personal ({playerName})</h2>
            <div className="grid grid-cols-2 gap-4">
              <Block value={gamesPlayed} label="Games Played" />
              <Block value={playerTotalRallies} label="Total Rallies" />
              <Block value={gamesWon} label="Wins" />
              <Block value={pointsScored} label="Points Scored" />
            </div>
            <hr className="my-8" />
            <div className="grid grid-cols-2 gap-4">
              <Block value={winRate} label="Win Rate" />
              <Block value={pointRate} label="Point Rate" />
            </div>
          </section>
          <section>
            <h2 className="pb-4 text-3xl">Office</h2>
            <div className="grid grid-cols-2 gap-4">
              <Block value={totalGames} label="Total Games" />
              <Block value={totalRallies} label="Total Rallies" />
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
  let playerTotalRallies = 0;
  let pointsScored = 0;

  myGames.forEach((game) => {
    playerTotalRallies += game.player1Score + game.player2Score;
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
        player: {
          playerName,
          gamesPlayed,
          gamesWon,
          pointsScored,
          playerTotalRallies,
        },
        office: { totalGames, totalRallies },
      },
    },
  };
};
