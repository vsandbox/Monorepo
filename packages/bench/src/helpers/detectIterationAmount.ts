import { ITest, ITestResult, runTest } from "../runTest";

export interface IDetectIterationsCountOptions {
    minIterationsCount: number;
    minTimeSpentInMs: number;
    maxTriesCount: number;
};

export const detectIterationsCount = <T>(test: ITest<T>, options: IDetectIterationsCountOptions) => {
    const { minIterationsCount, minTimeSpentInMs, maxTriesCount } = options;

    let iterationCount = minIterationsCount;

    let result: ITestResult;
    let maxTries = maxTriesCount;

    while (maxTries--) {
        result = runTest(test, iterationCount);

        if (result.timeSpentInMs >= minTimeSpentInMs) break;


        const ratio = minTimeSpentInMs / (result.timeSpentInMs | 1);
        iterationCount = Math.floor(iterationCount * ratio);
    }

    return {
        iterationCount,
        timeSpentInMs: result.timeSpentInMs,
    };
};
