import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";
import { DDC_COOKIE, DDC_TOKEN } from "@/lib/ddc-access";

export function proxy(request: NextRequest) {
  const { pathname } = request.nextUrl;
  if (!pathname.startsWith("/direct-du-chateau")) return NextResponse.next();
  if (pathname === "/direct-du-chateau/acces") return NextResponse.next();
  if (request.cookies.get(DDC_COOKIE)?.value === DDC_TOKEN) return NextResponse.next();

  const url = request.nextUrl.clone();
  url.pathname = "/direct-du-chateau/acces";
  url.search = "";
  url.searchParams.set("next", pathname);
  return NextResponse.redirect(url);
}

export const config = {
  matcher: ["/direct-du-chateau", "/direct-du-chateau/:path*"],
};
