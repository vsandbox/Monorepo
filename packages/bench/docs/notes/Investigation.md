# Investigation

The main valuable number for us is `min/max` ratio. The greater means better result.
Means all `10` times for give `iterations` that test was running it was spent almost the same amount of time.

```
100     iterations x 10 | min: 10ms, max: 21ms          | min/max: 0.476
1000    iterations x 10 | min: 100ms, max: 125ms        | min/max: 0.8
10000   iterations x 10 | min: 1000ms, max: 1131ms      | min/max: 0.884
100000  iterations x 10 | min: 10080ms, max: 10186ms    | min/max: 0.989
500000  iterations x 10 | min: 50373ms, max: 51445ms    | min/max: 0.979
1000000 iterations x 10 | min: 100504ms, max: 101039ms  | min/max: 0.994
```

The table above is for a simple test
```typescript
(value) => {
    const b = Math.sqrt(value * 20);
    const e = new Array(10000).fill(value);
    return Math.pow(b + value, e[0]);
}
```

And test runner runs it in a single while loop for a given iterations. `context` is a `value` passing to the test function.
```typescript
while (iterationsCount--) {
    exec(context);
}
```

The test above shows that the best result is for a test execution taking more than 10,000ms.

# Determine a number of iterations
Each test could spend different time per iteration. So to run different tests for about the same duration it needed to be run with different number of iterations.

To determine needed number of iterations the test should be run in a loop with different number of iterations to find the best one. Here is also place for a little prediction for optimization.

## Timestamp Problem
Keeping in mind that we have only a cross-platform timestamp to determine spent time, means that actual time could vary from naive `endTimestamp - startTimestamp` to `-+0.999999`. This number is given because `startTimestamp` could be given at the very end of current millisecond, like `0.999999ms`, then `entTimestamp` could be given at the very start of the next millisecond, like `1.000000ms`; and vice versa when `startTime` is `0.000000ms` and `endTime` is `1.999999ms`. So technically duration is from `0.0000001ms` to `1.999999ms`, but `endTimestamp - startTimestamp` tells us about the whole millisecond in both cases.

So to determine needed number of iterations we could start from the minimal settings like:

```typescript
iterations = 100;
minTimeInMs = 10000;
```

After the first execution we will have some information about execution duration. E.g.:

```typescript
timeSpentInMs = 10;
```

Keeping in mind the `Timestamp Problem`, let's make a ratio:

```typescript
timeSpentInMs = 10;
maxTimeSpentInMs = timeSpentInMs + 0.999999;
ratio = timeSpentInMs / maxTimeSpentInMs; // 0.909
```

We need to find a ratio tends to 1.

To do that we could find a ratio between actual duration and needed one:

```typescript
neededToMaxRatio = neededMinTimeSpentInMs / maxTimeSpentInMs;
nextIterations = prevIterations * neededToMaxRatio;
```

We couldn't rely on actual minimal duration because test could actually spend max time. So we could overtake it quite much if the first execution took less than `10ms`,

E.g.:
```typescript
neededTimeSpentInMs = 10000;
iterations = 10;
timeSpentInMs = 1;
maxTimeSpentInMs = timeSpentInMs + 0.999999;
minTimeSpentInMs = timeSpentInMs - 0.999999;

iterationsAccordingToMax = Math.floor(iterations * (neededTimeSpentInMs / maxTimeSpentInMs)); // 50000
iterationsAccordingToMin = Math.floor(iterations * (neededTimeSpentInMs / minTimeSpentInMs)); // 99999999997
```

In this case, if each test iteration really spends
```typescript
maxTimeSpentInMs / iterations //0.19999ms
```
than running `iterationsAccordingToMin` will take about `19999989999ms`.

# runTestSmart
```ts
export const runTestSmart = (executions: number, minIterations: number, neededMinTimeSpentInMs: number, overloadRatio: number) => {
    console.log(`[Exec] ${minIterations} iterations...`);

    const result = runTest(test, minIterations);

    const minInMs = 0.001;
    const errorInMs = 1 - minInMs;

    const minTimeSpentPerIterationInMs = Math.max((result.timeSpent.min - errorInMs), minInMs) / minIterations;
    const maxTimeSpentPerIterationInMs = (result.timeSpent.max + errorInMs) / minIterations;

    // const predictedMinIterations = Math.round(neededMinTimeSpentInMs / maxTimeSpentPerIterationInMs);
    const predictedMaxIterations = Math.round(neededMinTimeSpentInMs / minTimeSpentPerIterationInMs);
    const predictedIterations = Math.round(predictedMaxIterations * ((minTimeSpentPerIterationInMs / maxTimeSpentPerIterationInMs) + overloadRatio));

    // const predictedResult = runTest(test, predictedMinIterations);

    if (result.timeSpent.min >= neededMinTimeSpentInMs) {
        console.log('[Done]', {time: result.timeSpent.min, iterations: result.iterations});
        return result;
    }
    else {
        // console.log(`Not found. Try ${predictedIterations}`);
    }
    runTestSmart(executions, predictedIterations, neededMinTimeSpentInMs, overloadRatio);
};
```
