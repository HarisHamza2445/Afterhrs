import { redirect } from "next/navigation";
import { adminConfigured, isAdmin } from "@/lib/admin-auth";
import { login } from "../actions";

export default async function LoginPage({ searchParams }) {
  if (await isAdmin()) redirect("/admin");
  const { error } = await searchParams;
  return (
    <div className="admin__card admin__card--narrow">
      <h1 className="admin__title">Sign in</h1>
      {adminConfigured() ? (
        <form action={login} className="admin__form">
          {error && (
            <div className="form-alert" role="alert">
              Wrong password.
            </div>
          )}
          <div className="field">
            <label htmlFor="password">Password</label>
            <input
              id="password"
              name="password"
              type="password"
              autoComplete="current-password"
              required
              autoFocus
            />
          </div>
          <button type="submit" className="btn btn--solid btn--block">
            Sign in
          </button>
        </form>
      ) : (
        <p>
          No admin password is set. Add <code>ADMIN_PASSWORD</code> to <code>.env.local</code> and restart the
          site.
        </p>
      )}
    </div>
  );
}
