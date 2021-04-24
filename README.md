# burl

[![CI Status](https://github.com/mebble/burl/workflows/CI/badge.svg)](https://github.com/mebble/burl/actions)
[![Netlify Status](https://api.netlify.com/api/v1/badges/c59c4fa2-64e4-46e8-a0dc-ebd07896475b/deploy-status)](https://app.netlify.com/sites/burl/deploys)

Break up URLs at [burl.bar](https://burl.bar/)

## Usage

Open the app with a blank URL:

[https://burl.bar](https://burl.bar/)

Open the app with some given URL:

[https://burl.bar/?u=https://www.reddit.com/r/aww/comments/mtv5a3/this_german_shepherd_is_well_known_in_her/?utm_source=share&utm_medium=web2x&context=3](https://burl.bar/?u=https://www.reddit.com/r/aww/comments/mtv5a3/this_german_shepherd_is_well_known_in_her/?utm_source=share&utm_medium=web2x&context=3)

## Dev Requirements

- Node.js
- npm or yarn

## Dev Setup

Clone the project, `cd` into the project's root directory and install the project's dependencies

```bash
cd burl
yarn install  # or npm install
```

## Testing

Run the application in development mode

```bash
# with npm
npm run dev

# with yarn
yarn dev
```

In another terminal window, open the Cypress runner

```bash
# with npm
npm run cypress:open

# with yarn
yarn cypress:open
```

In the Cypress runner, select the test file you want to run. This test will be run in a Cypress-controlled browser. Then as you update your tests and the corresponding application code, you can re-run the tests from the Cypress browser.

Before committing your code, run all the tests of the application

```bash
# with npm
npm run cypress:run

# with yarn
yarn cypress:run
```

## TODOs

- Critical
    - a11y & keyboard navigation
    - Handle url encoding

- Bonus
    - Dark/light theme
    - i18n and l10n
    - SEO

## References

- URL structure: https://en.wikipedia.org/wiki/URL#Syntax
