import {GameObject} from './gameObject';

export abstract class OnTrackObject extends GameObject
{
    public isCollidable: boolean = false;
    public isTrigger: boolean = false;
    public isVisible: boolean = false;
}
