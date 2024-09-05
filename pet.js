import { DIRECTION } from "./direction.js";
import { STATE } from "./state.js";


export class Pet{
    constructor(){
        this.x = 100;
        this.y = 100;
        this.width = 50;
        this.height = 50;
        this.state = STATE.IDLE;
        this.direction = DIRECTION.LEFT;
    }
    changeState(state){
        this.state = state;
    }
}
