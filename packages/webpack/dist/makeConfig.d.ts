import { Configuration } from "webpack";
export interface IMakeConfigEnv {
    workingDir: string;
}
export declare const makeConfig: (env: IMakeConfigEnv, userConfig: Configuration) => Configuration;
