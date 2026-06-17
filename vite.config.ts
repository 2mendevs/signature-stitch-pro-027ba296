import { defineConfig } from "@tanstack/react-start/config";

export default defineConfig({
  start: {
    server: {
      preset: "vercel",
    },
  },
});
