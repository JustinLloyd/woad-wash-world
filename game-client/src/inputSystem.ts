// The input system is a singleton that manages input for the game
// It is responsible for handling input events and dispatching them to the player controller and other game objects
export class InputSystem
{
    public static instance: InputSystem;

    public static getInstance(): InputSystem
    {
        if (InputSystem.instance == null)
        {
            InputSystem.instance = new InputSystem();
        }
        return InputSystem.instance;
    }

}
