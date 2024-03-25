import {log} from "winston";
import {Entity} from './entity';

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

export abstract class System{
    public readonly id: number;
    // the maximum number  of times this system can update per second
    public maxUpdatesPerSecond: number = 60;
}

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
    private components: Array<Component> = new Array<Component>();

    constructor(systems: Array<System>)
    {
        if (systems)
        {
         systems.forEach(system => this.addSystem(system));
        }
    }

    // when the ECS is shutting down, we peform an ungraceful, forceful removal of everything
    public shutdown()
    {
        // TODO delete all game objects
        // TODO delete all systems
        // TODO delete all components
    }

    public addSystem(system: System)
    {
        if (!system)
        {
            log('error', 'system is null')
            return;
        }

        if (this.systems.indexOf(system, 0) > -1){
            log('error', 'system already exists');
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
