# ESLint Configuration with Prettier Integration

This guide provides step-by-step instructions on setting up ESLint with Prettier integration for consistent code linting and formatting in your JavaScript/TypeScript projects.

## Prerequisites

Make sure you have Node.js and npm installed on your machine. If not, you can download and install them from https://nodejs.org/.  
The node version we will be using for this configuration is _20.10.0_

### Step 1: Initialize Your Project

```bash
npm init -y
```

### Step 2: Install __ESLint__

`npx eslint --init`

You will be asked a variety of questions as follows:
> Need to install the following packages:  
> @eslint/create-config@0.4.6  
> Ok to proceed? (y) __y__  
> √ How would you like to use ESLint? · __style__  
> √ What type of modules does your project use? · __esm__  
> √ Which framework does your project use? · __react__  
> √ Does your project use TypeScript? · __No__ / Yes  
> √ Where does your code run? · __browser, node__  
> √ How would you like to define a style for your project? · __guide__  
> √ Which style guide do you want to follow? · __standard__  
> √ What format do you want your config file to be in? · __JSON__  
> Checking peerDependencies of eslint-config-standard@latest  
> The config that you've selected requires the following dependencies:  
> eslint-plugin-react@latest eslint-config-standard@latest eslint@^8.0.1 eslint-plugin-import@^2.25.2 eslint-plugin-n@^15.0.0 || ^16.0.0  eslint-plugin-promise@^6.0.0  
> √ Would you like to install them now? · No / __Yes__  
> √ Which package manager do you want to use? · __npm__   
> Installing eslint-plugin-react@latest, eslint-config-standard@latest, eslint@^8.0.1, eslint-plugin-import@^2.25.2, eslint-plugin-n@^15.0.0 || ^16.0.0 , eslint-plugin-promise@^6.0.0  

### Step 3: Generated `.eslintrc.json`

```json
{
    "env": {
        "browser": true,
        "node": true,
        "es2021": true
    },
    "extends": [
        "standard",
    ],
    "parserOptions": {
        "ecmaVersion": "latest",
        "sourceType": "module"
    },
    "plugins": [
        "react"
    ],
}
```

### Step 4: Install __Prettier__

Install Prettier module as follows:

`npm install Prettier --save-dev`

### Step 5: Install dependencies for ESlint to work with Prettier

```bash
npx install-peerdeps eslint-config-prettier --dev
npx install-peerdeps eslint-plugin-prettier --dev
```

### Step 6: Install ESLint extension for VS Code
<!-- ![ESLint extension](ESLint_extension.jpg) -->
<img src="https://raw.githubusercontent.com/24adithya/JavaScript30/master/ESLint_extension.JPG" alt="ESLint extension" width="500" height="200">


### Step 7: Update `.eslintrc.json` with Prettier rules

```json
{
    "extends": [
        "eslint:recommended",
        "plugin:prettier/recommended" //Extend Prettier settings
    ],
    "plugins": [
        "react",
        "prettier", //Add prettier plugin
    ],
    "rules": {
        "prettier/prettier": [ //Add following rules as per your requirement
            "error",
            {
                "singleQuote": true,
                "endOfLine": "auto",
                "tabWidth": 2,
                "trailingComma": "none"
            }
        ],
        "no-console": "off", //switch to warn for production
        "no-unused-vars": "warn"
    },
    "globals": { //Optional in case you don't have console statements
        "console": true
    },  
}
```

### Step 8: VS Code Settings

Update your VS Code settings _settings.json_ to enable ESLint and Prettier integration.

```json
{
  "editor.formatOnSave": false,
  // tell the ESLint plugin to run on save
  "editor.codeActionsOnSave": {
    "source.fixAll.eslint": "explicit"
  },
  "eslint.format.enable": true,
  "files.eol": "\n",
  // turn it off for JS and JSX, we will do this via eslint
  "[javascript][javascriptreact][typescript][typescriptreact]": {
    "editor.formatOnSave": false
  }
}
```

### Restart VS Code for the changes to take place

### Step 9: Create NPM Scripts

In your `package.json` file, add NPM scripts for linting and fixing:

```json
"scripts": {
  "lint": "eslint .",
  "lint:fix": "eslint . --fix"
}
```

### Step 10: Run ESLint

```bash
npm run lint
```

### Step 11: Auto-Fix ESLint Issues

```bash
npm run lint:fix
```

or you can run 

```bash
npx eslint . --fix
```

These steps will configure ESLint with Prettier in your project, ensuring consistent code formatting and style enforcement. Customize the configurations based on your project's specific needs.

### Step 12: ESLint settings for HTML files

Install `html-eslint` plugin

`npm install --save-dev eslint @html-eslint/parser @html-eslint/eslint-plugin`

### Step 13: Update `.eslintrc.json` file

```json
{
    "plugins": [
        "react",
        "prettier",
        "@html-eslint" //Added HTML lint plugin
    ],
    "overrides": [
        {
            "files": [
                "*.html"
            ],
            "parser": "@html-eslint/parser", //Added HTML parser 
            "extends": [
                "plugin:@html-eslint/recommended" //Extend HTML parser
            ]
        }
    ]
}
```

### Step 14: Update VS Code settings.json

Add the following:

```json
"eslint.validate": [
    "javascript", // ...
    "html" // Add "html" to enable linting `.html` files.
]
```

### Restart VS Code again for the changes to take place

### Full `.eslintrc.json`

```json
{
    "env": {
        "browser": true,
        "node": true,
        "es2021": true
    },
    "extends": [
        "eslint:recommended",
        "plugin:prettier/recommended"
    ],
    "parserOptions": {
        "ecmaVersion": "latest",
        "sourceType": "module"
    },
    "plugins": [
        "react",
        "prettier",
        "@html-eslint"
    ],
    "rules": {
        "prettier/prettier": [
            "error",
            {
                "singleQuote": true,
                "endOfLine": "auto",
                "tabWidth": 2,
                "trailingComma": "none"
            }
        ],
        "no-console": "off",
        "no-unused-vars": "warn"
    },
    "globals": {
        "console": true
    },
    "overrides": [
        {
            "files": [
                "*.html"
            ],
            "parser": "@html-eslint/parser",
            "extends": [
                "plugin:@html-eslint/recommended"
            ]
        }
    ]
}
```

### References and Credits

[HTML ESLint parser](https://html-eslint.org/docs/getting-started)  
[ESLint](https://eslint.org/)  
[Prettier](https://prettier.io/)  
[WEBSOS ESLint Config](https://github.com/wesbos/eslint-config-wesbos)  
