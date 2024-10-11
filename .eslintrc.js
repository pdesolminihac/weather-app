module.exports = {
  env: {
    node: true,
  },
  parserOptions: {
    parser: "@babel/eslint-parser",
    requireConfigFile: false,
  },
  extends: ["plugin:vue/essential", "eslint:recommended"],
  plugins: ["vue"],
};
