# @vladnets/dev--webpack-man
This is a prototype version of webpack manager. It's not flexible and helps me to build `mr` (monorepo tool).
Then, when `mr` is done I would rewrite `webpack-man` to be modular and flexible.

# Algorithm
Input from cmd: `configurationName`.

Find `dev.json` file in current or any parent dir.

Input from `dev.json`: `configurationArray` by `configurationName`.

Find packages listed in `configurationArray` by glob.

Run webpack for found packages, warn about others.

That's all.

