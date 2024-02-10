import winston, {log} from "winston";

export class Iterator
{
    public static iterate<T>(array: Array<T>, callback: (item: T) => void)
    {
        for (let item of array)
        {
            callback(item);
        }
    }

    public static iterateWithIndex<T>(array: Array<T>, callback: (item: T, index: number) => void)
    {
        for (let i = 0; i < array.length; i++)
        {
            callback(array[i], i);
        }
    }


}

export abstract class Entity{
    public id:number;
    public active:boolean=true;
    public components: Array<Component> = new Array<Component>();

    public getID():number{
        return this.id;
    }

    public addComponent<T extends Component>(component: T): T
    {
        if (!component)
        {
            log('error', 'component is null');
            throw new Error('component is null');
        }

        const type = component.constructor.name;


        this.components.push(component);
        return component;
    }

    public removeComponent<T extends Component>(component: T): T
    {
        const index = this.components.indexOf(component, 0);
        if (index > -1)
        {
            this.components.splice(index, 1);
        }

        return component;
    }

    public getComponent<T extends Component>(componentType: { new(): T }): T
    {
        for (let component of this.components)
        {
            if (component instanceof componentType)
            {
                return component as T;
            }
        }

    }
}

export class Component<T>
{
    public data : T;

}

export class System{}

// The ECSManager class is a simple implementation of the Entity-Component-System pattern.
// It maintains a list of systems and entities, and provides methods for adding and removing them.
// It also provides a quick lookup method for finding entities and the system that processes them.
// It also provides a quick lookup method for finding components of a specific type.

export class ECSManager{
    public static System = System;
    public static Entity = Entity;
    public static Component = Component;
    private systems: Array<System> = new Array<System>();
    private entities: Array<Entity> = new Array<Entity>();

    constructor(systems: Array<System>)
    {
        if (systems)
        {
         systems.forEach(system => this.addSystem(system));
        }
    }

    public addSystem(system: System)
    {
        if (!system)
        {
            log('error', 'system is null')
            return;
        }

        this.systems.push(system);
    }

    public removeSystem(system: System)
    {
        if (!system)
        {
            log('error', 'system is null');
            return;
        }

        const index = this.systems.indexOf(system, 0);
        if (index > -1)
        {
            this.systems.splice(index, 1);
        }
    }

    public addEntity(entity: Entity)
    {
        if (!entity || this.entities.indexOf(entity, 0) > -1)
        {
            log('error', 'entity is null or already exists');
            return;
        }

        this.entities.push(entity);
    }

    public removeEntity(entity: Entity)
    {
        if (!entity)
        {
            log('error', 'entity is null');
            return;
        }

        const index = this.entities.indexOf(entity, 0);
        if (index > -1)
        {
            this.entities.splice(index, 1);
        }
    }


}
