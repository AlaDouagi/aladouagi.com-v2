import { defineConfig } from "astro/config";
import vercel from '@astrojs/vercel/static';

// https://astro.build/config
export default defineConfig({
  publicDir: "./public",
  trailingSlash: "never",
  output: "static",
  adapter: vercel(),
});
