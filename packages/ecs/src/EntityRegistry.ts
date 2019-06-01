export interface IComponentType<T> { initData: () => T; }

export type TEntityType = IComponentType<any>[];

export class EntityRegistry {

    createEntity(entityType: TEntityType, ...componentDataTupleArray: [IComponentType<any>, any][]) {

    }

}
