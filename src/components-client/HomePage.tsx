"use client";

import Link from "next/link";
import { useEffect, useState } from "react";
import { Database } from "../../types/supabase";
import { AuthChangeEvent, Session } from "@supabase/supabase-js";
import { createBrowserSupabaseClient } from "@supabase/auth-helpers-nextjs";

const HomePage = () => {
  const [userIsAuthenticated, setUserIsAuthenticated] =
    useState<boolean>(false);

  const [supabaseClient] = useState(() =>
    createBrowserSupabaseClient<Database>()
  );

  useEffect(() => {
    (async () => await supabaseClient.auth.initialize())();

    if (supabaseClient.auth) {
      supabaseClient.auth.onAuthStateChange(
        (event: AuthChangeEvent, session: Session | null) => {
          if (event === "SIGNED_OUT" || event === "USER_DELETED") {
            setUserIsAuthenticated(false);
            // delete cookies on sign out
            const expires = new Date(0).toUTCString();
            document.cookie = `my-access-token=; path=/; expires=${expires}; SameSite=Lax; secure`;
            document.cookie = `my-refresh-token=; path=/; expires=${expires}; SameSite=Lax; secure`;
          } else if (
            session &&
            (event === "SIGNED_IN" || event === "TOKEN_REFRESHED")
          ) {
            setUserIsAuthenticated(true);
            const maxAge = 100 * 365 * 24 * 60 * 60; // 100 years, never expires
            document.cookie = `my-access-token=${session.access_token}; path=/; max-age=${maxAge}; SameSite=Lax; secure`;
            document.cookie = `my-refresh-token=${session.refresh_token}; path=/; max-age=${maxAge}; SameSite=Lax; secure`;
          }
        }
      );
    }
  }, [supabaseClient.auth]);

  return (
    <>
      <div className="absolute bottom-16 left-0 w-screen">
        {userIsAuthenticated ? (
          <div className="flex flex-col items-center justify-center">
            <Link href="/game" className="button-primary">
              Log Game
            </Link>
            <Link href="/stats" className="button-primary">
              View Stats
            </Link>
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
};

export default HomePage;
