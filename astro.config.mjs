import { defineConfig } from "astro/config";

import tailwind from "@astrojs/tailwind";
import react from "@astrojs/react";

import postcssConfig from "./postcss.config.js";

// https://astro.build/config
export default defineConfig({
  site: "https://tudoehpureza.github.io",
  base: "/front-domains",
  integrations: [tailwind(), react()],
  build: {
    postcss: postcssConfig,
  },
});
