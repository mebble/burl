# burl

Break up URLs

## Requirements

- Node.js
- npm or yarn

## Setup

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
