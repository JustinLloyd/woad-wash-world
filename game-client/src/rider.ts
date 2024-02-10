import {GameObject} from './gameObject';

export abstract class Rider extends GameObject
{
    public name: string;
    public currentHitPoints: number;
    public maxHitPoints: number;
    public currentFootSpeed: number;
    public maxFootSpeed: number;
}
