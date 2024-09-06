const electron = require("electron");
const ipc = electron.ipcRenderer;
import { addDragEventListener, createMultiplePets, update } from "./utility.js";

const mousePosition = {
    x:0,
    y:0
}

const petList = [];

onmousemove = function (e) {
    mousePosition.x = e.clientX;
    mousePosition.y = e.clientY;
}

function checkIfInteractibleElementHovered(){
    let interactibleElementsHovered = 0;
    petList.forEach(pet => {
        if(mousePosition.x>= pet.x+5 && mousePosition.x<= pet.x+pet.width-5){
            if(mousePosition.y>= pet.y+5 && mousePosition.y<= pet.y+pet.height-5){
                interactibleElementsHovered++;
            }
        }
        if(interactibleElementsHovered > 0){
            console.log('OVER ENTITY');
            ipc.send('hover-on');
        }else{
            console.log('NO ENTITY BELOW');
            ipc.send('hover-off');
        }
    });
}

createMultiplePets(petList,2);
addDragEventListener(petList);

function animate(){
    checkIfInteractibleElementHovered();
    update(petList,mousePosition);
    requestAnimationFrame(animate);
}
animate();
