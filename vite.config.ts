import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";

// GH_PAGES is set by .github/workflows/deploy-pages.yml when building for
// GitHub Pages, since that serves the site from /Website/ instead of /.
export default defineConfig({
  base: process.env.GH_PAGES ? "/Website/" : "/",
  plugins: [react()],
});
