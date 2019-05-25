interface IEntity {
    id: symbol;
}
interface IComponent<T> {}

interface IEntityArchetype {
    id: symbol;
    components: IComponent<any>[];
}

interface IComponentGroup {
    id: symbol;
    components: IComponent<any>[];
}

class EntityManager {

    private entitiesByArchetype: {
        /** entityId: symbol, ts doesn't support yet */
        [entityId: string]: IEntity[];
    } = {};

    private componentsGroupsById: {
        /** groupId: symbol, ts doesn't support yet */
        [groupId: string]: IComponentGroup;
    }

    private componentsDataByComponentType: {
        /** componentType: symbol, ts doesn't support yet */
        [componentType: string]: {
            /** entityId: symbol, ts doesn't support yet */
            [entityId: string]: any[];
        };
    };

    public addComponent<T>(entity: IEntity, component: IComponent<T>) {

    }
    public removeComponent<T>(entity: IEntity, component: IComponent<T>) {

    }
    public setComponentData<T, R extends T>(entity: IEntity, component: IComponent<T>, data: R) {

    }

}
