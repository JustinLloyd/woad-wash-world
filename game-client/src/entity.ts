import {log} from 'winston';
import Component from './component';
import {ECSManager} from './ecs';

export abstract class Entity
{
    public id: number;
    public active: boolean = true;
    public components: Array<Component> = new Array<Component>();

    public getID(): number
    {
        return this.id;
    }

    public addComponent<Type extends Component>(componentType: { new(): Type }): Type
    {
        if (!componentType)
        {
            log('error', 'component is null');
            throw new Error('component is null');
        }



        let component = new componentType();
        const type = component.constructor.name;
        // TODO tell the ECSManager to add this component to the relevant system
        this.components.push(component);
        ECSManager.registerComponent(component);
        component._init();
        component._reset();

        return (component);
    }

    public init()
    {
        // do nothing
    }

    public reset()
    {
        // do nothing
    }

    public _start()
    {
        if (!this.__isEnabled)
        {
            return;
        }

        if (this.__hasStarted)
        {
            return;
        }

        this.start();
        this.__hasStarted = true;

    }

    public start()
    {
        // do nothing
    }

    public destroy()
    {
        this.enabled = false;
        for (let component of this._components)
        {
            if (component instanceof GameBehaviour)
            {
                (component as GameBehaviour).enabled = false;
            }

        }

        for (let component of this._components)
        {
            component.destroy();
        }

        this.dispatchOnDestroyed();
        this.container.destroy({children: true});
    }

    // late update always runs but only after all other update functions
    public _update(secondsPassed: number)
    {
        if (!this.enabled)
        {
            return;
        }

        this._start();
        this.update(secondsPassed);
        for (let component of this._components)
        {
            if (component instanceof GameBehaviour)
            {
                (component as GameBehaviour)._update(secondsPassed);
            }

        }

    }

    public update(secondsPassed: number)
    {
        // do nothing
    }

    // late update always runs but only after all other update functions
    public _lateUpdate(secondsPassed: number)
    {
        this.lateUpdate(secondsPassed);
        for (let component of this._components)
        {
            if (component instanceof GameBehaviour)
            {
                //     let behaviour = component as GameBehaviour;
                (component as GameBehaviour)._lateUpdate(secondsPassed);
            }
        }

    }

    public lateUpdate(secondsPassed: number)
    {
        // do nothing
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
