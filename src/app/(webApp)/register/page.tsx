"use client";

import Button from "@components-client/Form/Button";
import Input from "@components-client/Form/Input";
import { FieldValues, SubmitHandler, useForm } from "react-hook-form";
import { supabase } from "../../../lib/supabase";

const Register = () => {
  // use react-hook-form to manage form state and submission
  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
  } = useForm();

  const onSubmit: SubmitHandler<FieldValues> = async (data) => {
    const formData = data;
    console.log("executed onSubmit!");
    // use Supabase auth here :D
    try {
      if (formData.playerEmail) {
        const { data, error } = await supabase.auth.signInWithOtp({
          email: formData.playerEmail,
          options: { data: { playerName: formData.playerName } },
        });
        if (error) throw new Error("For some reason this didn't work :shrug:");
      }
      alert("Check your email for the login link!");
    } catch (error) {
      alert("An error has been detected; please try again later");
    }
  };

  console.log(errors);

  return (
    <>
      <form className="flex flex-col gap-4" onSubmit={handleSubmit(onSubmit)}>
        <Input
          title="Player Name"
          placeholder="First Last"
          type="text"
          {...register("playerName", { required: true })}
        />
        <Input
          title="Player Email"
          placeholder="first.last@vincit.fi"
          type="email"
          autoCapitalize="none"
          autoComplete="off"
          autoCorrect="off"
          spellCheck="false"
          {...register("playerEmail", {
            required: true,
            pattern: /(@vincit.com)|(@vincit.fi)/g,
          })}
        />
        <Button
          type="submit"
          className="button-primary"
          isLoading={isSubmitting}
        >
          Send me a Magic Link!
        </Button>
      </form>
    </>
  );
};

export default Register;
