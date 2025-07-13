module.exports = {
  extends: [
    "eslint:recommended",
    "plugin:@typescript-eslint/recommended",
    "next",
    "next/core-web-vitals",
    "plugin:react/recommended",
    "plugin:react/jsx-runtime"
  ],
  parser:  "@typescript-eslint/parser",
  plugins: ["@typescript-eslint", "eslint-plugin-import-helpers", "eslint-plugin-import"],
  rules:   {
    // ---------------------------------------------------------------------------------------------
    // Project specific rules [start].
    // ---------------------------------------------------------------------------------------------

    // Don't allow mixed function styles.
    "func-style":             ["error", "expression"],
    "function-paren-newline": ["error", "consistent"],

    "@typescript-eslint/explicit-member-accessibility": ["error", {
      accessibility: "off",
      overrides:     {
        "accessors":           "off",
        "constructors":        "no-public",
        "methods":             "explicit",
        "properties":          "off",
        "parameterProperties": "explicit"
      }
    }],

    "react-hooks/exhaustive-deps": "off",

    // ---------------------------------------------------------------------------------------------
    // Project specific rules [end].
    // ---------------------------------------------------------------------------------------------

    // ---------------------------------------------------------------------------------------------
    // Common Zoön organization rules [start].
    // ---------------------------------------------------------------------------------------------

    // Layout/spacing.
    quotes:                            ["error", "double", { avoidEscape: true }],
    "no-trailing-spaces":              "error",
    "no-multi-spaces":                 "error",
    "block-spacing":                   ["error", "always"],
    "space-before-blocks":             ["error", "always"],
    "keyword-spacing":                 ["error", { before: true, after: true }],
    "space-infix-ops":                 ["error"],
    "brace-style":                     "off",
    "@typescript-eslint/brace-style":  "error",
    "comma-spacing":                   ["error", { before: false, after: true }],
    "object-curly-spacing":            ["error", "always"],
    "arrow-spacing":                   ["error", { before: true, after: true }],
    "no-implicit-coercion":            ["error", { allow: ["!!"] }],
    "comma-dangle":                    ["error", "never"],
    "key-spacing":                     ["error", { align: "value", beforeColon: false }],
    "padding-line-between-statements": [
      "error",
      {
        blankLine: "always",
        next:      "export",
        prev:      "*"
      },
      {
        blankLine: "always",
        next:      "return",
        prev:      "*"
      }
    ],
    "max-len": [
      "warn", 140, {
        ignoreComments:         false,
        ignoreTrailingComments: true,
        ignoreUrls:             true,
        ignorePattern:          "^import [^,]+ from |^export | implements" // ignore import and export statements
      }
    ],

    // Linting.
    "no-console":                   ["error", { allow: ["warn", "error"] }],
    "no-redeclare":                 "error",
    "no-nested-ternary":            "error",
    "no-unneeded-ternary":          "error",
    "import/no-duplicates":         "error",
    "import-helpers/order-imports": [
      "error",
      {
        alphabetize: {
          ignoreCase: true,
          order:      "asc"
        },
        groups: [
          "module",
          ["/^ui/", "/^services/"],
          ["/^@domain/"],
          ["parent", "sibling", "index"]
        ],
        newlinesBetween: "always"
      }
    ],
    "object-shorthand": ["error", "always"],

    // Unix linebreaks.
    "linebreak-style": ["error", "unix"],

    // Semicolons.
    "semi":          "error",
    "no-extra-semi": "error",

    // No useless blank lines.
    "no-multiple-empty-lines": [
      "error", { max: 2, maxBOF: 0, maxEOF: 1 }
    ],
    "eol-last": ["error", "always"],

    // Casing conventions.
    "camelcase":             ["error", { properties: "always", ignoreGlobals: true }],
    "react/jsx-pascal-case": "error",

    // Typescript rules.
    "@typescript-eslint/naming-convention": [
      "error",
      {
        selector: "interface",
        format:   ["PascalCase"]
      }
    ],
    "@typescript-eslint/no-explicit-any":         "error",
    "no-explicit-any":                            "off",
    "no-shadow":                                  "off",
    "@typescript-eslint/no-shadow":               "error",
    "@typescript-eslint/type-annotation-spacing": ["error", {
      before:    true,
      after:     true,
      overrides: { colon: { before: false, after: true } }
    }],
    "@typescript-eslint/space-before-function-paren": [
      "error", {
        named:      "never",
        anonymous:  "never",
        asyncArrow: "always"
      }
    ],

    // Disallow unused variables (except for "_" which has to be configured manually :v)
    "no-unused-vars":                    "off",
    "@typescript-eslint/no-unused-vars": [
      "error",
      { argsIgnorePattern: "_", varsIgnorePattern: "_", caughtErrorsIgnorePattern: "_" }
    ],
    "no-undef": "error",

    // React.
    "react/react-in-jsx-scope":     "off", // not required due typescript compiler settings
    "react/jsx-filename-extension": ["error", { extensions: [".tsx"] }],
    "react/jsx-curly-spacing":      ["error", {
      when: "never", children: { "when": "never" }
    }],
    "react/jsx-indent":                   ["error", 2],
    "react/jsx-indent-props":             ["error", 2],
    "react/jsx-closing-tag-location":     "error",
    "indent":                             "off",
    "@typescript-eslint/indent":          ["error", 2, { ignoredNodes: ["JSXAttribute"] }],
    "react/jsx-closing-bracket-location": ["error", {
      nonEmpty:    "after-props",
      selfClosing: "after-props"
    }]

    // ---------------------------------------------------------------------------------------------
    // Common Zoön organization rules [end].
    // ---------------------------------------------------------------------------------------------
  },
  overrides: [
    {
      "files": ["*.ts"],
      "rules": {
        "@typescript-eslint/explicit-function-return-type": "error"
      }
    },
    {
      "files": ["*.tsx"],
      "rules": {
        "no-undef": "off"
      }
    },
    {
      "files": ["src/presentation/i18n/locales/**/*.ts"],
      "rules": {
        "import/no-anonymous-default-export": "off"
      }
    },
    {
      // Ignore max length for i18n mappings asset files.
      files: ["src/presentation/i18n/locales/**/*.ts"],
      rules: {
        "max-len": "off"
      }
    }
  ]
};
