import { supabaseConfigured } from "@/lib/supabase";

export function Notice({ searchParams, savedText = "Saved." }) {
  if (searchParams.error) {
    return (
      <div className="form-alert" role="alert">
        {searchParams.error}
      </div>
    );
  }
  if (searchParams.saved) {
    return (
      <p className="admin__saved" role="status">
        {savedText}
      </p>
    );
  }
  return null;
}

// Shown instead of a page's content until the database is connected.
export function SetupRequired() {
  if (supabaseConfigured()) return null;
  return (
    <div className="admin__card">
      <h1 className="admin__title">Connect Supabase</h1>
      <p>
        The database isn’t connected yet. Add <code>SUPABASE_URL</code> and{" "}
        <code>SUPABASE_SERVICE_ROLE_KEY</code> to <code>.env.local</code>, run{" "}
        <code>supabase/schema.sql</code> in the Supabase SQL editor, then restart the site.
      </p>
    </div>
  );
}
