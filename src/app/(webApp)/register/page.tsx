import Button from "@components/Form/Button";
import Input from "@components/Form/Input";

export default function Home() {
  return (
    <>
      <form>
        <Input title="Player Name" type="text" placeholder="First Last " />
        <Input
          title="Player Email"
          type="text"
          placeholder="first.last@vincit.fi"
        />
        <Button className="button-primary">Send me a Magic Link!</Button>
      </form>
    </>
  );
}
