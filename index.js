import { DIRECTION } from "./direction.js";
import { Pet } from "./pet.js";
import { STATE } from "./state.js";

const petHtmlElement = document.getElementById("pet");
const shadow = document.getElementById("shadow");
const bottom = document.getElementById("bottom");
const tpContainer = document.getElementById("tpContainer");
bottom.style.left = petHtmlElement.style.left;
bottom.style.top = petHtmlElement.style.top;
tpContainer.style.left = "300px";
tpContainer.style.top = "200px";


const pet = new Pet();
petHtmlElement.style.left = '100px';
petHtmlElement.style.top = '200px';
pet.x = 100;
pet.y = 200;
let isDragged = false;
const mousePosition = {
    x:0,
    y:0
}
let isPetClicked = false;
let canDrag = false;
const durations = {
    click_drag:20,
    walk:120,
    idle:800,
    roll:20,
    steps:0
}
const timer = {
    idle:0,
    roll:0,
    click_drag:0,
    walk:0,
    steps:0
}


function changePetPositionToMousePosition(){
    petHtmlElement.style.left = `${mousePosition.x - pet.width/2}px`;
    petHtmlElement.style.top = `${mousePosition.y-30}px`;
    pet.x = mousePosition.x - pet.width/2;
    pet.y = mousePosition.y-30;
}


onmousemove = function (e) {
    mousePosition.x = e.clientX;
    mousePosition.y = e.clientY;

}

petHtmlElement.addEventListener('mousedown' , ()=>{
    isPetClicked = true;
    console.log('pet clicked');
})

petHtmlElement.addEventListener('mouseup' , ()=>{
    turnOffTImerIfPetUnclicked();
    isDragged = false;
    canDrag = false;
    pet.state = STATE.ROLL;
})

function startTimerWhenPetClicked(){
    if(isPetClicked){
        timer.click_drag++;
        console.log(timer.click_drag);
    }
}
function turnOffTImerIfPetUnclicked(){
    isPetClicked = false;
    timer.click_drag = 0;
}

function setState(state){
    const randomRoll = Math.floor(Math.random()*2);
    if(randomRoll == 0){
        pet.state = STATE.IDLE;
    }
    if(randomRoll == 1){
        pet.state = STATE.WALK;
    }
}
function rollStepAmount(){
    console.log('Rolling amount of steps');
    durations.steps = Math.floor(Math.random()*6);
    console.log(`STEPS ROLLED: ${durations.steps}`);
}

function rollDirection(){
    const directionRoll = Math.floor(Math.random()*8);
    switch (directionRoll) {
        case 0:
            pet.direction = DIRECTION.LEFT;
            break;
        case 1:
            pet.direction = DIRECTION.TOP_LEFT;
            break;
        case 2:
            pet.direction = DIRECTION.TOP;
            break;
        case 3:
            pet.direction = DIRECTION.TOP_RIGHT;
            break;
        case 4:
            pet.direction = DIRECTION.RIGHT;
            break;
        case 5:
            pet.direction = DIRECTION.BOT_RIGHT;
            break;
        case 6:
            pet.direction = DIRECTION.BOT;
            break;
        case 7:
            pet.direction = DIRECTION.BOT_LEFT;
            break;
        default:
            break;
    }
}
function updatePetPos(){
    petHtmlElement.style.left=`${pet.x}px`;
    petHtmlElement.style.top=`${pet.y}px`;
}
function move(x,y){
    if(x==1){
        if(timer.walk % 2 ==0){
            if(timer.walk>30){
                pet.x++;
            }
        }
    }
    if(x==-1){
        if(timer.walk % 2 ==0){
            if(timer.walk>30){
                pet.x--;
            }
        }
    }

    if(y==1){
        if(timer.walk % 2 ==0){
            if(timer.walk>30){
                pet.y++;
            }
            
        }
    }
    if(y==-1){
        if(timer.walk % 2 ==0){
            if(timer.walk>30){
                pet.y--;
            }
        }
    }
    updatePetPos();
}

function movePet(){
    switch (pet.direction) {
        case DIRECTION.LEFT:
            petHtmlElement.classList.add("left");
            petHtmlElement.classList.remove("right");
            move(-1,0);
            break;
        case DIRECTION.TOP_LEFT:
            petHtmlElement.classList.add("left");
            petHtmlElement.classList.remove("right");
            move(-1,1);
            break;
        case DIRECTION.TOP:
            move(0,1);
            break;
        case DIRECTION.TOP_RIGHT:
            petHtmlElement.classList.add("right");
            petHtmlElement.classList.remove("left");
            move(1,1);
            break;
        case DIRECTION.RIGHT:
            petHtmlElement.classList.add("right");
            petHtmlElement.classList.remove("left");
            move(1);
            break;
        case DIRECTION.BOT_RIGHT:
            petHtmlElement.classList.add("right");
            petHtmlElement.classList.remove("left");
            move(1,-1);
            break;
        case DIRECTION.BOT:
            move(0,-1);
            break;
        case DIRECTION.BOT_LEFT:
            petHtmlElement.classList.add("left");
            petHtmlElement.classList.remove("right");
            move(-1,-1);
            break;
        default:
            break;
    }
}


function rollTimerHandler(){
    timer.roll++;
    if(timer.roll >= durations.roll){
        timer.roll = 0;
        rollDirection();
        rollStepAmount();
        setState();
    }
}


function stateHandler(){

    switch (pet.state) {
        case STATE.ROLL:
            rollTimerHandler();
            break;

        case STATE.DRAGGED:
            petHtmlElement.classList.remove('idle');
            petHtmlElement.classList.remove('walk');
            petHtmlElement.classList.add('dragged');
            timer.roll = 0;
            timer.walk = 0;
            timer.idle = 0;

            break;

        case STATE.IDLE:
            timer.idle++;
            if(timer.idle>durations.idle){
                pet.state = STATE.ROLL;
                timer.idle= 0;
            }
            petHtmlElement.classList.add('idle');
            petHtmlElement.classList.remove('walk');
            petHtmlElement.classList.remove('dragged');
            break;

        case STATE.WALK:
            movePet();
            petHtmlElement.classList.add('walk');
            petHtmlElement.classList.remove('idle');
            petHtmlElement.classList.remove('dragged');
            timer.walk++;
            if(timer.walk>durations.walk){
                timer.steps +=1;
                timer.walk = 0;
                if(timer.steps>= durations.steps){
                    pet.state = STATE.IDLE;
                    timer.steps = 0;
                }
            }
            break;
        default:
            break;
    }
    console.log(pet.state);
}

function clickDragHandler(){
    if(timer.click_drag>=durations.click_drag){
        canDrag = true;
    }
}

function forceTeleportToScreenCenter(){
    if(pet.x<=0 || pet.x >= window.innerWidth || pet.y <= 0 || pet.y>= window.innerHeight){
        pet.x = window.innerWidth/2;
        pet.y = window.innerHeight/2;
    }
}

function update(){
    forceTeleportToScreenCenter();
    shadowFollowPet();
    
}
function shadowFollowPet(){
    shadow.style.left = `${pet.x+10}px`;
    shadow.style.top =`${pet.y+32}px`;
}

function animate(){
    clickDragHandler();
    startTimerWhenPetClicked();
    stateHandler();

    if(canDrag){
        pet.state = STATE.DRAGGED;
        changePetPositionToMousePosition();
    }
    update();
    requestAnimationFrame(animate);
}
animate();
