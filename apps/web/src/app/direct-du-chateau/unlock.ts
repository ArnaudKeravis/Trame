"use server";

import { createHash, timingSafeEqual } from "node:crypto";
import { cookies } from "next/headers";
import { redirect } from "next/navigation";
import { DDC_COOKIE, DDC_TOKEN, safeNext } from "@/lib/ddc-access";

const PASSWORD = "directduchateau";

function passwordMatches(input: string) {
  const given = createHash("sha256").update(`ddc-preview:${input}`).digest();
  const expected = createHash("sha256").update(`ddc-preview:${PASSWORD}`).digest();
  return timingSafeEqual(given, expected);
}

export async function unlock(_previous: { error: string }, formData: FormData) {
  const password = String(formData.get("password") ?? "");
  if (!passwordMatches(password)) {
    return { error: "Mot de passe incorrect." };
  }

  const jar = await cookies();
  jar.set(DDC_COOKIE, DDC_TOKEN, {
    httpOnly: true,
    sameSite: "lax",
    secure: process.env.NODE_ENV === "production",
    path: "/direct-du-chateau",
    maxAge: 60 * 60 * 24 * 30,
  });

  redirect(safeNext(String(formData.get("next") ?? "")));
}
