// The player controller takes input from the input system and applies it to the player
import {Player} from './player';

export class PlayerController
{

    public static instance: PlayerController;

    public static getInstance(): PlayerController
    {
        if (PlayerController.instance == null)
        {
            PlayerController.instance = new PlayerController();
        }
        return PlayerController.instance;
    }

    public player: Player;
}
