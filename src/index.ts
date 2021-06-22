import fs from 'fs'
import path from 'path'
import prompts from 'prompts'
import minimist from 'minimist'
import chalk from 'chalk'

const args = minimist(process.argv.slice(2))
const cwd = process.cwd()

const templates = ['typescript-starter', 'javascript-starter']

const run = async () => {
  let targetDir = args._[0]

  if (!targetDir) {
    ;({ projectName: targetDir } = await prompts({
      type: 'text',
      name: 'projectName',
      message: 'Project Name',
    }))
  }

  const packageName = targetDir
    .toLowerCase()
    .trim()
    .replace(/\s+/g, '-')
    .replace(/^[._]/, '')
    .replace(/[^a-z0-9-~]+/g, '-')

  const root = path.join(cwd, targetDir)

  if (!fs.existsSync(root)) {
    fs.mkdirSync(root, { recursive: true })
  } else {
    if (fs.readdirSync(root).length)
      throw new Error(`${root} is not a empty directory`)
  }

  if (!fs.existsSync(root)) {
    fs.mkdirSync(root, { recursive: true })
  } else {
    if (fs.readdirSync(root).length)
      throw new Error(`${root} is not a empty directory`)
  }

  let template = args.t || args.template

  if (typeof template === 'string')
    template = templates.includes(template) ? template : null

  if (!template)
    ({ template } = await prompts([
      {
        type: 'select',
        name: 'template',
        message: 'Choose a template',
        choices: templates.map((t) => ({
          value: t,
          title: chalk.cyan(t.replace('-starter', '')),
        })),
      },
    ]))

  const templateDir = path.join(__dirname, '..', `templates`, template)
  const pkgFile = path.join(templateDir, 'package.json')
  const pkgJson = require(pkgFile)
  pkgJson.name = packageName

  console.log(chalk.greenBright(`\n> Scaffolding project in ${root}...`))

  copy(templateDir, root)
  fs.writeFileSync(
    path.join(root, 'package.json'),
    JSON.stringify(pkgJson, null, 2)
  )

  console.log(chalk.cyanBright(`\nDone. Now run:\n`))
  if (root !== cwd)
    console.log(chalk.yellowBright(`> cd ${path.relative(cwd, root)}`))

  console.log(chalk.blueBright(`> npm install`))
  console.log()
}

export = run

function copy(src: string, dest: string) {
  if (fs.statSync(src).isDirectory()) {
    fs.mkdirSync(dest, { recursive: true })

    for (const file of fs.readdirSync(src)) {
      copy(path.join(src, file), path.join(dest, file))
    }
  } else {
    fs.copyFileSync(src, replace_(dest))
  }
}

function replace_(p: string) {
  return p.replace(
    /_gitignore$|_npmignore$|_eslintrc.json$|_prettierrc$/,
    (s) => s.replace('_', '.')
  )
}
