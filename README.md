Funny Movies
=====
![build][badge_build]

A Youtube videos sharing apps - as a challenge with rails and react

**🔥 Techstack**:
- [Rails 7](https://guides.rubyonrails.org/7_0_release_notes.html) API ([Ruby v3](https://www.ruby-lang.org/en/news/2023/03/30/ruby-3-2-2-released/)) built with Docker
- [Sidekiq 7.1](https://github.com/sidekiq/sidekiq) + [Redis v6](https://redis.com/blog/diving-into-redis-6/) + [PostgreSQL v15](https://www.postgresql.org/docs/release/15.0/)
- [React v18](https://react.dev/blog/2022/03/29/react-v18) with [Gatsby v5](https://www.gatsbyjs.com/gatsby-5), [Mobx](https://mobx.js.org/README.html)

**👀 Table of contents**:
* [Development](#development)
  + [Prerequisites](#prerequisites)
  + [Init development](#init-development)
  + [Start development](#start-development)
  + [Testing](#testing)
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

To run combined tests:

```
make test
```

To run API unit tests:

```
make api_test
```

To run UI tests:

```
make ui_test
```

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
