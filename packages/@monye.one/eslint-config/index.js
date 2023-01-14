module.exports = {
    extends:       [
        "next",
        "airbnb",
        "airbnb-typescript",
        "prettier",
        "turbo",
    ],
    parserOptions: {
        project: "./tsconfig.json"
    },
    "rules":       {
        "import/prefer-default-export":        "off",
        "react/react-in-jsx-scope":            "off",
        "no-console":                          "off",
        "import/extensions":                   "off",
        "arrow-body-style":                    "off",
        "react/jsx-curly-brace-presence":      "off",
        "react/jsx-props-no-spreading":        "off",
        "react/function-component-definition": "off",
        "no-underscore-dangle":                "off",
    }
};
