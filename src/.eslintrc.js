module.exports = {
    "extends": ["eslint:recommended"],
    "plugins": [
        "react"
    ],
    "env": {
        "browser": true,
        "commonjs": true,
        "node": true
    },
    "parser": "babel-eslint",
    "parserOptions": {
        "ecmaVersion": 9,
        "ecmaFeatures": {
            "jsx": true
        },
        "sourceType": "module"
    },
    "rules": {
        "radix": 0,
        "max-len": 0,
        "no-plusplus": 0,
        "global-require": 0,
        "react/prefer-stateless-function": 0,
        "react/no-danger": 0,
        "react/forbid-prop-types": 0,
        'react/no-did-mount-set-state': 0,
        'react/no-unused-prop-types': 0,
        "import/no-dynamic-require": 0,
        "jsx-a11y/no-static-element-interactions": 0,
        "jsx-a11y/anchor-is-valid": [ "error", {
            "components": [ "Link" ],
            "specialLink": [ "hrefLeft", "hrefRight", "to" ],
            "aspects": [ "noHref", "invalidHref", "preferButton" ]
          }]
    }
}; 