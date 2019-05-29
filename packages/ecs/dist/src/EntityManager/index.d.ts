interface IComponentDesc<T> {
    initValue: () => T;
}
interface IComponent<T> {
    index: number;
}
export declare class EntityManager {
    private componentRegistry;
    defineComponent<T>(componentDesc: IComponentDesc<T>): IComponent<T>;
}
export {};
