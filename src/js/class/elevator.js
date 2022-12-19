const Buttons = [];
const Elevators = [];
class Elevator{
    elevatorElement  = null; 
    constructor(htmlElement){
       this.elevatorContainer = htmlElement ;
       this.onFloor = 1;
    }
    static Elevators = [];

    open(){
       this.elevatorElement.class.add('open');
    }

    goTo(destinationFloor = 0){
        const elevator = this.elevatorContainer.querySelector('.elevator');
        const timeToReachFloor = Math.abs(this.onFloor - destinationFloor)*2;
        elevator.style.transition = `transform ${timeToReachFloor}s`;
        console.log('going to floor',destinationFloor, 'in ',timeToReachFloor);
        setTimeout(() => {
            elevator.style.transform = `translateY(-${250*(destinationFloor-1)}px)`;    
        }, 0); 
        setTimeout(() => {
            console.log('now')
            elevator.classList.add('open');    
        }, timeToReachFloor*1000); 
        this.onFloor = destinationFloor;
    }
}

class LiftButton{
    
    constructor(htmlElement,floor){
       this.element = htmlElement;
       this.floorNumber = floor;
    }
    static Buttons = [];  
}

const createElevator = (container,lifts)=>{
    let i = 1;
    const elevatorHtml = `<div class='elevator-wrapper'>
                     <div class='elevator '>
                        <span class='door door-1'></span>
                        <span class='door door-2'></span>
                     </div>  
                 </div>`;
                            
 

    while( i <= lifts){
        const elevatorNode = htmlToNode(elevatorHtml);
        container.append(elevatorNode);
        const liftButton = new Elevator(elevatorNode);
        Elevator.Elevators.push(liftButton);

        i++;
    }
}

const createButtons = (container,floors) => {
    let i = 1;
    const buttonSetHtml = ()=>{return  `<section class="button-set">
                                          <div><h2>${i} Floor</h2></div>
                                          <div class=" flex  items-center gap-md">
                                              <button class="button lift-button lift-button-down">
                                                  <img  src="/assets/icons/down.svg" alt="">
                                              </button>
                                              <button class="button lift-button lift-button-up">
                                                   <img src="/assets/icons/up.svg" alt="">
                                              </button>
                                          </div>
                                        </section>
                                        `;
                                };

    while( i <= floors){
        const buttonNode = htmlToNode(buttonSetHtml());
        container.append(buttonNode); 
        const liftButton = new LiftButton(buttonNode,i);
        const liftButtons = Array.from(buttonNode.querySelectorAll('.lift-button'));
        const callLift = (floor)=>{

            const elevator =  Elevator.Elevators.reduce((closestElevator,elevator)=>{
                console.log('current',floor - closestElevator.onFloor ,'new',)
                return Math.abs( floor - closestElevator.onFloor ) <=   Math.abs( floor - elevator.onFloor ) ? closestElevator : elevator;
             },Elevator.Elevators[0]);
             console.log('this is closest elevator',elevator,'from floor', floor);
             elevator.goTo(floor);
        }
        liftButtons.forEach(ele=>{
            const floor = i;
            ele.addEventListener('click',()=>{callLift(floor)})
        })
        LiftButton.Buttons.push(liftButton);
        i++;
    }

}

function htmlToNode(Html){
   const container = document.createElement('a');
   container.innerHTML = Html;
   return container.firstChild;
}
export {Elevator,createButtons,createElevator};