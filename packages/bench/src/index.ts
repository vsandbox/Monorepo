interface ITestChunkResult {
    timeSpentInMs: number;
    iterations: number;
}

interface ITestState {
    chunkResults: ITestChunkResult[];
}

interface ITestDesc<T> {
    id: string;
    exec: (context: T) => any;
}

interface ITestEnv<T> {
    minDurationInMs: number;
    iterationsPerChunk: number;
    lagRatio: number;
    createContext: () => T;
}

interface ITest<T> {
    testEnvRef: ITestEnv<T>;
    testDescRef: ITestDesc<T>;
    testState: ITestState;
}

const runTest = <T>(test: ITest<T>): ITest<T> => {
    const { testEnvRef, testDescRef, testState } = test;

    let chunkCount = 0;
    let timeSpentInMs = 0;
    let chunkResults: ITestChunkResult[] = [];

    while (true) {

        let iterationsLeft = testEnvRef.iterationsPerChunk;

        const startTimestamp = Date.now();
        while(iterationsLeft--) {
            const context = testEnvRef.createContext();
            testDescRef.exec(context);
        }
        const endTimestamp = Date.now();

        if (chunkCount !== 0) {
            const timeSpentOnChunkInMs = endTimestamp - startTimestamp;

            timeSpentInMs += timeSpentOnChunkInMs;

            const chunkResult: ITestChunkResult = {
                iterations: testEnvRef.iterationsPerChunk,
                timeSpentInMs: timeSpentOnChunkInMs
            };


            chunkResults = [...chunkResults, chunkResult];
        }

        chunkCount += 1;
        if (timeSpentInMs >= testEnvRef.minDurationInMs) break;
    }

    let minTimeSpentPerChunkInMs = chunkResults[0].timeSpentInMs;
    let maxTimeSpentPerChunkInMs = chunkResults[0].timeSpentInMs;
    chunkResults.forEach(chunkResult => {
        if (chunkResult.timeSpentInMs < minTimeSpentPerChunkInMs) {
            minTimeSpentPerChunkInMs = chunkResult.timeSpentInMs;
        }
        else {

        }
    });

    const updatedTestState: ITestState = {
        chunkResults,
    };

    const updatedTest: ITest<T> = {
        testEnvRef,
        testDescRef,
        testState: updatedTestState,
    };

    return updatedTest;
};

const test = runTest({
    testDescRef: {
        id: "test",
        exec: (context) => {
            const a = 10;
            const b = Math.floor(0.123123123) * Math.random() * 1000;

            let sum = Math.pow(a + b, a + b) * Math.max(a, b);
            sum = context.array.reduce((acc, value) => acc + value, 0);

            return sum;
        },
    },
    testEnvRef: {
        iterationsPerChunk: 1000,
        minDurationInMs: 1000,
        lagRatio: 1.5,
        createContext: () => {
            return {
                hash: {},
                array: new Array<number>(10000).fill(1),
            };
        },
    },
    testState: {
        chunkResults: [],
    },
});
console.log("test", test.testState.chunkResults);

