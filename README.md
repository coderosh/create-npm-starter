# create-npm-starter

> Generate boilerplate for your npm package.

## Features

- Test with `jest`
- Lint with `eslint`
- Format with `prettier`
- Github actions CI
- Git hooks with `yorkie`

## Usage

```sh
# with npm
npm init npm-starter

# with yarn
yarn create npm-starter
```

And follow the prompts.

Or simply pass the project name and template.

```sh
# with npm
npm init npm-starter my-project -- --template typescript-starter

# with yarn
npm create npm-starter my-project --template typescript-starter
```

## Available templates

- javascript-starter
- typescript-starter
