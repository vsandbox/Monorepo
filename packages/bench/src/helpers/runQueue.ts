export type TQueue<T> = (() => Promise<T>)[];

export const runQueue = <T>(actions: TQueue<T>, index = 0) => {
    return new Promise<T[]>((resolve, reject) => {
        const action = actions[index];
        const actionPromise = action();

        actionPromise.then((result) => {
            const nextIndex = index + 1;

            if (nextIndex < actions.length) {

                const nextPromise = runQueue(actions, nextIndex);

                nextPromise
                    .then((results) => {
                        const newResults = [result, ...results];
                        resolve(newResults);
                    })
                    .catch(err => {
                        reject(err);
                    });
            }
            else {
                resolve([result]);
            }
        });
    });
};

export const runAndReduceQueue = <T>(actions: TQueue<T>, reducer: (prevResult: T, nextResult: T) => T, index = 0) => {
    return new Promise<T>((resolve, reject) => {
        const runQueuePromise = runQueue(actions, index);
        runQueuePromise
            .then(results => {
                let result = results[0];
                for (let i = 1; i < results.length; i++) {
                    const nextResult = results[i];
                    result = reducer(result, nextResult);
                }

                resolve(result);
            })
            .catch(reject);
    });
};
