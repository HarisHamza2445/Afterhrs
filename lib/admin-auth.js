import "server-only";
import { createHash, createHmac, timingSafeEqual } from "node:crypto";
import { cookies } from "next/headers";
import { redirect } from "next/navigation";

const COOKIE = "afterhrs_admin";

const sha = (value) => createHash("sha256").update(value).digest();
const sessionToken = () =>
  createHmac("sha256", process.env.ADMIN_PASSWORD).update("afterhrs-admin-session").digest("hex");

export const adminConfigured = () => Boolean(process.env.ADMIN_PASSWORD);

export async function isAdmin() {
  if (!adminConfigured()) return false;
  const value = (await cookies()).get(COOKIE)?.value;
  return Boolean(value) && timingSafeEqual(sha(value), sha(sessionToken()));
}

export async function requireAdmin() {
  if (!(await isAdmin())) redirect("/admin/login");
}

export async function signIn(password) {
  if (!adminConfigured() || !timingSafeEqual(sha(String(password)), sha(process.env.ADMIN_PASSWORD)))
    return false;
  (await cookies()).set(COOKIE, sessionToken(), {
    httpOnly: true,
    sameSite: "lax",
    secure: process.env.NODE_ENV === "production",
    path: "/admin",
    maxAge: 60 * 60 * 24 * 7,
  });
  return true;
}

export async function signOut() {
  (await cookies()).set(COOKIE, "", { path: "/admin", maxAge: 0 });
}
