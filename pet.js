import { DIRECTION } from "./direction.js";
import { createHTML, poring, shadow } from "./html.js";
import { STATE } from "./state.js";
export class Pet{
    constructor(startingX,startingY,moveSpeed,type){
        this.walk_sound = new Audio('./audio/poring_walk.wav');
        this.x = startingX;
        this.y = startingY;
        this.width = 60;
        this.height = 60;
        this.state = STATE.IDLE;
        this.direction = DIRECTION.LEFT;
        this.moveSpeed = moveSpeed;
        this.setMoveSpeed = true;
        this.timer = {
            idle:0,
            roll:0,
            click_drag:0,
            walk:0,
            steps:0
        };
        this.durations = {
            click_drag:20,
            walk:120,
            idle:800,
            roll:20,
            steps:0,
            moveSpeed:0
        }
        this.petHtml = poring();
        this.shadowHtml = shadow();
        this.petElement = createHTML(this.petHtml);
        this.shadowElement = createHTML(this.shadowHtml);
        this.canDrag = false;
        this.isPetClicked = false;
        this.mousePosition = {
            x:0,
            y:0
        }
        this.type = type;
        this.setType = true;
        this.isRainbowring;
        this.hue = 0;
        this.shouldPlaySound = false;
    }

    playWalkSound(startFrame){
        console.log('playing sound');
        console.log(this.state);
        if(this.timer.walk == startFrame && this.timer.walk !=0){
            this.walk_sound.volume = 0.01;
            this.walk_sound.play();
        }
    }

    setZindex(){
        this.petElement.style.zIndex = `${this.y}`;
    }
    forceTeleportToScreenCenter(){
        if(this.x<=0 || this.x >= window.innerWidth || this.y <= 0 || this.y>= window.innerHeight){
            this.x = window.innerWidth/2;
            this.y = window.innerHeight/2;
        }
    }

    turnOffTImerIfPetUnclicked(){
        this.isPetClicked = false;
        this.timer.click_drag = 0;
    }

    startTimerWhenPetClicked(){
        if(this.isPetClicked){
            this.timer.click_drag++;
        }
    }

    changeState(state){
        this.state = state;
    }

    updatePetPosition(){
        this.petElement.style.left = `${this.x}px`;
        this.petElement.style.top =`${this.y}px`;  
    }

    updateShadowPosition(){
        this.shadowElement.style.left = `${this.x+10}px`;
        this.shadowElement.style.top =`${this.y+32}px`;
    }
    
    setState(){
        const randomRoll = Math.floor(Math.random()*2);
        if(randomRoll == 0){
            this.state = STATE.IDLE;
        }
        if(randomRoll == 1){
            this.state = STATE.WALK;
        }
    }

    giveMousePosition(mousePos){
        this.mousePosition = mousePos;
    }

    setPetToMousePosition(){
        this.petElement.style.left = `${this.mousePosition.x - this.width/2}px`;
        this.petElement.style.top = `${this.mousePosition.y-30}px`;
        this.x = this.mousePosition.x - this.width/2;
        this.y = this.mousePosition.y-30;
    }

    rollStepAmount(){
        this.durations.steps = Math.floor(Math.random()*6);
    }

    rollDirection(){
        const directionRoll = Math.floor(Math.random()*8);
        switch (directionRoll) {
            case 0:
                this.direction = DIRECTION.LEFT;
                break;
            case 1:
                this.direction = DIRECTION.TOP_LEFT;
                break;
            case 2:
                this.direction = DIRECTION.TOP;
                break;
            case 3:
                this.direction = DIRECTION.TOP_RIGHT;
                break;
            case 4:
                this.direction = DIRECTION.RIGHT;
                break;
            case 5:
                this.direction = DIRECTION.BOT_RIGHT;
                break;
            case 6:
                this.direction = DIRECTION.BOT;
                break;
            case 7:
                this.direction = DIRECTION.BOT_LEFT;
                break;
            default:
                break;
        }
    }

    move(x,y){
        if(x==1){
            if(this.timer.walk % 2 ==0){
                if(this.timer.walk>this.durations.moveSpeed){
                    this.x+=this.moveSpeed;
                }
            }
        }
        if(x==-1){
            if(this.timer.walk % 2 ==0){
                if(this.timer.walk>this.durations.moveSpeed){
                    this.x-=this.moveSpeed;
                }
            }
        }

        if(y==1){
            if(this.timer.walk % 2 ==0){
                if(this.timer.walk>this.durations.moveSpeed){
                    this.y+=this.moveSpeed;
                }
                
            }
        }
        if(y==-1){
            if(this.timer.walk % 2 ==0){
                if(this.timer.walk>this.durations.moveSpeed){
                    this.y-this.moveSpeed;
                }
            }
        }
        this.updatePetPosition();
    }

    clickDragHandler(){
        if(this.timer.click_drag>=this.durations.click_drag){
            this.canDrag = true;
        }
    }

