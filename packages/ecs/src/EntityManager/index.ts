interface IComponentDesc<T> {
    initValue: () => T;
}

interface IComponent<T> {
    index: number;
}


export class EntityManager {

    private componentRegistry: {
        componentArray: IComponent<any>[];
        componentByDescMap: WeakMap<IComponentDesc<any>, IComponent<any>>;
    } = {
        componentArray: [],
        componentByDescMap: new WeakMap<IComponentDesc<any>, IComponent<any>>(),
    };

    public defineComponent<T>(componentDesc: IComponentDesc<T>): IComponent<T> {
        const {
            componentArray,
            componentByDescMap,
        } = this.componentRegistry;


        let component: IComponent<any>;

        if (componentByDescMap.has(componentDesc)) {
            component = componentByDescMap.get(componentDesc);
        }
        else {
            const index = componentArray.length;
            component = { index };
            componentArray.push(component);
            componentByDescMap.set(componentDesc, component);
        }

        return component;
    }

}

const em = new EntityManager();
const componentDesc: IComponentDesc<number> = {
    initValue: () => 1,
};

const component = em.defineComponent(componentDesc);
const componentAgain = em.defineComponent(componentDesc);

console.log(component, componentAgain);
