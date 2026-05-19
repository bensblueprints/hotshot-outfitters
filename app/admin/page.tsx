import type { Metadata } from "next";
import { headers, cookies } from "next/headers";
import { redirect } from "next/navigation";
import { listBookings } from "@/lib/bookings";
import { isAuthed } from "@/lib/admin-auth";
import { AdminDashboard } from "./AdminDashboard";

export const dynamic = "force-dynamic";

export const metadata: Metadata = {
  title: "Bookings Admin",
  robots: { index: false, follow: false },
};

export default async function AdminPage() {
  const cookieStore = await cookies();
  const cookieHeader = cookieStore
    .getAll()
    .map((c) => `${c.name}=${c.value}`)
    .join("; ");

  if (!isAuthed(cookieHeader)) {
    redirect("/admin/login");
  }

  const bookings = await listBookings(500);
  return <AdminDashboard initialBookings={bookings} />;
}
