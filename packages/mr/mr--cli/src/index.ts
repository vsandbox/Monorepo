import { link } from "./link";
import { runWebpack } from "./runWebpack";

console.log("\n\n--------------------------------\nwebpack-man\n--------------------------------\n");

// const actionName = process.argv[2];
const actionName: string = "webpack";

switch (actionName) {
  case "webpack":
    const configurationName = process.argv[3];
    runWebpack(configurationName);
    break;

  case "link":
    link();
    break;

  default:
    console.log(`Action ${actionName} is not found`);
    break;
}

