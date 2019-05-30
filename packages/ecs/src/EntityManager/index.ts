export interface IComponentType<T> {
    initValue: () => T;
}

export interface IEntityType {
    componentTypeArray: IComponentType<any>[];
}
export interface IEntity {}
export interface IEntityTypeData {
    entityArray: IEntity[];
    componentDataArrayMap: WeakMap<IComponentType<any>, any[]>;
    entityIndexMap: WeakMap<IEntity, number>;
}

export class EntityManager {

    private entityTypeDataMap = new WeakMap<IEntityType, IEntityTypeData>();
    private entityTypeMap = new WeakMap<IEntity, IEntityType>();

    public getEntityData(entityType: IEntityType) {
        return this.entityTypeDataMap.get(entityType);
    }

    public registerEntityType(entityType: IEntityType) {
        const componentDataArrayMap = new WeakMap<IComponentType<any>, any>();
        for (let i = 0; i < entityType.componentTypeArray.length; i++) {
            const componentType = entityType.componentTypeArray[i];
            componentDataArrayMap.set(componentType, []);
        }

        const entityTypeData: IEntityTypeData = {
            entityArray: [],
            entityIndexMap: new WeakMap<IEntity, number>(),
            componentDataArrayMap,
        };

        this.entityTypeDataMap.set(entityType, entityTypeData);
    }

    // entityType should be already defined in this instance
    public createEntity(entityType: IEntityType, ...componentDataPairArray: [IComponentType<any>, any][]) {
        const entityData = this.entityTypeDataMap.get(entityType);
        const entityIndex = entityData.entityArray.length;

        const entity: IEntity = {};

        this.entityTypeMap.set(entity, entityType);
        entityData.entityIndexMap.set(entity, entityIndex);

        entityData.entityArray.push(entity);

        const componentDataPairMap = new WeakMap<IComponentType<any>, any>();
        for (let i = 0; i < componentDataPairArray.length; i++) {
            const [componentType, componentData] = componentDataPairArray[i];
            componentDataPairMap.set(componentType, componentData);
        }

        for (let i = 0; i < entityType.componentTypeArray.length; i++) {
            const componentType = entityType.componentTypeArray[i];
            const componentDataArray = entityData.componentDataArrayMap.get(componentType);

            const componentData = componentDataPairMap.has(componentType) ? componentDataPairMap.get(componentType) : componentType.initValue();
            componentDataArray.push(componentData);
        }

        return entity;
    }

    // entity should be already created by createEntity method
    public removeEntity(entity: IEntity) {
        const entityType = this.entityTypeMap.get(entity);
        const entityData = this.entityTypeDataMap.get(entityType);
        const { entityArray, componentDataArrayMap, entityIndexMap } = entityData;

        const entityIndex = entityIndexMap.get(entity);

        const newEntityArray = [
            ...entityArray.slice(0, entityIndex),
            ...entityArray.slice(entityIndex + 1, entityArray.length),
        ];
        entityData.entityArray = newEntityArray;

        for (let i = 0; i < entityType.componentTypeArray.length; i++) {
            const componentType = entityType.componentTypeArray[i];
            const componentDataArray = componentDataArrayMap.get(componentType);

            const newComponentDataArray = [
                ...componentDataArray.slice(0, entityIndex),
                ...componentDataArray.slice(entityIndex + 1, entityArray.length),
            ];
            componentDataArrayMap.set(componentType, newComponentDataArray);
        }

        for (let i = 0; i < newEntityArray.length; i++) {
            const entity = newEntityArray[i];
            entityIndexMap.set(entity, i);
        }

    }

}

