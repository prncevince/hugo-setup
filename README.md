# Hugo Setup

[![Commitizen friendly](https://img.shields.io/badge/commitizen-friendly-brightgreen.svg)](http://commitizen.github.io/cz-cli/)
[![lerna](https://img.shields.io/badge/maintained%20with-lerna-cc00ff.svg)](https://lerna.js.org/)

A Hugo setup using Lerna & Netlify CMS. This is a monorepo that builds/serves my website.

## Repo

```
|--.git/
|--dist/                // what gets published
|--site/
|  |--.git/
|  |--themes/
|  |  |--theme-1/
|  |  |  |--.git
...
|  |  |--theme-n/
|  |  |  |--.git
|--packages/
|  |--cms/
|  |  |--.git
|  |  |--package.json
|  |--app-1/
|  |  |--.git
|  |  |--package.json
...
|  |--app-n/
|  |  |--.git
|  |  |--package.json
|--.gitmodules
|--lerna.json
|--package.json
```

## Install & Setup 

1. Clone the repo and its submodues:
- `git clone --recurse-submodules git@gitlab.com:prncevince/hugo-setup.git`
2. Install npm packages and setup:
- `npm install`
  - This installs the root repo npm packages.
  - Next, `npm run postinstall` sequentially runs top to bottom the npm scripts:
    - `setup:husky` - sets up husky Git hooks 
    - `setup:repo` installs the Lerna "leaf" packages' `dependencies` & `devDependencies`.
      - The `dependencies` and `devDependencies` shared across packages are ["hoisted"](https://github.com/lerna/lerna/blob/main/doc/hoist.md) using the `--hoist` flag
    - `setup:hooks` & `setup:hooks:site` respectively add the hook path as the root `./.husky/` for all submodules

## Configuring New Submodules 

Typically, this is done with a few manual steps. Instead, we've boiled this down to a single npm script `submodule`.

Replace `app-n` with name of `./packages/app-n` path and `remote` with remote ssh git repository path:
- `npm run submodule --app=app-n --remote=remote` 

### Breakdown

This just documents what the above does.

#### Adds New Submodule to Monorepo

- `submodule:remote` - registers `./packages/app-n` as submodule - clones remote repository to path if it does not exists 
  - `git submodule add git@remote-url.git ./packages/app-n`
- `submodule:absorb` - stores .git/ content of submodule in top level .git/ directory
  - `git submodule absorbgitdirs packages/pkg-submodule`

#### Configures Git Hooks for Submodules

- `submodule:hooks` - This is what `setup:hooks` does - but for a single repo
  - `lerna exec --scope $npm_config_app git config core.hooksPath ../../.husky`

To run manually.
- `npm run submodule:hooks --app=app-n` 

To run even more manually: 
- `cd ./packages/pkg-submodule`
- `git config core.hooksPath ../../.husky`

