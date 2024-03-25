import {GameObject} from './gameObject';
import {InputSystem} from './inputSystem';
import {Application} from '@pixi/app';

export abstract class GameWorld
{
    events: any;
    protected isDebug: boolean = false;
    protected isCheatEnabled: boolean = false;
    public static instance: GameWorld;
    canvas: HTMLCanvasElement;
    gameObjects: Array<GameObject>;
    public static app: Application
    public inputSystem: InputSystem;
}
