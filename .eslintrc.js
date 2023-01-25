module.exports = {
  env: {
    browser: true,
    es2021: true,
  },
  extends: ["plugin:react/recommended", "standard-with-typescript", "prettier"],
  overrides: [],
  parser: "@typescript-eslint/parser",
  parserOptions: {
    ecmaFeatures: {
      jsx: true,

    },
    ecmaVersion: "latest",
    sourceType: "module",
    tsconfigRootDir: __dirname,
    project: ["./tsconfig.json"],
  },
  plugins: ["react", "@typescript-eslint"],
  ignorePatterns: ["build"],
  rules: {
    "import/extensions": [
      //importのときに以下の拡張子を記述しなくてもエラーにしない
      "error",
      {
        js: "never",
        jsx: "never",
        ts: "never",
        tsx: "never",
      },
    ],
    "react/jsx-filename-extension": [
      //jsx形式のファイル拡張子をjsxもしくはtsxに限定
      "error",
      {
        extensions: [".jsx", ".tsx"],
      },
    ],
    "react/react-in-jsx-scope": "off", //import React from 'react'が無くてもエラーを無くす
    "react/prop-types": "off", //TypeScriptでチェックしているから不要。offにする
    "no-void": [
      //void演算子の許可
      "error",
      {
        allowAsStatement: true,
      },
    ],
  },
  settings: {
    "import/resolver": {
      //importするファイルをjsだけではなく、tsを含むファイルを許可する
      node: {
        paths: ["src"],
        extensions: [".js", ".jsx", ".ts", ".tsx"],
      },
    },
  },
};
