export interface ITestResult {
    iterations: number;
    timeSpentInMs: number;
}

export type TTestFn<T> = (context: T) => any;

export interface ITest<T> {
    exec: TTestFn<T>;
    timer: ITimer;
    getContext: () => T;
}

export interface ITimer {
    reset(): void;
    destroy(): void;
    getTimeInMs(): number;
}

export class Timer implements ITimer {
    private bigStartTimeInNs: bigint;

    public reset(): void {
        this.bigStartTimeInNs = process.hrtime.bigint();
    }

    public destroy(): void {
        this.bigStartTimeInNs = null;
    }

    public getTimeInMs() {
        const bigCurrentTimeInNs = process.hrtime.bigint();
        const bigDiffTimeInNs = bigCurrentTimeInNs - this.bigStartTimeInNs;
        const diffTimeInNs = Number(bigDiffTimeInNs);
        const diffTimeInMs = diffTimeInNs / 1000000;

        return diffTimeInMs;
    };
}

export const runTest = <T>(test: ITest<T>, iterations: number): ITestResult => {
    let iterationsLeft = iterations;

    test.timer.reset();
    const startTimeInMs = test.timer.getTimeInMs();

    while (iterationsLeft--) {
        const context = test.getContext();
        test.exec(context);
    }

    const endTimeInMs = test.timer.getTimeInMs();
    const timeSpentInMs = endTimeInMs - startTimeInMs;

    return {
        iterations,
        timeSpentInMs,
    };
}

const test: ITest<number> = {
    exec(context: number) {
        return context * 100;
    },
    getContext() {
        return 10;
    },
    timer: new Timer(),
};

const result = runTest(test, 20000);
console.log("result", result);
