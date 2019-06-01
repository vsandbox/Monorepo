export const runQueue = <T>(actions: (() => Promise<T>)[], index = 0) => {
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
