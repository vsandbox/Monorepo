const workingWithSymbols = () => {

    const object: any = {};

    const id = Symbol();
    const id2 = Symbol();
    const id3 = Symbol();
    const id4 = Symbol();

    object[id] = 1;
    object[id2] = 2;
    object[id3] = 3;
    object[id4] = 4;

    let value = 0;
    if (typeof object[id] !== "undefined") value = object[id];

    let value2 = 0;
    if (typeof object[id] !== "undefined") value2 = object[id];

    let value3 = 0;
    if (typeof object[id] !== "undefined") value3 = object[id];

    let value4 = 0;
    if (typeof object[id] !== "undefined") value4 = object[id];

    return value + value2 + value3 + value4;

};

const workingWithWeakMap = () => {

    const object = new WeakMap<Function, number>();

    const id = () => {};
    const id2 = () => {};
    const id3 = () => {};
    const id4 = () => {};

    object.set(id, 1);
    object.set(id2, 2);
    object.set(id3, 3);
    object.set(id4, 4);

    let value = 0;
    if (object.has(id)) value = object.get(id);

    let value2 = 0;
    if (object.has(id)) value2 = object.get(id);

    let value3 = 0;
    if (object.has(id)) value3 = object.get(id);

    let value4 = 0;
    if (object.has(id)) value4 = object.get(id);

    return value + value2 + value3 + value4;

};

const test = () => {

    console.time("workingWithSymbols");
    for (let i = 0; i < 1000; i++) {

        const result = workingWithSymbols();

    }
    console.timeEnd("workingWithSymbols");

    console.time("workingWithWeakMap");
    for (let i = 0; i < 1000; i++) {

        const result = workingWithWeakMap();

    }
    console.timeEnd("workingWithWeakMap");

};

test();
