import { defineConfig } from "@lovable.dev/vite-tanstack-config";

export default defineConfig({
  tanstackStart: {
    server: { 
      entry: "server" 
    },
  },
  // This tells the underlying Nitro server to build for Vercel Serverless Functions
  nitro: {
    preset: 'vercel'
  }
});
