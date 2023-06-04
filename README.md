Funny Movies
=====
![build][badge_build]

A Youtube videos sharing apps - as a challenge with rails and react

**🔥 Techstack**:
- [Rails 7][doc_rails] API ([Ruby v3]([doc_ruby])) built with Docker
  - [Pagy][doc_pagy] cursor pagination
  - [devise][doc_devise] jwt auth
  - [Sidekiq 7.1][doc_sidekiq] + [Redis v6][doc_redis]
  - [PostgreSQL v15][doc_psql]
- [React v18][doc_react] with [Gatsby v5][doc_gatsby]
  - [mobx][doc_mobx] state management
  - [framer-motion][doc_motion] for animations
- [End-to-end][doc_e2e] and unit testing covers both API ([rspec][doc_rspec]) and UI ([jest][doc_jest])

**👀 Table of contents**:
* [Development](#development)
  + [Prerequisites](#prerequisites)
  + [Init development](#init-development)
  + [Start development](#start-development)
  + [Testing](#testing)
    - [API unit tests with Rspec](#api-unit-testing)
    - [UI unit tests with Jest](#ui-unit-testing)
    - [E2E tests](#e2e-testing)
* [Troubleshoot](#troubleshoot)
  + [Fix errors installing prerequisites](#fix-errors-installing-prerequisites)
  + [TS cannot find package declaration](#ts-cannot-find-package-declaration)

Development
-----
### Prerequisites
Please ensure these depedencies are installed:
+ **Docker** ([install][dep_docker] + [compose v2][dep_docker_compose]): prefer stable lts version 
  - For macOS, install via [homebrew][dep_docker_hb]
+ **Node v18** Please follow these steps:
  - Install `nvm` via [nvm repo][dep_nvm] (Or [macos][dep_nvm_hb] • [windows][dep_nvm_windows])
  - Install node v18
    ```
    nvm install 18
    nvm use 18
    ```
  - Install `yarn` CLI
    ```
    nvm i -g yarn
    ```
+ For VSCode, tnstall / enable recommended extensions: 
  - `ctrl shift P` (for macOS `cmd shift P`)
  - Click on `Show recommended extensions`

### Init development

To setup necessary environment variables, copy `.env.example` to `.env` and adjust the values as needed, don't forget to provide values into empty variables since they are all **required**.

To installed required dependencies, docker images for development, please use this command:

```
make local_init
```

This command is supposed to be run at the first time only, or after your changes on docker image setup (`api/Dockerfile`) or website dependencies (`website/package.json`)

### Start development

Please run this command to start your development:

```
make local
```

These endpoints will be accessible (changes on source code will be reflected instantly):
- http://localhost:3000 Rails API
- http://localhost:8000 Website UI

### Testing

### API unit testing

To run API unit tests:

```
make api_test
```

API unit tests are written with [rspec][rspec], located in `api/spec` folder.

About the test setup and config, see `api/spec`.

### UI unit testing

To run UI tests:

```
make ui_test
```

UI unit tests are written with [jest][jest], located alongside with tested services, apis or components.

About the test setup and config, see `tests/spec`.

### E2E testing

To run [end-to-end][doc_e2e] tests:

```
make e2e_test
```

E2E tests are written with [jest][jest] and [puppeteer][doc_puppeteer], located in `tests/e2e`.

About the test setup and config, see `tests/e2e/config`.

Troubleshoot
-----
### Fix errors installing prerequisites

Here are some handy troubleshooting references:
- Fix docker installation issues: [docker troubleshooting][dep_docker_ts]
- Fix `nvm` installation issues: [linux](dep_nvm_ts_linux) • [macOS][dep_nvm_ts_macos] • [windows][dep_nvm_ts_windows]

### TS cannot find package declaration

- Ensure the JS package is packed with type declaration, or you need to install `@types/<package-name>`
- Select the right TS version from yarn sdk, `ctrl shift P` (for macOS `cmd shift P`), click `Select Typescript Version...` and select workspace version

-----
Cheers 🍻

[badge_build]: https://github.com/hungluu/challenge-funny-movies/actions/workflows/build.yml/badge.svg

[doc_rspec]: https://rspec.info
[doc_jest]: https://jestjs.io
[doc_puppeteer]: https://pptr.dev
[doc_pagy]: https://ddnexus.github.io/pagy
[doc_devise]: https://github.com/waiting-for-dev/devise-jwt
[doc_rails]: https://guides.rubyonrails.org/7_0_release_notes.html
[doc_ruby]: https://www.ruby-lang.org/en/news/2023/03/30/ruby-3-2-2-released
[doc_sidekiq]: https://github.com/sidekiq/sidekiq
[doc_redis]: https://redis.com/blog/diving-into-redis-6
[doc_psql]: https://www.postgresql.org/docs/release/15.0
[doc_react]: https://react.dev/blog/2022/03/29/react-v18
[doc_gatsby]: https://www.gatsbyjs.com/gatsby-5
[doc_mobx]: https://mobx.js.org/README.html
[doc_e2e]: https://katalon.com/resources-center/blog/end-to-end-e2e-testing
[doc_motion]: https://framer.com/motion

[dep_docker_ts]: https://docs.docker.com/engine/install/troubleshoot
[dep_docker_hb]: https://formulae.brew.sh/formula/docker
[dep_docker]: https://docs.docker.com/engine/install
[dep_docker_compose]: https://docs.docker.com/compose/migrate
[dep_nvm]: https://github.com/nvm-sh/nvm#installing-and-updating
[dep_nvm_hb]: https://formulae.brew.sh/formula/nvm
[dep_nvm_windows]: https://github.com/coreybutler/nvm-windows#installation--upgrades
[dep_nvm_ts_linux]: https://github.com/nvm-sh/nvm#troubleshooting-on-linux
[dep_nvm_ts_macos]: https://github.com/nvm-sh/nvm#troubleshooting-on-macos
[dep_nvm_ts_windows]: https://github.com/coreybutler/nvm-windows/issues
