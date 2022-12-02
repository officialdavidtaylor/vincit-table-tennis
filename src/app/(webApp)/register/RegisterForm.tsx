"use client";

import Button from "@components-client/Form/Button";
import Input from "@components-client/Form/Input";
import { FieldValues, SubmitHandler, useForm } from "react-hook-form";
import { supabase } from "../../../lib/supabase";

const RegisterForm = () => {
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
      const takenPlayerName = await supabase
        .from("PlayerTable")
        .select("*")
        .eq("playerName", formData.playerName);
      if (takenPlayerName?.data?.length)
        throw new Error("A player already exists with this name.");

      const takenEmail = await supabase
        .from("PlayerTable")
        .select("*")
        .eq("playerEmail", formData.playerEmail);
      if (takenEmail?.data?.length)
        throw new Error("A player already exists with this email.");

      if (formData.playerEmail) {
        const { error } = await supabase.auth.signInWithOtp({
          email: formData.playerEmail,
          options: { data: { playerName: formData.playerName } },
        });
        if (error) throw new Error("For some reason this didn't work :shrug:");
      }
      alert("Check your email for the login link!");
    } catch (error) {
      console.error(error);
      if (error instanceof Error) {
        alert(
          error.message ?? "An error has been detected; please try again later"
        );
      } else {
        alert("An error has been detected; please try again later");
      }
    }
  };

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
          title="Player Email (use vincit.fi)"
          placeholder="first.last@vincit.fi"
          type="email"
          autoCapitalize="none"
          autoComplete="off"
          autoCorrect="off"
          spellCheck="false"
          {...register("playerEmail", {
            required: {
              value: true,
              message: "please use your vincit.fi address",
            },
            pattern: /(@vincit.fi)/g,
          })}
        />
        {errors.playerEmail?.type === "pattern" &&
        errors.playerEmail?.message ? (
          <span className="text-md text-red-500">
            {errors.playerEmail.message as string}
          </span>
        ) : null}
        <Button
          type="submit"
          className="button-primary"
          isLoading={isSubmitting}
        >
          Sign Up!
        </Button>
      </form>
    </>
  );
};

export default RegisterForm;
