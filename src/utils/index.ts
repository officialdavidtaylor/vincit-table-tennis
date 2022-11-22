import { PostgrestResponse } from "@supabase/supabase-js";

export const onGameTableInsertionAccepted = (
  value: PostgrestResponse<undefined>
) => {
  console.log("response accepted");
  return null;
};

export const onGameTableInsertionRejected = (
  value: PostgrestResponse<undefined>
) => {
  console.log("response rejected");
  return null;
};
