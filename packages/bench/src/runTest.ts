export interface ITestDesc<T> {
    name: string;
    exec: (context: T) => any;
}

export interface ITestEnv<T> {
    isContextReadOnly: boolean;
    createContext: () => T;
}

export interface ITestResult {
    iterations: number;
    timeSpentInMs: number;
}

export interface ITest<T> {
    testDescRef: ITestDesc<T>;
    testEnvRef: ITestEnv<T>;
}

export const runTest = <T>(test: ITest<T>, iterations: number): ITestResult => {
    const { testDescRef, testEnvRef } = test;
    const { exec } = testDescRef;
    const { createContext, isContextReadOnly } = testEnvRef;

    let startTimestamp: number;
    let iterationsLeft = iterations;

    if (isContextReadOnly) {
        const context = createContext();
        startTimestamp = Date.now();
        while(iterationsLeft--) {
            exec(context);
        }
    }
    else {
        startTimestamp = Date.now();
        while(iterationsLeft--) {
            const context = createContext();
            exec(context);
        }
    }

    const endTimestamp = Date.now();
    const timeSpentInMs = endTimestamp - startTimestamp;

    const result: ITestResult = {
        iterations,
        timeSpentInMs,
    };

    return result;
};
