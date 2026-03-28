import js from "@eslint/js";
import ts from "typescript-eslint";
import vue from "eslint-plugin-vue";
import prettier from "eslint-plugin-prettier";
import prettierConfig from "eslint-config-prettier";

export default [
  // 内置规则
  js.configs.recommended,

  // TS 规则
  ...ts.configs.recommended,

  // Vue3 规则
  ...vue.configs["flat/recommended"],

  // Prettier（放最后，不冲突）
  prettierConfig,
  {
    plugins: { prettier },
    rules: {
      "prettier/prettier": [
        "error",
        {
          semi: false,
          singleQuote: true,
          trailingComma: "es5",
          printWidth: 120,
          tabWidth: 2,
          endOfLine: "auto",
          arrowParens: "avoid",
        },
      ],
    },
  },

  {
    // 忽略文件（代替 .eslintignore）
    ignores: [
      "node_modules/",
      "dist/",
      "build/",
      "public/",
      "*.config.js",
      "*.config.ts",
      ".vscode/",
      ".DS_Store",
    ],
  },

  {
    files: ["**/*.vue", "**/*.ts", "**/*.js"],
    languageOptions: {
      ecmaVersion: "latest",
      sourceType: "module",
    },
    rules: {
      // 通用
      "no-console": process.env.NODE_ENV === "production" ? "warn" : "off",
      "no-debugger": process.env.NODE_ENV === "production" ? "warn" : "off",
      "no-unused-vars": "off",
      "@typescript-eslint/no-unused-vars": [
        "error",
        { argsIgnorePattern: "^_" },
      ],

      // Vue 宽松实用
      "vue/multi-word-component-names": "off",
      "vue/require-default-prop": "off",
      "vue/prop-name-casing": ["error", "camelCase"],
    },
  },
];
