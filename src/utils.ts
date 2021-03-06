import fs from 'fs'
import os from 'os'
import ini from 'ini'
import path from 'path'
import fetch from 'node-fetch'

export const getNameAndEmail = () => {
  try {
    const configPath = path.join(os.homedir(), '.gitconfig')

    if (!fs.existsSync(configPath)) throw new Error()

    const { user } = ini.parse(fs.readFileSync(configPath, 'utf-8'))

    if (!user) throw new Error()

    return {
      name: user.name || '<your-name>',
      email: user.email || '<your-email>',
    }
  } catch (e) {
    return {
      name: '<your-name>',
      email: '<your-email>',
    }
  }
}

export const getGithubUsername = async (email: string) => {
  try {
    const searchUserUrl = `https://api.github.com/search/users?q=${email} in:email`
    const { items } = await fetch(searchUserUrl).then((res) => res.json())

    if (items.length > 0) return items[0].login

    const { version, platform, arch } = process
    const data = await fetch(
      `https://api.github.com/search/commits?q=author-email:${email}&sort=author-date&per-page=1`,
      {
        method: 'GET',
        headers: {
          Accept: 'application/vnd.github.cloak-preview+json',
          'user-agent': `Node.js/${version.substr(1)} (${platform}; ${arch})`,
        },
      }
    )
      .then((res) => res.json())
      .then((res) => res.items[0])

    return data.author.login
  } catch (err) {
    return '<your-username>'
  }
}

export const getReadme = (pkgName: string, username: string) => {
  const npm = `https://npmjs.com/package/${pkgName}`
  const repo = `https://github.com/${username}/${pkgName}`
  const npmIcon = `https://img.shields.io/npm/v/${pkgName}`
  const mitIcon = `https://img.shields.io/badge/license-MIT-blue.svg`
  const workflowIcon = `https://img.shields.io/github/workflow/status/${username}/${pkgName}/CI`
  const prIcon = `https://img.shields.io/badge/PRs-welcome-brightgreen.svg`
  return `
# ${pkgName}

> Starter Generated by \`create-npm-starter\`
  
<a href="${npm}"><img alt="NPM" src="${npmIcon}" /></a>
<a href="${repo}"><img alt="MIT" src="${mitIcon}" /></a>
<a href="#"><img alt="CI" src="${workflowIcon}"></a>
<a href="${repo}"><img src="${prIcon}" alt="PRs welcome!" /></a>
  `.trim()
}
