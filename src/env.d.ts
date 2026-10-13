/// <reference types="astro/client" />

interface ImportMetaEnv {
  readonly PUBLIC_CONTACT_ENDPOINT?: string;
  readonly PUBLIC_TURNSTILE_SITE_KEY?: string;
  readonly PUBLIC_LAUNCH_READY?: string;
}

interface ImportMeta {
  readonly env: ImportMetaEnv;
}
