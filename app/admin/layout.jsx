import Link from "next/link";
import { isAdmin } from "@/lib/admin-auth";
import { logout } from "./actions";

export const metadata = { title: "Admin", robots: { index: false, follow: false } };
export const dynamic = "force-dynamic";

export default async function AdminLayout({ children }) {
  const signedIn = await isAdmin();
  return (
    <div className="admin page--light">
      <header className="admin__bar">
        <strong className="admin__brand">AFTERHRS · Admin</strong>
        {signedIn && (
          <nav className="admin__nav">
            <Link href="/admin">Orders</Link>
            <Link href="/admin/products">Stock & products</Link>
            <Link href="/" target="_blank">
              View site
            </Link>
            <form action={logout}>
              <button type="submit" className="textbtn">
                Sign out
              </button>
            </form>
          </nav>
        )}
      </header>
      <main className="admin__main">{children}</main>
    </div>
  );
}
