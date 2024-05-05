module.exports = {
  env: {
    browser: true,
    es2021: true,
  },
  extends: [
    "eslint:recommended",
    "plugin:@typescript-eslint/recommended",
    "plugin:react/recommended",
    "plugin:prettier/recommended",
  ],
  overrides: [
    {
      env: {
        node: true,
      },
      files: [".eslintrc.{js,cjs}"],
      parserOptions: {
        sourceType: "script",
      },
    },
  ],
  parser: "@typescript-eslint/parser",
  parserOptions: {
    ecmaVersion: "latest",
    sourceType: "module",
  },
  plugins: ["@typescript-eslint", "react"],
  rules: {
    "space-before-function-paren": [
      "error",
      { anonymous: "always", named: "never" },
    ],
    "multiline-ternary": ["off"],
    // quotes: [
    //   "error",
    //   "double",
    //   {
    //     allowTemplateLiterals: true,
    //     avoidEscape: true,
    //   },
    // ],
    "prettier/prettier": [
      "warn",
      {
        endOfLine: "auto",
      },
    ],
    "@typescript-eslint/no-explicit-any": ["off"],
  },
};

// https://www.youtube.com/watch?v=lTeza7Vxo8c&t=1s настройка eslinit и  prettier
