import { defineConfig } from "eslint/config";
import tseslint from "typescript-eslint";
import regexp from "eslint-plugin-regexp";
import security from "eslint-plugin-security";
import prettier from "eslint-config-prettier";

const allSecurityRulesAsErrors = Object.fromEntries(
  Object.keys(security.rules).map((rule) => [`security/${rule}`, "error"]),
);

export default defineConfig([
  {
    ignores: ["dist/**", "out/**", ".vscode-test/**"],
  },
  {
    files: ["**/*.ts"],

    extends: [
      tseslint.configs.strictTypeChecked,
      regexp.configs["flat/recommended"],
      prettier,
    ],

    plugins: { security },

    languageOptions: {
      ecmaVersion: 2022,
      sourceType: "module",
      parserOptions: {
        projectService: true,
        tsconfigRootDir: import.meta.dirname,
      },
    },

    rules: {
      ...allSecurityRulesAsErrors,
      "regexp/no-super-linear-move": "error",
      "security/detect-unsafe-regex": "error",
      "@typescript-eslint/naming-convention": [
        "error",
        {
          selector: "import",
          format: ["camelCase", "PascalCase"],
        },
      ],
      "@typescript-eslint/restrict-template-expressions": [
        "error",
        { allowNumber: true },
      ],
      curly: "error",
      eqeqeq: "error",
    },
  },
]);
