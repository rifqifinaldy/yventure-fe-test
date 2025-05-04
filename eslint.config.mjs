import { dirname } from "path";
import { fileURLToPath } from "url";
import { FlatCompat } from "@eslint/eslintrc";

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

const compat = new FlatCompat({
  baseDirectory: __dirname,
});

const eslintConfig = [
  ...compat.config({
    extends: [
      "next/core-web-vitals",
      "next/typescript",
      "prettier",
      "plugin:jest/recommended",
      "plugin:jest-dom/recommended",
      "plugin:testing-library/react",
      "plugin:@typescript-eslint/recommended",
    ],
    rules: {
      semi: ["error"],
      quotes: ["error", "double"],
      "prefer-arrow-callback": ["error"],
      "prefer-const": ["warn"],
      "no-nested-ternary": "warn",
      "no-unexpected-multiline": "warn",
      "@typescript-eslint/no-unused-vars": "error",
      "@typescript-eslint/no-explicit-any": "warn",
    },
    plugins: ["jest", "testing-library", "jest-dom", "@typescript-eslint"],
  }),
];

export default eslintConfig;
