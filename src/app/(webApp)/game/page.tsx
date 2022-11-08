"use client";

import Button from "@components/Form/Button";
import Input from "@components/Form/Input";
import InputGroup from "@components/Form/InputGroup";
import OpponentCombobox from "@components/Form/OpponentCombobox";

export default function Home() {
  const userName = "David Taylor";
  return (
    <>
      <form className="flex flex-col gap-4">
        <InputGroup title="Your Score">
          <Input title="Player Name" type="text" value={userName} readOnly />
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
            return date.toISOString().split("Z")[0]; // FIXME: Ideally this will be in local timezone
          })()}
        />
        <Button className="button-primary">Save Game</Button>
      </form>
    </>
  );
}
