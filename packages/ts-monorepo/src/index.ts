// MR is build on idea of state-based workflow.
// Means any possible action is just a function taking a state and returning new state.
// E.g. If some action could want to add an Error, it just puts it in error array.
// Then, error showing action will show all errors from array.

/**
 * Represents any possible state of application.
 */
interface IMRState {
  errors: {
    // Critical errors, means app can't go further
    critErrorArray: any[];

    // Errors like parsing package config (it could be ignored)
    nonCritErrorArray: any[];
  };

  // Requests to do something on the next app iteration
  requestArray: {
    type: string;
    [key: string]: any;
  }[];
}

//

import fs from "fs";
import path from "path";

export interface IFindFilePathArrayInput {
  rootDirAbsPath: string;
  currentRelPath: string;
  lookingFileName: string;
  breakFileNameArray: string;
}

export interface IFindFilePathArrayResult {
  rootDirAbsPath: string;
  fileRelPathArray: string[];
}

export const deepFindFileRelPathArrayInDir = (options: IFindFilePathArrayInput): Promise<IFindFilePathArrayResult> => {
  const { rootDirAbsPath, currentRelPath, lookingFileName, breakFileNameArray } = options;

  return new Promise((resolve, reject) => {
    const currentAbsPath = path.join(rootDirAbsPath, currentRelPath);

    fs.stat(currentAbsPath, (err, stats) => {
      if (err) {
        reject(err);
      }

      // Working only with directories
      if (!stats.isDirectory()) {
        resolve({
          rootDirAbsPath,
          fileRelPathArray: [],
        });
        return;
      }

      fs.readdir(currentAbsPath, () => {

      });

    });
  });
};

// run x async actions in queued groups by y actions at a time

type TPromiseCreator<T_Input, T_Output> = (input: T_Input) => Promise<T_Output>;
interface IPromiseHandler<T_Input, T_Output> {
  input: T_Input;
  create: TPromiseCreator<T_Input, T_Output>;
  then: (output: T_Output) => void;
  catch: (err: any) => void;
}
class PromiseManager<T_Input, T_Output> {
  private maxActivePromiseCount: number;

  private queuedHandlerArray: IPromiseHandler<T_Input, T_Output>[];
  private activeHandlerArray: IPromiseHandler<T_Input, T_Output>[];

  private addToActive() {}

  public addInQueue(handler: IPromiseHandler<T_Input, T_Output>) {
    if (this.activeHandlerArray.length < this.maxActivePromiseCount) {
      const promise = handler.create(handler.input);

      promise
        .then(handler.then)
        .catch(handler.catch);

      this.activeHandlerArray.push(handler);
    }
    else {
      this.queuedHandlerArray.push(handler);
    }
  }

  public onDone(handler: IPromiseHandler<T_Input, T_Output>) {
    const handlerIndex = this.activeHandlerArray.indexOf(handler);
    this.activeHandlerArray.splice(handlerIndex, 1);

    if (this.queuedHandlerArray.length > 0) {

    }
  }
}
