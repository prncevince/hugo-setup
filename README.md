# Hugo Setup

[![Commitizen friendly](https://img.shields.io/badge/commitizen-friendly-brightgreen.svg)](http://commitizen.github.io/cz-cli/)
[![lerna](https://img.shields.io/badge/maintained%20with-lerna-cc00ff.svg)](https://lerna.js.org/)

A Hugo setup using Lerna & Netlify CMS. This is a monorepo that builds/servers my website.

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
|  |--app-1/
|  |  |--.git
...
|  |--app-n/
|  |  |--.git
|--.gitmodules
|--lerna.json
|--package.json
```

## Install & Setup 

Clone the repo and `npm install`. 

### Add New Submodules 

`git submodule add git@remote-url.git ./packages/pkg-submodule`
`git submodule absorbgitdirs packages/pkg-submodule`

### Configure Git Hooks for Submodules

Set working directory in submodule directory, e.g. `cd ./packages/pkg-submodule`

`git config core.hooksPath ../../.husky`

