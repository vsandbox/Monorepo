export interface IBenchmarkCase<T> {
    name: string;
    execute: (context: T) => void;
}

export interface IBenchmark<T> {
    name: string;
    cases: IBenchmarkCase<T>[];
    // context for each case
    createContext: () => T;
}

export interface IBenchmarkCaseResult {
    name: string;
    ops: number;
}

export interface IBenchmarkResult {
    cases: IBenchmarkCaseResult[];
}

export class BenchmarkManager {

    private benchmarkResultMap = new WeakMap<IBenchmark<any>, IBenchmarkResult>();
    private benchmarkArray: IBenchmark<any>[] = [];

    public addBenchmark<T>(benchmark: IBenchmark<T>) {
        const benchmarkResult: IBenchmarkResult = {
            cases: [],
        };
        this.benchmarkArray.push(benchmark);
        this.benchmarkResultMap.set(benchmark, benchmarkResult);
    }

    public getBenchmarkResult<T>(benchmark: IBenchmark<T>) {
        return this.benchmarkResultMap.get(benchmark);
    }

    public runBenchmark<T>(benchmark: IBenchmark<T>) {
        return new Promise<IBenchmarkResult>(() => {

        });
    }

    public run(repeats: number, iteration = 0) {
        const queue: (() => Promise<IBenchmarkResult>)[] = [];

        // for (let i = 0; i < repeats; i++) {
        //     queue.push(() => {

        //     });
        // }
    }

}
