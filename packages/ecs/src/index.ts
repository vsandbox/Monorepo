interface IComponent<T> {
    type: symbol;
}

const a: IComponent<number> = {
    type: Symbol(),
};

interface IEntity {
    id: symbol;
    type: symbol;
}

interface IGroup {
    id: symbol;
    type: symbol;
}

interface IEntityManager {

    setComponentData: <T, R extends T>(entity: IEntity, component: IComponent<T>, data: R) => void;

    getComponentData: <T, R extends T>(entity: IEntity, component: IComponent<T>) => R;

    createGroup: <T>(components: IComponent<any>[]) => IGroup;

}