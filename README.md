# Hugo Setup

[![Commitizen friendly](https://img.shields.io/badge/commitizen-friendly-brightgreen.svg)](http://commitizen.github.io/cz-cli/)
[![lerna](https://img.shields.io/badge/maintained%20with-lerna-cc00ff.svg)](https://lerna.js.org/)

A Hugo setup using Lerna & Netlify CMS. This is a monorepo that builds/serves my website.

## Repo

```
|--.git/
|--dist/                // what gets published
|--site/
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
  - Then, `husky install` sets up husky Git hooks 
  - Then, `lerna bootstrap --hoist` installs the "leaf" packages `dependencies` & `devDependencies`.
    - The `dependencies` and `devDependencies` shared across packages are ["hoisted"](https://github.com/lerna/lerna/blob/main/doc/hoist.md) using the `--hoist` flag
  - Then, `lerna run git config core.hooksPath ../../.husky` adds the hook path as the root `./.husky/` for all submodules

### Add New Submodules 

`git submodule add git@remote-url.git ./packages/pkg-submodule`<br>
`git submodule absorbgitdirs packages/pkg-submodule`

### Configure Git Hooks for Submodules

Set working directory in submodule directory, e.g. `cd ./packages/pkg-submodule`

`git config core.hooksPath ../../.husky`

