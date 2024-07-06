// https://github.com/kentcdodds/setup-prettier/blob/main/.prettierrc
/** @type {import("prettier").Config} */
export default {
  plugins: ["prettier-plugin-astro"],
  printWidth: 80,
  tabWidth: 2,
  useTabs: false,
  semi: false,
  singleQuote: true,
  trailingComma: "all",
  bracketSpacing: false,
  jsxBracketSameLine: false,
  proseWrap: "always",
};
