import { useSupabaseClient, useUser } from "@supabase/auth-helpers-react";
import Head from "next/head";
import { FieldValues, SubmitHandler, useForm } from "react-hook-form";
import PageLayout from "src/components-client/PageLayout";
import Button from "./Form/Button";
import Input from "./Form/Input";
import InputGroup from "./Form/InputGroup";
import OpponentCombobox from "./Form/OpponentCombobox";
import { v4 as uuidv4 } from "uuid";
import { onGameTableInsertionRejected } from "@utils";
import { useState } from "react";
import Link from "next/link";

// eslint-disable-next-line import/no-anonymous-default-export, react/display-name
export default ({ opponents }: any) => {
  const supabase = useSupabaseClient();
  const userState = useUser();
  const {
    formState: { isSubmitting, errors },
    handleSubmit,
    register,
    reset,
    setError,
  } = useForm();

  const [recordInserted, setRecordInserted] = useState<boolean>(false);
  const [selectedOpponentId, setSelectedOpponentId] = useState<string>("");

  const onSubmit: SubmitHandler<FieldValues> = async (data) => {
    if (selectedOpponentId !== "") {
      // construct insertion object
      const insertionObject = {
        id: uuidv4(),
        created_at: data.created_at,
        player1Score: data.player1Score,
        player2Score: data.player2Score,
        player1: userState?.id,
        player2: selectedOpponentId,
        gameSeries: "3f3cb67f-693d-4cf8-a75a-dadd0fd4addb",
      };

      // execute the insertion operation
      await supabase
        .from("GameTable")
        .insert(insertionObject)
        .then(() => {
          reset();
          setRecordInserted(true);
        }, onGameTableInsertionRejected);
    } else if (selectedOpponentId === "") {
      setError(
        "player2",
        { message: "Please select an opponent" },
        { shouldFocus: true }
      );
    }
  };
  return (
    <>
      <Head>
        <title>Game • Vincit Table Tennis</title>
      </Head>
      <PageLayout segment="Log Game Info">
        {recordInserted ? (
          <div className="flex w-full flex-col items-center justify-around gap-24 pt-12">
            <div className="flex h-48 w-48 items-center justify-center rounded-full bg-green-600 text-center text-9xl text-white">
              ✓
            </div>
            <Link className="button-primary" href="/">
              Go Home
            </Link>
          </div>
        ) : (
          <form
            className="flex flex-col gap-4"
            onSubmit={handleSubmit(onSubmit)}
          >
            <InputGroup title="Your Score">
              <Input
                title="Player Name"
                type="text"
                value={userState ? userState.user_metadata.playerName : ""}
                readOnly
              />
              <Input
                title="Score"
                type="number"
                pattern="\d*"
                placeholder="Score as integer"
                {...register("player1Score", { required: true })}
              />
            </InputGroup>
            <InputGroup title="Your Opponent">
              <OpponentCombobox
                players={opponents}
                {...register("player2")}
                valueSetter={setSelectedOpponentId}
              />
              <Input
                title="Score"
                type="number"
                pattern="\d*"
                placeholder="Score as integer"
                {...register("player2Score", { required: true })}
              />
            </InputGroup>
            <Input
              title="Game Type"
              type="string"
              defaultValue="Free Play"
              {...register("gameSeries", { required: true })}
            />
            <Input
              title="Date"
              type="datetime-local"
              defaultValue={(() => {
                const date = new Date();
                const timezoneHourOffset = new Date().getTimezoneOffset() / -60;
                date.setHours(date.getHours() + timezoneHourOffset);
                return date.toISOString().split("Z")[0].substring(0, 16); // TODO: Ideally this will be in local timezone
              })()}
              {...register("created_at", {
                required: true,
                onChange: (event) => {
                  event.target.value = event.target.value.substr(0, 16);
                },
              })}
            />
            <Button className="button-primary" isLoading={isSubmitting}>
              Save Game
            </Button>
          </form>
        )}
      </PageLayout>
    </>
  );
};
