import { SiteChrome } from "@/components/clients/direct-du-chateau/SiteChrome";

export default function DirectDuChateauSiteLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return <SiteChrome>{children}</SiteChrome>;
}
