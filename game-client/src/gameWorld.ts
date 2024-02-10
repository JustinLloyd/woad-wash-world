import {GameObject} from './gameObject';
import {InputSystem} from './inputSystem';

export abstract class GameWorld
{
    events: any;
    protected isDebug: boolean = false;
    protected isCheatEnabled: boolean = false;
    public static instance: GameWorld;
    canvas: HTMLCanvasElement;
    gameObjects: Array<GameObject>;
    public static app: PIXI.Application;
    public inputSystem: InputSystem;
}
