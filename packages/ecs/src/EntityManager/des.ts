// interface IEntityType {
//     id: symbol;
// }
// interface IEntityTypeDesc {
//     components: IComponentType<any>[];
// }

// interface IEntity {
//     id: symbol;
// }

// interface IComponentType<T> {
//     id: symbol;
// }
// interface IComponentTypeDesc<T> {
//     createDefaultValue: () => T;
// }


// interface IComponentGroup {
//     id: symbol;
// };
// interface IComponentGroupDesc {
//     include: IComponentType<any>[];
//     exclude: IComponentType<any>[];
// };

// /**
//  * Needed operations:
//  * - Create an EntityType
//  * - Create an Entity by EntityType
//  * - Set ComponentData to Entity
//  * - Create an EntityType from another EntityType with addition/removing components
//  *  - To remove or add Component it's needed to change Entity's Type.
//  * - Change Entity's EntityType
//  * - Create ComponentGroup
//  * - Get ComponentDataArray by ComponentGroup
//  */
// interface IEntityManager {
//     defineEntityType: (entityTypeDesc: IEntityTypeDesc) => IEntityType;
//     findEntityType: (entityTypeDesc: IEntityTypeDesc) => IEntityType | null;

//     defineComponentType: <T>(componentTypeDesc: IComponentTypeDesc<T>) => IComponentType<T>;

//     createEntity: (entityType: IEntityType) => IEntity;
//     removeEntity: (entity: IEntity) => void;
//     setEntityType: (entity: IEntity, entityType: IEntityType) => void;

//     setComponentData: <T, D extends T>(entity: IEntity, componentType: IComponentType<T>, componentData: D) => void;
//     getComponentData: <T, D extends T>(entity: IEntity, componentType: IComponentType<T>) => D;

//     defineComponentGroup: (componentGroupDesc: IComponentGroupDesc) => IComponentGroup;
//     getComponentDataArray: <T, D extends T>(componentGroup: IComponentGroup, componentType: IComponentType<T>) => D[];
//     getEntityArray: (componentGroup: IComponentGroup) => IEntity[];
// }

// class EntityManager implements IEntityManager {
//     findEntityType: (entityTypeDesc: IEntityTypeDesc) => IEntityType;
//     defineEntityType: (entityTypeDesc: IEntityTypeDesc) => IEntityType;

//     defineComponentType: <T>(componentTypeDesc: IComponentTypeDesc<T>) => IComponentType<T>;
//     createEntity: (entityType: IEntityType) => IEntity;
//     removeEntity: (entity: IEntity) => void;
//     setEntityType: (entity: IEntity, entityType: IEntityType) => void;
//     setComponentData: <T, D extends T>(entity: IEntity, componentType: IComponentType<T>, componentData: D) => void;
//     getComponentData: <T, D extends T>(entity: IEntity, componentType: IComponentType<T>) => D;
//     defineComponentGroup: (componentGroupDesc: IComponentGroupDesc) => IComponentGroup;
//     getComponentDataArray: <T, D extends T>(componentGroup: IComponentGroup, componentType: IComponentType<T>) => D[];
//     getEntityArray: (componentGroup: IComponentGroup) => IEntity[];
// }

// export default 10;
