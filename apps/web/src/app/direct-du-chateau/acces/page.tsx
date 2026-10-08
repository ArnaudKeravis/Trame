import type { Metadata } from "next";
import { cookies } from "next/headers";
import { redirect } from "next/navigation";
import { Gate } from "../Gate";
import { DDC_COOKIE, DDC_TOKEN, safeNext } from "@/lib/ddc-access";

export const metadata: Metadata = {
  title: "Accès | Direct Du Château",
  robots: { index: false, follow: false },
};

export default async function AccesPage({
  searchParams,
}: {
  searchParams: Promise<{ next?: string }>;
}) {
  const jar = await cookies();
  if (jar.get(DDC_COOKIE)?.value === DDC_TOKEN) redirect("/direct-du-chateau");

  const { next } = await searchParams;
  return <Gate nextPath={safeNext(next)} />;
}
