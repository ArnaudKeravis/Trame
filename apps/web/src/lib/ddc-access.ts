export const DDC_COOKIE = "ddc-preview";
export const DDC_TOKEN = "250730c99690c62662db2157395a11ad521bb6032d12993bf357371f97b9d5af";

export function safeNext(value: string | undefined) {
  if (!value || !value.startsWith("/direct-du-chateau")) return "/direct-du-chateau";
  if (value.startsWith("//") || value.includes("\\") || value.includes("://")) return "/direct-du-chateau";
  if (value.startsWith("/direct-du-chateau/acces")) return "/direct-du-chateau";
  return value;
}
