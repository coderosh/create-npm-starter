import { getReadme } from '../src/utils'

describe('getReadme function', () => {
  it('should return markdown', () => {
    expect(getReadme('random-pkg-name', 'coderosh')).toMatchInlineSnapshot(`
"# random-pkg-name

> Starter Generated by \`create-npm-starter\`
  
<a href=\\"https://npmjs.com/package/random-pkg-name\\"><img alt=\\"NPM\\" src=\\"https://img.shields.io/npm/v/random-pkg-name\\" /></a>
<a href=\\"https://github.com/coderosh/random-pkg-name\\"><img alt=\\"MIT\\" src=\\"https://img.shields.io/badge/license-MIT-blue.svg\\" /></a>
<a href=\\"#\\"><img alt=\\"CI\\" src=\\"https://img.shields.io/github/workflow/status/coderosh/random-pkg-name/CI\\"></a>
<a href=\\"https://github.com/coderosh/random-pkg-name\\"><img src=\\"https://img.shields.io/badge/PRs-welcome-brightgreen.svg\\" alt=\\"PRs welcome!\\" /></a>"
`)
  })
})
