module.exports = [
  {
    "entry": {
      "index": "D:\\JS\\Monorepo\\packages\\test\\client\\src\\index.ts"
    },
    "output": {
      "filename": "[name].js",
      "path": "D:\\JS\\Monorepo\\packages\\test\\client\\dist",
      "library": "_vladnets_test__client",
      "libraryTarget": "umd"
    },
    "target": "node",
    "mode": "development",
    "devtool": "inline-source-map",
    "module": {
      "rules": [
        {
          "test": {},
          "use": [
            {
              "loader": "ts-loader",
              "options": {
                "compilerOptions": {
                  "outDir": "D:\\JS\\Monorepo\\packages\\test\\client\\dist"
                }
              }
            }
          ],
          "exclude": {}
        }
      ]
    },
    "resolve": {
      "extensions": [
        ".ts",
        ".js"
      ]
    }
  },
  {
    "entry": {
      "index": "D:\\JS\\Monorepo\\packages\\test\\server\\src\\index.ts"
    },
    "output": {
      "filename": "[name].js",
      "path": "D:\\JS\\Monorepo\\packages\\test\\server\\dist",
      "library": "_vladnets_test__server",
      "libraryTarget": "umd"
    },
    "target": "node",
    "mode": "development",
    "devtool": "inline-source-map",
    "module": {
      "rules": [
        {
          "test": {},
          "use": [
            {
              "loader": "ts-loader",
              "options": {
                "compilerOptions": {
                  "outDir": "D:\\JS\\Monorepo\\packages\\test\\server\\dist"
                }
              }
            }
          ],
          "exclude": {}
        }
      ]
    },
    "resolve": {
      "extensions": [
        ".ts",
        ".js"
      ]
    }
  }
]