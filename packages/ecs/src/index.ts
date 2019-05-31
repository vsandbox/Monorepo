// import { EntityManager, IComponentType, IEntityType } from "./EntityManager";

// const componentA: IComponentType<number> = {
//     initValue: () => 0,
// };

// const entityType: IEntityType = {
//     componentTypeArray: [componentA]
// };

// const em = new EntityManager();

// em.registerEntityType(entityType);
// const entity = em.createEntity(entityType, [componentA, 2]);
// const entity2 = em.createEntity(entityType, [componentA, 3]);

// const entityTypeData = em.getEntityData(entityType);
// const componentDataArray = entityTypeData.componentDataArrayMap.get(componentA);
// const entityIndex = entityTypeData.entityIndexMap.get(entity);
// const entity2Index = entityTypeData.entityIndexMap.get(entity2);

// console.log(componentDataArray[entityIndex]);
// console.log(componentDataArray[entity2Index]);

const array = new Array(1000).fill(1);
const object: {[key: number]: number;} = array.reduce((acc, value, index) => {
    acc[index] = value;
    return acc;
}, {});

const iterateArray = () => {
    let sum = 0;
    for (let i = 0; i < array.length; i++) {
        const element = array[i];
        sum += element;
    }
    return sum;
};

const iterateObject = () => {
    let sum = 0;
    // for (const key in object) {
    //     // if (object.hasOwnProperty(key)) {
    //         const element = object[key];
    //         sum += element;
    //     // }
    // }

    const entries = Object.entries(object);
    for (let i = 0; i < entries.length; i++) {
        const element = entries[i][1];
        sum += element;
    }
    return sum;
};

console.time("iterateObject");
iterateObject();
console.timeEnd("iterateObject");

console.time("iterateArray");
iterateArray();
console.timeEnd("iterateArray");



