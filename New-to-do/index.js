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
addTask.onclick=()=>{
    modalWindow.classList.toggle("Modal-disabled");
     
}

const currentForm=document.querySelector('form[name="Form"]');
currentForm.onsubmit=(event)=> {
    event.preventDefault()
    const formElement=event.target.elements;
    const taskName=formElement.taskName.value;
    createNewTask(taskName);
    // modalWindow.classList.add("Modal-disabled");
    currentForm.reset();

};
currentForm.onreset=()=> {
    console.log('Hello');
    modalWindow.classList.add("Modal-disabled");
}