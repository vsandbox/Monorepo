// interface IComponent<T> {
//     type: symbol;
//     index: number;
// }

// interface IEntity {
//     id: symbol;
//     type: symbol;
// }

// interface IComponentGroup {
//     id: symbol;
//     type: symbol;
// }

// interface IEntityManager {

//     setComponentData: <T, R extends T>(entity: IEntity, component: IComponent<T>, data: R) => void;
//     getComponentData: <T, R extends T>(entity: IEntity, component: IComponent<T>) => R | null;

//     getOrCreateComponentGroup: (components: IComponent<any>[]) => IComponentGroup;
// }

// const computeTypeHashSum = (componentArray: IComponent<any>[]) => {
//     // Sort componentArray (or it should be sorted always)

//     // Join each component's index

//     // [0, 2, 100].push(60)
// };

