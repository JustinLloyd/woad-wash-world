// The player class represents a player in the game
// It is responsible for managing the player's state and input
// It is also responsible for managing the player's avatar and other game objects that are associated with the player
import {GameObject} from './gameObject';
import {PlayerState} from './playerState';
import {MotorcycleAvatar} from './motorcycleAvatar';
import {RiderAvatar} from './riderAvatar';

export class Player extends GameObject
{
    public name: string;

    public state: PlayerState;
    public currentSelectedMotorcycle: Motorcycle;
    public motorcycleAvatar: MotorcycleAvatar;
    public riderAvatar: RiderAvatar;
}
