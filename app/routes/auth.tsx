import { useEffect } from "react";
import { useLocation, useNavigate } from "react-router";

import { usePuterStore } from "~/lib/puter";

export const meta = () => [
  { title: "Resumind | Auth" },
  { name: "description", content: "Log into your account" },
];

const Auth = () => {
  const { isLoading, auth } = usePuterStore();
  const location = useLocation();
  const next = location.search.split("next=")[ 1 ];
  const navigate = useNavigate();

  useEffect(() => {
    if (auth.isAuthenticated) {
      navigate(next);
    }
  }, [ auth.isAuthenticated, next, navigate ]);

  return (
    <main className="flex min-h-screen items-center justify-center bg-[url('/images/bg-auth.svg')] bg-cover">
      <div className="gradient-border shadow-lg">
        <section className="flex flex-col gap-8 rounded-2xl bg-white p-10">
          <div className="flex flex-col items-center gap-2 text-center">
            <h1>Welcome</h1>
            <h2>Log In To Continue Your Job Journey</h2>
          </div>
          <div>
            {isLoading ? (
              <button className="auth-button animate-pulse" type="button">
                <p>Signing you in...</p>
              </button>
            ) : auth.isAuthenticated ? (
              <button
                className="auth-button"
                onClick={auth.signOut}
                type="button"
              >
                <p>Log out</p>
              </button>
            ) : (
              <button
                className="auth-button"
                onClick={auth.signIn}
                type="button"
              >
                <p>Log in</p>
              </button>
            )}
          </div>
        </section>
      </div>
    </main>
  );
};

export default Auth;
