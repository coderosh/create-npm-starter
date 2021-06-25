# create-npm-starter

> Generate boilerplate for your npm package.

<a href="https://www.npmjs.com/package/create-npm-starter"><img alt="NPM" src="https://img.shields.io/npm/v/create-npm-starter" /></a>
<a href="https://github.com/coderosh/create-npm-starter"><img alt="MIT" src="https://img.shields.io/badge/license-MIT-blue.svg" /></a>
<a href="#"><img alt="CI" src="https://img.shields.io/github/workflow/status/coderosh/create-npm-starter/CI"></a>
<a href="https://github.com/coderosh/create-npm-starter"><img src="https://img.shields.io/badge/PRs-welcome-brightgreen.svg" alt="PRs welcome!" /></a>
<a href="https://github.com/coderosh/create-npm-starter"><img src="https://img.shields.io/badge/types-typescript-blue.svg" alt="Typescript" /></a>

## Features

- Test with `jest`
- Lint with `eslint`
- Format with `prettier`
- CI with `github actions`
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