    movePet(){
        switch (this.direction) {
            case DIRECTION.LEFT:
                this.petElement.classList.add("left");
                this.petElement.classList.remove("right");
                this.move(-1,0);
                break;
            case DIRECTION.TOP_LEFT:
                this.petElement.classList.add("left");
                this.petElement.classList.remove("right");
                this.move(-1,1);
                break;
            case DIRECTION.TOP:
                this.move(0,1);
                break;
            case DIRECTION.TOP_RIGHT:
                this.petElement.classList.add("right");
                this.petElement.classList.remove("left");
                this.move(1,1);
                break;
            case DIRECTION.RIGHT:
                this.petElement.classList.add("right");
                this.petElement.classList.remove("left");
                this.move(1);
                break;
            case DIRECTION.BOT_RIGHT:
                this.petElement.classList.add("right");
                this.petElement.classList.remove("left");
                this.move(1,-1);
                break;
            case DIRECTION.BOT:
                this.move(0,-1);
                break;
            case DIRECTION.BOT_LEFT:
                this.petElement.classList.add("left");
                this.petElement.classList.remove("right");
                this.move(-1,-1);
                break;
            default:
                break;
        }
    }
    moveSpeedHandler(){
        switch (this.moveSpeed) {
            case 1:
                this.durations.moveSpeed = 30;
                break;

            case 2:
                this.durations.moveSpeed = 20;
                this.durations.walk = 60;
                break;
            case 3:
                this.durations.moveSpeed = 7;
                this.durations.walk = 20;
                break;
            default:
                break;
        }
    }
    setMoveSpeedAnimation(){
        switch (this.moveSpeed) {
            case 1:
                this.petElement.classList.add('walkSpeed1');
                break;
            case 2:
                this.petElement.classList.add('walkSpeed2');
                break;
            case 3:
                this.petElement.classList.add('walkSpeed3');
                break;
            default:
                break;
        }
    }
    removeMoveSpeedAnimation(){
        switch (this.moveSpeed) {
            case 1:
                this.petElement.classList.remove('walkSpeed1');
                break;
            case 2:
                this.petElement.classList.remove('walkSpeed2');
                break;
            case 3:
                this.petElement.classList.remove('walkSpeed3');
                break;
            default:
                break;
        }
    }

    stateHandler(){
        switch (this.state) {
            case STATE.ROLL:
                this.timer.roll++;
                if(this.timer.roll >= this.durations.roll){
                    this.timer.roll = 0;
                    this.rollDirection();
                    this.rollStepAmount();
                    this.setState();
                }
                break;

            case STATE.DRAGGED:
                this.petElement.classList.remove('idle');
                this.petElement.classList.remove('walk');
                this.petElement.classList.add('dragged');
                this.removeMoveSpeedAnimation();
                this.timer.roll = 0;
                this.timer.walk = 0;
                this.timer.idle = 0;

                break;

            case STATE.IDLE:
                this.timer.idle++;
                if(this.timer.idle>this.durations.idle){
                    this.state = STATE.ROLL;
                    this.timer.idle= 0;
                }
                this.petElement.classList.add('idle');
                this.petElement.classList.remove('walk');
                this.removeMoveSpeedAnimation();
                this.petElement.classList.remove('dragged');
                break;

            case STATE.WALK:
                this.movePet();
                
                this.petElement.classList.add('walk');
                this.setMoveSpeedAnimation();
                this.petElement.classList.remove('idle');
                this.petElement.classList.remove('dragged');
                this.timer.walk++;
                this.playWalkSound(1);

                if(this.timer.walk>this.durations.walk){    
                    console.log(`steps: ${this.steps}`);
                    this.timer.steps +=1;
                    this.timer.walk = 0;
                    if(this.timer.steps>= this.durations.steps){
                        this.state = STATE.IDLE;
                        this.timer.steps = 0;
                    }
                }
                break;
            default:
                break;
        }
    }

    dragHandler(){
        if(this.canDrag){
            this.state = STATE.DRAGGED;
            this.setPetToMousePosition();
        }
    }
    changeMoveSpeed(speed){
        this.moveSpeed = speed;
        this.moveSpeedHandler();
    }

    rainbowringUpdate(){
        if(this.isRainbowring){
            this.hue+=4;
            if(this.hue>360){
                this.hue = 0;
            }
            this.petElement.style.filter = `hue-rotate(${this.hue}deg)`;
        }
    }

    setPoringType(){
        switch (this.type) {
            case 'poring':
                //pass
                break;
            case 'drops':
                this.petElement.classList.add('drops');
                break;
            case 'poporing':
                this.petElement.classList.add('poporing');
                break;
            case 'marine':
                this.petElement.classList.add('marine');
                break;
            case 'aquaring':
                this.petElement.classList.add('aquaring');
                break;
            case 'rainbowring':
                this.isRainbowring = true;
                break;
            default:
                break;
        }
    }
    update(){

        if(this.setType){
            this.setPoringType();
            this.setType = false;
        }
        this.rainbowringUpdate();
        
        this.setZindex();
        if(this.changeMoveSpeed){
            this.moveSpeedHandler();
        }
        this.startTimerWhenPetClicked();
        this.clickDragHandler();
        this.updatePetPosition();
        this.updateShadowPosition();
        this.stateHandler();
        this.dragHandler();
        this.forceTeleportToScreenCenter();
    }

}
