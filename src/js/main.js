import {createButtons,createElevator} from "./class/elevator.js";

//form submit 

const simualtionForm = document.getElementById('simulation-form');
const liftButtonWrapper = document.getElementById('lift-button-wrapper');
const elevatorContainer = document.getElementById('elevator-container');

simualtionForm.addEventListener('submit',(e)=>{
    e.preventDefault();
    const formData = new FormData(simualtionForm);

    const numberOfLift = formData.get('number-of-lifts');
    const numberOfFloors = formData.get('number-of-floors');

    createButtons(liftButtonWrapper,numberOfFloors);
    createElevator(elevatorContainer,numberOfLift);
    
    document.querySelector('.modal-container').classList.add('close');
});

