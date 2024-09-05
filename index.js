import { Pet } from "./pet.js";
import { STATE } from "./state.js";

const pet = new Pet(100,100,2);
const pet2 = new Pet(200,200,3);
const mousePosition = {
    x:0,
    y:0
}


onmousemove = function (e) {
    mousePosition.x = e.clientX;
    mousePosition.y = e.clientY;
}

pet.petElement.addEventListener('mousedown' , ()=>{
    pet.isPetClicked = true;
    console.log('pet clicked');
})

pet.petElement.addEventListener('mouseup' , ()=>{
    pet.turnOffTImerIfPetUnclicked();
    pet.canDrag = false;
    pet.state = STATE.ROLL;
})

function animate(){
    pet.giveMousePosition(mousePosition);
    pet2.giveMousePosition(mousePosition);
    pet.update();
    pet2.update();
    requestAnimationFrame(animate);
}
animate();
