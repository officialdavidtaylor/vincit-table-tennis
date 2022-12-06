"use client";

import Button from "@components-client/Form/Button";
import Input from "@components-client/Form/Input";
import { FieldValues, SubmitHandler, useForm } from "react-hook-form";
import { supabase } from "../../../lib/supabase";

const LoginForm = () => {
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
        const { error } = await supabase.auth.signInWithOtp({
          email: formData.playerEmail,
          options: {
            shouldCreateUser: false,
          },
        });
        if (error) throw new Error(error.message);
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
          Login!
        </Button>
      </form>
    </>
  );
};

export default LoginForm;
