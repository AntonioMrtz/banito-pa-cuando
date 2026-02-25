import { defineConfig, globalIgnores } from "eslint/config";
import nextVitals from "eslint-config-next/core-web-vitals";
import nextTs from "eslint-config-next/typescript";
// plugins imported to reference their exported configs
import vitestPlugin from "eslint-plugin-vitest";
import cypressPlugin from "eslint-plugin-cypress";

const eslintConfig = defineConfig([
  ...nextVitals,
  ...nextTs,
  {
    plugins: {
      vitest: vitestPlugin,
      cypress: cypressPlugin,
    },
  },
  {
    files: ["/__tests__/**/*.{ts,tsx,js,jsx}"],
    extends: [vitestPlugin.configs.recommended],
    rules: {
      "react-hooks/exhaustive-deps": "error",
      "react-hooks/rules-of-hooks": "error",
    },
  },
  {
    files: [
      "cypress/**/*.ts",
      "cypress/**/*.tsx",
      "cypress/**/*.js",
      "cypress/**/*.jsx",
    ],
    extends: [cypressPlugin.configs.recommended],
  },

  // Override default ignores of eslint-config-next.
  globalIgnores([
    // Default ignores of eslint-config-next:
    ".next/**",
    "out/**",
    "build/**",
    "next-env.d.ts",
  ]),
]);

export default eslintConfig;
