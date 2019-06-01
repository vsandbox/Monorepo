// import { IBench } from "../IBench";

// export interface IIterationBenchesContext {
//     array: number[];
//     hash: { [key: number]: number; };
//     symbolHash: { /** key: symbol */[key: string]: number; };
// };

// export const iterationBenches: IBench<IIterationBenchesContext>[] = [
//     {
//         name: "Iterations",
//         createContext: () => {
//             const array = new Array(1000).fill(1);
//             const hash = array.reduce((acc, value, index) => {
//                 acc[index] = value;
//                 return acc;
//             }, {});
//             const symbolHash = array.reduce((acc, value, index) => {
//                 acc[Symbol()] = value;
//                 return acc;
//             }, {});

//             return {
//                 array,
//                 hash,
//                 symbolHash,
//             };
//         },

//         suites: [
//             {
//                 name: "Array for loop",
//                 run: ({ array }) => {
//                     let result = 0;

//                     for (let i = 0; i < array.length; i++) {
//                         const element = array[i];
//                         result += element;
//                     }

//                     return result;
//                 }
//             },
//             {
//                 name: "Array.forEach",
//                 run: ({ array }) => {
//                     let result = 0;

//                     array.forEach(value => {
//                         result += value;
//                     });

//                     return result;
//                 }
//             },
//             {
//                 name: "Array.reduce",
//                 run: ({ array }) => {
//                     const result = array.reduce((acc, value) => {
//                         return acc + value;
//                     }, 0);

//                     return result;
//                 }
//             },
//             {
//                 name: "Hash with hasOwnProperty",
//                 run: ({ hash }) => {
//                     let result = 0;

//                     for (const key in hash) {
//                         if (hash.hasOwnProperty(key)) {
//                             const element = hash[key];
//                             result += element;
//                         }
//                     }

//                     return result;
//                 }
//             },
//             {
//                 name: "Hash without hasOwnProperty",
//                 run: ({ hash }) => {
//                     let result = 0;

//                     for (const key in hash) {
//                         const element = hash[key];
//                         result += element;
//                     }

//                     return result;
//                 }
//             },
//             {
//                 name: "SymbolHash with hasOwnProperty",
//                 run: ({ symbolHash }) => {
//                     let result = 0;

//                     for (const key in symbolHash) {
//                         if(symbolHash.hasOwnProperty(key)) {
//                             const element = symbolHash[key];
//                             result += element;
//                         }
//                     }

//                     return result;
//                 }
//             },
//             {
//                 name: "SymbolHash without hasOwnProperty",
//                 run: ({ symbolHash }) => {
//                     let result = 0;

//                     for (const key in symbolHash) {
//                         const element = symbolHash[key];
//                         result += element;
//                     }

//                     return result;
//                 }
//             },
//         ]
//     }
// ];