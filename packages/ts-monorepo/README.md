# ts-monorepo

# How-to
Seems tsconfig aliases doesn't work properly in VSCode. So we need to link packages to achieve the goal.

pkgA
  pkgB (link pkgA)
    pkgC (link pkgB)

mr link --ignore-version

Monorepo tools for typescript projects.

Monorepo should be able to do:
- Run multiple project building in parallel

It's a multi-monorepos tool. Place a `monorepo.json` file in the monorepo root. There are could be any number of monorepo roots.

# Monorepo Server

Monorepo listens to the certain port to perform actions.

`localhost:6666/start monorepoId`
`localhost:6666/stop monorepoId`
