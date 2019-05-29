import { ComponentRegistry, IComponentDesc } from "../ComponentRegistry";
import { IEntity } from "../IEntity";

export class EntityManager {

    private componentRegistry = new ComponentRegistry();

    public setComponentData<T, D extends T>(componentDesc: IComponentDesc<T>, entity: IEntity, data: D) {
        this.componentRegistry.setComponentData(componentDesc, entity, data);
    }

    public getComponentData<T, D extends T>(componentDesc: IComponentDesc<T>, entity: IEntity): T {
        return this.componentRegistry.getComponentData(componentDesc, entity);
    }

}
