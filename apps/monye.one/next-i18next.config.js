const supported = [
    // the first one is a default/fallback language
    "en",
    "cs",
    "cs-CZ",
    "sk",
    "sk-SK",
    "en-US",
    "en-GB",
];

module.exports = {
    i18n: {
        /** "|| en" because compile error for string | undefined */
        defaultLocale: supported[0] || "en",
        locales: supported,
    },
    fallbackLng: supported[0],
    preload: supported,
    lowerCaseLng: true,
    debug: false,
    initImmediate: true,
    keySeparator: false,
    nsSeparator: ":",
    interpolation: {
        prefix: "{",
        suffix: "}",
        escapeValue: false,
    },
    localeStructure: "{lng}/{ns}",
    nonExplicitSupportedLngs: true,
    ns: ["common", "public", "book", "account", "filter", "transaction"],
    supportedLngs: supported,
    detection: {
        order: [
            "querystring",
            "cookie",
            "htmlTag",
            "localStorage",
            "sessionStorage",
            "path",
            "subdomain",
            "navigator",
        ],
    },
};
