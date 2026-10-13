import { defineConfig } from "astro/config";
import sitemap from "@astrojs/sitemap";

const site = process.env.SITE_URL || "https://felix-last.github.io";
const base = process.env.BASE_PATH ?? "/website-georg";
const parsedSite = new URL(site);
if (parsedSite.protocol !== "https:") {
  throw new Error("SITE_URL must be an HTTPS origin.");
}
if (parsedSite.pathname !== "/" || parsedSite.search || parsedSite.hash) {
  throw new Error(
    "SITE_URL must contain only the origin; use BASE_PATH for the path.",
  );
}
if (base && (!base.startsWith("/") || base.includes(".."))) {
  throw new Error("BASE_PATH must be empty or an absolute path without '..'.");
}

export default defineConfig({
  site,
  base,
  output: "static",
  devToolbar: { enabled: false },
  trailingSlash: "always",
  integrations: [sitemap()],
});
