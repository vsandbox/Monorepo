// interface IEntityType {
//     id: symbol;

//     components: {
//         /** [componentTypeId: symbol] */
//         [componentTypeId: string]: boolean;
//     }
// }

// interface IComponentGroupType {
//     include: {
//         /** [componentTypeId: symbol] */
//         [componentTypeId: string]: boolean;
//     };
//     exclude: {
//         /** [componentTypeId: symbol] */
//         [componentTypeId: string]: boolean;
//     };
// }

// const isEntityInComponentGroup = (entityType: IEntityType, componentGroupType: IComponentGroupType): boolean => {
//     let isEntityCompatible = true;

//     for (const key in componentGroupType.include) {
//         if (componentGroupType.include.hasOwnProperty(key)) {
//             if (!entityType.components[key]) {
//                 isEntityCompatible = false;
//                 break;
//             }
//         }
//     }

//     if (!isEntityCompatible) return isEntityCompatible;

//     for (const key in componentGroupType.exclude) {
//         if (componentGroupType.exclude.hasOwnProperty(key)) {
//             if (entityType.components[key]) {
//                 isEntityCompatible = false;
//                 break;
//             }
//         }
//     }

//     return isEntityCompatible;
// };
