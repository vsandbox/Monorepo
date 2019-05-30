import { EntityManager, IComponentType, IEntityType } from "./EntityManager";

const componentA: IComponentType<number> = {
    initValue: () => 0,
};

const entityType: IEntityType = {
    componentTypeArray: [componentA]
};

const em = new EntityManager();

em.registerEntityType(entityType);
const entity = em.createEntity(entityType, [componentA, 2]);
const entity2 = em.createEntity(entityType, [componentA, 3]);

const entityTypeData = em.getEntityData(entityType);
const componentDataArray = entityTypeData.componentDataArrayMap.get(componentA);
const entityIndex = entityTypeData.entityIndexMap.get(entity);
const entity2Index = entityTypeData.entityIndexMap.get(entity2);

console.log(componentDataArray[entityIndex]);
console.log(componentDataArray[entity2Index]);
