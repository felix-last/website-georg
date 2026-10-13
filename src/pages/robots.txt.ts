import type { APIRoute } from "astro";
import { path } from "../lib/paths";

export const GET: APIRoute = ({ site }) => {
  const ready = import.meta.env.PUBLIC_LAUNCH_READY === "true";
  return new Response(
    ready
      ? `User-agent: *\nAllow: /\nSitemap: ${new URL(path("sitemap-index.xml"), site)}\n`
      : "User-agent: *\nDisallow: /\n",
    { headers: { "Content-Type": "text/plain; charset=utf-8" } },
  );
};
