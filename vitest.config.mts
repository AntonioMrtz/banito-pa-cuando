import { defineConfig } from "vitest/config";
import react from "@vitejs/plugin-react";
import tsconfigPaths from "vite-tsconfig-paths";
import path from "path";

export default defineConfig({
  plugins: [tsconfigPaths(), react()],
  test: {
    environment: "jsdom",
    coverage: {
      include: ["src/**/*.{ts,tsx,js,jsx}"],
    },
    alias: {
      "server-only": path.resolve(
        __dirname,
        "__tests__/mocks/mock-server-only.ts",
      ),
    },
  },
});
