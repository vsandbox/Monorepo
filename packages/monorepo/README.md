# @vladnets/monorepo

The tool to manage monorepo.

- Link packages in monorepo to each other if needed before node modules installation
- Pack a package to orphan branch with tags for versions
- A simple server allowing to map requests like `localhost:8002/package-name@~1.0.0` to local or github with semver resolution
- Install shared node_modules in a root dir