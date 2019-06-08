import { detectIterationsCount, IDetectIterationsCountOptions } from "./helpers/detectIterationAmount";
import { ITest } from "./runTest";

const test: ITest<any> = {
    testDescRef: {
        name: "test 1",
        exec: () => {
            return 1 + 1;
        },
    },
    testEnvRef: {
        isContextReadOnly: true,
        createContext: () => ({}),
    },
};

const options: IDetectIterationsCountOptions = {
    maxTriesCount: 10,
    minIterationsCount: 10,
    minTimeSpentInMs: 1000,
};

console.log(detectIterationsCount(test, options));
console.log(detectIterationsCount(test, options));
console.log(detectIterationsCount(test, options));
console.log(detectIterationsCount(test, options));
console.log(detectIterationsCount(test, options));
