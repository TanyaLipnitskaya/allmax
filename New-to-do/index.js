const currentDateElement=document.querySelector(".Date");
currentDateElement.innerHTML=new Date().toLocaleDateString();

const listOfCurrentTasks=document.querySelector(".listOfCurrentTasks");
const createNewTask=(taskTitle)=>{
    const listItem=document.createElement("li");
    listItem.innerHTML=taskTitle;
    listOfCurrentTasks.appendChild(listItem);

}


const addTask=document.querySelector(".addTask");
const modalWindow=document.querySelector('.Modal')
const addTaskOnClick= ()=>{
    modalWindow.classList.toggle("Modal-disabled");
     
}
addTask.addEventListener("click", addTaskOnClick);

const currentForm=document.querySelector('form[name="Form"]');
const currentFormOnSubmit=(event)=> {
    event.preventDefault()
    const formElement=event.target.elements;
    const taskName=formElement.taskName.value;
    createNewTask(taskName);
    // modalWindow.classList.add("Modal-disabled");
    currentForm.reset();

};
currentForm.addEventListener("submit", currentFormOnSubmit);

const currentFormOnReset=()=> {
       modalWindow.classList.add("Modal-disabled");
}
currentForm.addEventListener("reset", currentFormOnReset);