import { createClient } from "@supabase/supabase-js";

const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL ?? "";
const supabaseServiceRoleKey = process.env.SUPABASE_SERVICE_ROLE ?? "";

export const supabaseServiceRole = createClient(
  supabaseUrl,
  supabaseServiceRoleKey
);
