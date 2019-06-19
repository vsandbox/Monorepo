# Monorepo

The first goal is to create monorepo tools to link all typescript projects together.

Try to make it with tsconfig.json's `paths` section. It should be reflected in webpack's `aliases`.


```
/
|-packages/
  |-system/
    |-webpack
    |-monorepo

```