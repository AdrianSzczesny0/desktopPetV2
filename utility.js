import { Pet } from "./pet.js";
import { STATE } from "./state.js";

export function getPoringType(){
    let randomType = Math.floor(Math.random() * 6);
    switch (randomType) {
        case 0:
            return 'poring';
        case 1:
            return 'drops';
        case 2:
            return 'poporing';
        case 3:
            return 'marine';
        case 4:
            return 'aquaring';
        case 5:
            return 'rainbowring';
        default:
            break;
    }
}

export function addDragEventListener(list){
    list.forEach(pet => {
        pet.petElement.addEventListener('mousedown' , ()=>{
            pet.isPetClicked = true;
        })
        pet.petElement.addEventListener('mouseup' , ()=>{
            pet.turnOffTImerIfPetUnclicked();
            pet.canDrag = false;
            pet.state = STATE.ROLL;
        })
    });
}
export function update(list,mousePosition){
    list.forEach(entity => {
        entity.giveMousePosition(mousePosition);
        entity.update();
    });
}

export function createMultiplePets(list, amount){
    for (let i = 0; i < amount; i++) {
        let type = getPoringType();
        let randomX = Math.floor(Math.random() * (window.innerWidth - 100) + 100); 
        let randomY = Math.floor(Math.random() * (window.innerHeight - 100) + 100); 
        let randomSpeed = Math.floor(Math.random() * (2 - 1) + 1); 
        const pet  = new Pet(randomX,randomY,randomSpeed,type);
        list.push(pet);
    }
}