// @ts-check

import eslint from "@eslint/js";
import tseslint from "typescript-eslint";

export default tseslint.config({
  // @ts-ignore
  languageOptions: {
    parserOptions: {
      project: true,
      tsconfigTootDir: import.meta.dirname,
    },
  },
  files: ["**/*.ts"],
  extends: [eslint.configs.recommended, ...tseslint.configs.recommended],
  rules: {
    "no-console": "error",
    quotes: ["error", "single", { allowTemplateLiterals: true }],
  },
});
