import Button from "@components/Form/Button";
import Link from "next/link";

export default function Home() {
  // TODO: hook this up to Supabase
  const userIsRegistered = false;

  return (
    <>
      <div className="absolute bottom-16 left-0 w-screen">
        {userIsRegistered ? (
          <div className="flex flex-col items-center justify-center">
            <Button className="button-primary">Log Game</Button>
            <Button className="button-primary">View Stats</Button>
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
