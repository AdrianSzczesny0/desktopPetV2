import { Pet } from "./pet.js";
import { STATE } from "./state.js";

const petHtmlElement = document.getElementById("pet");
const pet = new Pet();
petHtmlElement.style.left = '100px';
petHtmlElement.style.top = '200px';
let isDragged = false;
const mousePosition = {
    x:0,
    y:0
}
let isPetClicked = false;
let canDrag = false;
const timer = {
    click_drag:0
}


function changePetPositionToMousePosition(){
    petHtmlElement.style.left = `${mousePosition.x - pet.width/2}px`;
    petHtmlElement.style.top = `${mousePosition.y-30}px`;
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
    pet.state = STATE.WALK;
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



function stateHandler(){
    switch (pet.state) {
        case STATE.DRAGGED:
            petHtmlElement.classList.remove('idle');
            petHtmlElement.classList.remove('walk');
            petHtmlElement.classList.add('dragged');
            break;
        case STATE.IDLE:
            petHtmlElement.classList.add('idle');
            petHtmlElement.classList.remove('walk');
            petHtmlElement.classList.remove('dragged');
            break;

        case STATE.WALK:
            petHtmlElement.classList.add('walk');
            petHtmlElement.classList.remove('idle');
            petHtmlElement.classList.remove('dragged');
            break;
        default:
            break;
    }
}

function clickDragHandler(){
    if(timer.click_drag>=20){
        canDrag = true;
    }
}

function animate(){
    clickDragHandler();
    startTimerWhenPetClicked();
    stateHandler();

    if(canDrag){
        pet.state = STATE.DRAGGED;
        changePetPositionToMousePosition();
    }
    requestAnimationFrame(animate);
}
animate();
