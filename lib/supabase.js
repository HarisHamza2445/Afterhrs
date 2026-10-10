import "server-only";
import { createClient } from "@supabase/supabase-js";

export const supabaseConfigured = () =>
  Boolean(process.env.SUPABASE_URL && process.env.SUPABASE_SERVICE_ROLE_KEY);

let client;

// Server-side client using the secret key. Row Level Security is enabled with
// no policies, so the database is reachable only through this server.
export function db() {
  if (!client) {
    client = createClient(process.env.SUPABASE_URL, process.env.SUPABASE_SERVICE_ROLE_KEY, {
      auth: { persistSession: false, autoRefreshToken: false },
    });
  }
  return client;
}
