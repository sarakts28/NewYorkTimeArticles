import js from "@eslint/js";
import globals from "globals";
import tseslint from "typescript-eslint";
import prettier from "eslint-plugin-prettier";
import eslintConfigPrettier from "eslint-config-prettier";

export default tseslint.config(
  {
    ignores: ["dist", "**/*.d.ts"],
  },
  {
    extends: [
      js.configs.recommended,
      ...tseslint.configs.recommended,
      eslintConfigPrettier, // Add this to avoid conflicts between ESLint and Prettier
    ],
    files: ["**/*.{ts,tsx}"],
    languageOptions: {
      ecmaVersion: 2022,
      globals: globals.browser,
    },
    plugins: {
      prettier, // Add the Prettier plugin
    },
    rules: {
      "no-console": "error",
      "max-len": ["error", { code: 100 }],
      "@typescript-eslint/no-unused-vars": "error",
      "@typescript-eslint/no-explicit-any": "off",
      quotes: ["error", "single", { avoidEscape: true }],
      semi: ["error", "always"],
      "prettier/prettier": "error", // Enable Prettier rules
    },
  }
);