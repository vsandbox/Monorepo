import { IEntity } from "../IEntity";

export interface IComponentDesc<T> {
    initValue: () => T;
}

interface IComponent<T> {
    index: number;
    dataMap: WeakMap<IEntity, T>;
    initValue: () => T;
}

export class ComponentRegistry {
    private lastComponentIndex = 0;
    private componentMap = new WeakMap<IComponentDesc<any>, IComponent<any>>();

    public defineComponent<T>(componentDesc: IComponentDesc<T>) {
        const componentIndex = this.lastComponentIndex + 1;

        const component: IComponent<T> = {
            index: componentIndex,
            dataMap: new WeakMap<IEntity, T>(),
            initValue: componentDesc.initValue,
        };

        this.componentMap.set(componentDesc, component);

        this.lastComponentIndex = componentIndex;
    }
    public hasComponent<T>(componentDesc: IComponentDesc<T>): boolean {
        return this.componentMap.has(componentDesc);
    }
    public getComponent<T>(componentDesc: IComponentDesc<T>): IComponent<T> {
        return this.componentMap.get(componentDesc);
    }
    public removeComponent<T>(componentDesc: IComponentDesc<T>) {
        this.componentMap.delete(componentDesc);
    }

    /** <T, D extends T> is for better type detecting. T and D is the same, but without D */
    public setComponentData<T, D extends T>(componentDesc: IComponentDesc<T>, entity: IEntity, data: D) {
        const component = this.componentMap.get(componentDesc);
        component.dataMap.set(entity, data);
    }
    public getComponentData<T>(componentDesc: IComponentDesc<T>, entity: IEntity): T {
        const component = this.componentMap.get(componentDesc);
        return component.dataMap.get(entity);
    }
    public removeComponentData<T>(componentDesc: IComponentDesc<T>, entity: IEntity) {
        const component = this.componentMap.get(componentDesc);
        return component.dataMap.delete(entity);
    }
}
