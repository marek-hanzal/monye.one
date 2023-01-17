module.exports = {
    extends: [
        "eslint:recommended",
        "next",
        "airbnb",
        "airbnb-typescript",
        "prettier",
        "turbo",
        "plugin:@typescript-eslint/eslint-recommended",
        "plugin:@typescript-eslint/recommended",
    ],
    "parser":      "@typescript-eslint/parser",
    parserOptions: {
        project: "./tsconfig.json"
    },
    "plugins":     [
        "@typescript-eslint",
        "eslint-plugin-unicorn"
    ],
    "rules": {
        "import/prefer-default-export":          "off",
        "react/react-in-jsx-scope":              "off",
        "no-console":                            "off",
        "import/extensions":                     "off",
        "arrow-body-style":                      "off",
        "react/jsx-curly-brace-presence":        "off",
        "react/jsx-props-no-spreading":          "off",
        "react/function-component-definition":   "off",
        "no-underscore-dangle":                  "off",
        "class-methods-use-this":                "off",
        "@typescript-eslint/no-empty-interface": "off",
        "react-hooks/exhaustive-deps":           "off",
        "no-unused-vars":                        "off",
        "no-html-link-for-pages": "off"
    }
};
